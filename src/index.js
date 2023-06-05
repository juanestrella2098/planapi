import app from "./app";
import "../src/db/database";

app.listen(app.get("port"));

console.log("Server on port", app.get("port"));
