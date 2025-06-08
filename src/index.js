const server = require('./server');

const port = process.env.PORT || 1100;
console.log(port, 'port');

const startServer = ()=>{
    server.listen(port, ()=>{
        try{
            console.log(`Server running on port ${port}`)
        }catch(error){
            console.log("Can't connected to server!")
        }
    })
}
startServer();