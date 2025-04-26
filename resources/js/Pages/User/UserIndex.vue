<script setup lang="ts">
import Layout from "@/Layouts/main.vue"
import { Prop, reactive, watch } from 'vue'
import Swal from "sweetalert2"
import BaseCard from "@/Components/cards/base-card.vue"
// import DatatableServer from '@/components/datatables/DatatableServer.vue'
// import checkRole from "@/utils/adminActionButton"
import BasicInput from "@/Components/inputs/BasicInput.vue"
import { errorHelper } from "@/utils/alertHelper"
import { router } from "@inertiajs/vue3"
import ModalBasic from "@/Components/modals/ModalBasic.vue"
import { FormField, Option, ResponseUtils } from "resources/interfaces/Utils"
import { route } from "ziggy-js"
import DatatableClient from "@/Components/datatables/DatatableClient.vue"
import DatatableClientTS from "@/Components/datatables/DatatableClientTs.vue"
import Multiselect from "@vueform/multiselect"
import DatatableServer from "@/Components/datatables/DatatableServer.vue"

interface Param {
  perpage?: number
  sort?: string
  order_by?: string
  search?: string
  page?: number
}
interface Props {
  users: ResponseUtils
}
// const router = useRouter()
const props = defineProps<Props>()

const state = reactive({
  url: 'users.index',
  checked: false,
  modalAdd: false,
  searchPandawaForm: '' as string,
  userForm: {} as FormField,
  options: {
    role: {} as Option
  },
  tableData: {
    order_by: 'id',
    perpage: 10,
    sort: 'asc'
  } as Param,
  statusSearch: {} as { message: string; code: string },
  componentKey: 0,
  perPage: ['10', '25', '50', '100'],
  columns: [
    { hidden: false, label: 'ID', name: 'id', sortable: true, filterable: false },
    {
      hidden: false,
      label: 'Name',
      name: 'name',
      class: 'text-start',
      bold: true,
      custom: {
        routeName: 'users.show',
        params: 'id',
        image: 'avatar',
        uniqueIcon: true
      },
      sortable: true,
    },
    {
      hidden: false,
      label: 'Auth/Role',
      name: 'role_id',
      display: 'role.id',
      badge: {
        types: [
          { value: 1, type: 'danger', label: 'Super Admin' },
          { value: 2, type: 'primary', label: 'Admin' },
          { value: 3, type: 'warning', label: 'User' }
        ]
      },
      sortable: true,
    },
    {
      hidden: false,
      label: 'Status',
      name: 'status',
      badge: {
        types: [
          { value: 1, type: 'success', label: 'Active' },
          { value: 0, type: 'danger', label: 'Suspended' }
        ]
      },
      sortable: true,
    },
    {
      hidden: false,
      label: 'Email',
      name: 'email',
      sortable: false,
      filterable: true
    },
    {
      hidden: false,
      label: 'NIP',
      name: 'nip',
      sortable: false,
    },
    {
      hidden: false,
      label: 'Last Login',
      name: 'last_login',
      custom: {
        icon: 'ri-time-line me-1 text-muted'
      },
      sortable: false,
    }
  ],
  inputFields: [
    {
      id: 1,
      label: 'Pandawa User ID',
      name: 'pandawa_user_id',
      pandawa: 'id',
      inputType: 'text',
      modelValue: ''
    },
    {
      id: 2,
      label: 'NIP',
      name: 'nip',
      pandawa: 'user_nip',
      inputType: 'text',
      modelValue: ''
    },
    {
      id: 3,
      label: 'Name',
      name: 'name',
      pandawa: 'user_name',
      inputType: 'text',
      modelValue: '',
      required: true
    },
    {
      id: 4,
      label: 'Email',
      name: 'email',
      pandawa: 'user_email',
      inputType: 'email',
      modelValue: ''
    }
  ]
})

function getProjects() {
  const paramData: object = Object.fromEntries(
    Object.entries(state.tableData).filter(([, value]) => value !== null)
  )
  let data = new URLSearchParams()
  Object.entries(paramData).forEach(([k, v]) => {
    if (v) {
      data.append(k, v)
    }
  })
  // router.replace(window.location.href, )
  // router.replace({
  //   query: paramData
  // })
  state.tableData = paramData
}

function createData() {
  // userService.store(state.userForm).then(() => {
  //   Swal.fire({
  //     icon: 'success',
  //     text: 'Berhasil menyimpan data',
  //     title: 'Success',
  //     allowOutsideClick: false,
  //     allowEscapeKey: false
  //   })
  //     .then((e) => {
  //       if (e.isConfirmed) {
  //         forceRender()
  //         state.modalAdd = false
  //       }
  //     })
  //     .catch((e) => errorHelper(e))
  // })
}

// async function searchPandawaUser(email: string) {
//   await utilsService
//     .getPandawaUser(email)
//     .then((res) => {
//       state.inputFields.forEach((e) => {
//         state.userForm[e.name] = res[e.pandawa]
//       })
//       state.statusSearch.message = 'User has been found'
//       state.statusSearch.code = 'success'
//     })
//     .catch((e) => {
//       console.error(e)
//       state.statusSearch.message = 'User not found'
//       state.statusSearch.code = 'danger'
//     })
// }

function toggleHeader(header: string) {
  let index = state.columns.findIndex((col) => col.label === header)
  state.columns[index].hidden = !state.columns[index].hidden
}

function forceRender() {
  state.componentKey++
}

