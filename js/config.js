/**
 * 
 */
var server = "192.168.1.18";
var port = ":8085";
var baseUrl = `http://${server}${port}`;

var templatePath = "/fhem/ftui/templats";
var configPath = "/fhem/ftui/config";

var template = {
	room: "",
	floor: ""
}

var config = {
	server: {
		host: "192.168.1.18",
		port: "8085"
	},
	building: ""
};

$(document).ready(function () {
	loadConfig();
});


function createRoom(floorId, room) {
	let innerHtml = document.getElementById(floorId).innerHTML;	
	let t = template.room;
	
	t = t.replace("\${room.id}", room.id);
	t = t.replace("\${room.id}", room.id);
	t = t.replace("\${room.name}", room.name);
	
	document.getElementById(floorId).innerHTML = innerHtml + t;
}

function loadConfigForFloors(floorId) {
	$.getJSON(`${baseUrl}${configPath}/${floorId}.json`, function(rooms) {
		let floor = building.floors[i];
		floor.rooms = rooms;
		for(let j=0; j<rooms.length; j++) {
			createRoom(building.floors[i].id, rooms[j]);
		}
	});
}

function loadConfig() {
	console.log("-> loadConfig");
	csrf = "XHR=1&fwcsrf=1q2w3e4r";
	
	console.log("Filter : " + ftui.poll.short.filter);
	
    ftui.poll.short.request = ftui.sendFhemCommand('jsonlist2 ' + ftui.poll.short.filter + "&" + csrf).done(function (fhemJSON) {
    	console.log("-> loadFhemConfig");
    	
    	console.log("<- loadFhemConfig");
    });
    console.log("RESPONSE " + JSON.stringify(ftui.poll.short.request));
    console.log("-> loadConfig");

	// --- read templats files --------------------------------------------------------------------
	$.get(`${baseUrl}${templatePath}/floor.html`, function(floor) {template.floor = floor});
	$.get(`${baseUrl}${templatePath}/room.html`, function(room) {template.room = room});
	
	// --- read config files ----------------------------------------------------------------------
	$.getJSON(`${baseUrl}${configPath}/building.json`, function(building) {
		config.building = building;

		let floors = config.building.floors;
		console.log(config.building);
		
		createNav(building);
		
		for(let i=0; i<building.floors.length; i++) {
			$.getJSON(`${baseUrl}${configPath}/${building.floors[i].id}.json`, function(rooms) {
				let floor = building.floors[i];
				floor.rooms = rooms;
				for(let j=0; j<rooms.length; j++) {
					createRoom(building.floors[i].id, rooms[j]);
				}
			});
		}
    });
	
	

	
	
	console.log("template.room : " + template.room);
	console.log("<- loadConfig");
}


function createNavItems(floor) {
	return `<li class="nav-item"><a class="nav-link nav-top" data-toggle="tab" href="#${floor.id}">${floor.name}</a></li>`;
}

function createNavPanel(floor) {
	return `<div class="tab-pane container-fluid pt-1 fade" id="${floor.id}"></div>`;
}

function createNav(config) {
	console.log("-> createNav");
	document.getElementById("navbarTogglerDemo01").innerHTML = `<ul class="nav nav-top " role="tablist">${config.floors.map(createNavItems).join("")}</ul>`;
	document.getElementById("navbarContent").innerHTML = `${config.floors.map(createNavPanel).join("")}`;
	console.log("<- createNav");
}












//function createNav() {
//	console.log("createNav");
//	console.log(`createNav : ${devices}`);
//	document.getElementById("navbarTogglerDemo01").innerHTML = `
//		<ul class="nav nav-top " role="tablist">
//		${devices.floors.map(createNavItems).join("")}
//		</ul>
//		`;
//}
