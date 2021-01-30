const app = Vue.createApp({
  data() {
    return { goals: [], inputedValue: '' };
  },
  methods: {
    addGoal() {
      this.goals.push(this.inputedValue);
    },
    remove(value) {
      this.goals.splice(value, 1);
    },
  },
});

app.mount('#user-goals');
