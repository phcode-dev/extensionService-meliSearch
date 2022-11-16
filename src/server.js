import fastify from "fastify";
import {getConfigs} from "./utils/configs.js";
import {getSearchSchema, search} from "./api/search.js";

const server = fastify({logger: true});

/* root handler. It is a function that is called when a request is made to the server. */
server.get('/hello', function (request, reply) {
    return "Hello World";
});
server.post('/search', getSearchSchema(), function (request, reply) {
    return search(request, reply);
});

export async function startServer(configs) {
    try {
        await server.listen({port: configs.port, host: configs.allowPublicAccess ? '0.0.0.0' : 'localhost'});
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

export async function start() {
    const serverConfigs = getConfigs();
    await startServer(serverConfigs);
}
