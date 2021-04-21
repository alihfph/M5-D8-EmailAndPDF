import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";

import attendeesRoutes from "./attendess/index.js";
import usersRoutes from "./users/index.js";

const server = express();
const port = process.env.PORT;

server.use(cors());

server.use(express.json());

server.use("/attendees", attendeesRoutes);
server.use("/users", usersRoutes);

console.log(listEndpoints(server));
server.listen(port, () => {
  console.log("server running on", port);
});
