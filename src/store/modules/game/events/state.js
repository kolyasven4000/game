// отработал в открытой зоне в раунде
const events = {
    OPEN_ZONE_WORKED_ROUND: {
        value: 0,
        resetFromNewRound: false,
        received: false
    },
    // отработал карточку сложного клиента
    HARD_CLIENTS_WORKED: {
        value: 0,
        resetFromNewRound: false,
        received: false
    },
    // отправил сотрудника отрабатывать сложных клиентов
    HARD_CLIENTS_SENT_EMPLOYEE: {
        resetFromNewRound: true,
        received: false
    },
    // разблокировано закрытых зон
    NEW_ZONES_OPENED: {
        value: 0,
        resetFromNewRound: false,
        received: false
    },
    TEO_GETTING: {
        value: 0,
        resetFromNewRound: false,
        received: false
    },
    // отработаны корпоративные мероприятия
    CORPORATE_EVENTS_WORKED: {
        value: 0,
        resetFromNewRound: false,
        received: false
    },
    // выплачены премии
    PREMIUM_PAYED: {
        value: 0,
        resetFromNewRound: false,
        received: false
    },
    // брошен кубик (в зоне Обслуживание клиентов и Поднятие настроя)
    CUBE_THROWED: {
        resetFromNewRound: true,
        received: false
    },
    // Прокачен уровень настроя
    INNOVATION_LEVEL_BUILD: {
        resetFromNewRound: true,
        received: false
    },
    // Первой изучена хар-ка, которая является основной (имеет вначале показатель два - может быть несколько)
    HIGH_ABILITY_LEARNED: {
        resetFromNewRound: false,
        received: false
    },
    // Первой изучена хар-ка, которая является НЕ основной
    LOW_ABILITY_LEARNED: {
        resetFromNewRound: false,
        received: false
    },
    // Пробит порог энтузиазма сотрудника
    THRESHOLD_GETTING: {
        value: 0,
        resetFromNewRound: true,
        received: false
    },
    /* THRESHOLD_SAFETY: {
        resetFromNewRound: true,
        received: false
    }, */
    // регмен вызывался
    REG_MAN_VISITED: {
        resetFromNewRound: false,
        received: false
    },
    // Кто-то из сотрудников уволен
    DISMISSED_EMPLOYEE: {
        resetFromNewRound: false,
        received: false
    },
    // спросил дважды у бота один и тот же вопрос
    QUESTION_RECCURING: {
        resetFromNewRound: true,
        received: false
    },
    ROUND_END_FASTER: {
        value: 0,
        resetFromNewRound: true,
        received: false
    },
    END_TIME_STARTING_PHASE: {
        resetFromNewRound: true,
        received: false
    },
    END_TIME_VOTE_PHASE: {
        resetFromNewRound: true,
        received: false
    },
    // Получен первый негативный csi
    RECEIVED_FIRST_NEGATIVE_CSI: {
        resetFromNewRound: false,
        received: false
    },
    // Получен первый положительный csi
    RECEIVED_FIRST_POSITIVE_CSI: {
        resetFromNewRound: false,
        received: false
    },
    // Первый раз атмосфера стала отрицательной
    RECEIVED_FIRST_NEGATIVE_ATMOSPHERE: {
        resetFromNewRound: false,
        received: false
    },
    // Первый раз атмосфера стала положительной
    RECEIVED_FIRST_POSITIVE_ATMOSPHERE: {
        resetFromNewRound: false,
        received: false
    },
    // Получена первая прибыль
    RECEIVED_FIRST_RUBLES: {
        resetFromNewRound: false,
        received: false
    },
    // Получено первое отклонение
    RECEIVED_FIRST_DEVIATION: {
        resetFromNewRound: false,
        received: false
    },
    // Событие дня перекочевало на следующий раунд первый раз
    EVENT_WENT_TO_NEXT_ROUND_FIRST_TIME: {
        resetFromNewRound: false,
        received: false
    },
    // Получена первая карточка сложного клиента
    FIRST_DIFFICULT_CUSTOMER_CARD_RECEIVED: {
        resetFromNewRound: false,
        received: false
    },
    // Накоплены фишки, есть сотрудник с ответственностью 3+, и теперь можно поднять настрой
    CAN_RAISE_MOOD_FIRST_TIME: {
        resetFromNewRound: false,
        received: false
    }
};

export default events;
