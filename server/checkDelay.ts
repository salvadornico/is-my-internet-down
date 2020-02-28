import { config } from "dotenv"
import moment from "moment"
import fetch from "node-fetch"
import { resolve } from "path"
import { MongoConnection } from "./MongoConnection"

const checkDelay = async () => {
    config({ path: resolve(__dirname, "../.env") })

    const db = new MongoConnection()
    const { time } = await db.pull()

    const timeObject = moment(time)
    const minutesSincePing = moment().diff(timeObject, "minutes")

    if (minutesSincePing < 30) {
        return
    }

    fetch("https://maker.ifttt.com/trigger/check_internet/with/key/pdO7pieMLX-gEqse6DdrKnV6HypeSZyzORO5dt6HmCb")
        .then(res => res.text())
        .then(data => console.log(data))
        .catch(err => console.error(err))
}

checkDelay()