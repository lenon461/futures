<template>
  <div class="order-book">
    <b-list-group>
      <div class="ORDER" v-for="(item, index) in bids" :key="item + index">
        <b-list-group-item button>
          {{ item }}
        </b-list-group-item>
      </div>
    </b-list-group>
    <div class="CURRENT">CURRENT</div>
    <b-list-group>
      <div class="ORDER" v-for="(item, index) in asks" :key="item + index">
        <b-list-group-item button>
          {{ item }}
        </b-list-group-item>
      </div>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";

@Component
export default class OrderBook extends Vue {
  @Prop() readonly depth!: any;
  get bids() {
    return this.depth.S;
  }
  get asks() {
    return this.depth.B;
  }
  created() {
    // console.log("")
  }
  mounted() {
    // console.log("")
  }
}
</script>
<style scoped>
.order-book {
  border: 5px solid greenyellow;
}
</style>
