<template>
    <div class="d-flex app-block">
    <div class="side-bar">
      <SideBar/>
    </div>
    <div class="w-100">
      <div>
        <Navbar/>
      </div>
      <div>
        <Home/>
      </div>
    </div>
  </div>
</template>
<script>

import Home from '@/components/Home.vue';
import Navbar from '@/components/Navbar.vue';
import SideBar from '@/components/SideBar.vue';

export default {
  components: {
    Home,
    Navbar,
    SideBar
  }
}
</script>
<style>
    
  .app-block{
    width: 100%;
    height: 100vh;
  }
  .side-bar{
    width: 20%;
    height: 100vh;
    background-color: #fff;
  }

</style>