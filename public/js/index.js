// Pokémon verilerini gösterme fonksiyonu
function displayPokemons(pokemons) {
  // pokemonData, 6 Pokémon nesnesinden oluşan bir dizi olmalı
  pokemons.forEach((pokemon, index) => {
      if (index < 6) { //  6 Pokémon'u güncelle
          // Pokémon'un resim URL'sini güncelle
          const imgSrc = pokemon.sprite;
          const imgElement = document.getElementById(`pokemon${index + 1}`);
          if (imgElement) {
              imgElement.src = imgSrc;
          }

          // Pokémon'un ismini güncelle
          const nameElement = document.getElementById(`isim${index + 1}`);
          if (nameElement) {
              nameElement.textContent = pokemon.name || 'pokemon';
          }

          const powerElement = document.getElementById(`power${index + 1}`);
          if (powerElement) {
              powerElement.textContent = pokemon.attack || 'attack';
          }

          const abilityElement = document.getElementById(`ability${index + 1}`);
          if (abilityElement) {
            abilityElement.textContent = pokemon.special_attack || 'special-attack';
          }
      }
  });
}

     



















/* var http = require ('http');
const axios = require('axios');


http.createServer (function (req,res) {
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

    axios.get("https://pokeapi.co/api/v2/pokemon/400")


        //if successful, returns data as response
        .then(response => {
          console.log(response.data);
         res.end(JSON.stringify(response.data));
        })

        //if has an error in the code, it will print on the terminal screen 
        .catch(error => {
          console.log(error);
        });
     
}).listen(3000); */