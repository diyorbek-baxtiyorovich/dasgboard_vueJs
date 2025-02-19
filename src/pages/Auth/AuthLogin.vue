<template>
  <div class="login-container">
    <div id="formContent">
      <div class="fadeIn-box first">
        <img
          src="https://freepngimg.com/download/icon/user/9836-user-login.png"
          id="icon"
          alt="User Icon"
        />
      </div>

      <form @submit.prevent="login">
        <input
          v-model="username"
          type="text"
          class="fadeIn second"
          placeholder="Login"
        />
        <input
          v-model="password"
          type="password"
          class="fadeIn third"
          placeholder="Password"
        />
        <button class="btn btn-dark fadeIn fourth">Login</button>
      </form>

      <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");
const errorMessage = ref("");

const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "123456";

const login = () => {
  if (
    username.value === DEFAULT_USERNAME &&
    password.value === DEFAULT_PASSWORD
  ) {
    localStorage.setItem("userToken", "fake-jwt-token");
    router.push("/dashboard");
  } else {
    errorMessage.value = "Notogri login yoki parol!";
  }
};
</script>

<style>
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
}
#formContent {
  width: 400px;
  height: 450px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 20px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.fadeIn-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}
.fadeIn-box img {
  width: 30%;
}
.fadeIn {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #ccc;
  outline: none;
  padding: 10px;
  margin: 10px 0;
}
.error-text {
  color: red;
  text-align: center;
}
</style>
