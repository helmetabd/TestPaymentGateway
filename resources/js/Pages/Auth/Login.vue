<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import { reactive } from 'vue';
import { route } from 'ziggy-js';

defineProps({
    canResetPassword: Boolean,
    status: String,
});

const state = reactive({
    particleConfig: {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                },
                image: {
                    src: 'img/github.svg',
                    width: 100,
                    height: 100
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 4,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 130,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 3,
                direction: 'top',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'window',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: false,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                }
            }
        },
        retina_detect: true
    },
    togglePassword: false
})

const form = useForm({
    email: 'test@example.com',
    password: 'password',
    remember: false,
});

const submit = () => {
    form.transform(data => ({
        ...data,
        remember: form.remember ? 'on' : '',
    })).post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>

    <Head title="Log in" />

    <div class="auth-page-wrapper pt-5">
        <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
            <vue-particles id="tsparticles" class="bg-overlay" :options="state.particleConfig" />
            <div class="shape">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 1440 120">
                    <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                </svg>
            </div>
        </div>

        <div class="auth-page-content">
            <div class="container">
                <div class="row">
                    <div class="col col-lg-12">
                        <div class="text-center mt-sm-5 mb-4 text-white-50">
                            <div>
                                <Link href="/" class="d-inline-block auth-logo">
                                <img src="@assets/images/logo-light.png" alt="" height="20">
                                </Link>
                            </div>
                            <p class="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
                        </div>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col col-md-8 col-lg-6 col-xl-5">
                        <div class="card mt-4">
                            <div class="p-4">
                                <div class="text-center mt-2">
                                    <h5 class="text-primary">Welcome Back !</h5>
                                    <p class="text-muted">Sign in to continue to Genit Base.</p>
                                </div>
                                <div v-if="status" class="alert alert-success text-success">
                                    {{ status }}
                                </div>
                                <div class="p-2 mt-3">
                                    <form @submit.prevent="submit">
                                        <div class="mb-3">
                                            <label for="email">Email</label>
                                            <input id="email" type="email" v-model="form.email" class="form-control"
                                                autofocus placeholder="Please enter email"
                                                :class="{ 'is-invalid': form.errors.email }" autocomplete="email">
                                            <InputError :message="form.errors.email" />
                                        </div>

                                        <div class="mb-3">
                                            <div class="float-end">
                                                <Link v-if="canResetPassword" :href="route('password.request')"
                                                    class="text-muted">Forgot
                                                password?</Link>
                                            </div>
                                            <InputLabel for="password" value="Password" />
                                            <div class="position-relative auth-pass-inputgroup mb-3">
                                                <input :type="state.togglePassword ? 'text' : 'password'"
                                                    class="form-control pe-5" placeholder="Enter password"
                                                    id="password-input" v-model="form.password" autocomplete="password"
                                                    required :class="{ 'is-invalid': form.errors.password }">
                                                <button
                                                    class="btn position-absolute end-0 top-0 text-decoration-none text-muted"
                                                    type="button" id="password-addon"
                                                    @click="state.togglePassword = !state.togglePassword">
                                                    <i class="ri-eye-fill align-middle"></i>
                                                </button>
                                                <InputError :message="form.errors.password" />
                                            </div>
                                        </div>

                                        <div class="form-check">
                                            <input type="checkbox" :checked="form.remember"
                                                @change="() => form.remember = !form.remember" name="remember"
                                                class="form-check-input" id="auth-remember-check" />
                                            <label class="form-check-label" for="auth-remember-check">Remember
                                                me</label>
                                        </div>
                                        <div class="mt-4">
                                            <button class="btn btn-success w-100" type="submit"
                                                :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                                                {{ form.processing ? 'Please wait' : 'Sign In' }}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div class="mt-4 text-center">
                            <p class="mb-0">Don't have an account ?
                                <Link :href="route('register')"
                                    class="fw-semibold text-primary text-decoration-underline"> Signup </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col col-lg-12">
                        <div class="text-center">
                            <p class="mb-0 text-muted">&copy; {{ new Date().getFullYear() }} Genit Base. Crafted with <i
                                    class="mdi mdi-heart text-danger"></i> by IT GBNA</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>
