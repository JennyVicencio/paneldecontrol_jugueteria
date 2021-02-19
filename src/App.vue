<template>
  <div id="app">
    <Sidebar/>
    <Menu/>
    <!-- dentro del sidebar está el router-view -->
  </div>
</template>
<script>
import firebase from 'firebase';
import Sidebar from '@/components/Sidebar.vue'
import Menu from '@/components/Menu.vue'

export default {
  name: 'App',
  components: { Sidebar, Menu },
  created() {
    // Observando usuario actual
    //var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) { // si hay usuario registrado activo....
        if (user.isAnonymous){ // si hay usuario es anónimo....
          this.$store.dispatch('user', user);
          console.log(`Sesión iniciada | Usuario: Anónimo.`);
          console.log(user)
        } 
        else{
          this.$store.dispatch('user', user);
          console.log(`Sesión iniciada | Usuario: ${user.email}.`);
          console.log(user)
        }  
      }
      else {
        this.$store.dispatch('user', null); // si no está activo...
        console.log("Sesión no iniciada.");
        console.log(user)
      }
    });
    this.$store.dispatch('dbInventory');
  },
}
</script>
<style lang="scss">

//importando variables de Bulma
@charset "utf-8";
@import "../node_modules/bulma/bulma.sass";
#app{
  overflow-y: hidden;
}

body {
  background: url('./assets/bg-ottoklaus.png');
  background-size: cover;
}
.menu-list {
  & a {
    color: $light !important;
  }
  & a:hover {
    background-color: $text-light !important;
  }
  & a.is-active {
    background-color: $link !important;
  }
}
.login {
  & .a {
    color: $warning !important;
  }
}

.is-primary, .is-current {
  background-color: $link !important;
}

</style>
