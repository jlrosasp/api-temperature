// Import NPM Packages
import { Socket } from 'socket.io';
// Import Helpers
import { ExpressHelper } from './helpers/express.helper';


const temperature = (min: number, max: number): number  => {
    // Genera un número aleatorio en el rango especificado (min y max)
    return Math.random() * (max - min) + min;
};

(async() => {
    /****************************
     * Start Express API Server *
     ****************************/
    const CORS_AUTHORIZED_DOMAINS: string[] = [
        `http://localhost:3001`,
        `http://localhost:4200`
    ];
    const www = ExpressHelper.getInstance(3001, CORS_AUTHORIZED_DOMAINS);    

    www.io.on('connection', (socket: Socket) => {
        console.log('Socket Connection Success !!!');
        // Broadcast Emit
        setInterval(() => {
            www.io.emit('broadcast', temperature(0, 40));
        }, 5000);
    });

    // Arrancar Express Server
    www.start(async() => {
        // To Do...
    });
})();