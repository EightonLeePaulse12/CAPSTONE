<template>
    <div v-if="thisUser">
        <!-- Button trigger modal -->
        <button type="button" class="btn" @click="openEditModal(thisUser.userID)" data-bs-toggle="modal"
            :data-bs-target="'#texampleModal' + thisUser.userID">
            Edit
        </button>

        <!-- Modal -->
        <div class="modal fade" :id="'texampleModal' + thisUser.userID" tabindex="-1"
            :aria-labelledby="'texampleModalLabel' + thisUser.userID" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title" id="texampleModalLabel3">
                            Update your details
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label>First name:</label>
                        <input type="text" placeholder="first name"
                            oninvalid="this.setCustomValidity('Please provide your first name')"
                            oninput="this.setCustomValidity('')" v-model="editingUser.firstName" />
                        <label>Last name:</label>
                        <input type="text" placeholder="last name"
                            oninvalid="this.setCustomValidity('Please provide your last name')"
                            oninput="this.setCustomValidity('')" v-model="editingUser.lastName" />
                        <label>Gender:</label>
                        <div class="dropdown">
                            <select class="btn btn-secondary dropdown-toggle" v-model="editingUser.gender" required
                                oninvalid="this.setCustomValidity('Please provide a gender')"
                                oninput="this.setCustomValidity('')">
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                        <label>Email address:</label>
                        <input type="text" placeholder="email address"
                            oninvalid="this.setCustomValidity('Please enter your email address')"
                            oninput="this.setCustomValidity('')" v-model="editingUser.email" />
                        <div v-if="userRole === 'Owner'">
                            <label>Role:</label>
                            <input type="text" placeholder="Role"
                                oninvalid="this.setCustomValidity('Please enter your email address')"
                                oninput="this.setCustomValidity('')" v-model="editingUser.email" />
                        </div>
                        <label>User profile (links only):</label>
                        <input type="text" placeholder="profile image" v-model="editingUser.userProfile" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="button" class="btn" @click="updateUser(userData.userID)">
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="else" v-else>
        Loading
    </div>
</template>
  
<script>
export default {
    props: ["userData"],
    data() {
        return {
            editingUser: {
                ...this.userData,
            },
            editingUserID: null,
        };
    },
    computed: {
        thisUser() {
            return this.$store.state.userData;
        },
        userRole() {
            return this.$store.state.userRole
        }
    },
    methods: {
        openEditModal(id) {
            this.editingUserID = id;
        },
        async updateUser(id) {
            try {
                const payload = {
                    userID: id,
                    firstName: this.editingUser.firstName,
                    lastName: this.editingUser.lastName,
                    gender: this.editingUser.gender,
                    email: this.editingUser.email,
                    userRole: this.editingUser.userRole,
                    userProfile: this.editingUser.userProfile
                }
                await this.$store.dispatch("updateDetails", payload)
            } catch (e) {
                console.log(e)
            }
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