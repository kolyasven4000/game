<template>
    <div
        id="app"
        @click.alt.shift.exact.middle='switchMagic'
    >
        <div class="player-content">
            <Title v-if='titleShowed && !feedbackShowed' @closeTitle='closeTitle' />
            <BotTeam v-if='teamShowed' @botTeamViewed='closeTeam'/>
            <div id='content' v-if='contentShowed && stateLoaded' :class='["content",{"blocked": isBlockedContent, "learn-mode" : isLearnMode, "events-mode": false}]'>
                <Header
                    ref='header'
                    :isRoundEnd='isRoundEnd'
                    :feedbackShowed='feedbackShowed'
                />
                <Menu />
                <Main ref='main' :magic='magic' />
                <Footer ref='footer' />
            </div>
            <Tutorial v-if='isLearnMode'/>
            <EventsTutorial v-if='eventsTutorialShow'/>
            <Feedback v-if='feedbackShowed'/>
            <SoundManager />
            <ModalManager />
            <Facilitation v-if='facilitationShowed' @hideFacilitation='switchFacilitation' />
            <RegManager  @switchContentShowed='switchContentShowed' />
            <FinalPhase v-if='finalPhaseShowed' />
        </div>
        <Magic v-if='isMagic'/>
    </div>
</template>

<script>
/* import { default as CourseStructureDebuggerModal } from 'course-structure-debugger'; */
import { EVENT_BUS } from 'components/global';
import Title from 'components/content/Title.vue';
import BotTeam from 'components/content/main/bots/BotTeam.vue';
import SoundManager from 'components/SoundManager';
import Header from 'components/content/Header.vue';
import Footer from 'components/content/Footer.vue';
import Main from 'components/content/Main.vue';
import Magic from 'components/magic/Magic.vue';
import Menu from 'components/content/Menu.vue';
import Intro from 'components/content/Intro.vue';
import Feedback from 'components/content/feedback/Feedback.vue';
import Tutorial from 'components/content/tutorial/Tutorial.vue';
import EventsTutorial from 'components/content/tutorial/EventsTutorial.vue';
import ModalManager from 'components/content/modals/ModalManager.vue';
import Facilitation from 'components/content/facilitation/Facilitation.vue';
import RegManager from 'components/content/reg_manager/RegManager.vue';
import FinalPhase from 'components/content/final_phase/FinalPhase.vue';
export default {
    name: 'App',
    components: {
        Title,
        SoundManager,
        Header,
        Footer,
        Main,
        Menu,
        Magic,
        Intro,
        Feedback,
        BotTeam,
        Tutorial,
        EventsTutorial,
        /* CourseStructureDebuggerModal, */
        ModalManager,
        Facilitation,
        RegManager,
        FinalPhase
    },
    data() {
        return {
            titleShowed: true,
            magic: false,
            feedbackShowed: false,
            contentShowed: false,
            teamShowed: false,
            stateLoaded: false,
            facilitationShowed: false,
            finalPhaseShowed: false
        };
    },
    created() {
        this.stateLoaded = true;
        this.structure.$on('stateRestored', () => {
            let { testGame, game, newGame } = this.currentCourse.state;
            this.currentCourse.setStateParam('newGame', null); // remove old state
            this.currentCourse.setStateParam('testGame', null); // remove old state
            console.log(testGame, game, newGame);
            if (game) {
                this.restoreRound(game);
            }
            this.setCurrentRound(!!game);
        });
    },
    mounted() {
        EVENT_BUS.$on('showGameFeedback', this.switchFeedback);
        EVENT_BUS.$on('showFacilitation', this.switchFacilitation);
        EVENT_BUS.$on('showFinalPhase', this.switchFinalPhase);
    },
    computed: {
        isBlockedContent() {
            return this.isMatchingPhaseEnd || (this.isRoundEnd && !this.feedbackShowed);
        },
        isContentShow() {
            return this.contentShowed;
        },
        ...mapGetters('phases', ['isMatchingPhaseEnd', 'isRoundEnd']),
        ...mapGetters('main', ['isDev']),
        ...mapGetters('mode', ['isLearnMode']),
        ...mapGetters('magic', ['isMagic']),
        ...mapGetters('structure', ['currentItem', 'currentCourse']),
        ...mapState(['structure']),
        ...mapState('tutorial/eventsTutorial', ['eventsTutorialShow'])
    },
    methods: {
        switchContentShowed() {
            this.contentShowed = !this.contentShowed;
        },
        closeTeam() {
            this.teamShowed = false;
            this.switchContentShowed();
        },
        closeTitle() {
            this.titleShowed = false;
            this.teamShowed = true;
        },
        switchFeedback() {
            this.feedbackShowed = true;
            this.switchContentShowed();
        },
        clearAfkTimer() {
            EVENT_BUS.$emit('clearAfkTimer');
        },
        setCurrentRound(isGetState) {
            let { items } = this.currentItem.parent;
            let interactedItems = items.filter(e => e.state.interacted_date);
            let { length } = interactedItems;
            if (!isGetState) {
                interactedItems.forEach(e => {
                    e.setStateParam('interacted_date', null);
                });
                return;
            }
            if (length) {
                let targetItem = interactedItems[length - 1];
                targetItem.setCurrent();
            }
        },
        switchFacilitation() {
            this.switchContentShowed();
            this.facilitationShowed = !this.facilitationShowed;
        },
        switchFinalPhase() {
            this.switchContentShowed();
            this.finalPhaseShowed = !this.finalPhaseShowed;
        },
        ...mapActions('structure', ['writeToCourseState']),
        ...mapActions('magic', ['switchMagic']),
        ...mapActions('main', ['restoreRound'])
    }
};

