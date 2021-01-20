<template>
  <div class="order-box">
    <b-card no-body>
      <b-tabs pills card>
        <b-tab title="매수" active>
          <b-card-text>
            <b-dropdown
              text="리밋 주문"
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
            <b-input-group class="mt-3">
              <b-button variant="outline-success">-</b-button>
              <b-form-input></b-form-input>
              <b-button variant="info">+</b-button>
            </b-input-group>

            <b-input-group class="mt-3">
              <b-button variant="outline-success">-</b-button>
              <b-form-input></b-form-input>
              <b-button variant="info">+</b-button>
            </b-input-group>

            <b-input-group prepend="0" append="100" class="mt-3">
              <b-form-input type="range" min="0" max="100"></b-form-input>
            </b-input-group>

            <b-form-input placeholder="합계"></b-form-input>
            <div class="available">
              <div class="text">사용 가능</div>
              <div class="amount">3883.345678</div>
            </div>
            <b-button variant="info" class="ask-button">매수</b-button>
          </b-card-text>
        </b-tab>
        <b-tab title="매도"><b-card-text>Tab contents 2</b-card-text></b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";

@Component
export default class OrderBox extends Vue {
  @Getter("getTicker") getTicker: any;

  get items() {
    return this.getTicker;
  }
  created() {
    // console.log("")
  }
  mounted() {
    // console.log("")
  }
}
</script>
<style lang="scss" scoped>
.order-box {
  border: 5px solid green;
  .card {
    #__BVID__11.tabs {
      .card-header {
        border: 1px solid red;
        padding: 0;
      }
      ul.nav.nav-pills.card-header-pills {
        margin: 0;
        border: 1px solid red;
      }
    }
  }
}
.card-body {
  padding: 0;
}
.nav-item {
  width: 50%;
}
.available {
  display: flex;
  justify-content: space-between;
}
.ask-button {
  width: 100%;
}
</style>
