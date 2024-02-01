<template>
	<div class="rating gap-1">
		<input type="radio" v-model="moodValue" value="1" class="mask mask-heart bg-red-400" :checked="moodValue === 1" />
		<input type="radio" v-model="moodValue" value="2" class="mask mask-heart bg-orange-400" :checked="moodValue === 2" />
		<input type="radio" v-model="moodValue" value="3" class="mask mask-heart bg-yellow-400" :checked="moodValue === 3" />
		<input type="radio" v-model="moodValue" value="4" class="mask mask-heart bg-lime-400" :checked="moodValue === 4" />
		<input type="radio" v-model="moodValue" value="5" class="mask mask-heart bg-green-400" :checked="moodValue === 5" />
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
