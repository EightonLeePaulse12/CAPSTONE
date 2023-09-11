<template>
  <div
    v-if="userRole === 'User' || userRole === 'Admin' || userRole === 'Owner'"
  >
    <div class="home">
      <div class="rel">
        <div>
          <h1 class="head">Welcome to SalesHaven</h1>
          <p>
            Discover. Shop. Save. Elevate Your Shopping Experience with
            SalesHaven.
          </p>
        </div>
      </div>
    </div>
    <div v-if="getRandom">
      <h2>Featured Products</h2>
      <div class="featuredProd">
        <div
          class="each"
          v-for="product in getRandom"
          :key="product.prodID"
          @mouseover="highlightProduct(product.prodID)"
          @mouseleave="resetHighlight()"
        >
          <h3>{{ product.prodName }}</h3>
          <p>{{ product.prodDesc }}</p>
          <img
            id="feat"
            :src="product.prodURL"
            :class="{ highlighted: highlightedProduct === product.prodID }"
            alt=""
          />
        </div>
      </div>
    </div>
    <div v-else id="else">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="home">
      <div class="rel">
        <div>
          <h1 class="head">Welcome to SalesHaven</h1>
          <p>
            Discover. Shop. Save. Elevate Your Shopping Experience with
            SalesHaven.
          </p>
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
  position: relative;
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

#else{
  display:flex;
  height:70vh;
  width:100%;
  justify-content: center;
  align-items: center;
}
.spinner-border{
  height:9rem;
  width:9rem;
}

.home::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
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

.highlighted {
  filter: blur(0);
  transform: scale(1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}


#feat {
  height: 4rem;
  aspect-ratio: 1/1;
}

.login {
  display: flex;
  flex-direction: column;
}

.login button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}
.login button:hover {
  background-color: #45a049;
}

.featuredProd {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

p {
  color: white;
  text-shadow: 1px 1px 0px rgb(191, 88, 251);
}

.each {
  flex-direction: column;
  text-align: center;
  margin: 1rem;
  transition: transform 0.3s ease;
}
.each:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.head {
  width: 100%;
  color: white;
  font-size: 3rem;
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
    0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
    0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
    0 20px 20px rgba(0, 0, 0, 0.15);
}
</style>

<script>
export default {
  data() {
    return {
      highlightedProduct: null,
    };
  },
  mounted() {
    this.$store.dispatch("cookieCheck");
    this.$store.dispatch("fetchProducts").then(() => {
      console.log(this.$store.state.products);
    });
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    userData() {
      const data = this.$store.state.userData;
      console.log("data: ", data);
      return data;
    },
    userRole() {
      const role = this.$store.state.userRole;
      console.log("userRole: ", role);
      return role;
    },
    getRandom() {
      const products = this.$store.state.products;
      if (products) {
        console.log("Reached");
        const random = [];
        while (random.length < 3 && products.length > 0) {
          const i = Math.floor(Math.random() * products.length);
          const prod = products.splice(i, 1)[0];
          random.push(prod);
        }
        return random;
      }
      return [];
    },
  },
  methods: {
    pushToLog() {
      this.$router.push("/login");
    },
    highlightProduct(prodID) {
      this.highlightedProduct = prodID;
    },
    resetHighlight() {
      this.highlightedProduct = null;
    },
  },
};
</script>
