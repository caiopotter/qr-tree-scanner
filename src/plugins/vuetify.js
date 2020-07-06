import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
    theme: {
        options: {
            customProperties: true,
         },
        themes: {
          light: {
              electric: '#3CC47C',
              forest: '#1E392A',
              leaf: '#C9D439',
              wood: '#7C4D25',
              light: '#E9C893',
              tin: '#828081',
              light_grey: '#BDBDBD'
          }
        }
    }
});
