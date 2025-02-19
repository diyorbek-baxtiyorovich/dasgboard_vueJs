<template>
  <component :is="currentLayout">
    <RouterView />
  </component>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import AuthLayout from "@/layout/AuthLayout.vue";

const route = useRoute();

const currentLayout = computed(() => {
  return route.meta.layout === "auth" ? AuthLayout : DefaultLayout;
});
</script>
<style></style>
