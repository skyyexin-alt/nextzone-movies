# NextZone Development Workflow (Local / Offline Mode)

This project is strictly for **local / offline use**.

# Implicit Fix & Organize Rule
- **Empty Message / Screenshot-Only Requests**: Whenever the user sends an image/screenshot without typing any text, automatically analyze the image for red arrows, overlapping text, cramped headers, or layout issues, and immediately fix and organize the UI elements in the codebase.

When the user requests changes to the XFlix Movies Review codebase:
1. **Make changes locally**: Edit the necessary files in the codebase.
2. **Local Preview**: Instruct the user to preview changes on their local server (`http://localhost:3000`).
3. **No Deployment Required**: Do not prompt for git commit/push or server deployments (Hetzner). Keep all changes local.

# Clean Video Player Rule
- **Clean Video Frame Standard**: Always use the custom chromeless XFlix Video Player Frame (`XFlixTrailerPlayer.tsx` / `CustomVideoPlayer.tsx`) for video embeds and trailers.
- **Zero Third-Party Branding**: Ensure all video frames remain 100% clean with zero YouTube logos, zero third-party branding overlays, zero recommendation popups, and zero ad shields.
- **XFlix Branded Controls**: Maintain top title headers with `1080p Full HD` badges and sleek custom controls across all viewports.


