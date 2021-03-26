<template>
  <div>
    <h2>Tableau des scores</h2>

    <br />
    <v-data-table
      :headers="headers"
      :items="teams"
      :items-per-page="6"
      hide-default-footer
      class="elevation-1"
    ></v-data-table>
    <br />
    <v-btn @click="writeUserData(3, 'test', 'test@gmail.com', 'img')"
      >click</v-btn
    >
  </div>
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
      teams: [
        {
          name: "Task Force 01",
          exercice1: "Non terminé",
          exercice2: "Non terminé",
          exercice3: "Non terminé",
          exercice4: "Non terminé",
          exercice5: "Non terminé",
          exercice6: "Non terminé",
          total: 100,
        },
        {
          name: "Task Force 02",
          exercice1: "Non terminé",
          exercice2: "Non terminé",
          exercice3: "Non terminé",
          exercice4: "Non terminé",
          exercice5: "Non terminé",
          exercice6: "Non terminé",
          total: 100,
        },
        {
          name: "Task Force 03",
          exercice1: "Non terminé",
          exercice2: "Non terminé",
          exercice3: "Non terminé",
          exercice4: "Non terminé",
          exercice5: "Non terminé",
          exercice6: "Non terminé",
          total: 100,
        },
        {
          name: "Task Force 04",
          exercice1: "Non terminé",
          exercice2: "Non terminé",
          exercice3: "Non terminé",
          exercice4: "Non terminé",
          exercice5: "Non terminé",
          exercice6: "Non terminé",
          total: 100,
        },
        {
          name: "Task Force 05",
          exercice1: "Non terminé",
          exercice2: "Non terminé",
          exercice3: "Non terminé",
          exercice4: "Non terminé",
          exercice5: "Non terminé",
          exercice6: "Non terminé",
          total: 100,
        },
        {
          name: "Task Force 06",
          exercice1: "Non terminé",
          exercice2: "Non terminé",
          exercice3: "Non terminé",
          exercice4: "Non terminé",
          exercice5: "Non terminé",
          exercice6: "Non terminé",
          total: 100,
        },
      ],
    };
  },
};
</script>
