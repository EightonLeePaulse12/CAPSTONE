<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
              <router-link class="navbar-brand" to="/"><img id="logo" src="https://i.postimg.cc/2SLYPngk/LOGO-removebg.png"></router-link>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
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
                  <li class="nav-item">
                    <router-link class="nav-link active" aria-current="page" to="/admin">Admin</router-link>
                  </li>
                  
                  <li class="nav-item" v-if="userRole === 'admin' || userRole === 'Owner'">
                    <router-link class="nav-link active" aria-disabled="true" to="/admin">Admin</router-link>
                  </li>
                </ul>
                <ul class="navbar-nav" v-if="!user">
                    <li class="nav-item">
                      <router-link class="nav-link active" to="/register">Register</router-link>
                    </li>
                    <li class="nav-item">
                      <router-link class="nav-link active" to="/login">Login</router-link>
                    </li>
                  </ul>
                  <div class="navbar-nav" v-else-if="userRole === 'Admin' || userRole === 'Owner'">
                    <img src="https://i.postimg.cc/MGydyrwX/icons8-user-96-removebg-preview.png" alt="Your Profile">
                  </div>
              </div>
            </div>
          </nav>
          
    </div>
</template>

<script>
    export default {
        computed:{
          userData(){
            return this.$store.state.userData
          },
          userRole(){
            return this.$store.state.userRole
          }
        }
    }
</script>

<style scoped>
    #logo{
        width:100%;
        height:7.6rem;
        object-fit: contain !important;
    }
    nav{
        background: transparent !important;
    }
    #navbarNav{
      justify-content: space-between;
    }
</style>