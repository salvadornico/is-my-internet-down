export type PingData = {
	name: string
	time: Date
}

export interface DBConnection {
	push: (data: PingData) => boolean
	pull: () => PingData
}
