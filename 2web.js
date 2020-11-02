function recievedata()
{
    //to get the values from the server
    $.get('http://localhost:1234',function(data, status){
      data=JSON.parse(data);
      lat=data.initiallat;
      long=data.initiallng;
      finallat=data.destlat;
      finallong=data.destlng;
      longdiff= finallong-long;
      latdiff= finallat-lat;
      //to obtain the angle between them
      var angle=Math.atan2(longdiff,latdiff) * 180 / Math.PI;
      console.log("Going to rotate as the jpg  is at -45 deg. Hence rotate at an angle : " + angle);
      var finalangle=-45+angle; 
      $(".maparrow").css('transform', 'rotate('+finalangle+'deg)' ); 
    });
}