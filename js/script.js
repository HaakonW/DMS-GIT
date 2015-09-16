$(document).ready(function(){

    getFlicker();
  $("#content").hide();
  $("#menuBar").hide();
  $("#login").click(function(){alert("This function is not ready!"); });

  $("#btnProceed").click(function(){
    $("#splashContent").slideUp(1000);
    $("#spinner").hide();
    $("#content").slideDown(1500);
    $("#menuBar").slideDown(2000);
  });

  $("#backSplashBtn").click(function(){
    $("#content").slideUp(1000);
    $("#spinner").show();
    $("#menuBar").hide();
    $("#splashContent").slideDown(1000);
  });

  function searchData(){
    $.get("data/photoData.json", function (data){
      search(data.pictures);
  }, "json" );
}
  $("#searchField").keydown(function(){if (event.keyCode == 13) searchData();});
  $("#searchButton").click(function(){ searchData();});

}); //End document.ready

///////// BIG FUNCTIONS///////////
function search(pictures){
  var inData=$("#searchField").val();
  var orgSearch = inData;

  inData = inData.trim();
  inData = inData.toLowerCase();
  if(inData === "") // First check for empty String
  {
    responseContainer.innerHTML ="Please search something";
    picArea.innerHTML = "";
    fillAlbum(pictures);
  }
  else // User search for something
  {
    picArea.innerHTML = "";
    var hit = false; //Boolean to check for a hit in the array
    for (var i = 0; i < pictures.length; i++){
      var str = pictures[i].desc;
        str = str.toLowerCase();
        var n = str.indexOf(inData); //Check if the search word is in the array
        if(n != -1 ) {
          var pic =
          "<a href='" + pictures[i].url + "'data-lightbox='myPhoto' data-title='" + pictures[i].desc +"' ><img class='photoAlbum' src='" + pictures[i].url + "'></a>";
          picArea.innerHTML += "<figure>" + pic + "<figcaption>" +
          pictures[i].desc + "</figcaption></figure>";
          responseContainer.innerHTML = "Your search for " + orgSearch;
          hit = true; //Set true so next if test is not printing
      } // end if
    }//end for
     if (!hit) picArea.innerHTML += "No matching photo for ''" + orgSearch +"''"; //Last alternative, no hits from the searchField
   }// end else
}//end search

function fillAlbum(pictures){
  for (var i = 0; i < pictures.length; i++)  {
      var pic = "<a href='" + pictures[i].url + "'data-lightbox='" + "myPhoto" + "'data-title='" + pictures[i].desc +"' ><img class='photoAlbum' src='" + pictures[i].url + "'></a>";
      picArea.innerHTML += "<figure>" + pic + "<figcaption>" +
      pictures[i].desc + "</figcaption></figure>";
  }
}

////////////////////////////// 2.0 /////////////////////////
function getFlicker(){
  apiKey = 'dc140afe3fd3a251c2fdf9dcd835be5c';

  var url = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=";
  url+= apiKey + "&per_page=20&format=json&nojsoncallback=1";

  $.get(url, function(data){
    getUrl(data);
  });
}

function getUrl(data){
  for (var i = 0; i < data.photos.photo.length; i++) {
    console.log(data.photos.photo[i].id);
    temp = data.photos.photo[i];
    getSize = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key="+apiKey+"&photo_id="+temp.id+"&format=rest";
    console.log(getSize);
    $.get(getSize, function(data) {
    console.log(data);
  })
  }
}
