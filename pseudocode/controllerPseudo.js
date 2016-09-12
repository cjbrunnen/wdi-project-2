// // from drones eg //
// module.exports = {
//   index:  dronesIndex,
//   show:   dronesShow,
//   create: dronesCreate,
//   update: dronesUpdate,
//   delete: dronesDelete
// };
//
// const Drone = require("../models/drone");
//
// function dronesIndex(req, res){
//   Drone.find({}, (err, drones) => {
//     if (err) return res.status(500).json({ message: "Drone go breaking my heart." });
//     return res.status(200).json({ drones });
//   });
// }
//
// function dronesShow(req, res){
//   Drone.findById(req.params.id, (err, drone) => {
//     if (err) return res.status(500).json({ message: "Drone go breaking my heart." });
//     if (!drone) return res.status(404).json({ message: "Here today, Drone tomorrow." });
//     return res.status(200).json({ drone });
//   });
// }
//
// function dronesCreate(req, res){
//   console.log(req.body);
//
//   Drone.create(req.body.drone, (err, drone) => {
//     console.log(err);
//
//     if (err) return res.status(500).json({ message: "Drone go breaking my heart." });
//     return res.status(201).json({ drone });
//   });
// }
//
// function dronesUpdate(req, res){
//   Drone.findByIdAndUpdate(req.params.id, req.body.drone, { new: true }, (err, drone) => {
//     if (err) return res.status(500).json({ message: "Drone go breaking my heart." });
//     return res.status(200).json({ drone });
//   });
// }
//
// function dronesDelete(req, res){
//   Drone.findByIdAndRemove(req.params.id, err => {
//     if (err) return res.status(500).json({ message: "Drone go breaking my heart." });
//     return res.status(204).json({ message: "Down the drone." });
//   });
// }
// -------------------------------------------------------------------------------
