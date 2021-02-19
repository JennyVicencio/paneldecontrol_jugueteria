<template>       
   <div class="user-menu m-3">

   <!----- si ha ingresado ----->
      <b-dropdown v-if="activeUser"                    
         v-model="navigation"
         position="is-bottom-left"
         aria-role="list">
         <button class="button is-warning" slot="trigger" slot-scope="{ active }">
            <span class="mr-2">
               <b-image v-if="!getUser.isAnonymous"
                  :src="getUser.photoURL"
                  class="image is-24x24"
                  rounded bordered
                  >
               </b-image>
               <b-image v-else
                  src="https://firebasestorage.googleapis.com/v0/b/sist-inventario-otto-klaus.appspot.com/o/anonymous-user.png?alt=media&token=32d5ffa2-bd37-4a1b-b03f-60ddb9e184f0"
                  class="image is-24x24"
                  rounded bordered>
               </b-image>
            </span>
            <span v-if="!getUser.isAnonymous"> {{ getUser.displayName ? getUser.displayName : getUser.email }} </span>
            <span v-else> Anónimo </span>
            <b-icon :icon="active ? 'chevron-up' : 'chevron-down'"></b-icon>
         </button>

         <b-dropdown-item custom aria-role="menuitem" v-if="!getUser.isAnonymous">
           <p class="is-size-6"> Registrado como <b>{{ getUser.displayName }}</b></p>
           <p class="is-size-7"> {{ getUser.email }} </p>
         </b-dropdown-item>
         <b-dropdown-item custom aria-role="menuitem" v-else>
            Eres <b>Anónimo</b>
         </b-dropdown-item>

         <hr class="dropdown-divider" aria-role="menuitem">
         <b-dropdown-item has-link value="perfil" aria-role="menuitem">
            <router-link :to="{name: 'Profile'}">
               <b-icon icon="user"></b-icon>
               Perfil
            </router-link>
         </b-dropdown-item>

         <b-dropdown-item has-link value="logout" aria-role="menuitem"              
            @click="logoutUser">
            <a>
               <b-icon icon="sign-out-alt"></b-icon>
               Cerrar sesión
            </a>
         </b-dropdown-item>
      </b-dropdown>
   <!----- si no ha ingresado ----->
      <b-dropdown v-else
         v-model="navigation"
         position="is-bottom-left"
         aria-role="list">
         <button class="button is-warning" slot="trigger" slot-scope="{ active }">
            <span icon="link">Visitante</span>
            <b-icon :icon="active ? 'chevron-up' : 'chevron-down'"></b-icon>
         </button>
   
         <b-dropdown-item has-link value="login" aria-role="menuitem">
            <router-link :to="{name: 'Login'}">
            <b-icon icon="sign-in-alt"></b-icon>
            Iniciar sesión
            </router-link>
         </b-dropdown-item>

      </b-dropdown>
   </div>
</template>

<script>
import firebase from 'firebase';
import { mapGetters } from "vuex";

   export default {
      name: 'Menu',
      data() {
            return {
                navigation: 'home'
            }
      },
      computed: {
         ...mapGetters(['getUser']),
      activeUser(){ 
         return this.getUser;
      }
      },
      methods: {
         logoutUser() {
            firebase.auth().signOut().then(() => {
               console.log("Se ha cerrado la sesión.");
               this.success();
               this.$router.replace({name: 'Login'});
            }).catch((error) => {
               console.error(error);
            });
         },
         success() {
            this.$buefy.toast.open({
               message: '¡Has salido correctamente!',
               type: 'is-success'
            })
         },
      },
      mounted() {
         this.activeUser();
      },
   }
</script>

<style lang="scss">
.user-menu{
   position: absolute;
   top: 0;
   right: 0;
   height: 80px;
}
</style>