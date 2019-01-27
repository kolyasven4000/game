import { isUndefined } from 'js/utils/is';

const getters = {
    isEventAvailable: state => key => {
        const event = state[key];
        if (event) {
            const { received, value } = event;
            return (isUndefined(value) && !received) || !isUndefined(value);
        }
        console.error('Event not available');
    },
    eventsMap: state => {
        return Object.keys(state).map(key => {
            return { ...state[key], ...{ id: key } };
        });
    },
    triggeredEvents: (state, getters) => getters.eventsMap.filter(e => e.received)
};

export default getters;
