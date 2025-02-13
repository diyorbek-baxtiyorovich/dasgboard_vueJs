<template>
    <div>
        <div class="logo">
            <img src="../../assets/logo.jpg" alt="Dashport logo">
        </div>
        <div>
            <SideBarElements />
        </div>
    </div>
</template>
<script>
import SideBarElements from '@/layout/components/ItemSideBar.vue';

export default {
    components: {
        SideBarElements
    }
}
</script>
<style scoped>
    .logo{
        width: 100%;
        height: 70px;
        text-align: center;
    }
    .logo img{
        width: 70%;
        height: 100%;
    }
</style>