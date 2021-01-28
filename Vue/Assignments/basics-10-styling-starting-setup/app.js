const app = Vue.createApp({
  data() {
    return {
      selectedBoxA: false,
      selectedBoxB: false,
    };
  },
  methods: {
    selectBox(value) {
      if (value === "A") {
        this.selectedBoxA = true;
      } else if (value === "B") {
        this.selectedBoxB = true;
      }
    },
  },
  computed: {
    makeRedA() {
      return { borderColor: this.selectedBoxA ? "red" : "#ccc" };
    },
    makeRedB() {
      return { borderColor: this.selectedBoxB ? "red" : "#ccc" };
    },
  },
});

app.mount("#styling");
