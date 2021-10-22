<template>

    <div v-if="loaded" class="information">
        <h1>Tus productos</h1>
        
        <table class="table" border="4">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="d in datos" v-bind:key="d">
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
            id: "",
            nombre: "",
            precio: 0,
            loaded: false,
            
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
                .catch(() => {
                    this.$emit('logOut');
                });
        },

        verifyToken: function () {
            return axios.post("https://mision-tic-bank-be00.herokuapp.com/refresh/", {refresh: localStorage.getItem("token_refresh")}, {headers: {}})
				.then((result) => {
					localStorage.setItem("token_access", result.data.access);		
				})
				.catch(() => {
					this.$emit('logOut');
				});
        }
    },

    created: async function(){
        this.getData();
    },
}
</script>


<style>
    .information{
        margin: 0;
        padding: 0%;
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;    
        align-items: center;
    }

    .information h1{
        font-size: 60px;
        color: #0f1316;
    }

    .table th {
        border-radius: 0px;
        background: linear-gradient(145deg, #aeb0bd, #cfd1e1);
        box-shadow:  15px 15px 28px #a4a6b3,
                    -15px -15px 28px #dee0f2;
    }
    .table thead{
        font-size: 40px;
        color: #283747;
        border-radius: 50px;
        background: linear-gradient(145deg, #aeb0bd, #cfd1e1);
        box-shadow:  15px 15px 28px #a4a6b3,
                    -15px -15px 28px #dee0f2;
    }
    .table tbody{
        font-size: 40px;
        color: #212427;
    }

    .information span{
        color: crimson;
        font-weight: bold;
    }
</style>