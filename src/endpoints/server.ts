import app from "./endpoints";
import PORT from './endpoints';
// const app = require("./endpoints.ts");
// const PORT = require('./endpoints.ts');

app.listen(PORT, () => {console.log('Serve started on port ' + PORT)});


