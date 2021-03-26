<template>
  <div>
    <h2>Exercice 6</h2>
    <br />
    <br />
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
  </div>
</template>

<script>
export default {
  name: "Exercice6Page",
};
</script>

<style scoped>
</style>
