import axios from "axios";
import { type NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export function createProxyHandler(targetModule: string) {
	return async (
		req: NextRequest,
		{ params }: { params: { path: string[] } },
	) => {
		const { path } = params;
		const targetPath = path.join("/");
		const method = req.method;

		// 1. Extrai o token do cookie HttpOnly
		const tokenCookie = req.cookies.get("token")?.value;

		// biome-ignore lint/suspicious/noExplicitAny: Standard body type
		let body: any = undefined;
		if (!["GET", "HEAD", "DELETE"].includes(method)) {
			try {
				body = await req.json();
			} catch (e) {
				body = undefined;
			}
		}

		const headers: Record<string, string> = {
			"Content-Type": "application/json",
		};

		// 2. Injeta o token no cabeçalho Authorization para o backend real
		if (tokenCookie) {
			headers.Authorization = `Bearer ${tokenCookie}`;
		} else {
			// Fallback para headers manuais (ex: durante a transição ou casos específicos)
			const authHeader = req.headers.get("authorization");
			if (authHeader) {
				headers.Authorization = authHeader;
			}
		}

		try {
			const response = await axios({
				url: `${BACKEND_URL}/${targetModule}/${targetPath}`,
				method,
				data: body,
				headers,
				params: Object.fromEntries(req.nextUrl.searchParams),
			});

			const resData = response.data;
			
			// 3. Verifica se é uma rota de autenticação que emite tokens
			const isAuthRoute = targetModule === "auth";
			const isLoginOrRegister = isAuthRoute && (targetPath === "login" || targetPath === "register");
			const isRefreshRoute = isAuthRoute && targetPath === "refresh";

			if (isLoginOrRegister || isRefreshRoute) {
				// Mapeia os campos de token (o backend usa 'token' no login/register e 'idToken' no refresh)
				const accessToken = resData.token || resData.idToken;
				const refreshToken = resData.refreshToken;

				if (accessToken) {
					// Remove os tokens do corpo da resposta que vai para o cliente JS
					const safeData = { ...resData };
					delete safeData.token;
					delete safeData.idToken;
					delete safeData.refreshToken;

					const nextRes = NextResponse.json(safeData, { status: response.status });

					// Configura os cookies HttpOnly
					const cookieOptions = {
						httpOnly: true,
						secure: process.env.NODE_ENV === "production",
						sameSite: "strict" as const,
						path: "/",
					};

					nextRes.cookies.set("token", accessToken, {
						...cookieOptions,
						maxAge: 60 * 60 * 24 * 7, // 7 dias
					});

					if (refreshToken) {
						nextRes.cookies.set("refreshToken", refreshToken, {
							...cookieOptions,
							maxAge: 60 * 60 * 24 * 30, // 30 dias
						});
					}

					return nextRes;
				}
			}

			return NextResponse.json(resData, { status: response.status });
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const status = error.response?.status || 500;
				const data = error.response?.data || {
					message: "Internal Server Error",
				};
				return NextResponse.json(data, { status });
			}
			console.error(`[BFF Proxy Error] ${method} ${targetModule}/${targetPath}:`, error);
			return NextResponse.json(
				{ message: "Internal Server Error" },
				{ status: 500 },
			);
		}
	};
}
