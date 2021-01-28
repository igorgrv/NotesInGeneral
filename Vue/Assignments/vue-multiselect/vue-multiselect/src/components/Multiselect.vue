<template>
  <div>
    <label class="typo__label" for="ajax">Async multiselect</label>
    <Multiselect
      v-model="selectedTags"
      id="tags"
      label="name"
      track-by="code"
      placeholder="Type to search"
      open-direction="bottom"
      :options="tags"
      :taggable="true"
      @tag="addTagSplit"
      :multiple="true"
      :searchable="true"
      :loading="isLoading"
      :internal-search="false"
      :clear-on-select="true"
      :close-on-select="false"
      :options-limit="300"
      :limit="3"
      :limit-text="limitText"
      :max-height="600"
      :show-no-results="false"
      :hide-selected="true"
      @search-change="asyncFind"
    >
      <template slot="clear" slot-scope="props">
        <div
          class="multiselect__clear"
          v-if="selectedTags.length"
          @mousedown.prevent.stop="clearAll(props.search)"
        ></div> </template
      ><span slot="noResult"
        >Oops! No elements found. Consider changing the search query.</span
      >
    </Multiselect>
    <pre class="language-json"><code>{{ tags  }}</code></pre>
  </div>
</template>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  props: {
    userId: {
      type: Number,
    },
    tagGroup: {
      type: String,
    },
  },
  data() {
    return {
      selectedTags: [],
      tags: [],
      isLoading: false,
    };
  },
  methods: {
    addTagSplit(value) {
      value.split(",").map((item) => {
        this.asyncFind(item.trim());
        this.selectedTags.push({
          name: item.trim(),
        });
      });
    },
    limitText(count) {
      return `and ${count} other tags`;
    },
    asyncFind(query) {
      console.log("query: " + query);
      if (query.length >= 1) {
        this.isLoading = true;
        axios
          .get("https://jsonplaceholder.typicode.com/users/" + query)
          .then((response) => {
            console.log("response: " + JSON.stringify(response.data));
            this.tags.push(response.data.name);
          });
      }
    },
    clearAll() {
      this.selectedTags = [];
    },
  },
};
</script>
