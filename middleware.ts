import { clerkMiddleware } from "@clerk/nextjs/server";



export default clerkMiddleware({
        // @ts-ignore
      publicRoutes: ["/api/webhook"]
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};