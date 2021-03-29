<template>
  <div>
    <h2>Exercice 4</h2>
    <br />
    <br />
    <v-alert v-if="hasDoneTheExercice === true" type="warning">
      Vous avez déjà fait cet exercice
    </v-alert>

    <div>
      Vous recevez un fichier d’un ami, le connaissant, ce petit cachotier, il
      vous réserve surement des surprises.
      <br />
      Le fichier contient un fichier audio et autre fichier zippé je vous laisse
      utilisé votre esprit d’analyse et d’imagination et puis certains outils
      qui vous aideront à venir à bout des énigmes.
      <br />
      Objectif : Trouver le Flag cacher.
      <br />
      A toi de jouer je te laisse dézipper le fichier d’exercice.
      <br />
      Que la force soit avec toi !!
      <br />
      Fichier d’exercice : Exo4_steno.zip
    </div>

    <v-btn class="ma-2 mt-5" outlined href="files-to-dl/Exo4_Steno.zip" download>
      Télécharger fichier zip
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

export default {
  name: "Exercice4Page",
  data: () => ({
    alert: false,
    valid: true,
    flag: "",
    flagRules: [
      (v) => !!v || "Le champ doit être rempli",
      /*v => v.length <= 10 || 'Name must be less than 10 characters',*/
    ],
    isFlagGood: "",
    userConnected: {},
    hasDoneTheExercice: false,
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
          "/exercice/04"
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
        var exercice4 = this.scores.map((x) => x.exercices[3]);
        var bonus =
          exercice4.filter((x) => x !== "Pas encore effectué").length == 0;

        await firebase
          .database()
          .ref("flags/04")
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
                  "/exercice/04"
              ] = bonus ? 6.25 : 5;
              firebase.database().ref().update(update);
              this.hasDoneTheExercice = true;
            } else {
              this.isFlagGood = false;
            }
          });
      }
    },
  },
};
</script>

<style scoped>
</style>
