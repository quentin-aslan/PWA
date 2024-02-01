<template>
	<div class="card bg-neutral text-neutral-content m-10 flex flex-row items-center">
		<div class="card-body items-center text-center gap-5 p-5">
			<h1>Daily Journal</h1>
			<textarea
				v-model="contentValue"
				placeholder="How was your day ?"
				class="textarea textarea-bordered textarea-lg w-full max-w-xs"
				:class="{ 'textarea-success': todayContent }"
			/>
			<a class="link" @click="router.push('daily-journal-history')"> Daily Journal History 🔗</a>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref, computed, onBeforeMount, watch } from "vue";
import { getFormattedDate } from "@/utils";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import router from "@/router";
const userStore = useUserStore();
const { dailyJournal } = storeToRefs(userStore);

const contentValue = ref("");

const todayContent = computed(() => {
	const today = getFormattedDate(new Date());
	return dailyJournal.value.find((mood) => getFormattedDate(new Date(mood.date)) === today);
});

onBeforeMount(() => {
	contentValue.value = todayContent.value?.content;
});

watch(contentValue, (value) => {
	if (!value) return;
	if (todayContent.value) {
		const indexOfTodayJournal = dailyJournal.value.indexOf(todayContent.value);
		dailyJournal.value[indexOfTodayJournal].content = value;
	} else {
		dailyJournal.value.push({ date: new Date(), content: value });
	}

	localStorage.setItem("dailyJournal", JSON.stringify(dailyJournal.value));
});
</script>
