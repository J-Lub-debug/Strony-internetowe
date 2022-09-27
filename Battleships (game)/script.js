//TO DO: 
//+ Check border conditions for SET wrong fields three
//+ Add random field placement for enemy
//+ End of game when HP == 1 (all your ships destroyed) or SetShipClisk == 1(all enemy ships destroyed) 



window.onload = start_game; //Alias to run the game on page load

let shoot_phase_off = true; //true => set ships phase | false => shoot phase

let phase = 0; // [phase 0] - 1 block x 4 || [phase 1] - 2 block x 3 ... END OF set ship phase
let setShipsClicks = 21; //Number of clicks in set_ship phase determing the current phase || Number of clicks determing END of the game in shoot_phase
let hp = 21; //Number of remaining hitpoints 

let nrOfClicks = 0; //Number of already performed correct clicks in given phase

let shipFields = [];
let rightFields = [];

let shotRandFields = []; //fields already shot at by ENEMY PC
let nearbyFields = [-10, -1, 1, 10]; //Nearby fields ENEMY PC can shoot at once it hits target


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

function start_game(){
	
	generate_panes();
}

function generate_panes(){
	
	generate_pane("left-pane", "set_ship");
	generate_pane("right-pane", "shoot");
	setEnemyShips();

}

function generate_pane(paneName, functName){
	
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

function rand_set_enemy_ships(){
	let wrongFields = [];
	let enemyShipFields = [];
	let enemyPhase = 0;
	for(let i = 1; i < 21; i++){
		let fieldNr = Math.floor(Math.random() * 100) + 1;
		switch(enemyPhase){
			case 0:
				while(wrongFields.includes("field" + fieldNr)){
					fieldNr = Math.floor(Math.random() * 100) + 1;
				}
				setEnemyField(fieldNr);
				enemyShipFields.push(fieldNr);
				wrongFields = wrongFields.concat(setWrongFieldsTwo(fieldNr, "right"));
				wrongFields.push("field" + fieldNr);
				
				if(i == 4){
					enemyPhase++;
				}
			case 1:
				if(i%2 == 0){
					while(wrongFields.includes("field" + fieldNr)){
						
						fieldNr = Math.floor(Math.random() * 100) + 1;
						}
						setEnemyField(fieldNr);
						enemyShipFields.push(fieldNr);
						wrongFields = wrongFields.concat(setWrongFieldsTwo(fieldNr, "right"));
						wrongFields.push("field" + fieldNr);
						
						enemyShipFields.push(fieldNr);

				}else{

					
					fieldNr = enemyShipFields[0] + nearbyFields[Math.floor(Math.random() * 4)];
						
					setEnemyField(fieldNr);
					enemyShipFields.push(fieldNr);
					wrongFields = wrongFields.concat(setWrongFieldsTwo(fieldNr, "right"));
					wrongFields.push("field" + fieldNr);
					
					enemyShipFields = [];
				}
				if(i == 10){
					enemyPhase++;
				}
				

		}
	}
	
	
}

function shoot_random_field(){
	let leftFieldNr = Math.floor(Math.random() * 100) + 1;
	
	while(shotRandFields.includes(leftFieldNr)){
		leftFieldNr = Math.floor(Math.random() * 100) + 1;
		}
		shotRandFields.push(leftFieldNr);
	
	while(isShipHit(leftFieldNr, "left")){

		leftFieldNr = shotRandFields[Math.floor(Math.random() * shotRandFields.length)] + nearbyFields[Math.floor(Math.random() * 4)]; // Rand already shot fieldNr + Rand DIRECTION(-1/1/-10/10) 
		while(shotRandFields.includes(leftFieldNr)){ //randomize until it find field that haven't been shot yet.
			leftFieldNr = shotRandFields[Math.floor(Math.random() * shotRandFields.length)] + nearbyFields[Math.floor(Math.random() * 4)]; //leftFieldNr = Math.floor(Math.random() * 100) + 1; //Random field
		}
		shotRandFields.push(leftFieldNr);
	
		
	}
	
}

function isShipHit(fieldNr, paneSide){
	let paneSelector = "#" + paneSide + "-pane > .";
	let field = "field" + fieldNr;
	let fieldDiv = document.querySelector(paneSelector + field);
	let isShip = fieldDiv.getAttribute("value");
	
	
	if(isShip == "true"){
		fieldDiv.setAttribute("value", false);
		fieldDiv.style.cursor = "default";
		fieldDiv.setAttribute("onclick",";");
		fieldDiv.style.backgroundColor = "aqua";
		isShip = true;
	}
	else{
		fieldDiv.setAttribute("value", false);
		fieldDiv.style.cursor = "default";
		fieldDiv.setAttribute("onclick",";");
		fieldDiv.style.backgroundColor = "red";
		isShip = false;
	}
	
	return isShip;
}

function setEnemyField(fieldNr){
	let field = "field" + fieldNr;
	let fieldDiv = document.querySelector("#right-pane > ." + field);
					
	fieldDiv.setAttribute("value", true);

	fieldDiv.style.backgroundColor = "black";

}

function setRightField(field){
	let fieldDiv = document.querySelector("#left-pane > ." + field);
					
	fieldDiv.setAttribute("value", true);
	fieldDiv.setAttribute("onclick",";");
	fieldDiv.style.cursor = "default";
	fieldDiv.style.backgroundColor = "black";
					
	setShipsClicks--;
	nrOfClicks++;
}

function setWrongFieldsTwo(fieldNr, paneSide){//Set wrong fields Around
	let wrongFields = ["field" + (fieldNr - 1), "field" + (fieldNr + 1), "field" + (fieldNr + 10), "field" + (fieldNr - 10)]
	let paneSelector = "#" + paneSide + "-pane > .";
	
	for (let x in wrongFields){
		let wrongField = document.querySelector(paneSelector + wrongFields[x]);
		let wrongFieldNr = parseInt(wrongFields[x].replace("field", ''));
		

		if(wrongFieldNr < 1 || wrongFieldNr > 100) {
			//OUT OF BOUNDS, do nothing
		}
		else if(wrongField.style.backgroundColor != "black"){
			wrongField.style.backgroundColor = "red";
			if(paneSide == "right"){
			}
			else{
				wrongField.setAttribute("onclick",";");
				wrongField.style.cursor = "default";
			}
			//wrongField.setAttribute("value", true);
			}
		}
	return wrongFields;
	
}

function setWrongFieldsThree(field1, field2, paneSide){ //Set wrong fields Sideways
	let paneSelector = "#" + paneSide + "-pane > .";
	
	let wrongFields = [];
	if( (field2 - field1 < 10) && (field2 - field1 > -10)){ //org.version (field2 - field1 == 1) || (field2 - field1 == -1)
		wrongFields.push("field" + (field1 + 10));
		wrongFields.push("field" + (field1 - 10));
		wrongFields.push("field" + (field2 + 10));
		wrongFields.push("field" + (field2 - 10));
	}
	else if((field2 - field1 >= 10) && (field2 - field1 <= -10)){ //org.version (field2 - field1 == 10) || (field2 - field1 == -10)
		wrongFields.push("field" + (field1 + 1));
		wrongFields.push("field" + (field1 - 1));
		wrongFields.push("field" + (field2 + 1));
		wrongFields.push("field" + (field2 - 1));
	}
	for (let x in wrongFields){
		let wrongField = document.querySelector(paneSelector + wrongFields[x]);
		
		if(wrongField.style.backgroundColor != "black"){
			wrongField.style.backgroundColor = "red";
			}
			//wrongField.setAttribute("value", true);
			wrongField.setAttribute("onclick",";");
			wrongField.style.cursor = "default";
			}
	return wrongFields;
	
	
}

function getRightFieldsTwo(fields){
	let rightFields = [];
	for (x in fields){
		rightFields.push(fields[x]-1);
		rightFields.push(fields[x]+1);
		rightFields.push(fields[x]+10);
		rightFields.push(fields[x]-10);
	}
	return rightFields;
}

function getRightFieldsThree(field1, field2){ //+field2 - currently clicked field, field1 - previous field
    //Direction of vector
	let rightFields = [];
	if((field2 - field1) == 1 || (field2 - field1) == 2){
		rightFields.push(field2 + 1);
		rightFields.push(field1 - 1);
	}
	else if((field2 - field1 == -1) || (field2 - field1 == -2)){
		rightFields.push(field1 + 1);
		rightFields.push(field2 - 1);
		
	}
	else if((field2 - field1 == 10) || (field2 - field1 == 20)){
		rightFields.push(field2 + 10);
		rightFields.push(field1 - 10);
	}
	else if((field2 - field1 == -10) || (field2 - field1 == -20)){
		rightFields.push(field1 + 10);
		rightFields.push(field2 - 10);
	}
	return rightFields;
}


function set_ship(fieldNr){ //MAX: 21 (fields, numberOf) 4x1 3x2 2x3 1x4
	if(shoot_phase_off){
		let field = "field" + fieldNr;
		
		let fieldDiv = document.querySelector("#left-pane > ." + field);
		
		if(fieldDiv.getAttribute("value") == "false"){
			switch(phase){
				case 0: //1 block ships
					setRightField(field);
					setWrongFieldsTwo(fieldNr, "left");
					
					if(setShipsClicks == 17){
						phase++;
						nrOfClicks = 0;						
					}
					break;
				case 1: //2 block ships
					if(nrOfClicks == 0){
						setRightField(field);
						
						shipFields.push(fieldNr);
						rightFields = getRightFieldsTwo(shipFields);
					}
					else if(nrOfClicks > 0 && rightFields.includes(fieldNr) ){
						setRightField(field);
						
						shipFields.push(fieldNr);
						
						for (let x in shipFields){

							setWrongFieldsTwo(shipFields[x], "left");
						}
						
						shipFields = [];
						rightFields = [];
						nrOfClicks = 0;
					}
					
					if(setShipsClicks == 11){
						phase++;
					}
					break;
				
				case 2: //3 block ships
					if(nrOfClicks == 0){
						setRightField(field)
						
						shipFields.push(fieldNr);
						rightFields = getRightFieldsTwo(shipFields);
					}
					else if(nrOfClicks == 1 && rightFields.includes(fieldNr)){
						setRightField(field);
						
						shipFields.push(fieldNr);
						rightFields = getRightFieldsThree(shipFields[0], shipFields[1]);
						
						setWrongFieldsThree(shipFields[0], shipFields[1], "left");
						
					}

					else if(nrOfClicks > 1 && rightFields.includes(fieldNr)){
						setRightField(field);
						
						shipFields.push(fieldNr);
						rightFields = getRightFieldsThree(shipFields[0], shipFields[2]);
						
						setWrongFieldsTwo(shipFields[0], "left");
						setWrongFieldsTwo(shipFields[1], "left");
						setWrongFieldsTwo(shipFields[2], "left");
						
						shipFields=[];
						rightFields=[];
						nrOfClicks = 0;
						}
						if(setShipsClicks == 5){
							phase++;
							nrOfClicks = 0;
					}
					break;
				
				case 3: //4 block ship
					if(nrOfClicks == 0){
						setRightField(field)
						
						shipFields.push(fieldNr);
						rightFields = getRightFieldsTwo(shipFields);
					}
					else if(nrOfClicks == 1 && rightFields.includes(fieldNr)){
						setRightField(field);
						
						shipFields.push(fieldNr);
						rightFields = getRightFieldsThree(shipFields[0], shipFields[1]);
						
						setWrongFieldsThree(shipFields[0], shipFields[1], "left");
					}
					else if(nrOfClicks == 2 && rightFields.includes(fieldNr)){
						setRightField(field);
						
						shipFields.push(fieldNr);
						rightFields = getRightFieldsThree(shipFields[0], shipFields[2]);
						
						setWrongFieldsThree(shipFields[0], shipFields[2], "left");
						
					}

					else if(nrOfClicks == 3 && rightFields.includes(fieldNr)){
						
						setRightField(field);
						shipFields.push(fieldNr);
						
						rightFields = getRightFieldsThree(shipFields[0], shipFields[3]);
						
						setWrongFieldsTwo(shipFields[0], "left");
						setWrongFieldsTwo(shipFields[1], "left");
						setWrongFieldsTwo(shipFields[2], "left");
						setWrongFieldsTwo(shipFields[3], "left");
						
						shipFields=[]
						rightFields=[]
						nrOfClicks = 0;
					}
					
					if(setShipsClicks == 1){ //END of set_ship Phase
						phase++;
						nrOfClicks = 0;
						
						setShipsClicks = 21;
						shoot_phase_off = false;
					}
					break;
					
			}
			
		}
		
		
	}else return;
}

function setEnemyShips(){
	
	//Set random placement
	//rand_set_enemy_ships();
	
	//1 block
	
	setEnemyField(5);
	setEnemyField(88);
	setEnemyField(72);
	setEnemyField(1);
	
	//2 block
	setEnemyField(20);
	setEnemyField(30);
	
	setEnemyField(55);
	setEnemyField(45);
	
	setEnemyField(74);
	setEnemyField(75);
	
	//3 block
	setEnemyField(70);
	setEnemyField(60);
	setEnemyField(50);
	
	setEnemyField(94);
	setEnemyField(95);
	setEnemyField(96);
	
	
	//4 block
	setEnemyField(22);
	setEnemyField(23);
	setEnemyField(24);
	setEnemyField(25);
	
	
	//hideEnemyShips();
	//?Is needed?
	setShipsClicks = 21;
	nrOfClicks = 0;
	phase = 0;
	shipFields = [];
	rightFields = [];
	
}


function shoot(fieldNr){
	if(shoot_phase_off) return;
	
	if(isShipHit(fieldNr, "right")){
		return;
	}else{
		shoot_random_field();
	}
}

