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
            <li class="nav-item" id="navItem">
              <font-awesome-icon id="font" icon="house" style="color: #ffffff;" />
              <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
            </li>
            <li class="nav-item" id="navItem">
              <font-awesome-icon icon="circle-info" style="color: #ffffff;" />
              <router-link class="nav-link active" aria-current="page" to="/about">About</router-link>
            </li>
            <li class="nav-item" id="navItem">
              <font-awesome-icon icon="shop" style="color: #ffffff;" />
              <router-link class="nav-link active" aria-current="page" to="/products">Catalog</router-link>
            </li>
            <li class="nav-item" id="navItem">
              <font-awesome-icon icon="phone" style="color: #ffffff;" />
              <router-link class="nav-link active" aria-current="page" to="/contact">Contact Us</router-link>
            </li>
            <li class="nav-item" id="navItem" v-if="userRole === 'Admin' || userRole === 'Owner'">
              <font-awesome-icon icon="user-secret" style="color: #ffffff;" />
              <router-link class="nav-link active" aria-disabled="true" to="/admin">Admin</router-link>
            </li>
            <!-- <li class="nav-item" id="navItem" v-if="userRole === 'Admin' || userRole === 'Owner' || userRole === 'User'">
              <router-link class="nav-link active" aria-disabled="true" to="/cart">Cart</router-link>
            </li> -->
          </ul>
          <ul class="navbar-nav" v-if="userRole === '' || userRole === undefined || userRole === null">
            <li class="nav-item" id="navItem">
              <router-link class="nav-link active" to="/register">Register</router-link>
            </li>
            <li class="nav-item" id="navItem">
              <router-link class="nav-link active" to="/login">Login</router-link>
            </li>
          </ul>
          <div class="navbar-nav" v-else-if="userRole === 'Admin' || userRole === 'Owner' || userRole === 'User'">
            <div class="cart" v-if="cart.length > 0">
              <font-awesome-icon icon="cart-shopping" style="color: #ffffff;" />
              <router-link to="/cart">Cart</router-link>
            </div>
            <button id="log" @click="logout">Log out</button>
            <div class="point">
              <router-link to="/profile">
                <img id="prof" to="/profile" :src="userData.userProfile">
              </router-link>
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
    },
    cart() {
      return this.$store.state.cart
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
  cursor:pointer !important;
  object-fit: contain !important;
}

.navbar-nav{
  display:flex;
  justify-content: center;
  align-items: center;
}

#navItem {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left:15px;
}

#log {
  margin-right: 20px;
  background: transparent;
  color: white;
  padding: 3px;
  height:2.7rem;
  cursor: pointer !important;
  border: 1px solid white;
}

#log:hover {
  background: white;
  color: red;
}

.point {
  cursor: pointer !important;
}

.nav-link {
  color: white !important;
  transition: color .3s ease;
  cursor: pointer !important;
}

.nav-link:hover {
  color: purple !important;
}

#nav {
  background: #010005 !important;
  background: linear-gradient(180deg, rgba(2, 2, 4, 1) 0%, rgba(6, 4, 17, 1) 100%) !important;
  height: 9rem;
}

nav {
  background: transparent !important;
}

#prof {
  cursor: pointer !important;
  clip-path: circle();
  width: 3rem;
  height: 100%;
}

#navbarNav {
  justify-content: space-between;
}</style>