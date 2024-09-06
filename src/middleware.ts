// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const USER = request.cookies.get("USER")
    if (!USER && request.nextUrl.pathname !== "/Login") {
        return NextResponse.redirect(new URL('/Login', request.url));
    }
    else {
        return NextResponse.next();
    }

}

// Configuración opcional del middleware
export const config = {
    matcher: ['/'], // Aplicar solo en la raíz
};
