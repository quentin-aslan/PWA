<template>
  <main>
    <TheLogin v-if="!isLogin" />
    <Aslan v-else />
  </main>
</template>

<script setup lang="ts">
import Aslan from "@/views/Aslan.vue";
import TheLogin from "@/components/TheLogin.vue";
import { ref } from "vue";

const isLogin = ref(false);
</script>
