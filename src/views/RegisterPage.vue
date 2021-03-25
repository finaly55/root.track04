<template>
<div class="d-flex fill-height pa-0 hidden">
    <v-col class="d-flex flex-column align-center color-left">
      <v-layout  align="center" class="d-flex flex-column justify-center align-center">
        <div class="title">Inscription</div>
        <div class="mt-5">
          <form @submit="login" method="post">
            <v-text-field
              label="Email"
              name="mail"
              outlined
              background-color="#fcfcfc"
              color="#707070"
              dense
              v-model="mail"
            ></v-text-field>
            <v-text-field
              label="Mot de passe"
              background-color="#fcfcfc"
              color="#707070"
              outlined
              dense
              type="password"
              name="password"
              autocomplete="on"
              v-model="password"
            >
            </v-text-field>
            <v-text-field
              label="Repéter le mot de passe"
              background-color="#fcfcfc"
              color="#707070"
              outlined
              dense
              type="password"
              name="confirmpassword"
              autocomplete="on"
              v-model="password"
            >
            </v-text-field>
            <v-btn block elevation="2" large text type="submit" name="submit"
              >Valider</v-btn
            >
          </form>
        </div>
        <div class="text-center">
<!--          <div class="mt-2">
            <router-link to="/login">Se connecter</router-link>
          </div>
          <div class="mt-2"><a href=""> Mentions légales</a></div>-->
        </div>
      </v-layout>
    </v-col>

  <v-col class="d-flex justify-center content">
    <img
        class="border ma-auto"
        src="@/assets/pictures/bee9_UN.png"
        width="400px"
    />
  </v-col>
  </div>

</template>

<script>
import firebase from "firebase";
import UserService from "../services/UserService";

export default {
  name: "LoginPage",
  created() {},
  data: () => ({
    mail: "",
    password: "",
  }),
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.mail, this.password)
        .then(async (data) => {
          let response = await UserService.getUserByMail(this.mail);
          console.log(response);
          this.$router.replace({ name: "Home" });
        })
        .catch((err) => {
          console.error(err);
          this.$showSnackbar(err.message);
        });
    },
  },
};
</script>

<style>
.title {
  font-size: 30px;
}

.color-left {
  background-color: #f3f3f3;
  border-right: 0.5px solid #707070;
}

.color-right {
  background-color: #fcfcfc;
}

.hiden{
  overflow: hidden;
}
</style>
