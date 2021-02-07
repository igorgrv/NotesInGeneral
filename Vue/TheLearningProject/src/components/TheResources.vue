<template>
  <div>
    <base-card>
      <base-button @click="setTab('add-resources')" :mode="setClassAdd">Add Resource</base-button>
      <base-button @click="setTab('stored-resources')" :mode="setClassStored">Stored Resource</base-button>
    </base-card>
    <keep-alive>
      <component :is="selectedTab"></component>
    </keep-alive>
  </div>
</template>

<script>
import AddResources from '../view/add-resources/AddResources';
import StoredResources from '../view/stored-resources/StoredResources';

export default {
  name: 'TheResource',
  components: { StoredResources, AddResources },
  data() {
    return {
      selectedTab: 'stored-resources',
      storedResources: [
        {
          id: 'google',
          title: 'Google',
          description: 'Learn how to google...',
          link: 'https://www.google.com.br',
        },
        {
          id: 'udemy',
          title: 'Udemy',
          description: 'Learn with Udemy...',
          link: 'https://ibm-learning.udemy.com/',
        },
      ],
    };
  },
  methods: {
    setTab(tab) {
      this.selectedTab = tab;
    },
    addResource(title, description, link) {
      const newResource = {
        id: new Date().toISOString(),
        title: title,
        description: description,
        link: link,
      };

      this.storedResources.unshift(newResource);
      this.selectedTab = 'stored-resources';
    },
    deleteResource(id) {
      const resourceIndex = this.storedResources.findIndex((res) => res.id === id);
      this.storedResources.splice(resourceIndex, 1);
    },
  },
  provide() {
    return {
      storedResources: this.storedResources,
      addResource: this.addResource,
      deleteResource: this.deleteResource,
    };
  },
  computed: {
    setClassAdd() {
      return this.selectedTab === 'add-resources' ? null : 'flat';
    },
    setClassStored() {
      return this.selectedTab === 'stored-resources' ? null : 'flat';
    },
  },
};
</script>

<style scoped></style>
