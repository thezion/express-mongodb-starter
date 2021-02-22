import * as dotenv from 'dotenv';
import createExpressApp from './createExpressApp';
import * as database from './libraries/database';
import router from './routers/index';

dotenv.config();

database
    .connect()
    .then(() => {
        const port = process.env.PORT || 80;
        const app = createExpressApp(router);
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch(() => {
        console.error('Error: Can not connect to database.');
    });
