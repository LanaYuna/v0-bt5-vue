<script lang="ts" setup>
import { computed, ref, onMounted, watch, inject } from "vue";
import { useRouter } from "vue-router";
import { routes } from "@/router";
import { useI18n } from "vue-i18n";
import { searchKey } from "../keys.ts";

const router = useRouter();
const { t, locale, availableLocales } = useI18n();

const activeRoute = computed(() => router.currentRoute.value.path);
const isActive = (path: string) => path === activeRoute.value;

/* tema claro/escuro */
const darkMode = ref(false);
const detectThemeFromSystem = () => {
  darkMode.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme();
};
const applyTheme = () => {
  document.documentElement.setAttribute(
    "data-bs-theme",
    darkMode.value ? "dark" : "light",
  );
  localStorage.setItem("theme", darkMode.value ? "dark" : "light");
};
watch(darkMode, applyTheme);

/* idiomas */
const languages = computed(() =>
  availableLocales.map((lang) => ({ code: lang })),
);
const isLanguageOpen = ref(false);
const changeLanguage = (lang: string) => {
  locale.value = lang;
  isLanguageOpen.value = false;
  localStorage.setItem("language", lang);
};

onMounted(() => {
  detectThemeFromSystem();
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", detectThemeFromSystem);

  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage && languages.value.some((l) => l.code === savedLanguage)) {
    locale.value = savedLanguage;
  }
});

/* busca */

const query = inject(searchKey)!;
const handleSearchSubmit = () => {};

</script>

<template>
  <nav class="navbar navbar-expand-md bg-body-tertiary sticky-top">
    <div class="container">
      <button
        class="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        :aria-label="t('navbar.toggleNavigation')"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        id="navbarNav"
        class="collapse navbar-collapse d-flex justify-content-between"
      >
        <!-- links das rotas, exceto as com meta.hidden -->
        <ul class="navbar-nav">
          <li
            v-for="route in routes.filter((r) => !r.meta?.hidden)"
            :key="route.path"
            class="nav-item text-uppercase"
          >
            <router-link
              :to="route.path"
              class="nav-link"
              :class="{ active: isActive(route.path) }"
            >
              {{
                route.children[0]?.name
                  ? t(`routes.${route.children[0].name.toLowerCase()}`)
                  : ""
              }}
            </router-link>
          </li>
        </ul>

        <!-- busca + idioma + switch tema -->
        <div class="d-flex align-items-center">
          <!-- Formulário de busca com Enter -->
          <form @submit.prevent="handleSearchSubmit" class="d-flex me-2">
            <input
              v-model="query"
              :placeholder="t('navbar.search')"
              class="form-control"
            />
          </form>

          <!-- seletor de idioma -->
          <div class="language-selector ms-3">
            <button
              class="btn btn-outline-secondary dropdown-toggle"
              @click="isLanguageOpen = !isLanguageOpen"
              :aria-expanded="isLanguageOpen"
            >
              {{ t("language") }}:
              <span class="text-success">
                {{ t("languageNames." + locale) }}
              </span>
            </button>

            <ul
              class="dropdown-menu"
              :class="{ show: isLanguageOpen }"
              @click.stop
            >
              <li v-for="lang in languages" :key="lang.code">
                <button
                  class="dropdown-item w-100 text-start"
                  @click="changeLanguage(lang.code)"
                >
                  {{ t("languageNames." + lang.code) }}
                </button>
              </li>
            </ul>
          </div>

          <!-- dark-mode switch -->
          <div class="form-check form-switch ms-3">
            <input
              id="darkModeSwitch"
              class="form-check-input"
              type="checkbox"
              v-model="darkMode"
            />
            <label class="form-check-label" for="darkModeSwitch">
              {{ t("navbar.darkMode") }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
