module.exports = {
    /**
     * @param {String} content Zu entschlüsselnde Nachricht
     */
    'decrypt': function (content,passcode) {
        var result = []; var str = '';
        var codesArr = JSON.parse(content);var passLen = passcode.length ;
        for(var i = 0  ; i < codesArr.length ; i++) {
            var passOffset = i%passLen ;
            var calAscii = (codesArr[i]-passcode.charCodeAt(passOffset));
            result.push(calAscii) ;
        }
        for(var i = 0 ; i < result.length ; i++) {
            var ch = String.fromCharCode(result[i]); str += ch ;
        }
        return str ;
    }
}