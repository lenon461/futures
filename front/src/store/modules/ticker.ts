import _ from 'lodash'

const state = {
    tickers: [
        {
            name:'A',
            point:30,
        },
        {
            name:'B',
            point:30,
        },
        {
            name:'C',
            point:30,
        },
        {
            name:'D',
            point:30,
        },
        {
            name:'E',
            point:30,
        },
    ]
    
}

const getters = {
    getTicker(state) {
        console.log(_.get(state, ["tickers"]))
        return _.get(state, ["tickers"])
    }
}

const mutations = {
    updateTicker(state, _tick) {
        const tick = JSON.parse(_tick)
        state.tickers = tick
    }
}

const actions = {

}


export default {
    state, getters, mutations, actions,
}