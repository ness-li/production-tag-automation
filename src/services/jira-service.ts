import JiraApi from 'jira-client';

const issueFields = [
    "summary",
    "issuetype",
    "fixVersions",
    "status"
];

export class JiraService extends JiraApi {
    constructor(
        private config: JiraApi.JiraApiOptions
    ) {
        super(config);
    }

    async getReleases(project: string) {
        const releases = await this.getVersions(project);
        return releases;
    }

    async getReleaseIssues(project:string, releaseId: string) {
        const result = await this.searchJira(`project = ${project} AND fixVersion = ${releaseId}`, {
            maxResults: 1000,
            fields: issueFields
        });
        return result.issues as JiraApi.IssueObject[];
    }

    async getComponentIssues(project: string, component: string) {
        const result = await this.searchJira(`project = ${project} AND component = ${component}`, {
            maxResults: 1000,
            fields: issueFields
        });
        return result.issues as JiraApi.IssueObject[];
    }

}
