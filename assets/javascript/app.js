
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

	//acts as switch between wait and question states
	var wq = 0;


	function countDown() {
      intervalId = setInterval(decrement, 1000);
    	// if in wait state, short count
      if (wq === 0){
    		time = 5;
    	}
    	// if in question state, long count
      else {
    		time = 10;
    	}

    }
    function showA(){
      $("#answers").css("visibility", "hidden");
      stop();
      //switches to wait state
      wq = 0;
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

    function decrement() {

      //  Decrease time by one.
      time -= 1;

      //  Show the wait or time in the #timer tag
      $("#timer").html(time);

      // When time runs out
      if (time <= 0) {
      	
      	stop();
      	//if wait time ends, start question
      	if (wq === 0){
      		newQ();
      	}
      	// out of time
      	// doesnt quite work
      	else{
      		miss++;
      		$("#question").html("Incorrect! ");
      		showA();
      	}
      }
    }
    // stops the clock
    function stop() {
      clearInterval(intervalId);
    }

    function newQ(){
    	//switch to question state
    	wq = 1
    	$("#question").html(qa[rounds].question)
    	
		$("#answers").empty();
		$("#answers").css("visibility", "visible")
    	var rando = Math.floor((Math.random()*3)+1);
      console.log(rando);
    	for (var i = 0; i < 3; i++){
    	      	$("#answers").append("<li class='answer'>" + qa[rounds].inco[i] + "</li>");
    	}
    	// is there a better way to randomly insert a list item, 
      // insertAfter = never zero position
    	// if (rando > 0){
        $("<li class='answer' id= 'corA'>" + qa[rounds].correct + "</li>").
        insertAfter($("#answers li:nth-child("+rando+")"));
      // }
      // else {
      //    $("<li class='answer' id= 'corA'>" + qa[rounds].correct + "</li>").
      //   insertBefore($("#answers li:nth-child("+rando+")"));
      // }
    		
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

     
    }

    countDown();

})