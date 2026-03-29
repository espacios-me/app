export class CloudflareReadAdapter {
    accountId;
    apiToken;
    apiBaseUrl;
    constructor(options) {
        this.accountId = options.accountId;
        this.apiToken = options.apiToken;
        this.apiBaseUrl = options.apiBaseUrl ?? "https://api.cloudflare.com/client/v4";
    }
    async request(path) {
        const response = await fetch(`${this.apiBaseUrl}${path}`, {
            headers: {
                "Content-Type": "application/json",
                ...(this.apiToken ? { Authorization: `Bearer ${this.apiToken}` } : {}),
            },
        });
        if (!response.ok) {
            throw new Error(`Cloudflare API read failed: ${response.status}`);
        }
        const data = (await response.json());
        return data.result;
    }
    async listWorkers() {
        const workers = await this.request(`/accounts/${this.accountId}/workers/scripts`);
        return workers.map((worker) => ({
            id: worker.id ?? worker.script,
            name: worker.id ?? worker.script,
            lastModified: worker.modified_on ?? "unknown",
            usageModel: worker.usage_model,
        }));
    }
    async listPagesProjects() {
        const projects = await this.request(`/accounts/${this.accountId}/pages/projects`);
        return projects.map((project) => ({
            id: project.id,
            name: project.name,
            subdomain: project.subdomain,
            latestDeploymentStatus: project.latest_deployment?.status,
        }));
    }
}
