import { config } from "dotenv"
import moment from "moment"
import fetch from "node-fetch"
import { resolve } from "path"
import { MongoConnection } from "./MongoConnection"

const checkDelay = async () => {
	config({ path: resolve(__dirname, "../.env") })

	const db = new MongoConnection()
	const { time } = await db.pull()

	const timeObject = moment(time)
	const minutesSincePing = moment().diff(timeObject, "minutes")

	if (minutesSincePing < 30) {
		process.exit(0)
	}

	fetch(process.env.IFTTT_URL)
		.then(res => res.text())
		.then(data => {
			console.log(data)
			process.exit(0)
		})
		.catch(err => {
			console.error(err)
			process.exit(1)
		})
}

checkDelay()
