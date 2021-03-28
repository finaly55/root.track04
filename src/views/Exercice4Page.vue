<template>
  <div>
    <h2>Exercice 4</h2>
    <br />
    <br />
    <v-alert v-if="hasDoneTheExercice === true"
             type="warning">
      Vous avez déjà fait cet exercice
    </v-alert>

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
  name: "Exercice4Page",
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
    firebase.database().ref('campus/' + this.userConnected.campus + '/taskforce/' + this.userConnected.number + '/exercice/04').once('value').then((snapshot) => {
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
        firebase.database().ref('flags/04').once('value').then((snapshot) => {
          retrievedFlag = snapshot.val();
          this.isFlagGood = this.flag === retrievedFlag;
          let update = {};
          update['campus/' + this.userConnected.campus + '/taskforce/' + this.userConnected.number + '/exercice/04'] = 5;
          firebase.database().ref().update(update);
          this.hasDoneTheExercice = true;
        });
      }
    },
  },
}
</script>

<style scoped>
</style>
