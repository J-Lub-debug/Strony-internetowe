window.onload = start_game; //Alias

let shoot_phase_off = true;

let phase = 0; // [phase 0] - 1 block x 4 || [phase 1] - 2 block x 3 ... 
let setShipsClicks = 21;

let nrOfClicks = 0;
let prevFieldNr = 0;

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
	
	let pane = "."  //innerHTML container
	let counter = 0; //nr of field
	let field = ""; //field identity class
	
	//Field Numbers
	for(i = 1; i < 11; i++){
		pane += '<div class = "nr-block" >' + i + '</div>';
	}
	pane += '<div style="clear:both;"></div>' //New line
	
	//Fields and alphabet for left pane - set_ship, for right pane - shoot()
	for(j = 0; j < 10; j++){
		for(i = 0; i < 10; i++){
			if(i == 0) pane += alphabet[j] + " ";
			counter++;
			field = "field" + counter;
			pane += '<div class = "block ' + field + '" onclick="' + functName + '(' + counter + ');"value="false"></div>';
			}
		pane += '<div style="clear:both;"></div>'; //New line
	}
	document.getElementById(paneName).innerHTML = pane;
	
}



function set_ship(fieldNr){ //MAX: 21 (fields, numberOf) 4x1 3x2 2x3 1x4
	if(shoot_phase_off){
		let field = "field" + fieldNr;
		let fieldDiv = document.querySelector("#left-pane > ." + field); //const?
		
		if(fieldDiv.getAttribute("value") == "false"){
			switch(phase){
				case 0:
					//Check border conditions
					let wrongFields = ["field" + (fieldNr - 1), "field" + (fieldNr + 1), "field" + (fieldNr + 10), "field" + (fieldNr - 10)];
					
					for (let x in wrongFields){
						//document.querySelector(wrongFields[x]).style.backgroundColor = "black";
						let wrongField = document.querySelector("#left-pane > ." + wrongFields[x]);
						wrongField.style.backgroundColor = "red";
						wrongField.setAttribute("value", true);
						wrongField.setAttribute("onclick",";");
						wrongField.style.cursor = "default";
					}
				
					fieldDiv.setAttribute("value", true);
					fieldDiv.setAttribute("onclick",";");
					fieldDiv.style.cursor = "default";
					fieldDiv.style.backgroundColor = "black";
					
					setShipsClicks--;
					
					if(setShipsClicks == 17){
						phase++;
					}
					break;
				case 1:
					if(nrOfClicks == 0){
						fieldDiv.setAttribute("value", true);
						fieldDiv.setAttribute("onclick",";");
						fieldDiv.style.cursor = "default";
						fieldDiv.style.backgroundColor = "black";
						
						setShipsClicks--;
						nrOfClicks++;
						prevFieldNr = fieldNr;
					}
					//+Add wrongFields to prevFieldNr
					else if(nrOfClicks > 0 && ((prevFieldNr == (fieldNr-1))) || (prevFieldNr == (fieldNr+1)) || (prevFieldNr == (fieldNr+10)) || (prevFieldNr == (fieldNr-10)) ){
						
						let wrongFields = ["field" + (fieldNr - 1), "field" + (fieldNr + 1), "field" + (fieldNr + 10), "field" + (fieldNr - 10)];
						
						for (let x in wrongFields){
							
						let wrongField = document.querySelector("#left-pane > ." + wrongFields[x]);
						wrongField.style.backgroundColor = "red";
						wrongField.setAttribute("value", true);
						wrongField.setAttribute("onclick",";");
						wrongField.style.cursor = "default";
					}
					
					fieldDiv.setAttribute("value", true);
					fieldDiv.setAttribute("onclick",";");
					fieldDiv.style.cursor = "default";
					fieldDiv.style.backgroundColor = "black";
					
					setShipsClicks--;
					nrOfClicks++;
					prevFieldNr = 0;
					nrOfClicks = 0;
					}
					
					if(setShipsClicks == 13){
						phase++;
						nrOfClicks = 0;
					}
					break;
				
				case 2:
					//+Add wrongFields to prevFieldNr
					//+3rd point will have diffrent wrong fields
					break;
				
				case 3:
					//+Add wrongFields to prevFieldNr
					break;
					
			}
			
		}
		
		
	}else return;
}

function shoot(fieldNr){
	if(shoot_phase_off) return;
	
	console.log("shoot: " + fieldNr);
}

