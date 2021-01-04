<template>
  <div class="alter">
    <div class="symbol">ETHUSDT</div>
    <div class="orderui">
      <b-card no-body>
        <b-tabs pills card>
          <b-tab title="Tab 1" active><b-card-text>Tab contents 1</b-card-text></b-tab>
          <b-tab title="Tab 2"><b-card-text>Tab contents 2</b-card-text></b-tab>
        </b-tabs>
      </b-card>
     
      <b-dropdown
          text="Block Level Split Dropdown"
          block
          split
          split-variant="outline-primary"
          variant="primary"
          class="m-2"
        >
          <b-dropdown-item href="#">Action</b-dropdown-item>
          <b-dropdown-item href="#">Another action</b-dropdown-item>
          <b-dropdown-item href="#">Something else here...</b-dropdown-item>
      </b-dropdown>
      <b-input-group prepend="Username" class="mt-3">
        <b-form-input></b-form-input>
        <b-input-group-append>
          <b-button variant="outline-success">Button</b-button>
          <b-button variant="info">Button</b-button>
        </b-input-group-append>
      </b-input-group>
      
      <b-input-group prepend="Username" class="mt-3">
        <b-form-input></b-form-input>
        <b-input-group-append>
          <b-button variant="outline-success">Button</b-button>
          <b-button variant="info">Button</b-button>
        </b-input-group-append>
      </b-input-group>
      
      <b-input-group prepend="0" append="100" class="mt-3">
        <b-form-input type="range" min="0" max="100"></b-form-input>
      </b-input-group>
      
      <b-input-group size="lg" prepend="$" append=".00">
        <b-form-input></b-form-input>
      </b-input-group>
      <b-list-group>
        <div class="ORDER" v-for="(item, index) in [1,2,3,4]" :key ="item + index" >
          <b-list-group-item button>
            {{item}}
          </b-list-group-item>
        </div>
      </b-list-group>
      <div class="CURRENT">CURRENT</div>
      <b-list-group>
        <div class="ORDER" v-for="(item, index) in [1,2,3,4]" :key ="item + index" >
          <b-list-group-item button>
            {{item}}
          </b-list-group-item>
        </div>
      </b-list-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {State, Action, Getter} from 'vuex-class';

@Component
export default class Alter extends Vue {
  
  @Getter('getTicker') getTicker: any;
  
  get items() {
    return this.getTicker
  }
  created() {
    // console.log("")
  }
  mounted() {
    // console.log("")
  }
  join(name) {
    // socket.emit("subscribe", name)
  }
}
</script>
