import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes using createRouteMatcher
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware((auth, req) => {
  // Check if the current route is a public route
  if (!isPublicRoute(req)) {
    auth().protect(); // Protect the route if it's not public
  }
});

// Define matcher for your middleware
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Also include the sign-in and sign-up routes explicitly in matcher
    '/sign-in(.*)',
    '/sign-up(.*)',
  ],
};
