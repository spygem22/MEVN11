<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-card
    class="mx-auto"
    max-width="434"
    tile
  >
    <v-img
      height="100%"
      src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
    >
      <v-row
        align="end"
        class="fill-height">
        <v-col
          align-self="start"
          class="pa-0"
          cols="12"
        >
          <v-avatar
            class="profile"
            color="grey"
            size="164"
            tile
          >
            <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
          </v-avatar>
        </v-col>
        <v-col class="py-0">
          <v-list-item
            color="rgba(0, 0, 0, .4)"
            dark
            v-if="user"
          >
            <v-list-item-content >
              <v-list-item-title class="text-h6">
                {{user.fullname}}
              </v-list-item-title>
              <v-list-item-subtitle>Network Engineer</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
       <v-divider></v-divider>
       <v-list dense>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(item, i) in items"
          :key="i" :to = "item.link" link
        >
          <v-list-item-icon>
            <v-icon color="#5f00f0" v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title">
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-list dense>
      <v-list-item-group color="primary" v-if="isLoggedIn">
        <v-list-item @click.prevent="logoutUser"
          v-for="(lg, i) in logout1"
          :key="i" :to = "lg.link" link 
        >
          <v-list-item-icon>
            <v-icon color="#5f00f0" v-text="lg.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="lg.title">
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
         
      <v-toolbar-title>Simple Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
  export default {
    
    data: () => ({ 
      drawer: null,
       items: [
        { title: 'Dashboard', icon: 'mdi-home', link: "/dashboard" },
        { title: 'About', icon: 'mdi-help-box', link: "/about" },
        { title: 'User', icon: 'mdi-account-group-outline', link: "/user" },
      ],
      logout1:[
      { title: 'Logout', icon: 'mdi-key', link: "/home"}],
      users: [],
      }),
   computed: {
    ...mapGetters(["isLoggedIn", "user"]),
    },
  
    methods: {
    ...mapActions(["logout", "getProfile"]),

    logoutUser() {
      this.logout();
    },
   created() {
     this.getProfile();
   }
  },
  



  }
</script>