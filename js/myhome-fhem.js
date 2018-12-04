console.log("myhome-fhem.sh");


class FhemConfig {
	constructor() {
		this.server = "localhost";
		this.port = "8085";
		this.cmd = "jsonlist2 floor=.* &XHR=1";
		this.name = "MY.HOME";
		this.floors = new Array();
		this.devices = new Array();


		this.get = function (url, callback) {
			var request = new XMLHttpRequest();
			request.onreadystatechange = function () {
				if (request.readyState == 4 && request.status == 200)
					callback(request.responseText);
			};
			request.open("GET", url, true);
			request.send(null);
		};
	}

	readConfig() {
		const url = `http://${this.server}:${this.port}/fhem?cmd=${this.cmd}&fwcsrf=1q2w3e4r`;
		let devices = [];

		this.get(url, function (response) {
			let obj = JSON.parse(response);
			for (let i = 0; i < obj.Results.length; i++) {
				let result = obj.Results[i];
				if (result.Attributes.room && result.Attributes.room != "hidden") {
					let dat = {
						room: result.Attributes.room,
						floor: result.Attributes.floor,
						device: {
							id: result.Name,
							nr: result.Internals.NR,
							name: result.Attributes.name,
							type: result.Name.split(".")[2]
						}
					}
					console.log(dat);
					devices.push(dat);
				}
			}
		});
		//console.log(devices);
		return devices;
	}


}

const fhem1 = new FhemConfig();
const foo = fhem1.readConfig();

console.log("--- foo ---");
setTimeout
console.log(foo.length);
console.log("--- foo ---");







//console.log(fhem1);


/*
function Config() {
	this.floors = [];

	
	this.add = function(device, room, floor) {
		floor ? _floor = floor : _floor = "Default";
		
		let exists = false;		
		for(let i=0; i<this.floors.length; i++) {
			if(this.floors[i].name === _floor) {
				exists = true;
				this.floors[i].add(device, room);
			}
		}
		if(exists === false) {
			let fl = new Floor(_floor);
			fl.add(device, room);
			this.floors.push(fl);
		}
	}
}

function Floor(name) {
	this.name = name;
	this.rooms = []
	
	this.add = function(device, room) {
		room ? _room = room : _room = "Default";
		
		let exists = false;		
		for(let i=0; i<this.rooms.length; i++) {
			if(this.rooms[i].name === _room) {
				this.rooms[i].add(device);
				exists = true;
			}
		}
		if(exists === false) {
			let fl = new Room(_room);
			fl.add(device);
			this.rooms.push(fl);
		}
	}	
}

function Room(name) {
	this.name = name;
	this.devices = [];
	
	this.add = function(device) {
		this.devices.push(device);
	}
}

function Device(id, name) {
	this.id = id;
	name ? this.name = name : this.name = id;
}

class Fhem {
	constructor() {
		//const server = "192.168.178.24";
		const server = "localhost";
		const cmd = "jsonlist2 floor=.* &XHR=1";
		const url = `http://${server}:8085/fhem?cmd=${cmd}&fwcsrf=1q2w3e4r`;
		console.log(`URL : ${url}`);
		let config = new Config();
		let get = function (url, callback) {
			var request = new XMLHttpRequest();
			request.onreadystatechange = function () {
				if (request.readyState == 4 && request.status == 200)
					callback(request.responseText);
			};
			request.open("GET", url, true);
			request.send(null);
		};
		this.getConfig = function () {
			console.log("-> config");
			get(url, function (response) {
				obj = JSON.parse(response);
				for (let i = 0; i < obj.Results.length; i++) {
					let result = obj.Results[i];
					if (result.Attributes.room && result.Attributes.room != "hidden") {
						let device = new Device(result.Name, result.Attributes.alias);
						let room = result.Attributes.room;
						let floor = result.Attributes.floor;
						config.add(device, room, floor);
					}
				}
			});
			console.log("<- config");
			return config;
		};
	}
}
*/