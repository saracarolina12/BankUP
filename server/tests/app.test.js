import app from "../src/app.js"
import request from "supertest"
import mongoose from "mongoose"
//Las credenciales usadas son únicamente de ejemplo
let server;
const port = app.get('port');

beforeAll((done) => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        server = app.listen(port, () => {
            global.agent = request.agent(server);
            done();
        });
    });
}, 10000); 


afterAll(async () => {
    await server.close();
    await mongoose.disconnect();
});

describe('GET /api', ()=>{
    test('should respond with a 200 status code', async()=>{
        const response = await request(app).get('/api').send()
        //console.log(response)
        expect(response.statusCode).toBe(200);
    })
})

describe('POST /client', ()=>{
    test('should respond with a 200 status code with an array', async()=>{
        const response = await request(app).post('/api/client').send({account_number: "415283139661"})
        //console.log(response)
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    })
})

describe('POST /client/login', ()=>{
    test('should respond with a 200 status code and the account_number found', async()=>{
        const response = await request(app).post('/api/client/login').send({username:"UlisesGallardo", password:"password123"})
        //console.log(response)
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("415283139661");
    })
})


describe('POST /transfer', ()=>{
    test('should respond with a 200 status code', async()=>{
        const response = await request(app).post('/api/transfer').send({client_account:"415283139661", to_account_number:'415282935081', amount:'300'})
        //console.log(response)
        expect(response.statusCode).toBe(200);
    })
})


describe('POST /transaction', ()=>{
    test('should respond with a 200 status code with an array', async()=>{
        const response = await request(app).post('/api/client').send({client_account: "415283139661"})
        //console.log(response)
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    })
})