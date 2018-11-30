/**
 * 
 */
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



function Fhem() {

	//const server = "192.168.178.24";
	const server = "localhost";
	const cmd = "jsonlist2 floor=.* &XHR=1";
	const url = `http://${server}:8085/fhem?cmd=${cmd}&fwcsrf=1q2w3e4r`;

	console.log(`URL : ${url}`);
	
	let config = new Config();
	
	let get = function(url, callback) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() { 
            if (request.readyState == 4 && request.status == 200)
                callback(request.responseText);
        }

        request.open( "GET", url, true );            
        request.send( null );
    }
	
	
	
	this.getConfig = function() {
		console.log("-> config");
		get(url, function(response) {
			obj = JSON.parse(response);
			for(let i=0; i<obj.Results.length; i++) {
				let result = obj.Results[i];
				if(result.Attributes.room && result.Attributes.room != "hidden") {
					let device = new Device(result.Name, result.Attributes.alias);
					let room   = result.Attributes.room;
					let floor  = result.Attributes.floor;
					config.add(device, room, floor);
				}
			}
		});		
		console.log("<- config");
		return config;
	}
}