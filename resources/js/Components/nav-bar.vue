<script setup lang="ts">
import { Link, router, usePage } from '@inertiajs/vue3';
import simplebar from "simplebar-vue";

import i18n from "../i18n";

import us_flag from "@assets/images/flags/us.svg";
import spain from "@assets/images/flags/spain.svg";
import germany from "@assets/images/flags/germany.svg";
import italy from "@assets/images/flags/italy.svg";
import russia from "@assets/images/flags/russia.svg";
import china from "@assets/images/flags/china.svg";
import french from "@assets/images/flags/french.svg";
import ae from "@assets/images/flags/ae.svg";
import id from "@assets/images/flags/id.svg"

import img1 from "@assets/images/products/img-1.png";
import img2 from "@assets/images/products/img-2.png";
import img3 from "@assets/images/products/img-3.png";
import img4 from "@assets/images/products/img-4.png";
import img5 from "@assets/images/products/img-5.png";
import { computed, onMounted, reactive } from "vue";
import { LayoutValue } from 'resources/interfaces/Utils';
import { changeMode, changeSidebarSize, changeVisibility } from '../../utils/layoutHelper';

const page = usePage()
const user = computed(() => page.props.auth) as unknown as { id: string, name: string, email: string, profile_photo_path: string, profile_photo_url: string }
const logout = () => {
  router.post(route('logout'));
};
/**
 * Nav-bar Component
 */
