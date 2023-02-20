import { JiraService } from './services/jira-service';
import config from 'config';

const jira = new JiraService({
    protocol: "https",
    host: config.get('Jira.auth.host'),
    username: config.get('Jira.auth.username'),
    password: config.get('Jira.auth.password'),
    apiVersion: "3",
    strictSSL: true
});

const main = async () => {
    const info = await jira.getServerInfo();
    console.log(info);
    return;
}

main();
