<template>
  <button :class="estiloDoBotao" :type="tipo" @click="disparaAcao()">
    {{ descricao }}
  </button>
</template>

<script>
export default {
  props: {
    tipo: {
      type: String,
      required: true
    },
    descricao: {
      type: String,
      required: true
    },
    estilo: {
      type: String,
      required: false,
      default: "default"
    }
  },

  methods: {
    disparaAcao() {
      this.$emit('botaoAtivado')
    }
  },
  computed: {
    estiloDoBotao() {
      if (this.estilo == "danger") return "botao botao-perigo";
      if (this.estilo == "default") return "botao botao-padrao";
    }
  }
};
</script>

<style scoped>
.botao {
  display: inline-block;
  padding: 10px;
  border-radius: 3px;
  margin: 10px;
  font-size: 1.2em;
}

.botao-perigo {
  background: firebrick;
  color: white;
}

.botao-padrao {
  background: darkcyan;
  color: white;
}
</style>
