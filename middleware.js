import { NextResponse } from "next/server";

export default async function middleware(req, res) {
  const token = req.cookies.get("token")?.value;
  if (token) {
    // const getUser = await fetch("http://localhost:3000/api/getUser?uid=" + uid);
  } else {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/"],
};

// if (host_check.valid) {
//     //Webstore
//     const arr = host.split(".");
//     if (arr.length === 3 && arr[0] != "www" && nextUrl.pathname === "/") {
//         return NextResponse.rewrite(new URL("/webstore", req.url));
//     } else if (nextUrl.pathname === "/") {
//         if (
//             host.includes(process.env.NEXT_PUBLIC_MAIN_DOMAIN) ||
//             host.includes("propertysource.app")
//         ) {
//             return NextResponse.next();
//         } else {
//             return NextResponse.redirect(new URL("/login", nextUrl));
//         }
//     }
// } else {
//     return NextResponse.rewrite(new URL("/cant-find", req.url));
// }
