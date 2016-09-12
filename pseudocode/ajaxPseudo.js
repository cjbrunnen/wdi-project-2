// //this WET below changes to the next DRY one below with no annonymous functions
// // $(getPosts);
// //
// // function getPosts(){
// // $.ajax({
// //   url: "http://jsonplaceholder.typicode.com/posts",
// //   method: "GET"
// // }).done(function(data){
// //   console.log(data);
// // }).fail(function(data){
// //   console.log("ERROR", data);
// // });
// // }
//
// $(getPosts);
//
// function getPosts(){
// $.ajax({
//   url: "http://jsonplaceholder.typicode.com/posts",
//   method: "GET"
// }).done(showPosts)
//   .fail(error);
// }
//
// function showPosts(data){
//   var $ul = $("ul");
//   $.each(data, function(i, post) {
//     $ul.append("<li>"+
//                   "<ul>"+
//                     "<li><h2>"+post.title+"</h2></li>" +
//                     "<li><p>"+post.body+"</0></li>" +
//                   "</ul>"+
//                 "</li>");
//   });
// }
//
// function error(data){
//   console.log("ERROR", data);
// }
