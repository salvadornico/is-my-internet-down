import Koa from "koa"
import { PingData } from "../types"
import { MongoConnection } from "./MongoConnection"

export const handlePing: (ctx: Koa.ParameterizedContext) => void = ctx => {
	const requestData = prepareData(ctx.request.body)

	const db = new MongoConnection()
	db.push(requestData)
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
