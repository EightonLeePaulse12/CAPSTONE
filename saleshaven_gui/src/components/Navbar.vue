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
            <li class="nav-item" v-if="userRole === 'Admin' || userRole === 'Owner'">
              <router-link class="nav-link active" aria-disabled="true" to="/admin">Admin</router-link>
            </li>
            <li class="nav-item" v-if="userRole === 'Admin' || userRole === 'Owner' || userRole === 'User'">
              <router-link class="nav-link active" aria-disabled="true" to="/cart"><font-awesome-icon
                  :icon="faShoppingCart" /></router-link>
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
            <div class="point"><router-link to="/profile"><img id="prof" to="/profile"
                  :src="userData.userProfile"></router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
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
  components: {
    FontAwesomeIcon
  },
  methods: {
    logout() {
      this.$store.dispatch("logout")
      this.$router.push("/login")
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

.point {
  cursor: pointer;
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

#prof {
  cursor: pointer;
  clip-path: circle();
  width: 2rem;
  height: 100%;
}

#navbarNav {
  justify-content: space-between;
}
</style>