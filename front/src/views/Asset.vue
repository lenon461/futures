<template>
  <div>
    <b-button @click="getProfile" variant="primary">getProfile</b-button>
    <p>{{profile}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Api from "@/api";

@Component({
  components: {}
})
export default class Asset extends Vue {
  public profile = null;


  async getProfile() {
    this.profile = (await Api.User.getProfile()).data;
  }
}
</script>
