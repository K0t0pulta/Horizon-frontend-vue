import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import MainView from '@/views/MainView.vue';
import DbAircarfts from '@/views/DbAircraftsView.vue';
import DbRoutes from '@/views/DbRoutesView.vue';
import CoNotams from '@/views/CoNotamsView.vue';
import Permissions from '@/views/PermissionsView.vue';
import Analytics from '@/views/AnalyticsView.vue';
import DbAirline from '@/views/DbAirlineView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routes: Array<RouteRecordRaw> = [
	{
		name: 'Main',
		path: '/',
		component: MainView,
	},
	{
		name: 'Aircrafts',
		path: '/database/aircrafts',
		component: DbAircarfts,
	},
	{
		name: 'Routes',
		path: '/database/routes',
		component: DbRoutes,
	},
	{
		name: 'CoNotams',
		path: '/database/notams',
		component: CoNotams,
	},
	{
		name: 'Permissions',
		path: '/database/permissions',
		component: Permissions,
	},
	{
		name: 'Analytics',
		path: '/database/analytics',
		component: Analytics,
	},
	{
		name: 'Airline',
		path: '/database/airline',
		component: DbAirline,
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
