<template>
    <transition name='fade'>
        <div
            v-if='text'
            :class="['tutorial-hint', align]"
            :style="{width:`${width}px`}"
        >
            <p v-html='text'></p>
            <div v-for='({location, target, circle}, i) in lines' :class='["tutorial-hint__line", `${location} ${target}`, {"circle": circle}]' :key='i'></div>
            <!-- <p class="tutorial__hint-description">{{currentHint.additionalText}}</p>
                    :style="{left: `${coords.x}px`, top:`${coords.y}px`, width:`${width}px`}"
                -->
            <div class="tutorial-hint__btns">
                <div
                    v-for='({text, branchId}, i) in btns'
                    class="default-btn default-btn--flex tutorial-hint__hint-btn"
                    :key='i'
                    @click.stop='$emit("nextHint")'
                >{{text}}</div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'TutorialHint',
    props: {
        coords: {
            type: Object,
            default: () => {}
        },
        width: {
            type: String | Number,
            default: () => 'auto'
        },
        text: {
            type: String
        },
        lines: {
            type: Array,
            default: () => []
        },
        btns: {
            type: Array,
            default: () => {}
        },
        align: {
            type: String,
            default: () => 'center'
        }
    },
    components: {

    },
    data() {
        return {

        };
    },
    mounted() {
        // if(this.currentHintIndex> 0) this.checkHintAction(this.currentHint.action);

        /* let {header, footer, main} = this.$parent.$refs
        this.toggleModal('step-1');
        console.log(this); */

    },
    watch: {
        currentHint({ type, action }) {
            this.checkHintAction(action);
            if (type === 'default') {
                this.toggleModal('default');
            }
        }
    },
    computed: {

    },
    methods: {

    }
};

</script>
<style lang="scss" >

</style>
<style lang="scss" scoped>
@import "~styles/index.scss";
.tutorial-hint {
        position: absolute;
        min-width: 200px;
        max-width: auto;
        padding: 13px 15px;
        font-size: 20px;
        color: #FFFFFF;
        letter-spacing: 0;
        line-height: 28px;
        background-color: #9D5A93;
        box-shadow: 0 5px 15px 0 #2B2C48, 0 5px 15px 0 #9D5A93;;
        border-radius: 5px;
        z-index: 100;
        &.center {
            @include center('both');
        }
        &.left {
            @include center('vertical');
            left: 100px;
        }
        &.right {
            @include center('vertical');
            left: auto;
            right: 100px;
        }
        &.top {
            @include center('horizontal');
            top: 100px;
        }
        &.bottom {
            @include center('horizontal');
            top: auto;
            bottom: 100px;
        }
    &__layout {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.4);
    }
    &__line {
        position: absolute;
        top: 70%;
        right: calc(100% + 5px);
        width: 120px;
        height: 150px;
        background: url('~images/tutorial/line.svg') no-repeat center;
        &.top {
                transform: scaleY(-1);
                top: auto;
                bottom: 80%;

        }
        &.right {
            left: calc(100% + 5px);
            transform: scale(-1);
             /* &.circle::before {
                    top: calc(100% + 15px);
                    left: auto;
                    right: calc(100% - 26px);
        } */
        }
    }
    &__btns {
        position: absolute;
        display: flex;
        justify-content: center;
        width: 100%;
        top: calc(100% + 20px);
        left: 0;
    }
    &__hint-btn {
        padding: 7px 15px;
        height: auto;
        margin: auto;
    }

}
</style>
