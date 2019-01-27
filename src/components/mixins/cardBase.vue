<script>
export default {
    props: {

    },
    computed: {
        eventsStore() {
            return this.currentCard.aftermath.events || null;
        },
        abilitiesForDefinite() {
            if (this.eventsStore) {
                let [event = []] = this.eventsStore;
                let abilitiesEffect = event.effect.find(e => e.abilities);
                if (abilitiesEffect) {
                    return abilitiesEffect.abilities;
                }
            }
        },
        ...mapGetters('resources', ['resourcesList']),
        ...mapState('resources', ['activeGemLevelIndex'])
    },
    methods: {
        startCardEvents() {
            this.eventsStore.forEach(event => {
                this.executeEffect(event);
            });
        },
        executeEffect(event) {
            let { condition = null, conditionType = null, effect } = event;
            effect.forEach(effect => {
                if (condition !== null) {
                    switch (condition) {
                        case 'resource':
                            this.checkTarget(this.resourcesList[conditionType].value, effect, event);
                            break;
                        case 'enthusiasm':
                            this.checkTarget(this.targetEmployee.enthusiasm, effect, event);
                            break;
                        case 'gemLevel':
                            this.checkTarget(this.activeGemLevelIndex, effect, event);
                            break;
                        case 'ability':
                            this.checkTarget(this.targetEmployee.abilities[conditionType], effect, event);
                            break;
                        default:
                            break;
                    }
                } else {
                    this.startEffect(effect);
                }
            });
        },
        checkTarget(target, effect, { matching, value }) {
            if (this.matchCondition(target, matching, value)) {
                this.startEffect(effect);
            }
        },
        matchCondition(target, matching, value) {
            if (matching === 'more') {
                return target > value;
            } else if (matching === 'less') {
                return target < value;
            } else if (matching === 'equal') {
                return target === value;
            }
        },
        startEffect(effect) {
            let { target, targetType, value } = effect;
            switch (target) {
                case 'resource':
                    this.changeResourceValue({
                        [targetType]: value
                    });
                    break;
                case 'enthusiasm':
                    this.addEnthusiasm({
                        value,
                        employeeId: this.targetEmployeeId
                    });
                    break;
                case 'ability':
                    this.addAbilityValue({
                        type: targetType,
                        value,
                        employeeId: this.targetEmployeeId
                    });
                    break;
                case 'action':
                    this.startActionEffect(targetType);
                    break;
                default:
                    break;
            }
        },
        startActionEffect(targetType) {
            switch (targetType) {
                case 'returnCard':
                    this.returnCard(this.currentCard);
                    break;
                case 'skipCard':
                    this.locationWorkCancel = true;
                    this.skipCard();
                    break;
                case 'getNextCard':
                    this.getNextCard();
                    break;
                case 'revokePayments':
                    this.locationWorkCancel = true;
                    break;
                case 'revokeInnovation':
                    this.locationWorkCancel = true;
                    this.revokeInnovation();
                    break;
                case 'changeForDefinite':
                    break;
                case 'addBlackMarker':
                    this.addBlackMarker();
                    break;
                case 'closeBlackMarkerZones':
                    this.closeBlackMarkerZones();
                    break;
                default:
                    break;
            }
        },
        ...mapActions('main', [
            'addAbilityValue',
            'addEnthusiasm',
            'returnCard',
            'skipCard',
            'getNextCard',
            'revokePayments',
            'addBlackMarker',
            'closeBlackMarkerZones'
        ]),
        ...mapActions('resources', ['changeResourceValue'])
    }
};
</script>
