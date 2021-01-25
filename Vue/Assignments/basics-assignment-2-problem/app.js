//app.js
const app = Vue.createApp({
  data() {
    return {
      input: "",
      inputOnEnter: "",
    };
  },
  methods: {
    showAlert() {
      alert("showAlert event");
    },
    inputPress(e) {
      this.input = e.target.value;
    },
    inputPressEnter(e) {
      this.inputOnEnter = e.target.value;
    },
  },
});
app.mount("#assignment");
