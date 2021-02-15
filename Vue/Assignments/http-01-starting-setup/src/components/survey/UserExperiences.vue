<template>
  <section>
    <base-card>
      <h2>Submitted Experiences</h2>
      <div>
        <base-button @click="loadExperiences"
          >Load Submitted Experiences</base-button
        >
      </div>
      <p v-if="isLoading">Loading...</p>
      <ul v-else>
        <survey-result
          v-for="result in results"
          :key="result.id"
          :name="result.name"
          :rating="result.rating"
        ></survey-result>
      </ul>
    </base-card>
  </section>
</template>

<script>
import SurveyResult from './SurveyResult.vue';

export default {
  components: {
    SurveyResult
  },
  data() {
    return {
      results: [],
      isLoading: false,
      error: ''
    };
  },
  methods: {
    loadExperiences() {
      this.isLoading = true
      this.error = null
      fetch('https://vue-http-demo-igorgrv-default-rtdb.firebaseio.com/surverys.json')
      .then(res => {
        if(res.ok) return res.json()
      })
      .then(data => {
        this.isLoading = false
        const results = []
        for(const id in data) {
          results.push({
            id: id,
            rating: data[id].rating,
            name: data[id].userName
          })
        }
        this.results = results
      })
      .catch((error) => {
        console.error(error);
        this.isLoading = false;
        this.error = 'Falha ao fazer o fetch'
      });
    }
  },
  mounted() {
    this.loadExperiences();
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
