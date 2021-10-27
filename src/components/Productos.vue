<template>

    <div v-if="loaded" class="information">
        <h1>Tus productos</h1>
        <form class= "form " action="" method="post" target="_blank">

            Búscar producto: <input class="busqueda" type="search" name="busquedaproducto" placeholder="Search...">

            <input type="submit" value="Buscar">
            <!-- <input type="submit" value="agregar">
            <input type="submit" value="eliminar">
            <input type="submit" value="actualizar"> -->
            
            
            

        </form>
        <button v-on:click="isVisible = !isVisible">Agregar</button>
        <br>
        
        <div v-show="isVisible">
            <form v-on:submit.prevent="createProduct">
                <!-- <input type="number" v-model="id" placeholder="id"> -->
                <input type="text" v-model="producto.nombre" placeholder="Descripción">
                <input type="number" v-model="producto.precio" placeholder="Precio">

                <button type="submit">Confirmar</button>
            </form>
        </div>
        <div >
            <form v-on:submit.prevent="updateProduct">
                <input type="number" v-model="producto.id" placeholder="id">
                <input type="text" v-model="producto.nombre" placeholder="Descripción">
                <input type="number" v-model="producto.precio" placeholder="Precio">

                <button type="submit">Confirmar</button>
            </form>
        </div>
        <div >
            <form v-on:submit.prevent="deleteProduct">
                <input type="number" v-model="producto.id" placeholder="id">

                <button type="submit">Confirmar</button>
            </form>
        </div>
        <table class="table" border="4">
            <thead>
                <tr>
                    <th width=30px>ID</th>
                    <th>Descripción</th>
                    <th width=120px>Precio</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(d, i) in datos" v-bind:key="i">
                    <th>{{d.id}}</th>
                    <th>{{d.nombre}}</th>
                    <th>{{d.precio}} COP</th>
                </tr>
            </tbody>
        </table>
    </div>

</template>


<script>
import jwt_decode from "jwt-decode";
import axios from 'axios';


export default {
    name: "Productos",
    
    data: function(){
        return {
            
            
            producto:{
                id: 0,
                nombre: "",
                precio: 0,
                user:0,
            },
            loaded: false,
            isVisible: false
        }
    },

    components: {
        
    },

    methods: {
        getData: async function () {

            if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                this.$emit('logOut');
                return;
			}

            await this.verifyToken();
            
            let token = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id.toString();
            
            axios.get(`https://mision-tic-bank-be00.herokuapp.com/productos/${userId}/`, {headers: {'Authorization': `Bearer ${token}`}})
                .then((result) => {
                    this.datos = result.data
                    
                    this.loaded = true;
                    })
                .catch((error) => {
                    console.log("Error");
                    if(error.response.status == "401") {
                        alert("Usted no está autorizado para realizar esta operación.");
                    }
                    else if(error.response.status == "400"){
                        alert("Revise todos los datos e intente de nuevo.");
                    };
                });
        },

        verifyToken: async function () {
            try {
            const result=await axios.post("https://mision-tic-bank-be00.herokuapp.com/refresh/", { refresh: localStorage.getItem("token_refresh") }, { headers: {} });
            localStorage.setItem("token_access", result.data.access);
          } catch(e) {
            this.$emit('logOut');
          }
        },

        createProduct: async function () {
            if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                this.$emit('logOut');
                return;
			}

            await this.verifyToken();
            
            let token = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id;
            
            this.producto.user = userId;

            axios.post(`https://mision-tic-bank-be00.herokuapp.com/producto/`,this.producto, 
                                                                            {headers: {'Authorization': `Bearer ${token}`}})
                .then((result) => {
                    alert(result.data); 
                    this.producto.nombre= "";
                    this.producto.precio = 0;
                    this.producto.user= 0;  
                    console.log(this.producto);               
                    
                    })
                .catch((error) => {
                    console.log("Error");
                    
                    if(error.response.status == "401") {
                        alert("Usted no está autorizado para realizar esta operación.");
                    }
                    else if(error.response.status == "400"){
                        alert("Revise todos los datos e intente de nuevo.");
                    }
                });
        },

        updateProduct: async function () {
            if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                this.$emit('logOut');
                return;
			}

            await this.verifyToken();
            
            let token = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id;
            
            this.producto.user = userId;

            axios.put(`https://mision-tic-bank-be00.herokuapp.com/producto/update/${userId}/${this.producto.id}/`,this.producto, 
                                                                            {headers: {'Authorization': `Bearer ${token}`}})
                .then((result) => {
                    alert("Item actualizado"); 
                    this.producto.id = 0;
                    this.producto.nombre= "";
                    this.producto.precio = 0;
                    this.producto.user= 0;  
                    console.log(this.producto);               
                    
                    })
                .catch((error) => {
                    console.log("Error");
                    
                    if(error.response.status == "401") {
                        alert("Usted no está autorizado para realizar esta operación.");
                    }
                    else if(error.response.status == "400"){
                        alert("Revise todos los datos e intente de nuevo.");
                    }
                });
        },

        deleteProduct: async function () {
            if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                this.$emit('logOut');
                return;
			}

            await this.verifyToken();
            
            let token = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id;
            
            this.producto.user = userId;

            axios.delete(`https://mision-tic-bank-be00.herokuapp.com/producto/delete/${userId}/${this.producto.id}/`, 
                                                                            {headers: {'Authorization': `Bearer ${token}`}})
                .then((result) => {
                    alert("Item eliminado"); 
                    this.producto.id = 0;
                     
                    console.log(this.producto);               
                    
                    })
                .catch((error) => {
                    console.log("Error");
                    
                    if(error.response.status == "401") {
                        alert("Usted no está autorizado para realizar esta operación.");
                    }
                    else if(error.response.status == "400"){
                        alert("Revise todos los datos e intente de nuevo.");
                    }
                });
        },

    },

    created: async function(){
        this.getData();
    },
}
</script>


<style>
    .form p input{
        width: 12%;
        color: #283747;
        background: #E5E7E9;
        border: 1px solid #283747;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 15px;
        margin: 0 auto;
    }

    .form p input:hover{
        font-size: 20px;
        color: #212427;

    }

    .form {
        font-size: 20px;
        color: #212427;
        margin: 0 auto;
        align-items: center;
        text-align: center;

    }

    .busqueda input {
        color: #283747;
        background: #E5E7E9;
        border: 1px solid #E5E7E9;
    }

    .information{
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
  
        overflow:scroll;
        height:100%;
        width:100%;

        
        justify-content: center;
        align-items: center;
       
    }

    .information h1{
        font-size: 60px;
        color: #0f1316;
        text-align: center;
    }
    
    .table{
        width: 60%;
        table-layout: fixed;
        border-collapse: collapse;
        align-items: center;
        margin: 0 auto;

            
    }

    .table th {
        
       
        padding: 5px;
        text-align: center;
        
    }

    .table td{
        padding: 5px;
        text-align: left;
    }

    .table thead{
       
        
        justify-content: center;
        align-items: center;

        font-size: 30px;
        color: #283747;
      
    }
    .table tbody{
        font-size: 20px;
        color: #212427;

        
        justify-content: center;
        align-items: center;
        
    }


</style>