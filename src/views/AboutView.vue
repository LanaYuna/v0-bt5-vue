<template>

  <div class="container mt-5">

    <section class="section-about">
      <h1 class="mb-4 text-start">{{ t("aboutPage.title") }}</h1>
      <p v-html="t('aboutPage.paragraph1')"></p>
      <p v-html="t('aboutPage.paragraph2')"></p>
    </section>

    <div class="section-container" v-if="isSearching">
      <section class="section-box" v-for="(content, index) in highlightedContent" :key="index">
          <h2 v-html="content.highlightedTitle"></h2>
          <p v-html="content.highlightedText"></p>
      </section>

    </div>

    <div class="section-container" v-else>
      <section class="section-box" v-for="section in sections" :key="section.titleKey">
        <h2>{{ t(section.titleKey) }}</h2>
        <p v-html="t(section.textKey)"></p>
      </section>
    </div>
   
  </div>

</template>

<script setup lang="ts">
import { ref, inject, computed } from "vue";
import { useI18n } from "vue-i18n";
import { highlightedText } from "../util/highlightUtil.ts";
import { searchKey } from "@/keys.ts";

const { t } = useI18n();

interface Section{
  titleKey: string,
  textKey: string,
}

const sections = ref<Section[]>([
  { titleKey: "aboutPage.title2", textKey: "aboutPage.paragraph3"},
  { titleKey: "aboutPage.title3", textKey: "aboutPage.paragraph4"},
  { titleKey: "aboutPage.title4", textKey: "aboutPage.paragraph5"},
  { titleKey: "aboutPage.title5", textKey: "aboutPage.paragraph6"},
  { titleKey: "aboutPage.title6", textKey: "aboutPage.paragraph7"},
  { titleKey: "aboutPage.title7", textKey: "aboutPage.paragraph8"},
  { titleKey: "aboutPage.title8", textKey: "aboutPage.paragraph9"},
  { titleKey: "aboutPage.title9", textKey: "aboutPage.paragraph10"},
  { titleKey: "aboutPage.title10", textKey: "aboutPage.paragraph11"},
  { titleKey: "aboutPage.title11", textKey: "aboutPage.paragraph12"},
  { titleKey: "aboutPage.title12", textKey: "aboutPage.paragraph13"},
]);

const query = inject(searchKey)!; // query armazenada na variável

const isSearching = computed(() => {
  return !!query.value && query.value.trim().length > 0;
});

const highlightedContent = computed(() => {
  const searchValue = query.value? query.value.trim().toLowerCase() : '';
  
  if(!searchValue){
    // Pesquisa vazia, retorna todas as seções sem nenhum destaque
    return sections.value.map( section => ({
      highlightedTitle: t(section.titleKey),
      highlightedText: t(section.textKey)
    }));
  }

  // Pesquisa ativa, retorna a seção sublinhada
  return sections.value
  .filter( section => {
    const title = t(section.titleKey).toLowerCase();
    const text = t(section.textKey).toLowerCase();

    return title.includes(searchValue) || text.includes(searchValue);
  })

  .map( section => {
    const title = t(section.titleKey);
    const text = t(section.textKey);

    return {
      highlightedTitle: highlightedText(title, searchValue),
      highlightedText: highlightedText(text, searchValue),
      originalTitleKey: section.titleKey,
      originalTextKey: section.textKey,
    }
  })
});

</script>

<style scoped>

h1, h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

p {
  font-size: 1rem;
  max-width: 75ch;
}

.section-about{
  border-left: 5px solid #404167;
  padding-left: 25px;
  margin-bottom: 50px;
}

.section-container{
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
}

.section-box {
  padding: 24px 0;
  padding-left: 25px;
  width: 80vh;
  border-radius: 15px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.section-box:hover{
  transform: scale(1.03);
}

</style>
