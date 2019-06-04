<template>
  <section class="centralized-content">
    <div class="login shadow">
      <div class="img-wrapper centralized-content">
        <img src="@/assets/images/starling-primary.svg" alt="a starling logo">
      </div>
      <div class="input-wrapper">
        <v-input :placeholder="'User'" type="text"/>
        <v-input :placeholder="'Password'" type="text"/>
      </div>
      <div class="button-wrapper centralized-content">
        <button class="primary" type="button">login</button>
      </div>
      <footer class="centralized-content">
          <a href="#">Esqueci minha senha.</a>
      </footer>
    </div>
  </section>
</template>

 <script>
 import Input from '../components/Input'
 export default {
   name: "Login",
   components: {
     'v-input': Input
   }
 }
 </script>

<style scoped>

section {
  --login-padding: 20px;
}

.login {
  background: white;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 550px;
  padding: var(--login-padding);
  border-radius: 5px;
  position: relative;
}

.img-wrapper {
  width: 100%;
  height: 100px;
}

img {
  width: 50px;
  height: 50px;
}

.input-wrapper {
  width: 100%;
  padding: 20px;
  height: auto;
  overflow: hidden;
}

.input-wrapper input{
  float: left;
  clear: left;
  margin: 10px 0;
  width: 100%;
}

.button-wrapper {
  width: 100%;
}

button {
  width: 50%;
}

footer {
  width: calc(100% - calc(2 *var(--login-padding)));
  position: absolute;
  bottom: 0;
  font-size: 12px;
  padding: 5px;
}

@media (max-width: 650px) {
  .login {
    max-width: 100%;
    max-height: 100%;
    padding-top: 25%;
  }
}

</style>
