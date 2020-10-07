interface IConfig {
    DB: string;
    PORT: number | string;
    SECRET_KEY: string;
    EMAIL_API_KEY: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_SECRET_ID: string;
}
declare const defautlConfig: IConfig;
export { defautlConfig };
