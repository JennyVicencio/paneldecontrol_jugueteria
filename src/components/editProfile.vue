<template>
   <section class="editToy modal-card">
      <header class="modal-card-head">
         <div class="modal-card-title">
            <h3 class="title">Editar Perfil:</h3>
         </div>
      </header>
      <div class="modal-card-body">
         <b-field label="Nombre de usuario" :label-position="labelPosition">
            <input class="input is-info" rounded v-model="displayName">
         </b-field>

         <b-field label="Correo electrónico" :label-position="labelPosition">
            <input class="input is-success" v-model="email" maxlength="40">
         </b-field>
         
         <b-field label="Avatar" type="input is-warning" :label-position="labelPosition">
            <b-input v-model="avatar" placeholder="http://"></b-input>
         </b-field>

      </div>
         <footer class="modal-card-foot">
            <b-button
               class="button is-dark is-outlined mt-3"
               label="Cerrar"
               @click="$parent.close()" />
            <b-button 
               class="button is-dark mt-3" 
               label="Editar"
               @click="editUser()" />
               <!-- evento ejecuta función de editar juguete y a la vez cierra el modal -->
         </footer>
   </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
   name: 'EditProfile',
   props: { // datos del producto recibidos del parent "Products"
      displayNameProp: {
         type: [String, null],
      },
      emailProp: {
         type: String,
         required: true
      },
      avatarProp: {
         type: String,
      }
   },
   data() {
      return {
         labelPosition: 'default',
         displayName: this.displayNameProp,
         email: this.emailProp,
         avatar: this.avatarProp
      }
   },
   computed: {
   ...mapGetters(['getUser', 'getInventory']),
   },
   methods: {
      editUser(){
         if (this.displayName.length >= 4 && this.email.length >= 5) {
            let perfil = {
               displayName: this.displayName,
               email: this.email,
               avatar: this.avatar
            };
            this.$store.dispatch('updateProfile', perfil);
            this.$parent.close();
            this.success();
            setTimeout(() => {
               location.reload(); // refrescando la pagina con nuevos datos
            }, 2000);
            
         }
         else {
            console.log("No se puede editar usuario.");
            this.danger();

         }
      },
      success() {
         this.$buefy.toast.open({
            duration: 4000,
            message: `Perfil editado con éxito.`,
            position: 'is-top',
            type: 'is-dark'
         })
      },
      danger() {
         this.$buefy.toast.open({
            duration: 4000,
            message: `Debes completar al menos el nombre y el correo.`,
            position: 'is-bottom',
            type: 'is-danger'
         })
      },
   }
}
</script>

<style>
.editToy{
   padding: 20px 40px;
}
</style>