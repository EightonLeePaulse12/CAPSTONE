<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
              <a class="navbar-brand" href="#"><img id="logo" src="https://i.postimg.cc/2SLYPngk/LOGO-removebg.png"></a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link active" aria-current="page" to="/register">About</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link active" aria-current="page" to="/products">Catalog</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link active" aria-current="page" to="/login">Contact</router-link>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Admin</a>
                  </li>
                  <div class="log">

                  </div>
                  <slot>

                  </slot>
                </ul>
              </div>
            </div>
          </nav>
    </div>
    <!-- <div class="else" v-else>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
              <a class="navbar-brand" href="#"><img id="logo" src="https://i.postimg.cc/2SLYPngk/LOGO-removebg.png"></a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">About</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Catalog</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Contact</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                  </li>
                  <div class="log">

                  </div>
                  <slot>

                  </slot>
                </ul>
              </div>
            </div>
          </nav> -->
    <!-- </div> -->
</template>

<script>
    export default {
        
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
        justify-content: center;
    }
</style>