</script>

<style lang="scss">
@import "~styles/index.scss";
#app {
    font-family: 'Roboto';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #D5DEF0;
    @include center('horizontal');
    width: 1024px;
    height: 675px;
    border-radius: 0;
    transform-origin: top center;
    background: url(~images/main-bg.png); //border: 2px solid pink;
    &,
    & * {
        font-family: 'Roboto';
        box-sizing: border-box;
    }
}
canvas {
    pointer-events: none;
}
.player-content {
    width: 100%;
    height: 675px;
    overflow: hidden;
}
.default-btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 155px;
    height: 40px;
    font-size: 14px;
    text-align: center;
    background-color: #00CBD9;
    background-image: linear-gradient(-180deg, #00DFE8 0%, #00B6C9 98%);
    box-shadow: 0 1px 3px 0 rgba(37, 47, 64, 0.31), 0 5px 10px 0 rgba(30, 198, 220, 0.43);
    border-radius: 100px;
    transition: .2s;
    cursor: pointer;
    &:hover {
        background-image: linear-gradient(-180deg, #00ECF5 0%, #00D1E6 100%);
        box-shadow: 0 6px 11px 0 rgba(30, 198, 220, 0.60);
    }
    &.disabled {
        pointer-events: none;
        opacity: .3;
    }
    &--flex {
        width: auto;
        padding: 0 15px;
    }
    &--back {
        width: 40px;
        height: 40px;
        &:hover {
            width: 44px;
            height: 44px;
        }
        &::after {
            content: '';
            position: absolute;
            @include center('both');
            height: 17px;
            width: 8px;
            background: url(~images/base/back-btn-arrow.svg) no-repeat center;
            background-size: cover;
            transition: .2s;
            border-radius: 50%;
        }
    }
    &--small {
        width: auto;
        height: 30px;
        padding: 0 10px;
    }

}

</style>

<style lang="scss" scoped="">
.content {
    position: relative;
    height: 100%;
    padding: 17px 21px 0px 20px;
}
.blocked {
    pointer-events: none;
}
</style>
