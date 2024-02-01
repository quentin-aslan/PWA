import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import type { Ref } from "vue";
import type { DailyJournal, Mood } from "@/types/types";
import { getFormattedDate } from "@/utils";

export const useUserStore = defineStore("UserStore", () => {
	const username: Ref<string | null> = ref(null);
	const isLogin = computed(() => username.value !== null);
	const moodTracker: Ref<Mood[]> = ref([]);
	const dailyJournal: Ref<DailyJournal[]> = ref([]);

	watch(username, (value) => {
		if (value) localStorage.setItem("username", value);
	});

	const getMoodFromDate = (date: Date) => {
		return moodTracker.value.find((mood) => getFormattedDate(new Date(mood.date)) === getFormattedDate(date))?.mood || 0;
	};

	const init = () => {
		username.value = localStorage.getItem("username");

		// TODO: Store moodTracker and dailyJournal in the same object (once we have a backend)
		moodTracker.value = JSON.parse(localStorage.getItem("moodTracker") || "[]");
		dailyJournal.value = JSON.parse(localStorage.getItem("dailyJournal") || "[]");
	};

	return {
		username,
		isLogin,
		init,
		moodTracker,
		dailyJournal,
		getMoodFromDate,
	};
});
