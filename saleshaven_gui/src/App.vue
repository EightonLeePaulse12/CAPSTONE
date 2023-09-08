<template>
  <div>
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<style></style>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
export default {
  components: {
    Navbar,
    Footer
  },
  computed:{
    products(){
      return this.$store.state.products
    },
    users(){
      return this.$store.state.users
    }
  },
  created() {
    const userData = localStorage.getItem("userData")
    if (userData) {
      this.$store.commit("setUserData", JSON.parse(userData))
    }
  },
  beforeMount(){
    this.$store.dispatch("fetchProducts")
    this.$store.dispatch("fetchUsers")
  }
}
</script>