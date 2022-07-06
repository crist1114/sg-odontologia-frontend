import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Import VueScheduler
import VueScheduler from 'v-calendar-scheduler';

// Import styles
import 'v-calendar-scheduler/lib/main.css';
 

/**
 * Agregamos la URL base de nuestra API. Para conectarse al backend local:
 * SprinBoot
 */
axios.defaults.baseURL = 'http://localhost:5000/';


/**
 * Agregamos la URL base de nuestra API. Para conectarse al backend de producción heroku:
 */
//axios.defaults.baseURL = 'https://sg-odontologia.herokuapp.com/';


Vue.config.productionTip = false
Vue.use(VueAxios, axios)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueScheduler);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
