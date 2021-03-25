import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import fr from 'vuetify/es5/locale/fr';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#010e28",
                secondary: "#f2f2fb"
            }
        }

    },
    lang: {
        locales: { fr },
        current: 'fr',
    },
    icons: {
        iconfont: 'md',
    },
});