export const windowTitle = (title) => {
    window.title = title
};

export function setCookie(cname, cvalue, exMins) {
    var d = new Date();
    d.setTime(d.getTime() + (exMins * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function authApi() {
    switch (window.location.hostname) {
        case "localhost":
            return "https://honeycombapi.iapplabz.co.in";
        case "192.168.1.107":
            return "https://honeycombapi.iapplabz.co.in";
        default:
            return "https://honeycombapi.iapplabz.co.in"
    }
}

export function checkValidation(e) {
    if (e.target.checkValidity()) {
        if (e.target.type === "select-one") {
            e.target.parentElement.classList.remove("has-error");
            e.target.parentElement.classList.remove("personal-select-with-error");
            e.target.parentElement.classList.add("personal-select-without-error");
        } else {
            e.target.parentElement.classList.remove("has-error");
        }
    } else {
        e.target.parentElement.classList.add("has-error");
        e.target.parentElement.classList.add("personal-select-with-error");
        e.target.parentElement.classList.remove("personal-select-without-error");
        if (e.target.type === "select-one") {
        } else {
            e.target.parentElement.classList.add("has-error");
        }
    }
}
