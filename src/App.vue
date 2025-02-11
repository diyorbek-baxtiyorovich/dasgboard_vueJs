<template>
  <div>
    <DefaultLayout/>
  </div>
  <div>
    <!-- <AuthLayout/> -->
  </div>
</template>
<script>

import AuthLayout from './layout/AuthLayout.vue';
import DefaultLayout from './layout/DefaultLayout.vue';

export default {
  components: {
    DefaultLayout,
    AuthLayout
  }
}
</script>
<style>

</style>