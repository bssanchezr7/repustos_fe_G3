<template>
  <div id="app" class="app">
  <div class="header">
    
    <nav >
      <br>
      <h1>Tienda de repuestos</h1>
      <ul style="list-style-type:none;">
        <li><button v-if="is_auth" v-on:click="loadHome" > Inicio </button></li>
        <li><button v-if="is_auth" v-on:click="loadProductos"> Productos </button></li>
        <li><button v-if="is_auth" v-on:click="loadAddProduct"> Agregar </button></li>
        <li><button v-if="is_auth" v-on:click="loadUpdateProduct"> Actualizar </button></li>
        <li><button v-if="is_auth" v-on:click="loadDeleteProduct"> Eliminar </button></li>
        <li><button v-if="is_auth" v-on:click="loadSearchProduct"> Buscar </button></li>
        <li><button v-if="is_auth" v-on:click="logOut"> Cerrar Sesión </button></li>
        <li><button v-if="!is_auth" v-on:click="loadLogIn" > Iniciar Sesión </button></li>
        <li><button v-if="!is_auth" v-on:click="loadSignUp" > Registrarse </button></li>
    </ul>
    </nav>
  </div>

  <div class="main-component">
    <router-view
      v-on:completedLogIn="completedLogIn"
      v-on:completedSignUp="completedSignUp"
      v-on:logOut="logOut"
    >
    </router-view>
  </div>

  <!-- <div class="footer">
    <h2>Misión TIC 2022</h2>
  </div> -->
</div>
</template>

<script>
export default {
  name: 'App',

  data: function(){
      return{
        is_auth: false
      }  
  },

  components: {
  },

  methods:{
    verifyAuth: function() {
      this.is_auth = localStorage.getItem("isAuth") || false;
		
			if (this.is_auth == false)
        this.$router.push({ name: "logIn" });
      else
        this.$router.push({ name: "home" });
    },

  loadLogIn: function(){
      this.$router.push({name: "logIn"})
  },

  loadSignUp: function(){
      this.$router.push({name: "signUp"})
  },

  completedLogIn: function(data) {
      localStorage.setItem("isAuth", true);
			localStorage.setItem("username", data.username);
			localStorage.setItem("token_access", data.token_access);
			localStorage.setItem("token_refresh", data.token_refresh);
			alert("Autenticación Exitosa");
			this.verifyAuth();
  },

  completedSignUp: function(data) {
      alert("Registro Exitoso");
			this.completedLogIn(data);
  },

  loadHome: function() {
      this.$router.push({ name: "home" });
  },

  loadProductos: function () {
			this.$router.push({ name: "productos" });
		},

  logOut: function () {
			localStorage.clear();
			alert("Sesión Cerrada");
			this.verifyAuth();
		},
  loadAddProduct: function() {
      this.$router.push({ name: "addProduct" });
  },

  loadUpdateProduct: function() {
      this.$router.push({ name: "updateProduct" });
  },
  loadDeleteProduct: function() {
      this.$router.push({ name: "deleteProduct" });
  },
  loadSearchProduct: function() {
      this.$router.push({ name: "searchProduct" });
  },
},

  created: function(){
    this.verifyAuth()
  }

}
</script>

<style>

 body{
    margin: 0 0 0 0;
  }

  .header{
    /* margin: 0%;
    padding: 0;
    width: 100%;
    height: 10vh; 
    min-height: 100px;
    background-color: #283747 ;
    color:#E5E7E9  ;
    display: flex;
    justify-content: space-between;
    align-items: center; */
    position: fixed;
    right: 0;
    width: 30%;
    height: 100%;
    background-color: #F1F6F9;
    overflow-y: auto;
    z-index: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    place-content: center;
  }

  .header h1{
    font-size: 40px;
    height: 50%;
    color: #0f1316;
    text-align: center;
  }

  /* .header nav {
    height: 100%;
    width: 25%;
    display: flex;
    justify-content: normal ;
    align-items: center;
    font-size: 20px;
    
  } */

  .header nav ul li {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;    
  }

  .header nav{
    place-content: center;
    height: 90vh;
  }

  .header nav button{
    color: #E5E7E9;
    background: #357376;
    border: 1px solid #E5E7E9; 
    width: 100%;
    padding: 10px ;
    text-align: center;
    /* border-radius: 5px;
    padding: 10px 50%;
    /* display: block */
    justify-content: center;
    /* background: rgba( 20, 39, 78, 0.35 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 3px );
    -webkit-backdrop-filter: blur( 3px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 ); */
  }

  .header nav button:hover{
    color: #283747;
    background: #9BA4B4;
    border: 1px solid #E5E7E9;
  }

  .main-component{
    /* height: 60%;
    /* margin: 0%; */
    /* padding: 0%;
    background: #FDFEFE ;
    align-items: left;
    justify-content: left;  */

    overflow: visible ;
    width: calc(70% + 1px);
  }

  /* .footer{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 10vh;
    min-height: 100px; 
    background-color: #283747;
    color: #E5E7E9;
  }

  .footer h2{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  } */
</style>