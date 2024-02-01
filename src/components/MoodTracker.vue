<template>
	<div class="card bg-neutral text-neutral-content m-10 flex flex-row items-center">
		<div class="card-body items-center text-center gap-5 p-5 top-1/2">
			<div class="rating rating-lg gap-1">
				<input type="radio" v-model="moodValue" value="1" class="mask mask-heart bg-blue-400" :checked="moodValue === 1" />
				<input type="radio" v-model="moodValue" value="2" class="mask mask-heart bg-indigo-400" :checked="moodValue === 2" />
				<input type="radio" v-model="moodValue" value="3" class="mask mask-heart bg-indigo-500" :checked="moodValue === 3" />
				<input type="radio" v-model="moodValue" value="4" class="mask mask-heart bg-rose-400" :checked="moodValue === 4" />
				<input type="radio" v-model="moodValue" value="5" class="mask mask-heart bg-red-500" :checked="moodValue === 5" />
			</div>
			<div v-if="todayMood" class="badge">Your mood is saved for today ✅</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/userStore";
import { getFormattedDate } from "@/utils";
const userStore = useUserStore();
const { moodTracker } = storeToRefs(userStore);

const DEFAULT_MOOD = 2;
const moodValue = ref(DEFAULT_MOOD);

const todayMood = computed(() => {
	const today = getFormattedDate(new Date());
	return moodTracker.value.find((mood) => getFormattedDate(new Date(mood.date)) === today);
});

onBeforeMount(() => {
	const mood = Number(todayMood.value?.mood);
	if (!isNaN(mood)) moodValue.value = mood;
});

watch(moodValue, (value) => {
	if (todayMood.value) {
		const indexOfTodayMood = moodTracker.value.indexOf(todayMood.value);
		moodTracker.value[indexOfTodayMood].mood = value;
	} else {
		moodTracker.value.push({ date: new Date(), mood: value });
	}

	localStorage.setItem("moodTracker", JSON.stringify(moodTracker.value));
});
</script>
