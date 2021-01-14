<template>
  <nav>
    <ul>
      <li v-for="route of routes" :key="route.path">
        <router-link :to="route.path ? route.path : '/'">
          {{route.titulo}}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import {routes} from '../../../routes'

export default {

  data() {
    return {
      routes: routes.filter(rota => rota.menu)
    }
  }
}
</script>

<style></style>
