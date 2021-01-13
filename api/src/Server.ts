import { resolvers, typeDefs } from '@graphql';
import { ApolloServer } from 'apollo-server-express';
import express, { Application } from 'express';

interface ServerOptions {
    port: number;
    database?: unknown;
    rootEndpoint: string;
}

export class Server {
    public port: number;
    public database?: unknown;
    public rootEndpoint: string;

    private app!: Application;
    private server!: ApolloServer;
    private options: ServerOptions;

    constructor(options: ServerOptions) {
        this.port = options.port;
        this.rootEndpoint = options.rootEndpoint;
        this.database = options.database;
        this.options = options;
    }

    async start(): Promise<ServerOptions> {
        return await this.createServer();
    }

    private async createServer(): Promise<ServerOptions> {
        this.server = new ApolloServer({ typeDefs, resolvers });

        this.app = express();
        this.app.listen(this.port);

        await this.server.applyMiddleware({ app: this.app, path: this.rootEndpoint });

        return { rootEndpoint: this.rootEndpoint, port: this.port };
    }
}
