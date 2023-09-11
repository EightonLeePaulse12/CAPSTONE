<template>
  <div v-if="users && products">
    <div v-if="userRole === 'User' || userRole === '' || userRole === undefined || userRole === null">
      <div class="container">
        You are not authorized to be here
      </div>
    </div>
    <div v-else-if="userRole === 'Admin'" class="table-responsive table-container">
      <h4>Users</h4>
      <table class="table" v-for="user in users" :key="user.userID">
        <thead>
          <tr>
            <th class="name">First Name</th>
            <th class="name">Last Name</th>
            <th class="name">Gender</th>
            <th class="name">Role</th>
            <th>Profile Pic</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="name">{{ user.firstName }}</td>
            <td class="name">{{ user.lastName }}</td>
            <td class="name">{{ user.gender }}</td>
            <td class="name">{{ user.userRole }}</td>
            <td><img id="pic" :src="user.userProfile" :alt="user.firstName"></td>
            <td><button @click="banUser(user.userID)">Ban</button></td>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.prodID">
              <td class="name">{{ product.prodName }}</td>
              <td class="name">{{ product.prodDesc }}</td>
              <td class="name">{{ product.category }}</td>
              <td class="name">{{ product.price }}</td>
              <td class="name">{{ product.stock }}</td>
              <td><img id="pic" :src="product.prodURL" :alt="product.prodName"></td>
              <td>
                <updateProduct :product="product" />
                <button @click="deleteProduct(product.prodID)">Delete</button>
              </td>
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
            <th class="name">Role</th>
            <th>Profile Pic</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="name">{{ user.firstName }}</td>
            <td class="name">{{ user.lastName }}</td>
            <td class="name">{{ user.gender }}</td>
            <td class="name">{{ user.userRole }}</td>
            <td><img id="pic" :src="user.userProfile" :alt="user.firstName"></td>
            <td><button @click="banUser(user.userID)">Ban</button></td>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.prodID">
              <td class="name">{{ product.prodName }}</td>
              <td class="name">{{ product.prodDesc }}</td>
              <td class="name">{{ product.category }}</td>
              <td class="name">{{ product.price }}</td>
              <td class="name">{{ product.stock }}</td>
              <td><img id="pic" :src="product.prodURL" :alt="product.prodName"></td>
              <td>
                <updateProduct :product="product" />
                <button @click="deleteProduct(product.prodID)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
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
export default {
  components: {
    updateProduct
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
  border: 10px solid #6d4e9f;
  background: transparent !important;
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
.name {
  width: 8rem;
}

th,
td {
  text-align: center;
  padding: 0.5rem;
  border: 2px solid #421983;
}

#picc {
  display: flex;
  justify-content: center;
}

#pic {
  aspect-ratio: 1/1;
  width: 11rem;
  border-radius: 5.5rem;
  object-fit: cover;
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