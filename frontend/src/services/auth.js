// src/services/auth.js
import axios from "axios";


  export function mockLogin(credentials, success = true) {
    // Check if already logged in
    if (!success) {
      throw { status: 409, response: { data: { message: "A user is already logged in", success: false } } };
    }

    // If all checks pass, return a success message
    return { status: 200, response: { data: { message: "login succeeded", success: true}} };
  }
  

  export async function Register(userDetails) {
    const response = await this.axios.post(this.$root.store.server_domain + "/register", userDetails );
    if (!response) {
      throw { status: 409, response: { data: { message: "Username taken", success: false } } };
    }
    return { status: 200, response: { data: { message: "user created", success: true}} };
  }
  


  export function mockLogout() {
    return { status: 200, response: { data: { message: "logout succeeded", success: true}} };

  }
  

