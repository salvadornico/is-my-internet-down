const doubtLevels = [
	{ minutesAllowance: 5, message: "No", color: "" },
	{ minutesAllowance: 10, message: "Maybe", color: "" },
	{ minutesAllowance: 20, message: "Probably", color: "" },
	{ minutesAllowance: 30, message: "Almost definitely", color: "" }
]

document.addEventListener("DOMContentLoaded", () => {
	fetch("/latest-ping")
		.then(res => res.json())
		.then(({ name, time }) => {
			const report = document.querySelector(".report")
			const answerLine = document.querySelector(".answer")

			const timeObject = moment(time)
			const secondsSincePing = moment().diff(timeObject, "seconds");

			const answer = doubtLevels
				.filter(level => (level.minutesAllowance * 60) > secondsSincePing)
				.reduce((res, obj) => (obj.minutesAllowance < res.minutesAllowance) ? obj : res)
			;
			// Change CSS variable for background color

			answerLine.textContent = answer.message
			report.innerHTML = `
				<p>Last ping received from ${name} ${timeObject.fromNow()}</p>
				<p>${timeObject.format("D MMM YYYY [at] HH:mm:ss")} Philippine Standard Time</p>
			`

			document.querySelector(".loading-message").classList.add("hidden")
			answerLine.classList.remove("hidden")
			report.classList.remove("hidden")
		})
})
