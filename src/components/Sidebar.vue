<template>
  <div class="sidebar-page">
        <section class="sidebar-layout">
             <b-sidebar
                position="static"
                :mobile="mobile"
                :expand-on-hover="expandOnHover"
                :reduce="reduce"
                :fullheight="fullheight"
                :overlay="overlay"
                type="is-dark"
                open
            >
                <div class="p-1">
                    <router-link :to="{name: 'Home'}">
                      <div class="block my-3">
                      <img
                          src="./../assets/logo.png"
                          alt="Otto Klaus"
                      />
                      </div>
                    </router-link>
                    <b-menu class="is-custom-mobile">
                        <b-menu-list label="Menú">
                              <b-menu-item
                                icon="home"
                                label=" Inicio"
                                tag="router-link"
                                :to="{name: 'Home'}"
                              >
                              </b-menu-item>
                              <b-menu-item
                                icon="info"
                                label=" Acerca de"
                                pack="fas"
                                tag="router-link"
                                :to="{name: 'About'}"
                              >
                              </b-menu-item>
                          <b-menu-item active 
                            icon="user-cog" 
                            label=" Administración"
                            >
                              <b-menu-item 
                                icon="th-list" 
                                label=" Productos"
                                tag="router-link"
                                :to="{name: 'Products'}"
                                >
                              </b-menu-item>
                          </b-menu-item>
                          <b-menu-item icon="user-alt" label=" Mi cuenta">
                              <b-menu-item 
                                pack="far"
                                icon="user" 
                                label="Perfil"
                                tag="router-link"
                                :to="{name: 'Profile'}"
                              >
                              </b-menu-item>
                          </b-menu-item>
                        </b-menu-list>
                        <b-menu-list>
                          <b-menu-item icon="link" label=" Links">
                            <b-menu-item 
                              icon="link" 
                              label=" Buefy" 
                              target="_blank" 
                              href="https://buefy.org">
                            </b-menu-item>
                            <b-menu-item 
                              icon="link" 
                              label=" Vue" 
                              target="_blank" 
                              href="https://vuejs.org">
                            </b-menu-item>
                            <b-menu-item 
                              icon="link" 
                              label=" DL" 
                              target="_blank" 
                              href="https://desafiolatam.com">
                            </b-menu-item>
                          </b-menu-item>
                        </b-menu-list>
                    </b-menu>
                </div>
            </b-sidebar>
            
            <!------------------ Aquí se muestran las vistas --------------------->
            <transition name="component-fade" mode="out-in">
              <router-view/>
            </transition>
        </section>
    </div>
</template>

<script>
import firebase from 'firebase';
import { mapGetters } from "vuex";

export default {
  name: 'Sidebar',
  data() {
    return {
        expandOnHover: true,
        mobile: 'reduce',
        reduce: true,
        fullheight: true,
        overlay: false
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
  }
};
</script>

<style lang="scss">
//importando variables de Bulma
@charset "utf-8";
@import "../../node_modules/bulma/bulma.sass";

.p-1 {
  padding: 1em;
  h2{
    color: $link;
  }
}
.sidebar-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 50;
  //min-height: 100%;
  min-height: 100vh;
  .sidebar-layout {
    display: flex;
    flex-direction: row;
    //min-height: 100%;
    min-height: 100vh;
  }
}
@media screen and (max-width: 1023px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini-mobile {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>