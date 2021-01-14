<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado">{{ mensagem }}</h2>
    <h2 class="centralizado">{{ foto.titulo }}</h2>

    <form @submit.prevent="gravar()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input id="titulo" autocomplete="off" v-model.lazy="foto.titulo" />
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input id="url" autocomplete="off" v-model.lazy="foto.url" />
        <imagem-responsiva
          v-show="foto.url"
          :url="foto.url"
          :descricao="foto.descricao"
        />
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea
          id="descricao"
          autocomplete="off"
          v-model="foto.descricao"
        ></textarea>
      </div>

      <div class="centralizado">
        <meu-botao descricao="GRAVAR" tipo="submit" />
        <router-link :to="{name: 'home'}"
          ><meu-botao descricao="VOLTAR" tipo="button"
        /></router-link>
      </div>
    </form>
  </div>
</template>

<script>
import ImagemResponsiva from "../../shared/imagem-responsiva/ImagemResponsiva";
import Botao from "../../shared/botao/Botao";
import Foto from "../../../domain/model/foto/Foto";
import FotoService from "../../../domain/service/foto/FotoService";

export default {
  components: {
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao
  },

  data() {
    return {
      foto: new Foto(),
      mensagem: ''
    };
  },

  methods: {
    gravar() {
      this.service
        .cadastra(this.foto)
        .then(() => this.foto = new Foto(), err => this.mensagem = err.message);
        //this.foto = new Foto() irá apagar os valores
    }
  },

  created() {
    this.service = new FotoService(this.$resource);
  }
};
</script>
<style scoped>
.centralizado {
  text-align: center;
}
.controle {
  font-size: 1.2em;
  margin-bottom: 20px;
}
.controle label {
  display: block;
  font-weight: bold;
}

.controle label + input,
.controle textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px;
}

.centralizado {
  text-align: center;
}
</style>
