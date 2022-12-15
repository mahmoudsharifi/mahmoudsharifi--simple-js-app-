

/* defined pokemonList as variable and added 3 key-values to differentiate each object in the array */
let pokemonList = [
    { name: 'charmeleon', height: 1.1, type: 'fire' },
    { name: 'pikachu', height: 0.4, type: 'electric' },
    { name: 'diglett', height: 0.2, type: 'ground' },
  ]

/* tell 'for-loop' code to look to length of variable array above first */
for (let i=0; i < pokemonList.length; i++){
  /* set condition for specific key-value of objects in array */
    if (pokemonList[i].height >= 1){
      console.log(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, that's big!");
  /* inserted html break line tag to display each object on a new line  */
      document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, that's big!" + "<br>");
  /* only need to use 'else' rather than 'else-if' as we want the output to be on just one object  */
  } else {
      console.log(pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
  /* inserted html break line tag to display each object on a new line  */
      document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + "<br>")
  }
  }
  