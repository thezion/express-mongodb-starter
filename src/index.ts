import * as dotenv from 'dotenv';
import initializeServer from './initializeServer';
import * as database from './libraries/database';
import router from './routers/index';

// load env vars
dotenv.config();

database
    .connect()
    .then(() => {
        const port = process.env.PORT || 80;
        const app = initializeServer(router);
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch(() => {
        console.error('Error: Can not connect to database.');
    });
