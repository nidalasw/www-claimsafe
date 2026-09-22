# Website text editor

Visit `/admin` to sign in, choose English or French, and edit text by section. **Review changes** shows the old and new text; **Publish** commits the selected dictionary to GitHub. Vercel's Git integration then builds and deploys the website. No database is used.

The editor reads the latest file from GitHub, including edits that have not finished deploying. English and French are published separately. Switching languages preserves both drafts in the current tab. Reloading or closing the tab loses unpublished edits; use **Download draft** to keep a copy. Downloaded drafts are JSON backups for manual recovery, not automatically imported.

## One-time setup in Vercel

1. Connect the Vercel project to `nidalasw/www-claimsafe`, with `main` as its production branch and automatic Git deployments enabled.
2. Create a [fine-grained GitHub personal access token](https://github.com/settings/personal-access-tokens/new), restricted to **this repository**, with repository **Contents: Read and write** permission. Use an account allowed to push to the production branch and deploy this Vercel project. Organization approval or branch protection rules may also apply.
3. Add these **server-only** environment variables under Vercel → Project → Settings → Environment Variables:

   | Variable | Value |
   | --- | --- |
   | `ADMIN_PASSWORD` | A unique, randomly generated password of at least 24 characters, saved in a password manager. |
   | `ADMIN_GITHUB_TOKEN` | The fine-grained token from step 2. |
   | `ADMIN_GITHUB_REPOSITORY` | `nidalasw/www-claimsafe` |
   | `ADMIN_GITHUB_BRANCH` | `main`, or your actual Vercel production branch. |

4. Scope production credentials to **Production**, then deploy the code. Do not use `NEXT_PUBLIC_` prefixes. For development, copy `.env.example` to `.env.local` and use a test repository/branch if testing publishes. Every successful publish writes to the configured branch, even on localhost or a preview deployment.
5. Open `https://your-domain/admin`, log in, and publish a small text change. Confirm the commit appears in GitHub and that the Vercel deployment succeeds. A saved commit does not guarantee a successful deployment; check Vercel if the website does not update.

The owner only needs the admin URL and password. They do not need a GitHub account or access to Vercel. Renew the GitHub token before it expires.

## Authentication and publishing behavior

- Login uses a signed, HTTP-only, SameSite=Strict cookie that expires after eight hours. Production cookies require HTTPS. Changing `ADMIN_PASSWORD` and redeploying invalidates existing sessions.
- Every content API request checks authentication. Write requests also check the request origin. GitHub credentials are only used on the server.
- Login requires a long random password. There is no shared database-backed login rate limiter; configure a Vercel Firewall rate-limit rule for `POST /api/admin/session` for additional protection against repeated attempts.
- Only `en.json` and `fr.json` can be written. Validation preserves the complete dictionary structure, array lengths, and internal form option identifiers. Text fields are limited to 12,000 characters; the page title template must retain `%s`.
- Updates use GitHub's file SHA so stale editors cannot overwrite newer edits. On conflict, download the draft, reload the latest text, and reapply the desired changes.
- Publishing replaces the selected JSON file with UTF-8, two-space-indented JSON. It does not write to Vercel's filesystem. After an admin publish, pull the new commit before making local code changes.
- The admin page is marked `noindex`. API authentication protects publishing.

GitHub API reference: [Read and update repository contents](https://docs.github.com/en/rest/repos/contents).

## Checks

```sh
npm run lint
npm run test:admin
npm run build
```

Admin tests use mocked GitHub responses and do not commit to the real repository.
