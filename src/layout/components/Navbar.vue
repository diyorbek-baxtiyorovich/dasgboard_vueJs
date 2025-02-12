<template>
    <div class="d-flex justify-content-between align-items-center nav-block">
        <div class="nav-bar_name">
            <h3>Crud Dashboard</h3>
        </div>
        <div class="nav-bar_profile">
            <ul class="d-flex">
                <li v-if="username">{{ username }}</li>
                <li @click="logout" class="logout-btn">Log out</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref(localStorage.getItem('username') || 'Admin'); 

const logout = () => {
    localStorage.removeItem('userToken'); 
    localStorage.removeItem('username'); 
    router.push('/login'); 
};
</script>

<style>
.nav-block {
    width: 100%;
    height: 70px;
    background-color: yellowgreen;
    color: #fff;
    padding: 0 20px;
}
.nav-bar_profile ul {
    padding-top: 10px;
    list-style: none;
    display: flex;
    gap: 15px;
}
.logout-btn {
    cursor: pointer;
    font-weight: bold;
}
.logout-btn:hover {
    color: red;
}
</style>
