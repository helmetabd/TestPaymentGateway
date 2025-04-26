import type { Modules } from './User'

export interface LayoutValue {
    layoutType: string
    layoutWidth: string
    sidebarSize: string
    topbar: string
    mode: string
    position: string
    sidebarView: string
    sidebarColor: string
    sidebarImage: string
    preloader: string
    visibility: string
}
export interface Role {
    id: number
    name: string
    display_name: string
    color: string
    created_at: string
    updated_at: string
    permissions: Permission[]
}
export interface Permission {
    module: string
    module_id: number
    create: number
    read: number
    update: number
}
export interface AuthUser {
    id: number
    role_id: number
    name: string
    email: string
    email_verified_at: string | null
    two_factor_confirmed_at: string | null
    current_team_id: number | null
    profile_photo_path: string | null
    settings: string | null
    created_at: string
    updated_at: string
    profile_photo_url: string | null
    role: Role
}
export interface Menu {
    name: string
    display_name: string
    icon: string | null
    route: string | null
    module: string
    auth_level_min: number
    admin_required: boolean
    caret: boolean
    childs?: Menu[]
    type?: string
}
export interface Option {
    label: string | number
    value: number
    department?: number
}
export interface FormField {
    [key: string]: string | number | null | undefined | string[]
}
export interface SpecialDashboard {
    [key: string]: string | number | undefined | string[]
}
export interface Simple {
    id: number
    name: string
}
export interface links {
    url: string | null
    label: string
    active: boolean
}
// export interface ResponseUtils {
//     data: any[]
//     meta: {
//         current_page: number
//         from: number
//         last_page: number
//         links: links[]
//         path: string
//         per_page: number
//         to: number
//         total: number
//     }
//     links: {
//         first: string
//         last: string
//         prev: string | null
//         next: string | null
//     }
// }
export interface ResponseUtils {
    data: any[]
    current_page: number
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: links[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}
export interface PaginationType {
    lastPage: number
    currentPage: number
    from: number
    to: number
    total: number
    links: links[]
    lastPageUrl: string
    nextPageUrl: string | null
    prevPageUrl: string | null
}
export interface Privilage {
    data: {
        id: number
        nip: number | null
        status: number
        name: string
        email: string
        avatar: string | null
        last_login: string
        permissions: Permission[]
    }
    params: {
        modules: Modules
    }
}
export interface ButtonConfig {
    excel: boolean
    copy: boolean
    print: boolean
}
export interface Column {
    name: string
    label: string
    sortable: boolean
    checkable?: boolean
    textTypes?: any
    hidden?: boolean
    filterable: boolean
    width?: string
    bold?: boolean
    headerClass?: string
    routeName?: string
    class?: string
    isNumber?: boolean
    targetCollapsed?: boolean
    currency?: string
    fixedNumber?: number
    percentage?: { target: string; actual: string }
    custom?: any
    badge?: any
    dateConfig?: any
    offcanvas?: any
    stackedImage?: boolean
    isArray?: boolean
    isFirst?: boolean
    isLast?: boolean
    defaultValue?: any
    display?: string
    customizeRow?: boolean
    color?: boolean
    params?: { id: string; date: any }
}
export interface GroupHeader {
    title: string
    colspan: number
    class?: string
}
export interface CustomRow {
    value: string
    class: string
}
export interface Props {
    table_search?: boolean
    table_show?: boolean
    table_pagination?: boolean
    table_class?: string
    group?: boolean
    collapsed?: boolean
    sortBy?: string
    order?: number
    page_size?: number
    dataTable: any[]
    column: Column[]
    headerGroup?: GroupHeader[]
    buttons?: ButtonConfig
    customRow?: CustomRow
    copyTitle?: string
    headerRowClass?: string
    paginationClass?: string
}
export interface RenderColumn {
    text: string
    component?: string
    props?: any
    imageSrc?: string
    iconClass?: string
    uniqueFirst?: string
    iconColorObject?: string
    iconColor?: string
    parent?: RenderColumn
}