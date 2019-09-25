const WebSocket = require('ws');                    // Websocket Frame
const sql = require('mysql');                       // SQL frame
const db = require('./bin/config/sql.json');        // SQL Config
const net = require('net');                         // TCP Connection
const readline = require('readline');               // Console Input
const colors = require('colors');                   // Console Colours
let config = require('./bin/config/server.json');   // Server Config

// Socket
let socket = require('./bin/classes/websocket');	// Requires Websocket Object
let wss = socket(WebSocket, config);				// Asignes Websocket
//Classes
let crypt = require('./bin/classes/decrypt');               // Cryption Class                     
let IsJsonString = require('./bin/classes/IsJsonString');   // JSON Validator
let listener = require('./bin/classes/events/listener');    // Event Listener

// Events
let tcp_login = require('./bin/classes/events/tcp/login');      // TCP Login Event
let ws_login = require('./bin/classes/events/ws/login');        // WSS Login Event
let ws_logout = require('./bin/classes/events/ws/logout');      // WSS Logout Event

// Database Definition
var db_con = sql.createConnection({
    host     : db.host,
    user     : db.user,
    password : db.pw,
    database : db.name
});

// Console Input
const rl = readline.createInterface({input: process.stdin, output: process.stdout});

wss.on('connection', (ws) => {
    ws.on('message', function incoming(data) {
        if(IsJsonString(data)){ 
            let payload = JSON.parse(data);
            //console.log('WSS: ' + payload['event']);
            let events = [ 
                {name:'event', function() {console.log('executes this event')}}, 
            ]; 
            listener(events,payload.event);
        }
    });
});

let server = net.createServer((socket) => {
    socket.on('data', (data) => {
        if(IsJsonString(data)){
            let payload = JSON.parse(data); 
            console.log('TCP: ' + payload['event']);
            if(IsJsonString(data)){ 
                let payload = JSON.parse(data);
                let events = [ 
                    {name:'login', function() { tcp_login(payload, db_con, socket, crypt) } }, 
                    {name:'test', function() { console.log('test 1111') } },
                ]; 
                listener(events,payload.event);
            }
        }
    });
});

// ========================================================================
// *                         The Console Input                            *
// ========================================================================
rl.on('line', (input) => { 
	//TODO: change all Console output to following Format console.log(colors.grey(`test ${colors.yellow("text")}`));
	let messageArray = input.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(0);

	console.log(args);
	switch(args[0].toLowerCase()){
		case 'help':
			console.log(colors.grey('=================================== ') + colors.yellow('Help') + colors.grey(' ==================================='));
			console.log(colors.yellow('Help:') + colors.grey(' Shows a list of all avaiable Comamnds.'));
			console.log(colors.yellow('Shutdown:') + colors.grey(' shuts down the Server.'));
			console.log(colors.grey('============================================================================'));
		break;
		case 'shutdown':
			rl.question(colors.grey('Are you sure you want to shut down the Server?')+'\n'+colors.yellow('(Yes, y) = Yes, (No, n) = No: '), (reply) => {
				let answer = reply.toLowerCase();
				//Askes if the Server should be shutdown
				if(answer === 'yes' || answer === 'y'){
					process.exit(0);
				}else if(answer === 'no' || answer === 'n'){ 
					return; 
				}else{ 
					return; 
				}
			});
		break;
		case 'maintance':
			let config = file.import('./bin/config/server.json');
			switch(args[1]){
				default:
					console.log(colors.grey(`Please Enter a Parameter you can use <${colors.yellow("enable")}, ${colors.yellow("disable")}, ${colors.yellow("current")}>`));
				break;
				case 'disable':
					rl.question(colors.grey('Are you sure you want disable Maintance Mode?')+'\n'+colors.yellow('(Yes, y) = Yes, (No, n) = No: '), (reply) => {
						let answer = reply.toLowerCase();
						//Askes if the Server should be shutdown
						if(answer === 'yes' || answer === 'y'){
							config.maintance = 'true';
							console.log(colors.green('Maintance Mode disabled'));
							file.save('./bin/config/server.json', config);
						}else if(answer === 'no' || answer === 'n'){ 
							return; 
						}else{ 
							return; 
						}
						file.save('./bin/config/server.json', config);
					});
				break;
				case 'enable':
					rl.question(colors.grey('Are you sure you want disable Maintance Mode?')+'\n'+colors.yellow('(Yes, y) = Yes, (No, n) = No: '), (reply) => {
						let answer = reply.toLowerCase();
						//Askes if the Server should be shutdown
						if(answer === 'yes' || answer === 'y'){
							config.maintance = 'false';
							console.log(colors.green('Maintance Mode disabled'));
							file.save('./bin/config/server.json', config);
						}else if(answer === 'no' || answer === 'n'){ 
							return; 
						}else{ 
							return; 
						}				
						file.save('./bin/config/server.json', config);
					});
				break;
				case 'current':
					if(config.maintance == 'true'){
						console.log(colors.grey('Maintance Mode is ')+colors.yellow('Activated'));
					}else{
						console.log(colors.grey('Maintance Mode is ')+colors.yellow('Deactivated'));
					}
				break;
			}
		break;
		default:
			console.log(colors.grey('Invalid Command.. Type ')+colors.yellow('Help')+colors.grey(', to get a list of avaiable Comamnds.'));
		break;
	}
});

// =========================================
// * Starts Services with all needed ports *
// =========================================
//Gets core-node Connections    
server.listen(1337, '127.0.0.1', () => { 
    console.log(colors.grey('TCP Server online on Port: ') + colors.yellow(config.tcpserver)); 
    console.log(colors.grey('WSS Server online on Port: ') + colors.yellow(config.websocket)); 
}); 

// ==================================
// * Checks if the Port is avaiable *
// * If Yes Run else Restart        *
// ==================================
server.on('error', (e) => {
	if (e.code === 'EADDRINUSE') {
		console.log('Address in use, retrying...');
		setTimeout(() => {

            server.close();
			// Gets Server Connections    
			server.listen(config.tcpserver, '127.0.0.1', () => { 
				console.log('Server online on Port:' + config.tcpserver); 
			}); 
		}, 1000);
	}
});