<template>
  <div>
    <Navbar />
    <router-view style="padding-top: 144px;" />
    <Footer />
  </div>
</template>

<style>
nav a.router-link-exact-active,
.li.active {
  text-shadow: 3px 1px 5px rgba(18, 18, 21, 0.92) !important;
}
</style>

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