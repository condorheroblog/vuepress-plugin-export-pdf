import type { CAC } from "cac";
import type { Application } from "express";
import type WebpackDevServer from "webpack-dev-server";
import type Config from "webpack-chain";
import type { PluginConfig } from "./config";
import type { Context } from "./context";
import type { Markdown } from "./markdown";
import type { Page, PageOptions } from "./page";
import type { PluginAPI } from "./plugin-api";

export type Plugin<Options = any> = PluginOptionAPI | PluginFunction<Options>;

export type PluginFunction<Options = any> = (
	pluginOptions: Options,
	context: Context,
	pluginApi: PluginAPI
) => PluginOptionAPI;

export interface PluginGeneratedFile {
	name: string
	content: string
}

export type EnhanceAppFilesGeneratedFile = PluginGeneratedFile;

export type ClientDynamicModulesGeneratedFile = PluginGeneratedFile & {
	dirname?: string
};

export type PluginGeneratedFileTypes<T extends PluginGeneratedFile> =
  | T
  | T[]
  | Promise<T>
  | Promise<T[]>;

export interface PluginOptionAPI {
	name?: string
	plugins?: PluginConfig[]
	chainWebpack?: (config: Config, isServer: boolean) => void
	define?: Record<string, unknown> | (() => Record<string, unknown>)
	alias?: Record<string, string>
	beforeDevServer?: (app: Application, server: WebpackDevServer) => void
	afterDevServer?: (app: Application, server: WebpackDevServer) => void
	extendMarkdown?: (md: Markdown) => void
	// TODO: ask markdown-it-chain to add types definitions
	chainMarkdown?: (config: any) => void
	enhanceAppFiles?:
	| string
	| string[]
	| (() =>
	| PluginGeneratedFileTypes<EnhanceAppFilesGeneratedFile>
	| string
	| string[])
	clientDynamicModules?: () => PluginGeneratedFileTypes<
  ClientDynamicModulesGeneratedFile
  >
	extendPageData?: (page: Page) => void | Promise<void>
	clientRootMixin?: string
	additionalPages?:
	| Partial<PageOptions>[]
	| (() => Promise<Partial<PageOptions>[]>)
	globalUIComponents?: string | string[]
	extendCli?: (cli: CAC) => void
	multiple?: boolean
	// Life Cycle
	// https://vuepress.vuejs.org/plugin/life-cycle.html
	ready?: () => void | Promise<void>
	updated?: () => void | Promise<void>
	generated?: (pagePaths: string[]) => void | Promise<void>
}
