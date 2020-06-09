var userclickedpattern = []
var gamepattern = []
buttoncolors = ["red", "blue", "green", "yellow"];
level = 0

function nextSequence() {
  userclickedpattern = [];
  randomnumber = Math.floor(Math.random() * 4);
  randomchoosencolor = buttoncolors[randomnumber];

  gamepattern.push(randomchoosencolor);

  $("#" + randomchoosencolor).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomchoosencolor + ".mp3");
  audio.play()
  level = level + 1
  $("h1").html("Level " + level);
}

$(".btn").click(function() {
  userchoosencolor = this.id;
  userclickedpattern.push(userchoosencolor);

  playSound(userchoosencolor)
  animatePress(userchoosencolor)
  checkanswer(userclickedpattern.length - 1)
})

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play()
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

count = 0
$(document).keypress(function() {
  if (count == 0) {
    nextSequence();
    count = count + 1;
    $("h1").html("Level " + level);
  }
})

function checkanswer(currentlevel) {
  if (gamepattern[currentlevel] === userclickedpattern[currentlevel]) {
    if (userclickedpattern.length === gamepattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play()
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);

    $("h1").html("Game over,Press any key to continue");
    startover()
  }
}

function startover() {
  level = 0;
  gamepattern = []
  userclickedpattern = []
  count = 0
  $(document).keypress(function() {
    if (count == 0) {
      nextSequence();
      count = count + 1;
      $("h1").html("Level " + level);
    }
  })
}
