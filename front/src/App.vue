<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/login">Login</router-link>
    </div>
    <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import socket from "./api/socket";
import Footer from "@/components/footer.vue";

@Component({
  components: {
    Footer
  }
})
export default class App extends Vue {
  created() {
    console.log("created")
    socket.init();
    socket.emit("subscribe", `ticker_all`);
    socket.on("ticker_all", tick => {
      this.$store.commit("updateTicker", tick);
    });
  }
  mounted() {
    // console.log("mounted")
  }
  beforeDestroy() {
    console.log("APP desotryeds")
    socket.emit("unsubscribe", `ticker_all`);
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
