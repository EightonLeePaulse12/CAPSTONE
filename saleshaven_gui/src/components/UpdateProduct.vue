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
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            Edit Product
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label>Product name:</label>
                        <input placeholder="name" type="text" v-model="editingProduct.prodName" />
                        <label>Product Stock:</label>
                        <input placeholder="quantity" type="number" v-model="editingProduct.stock" />
                        <label>Product description:</label>
                        <input placeholder="description" type="text" v-model="editingProduct.prodDesc" />
                        <label>Product price:</label>
                        <input placeholder="price" type="number" v-model="editingProduct.price" />
                        <label>Product category:</label>
                        <input placeholder="category" type="text" v-model="editingProduct.category" />
                        <label>Product image:</label>
                        <input placeholder="image" type="text" v-model="editingProduct.prodURL" />
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
    background-color: #f7f4f1;
    margin-bottom: 1rem;
    color: black;
    box-shadow: 4px 4px black;
}

input {
    width: 100%;
    height: 3rem;
    margin-bottom: 2rem;
}
</style>