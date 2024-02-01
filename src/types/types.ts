export type Mood = {
	date: string;
	mood: boolean; // 0 - 5
};

export type User = {
	username?: string;
	moodTracker?: Mood[];
};
