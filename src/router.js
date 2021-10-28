import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Home from './components/Home.vue'
import Productos from './components/Productos.vue'
import AddProduct from './components/AddProduct.vue'
import UpdateProduct from './components/UpdateProduct.vue'
import DeleteProduct from './components/DeleteProduct.vue'
import SearchProduct from './components/SearchProduct.vue'

const routes = [{
    path: '/',
    name: 'root',
    component: App
},
{
    path: '/user/logIn',
    name: "logIn",
    component: LogIn
    },
    {
    path: '/user/signUp',
    name: "signUp",
    component: SignUp
    },
    {
        path: '/user/home',
        name: "home",
        component: Home
    },
    {
        path: '/productos',
        name: "productos",
        component: Productos
    },
    {
        path: '/producto',
        name: "addProduct",
        component: AddProduct
    },
    {
        path: '/producto/update',
        name: "updateProduct",
        component: UpdateProduct
    },
    {
        path: '/producto/delete',
        name: "deleteProduct",
        component: DeleteProduct
    },
    {
        path: '/productos/buscar',
        name: "searchProduct",
        component: SearchProduct
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router