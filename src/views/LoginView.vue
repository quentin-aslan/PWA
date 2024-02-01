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
      v-model="usernameValue"
    />
    <button
      class="btn"
      :class="{ 'btn-success': usernameValue.length > 0 }"
      @click="submit"
      :disabled="isLoading || usernameValue.length === 0"
    >
      <span v-show="isLoading" class="loading loading-dots loading-md"></span>
      <span v-show="!isLoading">Submit</span>
    </button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import router from "@/router";

const userStore = useUserStore();

const isFocused = ref(false);
const usernameValue = ref("");
const isLoading = ref(false);

const submit = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    userStore.username = usernameValue.value;
    router.push({ name: "home" });
  }, 2000);
};
</script>
