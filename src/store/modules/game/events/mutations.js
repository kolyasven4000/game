import { isUndefined } from 'js/utils/is';

const mutations = {
    SET_GAME_EVENT(state, { key, value = 0 }) {
        const event = state[key];

        if (event) {
            const { value: eventValue } = event;
            event.received = true;
            if (!isUndefined(value)) {
                event.value = value || (eventValue + 1);
            }
        }
    }
};

export default mutations;
