
 async function sendBinary() {

    const files = ['10kb', '100kb', '1mb', '10mb', '100mb'];

    results = [];
    
    for (file in files) {

      t1 = Date.now();
      var binaryData = await fetch("https://localhost/data" + file + ".bin");

      t2 = Date.now();

      var buffer = Uint16Array(binaryData);

      t3 = Date.now();

      document.getElementById("child").contentWindow.postMessage(buffer, '*', [buffer]);

      console.log(buffer); //to check

      t4 = Data.now();


      results.push({
          "name": "Vanilla js + json",
          "filesize": file,
          "lib size": 0,// 0 - for vanilla js, ±50kb for messagepack, ±500kb for blazor
          "fetch time": t2-t1,
          "parse time": t3-t2, //to create Uint16Array view
          "postMessage execution time": t4-t3,
          "postMessage decode time": t6-t5,  // 0 for JS, ±200ms for Binary,
          "content render time": t7-t6,
      });
    }
 

}



async function sendJSON() {

  const files = ['10kb', '100kb', '1mb', '10mb', '100mb'];

  results = [];
  
  for (file in files) {

    t1 = Date.now();
    var str = await fetch("https://localhost/data" + file + ".json");

    t2 = Date.now();

    var dataJS = await str.json();

    t3 = Date.now();

    document.getElementById("child").contentWindow.postMessage(sampleData, '*');

    t4 = Data.now();


    results.push({
        "name": "Vanilla js + MessagePack lib + binary",
        "filesize": file,
        "lib size": 0,// 0 - for vanilla js, ±50kb for messagepack, ±500kb for blazor
        "fetch time": t2-t1,
        "parse time": t3-t2, //to create Uint16Array view
        "postMessage execution time": t4-t3,
        "postMessage decode time": t6-t5,  // 0 for JS, ±200ms for Binary,
        "content render time": t7-t6,
    });
  }


}







 async function startBenchmarkCompression() {

   let t1 = await sendJSON();
   console.log('Vanilla js took: ', t1, "ms to render")


   let t2 = await sendBinary();    
   console.log('Binary transmission took: ', t2, "ms to render")


   let t3 = await sendSharedArrayBuffer();
   console.log('SharedArrayBuffer transmission took: ', t1, "ms to render")


}







function receiveMessage(event){


  console.log('received response: ${event.data} \n sending data back to child' );

  startBenchmarkCompression();
}


window.addEventListener("message", receiveMessage, false);


