<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { onMounted, reactive } from 'vue';
import { AuthUser, LayoutValue, Menu } from 'resources/interfaces/Utils';
import menu from '@/common/data/menu';
import { route } from 'ziggy-js'

const layout = usePage().props.layoutValue as LayoutValue
const user = usePage().props.auth as AuthUser
const state = reactive({
  menus: menu as Menu[],
  settings: {
    minScrollbarLength: 60,
  },
})
function checkSU() {
  return user.role_id == 1
}
function checkAuth(req: string) {
  let checker = user.role.permissions.filter((e) => {
    let res = e.module == req
    if (res == true) {
      return e.read == 1 ? true : false
    }
  })
  return checker.length > 0 ? true : false
}
onMounted(() => {
  initActiveMenu()
  onRoutechange()
  if (document.querySelectorAll(".navbar-nav .collapse")) {
    let collapses = document.querySelectorAll(".navbar-nav .collapse");

    collapses.forEach((collapse) => {
      // Hide sibling collapses on `show.bs.collapse`
      collapse.addEventListener("show.bs.collapse", (e) => {
        e.stopPropagation();
        let closestCollapse = collapse.parentElement?.closest(".collapse");
        if (closestCollapse) {
          let siblingCollapses =
            closestCollapse.querySelectorAll(".collapse");
          siblingCollapses.forEach((siblingCollapse) => {
            if (siblingCollapse.classList.contains("show")) {
              siblingCollapse.classList.remove("show");
              (siblingCollapse?.parentElement?.firstChild as HTMLElement)?.setAttribute("aria-expanded", "false");
            }
          });
        } else {
          let getSiblings = (elem: HTMLElement | null) => {
            // Setup siblings array and get the first sibling
            let siblings = [];
            let sibling = elem?.parentNode?.firstChild;
            // Loop through each sibling and push to the array
            while (sibling) {
              if (sibling.nodeType === 1 && sibling !== elem) {
                siblings.push(sibling);
              }
              sibling = sibling.nextSibling;
            }
            return siblings;
          };
          let siblings = getSiblings(collapse.parentElement);
          siblings.forEach((item) => {
            if (item.childNodes.length > 2) {
              (item as HTMLElement).firstElementChild?.setAttribute("aria-expanded", "false");
              (item as HTMLElement).firstElementChild?.classList.remove("active");
            }
            let ids = (item as HTMLElement).querySelectorAll("*[id]");
            ids.forEach((item1) => {
              item1.classList.remove("show");
              (item1.parentElement?.firstChild as HTMLElement)?.setAttribute("aria-expanded", "false");
              (item1.parentElement?.firstChild as HTMLElement).classList.remove("active");
              if (item1.childNodes.length > 2) {
                let val = item1.querySelectorAll("ul li a");

                val.forEach((subitem: { hasAttribute: (arg0: string) => any; setAttribute: (arg0: string, arg1: string) => void; }) => {
                  if (subitem.hasAttribute("aria-expanded"))
                    subitem.setAttribute("aria-expanded", "false");
                });
              }
            });
          });
        }
      });

      // Hide nested collapses on `hide.bs.collapse`
      collapse.addEventListener("hide.bs.collapse", (e) => {
        e.stopPropagation();
        let childCollapses = collapse.querySelectorAll(".collapse");
        childCollapses.forEach((childCollapse) => {
          let childCollapseInstance = childCollapse;
          childCollapseInstance.classList.remove("show");
          (childCollapseInstance?.parentElement?.firstChild as HTMLElement).setAttribute("aria-expanded", "false");
        });
      });
    });
  }
})
function onRoutechange() {
  setTimeout(() => {
    var currentPath = window.location.pathname;
    if (document.querySelector("#navbar-nav")) {
      let currentPosition = (document.querySelector("#navbar-nav")?.querySelector('[href="' + currentPath + '"]') as HTMLElement)?.offsetTop;
      if (currentPosition > document.documentElement.clientHeight) {
        document.querySelector("#scrollbar .simplebar-content-wrapper") ? (document.querySelector("#scrollbar .simplebar-content-wrapper") as HTMLElement).scrollTop = currentPosition + 300 : '';
      }
    }
  }, 500);
}
function initActiveMenu() {
  setTimeout(() => {
    var currentPath = window.location.pathname;
    if (document.querySelector("#navbar-nav")) {
      let a = document.querySelector("#navbar-nav")?.querySelector('[href="' + currentPath + '"]');
      if (a) {
        a.classList.add("active");
        let parentCollapseDiv = a.closest(".collapse.menu-dropdown");
        if (parentCollapseDiv) {
          parentCollapseDiv.classList.add("show");
          parentCollapseDiv.parentElement?.children[0].classList.add("active");
          parentCollapseDiv.parentElement?.children[0].setAttribute("aria-expanded", "true");
          if (parentCollapseDiv.parentElement?.closest(".collapse.menu-dropdown")) {
            parentCollapseDiv.parentElement?.closest(".collapse")?.classList.add("show");
            if (parentCollapseDiv.parentElement.closest(".collapse")?.previousElementSibling)
              parentCollapseDiv.parentElement.closest(".collapse")?.previousElementSibling?.classList.add("active");
            const grandparent = parentCollapseDiv.parentElement.closest(".collapse")?.previousElementSibling?.parentElement?.closest(".collapse");
            if (grandparent && grandparent && grandparent.previousElementSibling) {
              grandparent.previousElementSibling.classList.add("active");
              grandparent.classList.add("show");
            }
          }
        }
      }
    }
  }, 0)
}
</script>

