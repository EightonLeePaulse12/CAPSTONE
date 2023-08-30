<template>
    <div>
        <form @submit.prevent="userLogin">
            <input type="email" v-model="email" placeholder="Email">
            <input type="password" v-model="password" placeholder="Password">
            <button type="submit">Log in</button>
        </form>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                email:"",
                password:""
            }
        },
        methods:{
            async userLogin(){
                try{
                    await this.$store.dispatch("login", {
                        email: this.email,
                        password: this.password
                    })
                    this.$router.push("/")
                } catch(e){
                    console.error("Error while logging in: ", e)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>