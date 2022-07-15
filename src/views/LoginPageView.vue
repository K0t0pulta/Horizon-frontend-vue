<template>
<div class="login-wrapper">
	<h2>До горизонта один шаг...</h2>
	<form id="login-form" v-on:submit.prevent="login">
		<label for="login-email">Email
			<input type="email" name="login-email" id="login-email"
			v-model="email" autocomplete="off">
		</label>
		<label for="login-password">Пароль
			<input type="password" name="login-password" id="login-password"
			v-model="password">
		</label>
		<div class="button-wrapper">
			<button type="submit" id="login-button">Войти</button>
			<span class="error" v-if="error">{{error}}</span>
			<button type="reset">Сброс</button>

		</div>
	</form>
</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ref } from 'vue';

const router = useRouter();

const email = ref('');
const password = ref('');
const serverResponse = ref('');
const status = ref(0);
const error = ref('');

function login() {
	error.value = '';
	status.value = 0;
	serverResponse.value = '';
	const loginData = {
		email: email.value,
		password: password.value,
	};
	axios.post('http://localhost:3000/api/login', {
		data: loginData,
	})
		.then(() => {
			router.push({ name: 'Main' });
		})
		.catch((er) => {
			error.value = er.response.data.message;
			status.value = er.response.status;
		});
}
</script>

<style scoped>
* {
	font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
h2 {
	position: relative;
	left: 6em;
	top: 6em;
}
form {
	display: flex;
	flex-direction: column;
	width: 256px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-weight: 600;
}
form * {
	margin-bottom: 5px;
}
form input {
	width: 200px;
	height: 1.8em;
	padding-left: 5px;
}
#login-email {
	width: 208px;
}
.login-wrapper {
	padding: 20px;
	width: 100vw;
	height: 100vh;
	background-image: url('/Horizon/Horizon-frontend-vue/public/img/loginPage.jpg');
	background-repeat: no-repeat;
	background-size: cover;

}

.button-wrapper {
	display: flex;
	justify-content: space-between;
	min-width: 100%;
}
button {
	padding: 5px;
	font-weight: 600;
	border-radius: 5px;
}

.error {
	font-size: 0.9em;
	color: rgb(234, 14, 14);
	font-weight: 400;
	text-align: center;
}
</style>
