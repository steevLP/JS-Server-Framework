# What does this Framework aim?
Simply dealing with as the description says "nearly" all kinds of software which means it deals with a few much used socket protocols
Since it also handles web socket requests it can be used as a real cross-side server

# Documentation
You do not need much to get your Server Running!  
All you need is the Packet Structure and the know-how of how to create events.

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
The Handler is taking in an **Event Name** and a **Function** for it.

Events look like this:
```                
{name:'logout', function() {eventFunction(possible,arguments)}}, 
```

But somewhere your event needs to be defined!
As default they are stored in *bin/classes/events*

and a normal Event is build like this:
```js
event_function(){
  Console.log('Your code here please');
}
```
Not difficult right?
well, then good luck and happy coding :D
