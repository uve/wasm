const init = () => {

    window.parent.postMessage({message: 'child is ready'}, '*');
}

document.addEventListener('DOMContentLoaded', init, false);


function receiveData(event){


    console.log('received data:  ',event.data);

    document.getElementById("results").innerHTML = event.data
        .map(item => `<p>${item["Make"]} - ${item["Model"]} - ${item["Model Year"]} - ${item["Fuel Consumption (City (L/100 km)"]} </p>`)
        .join('');

  }
  
  
  window.addEventListener("message", receiveData, false);


