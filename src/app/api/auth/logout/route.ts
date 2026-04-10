import { NextResponse } from "next/server";

export async function POST() {
	const response = NextResponse.json({ message: "Logged out successfully" });

	// Limpa os cookies de autenticação
	const cookieOptions = {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict" as const,
		path: "/",
		maxAge: 0, // Expira imediatamente
	};

	response.cookies.set("token", "", cookieOptions);
	response.cookies.set("refreshToken", "", cookieOptions);

	return response;
}
