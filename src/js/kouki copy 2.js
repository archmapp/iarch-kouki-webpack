// import {bulmaCalendar} from '/node_modules/bulma-extensions/dist/js/bulma-extensions.min.js'
import bulmaCalendar from './bulma-calendar.min.js'
import * as $$ from './shortJS.js'

// window.bulmaCalendar = bulmaCalendar

let d1, d2
// Initialize all input of date type.
let options = {
	// lang: 'ja-jp',
	isRange: true,
	dateFormat: 'YYYY/MM/DD',
	// startDate: d1,
	// endDate: d2,
}
const calendars = bulmaCalendar.attach('[type="date"]', options)

// Loop on each calendar initialized
calendars.forEach((calendar) => {
	// Add listener to select event
	calendar.on('select', (date) => {
		console.log(date)
		console.log(date.data.datePicker._date)
		console.log(date.data.datePicker._date.start)
		console.log(date.data.datePicker._date.end)
		const d = date.data.datePicker._date
		d1 = d.start
		d2 = d.end
		let v = Math.round((d2 - d1) / (24 * 60 * 60 * 1000)) / 30
		v = Math.round(v * 100) / 100
		console.log(v)
		$$.Id('#kouki').value = v
	})
})
