import Mongoose from "mongoose"
import { DBConnection, PingData } from "../types"

export class MongoConnection implements DBConnection {
	get connectionString(): string {
		const PASSWORD = process.env.DB_PASS

		return `mongodb+srv://nico:${PASSWORD}@is-my-internet-down-mpr2n.gcp.mongodb.net/pings?retryWrites=true&w=majority`
	}

	push: (data: PingData) => boolean = data => {
		Mongoose.connect(this.connectionString, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		const db = Mongoose.connection

		db.on("error", console.error.bind(console, "connection error:"))

		db.once("open", function() {
			const newPing = new Ping(data)
			newPing.save((err, newPing) => {
				if (err) return console.error(err)

				console.log(`Ping received at ${data.time}`)

				return true
			})
		})

		return false
	}

	pull: () => PingData
}

const PingSchema = new Mongoose.Schema({
	name: String,
	time: Date
})

export const Ping = Mongoose.model("Ping", PingSchema)
