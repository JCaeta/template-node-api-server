import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApiController } from './ApiController';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: "http://localhost:PORT"
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var apiController = new ApiController();

app.get('/', (req, res) => {
    res.send(true);
});

app.post('/create-entity-a', async (req, res) => {
    let entityA = req.body.entityA;
    await apiController.createEntityA(entityA);
    res.send(true);
});

app.post('/test-post-request', (req, res) =>{
    let body = req.body;
    res.send({objectInEndpoint: body});
})

// app.delete('/delete-entity-a', async)

var endpoints = app.listen(PORT, () => {console.log('Serve started on port ' + PORT)});
export default endpoints;

// Test changing the functional approach by the poo approach
