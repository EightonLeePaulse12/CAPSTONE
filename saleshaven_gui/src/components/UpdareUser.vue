<template>
    <div>
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
                        <h1 class="modal-title" id="exampleModalLabel">
                            Edit User
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label>User name:</label>
                        <input placeholder="name" type="text"
                            oninvalid="this.setCustomValidity('Please provide a first name')"
                            oninput="this.setCustomValidity('')" v-model="editingUser.firstName" />
                        <label>User last name:</label>
                        <input placeholder="quantity" oninvalid="this.setCustomValidity('Please provide a last name')"
                            oninput="this.setCustomValidity('')" type="text" v-model="editingUser.lastName" />
                        <label>User gender:</label>
                        <div class="dropdown">
                            <select class="btn btn-secondary dropdown-toggle" v-model="editingUser.gender" required
                                oninvalid="this.setCustomValidity('Please provide a gender')"
                                oninput="this.setCustomValidity('')">
                                <option>Male</option>
                                <option>Female</option>

                            </select>

                        </div>
                        <label>User email:</label>
                        <input placeholder="email" type="text"
                            oninvalid="this.setCustomValidity('Please provide an email address')"
                            oninput="this.setCustomValidity('')" v-model="editingUser.email" />
                        <div v-if="userRole === 'Owner'">
                            <label>User role:</label>
                            <input placeholder="Role" type="text"
                                oninvalid="this.setCustomValidity('Please provide this user\'s role')"
                                oninput="this.setCustomValidity('')" v-model="editingUser.userRole" />
                        </div>
                        <label>User image (links only):</label>
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
        userRole() {
            return this.$store.state.userRole
        }
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
            const payload = {
                userID: userID,
                firstName: this.editingUser.firstName,
                lastName: this.editingUser.lastName,
                gender: this.editingUser.gender,
                email: this.editingUser.email,
                userRole: this.editingUser.userRole,
                userProfile: this.editingUser.userProfile
            }
            console.log(payload)
            this.$store.dispatch('updateUsers', payload)
            console.log("Successfully updated")
        },
    },
};
</script>
  
<style scoped>
.dropdown-toggle {
    border: 1px solid black !important;
    color: black !important;
}

.btn {
    border: 2px solid #f7f4f1;
    background: linear-gradient(180deg, rgba(2, 2, 4, 1) 0%, rgba(6, 4, 17, 1) 100%);
    color: rgb(255, 255, 255);
    cursor: pointer !important;
    margin-bottom: 10px !important;
}

.btn:hover {
    background: white;
    color: rgb(2, 2, 5) !important;
}

select {
    background: white !important;
}


.modal-content {
    color: black !important;
}

input {
    width: 100%;
    height: 3rem;
    margin-bottom: 2rem;
}
</style>