<template>
  <div>
    <h2>Exercice 2</h2>
    <br />
    <br />
    <v-alert v-if="hasDoneTheExercice === true"
             type="warning">
      Vous avez déjà fait cet exercice
    </v-alert>

    <div>
      Bonjour à vous Lieutenant de vaisseau !
      <br>Sur cet exercice vous incarnerez un Capitaine d'une flotte de navires Français.
      <br>Votre but est de retrouver des mots déchiffrables de différentes façons.
      <br>Puis les additionner pour en faire une phrase, qui sera la réponse.
      <br>Enigme :
      <br>Mon premier était utilisé durant la World War II par des ennemis.
      <br>Mon second reprend la Base d'un QG + un numéro.
      <br>Et mon dernier est utilisé par vous, afin de communiquer.

    </div>

    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <v-text-field
          label="Flag"
          v-model="flag"
          :rules="flagRules"
          style="width: 150px"
          required>
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

    <v-alert v-if="isFlagGood === true"
             type="success"
             class="mt-5"
             dismissible
    >
      Bon flag !
    </v-alert>
    <v-alert v-if="isFlagGood === false"
             type="error"
             class="mt-5"
             dismissible
    >
      Mauvais flag :(
    </v-alert>

  </div>
</template>

<script>
import firebase from "firebase";
import Vue from "vue";

export default {
  name: "Exercice2Page",
  data: () => ({
    valid: true,
    flag : '',
    flagRules: [
      v => !!v || 'Le champ doit être rempli',
      /*v => v.length <= 10 || 'Name must be less than 10 characters',*/
    ],
    isFlagGood : '',
    userConnected: {},
    hasDoneTheExercice : false
  }),
  mounted()
  {
    firebase.database().ref('campus/' + this.userConnected.campus + '/taskforce/' + this.userConnected.number + '/exercice/02').once('value').then((snapshot) => {
      if (typeof snapshot.val() !== "string")
      {
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

    let campus = emailSplit[1].split('.')[0];

    this.userConnected = {
      number: taskForceNb,
      campus: campus,
    };
  },
  methods: {
    validate()
    {
      let retrievedFlag = "";
      if (!this.hasDoneTheExercice)
      {
        firebase.database().ref('flags/02').once('value').then((snapshot) => {
          retrievedFlag = snapshot.val();
          if (retrievedFlag === this.flag)
          {
            this.isFlagGood = true;
            let update = {};
            update['campus/' + this.userConnected.campus + '/taskforce/' + this.userConnected.number + '/exercice/02'] = 10;
            firebase.database().ref().update(update);
            this.hasDoneTheExercice = true;
          }
          else
          {
            this.isFlagGood = false;
          }
        });
      }
    },
  },
}
</script>

<style scoped>
</style>
