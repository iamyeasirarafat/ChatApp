import Cookies from "cookies";
export default async function middleware(req, res) {
  const cookies = new Cookies(req); // Create a cookies instance
  const access_token = cookies.get("access_token");
  console.log(cookies, "sss");

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
}

// export const config = {
//     matcher: ["/", "/([^/.]*)", "/((?!api|_next|favicon.ico).*)", "/app/:path*", "/admin/:path*"],
// };
