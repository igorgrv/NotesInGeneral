<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <label class="typo__label">Tagging</label>
      <multiselect
        v-model="selectedResults"
        tag-placeholder="Add this as new tag"
        placeholder="Search or add a tag"
        label="name"
        track-by="code"
        :options="options"
        :multiple="true"
        :taggable="true"
        @tag="addTagSplit"
      ></multiselect>
      <pre class="language-json"><code>{{ selectedResults  }}</code></pre>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    Multiselect,
  },
  data() {
    return {
      selectedResults: [],
      options: [
        { name: "Vue.js", code: "vu" },
        { name: "Javascript", code: "js" },
        { name: "Open Source", code: "os" },
      ],
    };
  },
  methods: {
    // addTag(newTag) {
    //   const tag = {
    //     name: newTag,
    //     code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
    //   };
    //   this.options.push(tag);
    //   this.value.push(tag);
    // },
    addTagSplit(value) {
      value.split(",").map((item) => {
        this.options.push({
          name: item.trim(),
        });
        this.selectedResults.push({
          name: item.trim(),
        });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("~vue-multiselect/dist/vue-multiselect.min.css");

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
