import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/login",
			name: "login",
			component: LoginView,
		},
	],
});

router.beforeEach((to, from, next) => {
	const userStore = useUserStore();
	const { isLogin } = storeToRefs(userStore);
	userStore.init();
	if (!isLogin.value && to.name !== "login") {
		next({ name: "login" });
	} else if (isLogin.value && to.name === "login") {
		next({ name: "home" });
	}

	next();
});

export default router;
