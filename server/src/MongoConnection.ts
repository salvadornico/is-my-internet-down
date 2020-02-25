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
		const PASSWORD = process.env.DB_PASS

		return `mongodb+srv://nico:${PASSWORD}@is-my-internet-down-mpr2n.gcp.mongodb.net/pings?retryWrites=true&w=majority`
	}

	constructor() {
		Mongoose.connect(this.connectionString, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})

		this.db = Mongoose.connection
		this.db.on("error", console.error.bind(console, "connection error:"))
	}

	push: (data: PingData) => boolean = data => {
		this.db.once("open", async () => {
			const newPing = new Ping(data)

			await newPing.save((err, newPing) => {
				if (err) return console.error(err)

				console.log(`Ping received at ${data.time}`)

				return true
			})
		})

		return false
	}

	pull: () => Mongoose.DocumentQuery<PingData, IPing, {}> = () => {
		return Ping.findOne().sort("-time")
	}
}
