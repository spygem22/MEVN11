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
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            
           
                  <v-form ref="form" enctype="multipart/form-data">
                    <v-text-field
                      v-model="editedItem.firstname"
                      label="Firstname"
                    ></v-text-field>
                  
                    <v-text-field
                      v-model="editedItem.lastname"
                      label="Lastname"
                    ></v-text-field>
                  
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  
                    <v-text-field
                      v-model="editedItem.phonenumber"
                      label="Phonenumber"
                    ></v-text-field>

                    <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-5"
                            v-model="editedItem.password"
                          />

                           <v-text-field
                            id="password2"
                            label="Password2"
                            name="password2"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-5"
                            v-model="editedItem.password2"
                          />
                  </v-form>
                   
               
            
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
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
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
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
        { text: 'Phonenumber', value: 'phonenumber' },
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
        return this.editedIndex === -1 ? 'New Item' : 'Update User'
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

     async deleteItem (item) {
        this.editedIndex = this.user.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        console.log('delete data')
        await API.deleteUser(this.editedItem._id)
        .then( response=>{
            
            console.log(response)
        })
        .catch(err=>{console.log(err)})
        
      },

      deleteItemConfirm () {
        this.user.splice(this.editedIndex, 1)
        this.closeDelete()
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
        //    const Data = {
        //         'Firstname': this.editedItem.firstname,
        //         'Lastname': this.editedItem.lastname,
        //         'Email': this.editedItem.email,
        //         'Phonenumber': this.editedItem.phonenumber,
        //     }
        //    const formData = new FormData();
        //    formData.append('firstname', this.editedItem.firstname);
        //    formData.append('lastname', this.editedItem.lastname);
        //    formData.append('email', this.editedItem.email);
        //    formData.append('phonenumber', this.editedItem.phonenumber);
            if(this.$refs.form.validate()){
           await API.updateUser(this.editedItem._id, this.editedItem)
           .then(response => {
                console.log(response)
                })
           .catch(error => {console.log(error.response)});
            }
          Object.assign(this.user[this.editedIndex], this.editedItem)
        } else {
            console.log('created data')

           if(this.$refs.form.validate()){
     await API.addUser(this.editedItem)
      .then ((response) => {
      this.user.push(this.editedItem)
      console.log(response);
      window.alert('Register successfully saved');})
      .catch(err => { console.log(err)
       window.alert('Invalid Register'); })
      }
      
          
        }
        this.close()
      },
    },
  }
</script>