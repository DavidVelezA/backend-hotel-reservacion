require('./database');

const server = require("./src/app");
server.listen(process.env.PORT, ()=>{
    console.log(`Auth Service Started!!`)
})