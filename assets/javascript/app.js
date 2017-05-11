
var qa = [
		{
			question: "Who was the father of Romulus and Remus?",
			correct: "Mars",
			inco: ["King Numitor", "Jupiter", "A wolf"],
			pic: "#",
		},
		{
			question: "Which was the first Roman road / where did it run?",
			correct: "Via Appia",
			inco1: "Via Flaminia",
			inco2: "Via Egnatia",
			inco3: "Via Valeria",
			pic: "#",
		},
		{
			question: "Which enemy city did the Romans plough with salt?",
			correct: "None",
			inco1: "Carthage",
			inco2: "Corinth",
			inco3: "Syracuse",
			pic: "#",
		},
		{
			question: "Which of the following did not defeat Mithridates VI of Pontus?",
			correct: "Marius",
			inco1: "Sulla",
			inco2: "Lucullus",
			inco3: "Pompey",
			pic: "#",
		},
		{
			question: "How many times was Rome sacked in antiquity?",
			correct: "Three or Four",
			inco1: "One",
			inco2: "Two",
			inco3: "Six",
			pic: "#",
		},

]

	// qa = question: ?
	// 		correct: correct answer
	// 		inco1: wrong answer
	// 		inco2: wrong answer
	// 		inco3: wrong answer
	// 		pic: Image
	// or
	// qa = question: ?
	// 		correct: correct answer
	// 		inco: [wrong answer, wrong answer, wrong answer]
	// 		pic: Image

// start

$("#start").on("click", function(){
	$(".hide").addClass("show");
	$(".hide").removeClass("hide");
	$("#start").css("display", "none");
	// timer
	var time = 5;
	
	var intervalId;

	var hit = 0;
	var miss = 0;

	//acts as switch between wait and timer
	var wt = 0;


	function countDown() {
      intervalId = setInterval(decrement, 1000);
    	if (wt === 0){
    		time = 5;
    	}
    	else {
    		time = 10;
    	}

    }

    function decrement() {

      //  Decrease time by one.
      time -= 1;

      //  Show the wait or time in the #timer tag
      $("#timer").html(time);

      // When time runs out
      if (time <= 0) {
      	
      	stop();
      	//if waiting
      	if (wt === 0){
      		console.log("new");
      		newQ();
      	}
      	// if question time ends
      	// doesnt quite work
      	else{
      		miss++;
      		$("#question").html("Incorrect! ")
      		showA();
      	}
      }
    }

    function stop() {
      clearInterval(intervalId);
    }

    function newQ(){
    	//switch to question state
    	wt = 1
    	// make qa[0] qa[counter]
    	$("#question").html(qa[0].question)
    	
		$("#answers").empty();
		$("#answers").css("visibility", "visible")
    	var rando = Math.floor(Math.random()*4);
        
      	for (var i = 0; i < 3; i++){
      	      	// make qa[0] qa[counter]
      	      	$("#answers").append("<li class='answer'>" + qa[0].inco[i] + "</li>");
      	}

      	// is there a better way to randomly insert a list item
      	$("<li class='answer' id= 'corA'>" + qa[0].correct + "</li>").insertAfter($("#answers li:nth-child("+rando+")"));
      		
      	countDown();

      	$(".answer").on("click", function(){
      		if (this.id === "corA") {
      			hit++;
      			$("#question").html("Correct! ")
      			console.log("correct");
      		}
      		else {
      			miss++;
      			$("#question").html("Incorrect! ")
      			console.log("Incorrect! ");
      		}

      		
      		showA();

      	})

      function showA(){
      	$("#answers").css("visibility", "hidden");
      	stop();
      	wt = 0;
      	$("#question").append("The Answer Was: " + qa[0].correct);
      	countDown();
      }


    }


    // for (var i = 0; i < qa.length; i++){
    	countDown();
    // }



































})