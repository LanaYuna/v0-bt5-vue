<script setup lang="ts"> 
import Navbar from "@/components/NavBar.vue";
import FooterBar from "@/components/FooterBar.vue";
import { computed, provide, ref } from 'vue';
import { useRoute } from 'vue-router';
import ChatBot from "./components/ChatBot.vue";
import { searchKey } from "./keys.ts";


const route = useRoute();

const useMainLayout = computed(() => route.name !== 'Tasks');

const query = ref('');

provide(searchKey, query);

</script>

<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    
    <ChatBot/>

    <Navbar />
    
    <div class="flex-fill d-flex flex-column">
      <main class="flex-fill" :class="{ 'container py-4': useMainLayout }">
        <RouterView />
      </main>
    </div>

    <FooterBar />
  </div>
</template>

<style>

html[data-bs-theme="light"] mark { 
  background-color: rgb(203, 214, 255);
  padding: 0;
  border-radius: 5px;
}


html[data-bs-theme="dark"] mark {
  background-color: rgb(47, 75, 111); 
  padding: 0;
  border-radius: 5px;
}


</style>