import { createProxyHandler } from "@/lib/proxy-handler";

const handler = createProxyHandler("shopping-list");

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
