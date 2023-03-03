import axios, { AxiosInstance } from "axios";
import * as IPM from "../models/ipm";

export class IPMService {
    private api: AxiosInstance;

    constructor(
        private config: IPM.Config
    ) {
        this.api = axios.create({
            baseURL: config.host,
            headers: {
                "x-imt-ipm-version": config.ipmVersion,
                "x-imt-env": config.environment,
                "x-imt-token": config.token,
            },
        });
    }

    async searchApps(term?: string | undefined) {
        const response = await this.api.get(`/v3/search/apps/${term || ""}`);
        return response.data as IPM.SearchAppsResponse[];
    }

    async getApp(name?: string) {
        const response = await this.api.get(`/v3/info/${name}`);
        return response.data as IPM.getAppResponse;
    }

    async tagApp2Production(name: string) {
        const app = await this.getApp(name);
        const ver = app.meta.tag.staging[0];
        const response = await this.api.post(`/v3/tag/${name}/${ver}/production`);
        return response.status === 200 ? true : false;
    }

}
