<template>

    <div class="information">
        <br>
        <h1>Buscar producto</h1>
        <br>
        <form class="form" v-on:submit.prevent="processSearchProduct">
                <input type="text" v-model="buscar" placeholder="Buscar...">
                <br>
                <button type="submit"> Buscar Producto </button>
                <br>
        </form>
        
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
    name: "searchProduct",
    
    data: function(){
        return {
            producto:{
                id: 0,
                nombre: "",
                precio: 0,
            },
            buscar: "",
            datos: [],
        }
    },

    methods: {

        verifyToken: async function () {
            try {
            const result=await axios.post("https://mision-tic-bank-be00.herokuapp.com/refresh/", 
            { refresh: localStorage.getItem("token_refresh") }, 
            { headers: {} });
            localStorage.setItem("token_access", result.data.access);
          } catch(e) {
            this.$emit('logOut');
          }
        },

        processSearchProduct: async function () {
            if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                this.$emit('logOut');
                return;
			}

            await this.verifyToken();
            
            let token = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id;

            axios.get(`https://mision-tic-bank-be00.herokuapp.com/productos/buscar/${userId}/?search=${this.buscar}`, 
            {headers: {'Authorization': `Bearer ${token}`}})
                .then((result) => {
                    this.datos = result.data 
                    this.buscar = "";
                    console.log(this.datos);
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
        }
    }
}
</script>

<style>
    .form input{
        width: 12%;
        color: #283747;
        background: #E5E7E9;
        border: 1px solid #283747;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 15px;
        margin: 0 auto;
    }

    .form {
        font-size: 20px;
        color: #212427;
        margin: 0 auto;
        align-items: center;
        text-align: center;
    }

    .information{
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
        
        justify-content: center;
        align-items: center;
    }

    .information h1{
        font-size: 60px;
        color: #0f1316;
        text-align: center;
    }

    .information button{
    color: #E5E7E9;
    background: #357376;
    border: 1px solid #E5E7E9;
    border-radius: 5px;
    padding: 10px 20px;
    }

    .information button:hover{
    color: #283747;
    background: #9BA4B4;
    border: 1px solid #E5E7E9;
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