<template>
  <div>
    <b-form @submit="onSubmit" v-if="true">
      <b-form-group
        id="fieldset-1"
        label-for="input-1"
        valid-feedback="Thank you!"
        :state="state"
      >
        <!-- :invalid-feedback="invalidFeedback" -->
        <b-form-input id="input-1" v-model="id" trim></b-form-input>
        <b-form-input id="input-2" v-model="passwd" trim></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Api from "@/api";
import { setAuthorization } from "@/api/axios";

@Component({
  components: {}
})
export default class Login extends Vue {
  public id = "";
  public passwd = "";

  get state() {
    return this.id.length >= 4 && this.passwd.length >= 4;
  }

  async onSubmit(event) {
    event.preventDefault();
    const result = await Api.Auth.postLogin({
      id: this.id,
      passwd: this.passwd
    });
    const token = result.data.access_token;
    setAuthorization(token);

    this.$router.push("asset")

  }

}
</script>
