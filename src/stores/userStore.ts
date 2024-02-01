import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import type { Ref } from "vue";
import { DailyJournal, Mood } from "@/types/types";

export const useUserStore = defineStore("UserStore", () => {
	const username: Ref<string | null> = ref(null);
	const isLogin = computed(() => username.value !== null);
	const moodTracker: Ref<Mood | []> = ref([]);
	const dailyJournal: Ref<DailyJournal | []> = ref([]);

	watch(username, (value) => {
		if (value) localStorage.setItem("username", value);
	});

	const init = () => {
		username.value = localStorage.getItem("username");
		moodTracker.value = JSON.parse(localStorage.getItem("moodTracker") || "[]");
		dailyJournal.value = JSON.parse(localStorage.getItem("dailyJournal") || "[]");
	};

	return {
		username,
		isLogin,
		init,
		moodTracker,
		dailyJournal,
	};
});
