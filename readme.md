# What does this Framework aim?
Simply dealing with as the description says "nearly" all kind of software which means it deals with a few much used socket protocols
Since it also handles web socket request it can be used as real coss side server

# Documentation
You do not realy need much to get your Server Running!
Basicly all you need, is the Packet Structur and the the know how, how to create events.

## Packets
That's easy, look!
Packets are platform and socket wide the same 

A Normal Packet would look like this
```json
{"event":"name", "payload":"your_data"}
```
But you can parse even more Objects inside the Packet
```json
{"event":"name", "payload":{"arg1":"arg_value_1","arg2":"arg_value_2","arg3":"arg_value_3"}};

```
and this can go on for ever but, this should show the point of a packet


## Events
Something needs to happen with your packet! The Event Handler is handling it.
The Handler is taking in a **Event Name** and a **Function** for it.

Events look like this:
```                
{name:'logout', function() {eventFunction(possible,arguments)}}, 
```

But somewhere your event need to be defined!
As Default they are stored in *bin/classes/events*

and a normal Event is build like this:
```js
event_function(){
  Console.log('Your code here please');
}
```
Not really difficult right?
well then good luck and happy coding with it :D
