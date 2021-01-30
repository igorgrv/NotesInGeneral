const app = Vue.createApp({
  data() {
    return { inputTask: '', tasks: [], isNotHide: true };
  },
  computed: {
    textButton() {
      return this.isNotHide ? 'Hide' : 'Show';
    },
  },
  methods: {
    addTask() {
      this.tasks.push(this.inputTask);
    },
    toggleHide() {
      this.isNotHide = !this.isNotHide;
    },
  },
});

app.mount('#assignment');
