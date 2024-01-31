<template>
  <div class="p-8 flex flex-col gap-3">
    <label for="username" aria-labelledby="username">Your e-mail : </label>
    <input
      aria-label="Your e-mail"
      id="username"
      type="text"
      placeholder="Type here"
      class="input input-bordered w-full"
      :class="{ 'input-success': isFocused }"
      @focusin="isFocused = true"
      @focusout="isFocused = false"
      v-model="username"
    />
    <button class="btn" :class="{ 'btn-success': username.length > 0 }">
      Submit
    </button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const isFocused = ref(false);
const username = ref("");
</script>
