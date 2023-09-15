<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" class="btn" @click="openEditModal(product.prodID)" data-bs-toggle="modal"
            :data-bs-target="'#texampleModal' + product.prodID">
            Edit
        </button>

        <!-- Modal -->
        <div class="modal fade" :id="'texampleModal' + product.prodID" tabindex="-1"
            :aria-labelledby="'texampleModalLabel' + product.prodID" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title" id="exampleModalLabel">
                            Edit Product
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label>Product name:</label>
                        <input placeholder="name" type="text"
                            oninvalid="this.setCustomValidity('Please give this product a name')"
                            oninput="this.setCustomValidity('')" v-model="editingProduct.prodName" />
                        <label>Product Stock:</label>
                        <input placeholder="stock" oninvalid="this.setCustomValidity('Please give this product's stock')"
                            oninput="this.setCustomValidity('')" type="number" v-model="editingProduct.stock" />
                        <label>Product description:</label>
                        <input placeholder="description"
                            oninvalid="this.setCustomValidity('Please give this product a description')"
                            oninput="this.setCustomValidity('')" type="text" v-model="editingProduct.prodDesc" />
                        <label>Product price:</label>
                        <input placeholder="price" type="number"
                            oninvalid="this.setCustomValidity('Please give this product a price')"
                            oninput="this.setCustomValidity('')" v-model="editingProduct.price" />
                        <label>Product category:</label>
                        <input placeholder="category" type="text"
                            oninvalid="this.setCustomValidity('Please give this product a category')"
                            oninput="this.setCustomValidity('')" v-model="editingProduct.category" />
                        <label>Product image (links only):</label>
                        <input placeholder="image" type="text"
                            oninvalid="this.setCustomValidity('Please provide an image for this picture')"
                            oninput="this.setCustomValidity('')" v-model="editingProduct.prodURL" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="button" class="btn" @click="updateProduct(product.prodID)">
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
    props: ["product"],
    data() {
        return {
            editingProduct: {
                ...this.product,
            },
            editingProductID: null,
        };
    },
    computed: {
        currentProduct() {
            return this.$store.state.product;
        },
    },
    methods: {
        openEditModal(prodID) {
            console.log("Edit button clicked: ", prodID)
            this.editingProductID = prodID;
            this.editingProduct = {
                ...this.$store.state.products.find(
                    (product) => product.prodID === prodID
                ),
            };
        },
        updateProduct() {
            const prodID = this.editingProductID
            this.$store
                .dispatch("updateProduct", {
                    prodID: prodID,
                    ...this.editingProduct,
                })
                .then(() => {
                    console.log("Product updated!");
                })
                .catch((err) => {
                    console.error("Error updating: ", err);
                });
        },
    },
};
</script>
  
<style scoped>
.btn {
    border: 2px solid #f7f4f1;
    background: linear-gradient(180deg, rgba(2, 2, 4, 1) 0%, rgba(6, 4, 17, 1) 100%);
    color: rgb(255, 255, 255);
    cursor: pointer !important;
}

.btn:hover {
    background: white;
    color: rgb(2, 2, 5) !important;
}

.modal-content {
    color: black !important;
}
.dropdown-toggle {
    border: 1px solid black !important;
    color: black !important;
  }
  
input {
    width: 100%;
    height: 3rem;
    margin-bottom: 2rem;
}
</style>