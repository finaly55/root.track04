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
    <v-btn @click="writeUserData(3, 'test', 'test@gmail.com', 'img')"
      >click</v-btn
    >
  </div>
  <!--  <div v-for="item in scores" :key="item">
    &lt;!&ndash; contenu &ndash;&gt;
  </div>-->
  <!--  <div class="modal fade" v-show="scores"/>-->
</template>

<script>
import firebase from "firebase";

export default {
  name: "Home",
  components: {},
  created() {},
  methods: {
    writeUserData(userId, name, email, imageUrl) {
      firebase
        .database()
        .ref("users/" + userId)
        .set({
          username: name,
          email: email,
          profile_picture: imageUrl,
        });
    },
  },
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
  mounted() {
    firebase
      .database()
      .ref("taskforce/")
      .on("value", (snapshot) => {
        this.scores = [];
        const data = snapshot.val();
        Object.keys(data).forEach((el) => {
          let exercices = [];
          Object.keys(data[el].exercice).forEach((il) => {
            exercices.push(data[el].exercice[il]);
          });
          var scoreTotal = exercices
            .filter((exercice) => exercice != "Pas encore effectué")
            .reduce((a, b) => a + b, 0);

          this.scores.push({
            taskForce: el,
            exercices: exercices,
            scoreTotal: scoreTotal,
          });
        });
      });
  },
};
</script>
