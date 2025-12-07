<template>
  <div class="ag-format-container">
    <div class="ag-courses_box">
      <div class="ag-courses_item" v-for="(curso, index) in highlightedContent" :key="index">
        <a :href="curso.originalUrl" class="ag-courses-item_link">
          <div class="ag-courses-item_bg" :style="{ backgroundColor: curso.originalColor }"></div>

          <div class="ag-courses-item_title" v-html="curso.highlightedTitle">
          </div>

          <div class="ag-courses-item_type" v-html="curso.highlightedType">
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed } from "vue";
import { useI18n } from "vue-i18n";
import { searchKey } from "../keys.ts";
import { highlightedText } from "../util/highlightUtil.ts";

const { t } = useI18n();

interface Curso {
  tituloKey: string;
  tipoKey: string;
  cor: string;
  url: string;
}

const cursos = ref<Curso[]>([
  {
    tituloKey: "courses.civil_eng",
    tipoKey: "courses.bachelor",
    cor: "#f9b234",
    url: "https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/toledo/td-engenharia-civil" ,
  },
  {
    tituloKey: "courses.comp_eng",
    tipoKey: "courses.bachelor",
    cor: "#3ecd5e",
    url: "https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/toledo/td-engenharia-de-computacao",
  },
  {
    tituloKey: "courses.biopro_eng",
    tipoKey: "courses.bachelor",
    cor: "#e44002",
    url: "https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/toledo/td-engenharia-de-bioprocessos-e-biotecnologia",
  },
  {
    tituloKey: "courses.electro_eng",
    tipoKey: "courses.bachelor",
    cor: "#952aff",
    url: "https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/toledo/td-engenharia-eletronica",
  },
  {
    tituloKey: "courses.math_lic",
    tipoKey: "courses.licentiate",
    cor: "#cd3e94",
    url: "https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/toledo/td-licenciatura-em-matematica",
  },
  {
    tituloKey: "courses.chem_proc_tec",
    tipoKey: "courses.technologist",
    cor: "#4c4ea9",
    url: "https://www.utfpr.edu.br/cursos/graduacao/tecnologia/tecnologia-em-processos-quimicos",
  },
  {
    tituloKey: "courses.web_sys_tec",
    tipoKey: "courses.technologist",
    cor: "#0E9594",
    url: "https://www.utfpr.edu.br/cursos/graduacao/tecnologia/cursos/coordenacoes/graduacao/toledo/td-tecnologia-em-sistemas-para-internet",
  },
]);

const query = inject(searchKey)!;

const highlightedContent = computed(() => {
  const searchValue = query.value? query.value.trim().toLowerCase() : '';
  
  if(!searchValue){
    // Pesquisa vazia, retorna todas as seções sem nenhum destaque
    return cursos.value.map( curso => ({
      highlightedTitle: t(curso.tituloKey),
      highlightedType: t(curso.tipoKey), 
      originalUrl: curso.url,        
      originalColor: curso.cor,        
      originalTitleKey: curso.tituloKey, 
      originalTypeKey: curso.tipoKey,
    }));
  }

  // Pesquisa ativa, retorna a seção sublinhada
  return cursos.value
  .filter( curso => {
    const title = t(curso.tituloKey).toLowerCase();
    const type = t(curso.tipoKey).toLowerCase();
    return title.includes(searchValue) || type.includes(searchValue);
  })

  .map( curso => {
    const title = t(curso.tituloKey);
    const type = t(curso.tipoKey);

    return {
      highlightedTitle: highlightedText(title, searchValue),
      highlightedType: highlightedText(type, searchValue),
      originalUrl: curso.url,
      originalColor: curso.cor,
      originalTypeKey: curso.tipoKey,
      originalTitleKey: curso.tituloKey,
    }
  })
});
</script>

<style>
.ag-format-container {
  width: 100%;
  max-width: 1142px;
  margin: 0 auto;
  padding: 0 15px;
}

.ag-courses_box {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 50px 0;
}

.ag-courses_item {
  flex-basis: calc(33.33333% - 30px);
  margin: 0 15px 30px;
  overflow: hidden;
  border-radius: 28px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.ag-courses-item_link {
  display: flex;
  flex-direction: column;
  min-height: 280px;
  padding: 30px 20px;
  background-color: var(--bs-body-bg);
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  text-decoration: none;
}

.ag-courses-item_link:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  text-decoration: none;
}

.ag-courses-item_link:hover .ag-courses-item_bg {
  transform: scale(10);
}

.ag-courses-item_title {
  flex-grow: 1;
  min-height: 87px;
  margin: 0 0 15px;
  overflow: hidden;
  font-weight: bold;
  font-size: 28px;
  color: var(--bs-body-color);
  z-index: 2;
  position: relative;
}

.ag-courses-item_type {
  font-size: 16px;
  font-weight: 500;
  color: var(--bs-secondary-color);
  text-align: center;
  z-index: 2;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.ag-courses-item_bg {
  height: 128px;
  width: 128px;
  z-index: 1;
  position: absolute;
  top: -75px;
  right: -75px;
  border-radius: 50%;
  transition: all 0.5s ease;
}

@media only screen and (max-width: 979px) {
  .ag-courses_item {
    flex-basis: calc(50% - 30px);
  }
}

@media only screen and (max-width: 639px) {
  .ag-courses_item {
    flex-basis: 100%;
  }
}
</style>