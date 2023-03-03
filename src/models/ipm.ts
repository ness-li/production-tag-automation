export interface Config {
    host: string;
    ipmVersion: string;
    environment: string;
    token: string;
}

export interface SearchAppsResponse {
    name: string;
    label: string;
    theme: string;
    enabled: boolean;
    version: string;
    iconUrl: string;
}

export interface Tag {
    staging: string[];
    production: string[];
}

export interface Meta {
    label: string;
    theme: string;
    tag: Tag;
    enabled: boolean;
}

export interface getAppResponse {
    name: string;
    path: string;
    type: string;
    meta: Meta;
    versions: string[];
    version: string;
}