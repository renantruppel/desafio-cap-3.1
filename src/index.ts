import express from 'express'
import { Connection } from 'typeorm'
const app = express()
app.use(express.json())

export { app }
