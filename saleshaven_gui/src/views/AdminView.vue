<template>
    <div v-if="userRole === 'User' || userRole === '' || userRole === undefined || userRole === null">
        <div class="container">
            You are not authorized to be here
        </div>
    </div>
    <div v-else-if="userRole === 'Admin'" class="table-responsive table-container">
        <h4>Users</h4>
        <table class="table">
            <thead>
              <tr>
                <th class="10">First Name</th>
                <th class="10">Last Name</th>
                <th class="name">Gender</th>
                <th class="name">Email</th>
                <th class="name">Role</th>
                <th>Profile Pic</th>
              </tr>
            </thead>
            <tbody v-for="user in users" :key="user.userID">
              <tr>
                <td class="name">{{ user.firstName }}</td>
                <td class="name">{{ user.lastName }}</td>
                <td class="name">{{ user.gender }}</td>
                <td class="name">{{ user.email }}</td>
                <td class="name">{{ user.userRole }}</td>
                <td><img id="pic" :src="user.userProfile" :alt="user.firstName"></td>
              </tr>
            </tbody>
          </table>
          <div class="table-responsive">
            <h4>Products</h4>
            <table class="table">
                <thead>
                  <tr>
                    <th class="name">Name</th>
                    <th class="name">Description</th>
                    <th class="name">Category</th>
                    <th class="name">Price</th>
                    <th class="name">Stock</th>
                    <th>Product image</th>
                  </tr>
                </thead>
                <tbody  v-for="product in products" :key="product.prodID">
                  <tr>
                    <td class="name">{{ product.prodName }}</td>
                    <td class="name">{{ product.prodDesc }}</td>
                    <td class="name">{{ product.category }}</td>
                    <td class="name">{{ product.price }}</td>
                    <td class="name">{{ product.stock }}</td>
                    <td><img id="pic" :src="product.prodURL" :alt="product.prodName"></td>
                  </tr>
                </tbody>
              </table>
    </div>
    </div>
    <div v-else-if="userRole === 'Owner'" class="table-responsive table-container">
        <h4>Users</h4>
        <table class="table" v-for="user in users" :key="user.userID">
            <thead>
              <tr>
                <th class="name">First Name</th>
                <th class="name">Last Name</th>
                <th class="name">Gender</th>
                <th class="name">Email</th>
                <th class="name">Role</th>
                <th>Profile Pic</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="name">{{ user.firstName }}</td>
                <td class="name">{{ user.lastName }}</td>
                <td class="name">{{ user.gender }}</td>
                <td class="name">{{ user.email }}</td>
                <td class="name">{{ user.userRole }}</td>
                <td><img id="pic" :src="user.userProfile" :alt="user.firstName"></td>
              </tr>
            </tbody>
          </table>
          <div class="table-responsive">
            <h4>Products</h4>
            <table class="table" v-for="product in products" :key="product.prodID">
                <thead>
                  <tr>
                    <th class="name">Name</th>
                    <th class="name">Description</th>
                    <th class="name">Category</th>
                    <th class="name">Price</th>
                    <th class="name">Stock</th>
                    <th>Product image</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="name">{{ product.prodName }}</td>
                    <td class="name">{{ product.prodDesc }}</td>
                    <td class="name">{{ product.category }}</td>
                    <td class="name">{{ product.price }}</td>
                    <td class="name">{{ product.stock }}</td>
                    <td><img id="pic" :src="product.prodURL" :alt="product.prodName"></td>
                  </tr>
                </tbody>
              </table>
    </div>
    </div>
</template>

<script>
export default {
    computed:{
        userRole(){
            return this.$store.state.userRole
        },
        users(){
            return this.$store.state.users
        },
        products(){
            return this.$store.state.products
        }
    },
    mounted(){
        this.$store.dispatch("fetchUsers")
        this.$store.dispatch("fetchProducts")
    }

}
</script>

<style scoped>
    table{
        width:100%;
        border-collapse: collapse;
        border:2px solid white;
        background: transparent !important;
    }
    th,
    td{
        text-align: center;
        padding:0.5rem;
        border:2px solid white;
    }
    #picc{
        display:flex;
        justify-content: center;
    }
    #pic{
        aspect-ratio: 1/1;
        width:50%;
        height:10rem !important;
        clip-path: circle();
    }
    .table-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
</style>