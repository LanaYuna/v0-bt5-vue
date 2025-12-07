<template>
  <div class="container py-4">
    <div id="newsCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div
          class="carousel-item"
          :class="{ active: index === 0 }"
          v-for="(chunk, index) in chunkedNews"
          :key="index"
        >
          <div class="row">
            <div class="col-md-4" v-for="news in chunk" :key="news.id">
              <a :href="news.link" target="_blank" rel="noopener" class="card-link">
                <div class="card h-100 shadow-sm">
                  <img :src="news.image" class="card-img-top" :alt="news.title" />
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title" v-html="news.title"></h5>
                    <p class="text-muted mb-1">
                      <i class="bi bi-clock" v-html="news.date"></i> 
                    </p>
                    <p class="card-text" v-html="news.description"></p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#newsCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">{{ t('newsPage.carousel.prev') }}</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#newsCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">{{ t('newsPage.carousel.next') }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useI18n } from "vue-i18n";
import newsData from '@/data/news.json';
import { highlightedText } from '@/util/highlightUtil';
import { searchKey } from '@/keys';

const { t } = useI18n()
const query = inject(searchKey)!;

const newsList = computed(() => {
  const searchValue = query.value ? query.value.trim().toLowerCase() : '';

  return newsData.map(news => {
    const title = t(news.title);
    const description = t(news.description);
    const date = t(news.date);

    return {
      ...news,
      title: searchValue ? highlightedText(title, searchValue) : title,
      description: searchValue ? highlightedText(description, searchValue) : description,
      date: searchValue ? highlightedText(date, searchValue) : date
    };
  });
});

const chunkedNews = computed(() => {
  const chunkSize = 3
  const chunks = []
  for (let i = 0; i < newsList.value.length; i += chunkSize) {
    chunks.push(newsList.value.slice(i, i + chunkSize))
  }
  return chunks
})


</script>

<style scoped>
.card-title {
  font-weight: bold;
}
.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-image: none;
  color: white;
  font-size: 5rem;
}

.carousel-control-prev::after,
.carousel-control-next::after {
  content: '‹';
  color: white;
  font-size: 5rem;
  font-weight: bold;
}

.carousel-control-next::after {
  content: '›';
}

.card-link {
  text-decoration: none;
  color: inherit;
}

.card-link .card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.15) !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

</style>
