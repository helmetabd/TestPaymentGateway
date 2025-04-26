import { usePage } from "@inertiajs/vue3"
import { LayoutValue } from "../interfaces/Utils"
let layoutValue = {} as LayoutValue
if (usePage().props?.layoutValue) {
    layoutValue = usePage().props?.layoutValue as LayoutValue
}

export function changeLayoutType({ layoutType }: { layoutType: string }) {
    (usePage().props.layoutValue as LayoutValue).layoutType = layoutType
    switch (layoutType) {
        case 'horizontal':
            document.documentElement.setAttribute('data-layout', 'horizontal')
            break
        case 'vertical':
            document.documentElement.setAttribute('data-layout', 'vertical')
            break
        case 'twocolumn':
            document.documentElement.setAttribute('data-layout', 'twocolumn')
            break
        case 'semibox':
            document.documentElement.setAttribute('data-layout', 'semibox')
            break
    }
    document.body.removeAttribute('style')
}

export function changeLayoutWidth({ layoutWidth }: { layoutWidth: string }) {
    (usePage().props.layoutValue as LayoutValue).layoutWidth = layoutWidth
    switch (layoutWidth) {
        case 'fluid':
            document.documentElement.setAttribute('data-layout-width', 'fluid')
            break
        case 'boxed':
            document.documentElement.setAttribute('data-layout-width', 'boxed')
            break
    }
}

export function changeSidebarSize({ sidebarSize }: { sidebarSize: string }) {
    (usePage().props.layoutValue as LayoutValue).sidebarSize = sidebarSize
    switch (sidebarSize) {
        case '':
            document.documentElement.setAttribute('data-sidebar-size', '')
            break
        case 'sm-hover-active':
            document.documentElement.setAttribute('data-sidebar-size', 'sm-hover-active')
            break
        case 'sm-hover':
            document.documentElement.setAttribute('data-sidebar-size', 'sm-hover')
            break
        case 'sm':
            document.documentElement.setAttribute('data-sidebar-size', 'sm')
            break
        case 'md':
            document.documentElement.setAttribute('data-sidebar-size', 'md')
            break
        case 'lg':
            document.documentElement.setAttribute('data-sidebar-size', 'lg')
            break
    }
}

export function changeTopbar() {
    const documentMode = document.documentElement.getAttribute('data-topbar')
    if (documentMode === 'dark') {
        document.documentElement.setAttribute('data-topbar', 'light')
    } else {
        document.documentElement.setAttribute('data-topbar', 'dark')
    }
    (usePage().props.layoutValue as LayoutValue).topbar = document.documentElement.getAttribute('data-topbar') || 'light'
}

export function changeMode() {
    const documentMode = document.documentElement.getAttribute('data-bs-theme')
    if (documentMode === 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'light')
        document.documentElement.setAttribute('data-sidebar', 'light')
        layoutValue.sidebarColor = 'light'
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
        document.documentElement.setAttribute('data-sidebar', 'dark')
        layoutValue.sidebarColor = 'dark'
    }
    (usePage().props.layoutValue as LayoutValue).mode = document.documentElement.getAttribute('data-bs-theme') || 'light'
}

export function changePosition({ position }: { position: string }) {
    (usePage().props.layoutValue as LayoutValue).position = position
    switch (position) {
        case 'fixed':
            document.documentElement.setAttribute('data-layout-position', 'fixed')
            break
        case 'scrollable':
            document.documentElement.setAttribute('data-layout-position', 'scrollable')
            break
    }
}

export function changeSidebarView({ sidebarView }: { sidebarView: string }) {
    (usePage().props.layoutValue as LayoutValue).sidebarView = sidebarView
    switch (sidebarView) {
        case 'detached':
            document.documentElement.setAttribute('data-layout-style', 'detached')
            break
        case 'default':
            document.documentElement.setAttribute('data-layout-style', 'default')
            break
    }
}

export function changeSidebarColor({ sidebarColor }: { sidebarColor: string }) {
    (usePage().props.layoutValue as LayoutValue).sidebarColor = sidebarColor
    switch (sidebarColor) {
        case 'dark':
            document.documentElement.setAttribute('data-sidebar', 'dark')
            break
        case 'light':
            document.documentElement.setAttribute('data-sidebar', 'light')
            break
        case 'gradient':
            document.documentElement.setAttribute('data-sidebar', 'gradient')
            break
        case 'gradient-2':
            document.documentElement.setAttribute('data-sidebar', 'gradient-2')
            break
        case 'gradient-3':
            document.documentElement.setAttribute('data-sidebar', 'gradient-3')
            break
        case 'gradient-4':
            document.documentElement.setAttribute('data-sidebar', 'gradient-4')
            break
    }
}

export function changeSidebarImage({ sidebarImage }: { sidebarImage: string }) {
    (usePage().props.layoutValue as LayoutValue).sidebarImage = sidebarImage
    switch (sidebarImage) {
        case 'img-1':
            document.documentElement.setAttribute('data-sidebar-image', 'img-1')
            break
        case 'img-2':
            document.documentElement.setAttribute('data-sidebar-image', 'img-2')
            break
        case 'img-3':
            document.documentElement.setAttribute('data-sidebar-image', 'img-3')
            break
        case 'img-4':
            document.documentElement.setAttribute('data-sidebar-image', 'img-4')
            break
        case 'none':
            document.documentElement.setAttribute('data-sidebar-image', 'none')
            break
    }
}

export function changePreloader() {
    const documentMode = document.documentElement.getAttribute('data-preloader')
    if (documentMode === 'disable') {
        document.documentElement.setAttribute('data-preloader', 'enable')
    } else {
        document.documentElement.setAttribute('data-preloader', 'disable')
    }
    (usePage().props.layoutValue as LayoutValue).preloader = document.documentElement.getAttribute('data-preloader') || 'disable'
    sessionStorage.setItem('data-preloader', layoutValue.preloader)
}

export function changeVisibility({ visibility }: { visibility: string }) {
    (usePage().props.layoutValue as LayoutValue).visibility = visibility
    switch (visibility) {
        case 'show':
            document.documentElement.setAttribute('data-sidebar-visibility', 'show')
            break
        case 'hidden':
            document.documentElement.setAttribute('data-sidebar-visibility', 'hidden')
            break
    }
}