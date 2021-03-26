<template>
  <div class="d-flex fill-height pa-0" style="width: inherit">
    <v-col class="d-flex flex-column align-center color1">
      <v-layout
        align="center"
        class="d-flex flex-column justify-center align-center"
      >
        <div class="title">Connexion</div>
        <div class="mt-5">
          <v-text-field
            label="E-mail"
            outlined
            dense
            background-color="#ffffff"
            v-model="mail"
          ></v-text-field>
          <v-text-field
            label="Mot de passe"
            outlined
            dense
            background-color="#ffffff"
            type="password"
            v-model="password"
          >
          </v-text-field>
          <v-btn elevation="2" large text @click="login">Se connecter</v-btn>
        </div>
        <div class="text-center">
          <!--          <div class="mt-2"><a href="">Mot de passe oublié</a></div>-->
          <!--          <div class="mt-2">
            <router-link to="/register">Inscription</router-link>
          </div>-->
          <!--          <div class="mt-2"><a href=""> Mentions légales</a></div>-->
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
          this.$showSnackbar("Bonjour vous êtes maintenant connecté.");

          let taskForceNb = data.user.email.split("@");
          taskForceNb = taskForceNb[0].substr(9);

          this.$updateUserConnected({
            firstname: "Julien",
            mail: data.user.email,
            lastname: "lastname",
            number: taskForceNb,
          });
          this.$router.replace({ name: "News" });
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
.color1 {
  width: 100%;
  background-color: #f5f5f5;
}
.border {
  border-left: #f5f5f5;
}
.v-text-field {
  justify-content: center;
}
</style>
