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
        </div>
      </v-layout>
    </v-col>

    <v-col class="d-flex justify-center content">
      <div class="ma-auto">
        <h1 id="test">TaskForce 04</h1>
        <img
            class="border mb-auto"
            src="@/assets/pictures/bee9_UN.png"
            width="400px"
            style="vertical-align: middle"
            alt="TaskForce 04 - Bee 9 & Usine Nantek"/>
      </div>
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

          let emailSplit = data.user.email.split("@");
          let taskForceNb = emailSplit[0].substr(9);

          let campus = emailSplit[1].split('.')[0];
          campus = campus.charAt(0).toUpperCase() + campus.slice(1)

          this.$updateUserConnected({
            firstname: "Julien",
            mail: data.user.email,
            lastname: "lastname",
            number: taskForceNb,
            campus: campus,
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

#test {
  text-align: center;
}
</style>
