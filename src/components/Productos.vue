<template>

    <div v-if="loaded" class="information">
        <h1>Tus productos</h1>   

        <table v-show="datos.length>0" class="table" border="4">
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
                precio: "",
                user: 0,
            },
            loaded: false, 
            datos: [],       
        }
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

        getProduct: async function () {
            if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                this.$emit('logOut');
                return;
			}

            await this.verifyToken();
            
            let token = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id;
            
            this.producto.user = userId;

            axios.get(`https://mision-tic-bank-be00.herokuapp.com/producto/delete/${userId}/${this.producto.id}/`, 
            {headers: {'Authorization': `Bearer ${token}`}})
                .then((result) => {
                    alert("Item Encontrado"); 
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
    .information{
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
        
        justify-content: left;
        align-items: left;
    }

    .information h1{
        font-size: 60px;
        color: #0f1316;
        text-align: left;
    }
    
    .table{
        width: 60%;
        table-layout: fixed;
        border-collapse: collapse;
        align-items: left;
        /* margin: 0 auto;    */
    }

    .table th {
        padding: 5px;
        text-align: left;
    }

    .table td{
        padding: 5px;
        text-align: left;
    }

    .table thead{
        /* justify-content: center;
        align-items: center; */
        font-size: 30px;
        color: #283747;
    }
    .table tbody{
        font-size: 20px;
        color: #212427;
        justify-content: left;
        align-items: left;
    }

    .information button{
    color: #E5E7E9;
    background: #283747;
    border: 1px solid #E5E7E9;
    border-radius: 5px;
    padding: 10px 20px;
  }
</style>