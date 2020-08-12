<template>
    <div v-show="show" class="mz__dialog">
        <div class="mz__dialog--content">
            <div class="mz__dialog--closeWrap">
                <h3 class="mz__dialog--title">
                    {{ title }}
                </h3>
                <span
                    v-show="isShowCloseIcon"
                    class="mz-icon-icon--close mz__dialog--close"
                    @click="closeDialog"
                ></span>
            </div>
            <slot>只有在没有要分发的内容时才会显示。</slot>
            <div v-if="isShowBtn" class="mz__dialog--btnBox">
                <div v-if="type == 'confirm'" class="mz__dialog--button mz__dialog--defaultBtn" @click="closeDialog">
                    {{ cancelTex }}
                </div>
                <div class="mz__dialog--button mz__dialog--confirmBtn" :style="{'background':btnColor}" @click="dialogBtn">
                    {{ btnText }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MZDialog',
    props: {
        btnColor: {
            type: String,
            required: false,
            default: ''
        },
        show: {
            type: Boolean,
            required: false,
            default: false
        },
        title: {
            type: String,
            required: false,
            default: '提醒'
        },
        btnText: {
            type: String,
            required: false,
            default: '确 定'
        },
        cancelTex: {
            type: String,
            required: false,
            default: '取 消'
        },
        type: {
            type: String,
            required: false,
            default: 'dialog'
        },
        isShowCloseIcon: {
            type: Boolean,
            required: false,
            default: true
        },
        isShowBtn: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    data() {
        return {}
    },
    methods: {
        dialogBtn() {
            this.closeDialog()
            this.$emit('dialogBtn')
        },
        closeDialog() {
            this.$emit('closeDialog')
        }
    }
}
</script>