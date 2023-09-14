<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" class="btn" @click="openEditModal(thisUser.userID)" data-bs-toggle="modal"
            :data-bs-target="'#texampleModal' + thisUser.userID">
            edit
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
                        <input type="text" placeholder="gender"
                            oninvalid="this.setCustomValidity('Please provide your gender')"
                            oninput="this.setCustomValidity('')" v-model="editingUser.gender" />
                        <label>eEmail address:</label>
                        <input type="text" placeholder="email address"
                            oninvalid="this.setCustomValidity('Please enter your email address')"
                            oninput="this.setCustomValidity('')" v-model="editingUser.email" />
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

input {
    width: 100%;
    height: 3rem;
    margin-bottom: 2rem;
}
</style>