
import Vue from './javascript/vue';
import axios from 'axios'
import './index.html';
import './style/style.css';
import app from './javascript/base';
Vue.prototype.$http = axios;
app(Vue)