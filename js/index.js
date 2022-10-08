document.addEventListener("DOMContentLoaded", (e) => {

e.preventDefault();
fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s`)
  .then(resp => resp.json())
  .then(cocktail => {
    //console.log(cocktail.drinks); 
    cocktail.drinks.forEach(element => renderCocktails(element));
         
  });
   
document.querySelector(".search-form").addEventListener('change', function(){
  if(nameFilter.checked){
    document.getElementById("input-text").placeholder="Enter a Cocktail Name...";
}else if(liquorFilter.checked){
    document.getElementById("input-text").placeholder="Enter a Liquor...";
}else if(firstLetterFilter.checked){
    document.getElementById("input-text").placeholder="Enter Letter...";
}

})

document.querySelector(".search-form").addEventListener('submit', function(e){

  e.preventDefault();

  let nameFilter = document.getElementById("nameFilter");
  let liquorFilter = document.getElementById("liquorFilter");
  let firstLetterFilter = document.getElementById("firstLetterFilter");
  let inputText = document.getElementById("input-text").value;
  
  document.getElementById("cocktail-container").innerHTML="";

  if(nameFilter.checked){

    let cocktailTitle = document.createElement('h3');
    document.getElementById("cocktail-container").appendChild(cocktailTitle);

    fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${inputText}`)
    .then(resp => resp.json())
    .then(cocktail => {
    
      cocktailTitle.innerHTML= "Cocktail List";
      cocktail.drinks.forEach(element => renderCocktails(element));
    })
    .catch(errorMessage => cocktailTitle.innerHTML = "Sorry, There is NOT matching results for that name!");
      
    
  }else if(liquorFilter.checked){

    let cocktailTitle = document.createElement('h3');
    document.getElementById("cocktail-container").appendChild(cocktailTitle);

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputText}`)
    .then(resp => resp.json())
    .then(cocktail => {

      let cocktailIds = cocktail.drinks.map(element => element.idDrink);
      // Create and set Cocktail Title
      
      cocktailTitle.innerHTML= "Cocktail List"
      
        for(const drinkId in cocktailIds){
          //console.log(cocktailIds[drinkId]);
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailIds[drinkId]}`)
          .then(resp => resp.json())
          .then(drink=> {
           
  
              drink.drinks.forEach(element => renderCocktails(element));
          })
        }
    })
    .catch(errorMessage => cocktailTitle.innerHTML = "Sorry, There is NOT matching results for that Liquor type!");
  }else if(firstLetterFilter.checked){
    
    let cocktailTitle = document.createElement('h3');
    document.getElementById("cocktail-container").appendChild(cocktailTitle);

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputText}`)
    .then(resp => resp.json())
    .then(cocktail => {
      cocktailTitle.innerHTML= "Cocktail List"
      cocktail.drinks.forEach(element => renderCocktails(element));
    })
    .catch(errorMessage => cocktailTitle.innerHTML = "Sorry, There is NOT matching results for that letter!");
  }
  document.getElementById("input-text").value = "";

})



});
  


  function renderCocktails(cocktail){

    // Create cocktail container
    let cocktailContainer = document.getElementById("cocktail-container");

    // Create cocktail card element
    let cocktailCard = document.createElement('div');
    // Create child elements to hold cocktail information
    let cocktailName = document.createElement('h4');
    let cocktailImage = document.createElement('img');
    let ingredientsTitle = document.createElement('h5');
    let cocktailIngredients= document.createElement('p');
    let cocktailInstructions = document.createElement('p');
    
    //Add cards to cocktail container
    cocktailContainer.appendChild(cocktailCard);
    cocktailCard.setAttribute("class", "cocktail-card")
    //Add childs to cocktail card
    cocktailCard.appendChild(cocktailName);
    cocktailCard.appendChild(cocktailImage);
    cocktailCard.appendChild(ingredientsTitle);
    cocktailCard.appendChild(cocktailIngredients);
    cocktailCard.appendChild(cocktailInstructions);

    let cocktailKeys = Object.keys(cocktail);
    console.log(cocktailKeys);
    cocktailKeys.forEach(key =>{
      if(cocktail[key] === null){
        cocktail[key] = "";
        
      }
    })

    
    console.log(cocktail);

    cocktailName.innerHTML = `${cocktail.strDrink}`; 
    cocktailImage.setAttribute("src",`${cocktail.strDrinkThumb}`);
    cocktailImage.setAttribute("class", "cocktail-img");
    ingredientsTitle.innerHTML= "Ingredients: ";
    cocktailIngredients.innerHTML= `${cocktail.strMeasure1} \u00A0 ${cocktail.strIngredient1}<br>
                                    ${cocktail.strMeasure2} \u00A0 ${cocktail.strIngredient2}<br>
                                    ${cocktail.strMeasure3} \u00A0 ${cocktail.strIngredient3}<br>
                                    ${cocktail.strMeasure4} \u00A0 ${cocktail.strIngredient4}`;
    cocktailInstructions.innerHTML =`${cocktail.strInstructions}`;
   
    
}
  
