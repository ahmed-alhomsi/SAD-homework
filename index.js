const data = [
	["BAR", "Barcelona", 5],
	["KYV", "Kyiv", 4],
	["MRK", "Marrakech", 3],
	["TKO", "Tokyo", 7],
];

const damascus_departure_times = [
	[0, "00:00"],
	[1, "01:30"],
	[3, "03:45"],
	[5, "05:15"],
	[6, "06:30"],
	[7, "07:25"],
];

// const damascus_departure_times = [
// 	[0, ":00", "EM", "1/5/2022"],
// 	[1, ":30", "QT", "7/5/2022"],
// 	[3, ":45", "EM", "15/5/2022"],
// 	[5, ":15", "QT", "25/5/2022"],
// 	[6, ":30", "EM", "1/6/2022"],
// 	[7, ":25", "TR", "15/6/2022"],
// ];

let destination_name;
let destination_code;
let departure_time;
let return_time;
let trip_duration;

function selectDestination(destinationCode) {
	//Set values of global variables for use in other functions
	data.forEach((entry) => {
		if (destinationCode === entry[0]) {
			destination_code = entry[0];
			destination_name = entry[1];
			trip_duration = entry[2];
		}
	});

	//Set City Code
	let destCode = Array.from(document.getElementsByClassName("dest-code"));
	destCode.forEach((code) => {
		code.innerHTML = destination_code;
	});

	//Set City Name
	let destName = Array.from(document.getElementsByClassName("dest-name"));
	destName.forEach((name) => {
		name.innerHTML = destination_name;
	});

	const flights = [
		Array.from(document.getElementsByClassName("depart-time")),
		Array.from(document.getElementsByClassName("arrive-time")),
	];

	//Set depart times from Damascus for outgoing flights
	for (let i = 0; i < flights[0].length; i++) {
		flights[0][i].innerHTML = damascus_departure_times[i][1];
	}

	//add trip duration plus minutes and format properly
	for (let i = 0; i < flights[0].length; i++) {
		//get minutes to append to end of string
		let minutes =
			damascus_departure_times[i][1][2] +
			damascus_departure_times[i][1][3] +
			damascus_departure_times[i][1][4];

		flights[1][i].innerHTML =
			damascus_departure_times[i][0] + trip_duration + minutes;
	}
}
function selectTravel(company, date, depart, arrive) {
	let logo = "";
	switch (company) {
		case "EM":
			logo += "./emirates.png";
			break;
		case "QT":
			logo += "./qatar.png";
			break;
		case "TR":
			logo += "./turkish.jpg";
			break;
		default:
			logo += "./emirates.png";
			break;
	}
	document.getElementById("travel-flight-logo").style.backgroundImage = logo;
	document.getElementById("travel-date").innerHTML = date;
	document.getElementById("travel-depart").innerHTML = depart;
	document.getElementById("travel-arrive").innerHTML = arrive;
	//travel-date
	//travel-depart
	//travel-arrive
}

function selectReturn(company, date, depart, arrive) {
	let logo = "url(";
	switch (company) {
		case "EM":
			logo += "./emirates.png)";
			break;
		case "QT":
			logo += "./qatar.png)";
			break;
		case "TR":
			logo += "./turkish.jpg)";
			break;
		default:
			logo += "./emirates.png)";
			break;
	}
	document.getElementById("return-flight-logo").style.backgroundImage = logo;

	//return-date
	//return-depart
	//return-arrive
}

function selectProgram(programName) {
	document.getElementById("selected-program").innerHTML = programName;
}