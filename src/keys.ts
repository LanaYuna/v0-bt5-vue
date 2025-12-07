import type { InjectionKey, Ref } from 'vue';

export const searchKey: InjectionKey<Ref<string>> = Symbol('searchQuery');  