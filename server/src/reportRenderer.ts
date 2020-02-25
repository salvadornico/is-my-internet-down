import Koa from "koa"
import { MongoConnection } from "./MongoConnection"

export const displayReport: (
	req: Koa.ParameterizedContext
) => void = async ctx => {
	const db = new MongoConnection()

	const latestPing = await db.pull()

	// TODO: render template
	ctx.body = JSON.stringify(latestPing)
}
