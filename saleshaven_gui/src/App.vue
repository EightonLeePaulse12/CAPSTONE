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
  created() {
    const userData = localStorage.getItem("userData")
    if (userData) {
      this.$store.commit("setUserData", JSON.parse(userData))
    }
  }
}
</script>