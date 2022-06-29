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
					<a :href="href">БД Маршрутов</a>
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
			<i class="fa-solid fa-door-open"></i>
		</div>
	</header>
</template>

<script setup lang="ts">
function dateFormater(value: number) :string {
	let result = '';
	if (value + 1 < 10) {
		result = `${0}${value + 1}`;
	} else {
		result = `${value + 1}`;
	}
	return result;
}

const date = new Date();
const timeUTC = `${date.getUTCHours()}:${date.getUTCMinutes()}`;
const dateUTC = `${dateFormater(date.getUTCDate())} ${dateFormater(date.getUTCMonth())}`;
</script>
