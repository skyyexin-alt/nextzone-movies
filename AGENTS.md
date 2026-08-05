<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# NextZone Deployment Workflow (Hetzner VPS)

NextZone is deployed on a **Hetzner VPS** (NOT Vercel). When the user requests changes:

1. **Make changes locally**.
2. **Local Preview**: Instruct the user to preview changes on `http://localhost:3000`.
3. **Confirmation Button**: Create an artifact (e.g., `deploy_to_hetzner.md` or `deploy_changes.md`) summarizing changes with `RequestFeedback: true`.
4. **Deploy**: Once approved, run git commands (`git add .`, `git commit`, `git push`) to trigger deployment on the Hetzner VPS.

