import Mongoose from "mongoose"
import { NotificationData, PingData } from "../types"

interface IPing extends Mongoose.Document {
	name: string
	time: Date
}

const PingSchema = new Mongoose.Schema<PingData>({
	name: String,
	time: Date
})

export const Ping = Mongoose.model<IPing>("Ping", PingSchema)

interface INotification extends Mongoose.Document {
	time: Date
}

const NotificationSchema = new Mongoose.Schema<NotificationData>({
	time: Date
})

export const Notification = Mongoose.model<INotification>(
	"Notification",
	NotificationSchema
)
