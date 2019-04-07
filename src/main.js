import Vue from 'vue'
import Cabinet from './App.vue'
import Login from './components/login.vue';
import Cab from './components/cabinet.vue';
import Reg from './components/registration.vue';
import Tests from './components/tests.vue';
import TestsApp from './components/tests-app.vue';
import Question from './components/question.vue';
import Q from './components/q.vue';
Vue.component('Login', Login);
Vue.component('Cab', Cab);
Vue.component('Reg', Reg);
Vue.component('Tests', Tests);
Vue.component('TestsApp', TestsApp);
Vue.component('Question', Question);
Vue.component('Q', Q);
new Vue({
  el: '#cabinet',
  render: h => h(Cabinet)
  
})
