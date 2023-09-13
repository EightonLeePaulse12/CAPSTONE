<template>
  <div v-if="users && products">
    <div v-if="userRole === 'User' || userRole === '' || userRole === undefined || userRole === null">
      <div class="container">
        You are not authorized to be here
      </div>
    </div>
    <div v-else-if="userRole === 'Admin'" class="table-responsive table-container">
      <h4>Users</h4>
      <AddUser/>
      <div class="table-responsive">
        <table class="table" >
          <thead>
            <tr>
              <th class="name">ID</th>
              <th class="name">First Name</th>
              <th class="name">Last Name</th>
              <th class="name">Gender</th>
              <th class="name">Role</th>
              <th>Profile Pic</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" class="tr" :key="user.userID">
              <td class="name">{{ user.userID }}</td>
              <td class="name">{{ user.firstName }}</td>
              <td class="name">{{ user.lastName }}</td>
              <td class="name">{{ user.gender }}</td>
              <td class="name">{{ user.userRole }}</td>
              <td><img id="pic" class="product-image" :src="user.userProfile" :alt="user.firstName"></td>
  
              <td class="actions">
                <updareUser :user="user" />
                <button id="ban" @click="banUser(user.userID)">Ban</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-responsive">
        <h4>Products</h4>
        <AddProduct/>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th class="name">ID</th>
                <th class="name">Name</th>
                <th class="name">Description</th>
                <th class="name">Category</th>
                <th class="name">Price</th>
                <th class="name">Stock</th>
                <th>Product image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.prodID">
                <td class="name">{{ product.prodID }}</td>
                <td class="name">{{ product.prodName }}</td>
                <td class="name" id="proddd">{{ product.prodDesc }}</td>
                <td class="name">{{ product.category }}</td>
                <td class="name">{{ product.price }}</td>
                <td class="name">{{ product.stock }}</td>
                <td><img :src="product.prodURL" class="product-image" :alt="product.prodName"></td>
                <td class="actions">
                  <updateProduct :product="product" />
                  <button @click="deleteProduct(product.prodID)" id="ban">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
    </div>
    <div v-else-if="userRole === 'Owner'" class="table-responsive table-container">
      <h4>Users</h4>
      <AddUser/>
      <div class="table-responsive">
      <table class="table" >
        <thead>
          <tr>
            <th class="name">ID</th>
            <th class="name">First Name</th>
            <th class="name">Last Name</th>
            <th class="name">Gender</th>
            <th class="name">Role</th>
            <th>Profile Pic</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" class="tr" :key="user.userID">
            <td class="name">{{ user.userID }}</td>
            <td class="name">{{ user.firstName }}</td>
            <td class="name">{{ user.lastName }}</td>
            <td class="name">{{ user.gender }}</td>
            <td class="name">{{ user.userRole }}</td>
            <td><img id="pic" class="product-image" :src="user.userProfile" :alt="user.firstName"></td>

            <td class="actions">
              <updareUser :user="user" />
              <button id="ban" @click="banUser(user.userID)">Ban</button></td>
          </tr>
        </tbody>
      </table>
    </div>
      <div class="table-responsive">
        <h4>Products</h4>
        <AddProduct/>
        <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th class="name">ID</th>
              <th class="name">Name</th>
              <th class="name">Description</th>
              <th class="name">Category</th>
              <th class="name">Price</th>
              <th class="name">Stock</th>
              <th>Product image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.prodID">
              <td class="name">{{ product.prodID }}</td>
              <td class="name">{{ product.prodName }}</td>
              <td class="name" id="proddd">{{ product.prodDesc }}</td>
              <td class="name">{{ product.category }}</td>
              <td class="name">{{ product.price }}</td>
              <td class="name">{{ product.stock }}</td>
              <td><img :src="product.prodURL" class="product-image" :alt="product.prodName"></td>
              <td class="actions">
                <updateProduct :product="product" />
                <button @click="deleteProduct(product.prodID)" id="ban">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  </div>
  <div v-else id="else">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import updateProduct from '@/components/UpdateProduct.vue'
import UpdareUser from '@/components/UpdareUser.vue'
import AddUser from '@/components/AddUser.vue'
import AddProduct from '@/components/AddProduct.vue'
export default {
  components: {
    updateProduct,
    UpdareUser,
    AddUser,
    AddProduct
  },
  computed: {
    userRole() {
      return this.$store.state.userRole
    },
    user() {
      return this.$store.state.user
    },
    products() {
      return this.$store.state.products
    },
    users() {
      return this.$store.state.users
    }
  },
  mounted() {
    this.$store.dispatch("fetchUsers")
    this.$store.dispatch("fetchProducts")
  },
  methods: {
    banUser(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to ban this user.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, ban this user",
        cancelButtonText: "No, cancel",
      }).then((res) => {
        if (res.isConfirmed) {
          this.$store.dispatch("banUser", id).then(() => {
            Swal.fire(
              "Banned",
              "This user has been banned",
              'success',
            )
            setTimeout(() => {
              location.reload()
            }, 500)
          }).catch((err) => {
            Swal.fire(
              "Error!",
              "An error occured while trying to ban this user",
              "error"
            )
          })
        } else if (res.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            "Cancelled",
            "The user ban has been cancelled",
            "info"
          )
        }
      })
    },
    deleteProduct(prodID) {
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to remove this product.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove this product",
        cancelButtonText: "No, cancel",
      }).then((res) => {
        if (res.isConfirmed) {
          this.$store.dispatch("deleteProduct", prodID)
            .then(() => {
              Swal.fire(
                "Removed",
                "This product has been removed",
                'success',
              )
              location.reload()
            }).catch((error) => {
              Swal.fire(
                "Error!",
                "An error occured while trying to remove this product",
                "error"
              )
            })
        } else if (res.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            "Cancelled",
            "The user ban has been cancelled",
            "info"
          )
        }
      })
    }
  }

}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid white;
  background: transparent !important;
}
#proddd{
  width:10rem !important;
}
.product-image{
  width: 4rem !important;
  height: 4rem !important;
  margin-top:0.7rem;
  border-radius: 50% !important;
  object-fit: cover !important;
}
.tr{
  height:100%;
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
#ban{
  width:3.4rem;
  margin-top:7px;
  padding:0.7rem;
  font-weight:bolder;
  border-radius: 5px;
  border:1px solid black;
  background: white;
  color:black;
}
.name {
  width: 8rem;
}

th,
td {
  color:white;
  text-align: center;
  background: transparent !important;
  border: 2px solid white;
}

#picc {
  display: flex;
  justify-content: center;
}

#pic {
  aspect-ratio: 1/1;
  width: 4rem;
  height:4rem;
  border-radius: 5.5rem;
  object-fit: cover;
}
td{
  font-size:.7rem !important;
}
.table-responsive {
  width: 100%;
}

.table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>