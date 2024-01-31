<template>
  <button class="btn text-rose-600" @click="roar++">Roar</button>

  <h1>Roar : {{ roar }}</h1>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const roar = ref(0);
</script>
