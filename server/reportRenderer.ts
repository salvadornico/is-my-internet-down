import Koa from "koa"
import { resolve } from "path"
import pug from "pug"
import { MongoConnection } from "./db/MongoConnection"

export const displayReport: (
	req: Koa.ParameterizedContext
) => void = async ctx => {
	ctx.body = pug.renderFile(resolve(__dirname, "page/index.pug"))
}

export const fetchLastPing: (
	req: Koa.ParameterizedContext
) => void = async ctx => {
	const db = new MongoConnection()
	const latestPing = await db.getLastCheckIn()

	ctx.body = JSON.stringify(latestPing)
}
