<template>
    <div v-show="isShow" class="dialogOverlay">
        <div class="dialog">
            <div class="closeWrap">
                <h3 class="title">
                    {{ title }}
                </h3>
                <span
                    v-show="isShowCloseIcon"
                    id="close-btn"
                    class="iconfont iconcross mengzhualan-color"
                    @click="closeDialog"
                ></span>
            </div>
            <slot>只有在没有要分发的内容时才会显示。</slot>
            <div
                v-if="isShowBtn && type == 'dialog'"
                class="btn"
                :class="btnColor"
                @click="dialogBtn"
            >
                {{ btnText }}
            </div>
            <div v-if="isShowBtn && type == 'confirm'" class="btnBox">
                <div class="btn-default" @click="closeDialog">
                    {{ cancelTex }}
                </div>
                <div class="btn-confirm" @click="dialogBtn">
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
            default: 'mengzhualan'
        },
        isShow: {
            type: Boolean,
            required: false,
            default: true
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
<style lang="scss">
.dialogOverlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: RGBA(51, 51, 51, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;

    .dialog {
        width: 100%;
        padding: 20px;
        background-color: white;
        border: 1px solid #70b2bb;
        border-radius: 10px;
        display: flex;
        align-items: center;
        flex-direction: column;
        position: relative;
        margin: 0 15px;
        .closeWrap {
            width: 100%;
            position: relative;
            margin-bottom: 10px;
            // text-align: right;
            .title {
                background: none;
                color: #70b2bb;
                text-align: center;
                font-size: 16px;
            }
            #close-btn {
                position: absolute;
                right: 0;
                top: 0;
            }
        }
        > p {
            margin-top: 20px;
            color: RGBA(111, 111, 111, 0.66);
            font-size: 18px;
            text-align: center;
            line-height: 25px;
            width: 100%;
        }
        .btn {
            width: 259px;
            height: 45px;
            text-align: center;
            line-height: 45px;
            border-radius: 22.5px;
            font-size: 18px;
            color: white;
            margin-top: 26px;
            background: #70b2bb;
        }
        .btnBox {
            position: relative;
            line-height: 48px;
            font-size: 18px;
            margin-top: 20px;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            width: 100%;
            .btn-default,
            .btn-confirm {
                display: block;
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                flex: 1;
                color: #fff;
                text-decoration: none;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                position: relative;
                font-size: 16px;
                text-align: center;
                border-radius: 50px;
            }
            .btn-default {
                background: #f1878e;
                margin-right: 15px;
            }
            .btn-confirm {
                background: #72b9c3;
            }
        }
    }
}
</style>
