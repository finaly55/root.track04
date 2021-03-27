<template>
  <div>
    <h2>Tableau des scores</h2>

    <br />
    <v-data-table
      :headers="headers"
      :items="scores"
      :items-per-page="6"
      hide-default-footer
      class="elevation-1"
    ></v-data-table>
    <br />
  </div>
</template>

<script>
import firebase from "firebase";
import Vue from "vue";

export default {
  name: "Home",
  components: {},
  methods: {  },
  data() {
    return {
      headers: [
        {
          text: "Exercice",
          align: "start",
          sortable: false,
          value: "taskForce",
        },
        { text: "Exercice 1", value: "exercices[0]" },
        { text: "Exercice 2", value: "exercices[1]" },
        { text: "Exercice 3", value: "exercices[2]" },
        { text: "Exercice 4", value: "exercices[3]" },
        { text: "Exercice 5", value: "exercices[4]" },
        { text: "Exercice 6", value: "exercices[5]" },
        { text: "Total", value: "scoreTotal" },
      ],
      scores: [],
    };
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
  mounted() {
    /*firebase
      .database()
      .ref( "taskforce/")
      .on("value", (snapshot) => {
        this.scores = [];
        const data = snapshot.val();
        Object.keys(data).forEach((el) => {
          let exercices = [];
          Object.keys(data[el].exercice).forEach((il) => {
            exercices.push(data[el].exercice[il]);
          });
          const scoreTotal = exercices
              .filter((exercice) => exercice !== "Pas encore effectué")
              .reduce((a, b) => a + b, 0);

          this.scores.push({
            taskForce: 'TaskForce ' + el,
            exercices: exercices,
            scoreTotal: scoreTotal,
          });
        });
      });*/
    firebase
        .database()
        .ref( "campus/")
        .on("value", (snapshot) => {
          this.scores = [];
          const data = snapshot.val();
          Object.keys(data).forEach((campus) => {
            console.log(campus)
            /*this.scores.push({
              taskForce: campus + ' TaskForce ' + nbTaskForce,
              exercices: exercices,
              scoreTotal: scoreTotal,
            });*/
          })
        });
  },
};
</script>
