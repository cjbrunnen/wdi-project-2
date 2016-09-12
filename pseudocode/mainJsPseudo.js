// // from drones FRONT END //
//
// $(init);
//
// const api_url = "http://localhost:3000/api";
//
// function init(){
//   // Setup the event listeners for the top navigation
//   $(".index").on("click", dronesIndex);
//   $(".new").on("click", dronesNew);
//   // Must use event delegation because the content has been added by JS
//   $("main").on("submit", ".update", dronesUpdate);
//   $("main").on("submit", ".create", dronesCreate);
//   $("main").on("click", ".show", dronesShow);
//   $("main").on("click", ".edit", dronesEdit);
//   $("main").on("click", ".delete", dronesDelete);
// }
//
// function dronesIndex(e) {
//   e.preventDefault();
//   // Grab url
//   let url = $(this).attr("href");
//   // Make the AJAX request to get all of the drones
//   return getDronesForIndex(url);
// }
//
// function getDronesForIndex(url){
//   return $.ajax({
//     method: "GET",
//     url: `${api_url}${url}`,
//   })
//   .done(listDrones);
// }
//
// function listDrones(data){
//   $('#index-container').empty();
//   $.each(data.drones, (i, drone) => {
//     $('#index-container').append(`
//       <li>
//         <ul>
//           <li>
//             <a class="show" href="/drones/${drone._id}">
//               <h3>${drone.name}</h3>
//             </a>
//             <p><img src="${drone.image}"></p>
//             <p>${drone.color}</p>
//             <p>${drone.flightTime}</p>
//           </li>
//         </ul>
//       </li>
//     `);
//   });
//   return showContent("index");
// }
//
// function dronesNew() {
//   // Add the form to the page
//   $("#new-container").html(`
//     <form class="create" method="post" action="/drones">
//     <input type="text" id="name" name="drone[name]" placeholder="Name">
//     <input type="text" id="color" name="drone[color]" placeholder="Color">
//     <input type="text" id="image" name="drone[image]" placeholder="Image">
//     <input type="number" id="flightTime" name="drone[flightTime]" placeholder="Flight Time">
//     <input type="submit" value="Submit">
//   </form>`);
//   return showContent("new");
// }
//
// function dronesCreate() {
//   // Stop the page reloading after the form submission
//   event.preventDefault();
//   // Send the request to create a new drone
//   let method = $(this).attr("method");
//   let action = $(this).attr("action");
//
//   return $.ajax({
//     method: "POST",
//     url: `${api_url}${action}`,
//     data: $(this).serialize()
//   })
//   .done(data => {
//     return getDronesForIndex("/drones");
//   });
// }
//
// function dronesShow(e) {
//   e.preventDefault();
//   let url = $(this).attr("href");
//
//   $.ajax({
//     method: "GET",
//     url: `${api_url}${url}`
//   }).done(data => {
//     let drone = data.drone;
//
//     $('#show-content').html(`
//       <h1>${drone.name}</h1>
//       <p><img src="${drone.image}"></p>
//       <p>${drone.color}</p>
//       <p>${drone.flightTime}</p>
//       <button class="edit" data-id="${drone._id}">Edit</button>
//       <button class="delete" data-id="${drone._id}">Delete</button>
//     `);
//
//     return showContent("show");
//   });
// }
//
//
// function dronesEdit(){
//   event.preventDefault();
//   let id = $(this).data("id");
//   return $.ajax({
//     method: "GET",
//     url: `${api_url}/drones/${id}`
//   }).done(data => {
//     let drone = data.drone;
//     $("#edit-container").html(`
//       <form class="update" method="put" action="/drones/${id}">
//         <input type="text" id="name" name="drone[name]" placeholder="Name" value="${drone.name}">
//         <input type="text" id="color" name="drone[color]" placeholder="Color" value="${drone.color}">
//         <input type="text" id="image" name="drone[image]" placeholder="Image" value="${drone.image}">
//         <input type="number" id="flightTime" name="drone[flightTime]" placeholder="Flight Time" value="${drone.flightTime}">
//         <input type="submit" value="Submit">
//       </form>`);
//
//
//     return showContent("edit");
//   });
// }
//
// function dronesUpdate(e) {
//   e.preventDefault();
//
//   let url    = $(this).attr("action");
//   let method = $(this).attr("method");
//   let data   = $(this).serialize();
//
//   return $.ajax({
//     method: "PUT",
//     url: `${api_url}${url}`,
//     data: data
//   })
//   .done(data => {
//     return getDronesForIndex("/drones");
//   });
// }
//
// function dronesDelete() {
//   event.preventDefault();
//   let id = $(this).data("id");
//
//   return $.ajax({
//     method: "DELETE",
//     url: `${api_url}/drones/${id}`
//   }).done(data => {
//
//     return getDronesForIndex("/drones");
//   });
// }
//
//
// function showContent(id) {
//   // Hide all of the sections
//   $("section").hide();
//   // Show the section that you want to display
//   $(`#${id}-content`).show();
// }
// ---------------------------------------------------------------------------