const locale = sessionStorage.getItem("locale");
const state = reactive({
  languages: [{
    flag: us_flag,
    language: "en" as "en" | "ar" | "ch" | "fr" | "gr" | "it" | "ru" | "sp" | "id",
    title: "English",
  },
  {
    flag: id,
    language: "id" as "en" | "ar" | "ch" | "fr" | "gr" | "it" | "ru" | "sp" | "id",
    title: "Bahasa Indonesia",
  },
  {
    flag: spain,
    language: "sp" as "en" | "ar" | "ch" | "fr" | "gr" | "it" | "ru" | "sp" | "id",
    title: "Española",
  },
  {
    flag: germany,
    language: "gr" as "en" | "ar" | "ch" | "fr" | "gr" | "it" | "ru" | "sp" | "id",
    title: "Deutsche",
  },
  {
    flag: italy,
    language: "it" as "en" | "ar" | "ch" | "fr" | "gr" | "it" | "ru" | "sp" | "id",
    title: "italiana",
  },
  {
    flag: russia,
    language: "ru" as "en" | "ar" | "ch" | "fr" | "gr" | "it" | "ru" | "sp" | "id",
    title: "русский",
  },
  {
    flag: china,
    language: "ch" as "en" | "ar" | "ch" | "fr" | "gr" | "it" | "ru" | "sp" | "id",
    title: "中國人",
  },
  {
    flag: french,
    language: "fr" as "en" | "ar" | "ch" | "fr" | "gr" | "it" | "ru" | "sp" | "id",
    title: "Français",
  },
  {
    flag: ae,
    language: "ar" as "en" | "ar" | "ch" | "fr" | "gr" | "it" | "ru" | "sp" | "id",
    title: "Arabic",
  },
  ],
  cartItems: [
    {
      id: 1,
      productImage: img1,
      productName: "Branded T-Shirts",
      productLink: "/ecommerce/product-details",
      quantity: "10 x $32",
      itemPrice: "320",
    },
    {
      id: 2,
      productImage: img2,
      productName: "Bentwood Chair",
      productLink: "/ecommerce/product-details",
      quantity: "5 x $18",
      itemPrice: "89",
    },
    {
      id: 3,
      productImage: img3,
      productName: "Borosil Paper Cup",
      productLink: "/ecommerce/product-details",
      quantity: "3 x $250",
      itemPrice: "750",
    },
    {
      id: 4,
      productImage: img4,
      productName: "Gray Styled T-Shirt",
      productLink: "/ecommerce/product-details",
      quantity: "1 x $1250",
      itemPrice: "1250",
    },
    {
      id: 5,
      productImage: img5,
      productName: "Stillbird Helmet",
      productLink: "/ecommerce/product-details",
      quantity: "2 x $495",
      itemPrice: "990",
    },
  ],
  layout: page.props.layoutValue as LayoutValue,
  lan: locale || 'en' as "en" | "ar" | "ch" | "fr" | "gr" | "it" | "ru" | "sp" | "id",
  text: null,
  flag: null as string | null,
  value: null,
  myVar: 1,
  search: ''
})
function isCustomDropdown() {
  //Search bar
  var searchOptions = document.getElementById('search-close-options')
  var dropdown = document.getElementById('search-dropdown')
  var searchInput = document.getElementById('search-options') as HTMLInputElement

  searchInput?.addEventListener('focus', () => {
    var inputLength = searchInput?.value.length
    if (inputLength > 0) {
      dropdown?.classList.add('show')
      searchOptions?.classList.remove('d-none')
    } else {
      dropdown?.classList.remove('show')
      searchOptions?.classList.add('d-none')
    }
  })

  searchInput?.addEventListener('keyup', () => {
    var inputLength = searchInput.value.length
    if (inputLength > 0) {
      dropdown?.classList.add('show')
      searchOptions?.classList.remove('d-none')
    } else {
      dropdown?.classList.remove('show')
      searchOptions?.classList.add('d-none')
    }
  })

  searchOptions?.addEventListener('click', () => {
    searchInput.value = ''
    dropdown?.classList.remove('show')
    searchOptions?.classList.add('d-none')
  })

  document.body.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).getAttribute('id') !== 'search-options') {
      dropdown?.classList.remove('show')
      searchOptions?.classList.add('d-none')
    }
  })
}
function toggleHamburgerMenu() {
  var windowSize = document.documentElement.clientWidth
  let layoutType = state.layout.layoutType

  changeVisibility({ visibility: 'show' })
  let visiblilityType = state.layout.visibility

  if (windowSize > 767) {
    document.querySelector('.hamburger-icon')?.classList.toggle('open')
  }

  //For collapse horizontal menu (unused)
  if (state.layout.layoutType === 'horizontal') {
    document.body.classList.contains('menu')
      ? document.body.classList.remove('menu')
      : document.body.classList.add('menu')
  }

  //For collapse vertical menu
  if (visiblilityType === 'show' && (layoutType === 'vertical' || layoutType === 'semibox')) {
    if (windowSize < 1025 && windowSize > 767) {
      document.body.classList.remove('vertical-sidebar-enable')
      state.layout.sidebarSize == 'sm'
        ? changeSidebarSize({ sidebarSize: 'lg' })
        : changeSidebarSize({ sidebarSize: 'sm' })
    } else if (windowSize > 1025) {
      document.body.classList.remove('vertical-sidebar-enable')
      state.layout.sidebarSize == 'lg'
        ? changeSidebarSize({ sidebarSize: 'sm' })
        : changeSidebarSize({ sidebarSize: 'lg' })
    } else if (windowSize <= 767) {
      document.body.classList.add('vertical-sidebar-enable')
      changeSidebarSize({ sidebarSize: 'lg' })
    }
  }
  //Two column menu
  if (layoutType == 'twocolumn') {
    document.body.classList.contains('twocolumn-panel')
      ? document.body.classList.remove('twocolumn-panel')
      : document.body.classList.add('twocolumn-panel')
  }
}
function initFullScreen() {
  document.body.classList.toggle('fullscreen-enable')
  if (!document.fullscreenElement) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    }
  }
  else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
