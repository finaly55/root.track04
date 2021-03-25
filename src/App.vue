<template>
  <v-app id="inspire">
    <v-navigation-drawer
      color="primary"
      v-model="drawer"
      app
      stateless
      class="pl-10"
      width="270px"
      v-if="$route.path !== '/login' && $route.path !== '/register'"
    >
      <div class="d-flex align-start flex-column" style="height: 100vh">
        <h3 class="grey--text text--lighten-2 my-10">root.track TaskForce 04</h3>
        <v-list dark class="mt-5 pr-8">
          <router-link :to="url" :key="icon" v-for="[icon, url, text] in links">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>{{ icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list>
        <div class="mt-auto">
          <v-list dark class="mt-5 pr-8">
            <v-list-item link @click="logout">
              <v-list-item-icon>
                <v-icon>logout</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Déconnexion</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </v-navigation-drawer>

    <v-main
      class="background-container"
      v-if="$route.path !== '/login' && $route.path !== '/register'"
    >
      <v-container class="py-8 pr-6 pl-16" fluid>
        <router-view
          :userConnected="userConnected"
          :campuses="campuses"
        ></router-view>
      </v-container>
    </v-main>
    <v-main fill-height v-else>
      <v-container fluid class="pa-0 fill-height">
        <router-view :userConnected="userConnected"></router-view>
      </v-container>
    </v-main>

    <!-- snackbar -->
    <v-snackbar v-model="snackbarEnabled" :timeout="5000">
      {{ snackbarText }}
      <v-btn color="blue" text @click="snackbarEnabled = false">Fermer</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import Home from "./views/Home";
import Vue from "vue";
import firebase from "firebase";
export default {
  name: "App",

  components: {
    Home,
  },
  data: () => ({
    // variable assigné à la snackbar
    snackbarEnabled: false,
    snackbarText: "",
    drawer: true,
    links: [
      ["", "/", "Accueil"],
      ["", "/exo1", "Exercice 1"],
      ["", "/exo2", "Exercice 2"],
      ["", "/exo3", "Exercice 3"],
      ["", "/exo4", "Exercice 4"],
      ["", "/exo5", "Exercice 5"],
      ["", "/exo6", "Exercice 6"],
    ],
    userConnected: {},
    campuses: [],
  }),

  async created() {
    // changer le titre
    document.title = "Root Track 04";
    // fonction qui permet d'afficher des messages en snackbar
    const context = this;
    Vue.prototype.$showSnackbar = async function (text) {
      context.snackbarEnabled = true;
      context.snackbarText = text;
    };

    Vue.prototype.$updateUserConnected = async function (user) {
      context.userConnected = user;
    };
  },

  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    },

    monTest() {
      console.log("fhugihg");
    },
  },
};
</script>
<style>
a {
  text-decoration: none;
}

.more:hover {
  color: grey;
  cursor: pointer;
}
.background-container {
  background-color: #f2f2fb;
}
</style>
