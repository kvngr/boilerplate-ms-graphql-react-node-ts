declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';

        NODE_VERSION: string;
        NPM_VERSION: string;
        BASE_URL: string;
        API_PORT: string;
        ROOT_ENDPOINT: string;
        API_VERSION: string;

        PORT_CLIENT: string;

        DATABASE_PORT: string;
        DATABASE_USERNAME: string;
        DATABASE_PASSWORD: string;
        DATABASE_NAME: string;
    }
}
