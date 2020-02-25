import Koa from "koa"
import { MongoConnection } from "./MongoConnection"

export const displayReport: (
	req: Koa.ParameterizedContext
) => void = async ctx => {
	const db = new MongoConnection()

	await db.pull().exec((err, ping) => {
		if (err) return console.error(err)

		console.log(ping)
		ctx.body = JSON.stringify(ping)
	})
}
