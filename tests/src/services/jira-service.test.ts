import { JiraService } from '../../../src/services/jira-service';
import config from 'config';

const jira = new JiraService({
    protocol: "https",
    host: config.get('Jira.auth.host'),
    username: config.get('Jira.auth.username'),
    password: config.get('Jira.auth.password'),
    apiVersion: "3",
    strictSSL: true
});

test('should be able to create a connection to Jira', async () => {
    const info = await jira.getServerInfo();
    expect(info).toBeDefined();
    expect(info.baseUrl).toBeDefined();
});

test('should be able to get releases', async () => {
    const releases = await jira.getReleases('SEA');
    expect(Array.isArray(releases)).toBeTruthy();
    expect(releases[0]).toBeDefined();
});

test('should be able to get issues from a specific release', async () => {
    const issues = await jira.getReleaseIssues('SEA', '10086');
    expect(Array.isArray(issues)).toBeTruthy();
    expect(issues[0]).toBeDefined();
});

test('should be able to get issues by a specific component', async () => {
    const issues = await jira.getComponentIssues('SEA', 'Salesforce');
    expect(Array.isArray(issues)).toBeTruthy();
    expect(issues[0]).toBeDefined();
});

test('should be able to get the status of an issue', async () => {
    const issue = await jira.getIssue('SEA-1', ['status']);
    expect(issue).toBeDefined();
    expect(issue.fields).toBeDefined();
    expect(issue.fields.status).toBeDefined();
});

test('should be able to transit an issue', async () => {
    const response = await jira.listTransitions('SEA-1');
    const { transitions } = response;
    await jira.transitionIssue('SEA-1', {
        transition: {
            id: transitions[0].id
        },
        /*
        fields: {
            resolution: {
                id: "10001"
            }
        }
        */
    });

    const issue = await jira.getIssue('SEA-1', ['status', 'resolution']);
    expect(issue).toBeDefined();
    expect(issue.fields).toBeDefined();
    expect(issue.fields.status).toBeDefined();
});
