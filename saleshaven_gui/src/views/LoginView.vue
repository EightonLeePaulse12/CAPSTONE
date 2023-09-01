<template>
    <div>
        <form @submit.prevent="userLogin">
            <input type="email" name="email" v-model="email" placeholder="Email">
            <input type="password" name="password" v-model="password" placeholder="Password">
            <button type="submit">Log in</button>
        </form>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            email: "",
            password: ""
        }
    },
    mounted(){
        this.$store.dispatch("cookieCheck")
    },
    methods: {
        async userLogin() {
            console.log("Reached")
            try {
                const payload = {
                    email: this.email,
                    userPass: this.password
                }
                const resp = await this.$store.dispatch("login", payload)
                if(resp.success){
                    await Swal.fire({
                        icon: "success",
                        title: "Logged in Successfully",
                        text: "You are now logged in!"
                    })
                    this.$router.push("/")
                } else{
                    await Swal.fire({
                        icon: "error",
                        title:"Login failed",
                        text: resp.error || "Unexpected error"
                    })
                }
            } catch (e) {
                console.error("Error while logging in: ", e)
            }
        }
    }
}
</script>

<style scoped>
    button:active{
        background-color: blue;
    }
</style>