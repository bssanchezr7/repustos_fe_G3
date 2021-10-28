<template>

    <div class="information">
        <h1>Actualizar productos</h1>

        <form class="form" v-on:submit.prevent="processUpdateProduct">
                <input type="number" v-model="producto.id" placeholder="Id">
                <br>
                <input type="text" v-model="producto.nombre" placeholder="Descripción">
                <br>
                <input type="number" v-model="producto.precio" placeholder="Precio">
                <br>
                <button type="submit"> Actualizar Producto </button>
        </form>
    </div>

</template>

<script>
import jwt_decode from "jwt-decode";
import axios from 'axios';

export default {
    name: "updateProduct",
    
    data: function(){
        return {
            producto:{
                id: "",
                nombre: "",
                precio: "",
                user: 0,
            },
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

        processUpdateProduct: async function () {
            if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                this.$emit('logOut');
                return;
			}

            await this.verifyToken();
            
            let token = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id;
            
            this.producto.user = userId;

            axios.put(`https://mision-tic-bank-be00.herokuapp.com/producto/update/${userId}/${this.producto.id}/`,
            this.producto,
            {headers: {'Authorization': `Bearer ${token}`}})
                .then((result) => {
                    alert("Item Actualizado"); 
                    this.producto.id = "";
                    this.producto.nombre= "";
                    this.producto.precio = "";
                    this.producto.user= 0;  
                    console.log(this.product);                           
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

    .information button{
    color: #E5E7E9;
    background: #283747;
    border: 1px solid #E5E7E9;
    border-radius: 5px;
    padding: 10px 20px;
  }
</style>