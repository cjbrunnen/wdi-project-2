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
        map: this.map
      });
      
      // let latlng = new google.maps.LatLng(restaurant.lat, restaurant.lng);
      // let marker = new google.maps.Marker({
      //   position: latlng,
      //   map: this.map,
      //   icon: {
      //     url: "map-pin-icon.png",
      //     scaledSize: new google.maps.Size(56, 56)
      //   }
      // });
      // this.addInfoWindowForRestaurant(restaurant, marker);
    };


    // App.addInfoWindowForRestaurant = function(restaurant, marker) {
    //   google.maps.event.addListener(marker, 'click', () => {
    //     if (typeof this.infowindow != "undefined") this.infowindow.close();
    //
    //     this.infowindow = new google.maps.InfoWindow({
    //       content: `
    //       <div class="info">
    //       <img src="${ restaurant.image }">
    //       <h3>${ restaurant.name }</h3>
    //       </div>
    //       `
    //     });
    //     this.infowindow.open(this.map, marker);
    //     this.map.setCenter(marker.getPosition());
    //   });
    // };





    //
    // App.addRestaurant = function() {
    //   event.preventDefault();
    //   $.ajax({
    //     method: "POST",
    //     url: "http://localhost:3000/api/restaurants",
    //     data: $(this).serialize()
    //   }).done(data => {
    //     console.log(data.restaurant);
    //     App.createMarkerForRestaurant(null, data.restaurant);
    //     $('form').reset().hide();
    //   });
    // };
    //
    // App.getCurrentLocation = function() {
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     let marker = new google.maps.Marker({
    //       position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
    //       map: googleMap.map,
    //       animation: google.maps.Animation.DROP,
    //       icon: {
    //         url: "http://furtaev.ru/preview/user_on_map_2_small.png",
    //         scaledSize: new google.maps.Size(56, 56)
    //       }
    //     });
    //
    //     App.map.setCenter(marker.getPosition());
    //   });
    // };

    $(App.init.bind(App));
