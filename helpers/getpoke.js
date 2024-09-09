const axios = require('axios');


async function get_poke(){
  
    try{
        var i = 0; //dışarı da tanımlayabilirdik ama global olurdu (fonksiyonun dısı) ve sorun cıkabilirdi
        const result = [];

        for (i;i<6;i++) {

            var rand = Math.floor(Math.random()*1024 + 1); //rastgele poke cekmek için sayı üretiyor
            var pr = await axios.get('https://pokeapi.co/api/v2/pokemon/'+ rand) //returns promise;  
            //console.log(pr.data);
            //array.forEach(function(currentValue, index, arr), thisValue)
            var obj ={
                sprite: pr.data.sprites.other.home.front_default,
                name: pr.data.name,

            };
            pr.data.stats.forEach((arr) => {
                console.log('stat basıldı', arr);
                if(arr.stat.name == 'attack' ) {
                    obj['attack'] = arr.base_stat;
                }
                if(arr.stat.name == 'special-attack' ) {
                    obj['special_attack'] = arr.base_stat;
                }
            });
           
            result[i]= obj;
        }
        return result;
    }
    catch(err) {
       console.log(err);
    } 
}



module.exports = get_poke;