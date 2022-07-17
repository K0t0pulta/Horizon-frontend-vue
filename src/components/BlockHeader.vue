<template>
	<header>
		<router-link :to="{name: 'Main'}" custom v-slot="{ href }">
			<a :href="href" class="logoNest">
				<img src="/img/1200px-Hexo_blog_logo.png"
				alt="Horizon" srcset="">
			</a>
		</router-link>
		<div class="dateContainer">
			{{dateUTC}} <br /> {{timeUTC}} UTC
		</div>
		<nav class="navigation">
			<router-link :to="{name: 'Aircrafts'}" custom v-slot="{ href }">
				<div class="navigation_subDirectory">
					<a :href="href">БД ВС</a>
				</div>
			</router-link>
			<router-link :to="{name: 'Routes'}" custom v-slot="{ href }">
				<div class="navigation_subDirectory">
					<a :href="href">Маршруты</a>
				</div>
			</router-link>
			<router-link :to="{name: 'CoNotams'}" custom v-slot="{ href }">
				<div class="navigation_subDirectory">
					<a :href="href">Company Notams</a>
				</div>
			</router-link>
			<router-link :to="{name: 'Permissions'}" custom v-slot="{ href }">
				<div class="navigation_subDirectory">
					<a :href="href">Разрешения</a>
				</div>
			</router-link>
			<router-link :to="{name: 'Analytics'}" custom v-slot="{ href }">
				<div class="navigation_subDirectory">
					<a :href="href">Аналитика</a>
				</div>
			</router-link>
			<router-link :to="{name: 'Airline'}" custom v-slot="{ href }">
				<div class="navigation_subDirectory">
					<a :href="href">Настройки А/К</a>
				</div>
			</router-link>
		</nav>
		<div class="exitContainer">
				<router-link :to="{name: 'Login'}">
					<i class="fa-solid fa-door-open" aria-valuetext="выход">
				</i>
				</router-link>
		</div>
	</header>
</template>

<script setup lang="ts">
import dateFormater from '@/composables/dateFormater';
import { ref } from 'vue';

const timeUTC = ref('');
const dateUTC = ref('');
function dateTime() {
	const date = new Date();
	timeUTC.value = `${dateFormater(date.getUTCHours())}:${dateFormater(date.getUTCMinutes())}`;
	dateUTC.value = `${dateFormater(date.getUTCDate())}/${dateFormater(date.getUTCMonth() + 1)}`;
	return { timeUTC, dateUTC };
}
setInterval(dateTime, 1000);
// const date = new Date();
</script>
