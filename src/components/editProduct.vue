<template>
   <section class="editToy modal-card">
      <header class="modal-card-head">
         <div class="modal-card-title">
            <h3 class="title">Editar producto: {{codigoProp}}</h3>
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
            <b-numberinput v-model="stock" placeholder="10" :min="0"></b-numberinput>
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
               class="button is-success is-outlined mt-3"
               label="Cerrar"
               @click="$parent.close()" />
            <b-button 
               class="button is-success mt-3" 
               label="Editar"
               @click="editToy();" />
               <!-- evento ejecuta función de editar juguete y a la vez cierra el modal -->
         </footer>
   </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
   name: 'EditProduct',
   props: { // datos del producto recibidos del parent "Products"
      idProp: {
         type: String,
         required: true
      },
      codigoProp: {
         type: String,
         required: true
      },
      nombreProp: {
         type: String,
      },
      stockProp: {
         type: Number,
      },
      precioProp: {
         type: Number,
      },
      imagenProp: {
         type: String,
      }
   },
   data() {
      return {
         labelPosition: 'default',
         id: this.idProp,
         codigo: this.codigoProp,
         nombre: this.nombreProp,
         stock: this.stockProp,
         precio: this.precioProp,
         imagen: this.imagenProp
      }
   },
   computed: {
   ...mapGetters(['getInventory']),
   },
   methods: {
      editToy(){
         if (this.codigo.length >= 3 && this.nombre.length >= 5 && this.stock >= 0 && this.precio >= 990) {
            let juguete = {
               id: this.id,
               codigo: this.codigo,
               nombre: this.nombre,
               stock: this.stock,
               precio: this.precio,
               imagen: this.imagen
            };
            this.$store.dispatch('updateProduct', juguete);
            this.$parent.close();
            this.success();
         }
         else {
            console.log("No se puede editar producto.");
            this.danger();
         }
      },
      success() {
         this.$buefy.toast.open({
            duration: 4000,
            message: `Producto editado con éxito.`,
            position: 'is-bottom',
            type: 'is-success'
         })
      },
      danger() {
         this.$buefy.toast.open({
            duration: 4000,
            message: `Parece que no has completado todos los campos o has ingresado un valor no válido`,
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