const app = Vue.createApp({
  data() {
    return {
      name: "Igor Romero",
      age: 24,
      imageUrl: "https://academy.especializati.com.br/storage/courses/curso-gratuito-introducao-ao-vue.js-3.png",
    };
  },

  computed: {
    getName() {
      return this.name;
    },
    getAge() {
      return this.age;
    },
    getAgePlusFive() {
      return this.age + 5;
    },
    randomNumber() {
      const randomNumber = Math.random();
      if(randomNumber < 0.5) {
        return 1;
      } else {
        return 0;
      }
    },
  },
});

app.mount("#assignment");
