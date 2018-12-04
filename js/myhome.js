




const home = {
    floors: [{
        id: 'OG',
        name: 'Obergeschoss',
        onload: 'show',
        rooms: [{
            id: 'O-01',
            name: 'Wohnzimmer',
            onload: 'show',
            divices: [
                { id: 'O.01.Licht.1', type: 'Licht', name: 'Stehlempe 1', desc: 'Stehlempe am Sofa' },
                { id: 'O.01.Licht.2', type: 'Licht', name: 'Stehlempe 2', desc: 'Stehlempe am Fenster' }
            ]
        },{   
            id: 'O-02', 
            name: 'Esszimmer',
            divices: [
                { id: 'O.02.Licht.1', type: 'Licht', name: 'Regel', desc: 'Deckenleuchte über dem Regal' },
                { id: 'O.02.Licht.2', type: 'Licht', name: 'Tisch', desc: 'Deckenleuchte über dem Tisch' }
            ] 
        },
        { id: 'O-03', name: 'Küche' },
        { id: 'O-04', name: 'Kammer' },
        { id: 'O-05', name: 'Gästezimmer' },
        { id: 'O-06', name: 'Das Zimmer' }
        ]
    },
    {
        id: 'DG',
        name: 'Dachgeschoss',
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
    let template = `<div id="${floor.id}" class="collapse row m-0 ${floor.onload}">
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


    for (var i = 0; i < floor.rooms.length; i++) {
        let room = floor.rooms[i];
        if (room.divices) {
            for (let j = 0; j < room.divices.length; j++) {
                createDevice(room, room.divices[j]);
            }
        }
    }

}

function createRoom(room) {
    let template = `
        <div class="card p-0 mx-0 my-2">
            <a href="#HREF-${room.id}" class="collapsed card-link text-secondary text-left" data-toggle="collapse">
                <div class="card-header bg-warning py-2">
                    <h5 class="m-0">${room.name}</h5>
                </div>
            </a>
            <div id="HREF-${room.id}" class="card-body collapse p-2 ${room.onload}">
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

function createDevice(room, device) {
    let template = `<div data-type="switch" data-device="${device.id}"></div>`;

    document.getElementById(`NAV-${room.id}-L`).appendChild(htmlToElements(template)[0]);

    console.log(device);
}

/**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList} 
 */
function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}