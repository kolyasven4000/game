const actions = {
    setGameEvent({ commit, getters }, payload) {
        console.warn('--- setGameEvent ---', payload);
        if (getters.isEventAvailable(payload.key)) {
            console.warn('fired event:', payload.key);
            commit('SET_GAME_EVENT', payload);
        }
    },
    triggersEvents({ commit, dispatch }) {
        // Уровень Атмосферы упал и находится в отрицательной области впервые за игру
        // Уровень Атмосферы вырос и находится в положительной области впервые за игру
        dispatch('atmosphereEvent');
        // Уровень CSI упал и находится в отрицательной области впервые за игру
        // Уровень CSI поднялся и находится в положительной области впервые за игру
        dispatch('CSIEvent');
        // Первые рублики перешли в прибыль компании
        dispatch('rublesBankEvent');
        // Сотрудником заработано первое отклонение
        dispatch('deviationsEvent');
        // Событие дня перекочевало на следующий раунд
        dispatch('cardMigratedRoundEvent');
        // Заработана первая карточка сложного клиента
        dispatch('hardClientEvent');
        // Накоплены фишки, есть сотрудник с ответственностью 3+, и теперь можно поднять настрой
        dispatch('raiseMoodEvent');
    },
    atmosphereEvent({ dispatch, rootGetters }) {
        const POSITIVE_LEVEL = 8;
        const NEGATIVE_LEVEL = 6;
        const atmosphereValue = rootGetters['resources/getValueByIdResource']('atmosphere');

        if (atmosphereValue >= POSITIVE_LEVEL) {
            dispatch('setGameEvent', { key: 'RECEIVED_FIRST_POSITIVE_ATMOSPHERE' });
        } else if (atmosphereValue <= NEGATIVE_LEVEL) {
            dispatch('setGameEvent', { key: 'RECEIVED_FIRST_NEGATIVE_ATMOSPHERE' });
        }
    },
    CSIEvent({ dispatch, rootGetters }) {
        const POSITIVE_LEVEL = 9;
        const NEGATIVE_LEVEL = 6;
        const csiValue = rootGetters['resources/getValueByIdResource']('csi');

        if (csiValue >= POSITIVE_LEVEL) {
            dispatch('setGameEvent', { key: 'RECEIVED_FIRST_POSITIVE_ATMOSPHERE' });
        } else if (csiValue <= NEGATIVE_LEVEL) {
            dispatch('setGameEvent', { key: 'RECEIVED_FIRST_NEGATIVE_ATMOSPHERE' });
        }
    },
    rublesBankEvent({ dispatch, rootGetters }) {
        const rubles = rootGetters['resources/rublesBank'];

        if (rubles > 0) {
            dispatch('setGameEvent', { key: 'RECEIVED_FIRST_RUBLES' });
        }
    },
    deviationsEvent({ dispatch, rootGetters }) {
        const employee = rootGetters['main/getEmployeeByAbilityLevel']({ abilityId: 'deviation', isLow: true });

        if (employee.value && employee.value > 0) {
            dispatch('setGameEvent', { key: 'RECEIVED_FIRST_DEVIATION' });
        }
    },
    cardMigratedRoundEvent({ dispatch, rootState }) {
        const { type } = rootState.main.locationsList['day-event'].dayDeffered;

        if (type !== undefined && type !== '') {
            dispatch('setGameEvent', { key: 'EVENT_WENT_TO_NEXT_ROUND_FIRST_TIME' });
        }
    },
    hardClientEvent({ dispatch, rootGetters }) {
        const hardClientCardsQuantity = rootGetters['main/hardClientCardsQuantity'];

        if (hardClientCardsQuantity > 0) {
            dispatch('setGameEvent', { key: 'FIRST_DIFFICULT_CUSTOMER_CARD_RECEIVED' });
        }
    },
    raiseMoodEvent({ dispatch, rootGetters }) {
        const NEED_RESPONSIBILITY = 3;
        const ABILITY_ID = 'responsibility';
        const responsibility = rootGetters['main/checkEmployeeIdByAbilityValue'](ABILITY_ID, NEED_RESPONSIBILITY);
        const innovationValue = rootGetters['resources/getValueByIdResource']('innovation');

        if (innovationValue > 0 && responsibility) {
            dispatch('setGameEvent', { key: 'CAN_RAISE_MOOD_FIRST_TIME' });
        }
    }
};

export default actions;
