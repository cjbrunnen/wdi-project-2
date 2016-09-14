const App = App || {};

App.init = function() {
  this.apiUrl = "http://localhost:3000/api";
  this.$main  = $("main");

  $(".register").on("click", this.register.bind(this));
  $(".login").on("click", this.login.bind(this));
  $(".logout").on("click", this.logout.bind(this));
  this.$main.on("submit", "form", this.handleForm);

  if (this.getToken()) {
    this.loggedInState();
  } else {
    this.loggedOutState();
  }
};

App.register = function(){
  if(event) event.preventDefault();
  this.$main.html(`
    <h2>Register</h2>
    <form method="post" action="/register">
    <div class="form-group">
    <input class="form-control" type="text" name="user[username]" placeholder="Username">
    </div>
    <div class="form-group">
    <input class="form-control" type="email" name="user[email]" placeholder="Email">
    </div>
    <div class="form-group">
    <input class="form-control" type="password" name="user[password]" placeholder="Password">
    </div>
    <div class="form-group">
    <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">
    </div>
    <input class="btn btn-primary" type="submit" value="Register">
    </form>
    `);
  };


  App.login = function(){
    if(event) event.preventDefault();
    this.$main.html(`
      <h2>Login</h2>
      <form method="post" action="/login">
      <div class="form-group">
      <input class="form-control" type="email" name="email" placeholder="Email">
      </div>
      <div class="form-group">
      <input class="form-control" type="password" name="password" placeholder="Password">
      </div>
      <input class="btn btn-primary" type="submit" value="login">
      </form>
      `);
    };

    App.logout = function() {
      event.preventDefault();
      this.removeToken();
      this.loggedOutState();
    };

    App.handleForm = function(){
      event.preventDefault();
      let url    = `${App.apiUrl}${$(this).attr("action")}`;
      let method = $(this).attr("method");
      let data   = $(this).serialize();

      $(this).trigger("reset");

      return App.ajaxRequest(url, method, data, (data) => {
        if (data.token) App.setToken(data.token);
        App.loggedInState();
      });
    };

    App.ajaxRequest = function(url, method, data, callback){
      return $.ajax({
        url,
        method,
        data,
        beforeSend: this.setRequestHeader.bind(this)
      })
      .done(callback)
      .fail(data => {
        console.log(data);
      });
    };

    App.loggedInState = function(){
      $(".loggedOut").hide();
      $(".loggedIn").show();

      this.mapSetup();
    };

    App.loggedOutState = function(){
      $(".loggedOut").show();
      $(".loggedIn").hide();

      this.login();
    };


    App.setRequestHeader = function(xhr, settings) {
      return xhr.setRequestHeader("Authorization", `Bearer ${this.getToken()}`);
    };

    App.setToken = function(token){
      return window.localStorage.setItem("token", token);
    };

    App.getToken = function(){
      return window.localStorage.getItem("token");
    };

    App.removeToken = function(){
      return window.localStorage.clear();
    };

    App.mapSetup = function() {

      this.$main.html(`<div id="map-canvas"></div>`);

      let canvas = document.getElementById('map-canvas');

      let mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(50.820914, -0.139804),
        styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":"88"},{"hue":"#0021ff"},{"visibility":"on"},{"gamma":"2.59"},{"lightness":"0"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"saturation":"-27"},{"gamma":"1.74"},{"weight":"8.55"},{"lightness":"41"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"saturation":"-60"}]},{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"100"},{"gamma":"0.11"},{"lightness":"-6"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.country","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"saturation":"13"},{"weight":"1.00"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"hue":"#ff0000"}]},{"featureType":"administrative.country","elementType":"labels.text.stroke","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2dfdf"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":"33"},{"gamma":"0.89"},{"weight":"0.97"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-55"},{"lightness":"3"},{"gamma":"2.55"}]},{"featureType":"road","elementType":"geometry","stylers":[{"saturation":"-100"},{"lightness":"-99"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"saturation":"-100"},{"lightness":"100"},{"gamma":"8.65"},{"weight":"0.01"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"saturation":"-65"},{"lightness":"-61"},{"weight":"7.28"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#e03030"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"saturation":"100"}]},{"featureType":"road.highway.controlled_access","elementType":"all","stylers":[{"saturation":"-8"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"all","stylers":[{"saturation":"7"}]},{"featureType":"transit.station.rail","elementType":"geometry","stylers":[{"saturation":"-72"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#ff9800"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"saturation":"-10"},{"lightness":"21"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"saturation":"37"}]}]

      };
      this.map = new google.maps.Map(canvas, mapOptions);
      this.getRestaurants();
    };

    App.getRestaurants = function(){
      return App.ajaxRequest(`${this.apiUrl}/restaurants`, "GET", null, this.loopThroughRestaurants.bind(this));
    };

    App.loopThroughRestaurants = function(data) {
      return $.each(data.restaurants, (index, restaurant) => App.createMarkerForRestaurant(restaurant));
    };

    App.createMarkerForRestaurant = function(restaurant) {
      console.log(restaurant);

      let latlng = new google.maps.LatLng(restaurant.lat, restaurant.lng);

      let marker = new google.maps.Marker({
        position: latlng,
        icon: {
          url: "http://www.clker.com/cliparts/i/4/E/R/2/N/google-maps-icon-blank-4-md.png",
          scaledSize: new google.maps.Size(20, 30)
        },
        map: this.map
      });
      App.addInfoWindowForRestaurant(restaurant, marker);
    };

    App.addInfoWindowForRestaurant = function(restaurant, marker) {
      google.maps.event.addListener(marker, 'click', () => {
        if (typeof this.infowindow != "undefined") this.infowindow.close();

        this.infowindow = new google.maps.InfoWindow({
          content: `
          <div class="info">
          <img src="${ restaurant.image }">
          <h3>${ restaurant.name }</h3>
          </div>
          `
        });
        this.infowindow.open(this.map, marker);
        this.map.setCenter(marker.getPosition());
        App.bindInfoWindow(marker, this.map, this.infoWindow, this.html);
      });
    };

    App.bindInfoWindow = function(marker, map, infoWindow, html) {
      google.maps.event.addListener(marker, 'click', function() {
       document.getElementById('.sidebar').innerHTML = html;
      });
    };



    $(App.init.bind(App));
