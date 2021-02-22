/* return a function that creats express app */

// Express.js
import express, { Router } from 'express';
// Parse Cookie header and populate req.cookies with an object keyed by the cookie names
import cookieParser from 'cookie-parser';
// Parse incoming request bodies in a middleware before your handlers, under the req.body property
import bodyParser from 'body-parser';
// A middleware that can be used to enable CORS with various options
import cors from 'cors';
// Helmet helps you secure your Express apps by setting various HTTP headers
import helmet from 'helmet';
// Node.js compression middleware, support deflate | gzip
import compression from 'compression';

// Custom
import HttpError from './classes/HttpError.class';
import errorHandler from './middlewares/errorHandler';
import mongoose from 'mongoose';

export default function initializeServer(router: Router) {
    const app = express();
    const isProduction = process.env.NODE_ENV === 'production';
    const origin = { origin: isProduction ? false : '*' };
    const error404 = new HttpError('Route Not Found', 404);

    app.set('trust proxy', 1);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors(origin));
    app.use(helmet());
    app.use(compression());

    // set up routes
    app.get('/', (req, res) => {
        if (mongoose.connection.readyState != 1) {
            throw new HttpError('Database Is Not Connected', 500);
        }
        res.sendStatus(200);
    });
    app.use('/api', router);

    // 404 handler
    app.use(() => {
        throw error404;
    });

    // error handler
    app.use(errorHandler);

    return app;
}
