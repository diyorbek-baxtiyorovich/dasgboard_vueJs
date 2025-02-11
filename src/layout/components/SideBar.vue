<template>
    <div class="sideBar_blok">
        <nav class="sidebar">
            <ul>
                <li v-for="(item, index) in menuItems" :key="index">        
                    <RouterLink :to="item.route" class="text-decoration-none text-white">
                        <i :class="`fa fa-${item.icon}`"></i> {{ item.title }}
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script setup>
import menuItems from "@/data/sideBarData"; 

</script>
<style>
    .sideBar_blok{
        width: 100%;
        height: calc(100vh - 70px);
    }
    .side-logCom{
        width: 100%;
        height: 70px;
        background-color: red;
    }
    .sidebar {
        width: 100%;
        height: 100%;
        background: #3d4a52;
        padding: 10px;
    }
    .sidebar ul {
        list-style: none;
        padding: 0;
        padding-top: 15px;
    }
    .sidebar li {
        padding: 10px;
        color: white;
        cursor: pointer;    
    }
    .sidebar li:hover {
        background: #5a6b78;
    }
</style> 