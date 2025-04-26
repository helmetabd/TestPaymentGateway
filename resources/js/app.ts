import './bootstrap'; // start up script
import '../scss/mermaid.min.css';
import '../scss/config/default/app.scss';
import 'bootstrap/dist/js/bootstrap.bundle'
import 'remixicon/fonts/remixicon.css'
import 'aos/dist/aos.css'
import '@vueform/multiselect/themes/default.css'

import { createApp, h, DefineComponent } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from 'ziggy-js'; 
import { loadSlim } from '@tsparticles/slim'
import AOS from "aos";
import Particles from '@tsparticles/vue3'
import i18n from './i18n'
import Multiselect from '@vueform/multiselect';

// const appName = import.meta.env.VITE_APP_NAME || 'Base Genit';
const appName = 'Base Genit';
AOS.init({
    easing: 'ease-out-back',
    duration: 1000
})

createInertiaApp({
    title: (title) => title ? `${title} - ${appName}` : `${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob<DefineComponent>('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(i18n)
            .use(ZiggyVue, Ziggy)
            .component('Multiselect', Multiselect)
            .use(Particles, {
                init: async (engine) => {
                    await loadSlim(engine) // you can load the full tsParticles library from "tsparticles" if you need it
                }
            })
            .mount(el);
    }, progress: {
        color: '#4B5563',
    },
}); 