// define globals
const weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";



const getData = () => {
	$.ajax({
		url: 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson',
		type: 'GET',
		dataType: 'Json',
		success: (res) => {
			console.log(res, " this is a response message from the server");
			const $infoDiv = $('#info');
			res.features.forEach((item) => { // takes in each instance of res.features as the item
				const infoP = '<p>' + item.properties.title + ' <h5>' + convertTime(item.properties.time) + '</h5></p>';

				// OR
				// $p = $('<p/>')
				// $p.text(item.properties.time)
				// $h5 = $('<h5/>')
				// $h5.text(convertTime(item.properties.time))
				// $infoDiv.append($p)
				// $infoDiv.append($h5)

				$infoDiv.append(infoP); // take note that this creates empty <p> tags inbetween
			});
			initializeGoogleMaps(res);
		},
		error: (err) => {
			console.log(res, " this is a error message from the server");
		}
	})
};

const initializeGoogleMaps = (res) => {
	const mapCanvas = $('#map')[0]; // attaches map to the HTML
	const mapOptions = {
		center: {lat: 41.8781, lng: -87.6298}, // Greater Chicago Area
		zoom: 1,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	const map = new google.maps.Map(mapCanvas, mapOptions); // generates map

	// to change the markers into the earthquake image in the images folder
	const icon = {url: 'images/earthquake.png', scaledSize: new google.maps.Size(15, 15), origin: new google.maps.Point(0, 0)};

	res.features.forEach((item) => { // takes in each instance of res.features as the item
		console.log(item, ' this is item');
		const marker = new google.maps.Marker({
			position: new google.maps.LatLng(item.geometry.coordinates[1], item.geometry.coordinates[0]),
			map: map,
			animation: google.maps.Animation.DROP,
			icon: icon // replaces default markers with the earthquake image
		});
	});
};

const convertTime = (time) => {
	// Create a new JavaScript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds.
	var date = new Date(1506023938000*1000);

	// Hours part from the timestamp
	var hours = date.getHours();

	// Minutes part from the timestamp
	var minutes = "0" + date.getMinutes();
	
	// Seconds part from the timestamp
	var seconds = "0" + date.getSeconds();

	// Will display time in 10:30:23 format
	var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

	return formattedTime
};



google.maps.event.addDomListener(window, 'load', getData);


