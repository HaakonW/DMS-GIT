// var pictures = [
//   { url: "photos/DSC01049.JPG", desciption: "City View" },
//   { url:"photos/DSC01066.JPG",  desciption:"Ferris Wheel" },
//   { url:"photos/DSC02511.jpg",  desciption: "A building in the forbidden city with extra long text"},
//   { url:"photos/DSC03810.jpg",  desciption:"City from Mt Gravatt lockout" },
//   { url:"photos/DSC05750.jpg",  desciption: "Sun rise" }];

 // function login(){ alert("This function is not ready yet ");}
 // function keyPress(event){ if (event.keyCode == 13) search();}

function search(pictures){
  var inData=$("#searchField").val();
  var orgSearch = inData;

  inData =inData.trim();
  inData = inData.toLowerCase();
  if(inData === "") // First check for empty String
  {
    responseContainer.innerHTML ="Please search something";
    picArea.innerHTML = "";
    fillAlbum();
  }
  else // User search for something
  {
    picArea.innerHTML = "";
    var hit = false; //Boolean to check for a hit in the array
    for (var i = 0; i < pictures; i++)    {
      var str = pictures[i].desciption;
      str = str.toLowerCase();
      var n = str.indexOf(inData); //Check if the search word is in the array
      if(n != -1 ) {
        var pic = "<a href='" + pictures[i].url + "'><img class='photoAlbum' src='" + pictures[i].url + "'></a>";
        picArea.innerHTML += "<figure>" + pic + "<figcaption>" +
        pictures[i].desciption + "</figcaption></figure>";
        responseContainer.innerHTML = "Your search for " + orgSearch;
        hit = true; //Set true so next if test is not printing
      } // end if
    }//end for
    if (!hit) picArea.innerHTML += "No matching photo for '' " + orgSearch +" ''"; //Last alternative, no hits from the searchField
  }// end else
}//end search

function fillAlbum(){
  for (var i = 0; i < pictures; i++)  {
      var pic = "<img class='photoAlbum' src='" + pictures[i].url + "'>";
      picArea.innerHTML += "<figure>" + pic +
      "<figcaption>" + pictures[i].desciption + "</figcaption></figure>";
  }
}

////////////////////////////// 2.0 /////////////////////////

$(document).ready(function(){ $("#content").hide();});

function removeSplash(){
  $("#splashScreen").slideUp(1000);
  $("#content").slideDown(1500);
}
$("#btnProceed").click(removeSplash);

function removeContent(){
  $("#content").slideUp(1000);
  $("#splashScreen").slideDown(1000);
}
$("#backSplashBtn").click(removeContent);

function keyPress(){ if (event.keyCode == 13) search();}
$("#searchField").keydown(keyPress);

// function searchButton(){search();}

$("#searchButton").click(function(){
  $.get("data/photoData.json", function(data){
    console.log(data);
    search(data.pictures);
  });
});
// $("#searchButton").click(function(){
//   $.get("data/photoData.json", function(data){
//     console.log(data);
//   }, "json");
// });


function clickLogin(){ alert("This function is not ready!");}
$("#login").click(clickLogin);
