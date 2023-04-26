import type { AsyncComponent } from "vue";
import type Vue from "vue";

export declare class Store {
	store: Vue;

	$get(key: string): any;

	$set(key: string, value: any): void;
	$emit: typeof Vue.prototype.$emit;
	$on: typeof Vue.prototype.$on;
}

export declare class VuePressStore extends Store {
	isPageExists(pageKey: string): boolean;

	isPageLoaded(pageKey: string): boolean;

	getPageAsyncComponent(pageKey: string): () => Promise<AsyncComponent>;

	loadPageAsyncComponent(pageKey: string): Promise<AsyncComponent>;

	registerPageAsyncComponent(pageKey: string): void;
}

declare module "vue/types/vue" {
	export interface Vue {
		$vuepress: VuePressStore
	}
	export interface VueConstructor {
		$vuepress: VuePressStore
	}
}
