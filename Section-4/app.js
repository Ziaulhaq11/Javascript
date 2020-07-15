var scores,roundScore,activePlayer,isPlaying;

init();

function nextPlayer() {
  //Next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer =0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';

  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');
}

//Event handler

/*function btn() {
  //Do something here.
}*/
/*Usually when we call function we call btn() like this with paranthesis but below we are not bc we are not calling the event function calling
so its a CALLBACK function. And another thing is we can write function here itself but it  will be anonymous function. Since we are not giving
any name and we cant use that function anymore.*/
document.querySelector('.btn-roll').addEventListener('click', function() {   //1.event type 2.event
  if (isPlaying) {
    //1.Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2.Display the result
    var diceDom = document.querySelector('.dice')
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png'

    //3.Update the round score if the rolled number was not 1
    if (dice !== 1) {
      //Add score
      roundScore += dice;
      //Displaying score
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
    
})


document.querySelector('.btn-hold').addEventListener('click', function() {
  if (isPlaying) {
    //Add current score to global score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //Check if player won the game
    /*  if (scores[activePlayer] >= 20) {
        document.querySelector('#name-' + activePlayer).textContent = 'Player' + activePlayer + 'wins the game.'
      }*/

    if (scores[activePlayer] >= 20) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner';
      var diceDom = document.querySelector('.dice')
      diceDom.style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      isPlaying = false;
    } else {
      //Next Player
      nextPlayer();
    }
  }
  
})


document.querySelector('.btn-new').addEventListener('click', init);//we are not calling function otherwise it will call itself but we dont we want to
  //happen when we click;


function init() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  isPlaying = true;
  /*for random generator we are using Math.random() function but it will return value b/w 0 & 1 . so to fix this we are multiplying the value with
  6 then we get 4.62654 like value . so we want integer not float. So we use Math.floor to convert float to int. But still it is giving the value
  from 0 to 6 to solve this we are adding +1 to the function so it will not be 0*/

  //document.querySelector('#current-' + activePlayer).textContent = dice; This is a setter since we are setting value
  //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'
  //var x = document.querySelector('#score-0').textContent; /*here its a getter we are getting the value.*/
  //console.log(x);

  //Setting display none to the dice image when its open
  document.querySelector('.dice').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');  //i am adding here since it is calling in the first. so we need to put active for the first player otherwise both will be the active player since we use toggle method
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
}

