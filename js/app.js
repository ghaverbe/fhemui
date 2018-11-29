/**
 * 
 */



const fhem = new Fhem();
let config = fhem.getConfig();
console.log(config);


//for(let i=0; i<config.floors.length; i++) {
//	let floor = config.floors[i]) 
//	for(let j=0; j<floor.rooms.length; j++) {
//		let room = floor.rooms[j];
//		let device = "";
//		console.log(`${floor} - ${room} - ${device}`);
//	}
//}


