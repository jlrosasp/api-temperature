import http from 'http';
import express from 'express';
import socket, { Server } from 'socket.io';

//import debug from '../utils/debug.util';

export class ExpressHelper {

    // Patron Singleton
    private static _instance: ExpressHelper;
    // Express API Server
    public httpServer: http.Server;
    public api: express.Application;
    public port: number;
    // Socket Server
    public io: Server
    
    private constructor(port: number, authorizedDomains: string[]) {
        this.api = express();
        this.port = port;
        this.httpServer = http.createServer(this.api);
        this.io = new socket.Server(this.httpServer, {
            cors: {
                origin: authorizedDomains,
                credentials: true
            }
        });
    }

    public static getInstance(port: number, authorizedDomains: string[]) {
        return this._instance || (this._instance = new this(port, authorizedDomains));
    }

    start(callback: Function) {
        this.httpServer.listen(this.port, callback());
        console.log(`El Servidor Web Express inicio de forma correcta...`);
        //debug(`Express`, `express.server.ts => start(): El Servidor Web Express inicio de forma correcta en el puerto ${this.port}`).express();
    }
};

