<template>
    <div class="magic">
        <div class="magic__left">
            <div class="magic__item">
                <div class="default-btn  magic__btn" @click='resetGame'>Начать заново</div>
            </div>
            <div class="magic__item">
                <div class="default-btn magic__btn" @click='switchBotsVoteExclude'>Боты <span v-if='isBotsVoteExclude'>НЕ</span> голосуют</div>

            </div>
            <div class="magic__item">
                <div class="default-btn  magic__btn" @click='toggleTimer'>Вкл/выкл таймер</div>
            </div>
            <div class="magic__item">
                <div class="default-btn  magic__btn" @click='goToTest'>Перейти к анкете</div>
            </div>
            <div class="magic__item">
                <div class="default-btn  magic__btn" @click='showFacilitation'>Перейти к фассилитации</div>
            </div>
            <div class="magic__item">
                <div class="default-btn  magic__btn" @click='showRegman'>Перейти к регмену</div>
            </div>
            <div class="magic__item">
                <div class="default-btn  magic__btn" @click='showFinalPhase'>Перейти к итогам</div>
            </div>
            <div class="magic__item">
                <p>События дня выпадают по </p>
                <div class="default-btn  magic__btn" @click='switchDayCardsDropping'><span v-if='isDayCardsDropCustom'>Выбору</span><span v-else>Умолчанию</span></div>
                <div v-if='isDayCardsListShow' class="default-btn magic__btn" @click='endChoiceDropCard()'>Продолжить</div>
                <p v-if='dayEventCard' class="card-list-caption">Выбрана карточка:
                    <span v-if='dayEventCardIndex === -1'>{{dayEventCard.name}}</span>
                    <span v-else>{{dayEventCards[dayEventCardIndex].name}}</span>
                </p >
                <p v-if='dayEventCards' class="card-list-caption">Следующая карточка:<span >{{dayEventCards[0].name}}</span></p >
                <div v-if='isDayCardsListShow' class="card-list">
                    <div
                        v-for='({name}, cardIndex) in dayEventCards'
                        class="card-list__item"
                        :key='cardIndex'
                        @click='setDayEventCardIndex(cardIndex)'
                    >{{name}}</div>
                </div>
            </div>
            <div class="magic__item bot-items">
                <div v-for='({weights, id}, i) in botsWeights' class="bot-items__item" :key='i'>
                    <p>{{id}}</p>
                    <div v-for='(value, key) in weights' :key='key'>
                        <div><span>{{getWeightName(key)}}</span>: <span>{{value}}</span></div>
                    </div>
                </div>
            </div>
            <MagicLogs />
        </div>
    </div>
</template>

<script>
import { EVENT_BUS } from 'components/global';
import { arrayLast } from 'js/utils';
import MagicLogs from './base/MagicLogs';
export default {
    name: 'Magic',
    components: {
        MagicLogs
    },
    data() {
        return {
            dayEventCardIndex: -1
        };
    },
    mounted() {
    },
    computed: {
        ...mapGetters('main', ['dayEventCards', 'dayEventCard', 'abilitiesName']),
        ...mapGetters('bots', ['isBotsVoteExclude', 'botsWeights']),
        ...mapGetters('structure', ['currentItem']),
        ...mapGetters('magic', ['isDayCardsDropCustom', 'isDayCardsListShow']),
        ...mapState('resources', ['resourcesList'])
    },
    methods: {
        toggleTimer() {
            EVENT_BUS.$emit('toggleTimer');
        },
        goToTest() {
            let { items } = arrayLast(this.currentItem.parent.items);
            console.log(items, this.currentItem);
            this.goToItem(items[0].id);
            EVENT_BUS.$emit('showGameFeedback');
        },
        setCard() {
            if (this.dayEventCardIndex > -1) {
                this.setDayEventCard({ cardIndex: this.dayEventCardIndex });
            }
        },
        endChoiceDropCard(isForce = false) {
            this.switchDayCardsList();
            this.toggleModal();
            this.setCard();
            EVENT_BUS.$emit('hideRoundCard');
            EVENT_BUS.$emit('initTimer');
        },
        setDayEventCardIndex(index) {
            this.dayEventCardIndex = index;
        },
        showFacilitation() {
            EVENT_BUS.$emit('showFacilitation');
        },
        showRegman() {
            EVENT_BUS.$emit('checkRegManager', { forceShow: true });
        },
        showFinalPhase() {
            EVENT_BUS.$emit('showFinalPhase');
        },
        getWeightName(key) {
            const ability = this.abilitiesName[key];
            const resource = this.resourcesList[key];
            if (key === 'innovationLevel') {
                return 'Уровень настроя';
            } else if (!resource && !ability) {
                return key;
            }
            return ability || resource.name;
        },
        ...mapActions('main', ['addHardClientCard', 'setDayEventCard', 'resetGame']),
        ...mapActions('bots', ['switchBotsVoteExclude']),
        ...mapActions('structure', ['goToItem']),
        ...mapActions('magic', ['switchDayCardsDropping', 'switchDayCardsList']),
        ...mapActions('modal', ['toggleModal'])
    }
};

</script>

<style lang="scss" scoped>
    .magic {
        position: absolute;
        top: 0;
        right: 100%;
        width: 250px;
        height: auto;
        padding: 10px;
        border: 2px solid #ccc;
        color: black;
        z-index: 100;
        background: white;
        //box-shadow: inset 0 1px 0 lighten( red, 15% ), 0 1px 0 rgba(0,0,0,.15);
        &__item {
            padding: 5px 0;
            border-bottom: 2px solid gray;
            p {
                margin-bottom: 5px;
            }
            &+& {
                margin-top: 5px;
            }
        }
        &__btn {
            width: auto;
            height: 30px;
            padding: 0 10px;
        }
    }
    .card-list{
        border: 4px solid turquoise;
        max-height: 200px;
        overflow-y: scroll;
        &__item {
            cursor: pointer;
            &:hover {
                background-color: turquoise;
            }
        }
    }
    .card-list-caption {
        margin-top: 5px;
        font-size: 13px;
        span {
            font-weight: bold;
        }
    }
    .bot-items {
        p {
            font-size: 16px;
            font-weight: bold;
        }
        &__item {
            &+& {
            margin-top: 15px;
        }
        p {
            font-size: 16px;
            font-weight: bold;
        }
        }
    }
</style>
