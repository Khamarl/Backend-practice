console.log("Hello, world");

async function getBeastData() {

    //Reach out to API,
    const response = await fetch("http://localhost:3000/beasts")

    

    //Extract beast data from response 
    const beasts = await response.json();


    //Return the data}
    return beasts;
}

async function displayBeastData() {
   //Get the beast data
    const beasts = await getBeastData();

    //get a reference to the cage 

    const cage = document.querySelector("#cage")

    //loop through beast data
    beasts.forEach(beast => {
        console.log(beast);
        //create a inner html element 
        const element = document.createElement("li");
        //set elements content 
        element.textContent = beast["name"];
        // add element to the cage
        cage.appendChild(element);
        
    }); 

 
}

displayBeastData();

async function createNewBeast (e)  {
    
    e.preventDefault();

    //Extract data into object
    const data = {
        name: e.target.name.value,
        encounterRate: e.target.encounterRate.value
    }
    console.log(data)
    //set the options for the fetch request
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    //make a fetch request sending the data
     const response = await fetch("http://localhost:3000/beasts", options);

     if(response.status == 201) {
        alert("current creature created");
        window.location.reload();
     }
}

const form =  document.querySelector("#create-form");
form.addEventListener("submit", createNewBeast);
