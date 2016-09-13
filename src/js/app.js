
// // TAKEN FROM MUNCH HUB EXAMPLE -------------------------------
// // const googleMap = googleMap || {};
// //
// // googleMap.api_url = "http://localhost:3000/api";
// //
// // googleMap.init = function() {
// //   this.mapSetup();
// //   this.eventListeners();
// // };
// //
// // googleMap.eventListeners = function() {
// //   $('.location').on('click', this.getCurrentLocation);
// //   $('.new').on('click', this.toggleForm);
// //   $('main').on('submit', 'form', this.addRestaurant);
// // };
// //
// // googleMap.toggleForm  = function() {
// //   $('form').slideToggle();
// // };
// //
// // googleMap.getCurrentLocation = function() {
// //   navigator.geolocation.getCurrentPosition(function(position) {
// //     let marker = new google.maps.Marker({
// //       position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
// //       map: googleMap.map,
// //       animation: google.maps.Animation.DROP,
// //       icon: {
// //         url: "http://furtaev.ru/preview/user_on_map_2_small.png",
// //         scaledSize: new google.maps.Size(56, 56)
// //       }
// //     });
// //
// //     googleMap.map.setCenter(marker.getPosition());
// //   });
// // };
// //
// // googleMap.addRestaurant = function() {
// //   event.preventDefault();
// //   $.ajax({
// //     method: "POST",
// //     url: "http://localhost:3000/api/restaurants",
// //     data: $(this).serialize()
// //   }).done(data => {
// //     console.log(data.restaurant);
// //     googleMap.createMarkerForRestaurant(null, data.restaurant);
// //     $('form').reset().hide();
// //   });
// // };
// //
// //
// // googleMap.mapSetup = function() {
// //   let canvas = document.getElementById('map-canvas');
// //
// //   let mapOptions = {
// //     zoom: 13,
// //     center: new google.maps.LatLng(51.506178,-0.088369),
// //     mapTypeId: google.maps.MapTypeId.ROADMAP,
// //     styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"simplified"},{"hue":"#0066ff"},{"saturation":74},{"lightness":100}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"off"},{"weight":0.6},{"saturation":-85},{"lightness":61}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#5f94ff"},{"lightness":26},{"gamma":5.86}]}]
// //   };
// //
// //   this.map = new google.maps.Map(canvas, mapOptions);
// //
// //   this.getRestaurants();
// // };
// //
// // googleMap.getRestaurants = function(){
// //   return $.get(`${this.api_url}/restaurants`).done(this.loopThroughRestaurants.bind(this));
// // };
// //
// // googleMap.loopThroughRestaurants = function(data) {
// //   return $.each(data.restaurants, this.createMarkerForRestaurant.bind(this));
// // };
// //
// // googleMap.createMarkerForRestaurant = function(index, restaurant) {
// //   let latlng = new google.maps.LatLng(restaurant.lat, restaurant.lng);
// //
// //   let marker = new google.maps.Marker({
// //     position: latlng,
// //     map: this.map,
// //     icon: {
// //       url: "http://furtaev.ru/preview/restaurant_map_pointer_small.png",
// //       scaledSize: new google.maps.Size(56, 56)
// //     }
// //   });
// //
// //   this.addInfoWindowForRestaurant(restaurant, marker);
// // };
// //
// // googleMap.addInfoWindowForRestaurant = function(restaurant, marker) {
// //   google.maps.event.addListener(marker, 'click', () => {
// //     if (typeof this.infowindow != "undefined") this.infowindow.close();
// //
// //     this.infowindow = new google.maps.InfoWindow({
// //       content: `
// //                 <div class="info">
// //                   <img src="${ restaurant.image}">
// //                   <h3>${ restaurant.name }</h3>
// //                   <p>${ restaurant.description}</p>
// //                 </div>
// //                `
// //     });
// //
// //     this.infowindow.open(this.map, marker);
// //     this.map.setCenter(marker.getPosition());
// //   });
// // };
// //
// // $(googleMap.init.bind(googleMap));


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
        center: new google.maps.LatLng(50.824063, -0.147348),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(canvas, mapOptions);
    };

    $(App.init.bind(App));
