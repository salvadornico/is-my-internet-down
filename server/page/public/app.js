const doubtLevels = [
	{ minutesAllowance: 5, message: "No", color: "" },
	{ minutesAllowance: 10, message: "Maybe", color: "" },
	{ minutesAllowance: 20, message: "Probably", color: "" },
	{ minutesAllowance: 30, message: "Almost definitely", color: "" }
]

document.addEventListener("DOMContentLoaded", () => {
	const reportLine = document.querySelector("#report")

	fetch("/latest-ping")
		.then(res => res.json())
		.then(({ name, time }) => {
			const timeObject = moment(time)
			// const secondsSincePing = 5 // ?
			// const answer = doubtLevels.filter(level => (level.minutesAllowance * 60) > secondsSincePing) // Then choose lowest remaining
			// Change CSS variable for background color

			reportLine.textContent = `Last ping received from ${name} ${timeObject.fromNow()} (${timeObject.format(
				"D MMM YYYY [at] H:mm:ss"
			)} Philippine Standard Time)`
		})
})
