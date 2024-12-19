<template>
  <div class="container">
    <b-card class="register-card">
      <h1 class="title">Register</h1>
      <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
        <!-- Username -->
        <b-form-group
          id="input-group-username"
          label-cols-sm="3"
          label="Username:"
          label-for="username"
        >
          <b-form-input
            id="username"
            v-model="$v.form.username.$model"
            type="text"
            :state="validateState('username')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.username.required">
            Username is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.username.length">
            Username length should be between 3-8 characters long
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.username.alpha">
            Username alpha
          </b-form-invalid-feedback>
        </b-form-group>


        <!-- First Name -->
        <b-form-group
          id="input-group-firstname"
          label-cols-sm="3"
          label="First Name:"
          label-for="firstName"
        >
          <b-form-input
            id="firstName"
            v-model="$v.form.firstName.$model"
            type="text"
            :state="validateState('firstName')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.firstName.required">
            First Name is required
          </b-form-invalid-feedback>
        </b-form-group>        


        <!-- Last Name -->
        <b-form-group
          id="input-group-lastname"
          label-cols-sm="3"
          label="Last Name:"
          label-for="lastName"
        >
          <b-form-input
            id="lastName"
            v-model="$v.form.lastName.$model"
            type="text"
            :state="validateState('lastName')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.lastName.required">
            Last Name is required
          </b-form-invalid-feedback>
        </b-form-group>


        <!-- Country -->
        <b-form-group
          id="input-group-country"
          label-cols-sm="3"
          label="Country:"
          label-for="country"
        >
          <b-form-select
            id="country"
            v-model="$v.form.country.$model"
            :options="countries"
            :state="validateState('country')"
          ></b-form-select>
          <b-form-invalid-feedback>
            Country is required
          </b-form-invalid-feedback>
        </b-form-group>


        <!-- Password -->
        <b-form-group
          id="input-group-Password"
          label-cols-sm="3"
          label="Password:"
          label-for="password"
        >
          <b-form-input
            id="password"
            type="password"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.password.required">
            Password is required
          </b-form-invalid-feedback>
          <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
            Your password should be <strong>strong</strong>. <br />
            For that, your password should be also:
          </b-form-text>
          <b-form-invalid-feedback
            v-if="$v.form.password.required && !$v.form.password.length"
          >
            Have length between 5-10 characters long
          </b-form-invalid-feedback>
        </b-form-group>


        <!-- Confirm Password -->
        <b-form-group
          id="input-group-confirmedPassword"
          label-cols-sm="3"
          label="Confirm Password:"
          label-for="confirmedPassword"
        >
          <b-form-input
            id="confirmedPassword"
            type="password"
            v-model="$v.form.confirmedPassword.$model"
            :state="validateState('confirmedPassword')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
            Password confirmation is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback
            v-else-if="!$v.form.confirmedPassword.sameAsPassword"
          >
            The confirmed password is not equal to the original password
          </b-form-invalid-feedback>
        </b-form-group>


        <!-- Email -->
        <b-form-group
          id="input-group-email"
          label-cols-sm="3"
          label="Email:"
          label-for="email"
        >
          <b-form-input
            id="email"
            v-model="$v.form.email.$model"
            type="email"
            :state="validateState('email')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.email.required">
            Email is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.email.email">
            Please enter a valid email address
          </b-form-invalid-feedback>
        </b-form-group>


        <!-- Buttons -->
      <b-button type="reset" variant="danger">Reset</b-button>
        <b-button
          type="submit"
          variant="primary"
          style="width:250px;"
          class="ml-5 w-87"
        >Register</b-button>

        <div class="mt-2">
          You have an account already?
          <router-link to="login"> Log in here</router-link>
        </div>
      </b-form>
      <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
      >
        Register failed: {{ form.submitError }}
      </b-alert>
      <!-- <b-card class="mt-3 md-3" header="Form Data Result">
        <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
        <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
      </b-card> -->
    </b-card>
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";
import { Register } from "../services/auth.js";
export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(8),
        alpha
      },
      firstName: {
        required
      },
      lastName: {
        required
      },
      country: {
        required
      },
      password: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(10),
        // strongPassword(value) {
        //   return helpers.withParams(
        //     { type: "strongPassword" },
        //     value => passwordRegex.test(value)
        //   )
        // }
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      email: {
        required,
        email
      }
    }
  },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() 
    {
      try {
        const response = await this.axios.post(
        this.$root.store.server_domain + "/Register",
        // "http://127.0.0.1:3000/register",
          {
          username: this.form.username,
          firstName:this.form.firstName,
          lastName:this.form.firstName,
          country:this.form.country,
          password: this.form.password,
          email:this.form.email
          }
        );
        if (!response) 
        {
          throw { status: 409, response: { data: { message: "Username taken", success: false } } };
        }
        else
        this.$router.push("/login");  
        console.log(response);
      } 
      catch (err) 
      {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },

    onRegister() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
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
}
.register-card {
  width: 90%;
  max-width: 500px;
  background-color: rgba(255, 255, 255, 0.8); /* Transparent white */
  padding: 20px;
  border-radius: 15px; /* Rounded corners */
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1); /* Box shadow */
}
</style>
