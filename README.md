
  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## EmailJS (contact form)

  - Service ID: `service_7mt3f64`
  - Template ID: `template_or37zvb`
  - Public Key: `3BZeraaoqmME7mtIC`
  - "To Email" (where enquiries land) is set inside the template itself, in the
    EmailJS dashboard under Email Templates → Contact Us → To Email field.

  ## Deploying to Cloudflare

  This site deploys as a Cloudflare Worker with static assets (config in
  `wrangler.jsonc`), not through Cloudflare's Git auto-build — that integration
  ended up connected to a stale auto-imported repo, so deploys are done
  directly from the CLI instead.

  ### One-time setup

  1. Install and authenticate Wrangler (only needed once per machine):
     ```
     npx wrangler login
     ```
     This opens a browser tab to approve access to your Cloudflare account.

  2. `wrangler.jsonc` already defines:
     - `assets.directory`: `./dist` (the Vite build output)
     - `routes`: the custom domains `visrambhafoundation.org` and
       `www.visrambhafoundation.org`, provisioned automatically on deploy
       since the domain is registered with Cloudflare.

  ### Every deploy

  ```
  npm run build
  npx wrangler deploy
  ```

  `npm run build` runs Vite and outputs to `dist/`. `npx wrangler deploy`
  uploads `dist/` and publishes it live at both the `*.workers.dev` URL and
  the custom domain(s) defined in `wrangler.jsonc`.

  Check the deployed project at:
  https://dash.cloudflare.com → Workers & Pages → visrambha
