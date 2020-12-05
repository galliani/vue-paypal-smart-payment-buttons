<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view
      @paypal-order-created="processing"
      @paypal-order-approved="finishing"
      @paypal-order-failed="failing"    
    />
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    processing(paypalOrderId) {
      console.log('processing!!!');
    },

    finishing: async(order) => {
      alert('success!!');
    },      

    failing(error) {
      console.log(error);
      alert(error);
    }    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
