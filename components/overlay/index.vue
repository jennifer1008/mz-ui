<template>
    <transition name="mz-fade">
        <div v-show="show" class="mz-overlay" @click="$emit('click')">
            <slot></slot>
        </div>
    </transition>
    
</template>
<script>
export default {
    name: 'MZOverlay',
    props: {
        show: {
            type: Boolean,
            required: false,
            default: true
        },
    },
    data() {
        return {}
    },
    methods: {
    }
}
</script>
