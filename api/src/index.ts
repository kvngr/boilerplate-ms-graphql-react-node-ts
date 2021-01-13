import { Server } from './Server';

const rootEndpoint = `${process.env.ROOT_ENDPOINT}${process.env.API_VERSION}`;
const port = Number(process.env.API_PORT);

const serverOptions = {
    port,
    rootEndpoint,
};

new Server(serverOptions)
    .start()
    // eslint-disable-next-line no-console
    .then(({ rootEndpoint, port }) => console.log(`🚀 Server ready at ${process.env.BASE_URL}:${port}${rootEndpoint}`));
