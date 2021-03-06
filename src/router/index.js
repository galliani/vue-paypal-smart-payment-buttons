import Vue                          from 'vue'
import Router                       from 'vue-router'
import vuePaypalSmartPaymentButtons from '@/components/checkout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'checkout',
      component: vuePaypalSmartPaymentButtons,
      props: {
        buttonUniqueReference: "paypal-container-random-uid",
        cart: {
          intent: 'CAPTURE',
          items: [
            {
              reference_id: 16,
              description: 'Product A',
              amount: {
                currency_code: 'USD',
                value: 20
              }
            }
          ]
        }
      }
    }
  ]
})
