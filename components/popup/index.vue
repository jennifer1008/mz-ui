<template>
    <div>
        <MZOverlay :show="show" @click="CloseDialog"></MZOverlay>
        <transition name="mz-popup-slide-bottom">
            <div v-show="show" class="mz__popup">
                <div class="mz__popup--content">
                    <div class="mz__popup--header">
                        {{ title }}
                        <span
                            class="mz-icon-icon--close mz__popup--close"
                            @click="CloseDialog"
                        ></span>
                    </div>
                    <slot>只有在没有要分发的内容时才会显示。</slot>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'MZPopup',
    props: {
        show: {
            type: Boolean,
            required: false,
            default: true
        },
        title: {
            type: String,
            required: false,
            default: '提示'
        }
    },
    methods: {
        CloseDialog() {
            this.$emit('closeDialog')
        }
    }
}
</script>