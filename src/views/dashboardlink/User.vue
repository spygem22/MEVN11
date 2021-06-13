<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app >
       <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Sandra Adams
              </v-list-item-title>
              <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
       <v-divider></v-divider>
       <v-list dense>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(item, i) in items"
          :key="i" :to = "item.link" link
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    </v-navigation-drawer>

    <v-app-bar app >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Simple Application</v-toolbar-title>
    </v-app-bar>


 
    
    <v-data-table
    :headers="headers"
    :items="user"
    :search="search"
    sort-by="id"
    class="elevation-1"
  >
    
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >


            <template v-slot:activator="{ on }">
            <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
           ></v-text-field>
          </template>

          <v-card class="elevation-12">
            <v-card-title class="success headline">
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
                  
              <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                 <v-col cols="16" sm="8" md="10">
                  <v-form ref="form" enctype="multipart/form-data">
                    <v-text-field
                      v-model="editedItem.fullname"
                      label="Fullname"
                      name="Fullname"
                      prepend-icon="person"
                      type="text"
                      color="teal accent-5"
                    />
                  
                     <v-col
                      class="d-flex"
                      cols="16"
                       sm="7"
                        >
                        <v-select
                       :items="gen"
                       label="Gender"
                       prepend-icon="person"
                       type="text"
                       color="teal accent-5"
                       name="Gender"
                       v-model="editedItem.gender"
                        ></v-select>
                        </v-col>
                  
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                      name="Email"
                      prepend-icon="email"
                      type="text"
                      color="teal accent-5"
                    />
                  
                    <v-text-field
                      v-model="editedItem.address"
                      label="Address"
                      name="Address"
                      prepend-icon="home"
                      color="teal accent-5"
                      text="text"
                    />
                  </v-form>
                </v-col>
               </v-row>
            </v-container>
               
            
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="#00ffff"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="error headline">Delete user</v-card-title>
              <v-card-text >Are you sure you want to delete this item?</v-card-text>
              <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#00ffff" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="#ff4040" text @click="deleteItemConfirm">Delete confirm</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        color="cyan"
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        color="#ff4060"
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>

  </v-app>
</template>

<script>
import API from '../../api'
  export default {
    data: () => ({
      drawer: null,
       items: [
        { title: 'Dashboard', icon: 'mdi-home', link: "/dashboard" },
        { title: 'About', icon: 'mdi-help-box', link: "/about" },
        { title: 'User', icon: 'mdi-account-group-outline', link: "/user" },
        { title: 'Logout', icon: 'mdi-key', link: "/"}
      ],
      gen:['Male','Female'],
      dialog: false,
      dialogDelete: false,
      headers: [
       
        { text: 'Fullname', value: 'fullname' },
        { text: 'Gender', value: 'gender' },
        { text: 'Email', value: 'email' },
        { text: 'Address', value: 'address', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      user: [],
      search: '',
      editedIndex: -1,
      editedItem: {
        fullname: '',
        gender: '',
        email: '',
        address: '',

      },
      defaultItem: {
        fullname: '',
        gender: '',
        email: '',
        address: '',
        
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '' : 'Update User'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

   async created () {
      this.user = await API.getUser()
    //   .then(response =>{
    //        console.log(response);
    //        this.user=response.data;
    //     })
    },
    methods: {
    //   async fetchUser(){
    //   this.user = await API.getUser()
    //    .then(response =>{
    //        console.log(response);
    //        this.user=response.data;
    //    })
    //    },
     
      editItem (item) {
        this.editedIndex = this.user.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

     deleteItem (item) {
        this.editedIndex = this.user.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        console.log('delete data')
        
      },

     async deleteItemConfirm () {
        this.user.splice(this.editedIndex, 1)
        this.closeDelete()
        await API.deleteUser(this.editedItem._id)
        .then( response=>{
            
            console.log(response)
        })
        .catch(err=>{console.log(err)})
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
         this.dialogDelete = false
          this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

    async save () {
        if (this.editedIndex > -1) {
            console.log('edited data')
            if(this.$refs.form.validate()){
            await API.updateUser(this.editedItem._id, this.editedItem)
            .then(response => {
                console.log(response)
                })
           .catch(error => {console.log(error.response)});
            }
          Object.assign(this.user[this.editedIndex], this.editedItem)
        } 
        this.close()
      },
    },
  }
</script>



















