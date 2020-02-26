//- const doubtLevels = [
//-     { minutesAllowance: 0, message: 'No' },
//-     { minutesAllowance: 0, message: 'Maybe' },
//-     { minutesAllowance: 0, message: 'Probably' },
//-     { minutesAllowance: 0, message: 'Almost definitely' },
//- ]

document.addEventListener("DOMContentLoaded", () => {
	const reportLine = document.querySelector("#report")

	fetch("/latest-ping")
		.then(res => res.json())
		.then(({ name, time }) => {
			const timeObject = moment(time).add(8, "hours") // Compensate for UTC records
			//- const minutesSincePing = 5 // ?
			//- const answer = doubtLevels.filter(level => level.minutesAllowance > minutesSincePing) // Then choose lowest remaining

			reportLine.textContent = `Last ping received from ${name} ${timeObject.fromNow()} (${timeObject.format(
				"D MMM YYYY [at] H:mm:ss"
			)} Philippine Standard Time)`
		})
})
