document.getElementById('dice').addEventListener('click', function() {
    var randomNumber = Math.floor(Math.random() * 6) + 1;
    this.textContent = randomNumber;
});

document.getElementById('dice2').addEventListener('click', function() {
    var randomNumber = Math.floor(Math.random() * 6) + 1;
    this.textContent = randomNumber;
});