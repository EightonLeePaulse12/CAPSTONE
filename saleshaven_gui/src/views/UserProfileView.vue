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
                    <img id="profile" :src="userData ? userData.userProfile : 'false'" :alt="firstName">
                </div>
                <div class="col">
                    <div class="data">
                        <p>Points: {{ $store.state.points }} </p>
                        {{ userData ? userData : 'false' }}
                        {{ userData ? userData.firstName : 'false' }} <br>
                        {{ userData ? userData.lastName : 'false' }} <br>
                        {{ userData ? userData.gender : 'false' }} <br>
                        {{ userData ? userData.email : 'false' }} <br>
                        {{ userData ? userData.userRole : 'false' }} <br>
                    </div>
                    <div class="update-details">
                        <EditProfile :userData="userData" />
                    </div>
                    <div class="logout">
                        <button @click="logout">Log out</button>
                    </div>
                    <div class="deactivate">
                        <button @click="deactivateAcc">Deactivate Account</button>
                    </div>
                </div>
                <div class="col">
                    <div class="data">
                        <div>
                            <div>
                              <h2>Transaction Counts</h2>
                              <p>Buy Transactions: {{ buyTransactionCount }}</p>
                              <p>Sell Transactions: {{ sellTransactionCount }}</p>
                            </div>
                          </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EditProfile from '@/components/UpdateUser.vue'
export default {
    components: {
        EditProfile
    },
    computed: {
        userData() {
            return this.$store.state.userData
        },
        user() {
            return this.$store.state.user
        },
        buyTransactionCount(){
            return this.$store.state.buyTransactionCount
        },
        sellTransactionCount(){
            return this.$store.state.sellTransactionCount
        }
    },
    methods: {
        logout() {
            this.$store.dispatch("logout")
            this.$router.push("/login")
        }
    },
    created(){
        const userID = this.$store.state.userData.userID
        this.$store.dispatch('buyTransactions', userID)
        this.$store.dispatch('sellTransactions', userID)
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