// Add event listner to document, run content after the page is fully loaded
document.addEventListener("DOMContentLoaded", (e) => {
// Prevent default behavior of the page
e.preventDefault();

// Send a fetch request to access cocktail data from Cocktial DataBase API
fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s`)
  .then(resp => resp.json())
  .then(cocktail => {
    //Access cocktail data retrieved by using an iterator (forEach)
    //Invoke function to render each cocktail card in the page
    cocktail.drinks.forEach(element => renderCocktails(element));     
  });
 
//Add even listener to Search Form (change)
//When a filter is selected, change a its placeholder value 
document.querySelector(".search-form").addEventListener('change', function(){
  if(nameFilter.checked){
    document.getElementById("input-text").placeholder="Enter a Cocktail Name...";
  }else if(liquorFilter.checked){
    document.getElementById("input-text").placeholder="Enter a Liquor...";
  }else if(firstLetterFilter.checked){
    document.getElementById("input-text").placeholder="Enter Letter...";
  }
})

//Add event listener to Search form (submit)
//When a filter is selected, send a fetch request to retrieve specific data form Cocktail DataBase.
document.querySelector(".search-form").addEventListener('submit', function(e){
  //Prevent default behavior of the page
  e.preventDefault();
  //Create variables for each filter, set each one equal to their HTML Element
  let nameFilter = document.getElementById("nameFilter");
  let liquorFilter = document.getElementById("liquorFilter");
  let firstLetterFilter = document.getElementById("firstLetterFilter");
  //Create variable to store input text field value
  let inputText = document.getElementById("input-text").value;
  
  //Clear cocktail container when a submit button is clicked!
  document.getElementById("cocktail-container").innerHTML="";

  //When name filter is selected, Send a fetch request to (GET) cocktail Data filterd by name
  if(nameFilter.checked){

    //Create header Element(cocktail title) and append it to cocktail container
    let cocktailTitle = document.createElement('h3');
    document.getElementById("cocktail-container").appendChild(cocktailTitle);
    //Send a fetch request to access cocktail DataBase by name 
    //Utilize inputText variable to filter the search
    fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${inputText}`)
    .then(resp => resp.json())
    .then(cocktail => {
      //Set the title for the page
      cocktailTitle.innerHTML= "Cocktail List";
      //Use iterator (forEach) to access each item and render it using a function.
      cocktail.drinks.forEach(element => renderCocktails(element));
    })
    //Catch seach error and display message to the user in the page!
    .catch(errorMessage => cocktailTitle.innerHTML = "Sorry, There is NOT matching results for that name!");
      
  //When liquor filter is selected, Send a fetch request to (GET) cocktail Data filterd by liquor  
  }else if(liquorFilter.checked){

    //Create header Element(cocktail title) and append it to cocktail container
    let cocktailTitle = document.createElement('h3');
    document.getElementById("cocktail-container").appendChild(cocktailTitle);
    //Send a fetch request to access cocktail DataBase by Liquor 
    //Utilize inputText variable to filter the search
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputText}`)
    .then(resp => resp.json())
    .then(cocktail => {
      //Set the title for the page
      cocktailTitle.innerHTML= "Cocktail List"
      //Create a variable to store an Array of drink's ids
      //Use iterator(map) to get a new arrray of drink's ids
      let cocktailIds = cocktail.drinks.map(element => element.idDrink);
      
        //Use a for in loop to access each index in cocktailIds' Array
        for(const drinkId in cocktailIds){
            
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
    cocktailCard.setAttribute("class", "cocktail-card");
    ingredientsTitle.setAttribute("class", "ingredients-title");
    cocktailIngredients.setAttribute("class","cocktail-ingredients");
    cocktailInstructions.setAttribute("class", "cocktail-instructions");
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
        cocktail[key] ='';
        
      }
    })

    
    console.log(cocktail);

    cocktailName.innerHTML = `${cocktail.strDrink}`; 
    cocktailImage.setAttribute("src",`${cocktail.strDrinkThumb}`);
    cocktailImage.setAttribute("class", "cocktail-img");
    ingredientsTitle.innerHTML= "Ingredients: ";
    cocktailIngredients.innerHTML= `${cocktail.strMeasure1}&ensp; ${cocktail.strIngredient1}<br>
                                    ${cocktail.strMeasure2}&ensp; ${cocktail.strIngredient2}<br>
                                    ${cocktail.strMeasure3}&ensp; ${cocktail.strIngredient3}<br>
                                    ${cocktail.strMeasure4}&ensp; ${cocktail.strIngredient4}<br>
                                    ${cocktail.strMeasure5}&ensp; ${cocktail.strIngredient5}`;
    cocktailInstructions.innerHTML =`${cocktail.strInstructions}`;
   
    
}
  
