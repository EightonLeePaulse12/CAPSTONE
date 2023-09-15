<template>
    <div class="container-fluid mt-5">
        <div class="row">
            <div class="col-md-4 text-center">
                <img loading="lazy" id="profile" :src="userData ? userData.userProfile : 'false'"
                    :alt="userData ? userData.firstName : 'User Profile'" class="img-fluid rounded-circle" />
            </div>
            <div class="col-md-8">
                <div class="d-flex justify-content-between">
                    <h2>My Profile</h2>
                    <button @click="logout" class="btn btn-danger">Log out</button>
                </div>
                <hr />
                <div class="data">
                    <h6><strong>First Name:</strong> {{ userData ? userData.firstName : 'N/A' }}</h6>
                    <h6><strong>Last Name:</strong> {{ userData ? userData.lastName : 'N/A' }}</h6>
                    <h6><strong>Email Address:</strong> {{ userData ? userData.email : 'N/A' }}</h6>
                    <h6><strong>Gender:</strong> {{ userData ? userData.gender : 'N/A' }}</h6>
                    <h6><strong>Role:</strong> {{ userData ? userData.userRole : 'N/A' }}</h6>
                    <h6><strong>Points:</strong> {{ points }}</h6>
                </div>
                <div class="mt-4">
                    <EditProfile :userData="userData" />
                    <button class="btn btn-warning" id="special" @click="manage">Create & Manage products</button>
                    <ChangePassword />
                    <button @click="deactivate" class="btn btn-warning">Deactivate Account</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import Swal from 'sweetalert2'
import EditProfile from '@/components/UpdateUser.vue'
import ChangePassword from '@/components/ChangePassword.vue'

export default {
    components: {
        EditProfile,
        ChangePassword
    },
    computed: {
        userData() {
            return this.$store.state.userData
        },
        user() {
            return this.$store.state.user
        },
        points() {
            return this.$store.state.points
        },
    },
    methods: {
        logout() {
            this.$router.push("/login")
            this.$store.dispatch("logout")
        },
        manage() {
            this.$router.push('manage')
        },
        async deactivate() {
            await Swal.fire({
                title: "Are you sure?",
                text: "You are about to deactivate your account.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, deactivate my account",
                cancelButtonText: "No, cancel",
            }).then((res) => {
                if (res.isConfirmed) {
                    this.$store.dispatch("deactivate").then(() => {
                        Swal.fire(
                            "Deactivated",
                            "Your account has been deactivated",
                            'success',
                        )
                        this.$store.dispatch("logout")
                        this.$router.push("/register")
                    })
                }
            })
        }
    },
    created() {
        const userID = this.$store.state.userData.userID
        this.$store.dispatch('buyTransactions', userID)
        this.$store.dispatch('sellTransactions', userID)
    }
}
</script>
  
<style scoped>
#profile {
    max-height: 20rem;
    width: 20rem;
    border-radius: 50%;
    object-fit: cover;
    object-position: center top;
}

.container {
    padding: 5rem;
}

.btn-danger {
    background: transparent !important;
    border: 1px solid white;
    cursor: pointer !important;
}

.btn-danger:hover {
    color: #040309;
    background: red !important;
    border: 1px solid #040309 !important;
}

.data {
    text-align: start;
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
}

#special {
    color: white !important;
}

#special:hover {
    background-color: white !important;
    color: #040309 !important;
}

.btn {
    border: 2px solid #f7f4f1;
    background: linear-gradient(180deg, rgba(2, 2, 4, 1) 0%, rgba(6, 4, 17, 1) 100%);
    color: rgb(255, 255, 255) !important;
    cursor: pointer !important;
}

.col-md-4 {
    display: flex;
    justify-content: center;
    align-items: center;

}

.btn:hover {
    background: white;
    color: rgb(2, 2, 5) !important;
}

.data {
    text-align: start;
    margin-bottom: 20px;
}
#special{
    margin-bottom:0 !important;
}
.btn-warning {
    margin-right: 10px;
    background: transparent !important;
    color: white;
    border: 1px solid white;
    margin-top: 10px;
    margin-bottom:10px;
    cursor: pointer !important;
}

.btn-warning:hover {
    color: #040309;
    background: red !important;
    border: 1px solid #040309 !important;
}
@media (width < 701px){
    .data{
        flex-wrap: wrap !important;
        align-content: center !important;
    }
    strong{
        margin-right:6px;
    }
    #special{
        margin-bottom:0;
    }
    .btn-warning{
        margin-bottom:7px;
    }
}
@media (width < 301px){
    h6{
        font-size:.82rem;
    }
    input{
        margin-top:20px !important;
    }
    .modal-body{
        padding:10px;
    }
}
</style>