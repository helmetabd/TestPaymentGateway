<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
// import router from "@/router";
import simplebar from "simplebar-vue";
// import { layoutComputed } from "@/state/helpers";

import NavBar from "@/Components/nav-bar.vue";
import Menu from "@/Components/menu.vue";
import RightBar from "@/Components/right-bar.vue";
import Footer from "@/Components/footer.vue";
import { onMounted, reactive } from 'vue';
import { LayoutValue } from 'resources/interfaces/Utils';
sessionStorage.setItem('hoverd', 'false');
/**
 * Vertical layout
 */
const page = usePage()
const state = reactive({
  isMenuCondensed: false,
  layout: page.props.layoutValue as LayoutValue
})

document.body.removeAttribute("data-layout");
document.body.removeAttribute("data-topbar");
document.body.removeAttribute("data-layout-size");

function initActiveMenu() {
  if (document.documentElement.getAttribute('data-sidebar-size') === 'sm-hover') {
    sessionStorage.setItem('hoverd', 'true');
    document.documentElement.setAttribute('data-sidebar-size', 'sm-hover-active');
  } else if (document.documentElement.getAttribute('data-sidebar-size') === 'sm-hover-active') {
    sessionStorage.setItem('hoverd', 'false');
    document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
  } else {
    document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
  }
}
function toggleMenu() {
  document.body.classList.toggle("sidebar-enable");
  if (window.screen.width >= 992) {
    document.body.classList.remove("sidebar-enable");
    document.body.classList.remove("vertical-collpsed");
    document.body.classList.toggle("vertical-collpsed");
  } else {
    document.body.classList.remove("sidebar-enable");
    document.body.classList.remove("vertical-collpsed");
  }
  state.isMenuCondensed = !state.isMenuCondensed;
}
function toggleRightSidebar() {
  document.body.classList.toggle("right-bar-enabled");
}
function hideRightSidebar() {
  document.body.classList.remove("right-bar-enabled");
}
onMounted(() => {
  if (sessionStorage.getItem('hoverd') == 'true') {
    document.documentElement.setAttribute('data-sidebar-size', 'sm-hover-active');
  }
  document.getElementById('overlay')?.addEventListener('click', () => {
    document.body.classList.remove('vertical-sidebar-enable');
  });
}) 
</script>

<template>
  <div id="layout-wrapper">
    <NavBar />
    <div>
      <!-- ========== Left Sidebar Start ========== -->
      <!-- ========== App Menu ========== -->
      <div class="app-menu navbar-menu">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <!-- Dark Logo-->
          <Link href="/" class="logo logo-dark">
          <span class="logo-sm">
            <img src="@assets/images/logo-sm.png" alt="" height="22" />
          </span>
          <span class="logo-lg">
            <img src="@assets/images/logo-dark.png" alt="" height="17" />
          </span>
          </Link>
          <!-- Light Logo-->
          <Link href="/" class="logo logo-light">
          <span class="logo-sm">
            <img src="@assets/images/logo-sm.png" alt="" height="22" />
          </span>
          <span class="logo-lg">
            <img src="@assets/images/logo-light.png" alt="" height="17" />
          </span>
          </Link>
          <button type="button" class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover" @click="initActiveMenu">
            <i class="ri-record-circle-line"></i>
          </button>
        </div>

        <simplebar id="scrollbar" class="h-100" ref="scrollbar">
          <Menu></Menu>
        </simplebar>
        <div class="sidebar-background"></div>
      </div>
      <!-- Left Sidebar End -->
      <!-- Vertical Overlay-->
      <div class="vertical-overlay" id="overlay"></div>
    </div>
    <!-- ============================================================== -->
    <!-- Start Page Content here -->
    <!-- ============================================================== -->

    <div class="main-content">
      <div class="page-content">
        <!-- Start Content-->
        <div class="container-fluid">
          <slot />
        </div>
      </div>
      <Footer />
    </div>
    <RightBar />
  </div>
</template>