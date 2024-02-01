export type Mood = {
	date: string;
	mood: number; // 0 - 5
};

export type DailyJournal = {
	date: string;
	content: string;
};

export type User = {
	username?: string;
	moodTracker?: Mood[];
	dailyJournal?: DailyJournal[];
};
