
async function sendData() {

    var sampleData = JSON.parse(data);
    document.getElementById("child").contentWindow.postMessage(sampleData, '*');

}

function receiveMessage(event){


  console.log('received response: ${event.data} \n sending data back to child' );

  sendData();
}


window.addEventListener("message", receiveMessage, false);