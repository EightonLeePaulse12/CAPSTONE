<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col back">
          <img loading="lazy" src="https://i.postimg.cc/Y91CZNRV/pexels-dids-3527795.jpg" alt="" class="img-01">
        </div>
        <div class="col form">
          <h2 class="text-center h-02">Register</h2>
          <div class="formm">
            <form @submit.prevent="register" id="form">
              <div id="check">
                <label for="firstName">First Name:</label>
                <input type="text" oninvalid="this.setCustomValidity('Please enter your first name')"
                  oninput="this.setCustomValidity('')" placeholder="First Name" id="firstName" v-model="firstName"
                  required />
              </div>
              <div id="check">
                <label for="lastName">Last Name:</label>
                <input type="text" placeholder="First Name"
                  oninvalid="this.setCustomValidity('Please enter your last name')" oninput="this.setCustomValidity('')"
                  id="lastName" v-model="lastName" required />
              </div>
              <div id="check">
                <label for="gender">Gender:</label>
                <input type="text" placeholder="Last Name" id="gender"
                  oninvalid="this.setCustomValidity('Please provide your gender')" oninput="this.setCustomValidity('')"
                  v-model="gender" required />
              </div>
              <div id="check">
                <label for="email">Email:</label>
                <input type="email" placeholder="Email" id="email"
                  oninvalid="this.setCustomValidity('Please enter your email address')"
                  oninput="this.setCustomValidity('')" v-model="email" required />
              </div>
              <div id="check">
                <label for="password">Password:</label>
                <input type="password" placeholder="password"
                  oninvalid="this.setCustomValidity('Please enter a password')" oninput="this.setCustomValidity('')"
                  id="password" v-model="password" required />
              </div>
              <div class="button">
                <button class="button1" type="submit" id="submit">
                  Register Now
                  <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
                    <path clip-rule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                      fill-rule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
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
        } else if (resp.success === false && resp.msg === "Email is already in use") {
          await Swal.fire({
            icon: "error",
            title: "Email already in use",
            text: resp.msg
          })
        } else {
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
.h-02 {
  padding-top: 1rem;
}

.back {
  height: 74vh;
  width: 100%;
}

.img-01 {
  height: 81.5vh;
  width: 100%;
}

.container-fluid {
  height: 100%;
}

input {
  width: 20rem;
  padding: 5px;
  border-radius: 10px;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button1 {
  position: relative;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  padding-block: 0.5rem;
  padding-inline: 1.25rem;
  background-color: rgb(0 107 179);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffff;
  gap: 10px;
  font-weight: bold;
  border: 3px solid #ffffff4d;
  outline: none;
  overflow: hidden;
  font-size: 15px;
}

.icon {
  width: 24px;
  height: 24px;
  transition: all 0.3s ease-in-out;
}

.button1:hover {
  transform: scale(1.05);
  border-color: #fff9;
}

.button1:hover .icon {
  transform: translate(4px);
}

.button1:hover::before {
  animation: shine 1.5s ease-out infinite;
}

.button1::before {
  content: "";
  position: absolute;
  width: 100px;
  height: 100%;
  background-image: linear-gradient(120deg,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0) 70%);
  top: 0;
  left: -100px;
  opacity: 0.6;
}

@keyframes shine {
  0% {
    left: -100px;
  }

  60% {
    left: 100%;
  }

  to {
    left: 100%;
  }
}

#submit {
  padding: 7px;
  background: transparent;
  color: white;
  border: 1px solid white;
  cursor: pointer !important;
}

#submit:hover {
  color: rgb(4, 3, 10) !important;
  background: white;
}

#check {
  display: flex !important;
  flex-direction: column;
  padding-bottom: 1rem;
}

.formm {
  width: 100% !important;
  height: 100% !important;
  display: flex;
  margin: 0 !important;
  justify-content: center;
  align-items: center;
}

form {
  background: 1px solid red !important;
}

/*
.back::before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: .7;
} */
</style>