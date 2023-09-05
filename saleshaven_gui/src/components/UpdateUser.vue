<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" class="btn" @click="openEditModal(userData.userID)" data-bs-toggle="modal"
            :data-bs-target="'#texampleModal' + userData.userID">
            edit
        </button>

        <!-- Modal -->
        <div class="modal fade" :id="'texampleModal' + userData.userID" tabindex="-1"
            :aria-labelledby="'texampleModalLabel' + userData.userID" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="texampleModalLabel3">
                            Modal title
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label>first name:</label>
                        <input type="text" placeholder="first name" v-model="editingUser.firstName" />
                        <label>last name:</label>
                        <input type="text" placeholder="last name" v-model="editingUser.lastName" />
                        <label>gender:</label>
                        <input type="text" placeholder="gender" v-model="editingUser.gender" />
                        <label>email address:</label>
                        <input type="text" placeholder="email address" v-model="editingUser.email" />
                        <label>user profile:</label>
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
            model: {
                user: {
                    firstName: "",
                    lastName: "",
                    gender: "",
                    email: "",
                    userProfile: "",
                },
            },
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
                await this.$store.dispatch("updateDetails", {
                        userID: id,
                        data: { ...this.editingUser },
                    })
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