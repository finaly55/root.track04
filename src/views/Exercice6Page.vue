<template>
  <div>
    <h2>Exercice 6</h2>
    <br />
    <br />
    <v-alert v-if="hasDoneTheExercice === true" type="warning">
      Vous avez déjà fait cet exercice
    </v-alert>

    <v-alert
      v-model="alert"
      dismissible
      color="info"
      border="left"
      elevation="2"
      colored-border
      type="info"
    >
      Contactez Ludovic Heurtin sur Teams pour obtenir vos identifiants.
    </v-alert>

    <v-btn
      class="ma-2"
      outlined
      href="files-to-dl/Ex6-Taskforce04-Nantes.ovpn"
      download
    >
      Télécharger fichier vpn
    </v-btn>

    <v-btn class="ma-2" outlined @click="launchShellScript">
      Lancer script shell
    </v-btn>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        label="Flag"
        v-model="flag"
        :rules="flagRules"
        style="width: 150px"
        required
      >
      </v-text-field>
      <v-btn
        :disabled="flag.length === 0"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Envoyer
      </v-btn>
    </v-form>

    <v-alert v-if="isFlagGood === true" type="success" class="mt-5" dismissible>
      Bon flag !
    </v-alert>
    <v-alert v-if="isFlagGood === false" type="error" class="mt-5" dismissible>
      Mauvais flag :(
    </v-alert>
  </div>
</template>

<script>
import firebase from "firebase";
import Vue from "vue";
import FetcherService from "../services/FetcherService";

// const shell = require('shelljs')

export default {
  name: "Exercice6Page",
  data: () => ({
    valid: true,
    flag: "",
    flagRules: [
      (v) => !!v || "Le champ doit être rempli",
      /*v => v.length <= 10 || 'Name must be less than 10 characters',*/
    ],
    isFlagGood: "",
    userConnected: {},
    hasDoneTheExercice: false,
  }),
  mounted() {
    firebase
      .database()
      .ref(
        "campus/" +
          this.userConnected.campus +
          "/taskforce/" +
          this.userConnected.number +
          "/exercice/06"
      )
      .once("value")
      .then((snapshot) => {
        if (typeof snapshot.val() !== "string") {
          this.hasDoneTheExercice = true;
        }
      });
  },
  async created() {
    const context = this;
    Vue.prototype.$updateUserConnected = async function (user) {
      context.userConnected = user;
    };
    const currentUser = firebase.auth().currentUser;

    let emailSplit = currentUser.email.split("@");
    let taskForceNb = emailSplit[0].substr(9);

    let campus = emailSplit[1].split(".")[0];

    this.userConnected = {
      number: taskForceNb,
      campus: campus,
    };
  },
  methods: {
    validate() {
      let retrievedFlag = "";
      if (!this.hasDoneTheExercice) {
        firebase
          .database()
          .ref("flags/06")
          .once("value")
          .then((snapshot) => {
            retrievedFlag = snapshot.val();
            if (retrievedFlag === this.flag) {
              this.isFlagGood = true;
              let update = {};
              update[
                "campus/" +
                  this.userConnected.campus +
                  "/taskforce/" +
                  this.userConnected.number +
                  "/exercice/01"
              ] = 20;
              firebase.database().ref().update(update);
              this.hasDoneTheExercice = true;
            } else {
              this.isFlagGood = false;
            }
          });
      }
    },
    async launchShellScript() {
      let vmId = '';
      switch (this.userConnected.campus)
      {
        case 'aix':
          switch (this.userConnected.number)
          {
            case '01':
              vmId = 'TF1301'
              break
            case '02':
              vmId = 'TF1302'
              break
          }
          break
        case 'angers':
          switch (this.userConnected.number)
          {
            case '01':
              vmId = 'TF4901'
              break
            case '02':
              vmId = 'TF4902'
              break
            case '03':
              vmId = 'TF4903'
              break
          }
          break
        case 'nantes':
          switch (this.userConnected.number)
          {
            case '01':
              vmId = 'TF4401'
              break
            case '02':
              vmId = 'TF4402'
              break
            case '03':
              vmId = 'TF4403'
              break
            case '05':
              vmId = 'TF4405'
              break
            case '06':
              vmId = 'TF4406'
              break
          }
          break
        case 'rennes':
          switch (this.userConnected.number)
          {
            case '01':
              vmId = 'TF3501'
              break
            case '02':
              vmId = 'TF3502'
              break
            case '03':
              vmId = 'TF3503'
              break
            case '04':
              vmId = 'TF3504'
              break
            case '05':
              vmId = 'TF3505'
              break
          }
          break
      }
      try {
        const response = await FetcherService.sendPromise(
          "new-vm/" + vmId
        );
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
</style>