function setLanguage(locale: "en" | "ar" | "ch" | "fr" | "gr" | "it" | "ru" | "sp" | "id", country: any, flag: string) {
  state.lan = locale;
  state.text = country;
  state.flag = flag;
  document.getElementById("header-lang-img")?.setAttribute("src", flag);
  i18n.global.locale = locale;
}
onMounted(() => {
  state.flag = locale;
  state.languages.forEach((item: { language: any; flag: string; }) => {
    if (item.language == state.flag) {
      document.getElementById("header-lang-img") ? document.getElementById("header-lang-img")?.setAttribute("src", item.flag) : '';
    }
  });

  document.addEventListener("scroll", function () {
    var pageTopbar = document.getElementById("page-topbar");
    if (pageTopbar) {
      document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50 ? pageTopbar.classList.add(
        "topbar-shadow") : pageTopbar.classList.remove("topbar-shadow");
    }
  });
  if (document.getElementById("topnav-hamburger-icon"))
    document.getElementById("topnav-hamburger-icon")?.addEventListener("click", toggleHamburgerMenu);

  isCustomDropdown();
}) 
</script>

<template>
  <header id="page-topbar">
    <div class="layout-width">
      <div class="navbar-header">
        <div class="d-flex">
          <!-- LOGO -->
          <div class="navbar-brand-box horizontal-logo">
            <Link href="/dashboard" class="logo logo-dark">
            <span class="logo-sm">
              <img src="@assets/images/logo-sm.png" alt="" height="22" />
            </span>
            <span class="logo-lg">
              <img src="@assets/images/logo-dark.png" alt="" height="17" />
            </span>
            </Link>

            <Link href="/" class="logo logo-light">
            <span class="logo-sm">
              <img src="@assets/images/logo-sm.png" alt="" height="22" />
            </span>
            <span class="logo-lg">
              <img src="@assets/images/logo-light.png" alt="" height="17" />
            </span>
            </Link>
          </div>

          <button type="button" class="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
            id="topnav-hamburger-icon">
            <span class="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          <!-- App Search-->
          <form class="app-search d-none d-md-block">
            <div class="position-relative">
              <input type="text" class="form-control" placeholder="Search Staff" autocomplete="off" id="search-options"
                v-model="state.search" />
              <span class="mdi mdi-magnify search-widget-icon"></span>
              <span class="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
                id="search-close-options"></span>
            </div>
            <div class="dropdown-menu dropdown-menu-lg" id="search-dropdown">
              <simplebar data-simplebar style="max-height: 320px">
                <div class="dropdown-header">
                  <h6 class="text-overflow text-muted mb-0 text-uppercase">Recent Searches</h6>
                </div>
                <div class="dropdown-item bg-transparent text-wrap">
                  <Link href="/" class="btn btn-soft-secondary btn-sm rounded-pill">how to setup <i
                    class="mdi mdi-magnify ms-1"></i></Link>
                  <Link href="/" class="btn btn-soft-secondary btn-sm rounded-pill">buttons <i
                    class="mdi mdi-magnify ms-1"></i></Link>
                </div>
                <div class="dropdown-header mt-2">
                  <h6 class="text-overflow text-muted mb-1 text-uppercase">Pages</h6>
                </div>
                <a href="javascript:void(0);" class="dropdown-item notify-item">
                  <i class="ri-bubble-chart-line align-middle fs-18 text-muted me-2"></i>
                  <span>Analytics Dashboard</span>
                </a>
                <a href="javascript:void(0);" class="dropdown-item notify-item">
                  <i class="ri-lifebuoy-line align-middle fs-18 text-muted me-2"></i>
                  <span>Help Center</span>
                </a>
                <a href="javascript:void(0);" class="dropdown-item notify-item">
                  <i class="ri-user-settings-line align-middle fs-18 text-muted me-2"></i>
                  <span>My account settings</span>
                </a>
                <div class="dropdown-header mt-2">
                  <h6 class="text-overflow text-muted mb-2 text-uppercase">Members</h6>
                </div>
                <div class="notification-list">
                  <a href="javascript:void(0);" class="d-flex dropdown-item notify-item py-2">
                    <img src="@assets/images/logo-sm.png" class="me-3 rounded-circle avatar-xs" alt="user-pic" />
                    <div class="flex-grow-1">
                      <h6 class="m-0">Angela Bernier</h6>
                      <span class="fs-11 mb-0 text-muted">Manager</span>
                    </div>
                  </a>
                  <a href="javascript:void(0);" class="d-flex dropdown-item notify-item py-2">
                    <img src="@assets/images/logo-sm.png" class="me-3 rounded-circle avatar-xs" alt="user-pic" />
                    <div class="flex-grow-1">
                      <h6 class="m-0">David Grasso</h6>
                      <span class="fs-11 mb-0 text-muted">Web Designer</span>
                    </div>
                  </a>
                  <a href="javascript:void(0);" class="d-flex dropdown-item notify-item py-2">
                    <img src="@assets/images/logo-sm.png" class="me-3 rounded-circle avatar-xs" alt="user-pic" />
                    <div class="flex-grow-1">
                      <h6 class="m-0">Mike Bunch</h6>
                      <span class="fs-11 mb-0 text-muted">React Developer</span>
                    </div>
                  </a>
                </div>
              </simplebar>

              <div class="text-center pt-3 pb-1">
                <Link href="/pages/search-results" class="btn btn-primary btn-sm">View All Results <i
                  class="ri-arrow-right-line ms-1"></i></Link>
              </div>
            </div>
          </form>
        </div>
        <div class="d-flex align-items-center">
          <div class="btn-group dropdown">
            <button class="btn btn-md btn-icon btn-topbar dropdown-toggle rounded-circle arrow-none" type="button"
              aria-expanded="false" data-bs-toggle="dropdown">
              <img id="header-lang-img" :src="state.flag ?? us_flag" alt="Header Language" height="20" class="rounded">
            </button>
            <!-- style="position: absolute; inset: 0px 0px auto; margin: 0px; transform: translate(-110px, 55px);" -->
            <div data-bs-offset="10,20" class="dropdown-menu dropdown-menu-end offset">
              <div class="dropdown-item py-2" v-for="(entry, key) in state.languages"
                @click="setLanguage(entry.language, entry.title, entry.flag)" :key="key">
                <img :src="entry.flag" alt="user-image" class="me-2 rounded" height="18">
                <span class="align-middle">{{ entry.title }}</span>
              </div>
            </div>
          </div>
          <div class="ms-1 header-item d-none d-sm-flex">
            <button type="button" class="btn btn-ghost-secondary btn-icon btn-topbar rounded-circle shadow-none"
              data-toggle="fullscreen" @click="initFullScreen">
              <i class="bx bx-fullscreen fs-22"></i>
            </button>
          </div>
          <div class="ms-1 header-item d-none d-sm-flex">
            <button type="button"
              class="btn btn-ghost-secondary btn-icon btn-topbar rounded-circle light-dark-mode shadow-none"
              @click="changeMode">
              <i class="bx bx-moon fs-22"></i>
            </button>
          </div>
          <div class="btn-group ms-sm-3 header-item topbar-user dropdown">
            <button class="btn btn-md btn-link rounded-circle arrow-none dropdown-toggle" type="button"
              aria-expanded="false" data-bs-toggle="dropdown">
              <span class="d-flex align-items-center">
                <img v-if="user" class="rounded-circle header-profile-user" :src="user.profile_photo_url"
                  :alt="user.name">
                <span class="text-start ms-xl-2">
                  <span class="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{{ user.name
                    }}</span>
                  <span class="d-none d-xl-block ms-1 fs-12 user-name-sub-text">Founder</span>
                </span>
              </span>
            </button>
            <div class="dropdown-menu dropdown-menu-end">
              <h6 class="dropdown-header">Welcome {{ user.name }}!</h6>
              <Link class="dropdown-item" :href="route('profile.show')"><i
                class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
              <span class="align-middle">Profile</span>
              </Link>
              <Link class="dropdown-item" href="/pages/profile-setting">
              <span class="bg-success-subtle text-success mt-1 float-end">New</span><i
                class="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>
              <span class="align-middle"> Settings</span>
              </Link>
              <form method="POST" @submit.prevent="logout" class="dropdown-item">
                <button type="submit" class="btn p-0"><i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                  Logout</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>