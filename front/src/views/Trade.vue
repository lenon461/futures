<template>
  <div>
    <Alter/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Api from "../api";
import Alter from "@/components/alter.vue";
import socket from "../api/socket";

@Component({
  components: {
    Alter
  }
})
export default class Home extends Vue {
  created() {
    socket.emit('subscribe', 'depth@PAKA')
  }
  private fav;
}
</script>
