import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null, // usuario activo
    inventory: [], // arreglo con inventario de juguetes en stock
  },
  getters:{
    getUser(state){
      return state.user;
    },
    getInventory(state){
      return state.inventory;
    },
  },
  mutations: {
    mutateUser(state, userData){
      state.user = userData; 
    },
    mutateInventory(state, stock){
      state.inventory = stock;
    },
  },
  actions: {
    user({commit}, userData){
      commit('mutateUser', userData);
    },
    dbInventory({commit}){
      // Usando onSnapshot para mostrar datos del stock en tiempo real
      firebase.firestore().collection('juguetes').onSnapshot((resp) => {
        let toys = [];
        resp.forEach(element => {
          toys.push({
            id: element.id,
            codigo: element.data().codigo,
            nombre: element.data().nombre,
            stock: element.data().stock,
            precio: element.data().precio,
            imagen: element.data().imagen,
          })
        })
        console.log("Inventario:");
        console.table(toys); // mostrando stock disponible en consola
        commit('mutateInventory', toys);
      }, 
      error => console.error(error));
    },
    updateProduct(context, toy){
      // actualizando colección 'juguetes' de firebase
      firebase.firestore().collection('juguetes').doc(toy.id).update(
        { 
          codigo: toy.codigo,
          nombre: toy.nombre,
          stock: toy.stock,
          precio: toy.precio,
          imagen: toy.imagen
        }
      )
      .then(()=> console.log("El producto seleccionado se ha actualizado."))
      .catch(error => console.error(error));
    },
    deleteProduct(context, uid){
      // borrando juguete de colección 'juguetes' de firebase
      firebase.firestore().collection('juguetes').doc(uid)
        .delete()
        .then(() => console.log("El producto seleccionado se ha eliminado."))
        .catch(error => console.error(error));
    },
    addProduct(context, toy){
      // agregando nuevo juguete a colección 'juguetes' de firebase
      firebase.firestore().collection('juguetes').add(
        {
          codigo: toy.codigo,
          nombre: toy.nombre,
          stock: toy.stock,
          precio: toy.precio,
          imagen: toy.imagen
        }
      )
      .then(() => console.log("Se ha añadido un nuevo producto."))
      .catch(error => console.error(error));
    },
    updateProfile(context, profile){
      // actualizando perfil de usuario
      var user = firebase.auth().currentUser;
      // actualizando nombre y avatar
      user.updateProfile(
        {
          displayName: profile.displayName,
          photoURL: profile.avatar
        }
      )
      .then(() => console.log("El perfil se ha actualizado."))
      .catch(error => console.error(error));
      
      // actualizando correo
      user.updateEmail(profile.email)
      .then(() => console.log("El correo se ha actualizado."))
      .catch(error => console.error(error));
    },
  },
})
