import mongoose, { Connection } from 'mongoose';

export function connect(): Promise<any> {
    // check connection
    if (mongoose.connection.readyState) {
        console.log('MongoDB already connected.');
        return Promise.resolve();
    }

    // events
    mongoose.connection.on('connected', () => {
        console.info('MongoDB successfully connected.');
    });
    mongoose.connection.on('error', (error) => {
        console.error(`MongoDB Error: ${error.message}`);
    });

    // start to connect
    const connectString = process.env.MONGODB_CONNECT_STRING || '';
    return mongoose.connect(connectString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}
