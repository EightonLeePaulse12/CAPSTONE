<template>
  <div v-if="userRole === 'User' || userRole === '' || userRole === undefined || userRole === null">
    <div class="container">
      You are not authorized to be here
    </div>
  </div>
  <div v-else-if="userRole === 'Admin'" class="table-responsive table-container">
    <h4>Users</h4>
    <table class="table table-bordered border-#421983 text-center">
      <thead>
        <tr>
          <th class="10">First Name</th>
          <th class="10">Last Name</th>
          <th class="name">Gender</th>
          <th class="name">Role</th>
          <th>Profile Pic</th>
        </tr>
      </thead>
      <tbody v-for="user in users" :key="user.userID">
        <tr>
          <td class="name">{{ user.firstName }}</td>
          <td class="name">{{ user.lastName }}</td>
          <td class="name">{{ user.gender }}</td>
          <td class="name">{{ user.userRole }}</td>
          <td><img id="pic" :src="user.userProfile" :alt="user.firstName"></td>
        </tr>
      </tbody>
    </table>
    <div class="table-responsive">
      <h4>Products</h4>
      <table class="table table-bordered border-#421983 text-center">
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
        <tbody v-for="product in products" :key="product.prodID">
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
      <table class="table" v-for="product in products" :key="product.prodID">
        <thead>
          <tr>
            <th class="name">Name</th>
            <th class="name">Description</th>
            <th class="name">Category</th>
            <th class="name">Price</th>
            <th class="name">Stock</th>
            <th>Product image</th>
            <th>Update</th>
            <th>Delete</th>
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
            <td>
              <updateProduct :product="product" />
              <button @click="deleteProduct(product.prodID)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import updateProduct from '@/components/UpdateProduct.vue'
export default {
  components: {
    updateProduct
  },
  computed: {
    userRole() {
      return this.$store.state.userRole
    },
    users() {
      return this.$store.state.users
    },
    products() {
      return this.$store.state.products
    },
    user() {
      return this.$store.state.user
    }
  },
  mounted() {
    this.$store.dispatch("fetchUsers")
    this.$store.dispatch("fetchProducts")
  },
  methods: {
    banUser(id) {
      if (confirm("Do you want to ban this user?")) {
        this.$store.dispatch("banUser", id)
        setTimeout(() => {
          location.reload()
        }, 500)
      }
    },
    deleteProduct(prodID) {
      if (confirm("Are you sure you want to delete this product?")) {
        this.$store.dispatch("deleteProduct", prodID)
        setTimeout(() => {
          location.reload()
        }, 500)
      }
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
  width: 10rem;
  border-radius: 5rem;
}

.table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}</style>