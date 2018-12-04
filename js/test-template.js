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
    let template = `<div id="${room.id}" class="card p-0">
                        <a href="#card-body-${room.id}" class="collapsed card-link text-secondary text-left" data-toggle="collapse">
                            <div class="card-header bg-warning py-2">
                                <h5 class="m-0">${room.name}</h5>
                            </div>
                        </a>
                        <div id="card-body-${room.id}" class="card-body collapse p-2 ${room.onload}">
                            <nav>
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
                        <i class="fa ${getIcon(group.type)} big"></i>
                      </a>`;
    tabNavNode.appendChild(toElement(tabNavTemp));

    let tabPanelNode = document.getElementById(`gtc-${room.id}`);
    let tabPanelTemp = `<div id="gtp-${room.id}-${group.type}" class="tab-pane fade p-2"></div>`;
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
            template = `<div class="small" 
                             data-type="switch" 
                             data-device="${device.id}"
                             data-background-color="${pref.corlor.background}">
                        </div>`;
            break;
        case "push":
            template = `<div class="small" 
                             data-type="push" 
                             data-device="${device.id}" 
                             data-cmd="set" 
                             data-set-on="on"
                             data-background-icon="fa-circle" 
                             data-icon="fa-lightbulb-o"
                             data-background-color="${pref.corlor.background}"
                             data-on-color="${pref.corlor.forground}"
                             data-on-background-color="${pref.corlor.forground}"
                             data-off-color="${pref.corlor.text}"
                             data-off-background-color="${pref.corlor.background}">
                        </div>`
            break;
        case "climate":
            template = "<p>climate</p>";
            break;
        case "audio":
            template = "<p>audio</p>";
            break;
        case "status":
            template = "<p>status</p>";
            break;
        default:
            text = "<p>?</p>";
    }
    node.appendChild(htmlToElements(template)[0]);
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