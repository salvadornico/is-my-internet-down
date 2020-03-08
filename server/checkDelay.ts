import { config } from "dotenv"
import fetch from "node-fetch"
// import moment from "moment"
import { resolve } from "path"
import { MongoConnection } from "./db/MongoConnection"

const handleError = (error: any) => {
	console.error(error)
	process.exit(1)
}

const checkDelay = async () => {
	config({ path: resolve(__dirname, "../.env") })

	const db = new MongoConnection()
	// const latestNotif = await db.getLastNotification()
	// console.log(latestNotif)
	// process.exit(0)
	// const { time } = await db.getLastCheckIn()

	// const timeObject = moment(time)
	// const minutesSincePing = moment().diff(timeObject, "minutes")

	// if (minutesSincePing < 30) {
	// 	process.exit(0)
	// }

	fetch(process.env.IFTTT_URL)
		.then(res => res.text())
		.then(data => {
			console.log(data)

			try {
				console.log("trying")
				db.recordNotification({ time: new Date() })
				process.exit(0)
			} catch (error) {
				handleError(error)
			}
		})
		.catch(err => handleError(err))
}

checkDelay()
