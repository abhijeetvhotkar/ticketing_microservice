import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import mongoose from 'mongoose'
import { signInRouter } from './routes/signin'
import { signUpRouter } from './routes/signup'
import { signOutRouter } from './routes/signout'
import { currentUserRouter } from './routes/current-user'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()
app.use(json())

app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)
app.use(currentUserRouter)

app.all('*', () => {
    throw new NotFoundError();
})

app.use(errorHandler)

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
        })
        console.log('Connected to mongo')
    } catch (err) {
        console.log(err)
    }    
}

app.listen(3000, () => {
    console.log('Listening on PORT 3000!!!!!!!')
})

start();