async function clear() {
  state.modalAdd = true
  state.searchPandawaForm = ''
  state.statusSearch = {} as { message: string; code: string }
  // state.options = await userService.create()
  state.userForm = {}
  state.checked = false
}

// getProjects()

// watch(() => state.tableData, (newValue, oldValue) => {
//   if (newValue != oldValue) {
//     router.get(route('users.index'), state.tableData, { replace: true, preserveState: true })
//   }
// }, { deep: true, immediate: true })

</script>

<template>
  <Layout>
    <div class="row">
      <BaseCard noFooter tableCard title="Users">
        <template #titleIcon>
          <i class="las la-braille me-1"></i>
        </template>
        <template #cardButton>
          <div class="btn-group btn-sm">
            <button class="btn btn-success btn-sm dropdown-toggle m-1" type="button" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <i class="las la-columns"></i> <span class="hide-xs">Column</span>
            </button>
            <div class="dropdown-menu p-3 pb-1 fs-11 text-uppercase" id="showHideColumn" style="">
              <div class="form-check form-check-success mb-1 dropdown-item" v-for="(toggle, index) in state.columns"
                :key="index">
                <input class="form-check-input toggle-vis" type="checkbox" :checked="!toggle.hidden"
                  @change="toggleHeader(toggle.label)" />
                {{ toggle.label }}
              </div>
            </div>
            <button class="btn btn-primary btn-sm m-1" @click="clear" type="button">
              <!-- v-if="checkRole('user.users', 'create')"> -->
              <i class="ri-add-circle-line align-bottom me-1"></i>Add User
            </button>
          </div>
        </template>
        <template #cardBody>
          <DatatableServer :key="state.componentKey" :url="state.url" :column="state.columns" :params="state.tableData"
            :data-table="props.users" />
          <!-- <div class="dataTables_wrapper dt-bootstrap5 no-footer">
            <div class="row">
              <div class="row text-muted text-uppercase fs-11">
                <div class="col-sm-12 col-md-6">
                  <div class="dataTables_length" id="datatable_length">
                    <label>Show
                      <select v-model="state.tableData.perpage" name="datatable_length" aria-controls="datatable"
                        class="form-select form-select-sm">
                        <option v-for="(records, index) in state.perPage" :key="index" :value="records">
                          {{ records }}
                        </option>
                      </select>
                      entries</label>
                  </div>
                </div>
                <div class="col-sm-12 col-md-6">
                  <div id="datatable_filter" class="dataTables_filter">
                    <label>Search:<input v-model="state.tableData.search" type="search"
                        class="form-control form-control-sm" placeholder="" aria-controls="datatable" /></label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div style="overflow-x: auto; overflow-y: hidden;">
                <table
                  class="table table-hover table-bordered align-middle text-nowrap dt-responsive nowrap dataTable no-footer">
                  <thead>
                    <tr>
                      <th v-for="column in state.columns" class="sorting">{{ column.label }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in props.users?.data">
                      <td v-for="column in state.columns">{{ item[column.name] }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div> -->
          <!-- <DatatableClient :key="state.componentKey" :column="state.columns" :data-table="props.users?.data" /> -->
          <!-- <DatatableClientTS :key="state.componentKey" :column="state.columns" :data-table="props.users?.data" /> -->
        </template>
        <template #customFooter>
          <div class="card-footer pt-1 pb-1 bg-light">
            <code>API SOURCE: PANDAWA</code>
          </div>
        </template>
      </BaseCard>
    </div>
    <ModalBasic :modelValue="state.modalAdd" :title="'Create User'" @toggle="state.modalAdd = $event">
      <template #modalBody>
        <form @submit.prevent="createData">
          <!-- <div class="row g-3">
            <div class="col-xxl-12">
              <label for="searchPandawaUserForm" class="mt-2 mb-2">Pandawa Email</label>
              <div class="input-group mb-3">
                <input id="searchPandawaUserForm" type="email" class="form-control" placeholder="Pandawa user email"
                  aria-label="Pandawa User Search" aria-describedby="searchPandawa searchStatus"
                  v-model="state.searchPandawaForm" />
                <button class="btn btn-outline-secondary" type="button" id="searchPandawa"
                  @click="searchPandawaUser(state.searchPandawaForm)">
                  Search
                </button>
              </div>
              <div :class="'form-text text-' + state.statusSearch.code" v-if="state.statusSearch" id="searchStatus">
                {{ state.statusSearch.message }}
              </div>
            </div>
          </div> -->
          <div class="row g-3">
            <div v-for="input in state.inputFields" :key="input.id" class="col-xxl-12">
              <BasicInput :label="input.label" :type="input.inputType" :name="input.name" :placeholder="input.label"
                :required="input.required ? true : false" disabled v-model="state.userForm[input.name]" />
            </div>
            <div class="col-12">
              <label class="mt-2 mb-2">Select Role</label>
              <Multiselect v-model="state.userForm.role" :options="state.options.role" placeholder="Select Role" />
            </div>
            <div class="col-5">
              <input type="checkbox" id="checkbox" style="margin-right: 4px" v-model="state.checked" />
              <label for="checkbox">Confirm</label>
            </div>
            <div class="col-7">
              <div class="hstack gap-2 justify-content-end">
                <button type="button" class="btn btn-light" @click="state.modalAdd = false">
                  Close
                </button>
                <button :disabled="state.checked ? false : true" type="submit" class="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </template>
    </ModalBasic>
  </Layout>
</template>
