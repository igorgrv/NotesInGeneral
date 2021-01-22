import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import './directive/Transform'
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.http.options.root = 'http://localhost:3000';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

const router = new VueRouter ({
  routes,
  mode: 'history'
})


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

extend('required', {
  validate (value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1
    };
  },
  computesRequired: true,
  message: 'Este campo é obrigatório!'
});

extend('minmax', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max;
  },
  params: ['min', 'max'],
  message:'O campo {_field_} deve possuir no mínimo {min} e no máximo {max} caracteres.'

});
