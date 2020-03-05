import Mongoose from "mongoose"
import { NotificationData, PingData } from "../types"
import { Notification, Ping } from "./models"

export class MongoConnection {
	db: Mongoose.Connection

	get connectionString(): string {
		return process.env.DB_URL
	}

	constructor() {
		try {
			Mongoose.connect(this.connectionString, {
				useNewUrlParser: true,
				useUnifiedTopology: true
			})

			this.db = Mongoose.connection
		} catch (error) {
			console.error(error)
		}
	}

	checkIn: (data: PingData) => boolean = data => {
		this.db.once("open", async () => {
			const newPing = new Ping(data)

			await newPing.save(err => {
				if (err) {
					console.error(err)
					return false
				}

				console.log(`Ping received at ${data.time}`)

				return true
			})
		})

		return false
	}

	getLastCheckIn: () => Promise<PingData> = () => {
		return new Promise((resolve, reject) => {
			Ping.findOne()
				.sort("-time")
				.exec((err, ping) => {
					if (err) {
						reject(err)
					} else {
						resolve(ping)
					}
				})
		})
	}

	recordNotification: (data: NotificationData) => boolean = data => {
		this.db.once("open", async () => {
			const newNotif = new Notification(data)

			await newNotif.save(err => {
				if (err) {
					console.error(err)
					return false
				}

				console.log(`Notification sent at ${data.time}`)

				return true
			})
		})

		return false
	}

	getLastNotification: () => Promise<NotificationData> = () => {
		return new Promise((resolve, reject) => {
			Notification.findOne()
				.sort("-time")
				.exec((err, notif) => {
					if (err) {
						reject(err)
					} else {
						resolve(notif)
					}
				})
		})
	}
}
