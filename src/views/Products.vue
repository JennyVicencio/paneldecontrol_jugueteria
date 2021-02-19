<template>
   <div class="container">
      <div class="products" v-if="getUser">
         <h1 class="title products__title has-text-centered">Productos en stock</h1>
         
         <b-table class="products__table" 
            :data="getInventory"
            :loading="isLoading"
            :paginated="isPaginated"
            :per-page="perPage"
            :current-page.sync="currentPage"
            :pagination-simple="isPaginationSimple"
            :pagination-position="paginationPosition"
            :default-sort-direction="defaultSortDirection"
            default-sort="codigo"
            :pagination-rounded="isPaginationRounded"
            :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize"
            :opened-detailed="defaultOpenedDetails"
            hoverable
            detailed
            detail-key="codigo"
            @details-open="(row, index) => $buefy.toast.open(`Detalles de ${row.nombre}`)"
            :show-detail-icon="showDetailIcon"
            >
         
         <b-message type="is-info">
            Aquí puedes ver el producto con sus detalles, presionando el ícono de la flecha en la fila seleccionada.
            Además, puedes agregar nuevos productos, editarlos y eliminarlos.
         </b-message>

            <b-table-column field="codigo" label="Código" width="100" sortable searchable v-slot="props">
                {{ props.row.codigo }}
            </b-table-column>

            <b-table-column field="nombre" label="Nombre" sortable searchable v-slot="props">
                {{ props.row.nombre }}
            </b-table-column>

            <b-table-column field="stock" label="Cantidad" sortable width="120" numeric searchable v-slot="props">
                <span :class="
                        [
                            'tag',
                            {'is-danger': props.row.stock <= 10},
                            {'is-warning': props.row.stock <= 50},
                            {'is-success': props.row.stock > 50}
                        ]"> 
                  {{ props.row.stock }} 
               </span>
            </b-table-column>

            <b-table-column field="precio" label="Precio" sortable width="120" numeric searchable v-slot="props">
                {{ props.row.precio }}
            </b-table-column>

            <b-table-column  field="" label="Acciones" centered width="240" v-slot="props">
               <b-button size="is-small" class="m-1"
                  type="is-success"
                  icon-left="edit"
                  @click="activateModal(props.row.id, props.row.codigo, props.row.nombre, props.row.stock, props.row.precio, props.row.imagen)">
               Editar
               </b-button>

               <b-button size="is-small" class="m-1"
                  type="is-danger"
                  icon-left="trash-alt"
                  @click="delProduct(props.row.id)">
               Borrar
               </b-button>
            </b-table-column>

            <template #detail="props">
               <article class="media">
               <td v-if="showDetailIcon">
                  <b-image 
                  :src="props.row.imagen" 
                  :alt="props.row.codigo" 
                  >
                  </b-image>
               </td>  
               </article>
            </template>

            <!------- Botón agregar nuevo producto ------->
            <b-button size="is-small" class="my-3"
               type="is-info"
               icon-left="plus-circle"
               @click="modalAgregar = true">
            Agregar producto
            </b-button>

         </b-table>
   <!------------------ fin de la tabla ----------------------->
            
         <!------- Modal nuevo producto ------->
         <b-modal 
               v-model="modalAgregar"
               auto-focus
               :width="640"
            >
            <AddProduct/>
         </b-modal>

         <!------- Modal editar producto ------->
         <b-modal 
               v-model="modalEditar"
               auto-focus
               :width="640"
            >
         <!-- enviando producto a modal de editar a través de props -->
            <EditProduct
               :idProp="dataId"
               :codigoProp="dataCodigo" 
               :nombreProp="dataNombre" 
               :stockProp="dataStock"
               :precioProp="dataPrecio"
               :imagenProp="dataImagen"
            />
         </b-modal>
      </div>

      <div class="noAdmin" v-else>
         <b-message type="is-danger" has-icon icon="exclamation-circle" size="is-large">
            No has iniciado sesión como administrador para ver contenido.
         </b-message>
      </div>
   </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddProduct from '@/components/addProduct.vue';
import EditProduct from '@/components/editProduct.vue';

   export default {
      name: 'Products',
      components: { AddProduct, EditProduct },
      data() {
         return {
            // buefy table
               isPaginated: true,
               isPaginationSimple: false,
               isPaginationRounded: true,
               paginationPosition: 'bottom',
               defaultSortDirection: 'asc',
               sortIcon: 'arrow-up',
               sortIconSize: 'is-small',
               currentPage: 1,
               perPage: 8,
               defaultOpenedDetails: [1],
               showDetailIcon: true,
            // buefy loading
               isLoading: false,
               isFullPage: false,
            // modals agregar y editar producto
               modalAgregar: false,
               modalEditar: false,
            // datos a enviar a editar al modal
               dataId: '',
               dataCodigo: '',
               dataNombre: '',
               dataStock: 0,
               dataPrecio: 0,
               dataImagen: ''
         }
      },
      computed: {
      ...mapGetters(['getUser', 'getInventory']),
      },
      methods: {
         delProduct(id){
            this.confirmProductDelete(id);
         },
         confirmProductDelete(id) {  // confirmación de eliminación
            this.$buefy.dialog.confirm({
               title: 'Eliminar producto',
               message: '¿Estás seguro/a de eliminar este producto? Esta acción no se puede deshacer.',
               confirmText: 'Eliminar',
               cancelText: 'Cancelar',
               position: 'is-bottom',
               type: 'is-danger',
               hasIcon: true,
               onConfirm: () => {
                  this.$buefy.toast.open({
                     duration: 4000,
                     message: `Producto eliminado con éxito.`,
                     position: 'is-bottom',
                     type: 'is-danger'
                  })
                  this.$store.dispatch('deleteProduct', id); //eliminando
               }
            })
         },
         openLoading(){
                this.isLoading = true;
                setTimeout(() => {
                    this.isLoading = false;
                }, 3000);
         },
         toggle(row) {
               this.$refs.table.toggleDetails(row)
         },
         activateModal(id, code, name, stock, price, img){
            this.modalEditar = true; // se activa modal de editar
            // y se envían datos al componente de modal por props
            this.dataId = id;
            this.dataCodigo = code;
            this.dataNombre = name;
            this.dataStock = stock;
            this.dataPrecio = price;
            this.dataImagen = img;
         }
      },
      mounted() {
         this.openLoading();
      },
   }
</script>

<style lang="scss">
.products{
   padding: 80px 0;
   &__table{
      width: 80%;
      margin: 0 auto;
      text-align: left;
   }
}
.noAdmin{
   padding: 10% 0;
   width: 80%;
   margin: 0 auto;
}
</style>