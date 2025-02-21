<template>
    <div class="d-flex app-block">
        <div class="side-bar">
            <SideBar />
        </div>
        <div class="w-100">
            <div>
                <AppNavbar />
            </div>
            <main class="main-block">
                <RouterView />
            </main>
        </div>
    </div>
</template>
<script>
import AppNavbar from '@/layout/components/AppNavbar.vue';
import SideBar from '@/components/common/SideBar.vue';

export default {
    components: {
        AppNavbar,
        SideBar,
    },
};
</script>
<style>
.app-block {
    width: 100%;
    height: 100vh;
}
.side-bar {
    width: 20%;
    height: 100vh;
    background-color: #fff;
}
.main-block {
    width: 100%;
    height: calc(100vh - 70px);
}
</style>
