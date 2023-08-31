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
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        async userLogin() {
            try {
                const res = await this.$store.dispatch("login", {
                    email: this.email,
                    password: this.password
                })
                console.log(res)
                if (res.success) {
                    await Swal.fire({
                        icon: "success",
                        title: "Login successful",
                        text: "You are now logged in",
                    });
                    this.$router.push("/")
                } else {
                    const error = this.$store.getters.getError
                    await Swal.fire({
                        icon: "error",
                        title: "Login failed",
                        text: error || "An error occurred.",
                    });
                }
            } catch (e) {
                const error = this.$store.getters.getError
                await Swal.fire({
                    icon: "error",
                    title: "Login failed",
                    text: error || "An error occurred during login.",
                });
                console.error("Error while logging in: ", e)
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>