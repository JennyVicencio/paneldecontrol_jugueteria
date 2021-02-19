<template>
  <div class="container">
    <div class="home">
        <h1 class="title home_title has-text-centered">Bienvenido/a al sitio de Sistema de Inventario de...</h1>      
        <div class="home__image">
          <img alt="logo" src="../assets/logo.png">
        </div>

        <div class="notification is-success my-5">
          <p>En este sitio puedes administrar el stock de todos los productos disponibles en Otto Klaus. </p> 
          <p>Primero debes iniciar sesión como administrador para ver el contenido en inventario.</p> 
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
}
</script>
<style lang="scss">
.home{
   padding: 80px 0;
   width: 80%;
   margin: 0 auto;
   &__image{
      width: 50%;
      margin: 0 auto;
      img {
        -webkit-filter: drop-shadow(5px 5px 5px rgba(0,0,0,0.2));
        filter: drop-shadow(5px 15px 15px rgba(0,0,0,0.2));
      }
   }
}
  
</style>
