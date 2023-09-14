<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" class="btn" @click="openEditModal(user.userID)" data-bs-toggle="modal"
            :data-bs-target="'#lexampleModal' + user.userID">
            Change Password
        </button>

        <!-- Modal -->
        <div class="modal fade" :id="'lexampleModal' + user.userID" tabindex="-1"
            :aria-labelledby="'lexampleModalLabel' + user.userID" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title" id="lexampleModalLabel3">
                            Update your password
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label>New Password:</label>
                        <input type="password" placeholder="New Password" v-model="userPass" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="button" class="btn" @click="updateUser()">
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
            userPass: "",
        };
    },
    computed: {
        user() {
            return this.$store.state.userData
        }
    },
    methods: {
        openEditModal(id) {
            this.editingUserID = id;
        },
        async updateUser() {
            try {
                const payload = {
                    userPass: this.userPass
                }
                await this.$store.dispatch("changePass", payload)
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
    margin-top: 10px;
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