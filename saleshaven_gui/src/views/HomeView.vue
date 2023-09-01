
<template>
  <div v-if="userRole === 'User' || userRole === 'Admin' || userRole === 'Owner'">
    <div class="home">
      <div class="rel">
        <div>
          <h1 class="head">Welcome to SalesHaven</h1>
          <p>Discover. Shop. Save. Elevate Your Shopping Experience with SalesHaven.</p>
        </div>
      </div>
    </div>
    <div class="featuredProd">
      <h2>Featured Products</h2>
      <div class="each" v-for="product in getRandom" :key="product.prodID">
        {{ product.prodID }}
        <h3>{{ product.prodName }}</h3>
      <p>{{ product.prodDesc }}</p>
      <img :src="product.prodUrl" alt="">
      </div>
    </div>
  </div>
  <div v-else>
    <div class="home">
      <div class="rel">
        <div>
          <h1 class="head">Welcome to SalesHaven</h1>
          <p>Discover. Shop. Save. Elevate Your Shopping Experience with SalesHaven.</p>
        </div>
      </div>
      <div class="login">
        <h4>You need to Log in to get the full experience</h4>
        <button @click="pushToLog">Click here to Log in</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  height: 100vh;
  background-image: url(https://i.postimg.cc/QMz5bmFL/hd-3816045-1920.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex !important;
  flex-direction: column;
  justify-content: center !important;
  align-items: center !important;
}

h4 {
  color: white;
}

.rel {
  position: relative;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.login {
  display: flex;
  flex-direction: column;

}

p {
  color: white;
  text-shadow: 1px 1px 0px rgb(191, 88, 251);

}

.head {
  width: 100%;
  color: white;
  font-size: 3rem;
  text-shadow: 0 1px 0 #ccc,
    0 2px 0 #c9c9c9,
    0 3px 0 #bbb,
    0 4px 0 #b9b9b9,
    0 5px 0 #aaa,
    0 6px 1px rgba(0, 0, 0, .1),
    0 0 5px rgba(0, 0, 0, .1),
    0 1px 3px rgba(0, 0, 0, .3),
    0 3px 5px rgba(0, 0, 0, .2),
    0 5px 10px rgba(0, 0, 0, .25),
    0 10px 10px rgba(0, 0, 0, .2),
    0 20px 20px rgba(0, 0, 0, .15);

}
</style>

<script>
export default {
  mounted() {
    this.$store.dispatch("cookieCheck")
    this.$store.dispatch("fetchProducts").then(()=>{
      console.log(this.$store.state.products)
    })
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    userData() {
      const data = this.$store.state.userData
      console.log("data: ", data)
      return data
    },
    userRole() {
      const role = this.$store.state.userRole
      console.log("userRole: ", role)
      return role
    },
    getRandom() {
      // return this.$store.state.products
      const products = this.$store.state.products

        // if (!this.$store.state.products) {
        //   await this.$store.dispatch("fetchProducts")
        // }
        // const products = await this.$store.state.products
        console.log(products)
        if (products) {
          console.log("Reached")
          const random = []
          while (random.length < 3 && products.length > 0) {
            const i = Math.floor(Math.random() * products.length)
            const prod = products.splice(i, 1)[0]
            random.push(prod)
          }
          return random
        }
        return []
    }
  },
  methods: {
    pushToLog() {
      this.$router.push("/login")
    }
  }
}
</script>