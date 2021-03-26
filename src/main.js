import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';
import firebase from 'firebase';
import moment from "moment"
Vue.config.productionTip = false

moment.locale('fr');

let app = '';

const config = {
    apiKey: "AIzaSyDsIHX4iNotZw8Bau_8h5gWKG6Hsbf4P78",
    authDomain: "taskforce04-7df7a.firebaseapp.com",
    projectId: "taskforce04-7df7a",
    storageBucket: "taskforce04-7df7a.appspot.com",
    messagingSenderId: "151262402541",
    appId: "1:151262402541:web:f077fd5d3793bd455879e4"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(async (data) => {


    if (!app) {
        /* eslint-disable no-new */
        app = new Vue({
            vuetify,
            router,
            render: h => h(App)
        }).$mount('#app');
    }
})
