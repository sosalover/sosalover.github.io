
export function csvStringToJson(csvString: string) {
	const rows = csvString.trim().split('\n');

	// Define the static labels for the fields
	// Map each row to the corresponding label
	return rows.map((row) => {
		const rowEntries = row.split(',');

		// Handle quotes: explicitly clean up the cells
		const cleanedRowEntries = rowEntries.map((cell) => {
			// Remove quotes and trim any unnecessary spaces
			return cell.replace(/"/g, '').trim();
		});
		return {
			itemPosition: cleanedRowEntries[0],
			title: cleanedRowEntries[1],
			image: cleanedRowEntries[2],
			link: cleanedRowEntries[3],
			text: cleanedRowEntries[4],
			icon: cleanedRowEntries[5],
			label: cleanedRowEntries[6]
		};
	});
}

export async function fetchGoogleSheet(sheetId: string) {
	
	const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

	try {
		const response = await fetch(url);
		const csvText = await response.text();
		return csvText;
	} catch (error) {
		console.error('Error fetching CSV:', error);
	}
}

