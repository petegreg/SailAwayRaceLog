var threeHours = 3 * 60 * 60 * 1000
  const options = {
    key: 'your windy API4 key',
    // Put additional console output
		// verbose: true,
		timestamp: Date.now() - threeHours,
		minZoom: 0,
		maxZoom: 17,
		_layersMaxZoom: 17,
  }

  windyInit( options, windyAPI => {

    const { map, picker, contextmenu, utils, broadcast } = windyAPI

var racenr = window.location.search.split ('?racenr=')[1];

const SFBUOY_ICON_URL = '/static/sfbuoy.svg';
const SBUOY_ICON_URL = '/static/sbuoy.svg';
const PBUOY_ICON_URL = '/static/pbuoy.svg';

const Boat0 = '/static/0.svg';
const Boat1 = '/static/1.svg';
const Boat2 = '/static/2.svg';
const Boat3 = '/static/3.svg';
const Boat4 = '/static/4.svg';
const Boat5 = '/static/5.svg';
const Boat6 = '/static/6.svg';
const Boat7 = '/static/7.svg';
const Boat8 = '/static/8.svg';

const SFBuoyIcon = L.icon({
   iconUrl: SFBUOY_ICON_URL,
   iconSize: [24, 24],
   iconAnchor: [12, 12],
   popupAnchor: [0, 0],
});
const SBuoyIcon = L.icon({
    iconUrl: SBUOY_ICON_URL,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
 });
 const PBuoyIcon = L.icon({
    iconUrl: PBUOY_ICON_URL,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
 });

const markers = [];
const buoys =[];

const updateIconStyle = () => {
	
  for (const marker of markers) {
    if (marker._icon) {
      const heading = marker._icon.getAttribute('data-heading');
      if (marker._icon.style.transform.indexOf('rotateZ') === -1) {
        marker._icon.style.transform = `${marker._icon.style.transform} rotateZ(${(heading || 0)}deg)`;
      }
    }
  }
  
};

var getCourse = fetchRaceDetails();
var updateTrack = setInterval(updateResults, 300000); // 5mins
var stopUpdates = setTimeout(stopRefresh, 1800000); // 30mins

function stopRefresh(){
    clearInterval(updateTrack);
}

var ZoomOnUpdate = 1;
function ZoomToMapBounds(map_bounds) {
	if (ZoomOnUpdate == 1) { 
		W.maps.fitBounds(map_bounds,{padding:[10,10]});
	}
}

var Listeners = 0;

function turnOnListeners(){
    if (W.maps){
    Listeners = 1;
    W.maps.on('dragend', sarlMoved);
    W.maps.on('zoom', sarlMoved);
    W.maps.on('zoomend', sarlMoved);
    W.maps.on('viewreset', updateIconStyle);
    }
}

function turnOffListeners(){
    if (W.maps){
    Listeners = 0;
    W.maps.off('dragend', sarlMoved);
    W.maps.off('zoom', sarlMoved);
    W.maps.off('zoomend', sarlMoved);
    W.maps.off('viewreset', updateIconStyle);
    }
}

function sarlMoved(e){
	ZoomOnUpdate = 0;
	updateIconStyle();
}

function fetchRaceDetails() {
    turnOffListeners();
	fetch('https://gcloud.ingenium.net.au/racecourse?racenr='+racenr)
	.then(response => response.json())
	
	.then(data => {
	try {
		start_line = [];
		finish_line = [];
		copy_start_line = [];
		copy_finish_line = [];
		map_course_bounds = [];
		racing = data.racing;
		mistitle = data.mistitle;
		misbdgnr = data.misbdgnr;
		misbtpnr = data.misbtpnr;
		distance = data.distance;
		result = data.course;
		lb_lastupdate = data.lb_lastupdate;
		
		var windy_div = document.getElementById("bottom").parentNode;
		var bottomDiv = document.getElementById("bottom");
		var sarl_RaceBadge_div = document.createElement("div");
		sarl_RaceBadge_div.setAttribute('id', 'sarl_RaceBadge_div');
		sarl_RaceBadge_div.setAttribute('class', 'sarl');		
		windy_div.insertBefore(sarl_RaceBadge_div, bottomDiv);

		document.getElementById("sarl_RaceBadge_div").innerHTML = '<img id="sarl_RaceBadge_img" src="https://backend.sailaway.world/cgi-bin/sailaway/badgeimg.pl?bdgnr='+misbdgnr+'">';

		for (const buoyName of Object.keys(result)) {

		const buoy = result[buoyName];
		
		buoy_pos = [buoy.miclat,buoy.miclon];
		if (buoy.miclon > 0) {
			copy_buoy_pos = [buoy.miclat,buoy.miclon - 360];
		} else {
			copy_buoy_pos = [buoy.miclat,buoy.miclon + 360];
		}
		map_course_bounds.push(buoy_pos);
		if(buoy.mictype == 1) {
			start_line.push(buoy_pos);
			copy_start_line.push(copy_buoy_pos);
			const buoy = L.marker(buoy_pos, {
			icon: SFBuoyIcon,
			}).addTo(W.maps);
			const copy_buoy = L.marker(copy_buoy_pos, {
			icon: SFBuoyIcon,
			}).addTo(W.maps);
		} else if (buoy.mictype == 2) {
			start_line.push(buoy_pos);
			copy_start_line.push(copy_buoy_pos);
			const buoy = L.marker(buoy_pos, {
			icon: SFBuoyIcon,
			}).addTo(W.maps);
			const copy_buoy = L.marker(copy_buoy_pos, {
			icon: SFBuoyIcon,
			}).addTo(W.maps);
		} else if (buoy.mictype == 7) {
			finish_line.push(buoy_pos);
			copy_finish_line.push(copy_buoy_pos);
			const buoy = L.marker(buoy_pos, {
			icon: SFBuoyIcon,
			}).addTo(W.maps);
			const copy_buoy = L.marker(copy_buoy_pos, {
			icon: SFBuoyIcon,
			}).addTo(W.maps);
		} else if (buoy.mictype == 8) {
			finish_line.push(buoy_pos);
			copy_finish_line.push(copy_buoy_pos);
			const buoy = L.marker(buoy_pos, {
			icon: SFBuoyIcon,
			}).addTo(W.maps);
			const copy_buoy = L.marker(copy_buoy_pos, {
			icon: SFBuoyIcon,
			}).addTo(W.maps);
		} else if (buoy.mictype == 3) {
			const buoy = L.marker(buoy_pos, {
			icon: SBuoyIcon, title: 'Mark '+(buoyName-1)
			}).addTo(W.maps);
			const copy_buoy = L.marker(copy_buoy_pos, {
			icon: SBuoyIcon, title: 'Mark '+(buoyName-1)
			}).addTo(W.maps);
		} else if (buoy.mictype == 4) {
			const buoy = L.marker(buoy_pos, {
			icon: PBuoyIcon, title: 'Mark '+(buoyName-1)
			}).addTo(W.maps);
			const copy_buoy = L.marker(copy_buoy_pos, {
			icon: PBuoyIcon, title: 'Mark '+(buoyName-1)
			}).addTo(W.maps);
		}
		buoys.push(buoy);
	  }

	  var start_polyline = L.polyline(start_line, {color: '#34b700'}).addTo(W.maps);
	  var finish_polyline = L.polyline(finish_line, {color: '#34b700'}).addTo(W.maps);
	  var copy_start_polyline = L.polyline(copy_start_line, {color: '#34b700'}).addTo(W.maps);
	  var copy_finish_polyline = L.polyline(copy_finish_line, {color: '#34b700'}).addTo(W.maps);
	  
      ZoomToMapBounds(map_course_bounds);
	  var fetchTrack = updateResults();
	  
	} catch (error) {
	  console.error(`Error placing the Buoys: ${error.message}`);
	}
	})
	.catch(error => {
	console.error(`Error querying buoys: ${error.message}`);
	});
	turnOnListeners();
}

function updateResults(){
turnOffListeners();    
fetch('https://gcloud.ingenium.net.au/racelog?racenr='+racenr)
.then(response => response.json())
.then(result => result.result)
.then(result => {
  try {
    let hue = 0;
	map_bounds = [];
	boat_types = [];
	var windy_div = document.getElementById("bottom").parentNode;
	var sarl_BoatDetails = document.createElement("div");
	sarl_BoatDetails.setAttribute('id', 'sarl_BoatDetails');
	sarl_BoatDetails.setAttribute('class', 'sarl');
	var bottomDiv = document.getElementById("bottom");
	windy_div.insertBefore(sarl_BoatDetails, bottomDiv);

    for (const boatName of Object.keys(result)) {
      hue = (hue + 60) % 360;

      const boat = result[boatName];
      
      boatTrack = boat.track;
      start_boatTrack_pos = boatTrack[0];
      if (start_boatTrack_pos) {
		  start_boatTrack_lon = start_boatTrack_pos[1];
		  if (start_boatTrack_lon <= 0){
			curr_hemi = 'west';
		  } else {
			curr_hemi = 'east';  
		  }      
		  	new_boatTrack = [];
			copy_boatTrack = [];
			
		  for (t = 0; t < boatTrack.length; t++ ){
			  boatTrack_pos = boatTrack[t];
			  boatTrack_lat = boatTrack_pos[0];
			  boatTrack_lon = boatTrack_pos[1];
			  
			  
			if (curr_hemi == 'west'){
				  if (boatTrack_lon <= 0) {
					new_boatTrack_lon = boatTrack_lon;
				  } else {
				  	new_boatTrack_lon = boatTrack_lon - 360;
				  }
				  copy_new_boatTrack_lon = new_boatTrack_lon + 360;
			} else if (curr_hemi == 'east'){
				if (boatTrack_lon >= 0) {
					new_boatTrack_lon = boatTrack_lon;
					copy_new_boatTrack_lon = null;
				} else {
					new_boatTrack_lon = null;					
					copy_new_boatTrack_lon = boatTrack_lon;
				}				
			}

			if (new_boatTrack_lon) {
			  new_boatTrack_pos = [boatTrack_lat, new_boatTrack_lon];
			  new_boatTrack.push(new_boatTrack_pos);
			}
			if (copy_new_boatTrack_lon) {
			  copy_new_boatTrack_pos = [boatTrack_lat, copy_new_boatTrack_lon];
			  copy_boatTrack.push(copy_new_boatTrack_pos);
			}

			if ((t<11) && (new_boatTrack_lon)) {
				const update_pos = L.circleMarker(new_boatTrack_pos, {
			      	radius: 5,
			      	color: `hsl(${hue}, 100%, 45%)`
				}).addTo(W.maps);		
			}
			if ((t<11) && (copy_new_boatTrack_lon)) {
				const copy_update_pos = L.circleMarker(copy_new_boatTrack_pos, {
					radius: 5,
					color: `hsl(${hue}, 100%, 45%)`
				}).addTo(W.maps);
			}			  
		  }

 		  const layer = L.polyline(new_boatTrack, {
			color: `hsl(${hue}, 100%, 45%)`,
			weight: 2,
		  }).addTo(W.maps);

		  layer.on('mouseover', function (e) {
				layer.setStyle({
					weight: 4,
					dashArray: "20",
				});
		  });

		  layer.on('mouseout', function (e) {
				layer.setStyle({
					weight: 2,
					dashArray: "0",
				});
			});
		
			const copy_layer = L.polyline(copy_boatTrack, {
				color: `hsl(${hue}, 100%, 45%)`,
				weight: 2,				
			}).addTo(W.maps);

			copy_layer.on('mouseover', function (e) {
				copy_layer.setStyle({
					weight: 4,
					dashArray: "20",
				});
			});

			copy_layer.on('mouseout', function (e) {
				copy_layer.setStyle({
					weight: 2,
					dashArray: "0",
				});
			});
		  var coords = new_boatTrack[0];
		  var copy_coords = copy_boatTrack[0];

  		  if ((boat.finished == 'true') && (boat.status == 'Finished')) {
		    coords_lat = coords[0];
		    coords_lon = coords[1];
		    
		    if (boat.rank <= 5) {
                coords_lon += (boat.rank/500);    
            }
            if (boat.rank > 5 && boat.rank <=10) {
                coords_lon += ((boat.rank-5)/500);    
                coords_lat -= .001;
            }
		    
		    coords = [coords_lat,coords_lon];
		  }
		  
		  if ((coords)) { 
				var BoatIconURL
				switch (boat.btptype) {
					case "50' Performance Cruiser":
						BoatIconURL = Boat5
						break;
					case "Mini Transat":
						BoatIconURL = Boat2
						break;
					case "Sailaway Cruiser 38":
						BoatIconURL = Boat1
						break;
					case "Caribbean Rose":
						BoatIconURL = Boat3
						break;
					case "52' Cruising Cat":
						BoatIconURL = Boat4
						break;
					case "Nordic Folkboat (learn)":
						BoatIconURL = Boat6
						break;
					case "Nordic Folkboat":
						BoatIconURL = Boat7
						break;
					case "32' Offshore Racer":
						BoatIconURL = Boat8
						break;
				}


				const BoatIcon = L.icon({
					iconUrl: BoatIconURL,
					iconSize: [24, 24],
					iconAnchor: [12, 12],
					popupAnchor: [0, 0],
				});

				const marker = L.marker(coords, {
					icon: BoatIcon,
					}).addTo(W.maps);
				markers.push(marker);
				marker._icon.setAttribute('data-heading', boat.heading);
				
				var lat = coords[0].toString();
				var lon = coords[1].toString();
				var rdlat = lat.substring(0, lat.indexOf('.') + 4);
				var rdlon = lon.substring(0, lon.indexOf('.') + 4);
				var pos = rdlat +', '+rdlon;
				
				
				marker.on('mouseover', function(e) {						
						var boatStatus = 'Rank: '+ boat.rank +'<br/>Boat: '+boat.ubtname+' - '+boat.btptype+'<br/>Skipper: ' +boat.usrname+'<br/>Speed: '+boat.lastreport_speed+'Knts<br/>Track Distance: '+boat.trackdistance+'NM<br/>Heading: '+boat.heading;					
						document.getElementById("sarl_BoatDetails").innerHTML = boatStatus;
											
				});
				
				if ((boat.finished == 'true') && (boat.status == 'Finished')) {
        		    coords_lat = coords[0];
        		    coords_lon = coords[1];
        		    if (boat.rank <= 5) {
                        coords_lon += (boat.rank/500);    
                    }
                    if (boat.rank > 5 && boat.rank <=10) {
                        coords_lon += ((boat.rank-5)/500);    
                        coords_lat -= .001;
                    }      		    
        		   
				} 
				if (copy_coords) { 
					if ((boat.finished == 'true') && (boat.status == 'Finished')) {
						coords_lat = copy_coords[0];
						coords_lon = copy_coords[1];
						if (boat.rank <= 5) {
							coords_lon += (boat.rank/500);    
						}
						if (boat.rank > 5 && boat.rank <=10) {
							coords_lon += ((boat.rank-5)/500);    
							coords_lat -= .001;
						}
						
						copy_coords = [coords_lat,coords_lon];
					} 
					if (boatTrack.length == copy_boatTrack.length) {
						const copy_marker = L.marker(copy_coords, {
							icon: BoatIcon,
							}).addTo(W.maps);
						markers.push(copy_marker);
						copy_marker._icon.setAttribute('data-heading', boat.heading);
						
						copy_marker.on('mouseover', function(e) {						
							var boatStatus = 'Rank: '+ boat.rank +'<br/>Boat: '+boat.ubtname+' - '+boat.btptype+'<br/>Skipper: ' +boat.usrname+'<br/>Speed: '+boat.lastreport_speed+'Knts<br/>Track Distance: '+boat.trackdistance+'NM<br/>Heading: '+boat.heading;					
							document.getElementById("sarl_BoatDetails").innerHTML = boatStatus;		
												
						});
					}
				}
			}
		  if (boat.rank != 'DNF') {
			map_bounds.push(start_boatTrack_pos);
			
		  }
	  }
	}
	map.options.maxZoom = 17;
	ZoomToMapBounds(map_bounds);
	updateIconStyle();
  } catch (ex) {
    console.error(`Error querying boats: ${ex.message}`);
  }
})
.catch(ex => {
  console.error(`Error querying boats: ${ex.message}`);
});
turnOnListeners();
}
W.store.set('favOverlays',['wind', 'gust', 'currents'])

})