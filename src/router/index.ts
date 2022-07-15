import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import MainView from '@/views/MainView.vue';
import DbAircarfts from '@/views/DbAircraftsView.vue';
import DbRoutes from '@/views/DbRoutesView.vue';
import CoNotams from '@/views/CoNotamsView.vue';
import Permissions from '@/views/PermissionsView.vue';
import Analytics from '@/views/AnalyticsView.vue';
import DbAirline from '@/views/DbAirlineView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import Login from '@/views/LoginPageView.vue';
import Home from '@/views/HomePageView.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: { name: 'Login' },
	},
	{
		name: 'Login',
		path: '/login',
		component: Login,
	},
	{
		name: 'Home',
		path: '/home',
		component: Home,
		children: [
			{
				name: 'Main',
				path: '',
				component: MainView,
			},
			{
				name: 'Aircrafts',
				path: 'aircrafts',
				component: DbAircarfts,
			},
			{
				name: 'Routes',
				path: 'routes',
				component: DbRoutes,
			},
			{
				name: 'CoNotams',
				path: 'notams',
				component: CoNotams,
			},
			{
				name: 'Permissions',
				path: 'permissions',
				component: Permissions,
			},
			{
				name: 'Analytics',
				path: 'analytics',
				component: Analytics,
			},
			{
				name: 'Airline',
				path: 'airline',
				component: DbAirline,
			},
			{
				path: '/:pathMatch(.*)*',
				name: 'NotFound',
				component: NotFoundView,
			},
		],
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFoundView,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
