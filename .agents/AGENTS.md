# Automatic Deployment & GitHub Push Workflow

When making changes to the XFlix Movies Review codebase:
1. **Make changes locally**: Edit and verify the necessary files in the codebase.
2. **Auto Commit & Push**: Automatically stage (`git add`), commit with a descriptive message, and push (`git push origin main`) to GitHub so GitHub Actions triggers automatic deployment to Hetzner VPS.

# Clean Video Player Rule
- **Clean Video Frame Standard**: Always use the custom chromeless XFlix Video Player Frame (`XFlixTrailerPlayer.tsx` / `CustomVideoPlayer.tsx`) for video embeds and trailers.
- **Zero Third-Party Branding**: Ensure all video frames remain 100% clean with zero YouTube logos, zero third-party branding overlays, zero recommendation popups, and zero ad shields.
- **XFlix Branded Controls**: Maintain top title headers with `1080p Full HD` badges and sleek custom controls across all viewports.


