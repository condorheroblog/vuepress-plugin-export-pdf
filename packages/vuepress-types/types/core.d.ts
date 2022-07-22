import type { Context, ContextOptions } from "./context";

export const version: string;

export function createApp(options: ContextOptions): Context;

export function dev(options: ContextOptions): Promise<Context>;

export function build(options: ContextOptions): Promise<Context>;

export function eject(dir: string): Promise<void>;
