class Device {
	constructor(id, name, type) {
        this.id = id;
        this.type = type;
		name ? this.name = name : this.name = id;
	}
}

class Config {
	constructor() {
		this.floors = [];
		this.add = function (device, room, floor) {
            let _floor = "Default";
			floor ? _floor = floor : _floor = "Default";
			let exists = false;
			for (let i = 0; i < this.floors.length; i++) {
				if (this.floors[i].name === _floor) {
					exists = true;
					this.floors[i].add(device, room);
				}
			}
			if (exists === false) {
				let fl = new Floor(_floor);
				fl.add(device, room);
				this.floors.push(fl);
			}
		};
	}
}

class Floor {
    constructor(name) {
        this.name = name;
        this.rooms = [];
        this.add = function (device, room) {
            let _room = "Default";
            room ? _room = room : _room = "Default";
            let exists = false;
            for (let i = 0; i < this.rooms.length; i++) {
                if (this.rooms[i].name === _room) {
                    this.rooms[i].add(device);
                    exists = true;
                }
            }
            if (exists === false) {
                let fl = new Room(_room);
                fl.add(device);
                this.rooms.push(fl);
            }
        };
    }
}

class Room {
    constructor(name) {
        this.name = name;
        this.devices = [];
        this.add = function (device) {
            this.devices.push(device);
        };
    }
}

class Fhem {
    constructor() {
        //const server = "192.168.178.24";
        const server = "localhost";
        const cmd = "jsonlist2 floor=.* &XHR=1";
        const url = `http://${server}:8085/fhem?cmd=${cmd}&fwcsrf=1q2w3e4r`;
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
                let obj = JSON.parse(response);
                for (let i = 0; i < obj.Results.length; i++) {
                    let result = obj.Results[i];
                    if (result.Attributes.room && result.Attributes.room != "hidden") {
                        let id = result.Name;
                        let type = result.Name.split(".")[2];
                        let name = result.Attributes.name;

                        console.log(`Device : ${name} ${id} ${type}`);

                        let device = new Device(id, name, type);
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


console.log("-----------------------------");
const fhem = new Fhem();
let config = fhem.getConfig();
console.log(config);
console.log("-----------------------------");


const home = {
    floors: [{
        id: 'OG',
        name: 'Obergeschoss',
        rooms: [
            { id: 'O-01', name: 'Wohnzimmer' },
            { id: 'O-02', name: 'Esszimmer' },
            { id: 'O-03', name: 'Küche' },
            { id: 'O-04', name: 'Kammer' },
            { id: 'O-05', name: 'Gästezimmer' },
            { id: 'O-06', name: 'Das Zimmer' }
        ]
    },
    {
        id: 'DG',
        name: 'Dachgeschoss',
        show: 'show',
        rooms: [
            { id: 'D-01', name: 'Katharina' },
            { id: 'D-02', name: 'Christina' },
            { id: 'D-03', name: 'Sophia' },
            { id: 'D-04', name: 'Wäsche' },
            { id: 'D-05', name: 'Bad' },
            { id: 'D-06', name: 'Dusche' }
        ]
    }
    ]
}

for (var i = 0; i < home.floors.length; i++) {
    createFloor(home.floors[i]);
}

function createFloor(floor) {
    let template = `<div id="${floor.id}" class="collapse row m-0 ${floor.show}">
                        <div class="col-lg-3 col-md-8 p-0 mx-0 my-2">
                            <div class="card p-0 m-0">
                                <a href="#H01" class="collapsed card-link text-secondary" data-toggle="collapse">
                                    <div class="card-header bg-primary text-white py-2">
                                        <h5 class="m-0">${floor.name}</h5>
                                        <div class=" display-topright">
                                            <div class="tiny inline left-narrow-2x" data-type="symbol" data-device="O.01.Licht" data-states='["on","off"]' data-hide-on="off" data-hide-off="on" data-icons='["oa-light_light_dim_100"]' data-on-color="white"></div>
                                            <div class="tiny inline left-narrow-2x" data-type="symbol" data-device="O.01.Heizung" data-states='["on","off"]' data-hide-on="off" data-hide-off="on" data-icons='["fa-thermometer-half"]' data-on-color="white"></div>
                                            <div class="tiny inline left-narrow-2x" data-type="symbol" data-device="O.01.Fenster" data-states='["on","off"]' data-hide-on="off" data-hide-off="on" data-icons='["oa-fts_window_1w"]' data-on-color="white"></div>
                                        </div>
                                    </div>
                                </a>
                                <div id="H01" class="card-body collapse">
                                    <p class="card-text">Status Licht</p>
                                    <p class="card-text">Status Fenster</p>
                                    <p class="card-text">Status Heizung</p>
                                </div>
                            </div>
                        </div>                        
                    </div>`;

    let node = htmlToElements(template)[0];
    for (var i = 0; i < floor.rooms.length; i++) {
        node.appendChild(createRoom(floor.rooms[i]));
    }

    document.body.appendChild(node)
}

function createRoom(room) {
    let template = `
        <div class="card p-0 mx-0 my-2">
            <a href="#HREF-${room.id}" class="collapsed card-link text-secondary text-left" data-toggle="collapse">
                <div class="card-header bg-warning py-2">
                    <h5 class="m-0">${room.name}</h5>
                </div>
            </a>
            <div id="HREF-${room.id}" class="card-body collapse p-2 ${room.show}">
                <nav>
                    <div class="nav border-bottom" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link" data-toggle="tab" href="#NAV-${room.id}-L" role="tab"><i class="fa fa-lightbulb-o big"></i></a>
                        <a class="nav-item nav-link" data-toggle="tab" href="#NAV-${room.id}-H" role="tab"><i class="fa fa-thermometer-half big"></i></a>
                        <a class="nav-item nav-link" data-toggle="tab" href="#NAV-${room.id}-A" role="tab"><i class="fa fa-volume-up big"></i></a>
                        <a class="nav-item nav-link" data-toggle="tab" href="#NAV-${room.id}-S" role="tab"><i class="fa fa-cog big"></i></a>
                    </div>
                </nav>

                <div class="tab-content" id="nav-tabContent">
                    <div id="NAV-${room.id}-L" class="tab-pane fade p-2" role="tabpanel">
                        <h5 class="text-left">Light</h5>
                    </div>
                    <div id="NAV-${room.id}-H" class="tab-pane fade p-2" role="tabpanel">
                        <h5 class="text-left">Heating</h5>
                    </div>
                    <div id="NAV-${room.id}-A" class="tab-pane fade p-2" role="tabpanel">
                        <h5 class="text-left">Audio</h5>
                    </div>
                    <div id="NAV-${room.id}-S" class="tab-pane fade p-2" role="tabpanel">
                        <h5 class="text-left">Status</h5>
                    </div>
                </div>
            </div>
        </div>`;

    var node = document.createElement("div");
    node.classList.add("col-lg-3", "col-md-4", "p-0", "m-0");
    node.id = room.id;
    node.innerHTML = template;
    //    document.getElementById("O-ROOMS").appendChild(node)

    return node;
};

/**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList} 
 */
function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}