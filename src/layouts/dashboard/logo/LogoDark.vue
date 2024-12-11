<template>
  <div class="logo">
    <RouterLink to="/dashboard" aria-label="logo">
        <img src="@/assets/images/logo.png" style="z-index: 1000000 !important;" />
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const primary = ref('rgb(var(--v-theme-primary))');
const darkprimary = ref('rgb(var(--v-theme-darkprimary))');
</script>
