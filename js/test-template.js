addNavitem = function (node, floor) {
    let template = `<li class="nav-item">
                        <a class="nav-link" href="#${floor.name}" data-toggle="collapse">${floor.name}</a>
                    </li>`

    node.appendChild(htmlToElements(template)[0]);
}

addFloor = function (node, floor) {
    let template = `<div id="${floor.name}" class="col-lg-3 col-md-4 p-0 m-0"></div>`;
    let element = htmlToElements(template)[0];

    node.appendChild(element);

    return element;
}

addRoom = function (node, room) {
    let template = `<div id="${room.id}" class="card shadow p-0 mt-2 mx-auto room-bg">
                        <a href="#card-body-${room.id}" class="collapsed card-link text-secondary text-left" data-toggle="collapse">
                            <div class="card-header bg-warning py-2">
                                <h5 class="m-0">${room.name}</h5>
                            </div>
                        </a>
                        <div id="card-body-${room.id}" class="card-body collapse p-2 ${room.onload}">
                            <nav class="">
                                <div class="nav border-bottom" id="nav-tab-${room.id}" role="tablist">
                                </div>
                            </nav>

                            <div class="tab-content" id="gtc-${room.id}">
                            </div>
                        </div>
                    </div>`;

    node.appendChild(htmlToElements(template)[0]);
}

genGroup = function (room, group) {
    console.log(`      [${room.id}] - ${group.type}  `);
    let icon = getIcon(group.type);

    let tabNavNode = document.getElementById(`nav-tab-${room.id}`)
    let tabNavTemp = `<a class="nav-item nav-link" data-toggle="tab" href="#gtp-${room.id}-${group.type}" role="tab">
                        <i class="fa ${getIcon(group.type)} bigger"></i>
                      </a>`;
    tabNavNode.appendChild(toElement(tabNavTemp));

    let tabPanelNode = document.getElementById(`gtc-${room.id}`);
    let tabPanelTemp = `<div id="gtp-${room.id}-${group.type}" class="tab-pane fade p-0"></div>`;
    let node = toElement(tabPanelTemp);

    tabPanelNode.appendChild(node);


    if (group.divices) {
        for (const device of group.divices) {
            genDevice(node, device);
        }
    }
}

genDevice = function (node, device) {
    //node = document.getElementById();

    let template = "<p>*</p>";
    switch (device.type) {
        case "switch":
            genSwitch(node, device);
            break;
        case "push":
            genPush(node, device);
            break;
        case "climate":
            genClimate(node, device);
            break;
        case "audio":
            template = "<p>audio</p>";
            node.appendChild(htmlToElements(template)[0]);
            break;
        case "status":
            template = "<p>status</p>";
            node.appendChild(htmlToElements(template)[0]);
            break;
        default:
            text = "<p>?</p>";
            node.appendChild(htmlToElements(template)[0]);
    }
}

function genClimate(node, device) {
    //let template = `<div data-type="label" data-device="${device.id}"></div>`;
    let template =   `<div  data-type="label" data-device="${device.id}" data-unit="&deg;C" 
                            data-color="${pref.corlor.forground}"
                            class="tall">
                      </div>
                      <p>Soll Temperatur</p>
                      `;
    node.appendChild(toElement(template));    
}

function genSwitch(node, device) {
    let template = `<div class="grid-container p-0">
                        <div class=""></div>
                        <div class="align-self-center">
                            <h5 class="text-left m-0">${device.name}</h5>
                            <p class="text-left m-0">${device.desc}</p>
                        </div>
                        <div class="small" 
                            data-type="switch" 
                            data-device="${device.id}"
                            data-color="#FFFFFF"
                            data-on-color="#336699"
                            data-on-background-color="#FFCC33"
                            data-background-color="${pref.corlor.background}">
                        </div>
                    </div>`;
    node.appendChild(toElement(template));
}

function genPush(node, device) {
    let template = `<div class="grid-container p-0">
                        <div class=""></div>
                        <div class="align-self-center">
                            <h5 class="text-left m-0">${device.name}</h5>
                            <p class="text-left m-0">${device.desc}</p>
                        </div>
                        <div class="small" 
                            data-type="push" 
                            data-device="${device.id}" 
                            data-cmd="set" 
                            data-fhem-cmd="${device.cmd}"
                            data-set-on="on"
                            data-background-icon="fa-circle" 
                            data-icon="fa-lightbulb-o"
                            data-background-color="#FFCC33"
                            data-on-color="${pref.corlor.forground}"
                            data-on-background-color="#FFCC33"
                            data-off-color="${pref.corlor.text}"
                            data-off-background-color="${pref.corlor.background}"> 
                        </div>
                    <div>`
    node.appendChild(toElement(template));  
}

let navbar = document.getElementById("navbar");
document.body

for (const floor of home.floors) {
    console.log(`${floor.name}`);

    addNavitem(navbar, floor);
    let floorNode = addFloor(document.body, floor);
    for (const room of floor.rooms) {
        console.log(` - ${room.name}`);

        addRoom(floorNode, room);
        if (room.groups) {
            for (const group of room.groups) {
                genGroup(room, group);
            }
        }
    }
}

function getIcon(type) {
    switch (type) {
        case 'mode':
            return "fa-cog";
        case 'light':
            return "fa-lightbulb-o";
        case 'heating':
            return "fa-thermometer-quarter";
        case 'audio':
            return "fa-volume-down";
        case 'status':
            return "fa-signal";
        default:
            return "";
    }
}

function toElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes[0];
}

function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}