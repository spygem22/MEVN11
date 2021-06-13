<template>
  <v-data-table
    :headers="headers"
    :items="user"
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
          
          <v-card class="elevation-12">
            <v-card-title class="success headline">
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
                  
              <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                 <v-col cols="16" sm="8" md="10">
                  <v-form ref="form" enctype="multipart/form-data">
                    <v-text-field
                      v-model="editedItem.firstname"
                      label="Firstname"
                      name="Firstname"
                      prepend-icon="person"
                      type="text"
                      color="teal accent-5"
                    />
                  
                    <v-text-field
                      v-model="editedItem.lastname"
                      label="Lastname"
                      name="Lastname"
                      prepend-icon="person"
                      type="text"
                      color="teal accent-5"
                    />
                  
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                      name="Email"
                      prepend-icon="email"
                      type="text"
                      color="teal accent-5"
                    />
                  
                    <v-text-field
                      v-model="editedItem.phonenumber"
                      label="Phonenumber"
                      name="Phonenumber"
                      prepend-icon="phone"
                      color="teal accent-5"
                      text="number"
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
</template>
<script>
import API from '../../api'
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
       
        { text: 'Firstname', value: 'firstname' },
        { text: 'Lastname', value: 'lastname' },
        { text: 'Email', value: 'email' },
        { text: 'Phonenumber', value: 'phonenumber', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      user: [],
      editedIndex: -1,
      editedItem: {
        firsname: '',
        lastname: '',
        email: '',
        phonenumber: '',

      },
      defaultItem: {
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: '',
        
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