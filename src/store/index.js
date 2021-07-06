import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    getRecruitmentData() {
      const BASE_URL = 'https://dummyapi.io/data/api';
      const APP_ID = "60e02b9f3b3e168b56cd93ed"
     return axios.get(`${BASE_URL}/user?limit=100`, { headers: { 'app-id': APP_ID } })
    }
  },
})
