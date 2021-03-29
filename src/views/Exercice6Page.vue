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

    <div>
      Trouvez les 2 flags utilisateurs, puis le troisième et dernier flag du
      root !
      <br />Bien entendu seul le dernier Flag valide les points.
      <br />Attention, le serveur n'est pas très stable et à tendance à
      redémarrer.
    </div>

      <div class="mt-5">
          Votre serveur cible est {{this.vmId}}
      </div>

    <v-btn
      class="ma-2 mt-5"
      outlined
      href="files-to-dl/Ex6-Taskforce04-Nantes.ovpn"
      download
    >
      Télécharger fichier vpn
    </v-btn>

    <v-btn class="ma-2 mt-5" outlined @click="launchShellScript">
      Commencer l'exercice
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
    alert: true,
    vmId: "",
    scores: [],
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

    switch (this.userConnected.campus) {
      case "aix":
        this.vmId = "TF130102";
        break;
      case "angers":
        this.vmId = "TF49010203";
        break;
      case "nantes":
        if (
          this.userConnected.number === "01" ||
          this.userConnected.number === "02" ||
          this.userConnected.number === "03"
        ) {
          this.vmId = "TF44010203";
        } else {
          this.vmId = "TF440506";
        }
        break;
      case "rennes":
        if (
          this.userConnected.number === "01" ||
          this.userConnected.number === "02" ||
          this.userConnected.number === "03"
        ) {
          this.vmId = "TF35010203";
        } else {
          this.vmId = "TF350405";
        }
        break;
    }
  },
  methods: {
    async validate() {
      let retrievedFlag = "";
      if (!this.hasDoneTheExercice) {
        await firebase
          .database()
          .ref("campus/")
          .on("value", (snapshot) => {
            this.scores = [];
            const data = snapshot.val();
            Object.keys(data).forEach((campus) => {
              Object.keys(data[campus].taskforce).forEach((el) => {
                let exercices = [];
                Object.keys(data[campus].taskforce[el].exercice).forEach(
                  (il) => {
                    exercices.push(data[campus].taskforce[el].exercice[il]);
                  }
                );
                const scoreTotal = exercices
                  .filter((exercice) => exercice !== "Pas encore effectué")
                  .reduce((a, b) => a + b, 0);

                let campusName = campus.substr(0, 3);
                campusName =
                  campusName.charAt(0).toUpperCase() + campusName.slice(1);
                this.scores.push({
                  taskForce: campusName + " TaskForce " + el,
                  exercices: exercices,
                  scoreTotal: scoreTotal,
                });
              });
            });
          });
        var exercice6 = this.scores.map((x) => x.exercices[5]);
        var bonus =
          exercice6.filter((x) => x !== "Pas encore effectué").length === 0;

        await firebase
          .database()
          .ref("flags/06")
          .once("value")
          .then(async (snapshot) => {
            retrievedFlag = snapshot.val();
            if (retrievedFlag === this.flag) {
              this.isFlagGood = true;
              let update = {};
              update[
                "campus/" +
                  this.userConnected.campus +
                  "/taskforce/" +
                  this.userConnected.number +
                  "/exercice/06"
              ] = bonus ? 25 : 20;
              await firebase.database().ref().update(update);
              this.hasDoneTheExercice = true;
              try {
                const response = await FetcherService.sendPromise(
                  "del-vm/" + this.vmId
                );
                console.log(response);
              } catch (error) {
                console.log(error);
              }
            } else {
              this.isFlagGood = false;
            }
          });
      }
    },
    async launchShellScript() {
      try {
        const response = await FetcherService.sendPromise(
          "new-vm/" + this.vmId
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
</style>
