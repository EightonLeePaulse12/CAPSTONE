<template>
    <div class="main">
      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn add"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal1"
      >
        add product
      </button>
  
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal1"
        tabindex="-1"
        aria-labelledby="exampleModal1Label"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">New Product</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <label for="productname">Product Name:</label>
              <input
                required
                id="productname"
                placeholder="product Name"
                type="text"
                v-model="model.product.prodName"
              />
              <label for="description">Description:</label>
              <input
                required
                id="description"
                placeholder="product desc"
                type="text"
                v-model="model.product.prodDesc"
              />
              <label for="price">Price:</label>
              <input
                required
                id="price"
                placeholder="price"
                type="number"
                v-model="model.product.price"
              />
              <label for="category">Category</label>
              <input
                required
                id="category"
                placeholder="category"
                type="text"
                v-model="model.product.category"
              />
              <label for="category">Stock</label>
              <input
                required
                id="category"
                placeholder="Stock"
                type="text"
                v-model="model.product.stock"
              />
              <label for="productUrl">Product Image:</label>
              <input
                required
                id="productUrl"
                placeholder="product image"
                type="text"
                v-model="model.product.prodURL"
              />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn" @click="createProduct">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        model: {
          product: {
            prodName: "",
            prodDesc: "",
            price: "",
            category: "",
            prodURL: "",
            stock: "",
          },
        },
      };
    },
    methods: {
      createProduct() {
        this.$store.dispatch("createProduct", this.model.product);
      },
    },
  };
  </script>
  
  <style scoped>
  .btn {
    border: 1px solid #f7f4f1;
    background:transparent;
    color: rgb(255, 255, 255);
    cursor:pointer !important;
}
.btn:hover{
  background:white;
  color:rgb(2,2,5) !important;
}
.main{
  display:flex;
  justify-content: center;
}
.modal-content{
    color: black !important;
}
.main{
  margin-bottom:10px;
}
input {
    width: 100%;
    height: 3rem;
    margin-bottom: 2rem;
}
  </style>