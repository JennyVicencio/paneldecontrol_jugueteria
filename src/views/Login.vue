<template>
   <section class="login container columns is-mobile is-tablet is-desktop is-widescreen is-fullhd">
      <div class="login__box card column is-two-thirds-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-third-fullhd">
            <div class="login__logo">
               <img
                  src="./../assets/puzzle.png"
                  alt="Otto Klaus puzzle"
               />
            </div>
            <h1 class="title login__title has-text-centered">Ingresa a Otto Klaus</h1>
            <div class="login__form">
            <section class="modal-card-body">
               <b-field  
                  label="Correo"
                  :label-position="labelPosition"
                  type="is-info"
                  custom-class="is-large"
               >
                  <b-input 
                     v-model="correo"
                     type="email"
                     rounded
                     >
                  </b-input>
               </b-field>

               <b-field 
                  label="Contraseña"
                  :label-position="labelPosition"
                  type="is-info"
                  custom-class="is-large"
               >
                  <b-input 
                     v-model="contraseña" 
                     type="password" 
                     password-reveal
                     rounded
                     >
                  </b-input>
               </b-field>
               <b-checkbox>Recordarme</b-checkbox>
            </section>
            <b-button 
               type="is-info"
               tag="input"
               native-type="submit"
               value="Entrar" 
               @click="loginUser"
            />
            <p type="is-info" class="mt-3 is-size-7" @click="restoreUser">¿Olvidaste la contraseña? Recupérala <a @click="confirm">aquí.</a></p>
            
            <b-notification
               type="is-warning is-light"
               has-icon
               icon="user"
               aria-close-label="Close notification"
               role="alert"
               class="my-5 is-size-7">
               Si no tienes una cuenta, solicítala a un administrador o...
               <p>
                  <b-button class="mt-5"
                     type="is-warning"
                     tag="input"
                     native-type="submit"
                     value="Entrar como anónimo" 
                     @click="loginAnonymous"
                  />
               </p>
            </b-notification>
            </div>
      </div>
   </section>
</template>

<script>
import firebase from 'firebase';

   export default {
      name: 'Login',
      data() {
         return {
            correo: '',
            contraseña: '',
            labelPosition: 'on-border'
         }
      },
      methods: {
         loginUser() {
            if (this.correo && this.contraseña.length >= 6) {
            // metodo que permite ingresar con usuario(correo electrónico) y contraseña
               firebase.auth().signInWithEmailAndPassword(this.correo, this.contraseña)
               .then((result) => {
                  console.log(`UID: ${result.user.uid}`);
                  console.log(`Usuario: ${result.user.displayName}`);
                  console.log(`Correo: ${result.user.email}`);
                  console.log(`Avatar: ${result.user.photoURL}`);
                  console.log(`Verificado: ${result.user.emailVerified}`);
                  console.log("Sesión iniciada.");
                  this.$router.push({name: 'Profile'}); // enviamos al usuario a la vista de perfil
                  this.success();
                  // setTimeout(() => {
                  //    location.reload();
                  // }, 500);                  
               })
               .catch((error) => {
                  console.error(error.code);
                  console.error(error.message);
               });
            } 
            else {
               console.log("No se pudo iniciar sesión.");
            }
         },
         loginAnonymous() {
            firebase.auth().signInAnonymously()
               .then(() => {
                  // Signed in..
                  console.log("Sesión iniciada como anónimo.");
                  this.$router.push({name: 'Profile'}); // enviamos al usuario a la vista de perfil
                  this.success();
                  // location.reload();
               })
               .catch((error) => {
                  console.error(error.code);
                  console.error(error.message);
               })
         },
         restoreUser() {
         // envía correo de recuperación
            firebase.auth().sendPasswordResetEmail(this.correo).then(() => {
            console.log("Correo de recuperación enviado.");
            }).catch((error) => {
               console.error(error);
            });
         },
         // métodos de Buefy
         success() {
            this.$buefy.toast.open({
               message: '¡Has ingresado correctamente!',
               type: 'is-success'
            })
         },
         confirm() {
            this.$buefy.dialog.confirm({
               message: 'Te enviaremos un correo de recuperación. ¿Te parece bien?',
               type: 'is-warning',
               onConfirm: () => {
                  this.restoreUser();
                  this.$buefy.toast.open('Correo de recuperación enviado.')
               }
            })
         },
      }
   }
</script>

<style lang="scss">
.login {
   padding: 80px 0;
   &__box{
      background-color: white;
      margin: auto;
      padding: 20px;
   }
   &__logo{
      width: 150px;
      margin: auto;
   }
   &__form {
      margin: 0 auto;
      text-align: center;
   }
}
</style>