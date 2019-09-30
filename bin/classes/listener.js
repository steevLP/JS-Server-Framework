/**
 * @param {array} events Die Events die Ausgeführt werden
 */
function listener(events, event){
    events.forEach(e => {
        if(event === e.name) {
            e.function();
        }
    })
}
module.exports = listener;