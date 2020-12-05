<template>
  <div class="paypal-smart-payment-buttons-checkout">
    <div :id="buttonUniqueReference"></div>
  </div>
</template>

<script>
export default {
  name: 'checkout',
  props: {
    cart: {
      type: Object,
      // Object or array defaults must be returned from
      // a factory function
      default: function () {
        return {
          intent: '',
          payer:  null,
          items:  []
        }
      }
    },
    buttonUniqueReference: {
      type: String,
      required: true
    }
  },
  data() {
    const defaultPurchaseUnit = {
      reference_id: null,
      description: "lorem",
      amount: {
        currency_code: "USD",
        value: 100
      }
    };

    return {
      order: {
        intent:             'CAPTURE',
        payer:              {},
        purchase_units:     [{ ...defaultPurchaseUnit }]
      }
    }
  },  
  mounted: function() {
    this.order.intent         = this.cart.intent;
    this.order.purchase_units = this.cart.items;

    if (this.cart.payer) {
      this.order.payer        = this.cart.payer;
    }

    this.setLoaded();  
  },
  computed: {
    // This is important to enable displaying multiple (a group of) smart buttons in a single page
    // by assigning each with unique identifier, we can refer it and render each dnyamically
    dynamicSelectorContainer() {
      return '#' + this.buttonUniqueReference;
    }
  },
  methods: {
    setLoaded: function() {
      window.paypal
        .Buttons({
          createOrder: async (data, actions) => {
            const paypalOrderId = await actions.order.create(this.order);

            this.$emit('paypal-order-created', paypalOrderId);

            // HAS to return the ID for the checkout process to run smoothly
            return paypalOrderId;
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            // for complete reference of order object: https://developer.paypal.com/docs/api/orders/v2

            return this.$emit('paypal-order-approved', order);
          },
          onError: err => {
            this.$emit('paypal-order-failed', err)
          }
        })
        .render(this.dynamicSelectorContainer);
    }
  }
}
</script>