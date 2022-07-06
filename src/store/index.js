import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') !== null ? localStorage.getItem('token') : null,
  },
  mutations: {
    modificarToken(state, payload){   
      state.token = payload;
    }
  },
  actions: {
    guardarToken ({commit}, payload) {
      commit('modificarToken', payload);
      localStorage.setItem('token', payload);
    },
    cerrarSesion({commit}){
      commit('modificarToken', null);
      localStorage.removeItem('token');
      router.push({name: 'InicioSesion'});
    }
  },
  getters:{
    token (state) {
      return state.token
    }
  },
  modules: {
  }
})
