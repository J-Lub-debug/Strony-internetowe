window.onload = start_game; //Alias

let shoot_phase_off = true;

function start_game(){
	
	generate_panes();
}

function generate_panes(){
	
	generate_pane("left-pane", "set_ship");
	generate_pane("right-pane", "shoot");

}

function generate_pane(paneName, functName){
	
	const fields = {
		1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "F", 7: "G", 8: "H", 9: "I", 10: "J",
		11: "A", 12: "B", 13: "C", 14: "D", 15: "E", 16: "F", 17: "G", 18: "H", 19: "I", 20: "J",
		21: "A", 22: "B", 23: "C", 24: "D", 25: "E", 26: "F", 27: "G", 28: "H", 29: "I", 30: "J",
		31: "A", 32: "B", 33: "C", 34: "D", 35: "E", 36: "F", 37: "G", 38: "H", 39: "I", 40: "J",
		41: "A", 42: "B", 43: "C", 44: "D", 45: "E", 46: "F", 47: "G", 48: "H", 49: "I", 50: "J",
		51: "A", 52: "B", 53: "C", 54: "D", 55: "E", 56: "F", 57: "G", 58: "H", 59: "I", 60: "J",
		61: "A", 62: "B", 63: "C", 64: "D", 65: "E", 66: "F", 67: "G", 68: "H", 69: "I", 70: "J",
		71: "A", 72: "B", 73: "C", 74: "D", 75: "E", 76: "F", 77: "G", 78: "H", 79: "I", 80: "J",
		81: "A", 82: "B", 83: "C", 84: "D", 85: "E", 86: "F", 87: "G", 88: "H", 89: "I", 90: "J",
		91: "A", 92: "B", 93: "C", 94: "D", 95: "E", 96: "F", 97: "G", 98: "H", 99: "I", 100: "J",
	};
	
	const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
	
	pane = "."
	counter = 0;
	
	//Field Numbers
	for(i = 1; i < 11; i++){
		pane += '<div class = "nr-block" >' + i + '</div>';
	}
	pane += '<div style="clear:both;"></div>' //New line
	
	//Fields and alphabet for left pane - set_ship for right pane - shoot()
	for(j = 0; j < 10; j++){
		for(i = 0; i < 10; i++){
			if(i == 0) pane += alphabet[j] + " ";
			counter++;
			pane += '<div class = "block" onclick="' + functName + '(' + counter + ');"></div>';
			}
		pane += '<div style="clear:both;"></div>'; //New line
	}
	document.getElementById(paneName).innerHTML = pane;
	
}


function set_ship(field){
	if(shoot_phase_off){
		
	}else return;
}

function shoot(field){
	if(shoot_phase_off) return;
	
	console.log("shoot: " + field);
}

