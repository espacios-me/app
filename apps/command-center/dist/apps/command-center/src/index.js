import { cloudflarePage } from "./routes/cloudflare";
import { githubPage } from "./routes/github";
import { overviewPage } from "./routes/overview";
export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const path = url.pathname.replace(/\/$/, "");
        if (path === "/command-center" || path === "") {
            return new Response(overviewPage(), { headers: { "content-type": "text/html;charset=UTF-8" } });
        }
        if (path === "/command-center/github") {
            return new Response(await githubPage(env.GITHUB_ORG, env.GITHUB_REPO, env.GITHUB_TOKEN), {
                headers: { "content-type": "text/html;charset=UTF-8" },
            });
        }
        if (path === "/command-center/cloudflare") {
            return new Response(await cloudflarePage(env.CLOUDFLARE_ACCOUNT_ID, env.CLOUDFLARE_API_TOKEN), {
                headers: { "content-type": "text/html;charset=UTF-8" },
            });
        }
        return new Response("Not found", { status: 404 });
    },
};
