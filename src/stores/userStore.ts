import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import type { Ref } from "vue";

export const useUserStore = defineStore("UserStore", () => {
  const username: Ref<string | null> = ref(null);
  const isLogin = computed(() => username.value !== null);

  watch(username, (value) => {
    if (value) localStorage.setItem("username", value);
  });

  const init = () => {
    username.value = localStorage.getItem("username");
  };

  return {
    username,
    isLogin,
    init,
  };
});
