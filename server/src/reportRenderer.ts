import Koa from "koa"
import { resolve } from "path"
import pug from "pug"
import { MongoConnection } from "./MongoConnection"

export const displayReport: (
	req: Koa.ParameterizedContext
) => void = async ctx => {
	// TODO: add separate route for this and fetch asyncronously
	const db = new MongoConnection()
	const latestPing = await db.pull()

	ctx.body = pug.renderFile(resolve(__dirname, "page/index.pug"))
}

export const fetchLastPing: (
	req: Koa.ParameterizedContext
) => void = async ctx => {
	const db = new MongoConnection()
	const latestPing = await db.pull()

	ctx.body = JSON.stringify(latestPing)
}
