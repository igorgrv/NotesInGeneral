<template>
  <div>
    <h1 class="centralizado">Home</h1>
    <h2 class="centralizado">{{ mensagem }}</h2>
    <input
      type="search"
      @input="filtro = $event.target.value"
      class="filtro"
      placeholder="Filtre pelo título da foto"
    />

    <ul class="lista-fotos">
      <li
        class="lista-fotos-item"
        v-for="foto of fotosComFiltro"
        :key="foto._id"
      >
        <painel :titulo="foto.titulo">
          <imagem-responsiva :url="foto.url" :titulo="foto.titulo" v-rotacao-diretiva="{incremento:15, animate:true}"/>
          <botao-customizado
            descricao="REMOVER"
            tipo="button"
            @botaoAtivado="remove(foto)"
          ></botao-customizado>
        </painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "../../../components/shared/painel/Painel";
import ImagemResponsiva from "../../../components/shared/imagem-responsiva/ImagemResponsiva";
import Botao from "../../shared/botao/Botao.vue";
import FotoService from "../../../domain/service/foto/FotoService";

export default {
  components: {
    painel: Painel,
    "imagem-responsiva": ImagemResponsiva,
    "botao-customizado": Botao
  },

  data() {
    return {
      titulo: "IgorGram",
      fotos: [],
      filtro: "",
      mensagem: ""
    };
  },

  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        let expRegular = new RegExp(this.filtro.trim(), "i");
        return this.fotos.filter(fotoFiltrada =>
          expRegular.test(fotoFiltrada.titulo)
        );
      } else {
        return this.fotos;
      }
    }
  },

  methods: {
    remove(foto) {
      this.service
        .remove(foto._id)
        .then(
          () => {
            let indice = this.fotos.indexOf(foto)
            this.fotos.splice(indice, 1);
            this.mensagem = "Foto removida com sucesso";
            },
          err => this.mensagem = err.message
        );
    }
  },

  created() {
    this.service = new FotoService(this.$resource);
    this.service.listaFotos().then(fotos => this.fotos = fotos);
  }
};
</script>

<style>
.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: block;
  width: 100%;
}
</style>
