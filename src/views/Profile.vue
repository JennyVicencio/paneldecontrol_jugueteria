<template>
   <div class="container">
      <div class="profile is-half" v-if="getUser">
         <h1 class="title profile__title has-text-centered">Tu perfil</h1>
         <h1 class="my-3">Bienvenido/a, {{getUser.displayName ? getUser.displayName : 'Anónimo/a'}}</h1>
         <div class="card my-3 columns is-desktop">
            <div class="card-image column">
               <img alt="avatarUser" :src="getUser.photoURL ? getUser.photoURL : 'https://firebasestorage.googleapis.com/v0/b/sist-inventario-otto-klaus.appspot.com/o/anonymous-user.png?alt=media&token=32d5ffa2-bd37-4a1b-b03f-60ddb9e184f0' ">
            </div>
            <div class="card-content column">
               <p class="title is-4">{{getUser.displayName}}</p>
               <p class="subtitle">{{ !getUser.isAnonymous ? 'Administrador' : 'Usuario no identificado'}}</p>
               <hr class="card-divider">
               <p class="subtitle is-6">{{getUser.email}}</p>
            </div>
         </div>
         <div v-if="!getUser.isAnonymous">
            <b-button type="is-warning" size="is-small" v-if="!getUser.emailVerified" @click="verificationEmail">
               <b-icon icon="user-times" size="is-small"></b-icon>
               <span>Enviar verificación</span>
            </b-button>
            <b-button type="is-success" size="is-small" v-else disabled>
               <b-icon icon="user-check" size="is-small"></b-icon>
               <span>Verificado</span>
            </b-button>
         

         <hr class="divider">
         <b-button 
            type="is-dark" 
            size="is-medium"
            icon-left="edit"
            expanded
            @click="activateModal(getUser.displayName, getUser.email, getUser.photoURL)"
         >Editar perfil
         </b-button>
         </div>

         <!------- Modal editar producto ------->
         <b-modal 
               v-model="modalEditarUsuario"
               auto-focus
               :width="640"
            >
         <!-- enviando producto a modal de editar a través de props -->
            <EditProfile
               :displayNameProp="dataUsername"
               :emailProp="dataEmail" 
               :avatarProp="dataPhoto" 
            />
         </b-modal>
      </div>

      <div class="noProfile" v-else>
         <h1 class="my-3">Bienvenido/a, visitante</h1>
         <b-message type="is-danger" has-icon icon="exclamation-circle" size="is-large">
            No has iniciado sesión para ver tu perfil. 
         </b-message>
      </div>
   </div>
</template>

<script>
import { mapGetters } from "vuex";
import EditProfile from '@/components/editProfile.vue';

   export default {
  components: { EditProfile },
      name: 'Profile',
      data() {
         return {
            modalEditarUsuario: false,
            // datos a enviar a editar al modal
            dataUsername: '',
            dataEmail: '',
            dataPhoto: '',
         }
      },
      computed: {
         ...mapGetters(['getUser']),

      },
      methods: {
         verificationEmail() {
            if (!this.getUser.emailVerified) {
            // envía correo de verificación de cuenta
            this.getUser.sendEmailVerification().then(() => {
               console.log("El correo de verificación ha sido enviado.");
               this.notVerified();
            }).catch((error) => {
               console.error(error)
            }); 
            } 
            else {
               console.log("Este usuario ya fue verificado.");
               this.verified();
            }
         },
         notVerified() {
            this.$buefy.toast.open({
               message: '¡El correo de verificación ha sido enviado!',
               type: 'is-success'
            })
         },
         verified() {
            this.$buefy.toast.open({
               message: '¡Tu cuenta ya fue verificada!',
               type: 'is-success'
            })
         },
         activateModal(username, email, photo){
            this.modalEditarUsuario = true; // se activa modal de editar
            // y se envían datos al componente de modal por props
            this.dataUsername = username;
            this.dataEmail = email;
            this.dataPhoto = photo;
         }
      },
   }
</script>

<style lang="scss">
.profile{
   padding: 80px 0;
   margin: 0 auto;
   width: 60%;
   img {
      width: 100%;
   }
}
.noProfile {
   padding: 10% 0;
   width: 80%;
   margin: 0 auto;
}

</style>