import Koa from "koa"
import { MongoConnection } from "./MongoConnection"

export const displayReport: (
	req: Koa.ParameterizedContext
) => void = async ctx => {
	const db = new MongoConnection()

	try {
		const latestPing = await db.pull()
		// TODO: render template
		ctx.body = JSON.stringify(latestPing)
	} catch (error) {
		console.error(error)
		ctx.body = "Something went wrong. Please check Heroku logs."
	}
}
