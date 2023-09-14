<template>
    <div v-if="role === null || role === '' || role === undefined">
        <div class="container-fluid">
            <AddProduct />
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
                            <td><img loading="lazy" :src="product.prodURL" class="product-image" :alt="product.prodName">
                            </td>
                            <td class="actions">
                                <UpdateSingleProd :product="product" />
                                <button @click="deleteProduct(product.prodID)" id="ban">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div v-else>
        You are not authorized to be here
    </div>
</template>

<script>
import AddProduct from '@/components/AddProduct.vue'
import UpdateSingleProd from '@/components/UpdateSingleProd.vue'
import Swal from 'sweetalert2'
export default {
    components: {
        AddProduct,
        UpdateSingleProd
    },
    mounted() {
        this.$store.dispatch("fetchOwnProd")
    },
    computed: {
        products() {
            return this.$store.state.myprod
        },
        role() {
            return this.$store.state.userRole
        }
    },
    methods: {
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

#proddd {
    width: 10rem !important;
}

.product-image {
    width: 4rem !important;
    height: 4rem !important;
    margin-top: 0.7rem;
    border-radius: 50% !important;
    object-fit: cover !important;
}

.tr {
    height: 100%;
}

#else {
    display: flex;
    height: 70vh;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.spinner-border {
    height: 9rem;
    width: 9rem;
}

#ban {
    width: 3.5rem;
    text-align: center;
    margin-top: 7px;
    padding: 0.6rem;
    padding-right: 1rem;
    font-weight: bolder;
    border-radius: 5px;
    border: 1px solid black;
    background: white;
    cursor: pointer !important;
    color: black;
}

#ban:hover {
    background: rgb(255, 0, 0);
    color: white;
}

.name {
    width: 8rem;
}

th,
td {
    color: white;
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
    height: 4rem;
    border-radius: 5.5rem;
    object-fit: cover;
}

td {
    font-size: .7rem !important;
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