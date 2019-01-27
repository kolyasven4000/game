<template>
    <div :class='["magic-controls", position]'>
        <div class="magic-controls__control" :style='{"background-color": color}' @click.stop='setValue(1)'>+</div>
        <div class="magic-controls__control" :style='{"background-color": color}' @click.stop='setValue(-1)'>-</div>
    </div>
</template>

<script>
export default {
    name: 'MagicControls',
    components: {

    },
    props: {
        applyType: {
            type: String,
            default() {
                return '';
            },
            required: true
        },
        employeeId: {
            type: String,
            default() {
                return '';
            },
            required: false
        },
        entityType: {
            type: String,
            default() {
                return '';
            },
            required: false
        },
        position: {
            type: String,
            default() {
                return 'right';
            },
            required: false
        },
        color: {
            type: String,
            default() {
                return 'turquoise';
            },
            required: false
        }
    },
    data() {
        return {

        };
    },
    mounted() {
    },
    methods: {
        setValue(value) {
            switch (this.applyType) {
                case 'ability':
                    this.addAbilityValue({ type: this.entityType, value, employeeId: this.employeeId });
                    break;
                case 'enthusiasm':
                    this.addEnthusiasm({ value, employeeId: this.employeeId });
                    break;
                case 'resources':
                    this.changeResourceValue({ [this.entityType]: value });
                    break;
                case 'hard-clients':
                    this.changeHardClientsCard(value);
                    break;
                default:
                    break;
            }
        },
        ...mapActions('resources', ['changeResourceValue']),
        ...mapActions('main', ['addAbilityValue', 'addEnthusiasm', 'changeHardClientsCard'])
    }
};

</script>

<style lang="scss" scoped>
@import "~styles/index.scss";
     .magic-controls {
        display: flex;
        align-items: center;
        width: 40px;
        z-index: 99;
        &.right {
            @include center('vertical');
            left: 100%;
        }
        &.left {
            @include center('vertical');
            right: 100%;
        }
        &.top {
            @include center('horizontal');
            bottom: 100%;

        }
        &.bottom {
            @include center('horizontal');
            top: 100%;

        }
        &__control {
            width: 15px;
            height: 13px;
            font-size: 16px;
            line-height: 13px;
            background: turquoise;
            color: black;
            text-align: center;
            pointer-events: all;
            &+& {
                margin-left: 3px;
            }
        }
    }

</style>
