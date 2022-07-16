const { exec } = require("child_process");
const net = require('net');
const timeScan = 5000
let poolPort = [0]

setInterval(() => {

    async function scan(){
        
        let host = "127.0.0.1";
        let start = 9000;
        let stop = 9034;
        
        for(let port = start; port <= stop; port++){
            try{
                await connect(host, port);
                if (port === 9034) {
                    poolPort[0] = port
                    console.log(`Pool port ${port} open`);
                } else {
                    port[0] = 0
                }

                if(poolPort[0] === 9034) {
                    console.log(`The following scan times via: ${timeScan / 1000} sec`);
                    console.log('pool-port: ', poolPort[0]);
                    console.log('PoOl WoRk');
                }

                if (port !== 9034){
                    poolPort[0] = 0
                }
            } catch(e){

            }
        }

        console.log('Scan complete\n');
    }

    console.log('poolPort: ', poolPort[0]);
    if (poolPort[0] !== 9034) {
        console.log('Pool disabled');
        exec("yarn start miners:pools:start --balancePercentPayout=99",(error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    }

    async function connect(host, port){
        return new Promise((res, rej) => {
            net.listen({host : host, port: port}, () => {
               res(true);
            }).on("error", err => {
                rej(err);
            });
        });
    }
    
    scan();
}, timeScan) 