//function to print high scores and keep them loggedd
function printHighscores() {
  let highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

  //sort highest score
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  //for loop to run through scores to get the highest score
  for (let i = 0; i < highscores.length; i += 1) {
    let liTag = document.createElement('li');
    liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;

    let olEl = document.getElementById('highscores');
    olEl.appendChild(liTag);
  }
}

//funtion to clear high scores
function clearHighscores() {
  window.localStorage.removeItem('highscores');
  window.location.reload();
}

document.getElementById('clear').onclick = clearHighscores;

printHighscores();
