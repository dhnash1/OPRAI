
var dPrompt;
var interactables;
var unitType;
var questionNumber = 0;
var unitId = 0;
var units = [];
var activated = [];

const htmlString = "<p> Test succesful! </p>";

var prompts = [
    //Shooting//
    "What is the units type?", //0
    "Are there any Objectives not under AI control?", //1
    "If this unit advances towards the objective, will an enemy be in shooting range?", //2
    "Can this unit advance to bring an enemy into shooting range?", //3
    //Melee//
    "Are there enemies between this unit and the objective?",//4
    "Are there any enemies in charge range?",//5
    //Hybrid//
    "Is an objective in rush range but not in advance range?", //6   
    //Answers//
    "Advance towards the objective, Shoot if possible", //7 
    "Advance towards enemy, shoot if possible", //8
    "Rush towards the objective", //9
    "Rush towards enemy",//10
    "Charge enemy if possible, otherwise rush towards objective",//11
    "Charge enemy if possible, otherwise rush towards enemy",//12
    "Charge enemy if possible, else Advance toward objective and shoot if possible, else Rush toward objective",//13
    "Charge Enemy"//14
] 

window.onload = function () {
    dPrompt = document.getElementById('topPrompt');
    interactables = document.getElementById('interactables');
}
function quizFunction(param){
    switch(questionNumber){
        case 0 : //Unit type
            
            switch(param){
                case 0 : //Shooting
                    unitType = 0;
                    questionNumber = 1;
                break;
                case 1 : //Melee
                    unitType = 1;
                    questionNumber = 1;
                break;
                case 2 : //Hybrid
                    unitType = 2;
                    questionNumber = 1;
                break;
            }
        $("#b1").html("<h3>Yes</h3>");
        $("#b2").html("<h3>No</h3>");
        $("#b3").hide();
        $("#b0").show(); 
        break;
        case 1 : //Are there any Objectives not under AI control?
            switch(param){
                case 0 : //yes
                    switch(unitType){
                        case 0 : //shooting
                            questionNumber = 2;
                        break;
                        case 1 :  //melee
                            questionNumber = 4;
                        break;
                        case 2 : //hybrid
                            questionNumber = 4;
                        break;
                    }
                break;
                case 1 : //No
                    switch(unitType){
                        case 0 : //shooting
                            questionNumber = 3;
                        break;
                        case 1 : //melee
                            questionNumber = 5;
                        break;
                        case 2 : //hybrid
                            questionNumber = 5;
                        break;
                    }
                break;
            }
        break;

        case 2 : //If this unit advances towards the objective, will an enemy be in shooting range?
            switch(param){
                case 0 : //yes
                    questionNumber = 7; //ENDPOINT
                break;
                case 1 : //no
                    questionNumber = 9; //ENDPOINT
                break;
            }
        break;

        case 3 : //Can this unit advance to bring an enemy into shooting range?
            switch(param){
                case 0 : //yes
                    questionNumber = 8; //ENDPOINT
                break;
                case 1 :  //no
                    questionNumber = 10; //ENDPOINT
                break;
            }
        break;

        case 4 : //Are there enemies between this unit and the objective?
            switch(param){
                case 0 : //yes
                    switch(unitType){
                        case 1 :// melee
                            questionNumber = 11; //ENDPOINT
                        break;
                        case 2 : //hybrid
                            questionNumber = 13; //ENDPOINT
                        break;
                    }
                break;
                case 1 : //no
                    switch(unitType){
                        case 1 :// melee
                            questionNumber = 9; //ENDPOINT
                        break;
                        case 2 : //hybrid
                            questionNumber = 6;
                        break;
                    }
                break;
            }
        break;

        case 5 : //Are there any enemies in charge range?
            switch(param){
                case 0 : //yes
                    questionNumber = 14; //ENDPOINT
                break;
                case 1 :
                    switch(unitType){
                        case 1 : //melee
                            questionNumber = 10; //ENDPOINT
                        break;
                        case 2://hybrid
                            questionNumber = 3; //To Shooting tree
                        break;

                    }
                break;

            }

        break;

        case 6 :  //Is an objective in rush range but not in advance range?
            switch(param){
                case 0 : //yes
                    questionNumber = 9; //ENDPOINT
                break;
                case 1 : //no
                    questionNumber = 2;//To Shooting Tree
                break;
            }

        break;
    }
    $("#question").text(prompts[questionNumber]);
    console.log("now were on " + questionNumber);
    if(questionNumber >= 7){
        $("#b1").hide();
        $("#b2").hide();
        $("#b3").hide(); 
        
    }

}
function resetAll(){
    questionNumber = 0;
    $("#b1").show();
    $("#b1").html("<h3>Shooting</h3>");
    $("#b2").show();
    $("#b2").html("<h3>Melee</h3>");
    $("#b3").show();
    $("#b3").html("<h3>Hybrid</h3>"); 
    $("#b0").hide();
    $("#question").text(prompts[questionNumber]);
}

function unitPicker(){
    if(units.length > 0){
        var min = Math.ceil(0);
        var max = Math.floor(units.length);
        console.log(units);
        console.log("There are " + units.length + " Saved units");
        var selectedUnit = Math.floor(Math.random() * (max - min) + min); 

            $('#selectedUnit').html(units[selectedUnit].unitName + '<button onclick="selectedUnitDelete(' + units[selectedUnit].unitId + ')">X</button>');
            activated.push(units[selectedUnit])
            units.splice(selectedUnit, 1);
            console.log("units " + units);
            console.log("activated " + activated);
            $('#unitList').empty();
            unitList();
    }else if(activated.length > 0){

        units = activated;
        activated = [];
        unitPicker();
    }else{
        return;
    }
}

$('#unitName').on('keypress', function (e) {

    console.log("e = " + e);                                
    if(e === 13){

       //Disable textbox to prevent multiple submit
       $(this).attr("disabled", "disabled");

       console.log("entered");

       //Enable the textbox again if needed.
       $(this).removeAttr("disabled");
    }
});

function unitAdderEnter(x){
    if(x.keyCode == 13){
        unitAdder();
    }
}
function unitAdder(){
    $('#unitList').empty();
    if($("#unitName").val()){
    console.log($("#unitName").val());
    const object  = {
        unitName : $("#unitName").val(),
        unitId : unitId,
        activated : false
}   
    units.push(object);
    unitId++;
    }
    $("#unitName").val('');
    console.log(unitId);
    unitList()
}

function unitList(){
    units.forEach(element => {
        console.log(element);
        $("#unitList").append('<li> <p>' + element.unitName + '</p> <button onclick="unitDelete(' + element.unitId + ')">X</button> </li>');
    });
}

function unitDelete(x){
    units.filter(obj => {
        if(obj.unitId == x){
            units.splice(units.indexOf(obj), 1);
        }

    })
    activated.filter( obj =>{
    if(obj.unitId == x){
        activated.splice(units.indexOf(obj), 1);
    }
});
    $('#unitList').empty();
    unitList()
}

function selectedUnitDelete(x){

    $('#selectedUnit').html('');
    unitDelete(x);

}


$(function(){
  
    $("#question").text(prompts[questionNumber]);
    console.log("JQ");
    $("#testButton").on("click", function(){

        $('#mainDiv').load("q1.html");
        $("#testButton").hide();
    })

    $(".buttons").on("click", function(x){
        console.log(this);

    })



})

