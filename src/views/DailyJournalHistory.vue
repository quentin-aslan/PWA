<template>
	<h1 class="text-center text-xl font-bold">Journal Daily History</h1>
	<div class="divider"></div>
	<div class="divider"></div>

	<div v-for="(item, index) in dailyJournal as DailyJournal[]">
		<div v-if="item.content" class="chat" :class="{ 'chat-start': index % 2 === 0, 'chat-end': index % 2 !== 0 }">
			<div class="chat-header">{{ getFormattedDate(new Date(item.date)) }}</div>
			<div class="chat-bubble">{{ item.content }}</div>
			<div class="chat-footer opacity-50 badge text-white" :class="getBackground(getMoodFromDate(new Date(item.date)))">
				Mood : {{ getMoodFromDate(new Date(item.date)) }}
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore";
import { getFormattedDate } from "@/utils";
import { DailyJournal } from "@/types/types";

const userStore = useUserStore();
const { dailyJournal, getMoodFromDate } = userStore;

const getBackground = (mood: number | string) => {
	mood = Number(mood);
	if (mood === 1) return "bg-blue-400";
	if (mood === 2) return "bg-indigo-400";
	if (mood === 3) return "bg-indigo-500";
	if (mood === 4) return "bg-rose-400";
	if (mood === 5) return "bg-red-500";
};
</script>
