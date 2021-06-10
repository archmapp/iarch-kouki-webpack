// import {bulmaCalendar} from '/node_modules/bulma-extensions/dist/js/bulma-extensions.min.js'
import bulmaCalendar from './bulma-calendar.min.js'
import * as $$ from './shortJS.js'

// window.bulmaCalendar = bulmaCalendar

let d1, d2, days, v
// Initialize all input of date type.
let options = {
	// lang: 'ja-jp',
	isRange: true,
	dateFormat: 'YYYY/MM/DD',
	// startDate: d1,
	// endDate: d2,
}

				const datePickers = bulmaCalendar.attach('[type="date"]', options)

				// Loop on each calendar initialized
				datePickers.forEach((calendar) => {
					// Add listener to select event
					calendar.on('select', (date) => {
						console.log(date)
		console.log(date.data.datePicker._date)
		console.log(date.data.datePicker._date.start)
		console.log(date.data.datePicker._date.end)
		const d = date.data.datePicker._date
		d1 = d.start
		d2 = d.end
		days = d2 - d1
		days = Math.round(days / (24 * 60 * 60 * 1000))
		days = days - 7
		if (days <= 0) days = 0
		v = (days / 30).toFixed(1)
		console.log(v)
		$$.Id('#kouki').value = days === 0 ? '' : v
		$$Id('#days').innerText = days

		$$Id('#kouki').focus()
		$$Id('#kouki').select()
		document.execCommand('copy')

		$$q(
			'#cp'
		).innerText = `* 工期（${v}）ヶ月は、'クリップボード'にコピーされました。`
	})
})
