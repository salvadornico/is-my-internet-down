import { config } from "dotenv"
// import moment from "moment"
import fetch from "node-fetch"
import { resolve } from "path"
import { MongoConnection } from "./db/MongoConnection"

const checkDelay = async () => {
	config({ path: resolve(__dirname, "../.env") })

	const db = new MongoConnection()
	// const { time } = await db.getLastCheckIn()

	// const timeObject = moment(time)
	// const minutesSincePing = moment().diff(timeObject, "minutes")

	// if (minutesSincePing < 30) {
	// 	process.exit(0)
	// }

	fetch(
		"https://maker.ifttt.com/trigger/check_internet/with/key/pdO7pieMLX-gEqse6DdrKnV6HypeSZyzORO5dt6HmCb"
	)
		.then(res => res.text())
		.then(data => {
			console.log(data)

			db.recordNotification({ time: new Date() })

			process.exit(0)
		})
		.catch(err => {
			console.error(err)
			process.exit(1)
		})
}

checkDelay()
