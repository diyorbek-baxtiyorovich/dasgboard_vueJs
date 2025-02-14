<template>
    <div>
        <div class="logo " >
            <img src="https://assets.elements.envato.com/apps/storefront/EnvatoLogoLight-b794a434513b3b975d91.svg" alt="Dashport logo">
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
        padding: 10px 0;
        background-color: #3d4a52; ;
        border-bottom: 1px solid #ccc;
    }
    .logo img{
        width: 70%;
        height: 100%;
    }
</style>