import mongoose from 'mongoose';

export async function connect(): Promise<boolean> {
    const connectString = process.env.MONGODB_CONNECT_STRING || '';

    // check connect string
    if (!connectString) {
        console.warn('MongoDB can not find a connect string.');
        return Promise.resolve(false);
    }

    // check connection
    if (mongoose.connection.readyState) {
        console.log('MongoDB already connected.');
        return Promise.resolve(true);
    }

    // events
    mongoose.connection.on('connected', () => {
        console.info('MongoDB successfully connected.');
    });
    mongoose.connection.on('error', (error) => {
        console.error(`MongoDB Error: ${error.message}`);
    });

    // start to connect
    return mongoose
        .connect(connectString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => true);
}
