<template>
    <div :class='["events-tutorial"]' >
        <div
            ref='cloneContainer'
            :class='["events-tutorial__clone-wrapper", {disabled: isNextFromBtn}]'
            @click.stop='setNextHint'
        ></div>
        <TutorialHint
            :text=currentHint.text
            :width=currentHint.width
            :btns=currentHint.btns
            :align= currentHint.align
            @nextHint='setNextHint(true)'
        />
    </div>

</template>

<script>
import { isObject } from 'js/utils/is';
import { wait } from 'js/utils';
import TutorialHint from './base/TutorialHint';
export default {
    name: 'EventsTutorial',
    components: {
        TutorialHint
    },
    data() {
        return {
            targetEl: null,
            APP_OFFSET_LEFT: 0,
            hintIndex: 0
        };
    },
    mounted() {
        this.initTutorial();
    },
    watch: {

    },
    computed: {
        currentHint() {
            return this.eventHints[this.hintIndex] || {};
        },
        highlightSelector() {
            return this.currentHint.highlightSelector;
        },
        isArrow() {
            return this.currentHint.arrow;
        },
        isNextFromBtn() {
            const { btns } = this.currentHint;
            return btns && btns.length > 0;
        },
        frame() {
            return this.currentHint.frame;
        },
        ...mapGetters('main', ['getEmployeeByAbilityLevel']),
        ...mapGetters('tutorial/eventsTutorial', ['eventHints', 'isTriggeredHints', 'isLastEventHints']),
        ...mapState('modal', ['showModal'])
    },
    methods: {
        createCloneFromTargetElem() {
            this.$nextTick(() => {
                const selector = this.defineSelector();
                if (!selector) return;
                this.targetEl = this.getElemBySelector(selector);
                if (!this.targetEl) {
                    console.error('Not found Elem:', selector);
                    return;
                }
                this.cloneElem();
            });
        },
        cloneElem() {
            const { cloneContainer } = this.$refs;
            const { left, top } = this.targetEl.getBoundingClientRect();
            let clone = this.targetEl.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.left = left - this.APP_OFFSET_LEFT + 'px';
            clone.style.top = top + 'px';
            clone.style['z-index'] = 99;
            clone.id = (this.defineSelector() + '_clone').match(/\w.+/gi)[0];
            if (this.isArrow) clone.classList.add('arrow-animate');
            if (this.frame) {
                const { selector, root } = this.frame;
                if (root) {
                    clone.classList.add('highlight-rect');
                } else {
                    clone.querySelector(selector).classList.add('highlight-rect');
                }
            }
            cloneContainer.appendChild(clone);
        },
        setNextHint(force) {
            const { cloneContainer } = this.$refs;
            if (this.targetEl) {
                if (!this.isNextFromBtn) this.targetEl.click();
                cloneContainer.removeChild(cloneContainer.firstChild);
            }
            this.targetEl = null;
            this.setHintIndex();
        },
        getElemBySelector(selector) {
            if (!selector) return;
            return document.querySelector(selector);
        },
        setHintIndex() {
            const { length } = this.eventHints;
            if (this.hintIndex < length - 1) {
                this.hintIndex++;
                this.createCloneFromTargetElem();
            } else {
                this.hintIndex = -1;
                this.checkNextHintsPack();
            }
        },
        async checkNextHintsPack() {
            this.eventHintsViewed();
            if (this.showModal) {
                this.toggleModal();
            }
            await wait(1);
            if (this.isTriggeredHints) {
                this.hintIndex = 0;
                this.createCloneFromTargetElem();
            }
        },
        defineSelector() {
            if (isObject(this.highlightSelector)) {
                const { method, args, propName } = this.highlightSelector;
                const result = this[method](...args);
                return '#' + result[propName];
            }
            return this.highlightSelector;
        },
        async initTutorial() {
            await wait(0.5);
            this.APP_OFFSET_LEFT = this.$refs.cloneContainer.getBoundingClientRect().left;
            this.createCloneFromTargetElem();
        },
        ...mapActions('tutorial/eventsTutorial', ['setHint', 'eventHintsViewed']),
        ...mapActions('mode', ['switchLearnMode']),
        ...mapActions('modal', ['toggleModal'])
    }
};

</script>
<style lang="scss">
@import "~styles/index.scss";
    .arrow-animate::after {
    content: '';
    position: absolute;
    top: calc(100% + 15px);
    left: -15px;
    width: 20px;
    height: 20px;
    background: url('~images/tutorial/arrow.svg') no-repeat center;
    background-size: contain;
    animation: bounce 1.5s linear infinite;
}
.highlight-rect::after{
    content: '';
    position: absolute;
    left: -5px;
    top: -5px;
    @include highlightRect(calc(100% + 5px), calc(100% + 5px));
    z-index: 99;
}
</style>
<style lang="scss" scoped>
@import "~styles/index.scss";
.events-tutorial {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 2222;
    background: rgba(#282840, 0.7);
    overflow: hidden;
    &__clone-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        &.disabled {
            opacity: 1;
                pointer-events: none;
        }
    }
}
</style>
