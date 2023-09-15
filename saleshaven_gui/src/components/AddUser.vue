<template>
  <div class="main">
    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal3">
      add user
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModal3Label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel1">New User</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <label for="firstName">First Name:</label>
            <input required oninvalid="this.setCustomValidity('Please provide a first name')"
              oninput="this.setCustomValidity('')" id="firstName" type="text" placeholder="First Name"
              v-model="model.user.firstName" />
            <label for="lastName">Last Name:</label>
            <input required id="lastName" oninvalid="this.setCustomValidity('Please provide a Last Name')"
              oninput="this.setCustomValidity('')" type="text" placeholder="last name" v-model="model.user.lastName" />
            <label for="gender">Gender:</label>
            <div class="dropdown">
              <select class="btn btn-secondary dropdown-toggle" v-model="model.user.gender">
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div v-if="userRole === 'Owner'">
              <label for="userRole">Role:</label>
              <input required id="userRole" type="text"
                oninvalid="this.setCustomValidity('Please enter this user\'s role')" oninput="this.setCustomValidity('')"
                placeholder="role" v-model="model.user.userRole" />
            </div>
            <label for="email">Email Address</label>
            <input required id="email" type="text" oninvalid="this.setCustomValidity('Please provide an email address')"
              oninput="this.setCustomValidity('')" placeholder="email address" v-model="model.user.email" />
            <label for="password">Password:</label>
            <input required id="password" type="text" oninvalid="this.setCustomValidity('Please provide a password')"
              oninput="this.setCustomValidity('')" placeholder="password" v-model="model.user.userPass" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn" @click="createUser">
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
  data() {
    return {
      addingUserID: null,
      model: {
        user: {
          firstName: "",
          lastName: "",
          gender: "",
          email: "",
          userPass: "",
          userProfile: "",
        },
      },
    };
  },
  methods: {
    createUser() {
      this.$store.dispatch("register", this.model.user);
      console.log(this.model.user);
    },
  },
  computed: {
    userRole() {
      return this.$store.state.userRole
    }
  }
};
</script>
  
<style scoped>
.dropdown-toggle {
  border: 1px solid black !important;
  color: black !important;
}

.btn {
  border: 2px solid #f7f4f1;
  background: linear-gradient(180deg, rgba(2, 2, 4, 1) 0%, rgba(6, 4, 17, 1) 100%);
  color: rgb(255, 255, 255);
  cursor: pointer !important;
  margin-bottom: 10px !important;
}

.btn:hover {
  background: white;
  color: rgb(2, 2, 5) !important;
}

select {
  background: white !important;
}


.modal-content {
  color: black !important;
}

input {
  width: 100%;
  height: 3rem;
  margin-bottom: 2rem;
}
</style>