<template>
  <v-app id="inspire">
    <v-main>
    <v-img class="image" 
      src="https://res.cloudinary.com/diy4itsib/image/upload/v1620399447/pexels-cadeau-maestro-1170412_nstxhh.jpg"
    >
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-5">Sign in to Admin</h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="#0060ff" outlined>
                            <v-icon color="#0060ff">fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="red" outlined>
                            <v-icon color="red">fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="blue" outlined>
                            <v-icon color="blue">fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">Ensure your email for registration</h4>
                        <v-form ref="form" @submit.prevent="loginUser" enctype="multipart/form-data">
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="teal accent-5"
                             v-model="user.email"
                            :rules="user.emailRules"
                          />

                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            color="teal accent-5"
                            v-model="user.password"
                            :rules="user.passwordRules"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"
                          />
        
                        <h3 class="text-center mt-4">Forgot your password ?</h3>
                      <div class="text-center mt-3">
                      <v-btn type="submit"  rounded color="teal accent-5" dark>SIGN IN</v-btn>
                      </div>
                      </v-form>
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="4" class="teal accent-5">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Hello, Admin!</h1>
                        <h5
                          class="text-center"
                        >Enter your personal details and start journay with us</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-5">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Welcome Back!</h1>
                        <h5
                          class="text-center"
                        >To Keep connected with us please login with your personnel info</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">Sign in</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-5">Create Account</h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="#0060ff" outlined>
                            <v-icon color="#0060ff">fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="red" outlined>
                            <v-icon color="red">fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="blue" outlined>
                            <v-icon color="blue">fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">Ensure your email for registration</h4>
                        <v-form ref="form" enctype="multipart/form-data">
                          <v-text-field
                            label="Fullname"
                            name="Fullname"
                            prepend-icon="person"
                            type="text"
                            color="teal accent-5"
                            v-model="user.fullname"
                            :rules="user.Rules"
                          />
                         <v-col
                      class="d-flex"
                      cols="16"
                       sm="5"
                        >
                        <v-select
                       :items="gen"
                       label="Gender"
                       prepend-icon="person"
                       type="text"
                       color="teal accent-5"
                       name="Gender"
                       v-model="user.gender"
                       :rules="user.Rules"
                        ></v-select>
                         </v-col>
                         
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="teal accent-5"
                             v-model="user.email"
                            :rules="user.emailRules"
                          />
                          <v-text-field
                            type="text"
                            label="Address"
                            name="Address"
                            prepend-icon="home"
                            color="teal accent-5"
                             v-model="user.address"
                            :rules="user.Rules"
                          />

                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            color="teal accent-5"
                            v-model="user.password"
                            :rules="user.passwordRules"
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show ? 'text' : 'password'"
                            @click:append="show = !show"
                          />

                           <v-text-field
                            id="password2"
                            label="Password2"
                            name="password2"
                            prepend-icon="lock"
                            color="teal accent-5"
                            v-model="user.password2"
                            :rules="user.passwordRules"
                            :type="show ? 'text' : 'password'"
                            @click:append="show = !show"
                          />
                        </v-form>
                      <div class="text-center mt-n5">
                        <v-btn type="submit"  @click="register" rounded color="teal accent-5 mt-5" dark>SUBMIT</v-btn>
                      </div>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      </v-img>
    </v-main>
  </v-app>
</template>

<script>
import router from '../router'
import API from '../api'
import { mapActions } from "vuex";
export default {
  data(){
    return{
    gen:['Male','Female'],
    show1:false,
    show: false,
    password: 'Password',
    step: 1,
    user:{
    fullname:'',
    gender:'',
    address:'',
    Rules: [
        v => !!v || 'This field is required',
      ],
      gender:'',
  
  
    email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
      ],

      password:'',
       passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password must have 8+ characters',
      v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must contain at least lowercase letter, one number, a special character and one uppercase letter',
  ],
   password2:'',
   }
   
   }
   
  },
 
  methods:{
   async register(){
     //console.log(this.user.firstname, this.user.lastname, this.user.email, this.user.phonenumber, this.user.password, this.user.password2)
      // const formData = new FormData();
      //    formData.append('firstname', this.user.firstname);
      //    formData.append('lastname', this.user.lastname);
      //    formData.append('email', this.user.email);
      //    formData.append('phonenumber', this.user.phonenumber);
      //    formData.append('password', this.user.password);
      //    formData.append('password2', this.user.password2);
      if(this.$refs.form.validate()){
     await API.addUser(this.user)
      .then ((response) => {
      console.log(response);
      window.alert('Register successfully saved');})
      .catch(err => { console.log(err)
       window.alert('Invalid Register');
      })
      }
      
    },
//  async login(){
//    if(this.$refs.form.validate()){
//     await API.User(this.user)
//     .then (res=>{router.push({ name: "dashboard"})})
//     .catch(err=>{
//       console.log(err);
//       window.alert('Incorrect password')
//     })
//    }
//   }
   ...mapActions(["login"]),
    loginUser() {
     
      this.login(this.user)
        .then(res => {
          if (res.data.success) {
            this.$router.push({name: "dashboard"});
          }
        })
        .catch(err => {
          console.log(err);
          window.alert('Incorrect password');
        });
    }
  }
};

</script>
<style>
.image{
  background: no-repeat center center/cover;
  width: 100%;
  height: 100vh;
  position: relative;
}
.image::after{
  content:'';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 1;
}
.elevation-12{
  z-index: 2;
}

</style>