<template>
  <div>
    <h1 class="centralizado">Home</h1>

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
      filtro: ""
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
      alert(foto.titulo + " removida!");
    }
  },

  created() {
    this.$http
      .get("http://localhost:3000/v1/fotos")
      .then(res => res.json())
      .then(
        fotos => (this.fotos = fotos),
        err => console.log(err)
      );
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
