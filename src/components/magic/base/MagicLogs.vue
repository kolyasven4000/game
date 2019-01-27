<template>
    <div class="magic-logs" >
        <div class="magic-logs__inner">
            <div v-for='({name, value, employeeId = ""}, i ) in logArr' class="magic-logs__item" :key='i'>
                <div class="magic-logs__item-name">{{name}}</div>
                <div class="magic-logs__item-value"> {{value}}</div>
                <div v-if='employeeId' class="magic-logs__item-employee"> {{employeeId}}</div>
            </div>
        </div>
        <div v-if='logArr.length > 20' class="default-btn default-btn--small" @click='resetLogs'>Сбросить логи</div>
    </div>
</template>

<script>
export default {
    name: 'MagicLogs',
    components: {

    },
    data() {
        return {
            logArr: []
        };
    },
    created() {
        this.subscribeEvents();
    },
    computed: {
        ...mapGetters('main', ['abilitiesName']),
        ...mapState('resources', ['resourcesList'])
    },
    methods: {
        subscribeEvents() {
            store.subscribe((mutation, state) => {
                let { type, payload } = mutation;
                switch (type) {
                    case 'ADD_ABILITY_VALUE':
                        this.pushAbilityLog(payload);
                        break;
                    case 'CHANGE_RESOURCE_VALUE':
                        this.pushResourceLog(payload);
                        break;
                    case 'ADD_ENTHUSIASM':
                        this.pushAbilityLog(payload);
                        break;
                    default:
                        break;
                }
            });
        },
        pushResourceLog(payload) {
            Object.keys(payload).forEach(key => {
                let resource = this.resourcesList[key];
                if (payload[key] && resource) {
                    let objToLog = {
                        name: resource.name,
                        value: payload[key]
                    };
                    this.createLog(objToLog);
                }
            });
        },
        pushAbilityLog(payload) {
            let { type, value, employeeId } = payload;
            let objToLog = {
                name: this.abilitiesName[type] || 'enthusiasm',
                value,
                employeeId
            };
            this.createLog(objToLog);
        },
        createLog(objToLog) {
            this.logArr.push(objToLog);
        },
        resetLogs() {
            this.logArr = [];
        }
    }
};

</script>

<style lang="scss" scoped>
    .magic-logs {
        width: 100%;
        position: absolute;
        top: 0;
        left: calc(100% + 1026px);
        background: white;
        &__inner {
            height: 600px;
            overflow-y: scroll;
        }
        &__item {
            display: flex;
            justify-content: space-between;
        }
        &__item-name {
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .default-btn {
            margin-top: 10px;
        }
    }
</style>
