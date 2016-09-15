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
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <form method="post" action="/register">
            <h2>Signup</h2>
            <div class="form-group">
              <label for="registerForm">Username</label><br>
              <input class="form-control" type="text" name="user[username]" placeholder="Username">
            </div>
            <div class="form-group">
              <label for="registerForm2">Email</label><br>
              <input class="form-control" type="email" name="user[email]" placeholder="Email">
            </div>
            <div class="form-group">
              <label for="registerForm3">Password</label><br>
              <input class="form-control" type="password" name="user[password]" placeholder="Password">
            </div>
            <div class="form-group">
              <label for="registerForm4">Confirm password</label><br>
              <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">
            </div><br>
            <input class="btn btn-secondary" type="submit" value="Register">
          </form>
        </div>
        <div class="col-lg-6">
        <img src="http://www.clker.com/cliparts/1/1/9/2/1206562345733194326nicubunu_Seagull_1.svg.hi.png" alt="seagul" id="seagull">
        </div>
      </div>
    </div>
    `);
  };


  App.login = function(){
    if(event) event.preventDefault();
    this.$main.html(`
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <form method="post" action="/login">
              <h2>Login</h2>
              <div class="form-group">
                <label for="loginFormForm">Email</label><br>
                <input class="form-control" type="email" name="email" placeholder="Email">
              </div>
              <div class="form-group">
                <label for="loginFormForm">Password</label><br>
                <input class="form-control" type="password" name="password" placeholder="Password">
              </div><br>
              <input class="btn btn-secondary" type="submit" value="login">
            </form>
          </div>
          <div class="col-lg-6">
            <img src="http://www.clker.com/cliparts/1/1/9/2/1206562345733194326nicubunu_Seagull_1.svg.hi.png" alt="seagull" id="seagull">
          </div>
        </div>
      </div>
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

      $("header").addClass('login-header');
      $("header h1").addClass('login-h1');

      this.mapSetup();
    };

    App.loggedOutState = function(){
      $(".loggedOut").show();
      $(".loggedIn").hide();

      $("header").removeClass('login-header');
      $("header h1").removeClass('login-h1');

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
        styles:[{"elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#f5f5f2"},{"visibility":"on"}]},{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi.attraction","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","stylers":[{"visibility":"off"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#ffffff"},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"visibility":"simplified"},{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"color":"#ffffff"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","stylers":[{"color":"#ffffff"}]},{"featureType":"poi.park","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#71c8d4"}]},{"featureType":"landscape","stylers":[{"color":"#e5e8e7"}]},{"featureType":"poi.park","stylers":[{"color":"#8ba129"}]},{"featureType":"road","stylers":[{"color":"#ffffff"}]},{"featureType":"poi.sports_complex","elementType":"geometry","stylers":[{"color":"#c7c7c7"},{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#a0d3d3"}]},{"featureType":"poi.park","stylers":[{"color":"#91b65d"}]},{"featureType":"poi.park","stylers":[{"gamma":1.51}]},{"featureType":"road.local","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"poi.government","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"landscape","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","stylers":[{"visibility":"simplified"}]},{"featureType":"road"},{"featureType":"road"},{},{"featureType":"road.highway"}]
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
          <h3>${ restaurant.name }</h3>
          <p>${ restaurant.address }</p>
          <a href="${ restaurant.url }" target="_blank">website</a>
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
