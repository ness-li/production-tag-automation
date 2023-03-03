import { IPMService } from "../../../src/services/ipm-service";
import config from "config";

const ipm = new IPMService({
    host: config.get("IPM.host"),
    ipmVersion: config.get("IPM.ipmVersion"),
    environment: config.get("IPM.environment"),
    token: config.get("IPM.token"),
});

const appName = "adalo";

test("should retrieve a list of apps", async () => {
    const apps = await ipm.searchApps(appName);
    expect(Array.isArray(apps)).toBeTruthy();
    expect(apps[0]).toBeDefined();
    expect(apps[0].name).toBeDefined();
});

test("should get an app's info", async () => {
    const app = await ipm.getApp(appName);
    expect(app).toBeDefined();
    expect(app.name).toBeDefined();
    expect(app.meta).toBeDefined();
    expect(app.meta.tag).toBeDefined();
    expect(Array.isArray(app.meta.tag.staging)).toBeTruthy();
});

test("should tag an app's staging version to production", async () => {
    const success = await ipm.tagApp2Production(appName);
    expect(success).toBeTruthy();
});