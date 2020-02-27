import Mongoose from "mongoose"
import { PingData } from "./types"

interface IPing extends Mongoose.Document {
	name: string
	time: Date
}

const PingSchema = new Mongoose.Schema<PingData>({
	name: String,
	time: Date
})

export const Ping = Mongoose.model<IPing>("Ping", PingSchema)

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

	push: (data: PingData) => boolean = data => {
		this.db.once("open", async () => {
			const newPing = new Ping(data)

			await newPing.save((err, newPing) => {
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

	pull: () => Promise<PingData> = () => {
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
}
