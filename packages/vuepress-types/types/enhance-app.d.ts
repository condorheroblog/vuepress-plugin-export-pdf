import type { VueConstructor } from "vue";
import type { RouterOptions } from "vue-router";
import type VueRouter from "vue-router";
import type { SiteData } from "./context";

export type EnhanceApp = (options: {
	Vue: VueConstructor
	options: Record<string, any>
	router: VueRouter & { options: RouterOptions }
	siteData: SiteData
	isServer: boolean
}) => void;
