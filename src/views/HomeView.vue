<template>
  <main>
    <!-- Adiciona o carrossel -->
    <h1 class="text-center mb-4">{{ t("welcome") }}</h1>

    <AppCarousel />
    
    <div class="container py-5">
      
      <h1>
        <span v-if="isSearching" v-html="highlightedContent.highlightedTitle"></span>
        <span v-else>{{ highlightedContent.originalTitle }}</span>
      </h1>

      <!-- Parágrafo -->
      <p>
        <span v-if="isSearching" v-html="highlightedContent.highlightedText"></span>
        <span v-else>{{ highlightedContent.originalText }}</span>
      </p>

    </div>
  </main>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { inject, computed } from "vue";
import AppCarousel from "@/components/AppCarousel.vue";
import { highlightedText } from "@/util/highlightUtil";
import { searchKey } from "@/keys";

const { t } = useI18n();

const query = inject(searchKey)!;

const textContent = {
  title: "homePage.title",
  text: "homePage.welcomeMessage",
};


const highlightedContent = computed(() => {
  const searchValue = query.value?.trim().toLowerCase() || "";

  if (!searchValue) {
    return {
      originalTitle: t(textContent.title),
      originalText: t(textContent.text),
      highlightedTitle: null,
      highlightedText: null,
    };
  }


  const originalTitle = t(textContent.title);
  const originalText = t(textContent.text);

  return {
    originalTitle,
    originalText,
    highlightedTitle: highlightedText(originalTitle, searchValue),
    highlightedText: highlightedText(originalText, searchValue),
  };
});


const isSearching = computed(() => {
  return !!query.value && query.value.trim().length > 0;
});

</script>