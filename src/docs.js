import Vue        from 'vue'
import LoadScript from 'vue-plugin-load-script';
import App        from './app'
import router     from './router'

Vue.use(LoadScript);
Vue.config.productionTip = false

const paypalCientID = '';

/* eslint-disable no-new */
Vue.loadScript(`https://www.paypal.com/sdk/js?client-id=${paypalCientID}`).then(() => {
  new Vue({
    el: '#app',
    router,
    render: h => h(App),
  })
})