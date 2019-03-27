import Vue from 'vue'
import Cabinet from './App.vue'
import Login from './components/login.vue';
import Cab from './components/cabinet.vue';
import Reg from './components/registration.vue';
import Tests from './components/tests.vue';
import TestsApp from './components/tests-app.vue';
import VueRouter  from 'vue-router';
Vue.use(VueRouter);

Vue.component('Login', Login);
Vue.component('Cab', Cab);
Vue.component('Reg', Reg);
Vue.component('Tests', Tests);
Vue.component('TestsApp', TestsApp);



var router = new VueRouter({
	routes:[
		{path: '/cabinet', component: Cab},
		{path: '/tests', component: TestsApp}
	]
})
new Vue({
  el: '#cabinet',
  router:router,
  render: h => h(Cabinet)
  
})
