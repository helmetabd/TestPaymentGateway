<script setup lang="ts">

import Vertical from "./vertical.vue";
import Horizontal from "./horizontal.vue";
import TwoColumns from "./twocolumn.vue";
import { usePage } from "@inertiajs/vue3";
import { LayoutValue } from "resources/interfaces/Utils";
import { onMounted } from "vue";

const layout = usePage().props.layoutValue as LayoutValue
// onMounted(() => {
//     document.querySelector("html")?.setAttribute('dir', 'rtl');
// })
</script>

<template>
    <div>
        <!-- <Vertical>
            <slot />
        </Vertical> -->
        <Vertical v-if="layout.layoutType === 'vertical' || layout.layoutType === 'semibox'"
            :layout="layout.layoutType">
            <slot />
        </Vertical>

        <Horizontal v-if="layout.layoutType === 'horizontal'" :layout="layout.layoutType">
            <slot />
        </Horizontal>

        <TwoColumns v-if="layout.layoutType === 'twocolumn'" :layout="layout.layoutType">
            <slot />
        </TwoColumns>
    </div>
</template>
