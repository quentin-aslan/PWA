<template>
	<main>
		<div class="lg:flex lg:flex-row">
			<MoodTracker class="lg:basis-1/2" />
			<DailyJournal class="lg:basis-1/2" />
		</div>
	</main>
</template>

<script setup lang="ts">
import MoodTracker from "@/components/MoodTracker.vue";
import DailyJournal from "@/components/DailyJournal.vue";
</script>
