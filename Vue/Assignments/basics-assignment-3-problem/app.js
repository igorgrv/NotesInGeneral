//app.js
const app = Vue.createApp({
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    addValue(number) {
      this.counter += number;
    },
  },
  computed: {
    result() {
      if (this.counter < 37) {
        return "Not there yet!";
      } else if (this.counter > 37) {
        return "Too much!";
      } else {
        return this.counter;
      }
    },
  },
  watch: {
    result() {
      console.log("Executing the watch");
      const that = this;
      setTimeout(() => {
        that.counter = 0;
      }, 2000);
    },
  },
});
app.mount("#assignment");
