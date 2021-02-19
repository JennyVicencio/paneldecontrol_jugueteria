<template>
   <section class="newToy modal-card">
      <header class="modal-card-head">
         <div class="modal-card-title">
            <h3 class="title">Agregar nuevo producto</h3>
         </div>
      </header>
      <div class="modal-card-body">
         <b-field label="Código" :label-position="labelPosition">
            <input class="input is-warning" rounded v-model="codigo">
         </b-field>

         <b-field label="Nombre de producto" :label-position="labelPosition">
            <input class="input is-success" v-model="nombre" maxlength="40">
         </b-field>
         
         <b-field label="Cantidad disponible" type="input is-info" :label-position="labelPosition">
            <b-numberinput v-model="stock" placeholder="50" :min="0"></b-numberinput>
         </b-field>

         <b-field label="Precio" type="input is-info" :label-position="labelPosition">
            <b-numberinput v-model="precio" placeholder="990" :min="990"></b-numberinput>
         </b-field>

         <b-field label="Imagen" type="input is-warning" :label-position="labelPosition">
            <b-input v-model="imagen" placeholder="http://"></b-input>
         </b-field>

      </div>
         <footer class="modal-card-foot">
            <b-button
               class="button is-info is-outlined mt-3"
               label="Cerrar"
               @click="$parent.close()" />
            <b-button 
               class="button is-info mt-3" 
               label="Agregar"
               @click="newToy();" />
               <!-- evento ejecuta función de agregar juguete y a la vez cierra el modal -->
         </footer>
         
   </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
   name: 'AddProduct',
   data() {
      return {
         labelPosition: 'default',
         codigo: '',
         nombre: '',
         stock: 10,
         precio: 990,
         imagen: ''
      }
   },
   computed: {
   ...mapGetters(['getInventory']),
   },
   methods: {
      newToy(){
         if (this.codigo.length >= 4 && this.nombre.length >= 5 && this.stock >= 0 && this.precio >= 990) {
               let juguete = {
                  codigo: this.codigo,
                  nombre: this.nombre,
                  stock: this.stock,
                  precio: this.precio,
                  imagen: this.imagen
               };
               this.$store.dispatch('addProduct', juguete);
               this.success();
               this.$parent.close();
               this.resetModal();
         }
         else {
               console.log("No se puede agregar producto.");
               this.danger();
         }
      },
      resetModal() {
         this.codigo = '',
         this.nombre = '';
         this.stock = 10;
         this.precio = 990;
         this.imagen = '';
      },
      success() {
         this.$buefy.toast.open({
            duration: 4000,
            message: `Producto añadido con éxito.`,
            position: 'is-bottom',
            type: 'is-info'
         })
      },
      danger() {
         this.$buefy.toast.open({
            duration: 4000,
            message: `Parece que no has completado todos los campos o has ingresado un dato no válido.`,
            position: 'is-bottom',
            type: 'is-danger'
         })
      }
   }
}
</script>

<style>
.newToy{
   padding: 20px 40px;
}
</style>