<template>
  <div>
    <ul>
      <li v-for="resource in storedResources" :key="resource.id">
        <base-card>
          <header>
            <h3>{{ resource.title }}</h3>
            <base-button type="button" mode="flat" @click="deleteStored(resource.id)">Delete</base-button>
          </header>
          <p>{{ resource.description }}</p>
          <nav>
            <a :href="resource.link">Learn more...</a>
          </nav>
        </base-card>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  inject: ['storedResources', 'deleteResource'],
  methods: {
    deleteStored(id) {
      this.deleteResource(id);
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  margin: auto;
  max-width: 40rem;
}

li {
  margin: auto;
  max-width: 40rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  font-size: 1.25rem;
  margin: 0.5rem 0;
}

p {
  margin: 0.5rem 0;
}

a {
  text-decoration: none;
  color: #ce5c00;
}

a:hover,
a:active {
  color: #c89300;
}
</style>
