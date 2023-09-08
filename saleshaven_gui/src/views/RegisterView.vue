<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="firstName" required />
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="lastName" required />
      </div>
      <div>
        <label for="gender">Gender:</label>
        <input type="text" id="gender" v-model="gender" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      password: "",
    };
  },
  methods: {

    async register() {
      try {
        const resp = await this.$store.dispatch("register", {
          firstName: this.firstName,
          lastName: this.lastName,
          gender: this.gender,
          email: this.email,
          userPass: this.password,
        })
        if (resp.success && resp.token) {
          await Swal.fire({
            icon: "success",
            title: "Registration successful",
            text: "You are now registered, please log in",
          });
          this.$router.push("/login")
        } else if(resp.success === false && resp.msg === "Email is already in use"){
          await Swal.fire({
            icon: "error",
            title: "Email already in use",
            text: resp.msg
          })
        } else{
          await Swal.fire({
            icon: "error",
            title: "Unexpected error",
            text: "Unexpected error has occured"
          })
        }
      } catch (e) {
        console.error("Registration error: ", e);
      }
    }
  }
}
</script>

<style scoped>
/* Add your CSS styles here */
</style>