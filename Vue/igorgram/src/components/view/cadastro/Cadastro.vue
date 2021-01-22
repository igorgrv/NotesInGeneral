<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado">{{ mensagem }}</h2>
    <h2 class="centralizado">{{ foto.titulo }}</h2>

    <validationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(grava)">
        <div class="controle">
          <label for="titulo">TÍTULO</label>
          <validation-provider
            rules="required|minmax:3,20"
            :bails="false"
            v-slot="{ errors }"
          >
            <input
              name="titulo"
              id="titulo"
              autocomplete="off"
              v-model.lazy="foto.titulo"
            />
            <span class="erro">{{ errors[0] }}</span>
          </validation-provider>
        </div>

        <div class="controle">
          <label for="url">URL</label>
          <validation-provider
            rules="required"
            v-slot="{ errors }"
          >
            <input name="url" id="url" autocomplete="off" v-model.lazy="foto.url" />
            <span class="erro">{{ errors[0] }}</span>
          </validation-provider>
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
          />
        </div>

        <div class="centralizado">
          <meu-botao descricao="GRAVAR" tipo="submit" />
          <router-link :to="{ name: 'home' }">
            <meu-botao descricao="VOLTAR" tipo="button" />
          </router-link>
        </div>
      </form>
    </validationObserver>
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
      mensagem: "",
      id: this.$route.params.id
    };
  },

  methods: {
    gravar() {
      this.$validator
        .validateAll()
        .then(sucess => {
          if (sucess) {
            this.service.cadastra(this.foto).then(
              () => {
                if(this.id)
                  this.$router.push({name:'home'});
                  this.foto = new Foto();
              },
              err => (this.mensagem = err.message)
            );
          }
        }
      );
      //this.foto = new Foto() irá apagar os valores
    }
  },

  created() {
    this.service = new FotoService(this.$resource);
    if (this.id) {
      this.mensagem = "Alterando a foto";
      this.service.getFotoById(this.id).then(foto => (this.foto = foto));
    }
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

.erro {
  color: red;
}
</style>
