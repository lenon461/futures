import _ from "lodash";

const state = {
  ticker: []
};

const getters = {
  getTicker(state) {
    // console.log(_.get(state, ["tickers"]))
    return _.get(state, ["ticker"]);
  }
};

const mutations = {
  updateTicker(state, _tick) {
    const tick = JSON.parse(_tick);
    state.ticker = tick;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
