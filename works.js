let destination_name;
let destination_code;
let destination_img;
let trip_duration;

const data = [
	["BAR", "Barcelona", 5, "./barcelona-thumbnail.jpg"],
	["KYV", "Kyiv", 4, "./kiyv-thumbnail.jpg"],
	["MRK", "Marrakech", 3, "./marrakech-thumbnailjpg.webp"],
	["TKO", "Tokyo", 7, "./tokyo-thumbnail.jpg"],
];

function getLogo(company) {
	if (company == "EM") return "./emirates.png";
	else if (company == "QT") return "./qatar.png";
	else if (company == "TR") return "./turkish.jpg";
}

function generateFlights(from, to, duration) {
	return [
		[from, to, "00", "00", duration, "01/06/2022", "EM"],
		[from, to, "02", "15", duration, "05/06/2022", "QT"],
		[from, to, "05", "30", duration, "15/06/2022", "EM"],
		[from, to, "07", "45", duration, "30/06/2022", "QT"],
		[from, to, "10", "00", duration, "01/07/2022", "EM"],
		[from, to, "15", "30", duration, "15/07/2022", "TR"],
	];
}

function selectDestination(destinationCode) {
	//Set values of global variables for use in other functions
	data.forEach((entry) => {
		if (destinationCode === entry[0]) {
			destination_code = entry[0];
			destination_name = entry[1];
			trip_duration = entry[2];
			destination_img = entry[3];
		}
	});

	//Set City Code throughout page
	[...document.getElementsByClassName("dest-code")].forEach((code) => {
		code.innerHTML = destination_code;
	});

	//Set City Name throughout page
	[...document.getElementsByClassName("dest-name")].forEach((name) => {
		name.innerHTML = destination_name;
	});

	//Set thumbnail in summary section
	document.getElementById("summary-content").style.backgroundImage =
		"url(" + destination_img + ")";

	const travelFlights = generateFlights(
		"DAM",
		destination_code,
		trip_duration
	);
	const returnFlights = generateFlights(
		destination_code,
		"DAM",
		trip_duration
	);

	createFlights(travelFlights, "travel", "#returnSection");
	createFlights(returnFlights, "return", "#program");
}

function createFlights(flights, id, next) {
	document.getElementById(id).innerHTML = flights.map((flight) => {
		const departCity = flight[0];
		const destination = flight[1];
		const departTime = flight[2] + ":" + flight[3];
		const arriveTime = Number(flight[2]) + flight[4] + ":" + flight[3];
		const date = flight[5];
		const company = flight[6];
		return `
        <div class="flight-card">
            <div class="flight-details">
		        <div class="time">
                    <img src="./flight.png" style="height: 50%; padding-right: 20px" />
                    <div class="trip-time">
                        <h2 style="margin: 0">
                            ${departCity}
                        </h2>
                        <h2 class="depart-time" style="margin: 0">
                            ${departTime}
                        </h2>
                    </div>
                    <img
                        src="./back.png"
                        style="transform: scale(-1); padding: 0px 20px; height: 30%"
                    />
                    <div class="trip-time">
                        <h2 class="dest-code" style="margin: 0">
                            ${destination}
                        </h2>
                        <h2 class="arrive-time" style="margin: 0">
                            ${arriveTime}
                        </h2>
                    </div>
                </div>
                <h3 class="date">${date}</h3>
                <img src=${getLogo(company)} style="height: 80%" />
            </div>
            <div class="flight-cta">
                <a
                href=${next}
                onclick="selectFlight('${id}', '${company}', '${date}', '${departTime}', '${arriveTime}')"
                >
                    Select
                </a>
            </div>
        </div>
        `;
	});
}

function selectFlight(type, company, date, depart, arrive) {
	document.getElementById(type + "-flight-logo").style.backgroundImage =
		"url(" + getLogo(company) + ")";
	document.getElementById(type + "-date").innerHTML = date;
	document.getElementById(type + "-depart").innerHTML = depart;
	document.getElementById(type + "-arrive").innerHTML = arrive;
}

function selectProgram(programName) {
	document.getElementById("selected-program").innerHTML = programName;
}
