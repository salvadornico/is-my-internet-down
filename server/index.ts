import { config } from "dotenv"
import Koa from "koa"
import bodyParser from "koa-bodyparser"
import Router from "koa-router"
import serve from "koa-static"
import { resolve } from "path"
import { handlePing } from "./pingHandler"
import { displayReport, fetchLastPing } from "./reportRenderer"

config({ path: resolve(__dirname, "../.env") })
const PORT = process.env.PORT

const app = new Koa()
const router = new Router()

router.get("/", displayReport)
router.get("/latest-ping", fetchLastPing)
router.post("/check-in", handlePing)

app.use(bodyParser())
app.use(serve(__dirname + "/page/public"))
app.use(router.routes())

app.listen(PORT)
console.log(`Server running on port ${PORT}`)
