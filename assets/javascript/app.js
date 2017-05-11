
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
			inco: ["Via Flaminia", "Via Egnatia", "Via Valeria"],
			pic: "#",
		},
		{
			question: "Which enemy city did the Romans plough with salt?",
			correct: "None",
			inco: ["Carthage", "Corinth", "Syracuse"],
			pic: "#",
		},
		{
			question: "Which of the following did not defeat Mithridates VI of Pontus?",
			correct: "Marius",
			inco: ["Sulla", "Lucullus", "Pompey"],
			pic: "#",
		},
		{
			question: "How many times was Rome sacked in antiquity?",
			correct: "Three or Four",
			inco: ["One", "Two", "Six"],
			pic: "#",
		}

]
	// qa[] = question: ?
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
	var rounds = 0;
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
    	$("#question").html(qa[rounds].question)
    	
		$("#answers").empty();
		$("#answers").css("visibility", "visible")
    	var rando = Math.floor((Math.random()*3)+1);
        console.log(rando);
      	for (var i = 0; i < 3; i++){
      	      	$("#answers").append("<li class='answer'>" + qa[rounds].inco[i] + "</li>");
      	}

      	// is there a better way to randomly insert a list item
      	// why does this sometimes not occur
      	$("<li class='answer' id= 'corA'>" + qa[rounds].correct + "</li>").insertAfter($("#answers li:nth-child("+rando+")"));
      		
      	countDown();

      	$(".answer").on("click", function(){
      		if (this.id === "corA") {
      			hit++;
      			$("#question").html("Correct! ")
      		}
      		else {
      			miss++;
      			$("#question").html("Incorrect! ")
      		}

      		
      		showA();

      	})

      function showA(){
      	$("#answers").css("visibility", "hidden");
      	stop();
      	wt = 0;
      	$("#question").append("The Answer Was: " + qa[rounds].correct);
      	rounds++;
      	if (rounds >= qa.length) {
      		endGame();
      	}
      	else{
      		countDown();
      	}
      }

      function endGame(){
      	$("#timer").html("GAME OVER");
      	if(miss > 0){
      		$("#question").html("You missed " + miss);
      	}
      	else {
      		$("#question").html("Congratulations! <br> You guessed all " + hit +"!");
      	}

      	$("#start").css("display", "initial");
      	$("#start").removeAttr('id');

      	$("button").html("RESET")

      	$("button").on("click", function(){
      		location.reload();
      	})

      }


    }

    countDown();

})