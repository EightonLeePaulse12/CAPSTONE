<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" id="nav">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/"><img id="logo"
            src="https://i.postimg.cc/qq6YzNyy/icons8-shopping-bag-100-removebg-preview.png"></router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav" v-if="userRole === 'User' || userRole === 'Admin' || userRole === 'Owner'">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/about">About</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/products">Catalog</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/contact">Contact Us</router-link>
            </li>
            <li class="nav-item" v-if="userRole === 'admin' || userRole === 'Owner'">
              <router-link class="nav-link active" aria-disabled="true" to="/admin">Admin</router-link>
            </li>
            <li class="nav-item" v-if="userRole === 'admin' || userRole === 'Owner' || userRole === 'User'">
              <router-link class="nav-link active" aria-disabled="true" to="/cart"><i class="fas fa fa-light fa-cart-shopping"></i></router-link>
            </li>
          </ul>
          <ul class="navbar-nav" v-if="userRole === '' || userRole === undefined || userRole === null">
            <li class="nav-item">
              <router-link class="nav-link active" to="/register">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" to="/login">Login</router-link>
            </li>
          </ul>
          <div class="navbar-nav" v-else-if="userRole === 'Admin' || userRole === 'Owner' || userRole === 'User'">
            <button @click="logout">Log out</button>
            <img src="https://i.postimg.cc/MGydyrwX/icons8-user-96-removebg-preview.png" alt="Your Profile">
          </div>
        </div>
      </div>
    </nav>

  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user
    },
    userData() {
      return this.$store.state.userData
    },
    userRole() {
      return this.$store.state.userRole
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout")
    }
  }
}
</script>

<style scoped>
#logo {
  width: 100%;
  height: 5.5rem;
  object-fit: contain !important;
}

.nav-link {
  color: white !important;
}

#nav {
  background: #421983 !important;
  height: 9rem;
}

nav {
  background: transparent !important;
}

#navbarNav {
  justify-content: space-between;
}</style>