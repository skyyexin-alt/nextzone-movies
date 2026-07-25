# NextZone Deployment Workflow

When the user requests any changes to the NextZone website, follow this exact workflow:

1. **Make the changes locally**: Edit the necessary files in the codebase.
2. **Local Preview**: Instruct the user to preview the new changes immediately on their Chrome localhost (`http://localhost:3000`).
3. **Confirmation Button**: Create an artifact (e.g., `deploy_to_vercel.md`) summarizing the changes and set `RequestFeedback: true`. This will give the user a "Proceed" button in their chat UI.
4. **Deploy**: Once the user clicks the "Proceed" button to approve the changes, you must immediately run the deployment commands in the terminal on their behalf to push the code live:
   ```bash
   git add .
   git commit -m "Your descriptive commit message here"
   git push
   ```
