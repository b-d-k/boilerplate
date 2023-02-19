// Styles
import './scss/index.scss';


// Vue (optional)
import { createApp } from 'vue';
import HelloVue from './vue-components/hello-vue.vue';

const vueApp = createApp({});

vueApp.component('HelloVue', HelloVue);
vueApp.mount('#vueApp');


// Other JS
console.log('Hello Boilerplate');
