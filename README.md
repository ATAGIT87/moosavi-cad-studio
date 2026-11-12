# Moosavi CAD Studio

A German-language, responsive CAD studio website built with React, TypeScript, Vite, Tailwind CSS and Lucide. The initial portfolio images are original illustrative studies, not customer references.

The site has three pages: Home (`/`, including services and contact), Über uns (`/uber-uns`) and Portfolioseite (`/portfolio`). Cloudflare Pages serves the application fallback for direct visits to these paths.

## Local development

```sh
npm install
npm run dev
npm run build
```

The Vite development server only serves the front end; it does not run the Cloudflare Pages Function. To test the form locally, use the Cloudflare Pages local development server (for example, `npx wrangler pages dev dist` after building) with the variables below in an untracked `.dev.vars` file. Do not commit credentials.

## Contact form and Cloudflare Pages

The form posts to `functions/api/contact.ts`, a Cloudflare Pages Function that sends email through [Resend](https://resend.com/). In Cloudflare Pages, set:

- `RESEND_API_KEY`: a Resend API key, stored as a secret.
- `RESEND_FROM_EMAIL`: a sender address on a domain verified with Resend, for example `studio@your-verified-domain.de`.

The recipient is `al.tabatabaei@yahoo.com`, as supplied by the owner, and can be changed in `functions/api/contact.ts`. The visitor's email is used as the reply-to address. The form supports one PDF, JPG, PNG, DWG, DXF, STEP or STP file up to 5 MB. Without the configuration, submissions show an explicit error and the direct email address. A production delivery test requires a configured Resend account and verified sending domain.

Create a Cloudflare Pages project connected to this repository with build command `npm run build` and build output directory `dist`. The `functions/` directory must remain at the repository root so Pages deploys the endpoint. Configure environment variables for the appropriate deployment environments and redeploy after changes.

Before publishing, provide the legally required business information, including an appropriate Impressum and Datenschutzerklärung, and review the contact form and email provider's data processing arrangements for your circumstances. Those details were not supplied and have not been invented.

## Editing the portfolio

Edit the `projects` array in `src/data/content.ts`. Add images under `public/images/` and use paths such as `/images/project.webp`. Each entry has a title, one of the existing categories, a short description, an image path, descriptive alt text and an `illustrative` flag. Set that flag to `false` for actual projects you have permission to publish; illustrative labels and the disclaimer adjust automatically. The gallery initially shows up to six projects in the selected category and offers a “Mehr Projekte” button when there are more.
