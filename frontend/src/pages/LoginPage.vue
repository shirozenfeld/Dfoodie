<template>
  <div class="container">
    <b-card class="login-card">
      <h1 class="title">Login</h1>
      <b-form @submit.prevent="onLogin">
        <b-form-group
          id="input-group-Username"
          label-cols-sm="3"
          label="Username:"
          label-for="Username"
        >
          <b-form-input
            id="Username"
            v-model="$v.form.username.$model"
            type="text"
            :state="validateState('username')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Username is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-Password"
          label-cols-sm="3"
          label="Password:"
          label-for="Password"
        >
          <b-form-input
            id="Password"
            type="password"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Password is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button
          type="submit"
          variant="primary"
          style="width:100px;display:block;"
          class="mx-auto w-100"
        >Login</b-button
        >
        <div class="mt-2">
          Do not have an account yet?
          <router-link to="register"> Register in here</router-link>
        </div>
      </b-form>
      <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
      >
        Login failed: {{ form.submitError }}
      </b-alert>
    </b-card>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mockLogin } from "../services/auth.js";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined,
      },
    };
  },
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        
        const response = await this.axios.post(
          this.$root.store.server_domain +"/Login",
          {
            username: this.form.username,
            password: this.form.password
          }
        );
        if (response)
        {
          console.log(this.$root.store.login);
          this.$root.store.login(this.form.username);
          this.$router.push("/");
        }
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },

    onLogin() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");

      this.Login();
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  margin: 0;
  padding: 0 0px; /* Add some padding to prevent content from touching edges */
}

.login-card {
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  max-width: 428px; /* Increase the maximum width */
  width: 100%; /* Ensure the card takes up the available width */
  margin-left: 20px; /* Adjust margin-left as needed */

}


</style>

