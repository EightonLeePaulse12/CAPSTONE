<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" class="btn" @click="openEditModal(user.userID)" data-bs-toggle="modal"
            :data-bs-target="'#mexampleModal' + user.userID">
            Edit
        </button>

        <!-- Modal -->
        <div class="modal fade" :id="'mexampleModal' + user.userID" tabindex="-1"
            :aria-labelledby="'mexampleModalLabel' + user.userID" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            Edit User
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label>User name:</label>
                        <input placeholder="name" type="text" v-model="editingUser.firstName" />
                        <label>User Stock:</label>
                        <input placeholder="quantity" type="number" v-model="editingUser.lastName" />
                        <label>User description:</label>
                        <input placeholder="description" type="text" v-model="editingUser.gender" />
                        <label>User price:</label>
                        <input placeholder="price" type="number" v-model="editingUser.email" />
                        <label>User category:</label>
                        <input placeholder="category" type="text" v-model="editingUser.userRole" />
                        <label>User image:</label>
                        <input placeholder="image" type="text" v-model="editingUser.userProfile" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="button" class="btn" @click="updateUser(user.userID)">
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
    props: ["user"],
    data() {
        return {
            editingUser: {
                ...this.user,
            },
            editingUserID: null,
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.users;
        },
    },
    methods: {
        openEditModal(userID) {
            console.log("Edit button clicked: ", userID)
            this.editingUserID = userID;
            this.editingUser = {
                ...this.$store.state.users.find(
                    (user) => user.userID === userID
                ),
            };
        },
        updateUser() {
            const userID = this.editingUserID
            this.$store
                .dispatch("updateDetails", {
                    userID: userID,
                    ...this.editingUser,
                })
            console.log("Successfully updated")
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