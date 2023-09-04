<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col">
                    
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col">
                    <img id="profile" :src="userData.userProfile" :alt="firstName">
                </div>
                <div class="col">
                    <div class="data">
                        {{ userData.firstName }} <br>
                        {{ userData.lastName }} <br>
                        {{ userData.gender }} <br>
                        {{ userData.email }} <br>
                        {{ userData.userRole }} <br>
                    </div>
                    <div class="update-details">
                        <EditProfile :userData="userData"/>
                    </div>
                    <div class="logout">
                        <button @click="logout">Log out</button>
                    </div>
                    <div class="deactivate">
                        <button @click="deactivateAcc">Deactivate Account</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EditProfile from '@/components/UpdateUser.vue'
export default {
    components:{
        EditProfile
    },
    computed: {
        userData() {
            return this.$store.state.userData
        }
    },
    methods: {
        logout() {
            this.$store.dispatch("logout")
            this.$router.push("/login")
        }
    },
    deactivateAcc(){

    }
}
</script>

<style scoped>
#profile {
    height: 10rem;
    width: 8rem;
    border-radius: 50%;
    object-fit: cover;
}

.data {
    display: flex;
    flex-direction: row;
}
</style>