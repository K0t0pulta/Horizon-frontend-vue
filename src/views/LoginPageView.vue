<template>
<div class="login-wrapper">
	<h2>Горизонт близок. Осталось сделать шаг...</h2>
	<form id="login-form">
		<label for="login-email">Введите email
			<input type="email" name="login-email" id="login-email" autocomplete="off">
		</label>
		<label for="login-password">Введите пароль
			<input type="password" name="login-password" id="login-password">
		</label>
		<div class="button-wrapper">
			<button type="submit" id="login-button">Войти</button>
			<button type="reset">Сброс</button>

		</div>
	</form>
</div>
</template>

<style scoped>
form {
	display: flex;
	flex-direction: column;
	width: 350px;
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
	justify-content: space-around;
	min-width: 100%;
}
button {
	padding: 5px;
	font-weight: 600;
	border-radius: 5px;
}
</style>
