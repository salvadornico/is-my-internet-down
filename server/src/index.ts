import dotenv from "dotenv"
import Koa from "koa"
import bodyParser from "koa-bodyparser"
import Router from "koa-router"
import { handlePing } from "./pingHandler/handler"

dotenv.config({ path: "../.env" })
const SERVER_PORT = process.env.SERVER_PORT

const app = new Koa()
const router = new Router()

router.post("/check-in", handlePing)

router.get("/", async ctx => {
	ctx.body = "Hello World!"
})

app.use(bodyParser())
app.use(router.routes())

app.listen(SERVER_PORT)

console.log(`Server running on port ${SERVER_PORT}`)
