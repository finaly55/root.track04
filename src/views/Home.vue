<template>
  <div class="home">
    <h2>Tableau des scores</h2>
    <br />
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="6"
      hide-default-footer
      class="elevation-1"
    ></v-data-table>
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
  data() {
    return {
      headers: [
        {
          text: "Exercice",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Exercice 1", value: "exercice1" },
        { text: "Exercice 2", value: "exercice2" },
        { text: "Exercice 3", value: "exercice3" },
        { text: "Exercice 4", value: "exercice4" },
        { text: "Exercice 5", value: "exercice5" },
        { text: "Exercice 6", value: "exercice6" },
        { text: "Total", value: "total" },
      ],
      desserts: [
        {
          name: "Task Force 01",
          exercice1: 159,
          exercice2: 6.0,
          exercice3: 24,
          exercice4: 4.0,
          exercice5: 22,
          exercice6: 10,
          total: 100,
        },
        {
          name: "Task Force 02",
          exercice1: 159,
          exercice2: 6.0,
          exercice3: 24,
          exercice4: 4.0,
          exercice5: 22,
          exercice6: 10,
          total: 100,
        },
        {
          name: "Task Force 03",
          exercice1: 159,
          exercice2: 6.0,
          exercice3: 24,
          exercice4: 4.0,
          exercice5: 22,
          exercice6: 10,
          total: 100,
        },
        {
          name: "Task Force 04",
          exercice1: 159,
          exercice2: 6.0,
          exercice3: 24,
          exercice4: 4.0,
          exercice5: 22,
          exercice6: 10,
          total: 100,
        },
        {
          name: "Task Force 05",
          exercice1: 159,
          exercice2: 6.0,
          exercice3: 24,
          exercice4: 4.0,
          exercice5: 22,
          exercice6: 10,
          total: 100,
        },
        {
          name: "Task Force 06",
          exercice1: 159,
          exercice2: 6.0,
          exercice3: 24,
          exercice4: 4.0,
          exercice5: 22,
          exercice6: 10,
          total: 100,
        },
      ],
      scores: [],
    };
  },
  methods: {},
  mounted() {
    let viewMessage = this;
    const itemsRef = firebase.database().ref("taskforce04-7df7a-default-rtdb");
    itemsRef.on("value", snapshot => {
      let data = snapshot.val();
      let scores = [];
      /*Object.keys(data).forEach(key => {
        scores.push({
          id: key,
          taskForce: data[key].taskforce,
        });
      });*/
      console.log(data);
      // viewMessage.messages = scores;
    });
  }
};
</script>
