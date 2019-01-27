<script>
import { shuffle } from 'lodash';
export default {
    props: ['answers', 'questionText'],
    data() {
        return {
            answered: false,
            selected: []

        };
    },
    created() {
        this.setRadioSelected();
    },
    computed: {
        shuffledAnswers() {
            return shuffle(this.answers);
        },
        style() {
            const { length } = this.shuffledAnswers.filter(e => e.correct);
            return length > 1 ? 'checkbox' : 'radio';
        },
        selectedAnswers() {
            return this.shuffledAnswers.filter((el, i) => {
                return this.selected.indexOf(i) > -1;
            });
        },
        isSelected() {
            return this.selectedAnswers.length > 0;
        },
        correctSelected() {
            return this.selectedAnswers.filter(el => el.correct);
        },
        correctAnswers() {
            return this.shuffledAnswers.filter(el => el.correct);
        },
        isCorrect() {
            return this.correctAnswers.length === this.correctSelected.length && this.correctAnswers.length === this.selectedAnswers.length;
        },
        ...mapGetters('magic', ['isMagic'])

    },
    methods: {
        check() {
            this.$emit('check', this.isCorrect);
        },
        nextStep() {
            this.$emit('next', this.passed);
        },
        select(id) {
            if (!this.answered) {
                if (this.style === 'radio') {
                    if (this.selected.indexOf(id) > -1) {
                    } else {
                        this.selected.length = 0;
                        this.selected.push(id);
                    }
                } else {
                    if (this.selected.indexOf(id) > -1) {
                        this.selected.splice(this.selected.indexOf(id), 1);
                    } else {
                        this.selected.push(id);
                    }
                }
            }
            this.check();
        },
        setRadioSelected() {
            if (this.style === 'radio') {
                this.select(0);
            }
        }

    }
};
</script>
