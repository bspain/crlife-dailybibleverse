import * as http from 'http';
import * as Config from './config';
import Logger from './logger';

const logger = new Logger();

const { app, adminApp, config } = Config.default(logger);

console.log(`Process env APP_ENV: ${process.env.APP_ENV}`);
console.log(`Process env DEBUG: ${process.env.DEBUG}`)
console.log(`meta : ${config.get("meta")}`)
console.log(`azure_storage: ${config.get("azure_storage")}`)

// Setup App
const httpServer = http.createServer(app);
httpServer.on("error", onError);
httpServer.on("listening", onListening);
httpServer.listen(normalizePort(config.get("port")));

// Setup Admin App
const httpAdminServer = http.createServer(adminApp);
httpAdminServer.on("error", onAdminError);
httpAdminServer.on("listening", onAdminListening);
httpAdminServer.listen(normalizePort(config.get("admin_port")));

function normalizePort(val: any) {
    const port = parseInt(val, 10);
 
    if (isNaN(port)) {
        return val;
    }
 
    if (port >= 0) {
        return port;
    }
 
    return false;
 }
 
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
    onCommonError(error, config.get("port"));
}

function onAdminError(error: any) {
    onCommonError(error, config.get("admin_port"));
}

function onCommonError(error: any, port: string | number) {
    if (error.syscall !== "listen") {
        throw error;
    }

    const httpPort = app.get("port");
    var bind = typeof httpPort === "string"
        ? "Pipe " + httpPort
        : "Port " + httpPort;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
        break;
            default:
        throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    onListeningCommon(httpServer);
}

function onAdminListening() {
    onListeningCommon(httpAdminServer);
}

function onListeningCommon(server: http.Server) {
    var addr = server.address();
    var bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    logger.debug(logger.modules.SERVER, "Listening on " + bind);
}

