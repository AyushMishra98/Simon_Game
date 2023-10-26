var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];

var userClickedPattern=[];

var onlyFirstTime=true;
var level=0;

$("body").on("keydown",function(){
    if(onlyFirstTime)
    nextSequence();
    onlyFirstTime=false;
});


$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        $("body").addClass("game-over");        

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        var audio=new Audio("sounds/wrong.mp3");
        audio.play();

        $("h1").text("Game Over, Press any key to restart");
        startOver();
    }
}
function startOver(){
    gamePattern=[];
    onlyFirstTime=true;
    level=0;
}
function nextSequence(){
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4);
    
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
    $("h1").text("level "+level);
    level=level+1;

}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}