<template>
  <div class="painel">
    <h2 class="painel-titulo" @dblclick="visivel = !visivel">
      {{ titulo }}
    </h2>
    <transition name="fade">
      <div class="painel-corpo">
        <div v-show="visivel">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["titulo"],
  data() {
    return {
      visivel: true
    };
  }
};
</script>

<style scoped>
* {
  box-shadow: 5px 5px 5px;
}

.painel {
  padding: 0 auto;
  border: solid 2px grey;
  display: inline-block;
  margin: 5px;
  box-shadow: 5px 5px 10px grey;
  width: 200px;
  height: 100%;
  vertical-align: top;
  text-align: center;
}

.painel .painel-titulo {
  text-align: center;
  border: solid 2px;
  background: lightblue;
  margin: 0 0 15px 0;
  padding: 10px;
  text-transform: uppercase;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
