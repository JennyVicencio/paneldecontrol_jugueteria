import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { firebaseConfig } from "./config/firebaseConfig"; //archivo externo de la apiKey 
import firebase from 'firebase';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserAlt, faUser as fasUser, faUserCog, faHome, faInfo, faThList, faLink, faExclamationCircle, faSignInAlt, faSignOutAlt, faEye, faEyeSlash, faInfoCircle, faArrowUp, faAngleRight, faAngleLeft, faSyncAlt, faChevronUp, faChevronDown, faCheck, faEdit, faTrashAlt ,faUserCheck, faUserTimes, faMinus, faPlus, faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Font Awesome
library.add(faUserAlt, fasUser, farUser, faUserCog, faHome, faInfo, faThList, faLink, faExclamationCircle, faSignInAlt, faSignOutAlt, faEye, faEyeSlash, faInfoCircle, faArrowUp, faAngleLeft, faAngleRight, faSyncAlt, faChevronUp, faChevronDown, faCheck, faUserCheck, faUserTimes, faPlusCircle, faEdit, faTrashAlt, faMinus, faPlus, faSearch);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('vue-fontawesome', FontAwesomeIcon);

// Renderiza iconos de Font Awesome
Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
