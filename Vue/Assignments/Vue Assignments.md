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



## 5. Conditionals

<img src="/Users/igorromero/NotesInGeneral/Vue/imagesReadme/assignment5.png" alt="assignment5" style="zoom:50%;" />

* Exibir a lista somente se houver valores;
* Botão deve mudar o nome, caso tenha valores na lista ou não;
* Botão deve escnoder ou mostrar a lista;

```vue
<section id="assignment">
  <h2>Assignment</h2>
  <!-- 1) Add code to manage a list of tasks in a Vue app -->
  <!-- When clicking "Add Task" a new task with the entered text should be added -->
  <input type="text" v-model="inputTask" />
  <button @click="addTask">Add Task</button>
  <ul v-if="isNotHide">
    <!-- 2) Output the list of tasks here -->
    <li v-for="task in tasks">{{task}}</li>
  </ul>
  <!-- 3) When the below button is pressed, the list should be shown or hidden -->
  <!-- BONUS: Also update the button caption -->
  <button @click="toggleHide" >{{ textButton }}</button>
</section>
```

```javascript
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
```



# Project

## 1. Monster Slayer

<img src="/Users/igorromero/Library/Application Support/typora-user-images/Screen Shot 2021-01-29 at 22.07.18.png" alt="Screen Shot 2021-01-29 at 22.07.18" style="zoom:30%;" />

### To do

* Botão ataque, deve retirar de X - Y do monstro e de X - Y do jogador com um `Attack`;
* Botão `special Attack` irá tirar mais dano do que o normal, jogador tbm receberá um ataque;
* Heal irá curar o jogador e receber um taque;
* Surrender o jogo acaba;
* Battle log deve registrar cada dano e habilidade usada;

### Base do projeto

```vue
<body>
  <header>
    <h1>Monster Slayer</h1>
  </header>
  <div id="game">
    <section id="monster" class="container">
      <h2>Monster Health</h2>
      <div class="healthbar">
        <div class="healthbar__value"></div>
      </div>
    </section>
    <section id="player" class="container">
      <h2>Your Health</h2>
      <div class="healthbar">
        <div class="healthbar__value"></div>
      </div>
    </section>
    <section id="controls">
      <button>ATTACK</button>
      <button>SPECIAL ATTACK</button>
      <button>HEAL</button>
      <button>SURRENDER</button>
    </section>
    <section id="log" class="container">
      <h2>Battle Log</h2>
      <ul></ul>
    </section>
  </div>
</body>
```

### Botão de Ataque

Antes de realizar o ataque, precisamos passar os valores da barra de saúde (`health`)!

```javascript
const app = Vue.createApp({
  data() {
    return {
      playersHealth: 100,
      monstersHealth: 100,
    };
  }
});

app.mount('#game');
```

Com `health` criado, podemos criar uma função que irá receber o attaque minimo e máximo para retirar da vida do player e do monster

```javascript
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  methods: {
    attackMonster() {
      this.monstersHealth -= getRandomNumber(5, 12);
      this.attackPlayer();
    },
    attackPlayer() {
      this.playersHealth -= getRandomNumber(8, 15);
    },
  },
});

app.mount('#game');
```

Para alterar a vida no html, iremos criar uma `computed` que retorna um `style` ou seja, um objeto que irá alterar o `width`

```javascript
  computed: {
    monsterHealthBar() {
      if(this.monsterHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.monsterHealth + '%' };
    },
    playerHealthBar() {
      if(this.playerHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.playerHealth + '%'};
    }
  }
```

No html

```vue
<div class="healthbar">
  <div class="healthbar__value" :style="monsterHealthBar"></div>
</div>

<div class="healthbar">
  <div class="healthbar__value" :style="playerHealthBar"></div>
</div>
```

### Botão Special Ataque

Bem parecido com o botão de ataque, so aumentaremos o dano, e através do `countRounds` iremos checar se podemos apertar o botao novamente

```javascript
methods: {
  specialAttack() {
    this.countRounds++;
    this.monsterHealth -= getRandomNumber(10,25);
    this.attackPlayer();
  }
},
computed: {
  mayUseSpecial() {
      return this.countRounds % 3 !== 0;
  }
}
```

No html:

```vue
<button :disabled="mayUseSpecial" @click="specialAttack">
  SPECIAL ATTACK
</button>
```

### Botão de cura

Para a cura, basta que a gente utilize a função que pega um valor e acrescentar a vida do player:

```javascript
methods: {
  health() {
    this.countRounds++;
    const healthValue = getRandomNumber(8,20)
    if(this.playerHealth + healthValue < 100){    
      this.playerHealth += healthValue;
    }
    this.attackPlayer();
  }
}
```

```vue
<button @click="health">HEAL</button>
```

### Exibir vencedor

Para exibir o vencedor, iremos utilizar do `watch` para checar a cada mudança do `playerHealth` e `monsterHealth`

```javascript
data() {
  return {
    playerHealth: 100,
    monsterHealth: 100,
    countRounds: 0,
    winner: null
  };
},
watch: {
  playerHealth(value) {
    if(value <= 0 && this.monsterHealth <= 0)
      this.winner = 'draw'
    else if (value <= 0) 
      this.winner = 'monster'
  },
    monsterHealth(value){
      if(value <= 0 && this.playerHealth <= 0)
        this.winner = 'draw'
      else if (value <= 0) 
        this.winner = 'player'     
    }
}
```

No html, caso termine o jogo iremos retirar os botões e exibir um botão de restart!

```vue
<section class="container" v-if="winner">
  <h2>Game Over!</h2>
  <h2 v-if="winner === 'player'">You Win!</h2>
  <h2 v-else-if="winner === 'monster'">You Lose!</h2>
  <h2 v-else>It's a Draw</h2>
  <button @click="restartGame">Restart the Game</button>
</section>
<section id="controls" v-else>
  <button @click="attackMonster">ATTACK</button>
```

Botão de restart:

```javascript
restartGame() {
  this.monsterHealth = 100;
  this.playerHealth = 100;
  this.countRounds = 0;
  this.winner = null;
}
```

### Botão surrender

O botão de Surrender, irá fazer cmo que a gente perca e o jogue acabe

```javascript
surrender() {
  this.winner = 'monster';
}
```

```vue
<button @click="surrender">SURRENDER</button>
```

### 