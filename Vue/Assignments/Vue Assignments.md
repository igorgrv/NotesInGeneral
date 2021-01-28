# Vue Assignments

## 1. Data Binding/Interpolation

<img src="/Users/igorromero/NotesInGeneral/Vue/imagesReadme/assignment1.png" alt="assignment1" style="zoom:50%;" />

Exiba seu nome, idade, idade + 5 anos, número entre 0 e 1, uma imagem e já deixe exibo o nome no `input`

```vue
<!-- index -->
<body>
  <section id="assignment">
    <!-- 1) Output your name -->
    <h2>{{ getName }}</h2>
    <!-- 2) Output your age -->
    <p>{{ getAge }}</p>
    <!-- 3) Output your age + 5 -->
    <p>{{ getAgePlusFive }}</p>
    <!-- 4) Output a random number (0 to 1) -->
    <p>Favorite Number: {{ randomNumber }}</p>
    <div>
      <!-- 5) Display some image you found via Google -->
      <img :src="imageUrl" />
    </div>
    <!-- 6) Prepopulate the input field with your name via the "value" attribute -->
    <input type="text" :value="name"/>
  </section>
</body>
```

```javascript
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

```



## 2. Event Binding



<img src="/Users/igorromero/NotesInGeneral/Vue/imagesReadme/assignment2.png" alt="assignment2" style="zoom:50%;" />

* Ao clicar no botão `show Alert` exibir um aleta;
* Exibir no 1 output, o que vier do `keydown` do `input`;
* Exibir no 2 output, o que vier do `input` mas somente após apertar o ENTER;

```vue
<section id="assignment">
  <h2>Event Practice</h2>
  <!-- 1) Show an alert (any text of your choice) when the button is pressed -->
  <button @click="showAlert">Show Alert</button>
  <hr />
  <!-- 2) Register the user input on "keydown" and output it in the paragraph -->
  <input type="text" @keydown="inputPress" />
  <p>{{ input }}</p>
  <hr />
  <!-- 3) Repeat 2) but only output the entered value if the ENTER key was pressed -->
  <input type="text" @keydown.enter="inputPressEnter" />
  <p>{{ inputOnEnter }}</p>
</section>
```

```javascript
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

```



## 3. Reactivity

<img src="/Users/igorromero/NotesInGeneral/Vue/imagesReadme/assignment3.png" alt="assignment3" style="zoom:50%;" />

* Botão `add 5` deve adicionar 5 no resultado;
* Botão `add 1` deve adicionar 1 no resultado, utilizando a mesma função do `add 5`;
* Se o valor for menor que 37 devemos exibir `not there yet`;
* Se o valor for maior que 37 exibir → `Too Much!`
* Se for exatos 37, exibir `37`;
* Resetar para 0 após 5 segundos com o `watch`;

```vue
<section id="assignment">
  <button @click="addValue(5)">Add 5</button>
  <button @click="addValue(1)">Add 1</button>
  <!-- 1) Connect the buttons and calculate a value (a number) -->
  <!-- Show "Not there yet" until you reach a result of exactly 37 -->
  <!-- Show "Too much!" if the result is greater than 37 -->
  <p>Result: {{ result }} - {{ counter }}</p>
  <!-- 2) Watch for changes in "result" and reset the value to 0 after 5 seconds -->
</section>
```

```javascript
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

```

## 4. Dynamic Styling

<img src="/Users/igorromero/NotesInGeneral/Vue/imagesReadme/assignment4.png" alt="assignment3" style="zoom:50%;" />

* Mudar o `Style me` se o valor digitado for `user1` ou `user2`;
* O `toggle paragraph` irá exibir ou não exibir o `style me`;
* O segundo input deverá setar a cor do `style me inline`;

```vue
<section id="assignment">
  <!-- 1) Fetch the user input and use it as a CSS class -->
  <!-- The entered class should be added to the below paragraph -->
  <input type="text" v-model="userInput"/>
  <!-- (available classes: "user1", "user2") -->
  <p :class="userInput">
    Style me!
  </p>
  <button @click="toggleVisibility">Toggle Paragraph</button>
  <!-- 2) Use the "visible" and "hidden" classes to show/ hide the above paragraph -->
  <!-- Clicking the button should toggle between the two options -->

  <!-- 3) Add dynamic inline styling to the below paragraph and let the user enter a background-color -->
  <input type="text" v-model="colorInput"/>
  <p :style="{'background-color': colorInput}">Style me inline!</p>
</section>
```

```javascript
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
```