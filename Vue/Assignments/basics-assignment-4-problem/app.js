const app = Vue.createApp({
  data() {
    return {
      userInput: "",
      visibility: true,
      colorInput:""
    };
  },
  computed: {
    toggleParagraph() {
      if (this.visibility) return "visible";
      return "hidden";
    },
  },
  methods: {
    toggleVisibility() {
      this.visibility = !this.visibility;
    },
  },
});

app.mount("#assignment");
