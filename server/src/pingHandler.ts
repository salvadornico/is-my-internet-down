import Koa from "koa"
import { MongoConnection } from "./MongoConnection"
import { PingData } from "./types"

export const handlePing: (ctx: Koa.ParameterizedContext) => void = ctx => {
	const requestData = prepareData(ctx.request.body)

	const db = new MongoConnection()

	try {
		db.push(requestData)
	} catch (error) {
		console.error(error)
		ctx.body = "Something went wrong. Please check Heroku logs."
	}
}

const prepareData: (req: { [key: string]: string }) => PingData = ({
	name,
	time,
	key
}) => {
	if (key !== process.env.API_KEY) {
		return null
	}

	return {
		name,
		time: new Date(time)
	}
}
