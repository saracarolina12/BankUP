import config from './config.js';
import express from 'express';
import indexRoutes from './routes/index.routes.js'

const app = express()
app.use(express.json())
app.use('/api',indexRoutes)
app.set('port', config.port)

export default app