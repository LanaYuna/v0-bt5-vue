<template>
  <footer class="pt-4 border-top mt-5 bg-body-secondary text-body mt-auto">
    <div class="container py-4">
      <div class="row">
        <!-- Institucional -->
        <div class="col-md-5 mb-4">
          <h5 class="fw-bold">
            <span v-if="isSearching" v-html="highlightedContent.highlightedTitle"></span>
            <span v-else>{{ highlightedContent.originalTitle }}</span>
          </h5>

          <p>
            <span v-if="isSearching" v-html="highlightedContent.highlightedDescription"></span>
            <span v-else>{{ highlightedContent.originalDescription }}</span>
          </p>
        </div>

        <!-- Contato -->
        <div class="col-md-4 mb-4">
          <h5 class="fw-bold">
            <span v-if="isSearching" v-html="highlightedContent.highlightedContact"></span>
            <span v-else>{{ highlightedContent.originalContact }}</span>
          </h5>

          <ul class="list-unstyled">
            <li>
              <span v-if="isSearching" v-html="highlightedContent.highlightedAddress"></span>
              <span v-else>{{ highlightedContent.originalAddress }}</span>
            </li>

            <li>
              <span v-if="isSearching" v-html="highlightedContent.highlightedPhone"></span>
              <span v-else>{{ highlightedContent.originalPhone }}</span>
            </li>

            <li>
              <a :href="'mailto:' + highlightedContent.originalEmail" class="text-decoration-none">
                <span v-if="isSearching" v-html="highlightedContent.highlightedEmail"></span>
                <span v-else>{{ highlightedContent.originalEmail }}</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="col-md-3 mb-4">
          <h5 class="fw-bold">Social</h5>
          <div class="d-flex flex-wrap gap-2 social-icons-container">
            <a v-for="item in socialMedia" :key="item.url" :href="item.url" target="_blank" rel="noopener">
              <svg class="bi social-icon" fill="currentColor">
                <use :xlink:href="getIconPath(item.name)" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="text-center mt-4 small text-muted">
        {{ t("footer.copyright") }}
      </div>
    </div>
  </footer>
</template>


<script setup lang="ts">
import { inject, computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { searchKey } from "@/keys.ts";
import { highlightedText } from "../util/highlightUtil.ts";

const socialMedia = [
  { name: "facebook", alt: t("footer.socialMedia.facebook"), url: "https://www.facebook.com/UTFPR.TD/" },
  { name: "instagram", alt: t("footer.socialMedia.instagram"), url: "https://www.instagram.com/utfprtd/" },
  { name: "linkedin", alt: t("footer.socialMedia.linkedin"), url: "https://www.linkedin.com/school/utfpr-oficial" },
  { name: "tiktok", alt: t("footer.socialMedia.tiktok"), url: "https://tiktok.com/@utfpr.toledo" },
  { name: "twitter-x", alt: t("footer.socialMedia.twitter"), url: "https://x.com/utfpr_td" },
  { name: "whatsapp", alt: t("footer.socialMedia.whatsapp"), url: "https://whatsapp.com/channel/0029Vb3tWIO3wtb3Jvag6Z0H" },
  { name: "youtube", alt: t("footer.socialMedia.youtube"), url: "https://www.youtube.com/@UTFPRToledoOficial" },
];

const getIconPath = (name: string) => {
  return `node_modules/bootstrap-icons/bootstrap-icons.svg#${name}`;
};

const query = inject(searchKey)!;

const textContent = {
  title: "footer.title",
  description: "footer.description",
  contact: "footer.contact",
  address: "footer.address",
  phone: "footer.phone",
  email: "footer.email",
};

const highlightedContent = computed(() => {
  const searchValue = query.value?.trim().toLowerCase() || "";

  const base = {
    originalTitle: t(textContent.title),
    originalDescription: t(textContent.description),
    originalContact: t(textContent.contact),
    originalAddress: t(textContent.address),
    originalPhone: t(textContent.phone),
    originalEmail: t(textContent.email),
  };

  if (!searchValue) {
    return {
      ...base,
      highlightedTitle: null,
      highlightedDescription: null,
      highlightedContact: null,
      highlightedAddress: null,
      highlightedPhone: null,
      highlightedEmail: null,
    };
  }

  return {
    ...base,
    highlightedTitle: highlightedText(base.originalTitle, searchValue),
    highlightedDescription: highlightedText(base.originalDescription, searchValue),
    highlightedContact: highlightedText(base.originalContact, searchValue),
    highlightedAddress: highlightedText(base.originalAddress, searchValue),
    highlightedPhone: highlightedText(base.originalPhone, searchValue),
    highlightedEmail: highlightedText(base.originalEmail, searchValue),
  };
});

const isSearching = computed(() => {
  return !!query.value && query.value.trim().length > 0;
});

</script>

<style scoped>
/* Social icons config */
.social-icon {
  width: 1.3em;
  height: 1.3em;
  transition: transform 0.2s;
}

.social-icon:hover {
  transform: scale(1.2);
}

.social-icons-container {
  font-size: 1rem;
}
</style>