<template>
  <div class="container-fluid">
    <div id="two-column-menu"></div>
    <template v-if="layout.layoutType === 'vertical' || layout.layoutType === 'semibox'">
      <ul class="navbar-nav h-100" id="navbar-nav">
        <li class="menu-title">
          <span data-key="t-menu"> {{ $t("t-menu") }}</span>
        </li>
        <li class="nav-item">
          <Link class="nav-link menu-link" :href="route('dashboard')">
          <i class="ri-dashboard-2-line"></i>
          <span data-key="t-dashboards"> {{ $t("t-dashboards") }}</span>
          </Link>
        </li>

        <li class="menu-title">
          <i class="ri-more-fill"></i>
          <span data-key="t-modules">{{ $t("t-modules") }}</span>
        </li>

        <li v-for="menu in state.menus" :key="menu.name" class="nav-item">
          <a v-if="menu.caret" v-show="checkAuth(menu.module)" class="nav-link menu-link" :href="`#${menu.name}`"
            data-bs-toggle="collapse" role="button" aria-expanded="false" :aria-controls="menu.name">
            <i :class="menu.icon"></i>
            <span>{{ $t(menu.display_name) }}</span>
          </a>
          <Link v-if="!menu.caret && menu.route" v-show="checkAuth(menu.module)" :href="route(menu.route)"
            class="nav-link" data-key="t-simple-page">
          {{ $t(menu.display_name) }}
          </Link>
          <div v-if="menu.caret" class="collapse menu-dropdown" :id="menu.name" v-show="checkAuth(menu.module)">
            <ul class="nav nav-sm flex-column">
              <li v-for="child in menu.childs" :key="child.name" class="nav-item">
                <a v-if="child.caret" v-show="checkAuth(child.module)" class="nav-link menu-link"
                  :href="`#${child.name}`" data-bs-toggle="collapse" role="button" aria-expanded="false"
                  :aria-controls="child.name">
                  <span>{{ $t(child.display_name) }}</span>
                </a>
                <Link v-if="!child.caret && child.route" v-show="checkAuth(child.module)" :href="route(child.route)"
                  class="nav-link" data-key="t-simple-page">
                {{ $t(child.display_name) }}
                </Link>
                <div v-if="child.caret" v-show="checkAuth(child.module)" class="collapse menu-dropdown"
                  :id="child.name">
                  <ul class="nav nav-sm flex-column">
                    <li v-for="grandChild in child.childs" :key="grandChild.name" class="nav-item">
                      <Link v-if="grandChild.route" :href="route(grandChild.route)"
                        v-show="checkAuth(grandChild.module)" class="nav-link" data-key="t-simple-page">
                      {{ $t(grandChild.display_name) }}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>

        <li class="menu-title" v-if="checkSU()">
          <i class="ri-more-fill"></i>
          <span>SYSTEMS</span>
        </li>
        <li v-for="menu in state.menus" :key="menu.name" class="nav-item">
          <Link v-if="menu.type == 'system' && menu.auth_level_min == 1" v-show="checkSU()"
            :href="route(menu.route ?? '')" class="nav-link" data-key="t-simple-page" activeClass="text-primary"><i
            :class="menu.icon"></i>
          <span>{{ $t(menu.display_name) }}</span>
          </Link>
          <!-- <router-link v-if="menu.type == 'system' && menu.auth_level_min == 1" v-show="checkSU()"
            :to="{ name: menu.route }" class="nav-link" data-key="t-simple-page" activeClass="text-primary">
            <i :class="menu.icon"></i>
            <span>{{ $t(menu.display_name) }}</span>
          </router-link> -->
        </li>
      </ul>

      <!-- <li class="nav-item">
          <a class="nav-link menu-link" href="#sidebarAuth" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="sidebarAuth">
            <i class="ri-account-circle-line"></i>
            <span data-key="t-authentication">{{
              $t("t-authentication")
            }}</span>
          </a>
          <div class="collapse menu-dropdown" id="sidebarAuth">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <a class="nav-link" href="#sidebarSignIn" data-bs-toggle="collapse" role="button" aria-expanded="false"
                  aria-controls="sidebarSignIn" data-key="t-signin">{{ $t("t-signin") }}
                </a>
                <div class="collapse menu-dropdown" id="sidebarSignIn">
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <Link href="/auth/signin-basic" class="nav-link" data-key="t-basic">{{ $t("t-basic") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/auth/signin-cover" class="nav-link" data-key="t-cover">{{ $t("t-cover") }}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#sidebarSignUp" data-bs-toggle="collapse" role="button" aria-expanded="false"
                  aria-controls="sidebarSignUp" data-key="t-signup">{{ $t("t-signup") }}
                </a>
                <div class="collapse menu-dropdown" id="sidebarSignUp">
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <Link href="/auth/signup-basic" class="nav-link" data-key="t-basic">{{ $t("t-basic") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/auth/signup-cover" class="nav-link" data-key="t-cover">{{ $t("t-cover") }}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="#sidebarResetPass" data-bs-toggle="collapse" role="button"
                  aria-expanded="false" aria-controls="sidebarResetPass" data-key="t-password-reset">
                  {{ $t("t-password-reset") }}
                </a>
                <div class="collapse menu-dropdown" id="sidebarResetPass">
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <Link href="/auth/reset-pwd-basic" class="nav-link" data-key="t-basic">
                      {{ $t("t-basic") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/auth/reset-pwd-cover" class="nav-link" data-key="t-cover">
                      {{ $t("t-cover") }}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="#sidebarcreatepassword" data-bs-toggle="collapse" role="button"
                  aria-expanded="false" aria-controls="sidebarcreatepassword" data-key="t-lock-screen">
                  {{ $t("t-password-create") }}
                </a>
                <div class="collapse menu-dropdown" id="sidebarcreatepassword">
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <Link href="/auth/create-pwd-basic" class="nav-link" data-key="t-basic">
                      {{ $t("t-basic") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/auth/create-pwd-cover" class="nav-link" data-key="t-cover">
                      {{ $t("t-cover") }}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#sidebarLockScreen" data-bs-toggle="collapse" role="button"
                  aria-expanded="false" aria-controls="sidebarLockScreen" data-key="t-lock-screen">
                  {{ $t("t-lock-screen") }}
                </a>
                <div class="collapse menu-dropdown" id="sidebarLockScreen">
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <Link href="/auth/lockscreen-basic" class="nav-link" data-key="t-basic">
                      {{ $t("t-basic") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/auth/lockscreen-cover" class="nav-link" data-key="t-cover">
                      {{ $t("t-cover") }}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="#sidebarLogout" data-bs-toggle="collapse" role="button" aria-expanded="false"
                  aria-controls="sidebarLogout" data-key="t-logout">
                  {{ $t("t-logout") }}
                </a>
                <div class="collapse menu-dropdown" id="sidebarLogout">
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <Link href="/auth/logout-basic" class="nav-link" data-key="t-basic">
                      {{ $t("t-basic") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/auth/logout-cover" class="nav-link" data-key="t-cover">
                      {{ $t("t-cover") }}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#sidebarSuccessMsg" data-bs-toggle="collapse" role="button"
                  aria-expanded="false" aria-controls="sidebarSuccessMsg" data-key="t-success-message">
                  {{ $t("t-success-message") }}
                </a>
                <div class="collapse menu-dropdown" id="sidebarSuccessMsg">
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <Link href="/auth/success-msg-basic" class="nav-link" data-key="t-basic">
                      {{ $t("t-basic") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/auth/success-msg-cover" class="nav-link" data-key="t-cover">
                      {{ $t("t-cover") }}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#sidebarTwoStep" data-bs-toggle="collapse" role="button" aria-expanded="false"
                  aria-controls="sidebarTwoStep" data-key="t-two-step-verification">
                  {{ $t("t-two-step-verification") }}
                </a>
                <div class="collapse menu-dropdown" id="sidebarTwoStep">
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <Link href="/auth/twostep-basic" class="nav-link" data-key="t-basic">
                      {{ $t("t-basic") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/auth/twostep-cover" class="nav-link" data-key="t-cover">
                      {{ $t("t-cover") }}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#sidebarErrors" data-bs-toggle="collapse" role="button" aria-expanded="false"
                  aria-controls="sidebarErrors" data-key="t-errors">
                  {{ $t("t-errors") }}
                </a>
                <div class="collapse menu-dropdown" id="sidebarErrors">
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <Link href="/auth/404-basic" class="nav-link" data-key="t-404-basic">
                      {{ $t("t-404-basic") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/auth/404-cover" class="nav-link" data-key="t-404-cover">
                      {{ $t("t-404-cover") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/auth/404" class="nav-link" data-key="t-404-alt">
                      {{ $t("t-404-alt") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/auth/500" class="nav-link" data-key="t-500">
                      {{ $t("t-500") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/auth/ofline" class="nav-link" data-key="t-offline-page">
                      {{ $t("t-offline-page") }}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <a class="nav-link menu-link" href="#sidebarPages" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="sidebarPages">
            <i class="ri-pages-line"></i>
            <span data-key="t-pages">{{ $t("t-pages") }}</span>
          </a>
          <div class="collapse menu-dropdown" id="sidebarPages">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <Link href="/pages/starter" class="nav-link" data-key="t-starter">{{ $t("t-starter") }}
                </Link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#sidebarProfile" data-bs-toggle="collapse" role="button" aria-expanded="false"
                  aria-controls="sidebarProfile" data-key="t-profile">{{ $t("t-profile") }}
                </a>
                <div class="collapse menu-dropdown" id="sidebarProfile">
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <Link href="/pages/profile" class="nav-link" data-key="t-simple-page">
                      {{ $t("t-simple-page") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/pages/profile-setting" class="nav-link" data-key="t-settings">
                      {{ $t("t-settings") }}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <Link href="/pages/team" class="nav-link" data-key="t-team">
                {{ $t("t-team") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/pages/timeline" class="nav-link" data-key="t-timeline">
                {{ $t("t-timeline") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/pages/faqs" class="nav-link" data-key="t-faqs">
                {{ $t("t-faqs") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/pages/pricing" class="nav-link" data-key="t-pricing">
                {{ $t("t-pricing") }}
                </Link>
              </li>

              <li class="nav-item">
                <Link href="/pages/maintenance" class="nav-link" data-key="t-maintenance">
                {{ $t("t-maintenance") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/pages/coming-soon" class="nav-link" data-key="t-coming-soon">
                {{ $t("t-coming-soon") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/pages/sitemap" class="nav-link" data-key="t-sitemap">
                {{ $t("t-sitemap") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/pages/search-results" class="nav-link" data-key="t-search-results">
                {{ $t("t-search-results") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/pages/privacy-policy" class="nav-link" data-key="t-privacy-policy">
                {{ $t("t-privacy-policy") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/pages/term-conditions" class="nav-link" data-key="t-term-conditions">
                {{ $t("t-term-conditions") }}
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#sidebarlanding" data-bs-toggle="collapse" role="button" aria-expanded="false"
            aria-controls="sidebarlanding" data-key="t-projects">
            <i class="ri-rocket-line"></i>
            <span data-key="t-landing">{{ $t("t-landing") }}</span>
          </a>
          <div class="collapse menu-dropdown" id="sidebarlanding">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <a class="nav-link menu-link" target="_blank" href="/landing">
                  <span data-key="t-landing">{{ $t("t-one-page") }}</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link menu-link" target="_blank" href="/nft-landing">
                  <span data-key="t-landing">{{ $t("t-nft-landing") }}</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link menu-link" target="_blank" href="/job-landing">
                  <span data-key="t-landing">{{ $t("t-job") }}</span>
                </a>
              </li>

            </ul>
          </div>
        </li>
        <li class="menu-title">
          <i class="ri-more-fill"></i>
          <span data-key="t-components">{{ $t("t-components") }}</span>
        </li>
        <li class="nav-item">
          <a class="nav-link menu-link" href="#sidebarUI" data-bs-toggle="collapse" role="button" aria-expanded="false"
            aria-controls="sidebarUI">
            <i class="ri-pencil-ruler-2-line"></i>
            <span data-key="t-base-ui">{{ $t("t-base-ui") }}</span>
          </a>
          <div class="collapse menu-dropdown mega-dropdown-menu" id="sidebarUI">
            <div class="row">
              <div class="col col-lg-4">
                <ul class="nav nav-sm flex-column">
                  <li class="nav-item">
                    <Link href="/ui/alerts" class="nav-link" data-key="t-alerts">{{ $t("t-alerts") }}</Link>
                  </li>
                  <li class="nav-item">
                    <Link href="/ui/badges" class="nav-link" data-key="t-badges">{{ $t("t-badges") }}</Link>
                  </li>
                  <li class="nav-item">
                    <Link href="/ui/buttons" class="nav-link" data-key="t-buttons">{{ $t("t-buttons") }}
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link href="/ui/colors" class="nav-link" data-key="t-colors">{{ $t("t-colors") }}</Link>
                  </li>
                  <li class="nav-item">
                    <Link href="/ui/cards" class="nav-link" data-key="t-cards">{{ $t("t-cards") }}</Link>
                  </li>
                  <li class="nav-item">
                    <Link href="/ui/carousel" class="nav-link" data-key="t-carousel">{{ $t("t-carousel") }}
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link href="/ui/dropdowns" class="nav-link" data-key="t-dropdowns">{{ $t("t-dropdowns") }}
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link href="/ui/grid" class="nav-link" data-key="t-grid">{{ $t("t-grid") }}</Link>
                  </li>
                </ul>
              </div>
              <div class="col col-lg-4">
                <ul class="nav nav-sm flex-column">
                  <li class="nav-item">
                    <Link href="/ui/images" class="nav-link" data-key="t-images">{{ $t("t-images") }}</Link>
                  </li>
                  <li class="nav-item">
                    <Link href="/ui/tabs" class="nav-link" data-key="t-tabs">{{ $t("t-tabs") }}</Link>
                  </li>
                  <li class="nav-item">
                    <Link href="/ui/accordions" class="nav-link" data-key="t-accordion-collapse">
                    {{ $t("t-accordion-collapse") }}</Link>
                  </li>
                  <li class="nav-item">
                    <Link href="/ui/modals" class="nav-link" data-key="t-modals">{{ $t("t-modals") }}</Link>
                  </li>
                  <li class="nav-item">
                    <Link href="/ui/offcanvas" class="nav-link" data-key="t-offcanvas">{{ $t("t-offcanvas") }}
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link href="/ui/placeholders" class="nav-link" data-key="t-placeholders">
                    {{ $t("t-placeholders") }}</Link>
                  </li>
                  <li class="nav-item">
                    <Link href="/ui/progress" class="nav-link" data-key="t-progress">{{ $t("t-progress") }}
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link href="/ui/notifications" class="nav-link" data-key="t-notifications">
                    {{ $t("t-notifications") }}</Link>
                  </li>
                </ul>
              </div>
              <div class="col col-lg-4">
                <ul class="nav nav-sm flex-column">
                  <li class="nav-item">
                    <Link href="/ui/media" class="nav-link" data-key="t-media-object">{{ $t("t-media-object") }}
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link href="/ui/embed-video" class="nav-link" data-key="t-embed-video">
                    {{ $t("t-embed-video") }}</Link>
                  </li>
                  <li class="nav-item">
                    <Link href="/ui/typography" class="nav-link" data-key="t-typography">{{ $t("t-typography") }}
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link href="/ui/lists" class="nav-link" data-key="t-lists">{{ $t("t-lists") }}</Link>
                  </li>
                  <li class="nav-item">
                    <Link href="/ui/links" class="nav-link" data-key="t-links">{{ $t("t-links") }}
                    <span variant="success" class="badge badge-pill bg-success-subtle text-success" data-key="t-new">{{
                      $t("t-new") }}</span>
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link href="/ui/general" class="nav-link" data-key="t-general">{{ $t("t-general") }}
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link href="/ui/ribbons" class="nav-link" data-key="t-ribbons">{{ $t("t-ribbons") }}
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link href="/ui/utilities" class="nav-link" data-key="t-utilities">{{ $t("t-utilities") }}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>

        <li class="nav-item">
          <a class="nav-link menu-link" href="#sidebarAdvanceUI" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="sidebarAdvanceUI">
            <i class="ri-stack-line"></i>
            <span data-key="t-advance-ui">{{ $t("t-advance-ui") }}</span>
          </a>
          <div class="collapse menu-dropdown" id="sidebarAdvanceUI">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <Link href="/advance-ui/sweetalerts" class="nav-link" data-key="t-sweet-alerts">
                {{ $t("t-sweet-alerts") }}</Link>
              </li>
              <li class="nav-item">
                <Link href="/advance-ui/scrollbar" class="nav-link" data-key="t-scrollbar">{{ $t("t-scrollbar") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/advance-ui/animation" class="nav-link" data-key="t-animation">{{ $t("t-animation") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/advance-ui/swiper" class="nav-link" data-key="t-swiper-slider">
                {{ $t("t-swiper-slider") }}</Link>
              </li>

              <li class="nav-item">
                <Link href="/advance-ui/highlight" class="nav-link" data-key="t-highlight">{{ $t("t-highlight") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/advance-ui/scrollspy" class="nav-link" data-key="t-scrollSpy">{{ $t("t-scrollSpy") }}
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <Link class="nav-link menu-link" href="/widgets">
          <i class="ri-honour-line"></i>
          <span data-key="t-widgets">{{ $t("t-widgets") }}</span>
          </Link>
        </li>

        <li class="nav-item">
          <a class="nav-link menu-link" href="#sidebarForms" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="sidebarForms">
            <i class="ri-file-list-3-line"></i>
            <span data-key="t-forms">{{ $t("t-forms") }}</span>
          </a>
          <div class="collapse menu-dropdown" id="sidebarForms">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <Link href="/form/elements" class="nav-link" data-key="t-basic-elements">
                {{ $t("t-basic-elements") }}</Link>
              </li>
              <li class="nav-item">
                <Link href="/form/select" class="nav-link" data-key="t-form-select">{{ $t("t-form-select") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/form/checkboxs-radios" class="nav-link" data-key="t-checkboxs-radios">
                {{ $t("t-checkboxs-radios") }}</Link>
              </li>
              <li class="nav-item">
                <Link href="/form/pickers" class="nav-link" data-key="t-pickers">
                {{ $t("t-pickers") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/form/masks" class="nav-link" data-key="t-input-masks">{{ $t("t-input-masks") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/form/advanced" class="nav-link" data-key="t-advanced">
                {{ $t("t-advanced") }}</Link>
              </li>
              <li class="nav-item">
                <Link href="/form/range-sliders" class="nav-link" data-key="t-range-slider">
                {{ $t("t-range-slider") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/form/validation" class="nav-link" data-key="t-validation">{{ $t("t-validation") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/form/wizard" class="nav-link" data-key="t-wizard">{{ $t("t-wizard") }}</Link>
              </li>
              <li class="nav-item">
                <Link href="/form/editors" class="nav-link" data-key="t-editors">{{ $t("t-editors") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/form/file-uploads" class="nav-link" data-key="t-file-uploads">
                {{ $t("t-file-uploads") }}</Link>
              </li>
              <li class="nav-item">
                <Link href="/form/layouts" class="nav-link" data-key="t-form-layouts">{{ $t("t-form-layouts") }}
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <a class="nav-link menu-link" href="#sidebarTables" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="sidebarTables">
            <i class="ri-layout-grid-line"></i>
            <span data-key="t-tables">{{ $t("t-tables") }}</span>
          </a>
          <div class="collapse menu-dropdown" id="sidebarTables">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <Link href="/tables/basic" class="nav-link" data-key="t-basic-tables">{{ $t("t-basic-tables") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/tables/gridjs" class="nav-link" data-key="t-grid-js">{{ $t("t-grid-js") }}
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <a class="nav-link menu-link" href="#sidebarCharts" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="sidebarCharts">
            <i class="ri-pie-chart-line"></i>
            <span data-key="t-charts">{{ $t("t-charts") }}</span>
          </a>
          <div class="collapse menu-dropdown" id="sidebarCharts">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <a class="nav-link" href="#sidebarApexcharts" data-bs-toggle="collapse" role="button"
                  aria-expanded="false" aria-controls="sidebarApexcharts" data-key="t-apexcharts">
                  {{ $t("t-apexcharts") }}
                </a>
                <div class="collapse menu-dropdown" id="sidebarApexcharts">
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <Link href="/charts/apex-line" class="nav-link" data-key="t-line">
                      {{ $t("t-line") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/charts/apex-area" class="nav-link" data-key="t-area">
                      {{ $t("t-area") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/charts/apex-column" class="nav-link" data-key="t-column">
                      {{ $t("t-column") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/charts/apex-bar" class="nav-link" data-key="t-bar">
                      {{ $t("t-bar") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/charts/apex-mixed" class="nav-link" data-key="t-mixed">
                      {{ $t("t-mixed") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/charts/apex-range-area" class="nav-link" data-key="t-range-area">{{
                        $t("t-range-area") }}
                      <span variant="success" class="badge badge-pill bg-success-subtle text-success"
                        data-key="t-new">{{ $t("t-new") }}</span>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/charts/apex-funnel" class="nav-link" data-key="t-funnel">{{ $t("t-funnel") }}
                      <span variant="success" class="badge badge-pill bg-success-subtle text-success"
                        data-key="t-new">{{ $t("t-new") }}</span>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/charts/apex-candlestick" class="nav-link" data-key="t-candlstick">
                      {{ $t("t-candlstick") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/charts/apex-boxplot" class="nav-link" data-key="t-boxplot">
                      {{ $t("t-boxplot") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/charts/apex-bubble" class="nav-link" data-key="t-bubble">
                      {{ $t("t-bubble") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/charts/apex-scatter" class="nav-link" data-key="t-scatter">
                      {{ $t("t-scatter") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/charts/apex-heatmap" class="nav-link" data-key="t-heatmap">
                      {{ $t("t-heatmap") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/charts/apex-treemap" class="nav-link" data-key="t-treemap">
                      {{ $t("t-treemap") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/charts/apex-pie" class="nav-link" data-key="t-pie">
                      {{ $t("t-pie") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/charts/apex-radialbar" class="nav-link" data-key="t-radialbar">
                      {{ $t("t-radialbar") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/charts/apex-radar" class="nav-link" data-key="t-radar">
                      {{ $t("t-radar") }}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link href="/charts/apex-polararea" class="nav-link" data-key="t-polar-area">
                      {{ $t("t-polar-area") }}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <Link href="/charts/chartjs" class="nav-link" data-key="t-chartjs">{{ $t("t-chartjs") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/charts/echart" class="nav-link" data-key="t-echarts">{{ $t("t-echarts") }}
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <a class="nav-link menu-link" href="#sidebarIcons" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="sidebarIcons">
            <i class="ri-compasses-2-line"></i>
            <span data-key="t-icons">{{ $t("t-icons") }}</span>
          </a>
          <div class="collapse menu-dropdown" id="sidebarIcons">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <Link href="/icons/remix" class="nav-link" data-key="t-remix">{{ $t("t-remix") }}</Link>
              </li>
              <li class="nav-item">
                <Link href="/icons/boxicons" class="nav-link" data-key="t-boxicons">{{ $t("t-boxicons") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/icons/materialdesign" class="nav-link" data-key="t-material-design">
                {{ $t("t-material-design") }}</Link>
              </li>
              <li class="nav-item">
                <Link href="/icons/lineawesome" class="nav-link" data-key="t-line-awesome">
                {{ $t("t-line-awesome") }}</Link>
              </li>
              <li class="nav-item">
                <Link href="/icons/feather" class="nav-link" data-key="t-feather">{{ $t("t-feather") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/icons/crypto" class="nav-link" data-key="t-feather">{{ $t("t-crypto-svg") }}
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <a class="nav-link menu-link" href="#sidebarMaps" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="sidebarMaps">
            <i class="ri-map-pin-line"></i>
            <span data-key="t-maps">{{ $t("t-maps") }}</span>
          </a>
          <div class="collapse menu-dropdown" id="sidebarMaps">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <Link href="/maps/amcharts" class="nav-link" data-key="t-amcharts">
                {{ $t("t-amchart") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/maps/google" class="nav-link" data-key="t-google">
                {{ $t("t-google") }}
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/maps/leaflet" class="nav-link" data-key="t-leaflet">
                {{ $t("t-leaflet") }}
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <a class="nav-link menu-link" href="#sidebarMultilevel" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="sidebarMultilevel">
            <i class="ri-share-line"></i>
            <span data-key="t-multi-level">{{ $t("t-multi-level") }}</span>
          </a>
          <div class="collapse menu-dropdown" id="sidebarMultilevel">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <a class="nav-link" data-key="t-level-1.1">
                  {{ $t("t-level-1.1") }}
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#sidebarAccount" data-bs-toggle="collapse" role="button" aria-expanded="false"
                  aria-controls="sidebarAccount" data-key="t-level-1.2">
                  {{ $t("t-level-1.2") }}
                </a>
                <div class="collapse menu-dropdown" id="sidebarAccount">
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <a class="nav-link" data-key="t-level-2.1">
                        {{ $t("t-level-2.1") }}
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#sidebarlevel" data-bs-toggle="collapse" role="button"
                        aria-expanded="false" aria-controls="sidebarlevel" data-key="t-level-2.2">
                        {{ $t("t-level-2.2") }}
                      </a>
                      <div class="collapse menu-dropdown" id="sidebarlevel">
                        <ul class="nav nav-sm flex-column">
                          <li class="nav-item">
                            <a class="nav-link" data-key="t-level-3.1">
                              {{ $t("t-level-3.1") }}
                            </a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" data-key="t-level-3.2">
                              {{ $t("t-level-3.2") }}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul> -->
    </template>
  </div>
</template>