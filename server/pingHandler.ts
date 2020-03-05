import Koa from "koa"
import { MongoConnection } from "./db/MongoConnection"
import { PingData } from "./types"

export const handlePing: (ctx: Koa.ParameterizedContext) => void = ctx => {
	const requestData = prepareData(ctx.request.body)

	const db = new MongoConnection()

	try {
		const success = db.checkIn(requestData)
		ctx.body = JSON.stringify({ success })
	} catch (error) {
		console.error(error)
		ctx.body = JSON.stringify({ success: false })
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
