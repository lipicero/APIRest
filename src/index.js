import express from 'express';
import morgan from 'morgan';
import { router } from './routes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(router);

app.set('port', 3000);

app.listen(app.get('port'), () => {
    console.log('Server is running on port', app.get('port'));
});



