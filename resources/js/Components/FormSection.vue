<script setup>
import { computed, useSlots } from 'vue';

defineEmits(['submitted']);

defineProps({
    title: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
})

const hasActions = computed(() => !!useSlots().actions);
</script>

<template>
    <div class="">
        <div class="">
            <form @submit.prevent="$emit('submitted')">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">{{ title }}</div>
                        <p class="text-muted mb-0">{{ description }}</p>
                    </div>
                    <div class="card-body p-4">
                        <div class="mb-3">
                            <slot name="form" />
                        </div>
                        <div v-if="hasActions">
                            <slot name="actions" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
