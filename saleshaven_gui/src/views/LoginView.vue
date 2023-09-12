<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col this">
                    <h2 class="text-center h-02">Log in</h2>
                    <div class="div">
                        <form @submit.prevent="userLogin">
                            <div class="inputs">
                                <label for="email">Email</label>
                                <input type="email" class="email" name="email" v-model="email" placeholder="Email">
                                <label for="password">Password</label>
                                <input type="password" class="email" name="password" v-model="password" placeholder="Password">
                            </div>
                            <div class="button">
                                <button class="button1" type="submit" id="submit">
                                    Log In Now
                                    <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
                                      <path clip-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill-rule="evenodd"></path>
                                    </svg>
                                  </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col brr">
                    <img src="https://i.postimg.cc/XNmCTxnH/pexels-anni-roenkae-3110509.jpg" alt="" class="img-01">
                </div>
            </div>
        </div>

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
    beforeCreate() {
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
                console.log("Login Response:", resp);
                if (resp.success && resp.token) {
                    await Swal.fire({
                        icon: "success",
                        title: "Logged in Successfully",
                        text: `You are now logged in! Welcome, ${resp.userData.firstName}.`
                    })
                    this.$router.push("/")
                } else {
                    const errMsg = resp.error || "Unexpected error"
                    await Swal.fire({
                        icon: "error",
                        title: "Login failed",
                        text: errMsg
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
button:active {
    background-color: blue;
}
.container-fluid {
    height: 71.1vh;
}
.img-01 {
    height: 78.6vh;
    width: 100%;
}
.h-02 {
    padding-top: 3rem;
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
    background-image: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0) 70%
    );
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
.div {
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.button{
    width:100%;
    display:flex;
    justify-content: center;
    margin-top:10px;
}

  input{
    width:16rem;
    padding:5px;
    border-radius:10px;
  }
  #submit {
    padding:7px;
    background:transparent;
    color:white;
    border:1px solid white;
    cursor:pointer !important;
  }
  #submit:hover{
    color:rgb(4,3,10) !important;
    background: white;
  }
.email {
    margin-bottom: 2rem;
    height: 2.4rem;
}
.inputs {
    display: flex !important;
    flex-direction: column;
}


.brr {
    height: 74vh;
    width: 55%;
  }
</style>