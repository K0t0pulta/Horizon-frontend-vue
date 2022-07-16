import { createApp } from 'vue';
import { createPinia } from 'pinia';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import {
	faInfo, faCloudSun, faN, faXmark,
} from '@fortawesome/free-solid-svg-icons';
import router from './router/index';
import App from './App.vue';

/* add icons to the library */
library.add(faInfo, faCloudSun, faN, faXmark);

const pinia = createPinia();

createApp(App).use(router).use(pinia).component('font-awesome-icon', FontAwesomeIcon)
	.mount('#app');
