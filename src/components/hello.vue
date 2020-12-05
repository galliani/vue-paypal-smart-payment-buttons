<template>
  <div class="hello">
    <div :id="buttonUniqueReference"></div>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  props: {
    buttonUniqueReference: {
      type: String,
      required: true
    }    
  },  
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      order: {
        // reference: https://developer.paypal.com/docs/api/orders/v2/
        // payer: {},
        intent: 'CAPTURE', // 'CAPTURE' || 'AUTHORIZE'
        purchase_units: [
          {
            description: "Buy thing",
            amount: {
              currency_code: "USD",
              value: 100
            }
          }
        ]
      }
    };
  },
  mounted: function() {
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
          createOrder: (data, actions) => {
            return actions.order.create(this.order);
          },
          onApprove: async (data, actions) => {
            await actions.order.capture();
            // ajax request
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.dynamicSelectorContainer);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
