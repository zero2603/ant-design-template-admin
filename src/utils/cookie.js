// set cookie
export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";expires=" + expires + ";path=/";
}

// get cookie
export function getCookie(cname) {
    // var d = new Date();
    // return new Promise((resolve, reject) => {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    // })
}

// delete cookie
export function removeCookie(cname) {
    var cvalue = getCookie(cname);
    var d = new Date();
    d.setTime(d.getTime() - (24 * 60 * 60 * 1000)); // reduce 1 day
    var expires = d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";expires=" + expires + ";path=/;"; 
}