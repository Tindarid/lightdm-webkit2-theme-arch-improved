/* Used code mentioned in LICENSE.TOGGLE */

var input = document.getElementById("input");
var output = document.getElementById("output");

input.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        authenticate(e.target.value);
    }
});

window.authentication_complete = function() {
    if (lightdm.is_authenticated) {
	output.value = "Success login"
	$( 'body' ).fadeOut( 500, () => {
	    lightdm.login(lightdm.authentication_user, null);
	} );
    } else {
	output.value = "Login failed";
	lightdm.cancel_authentication();
	changeInput();
	input.disabled = 0
    }
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getImg() {
    index = getRandomInt(1, 25);
    document.body.style.backgroundImage = "url(wallpapers/" + index + ".jpg)";
}

window.onload = function() {
    getImg();
    input.focus();
    input.select();
}

function authenticate(input_text) {
    if (input_text === "") {
        return;
    }
    if(!lightdm.in_authentication) {
        lightdm.authenticate(input_text);
        changeInput();
	output.value = "Hello, " + input_text + "!"
    } else {
        lightdm.respond(input_text);
	output.value = "Please wait ..."
	input.disabled = 1
    }
}

function changeInput() {
    if (input.type === "password") {
	input.value = "";
        input.type = "text";
        input.placeholder = "user";
    } else {
        input.value = "";
        input.type = "password";
        input.placeholder = "password";
    }
}

var theToggle = document.getElementById('toggle');

// based on Todd Motto functions
// https://toddmotto.com/labs/reusable-js/

function hasClass(elem, className) {
	return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}

function addClass(elem, className) {
    if (!hasClass(elem, className)) {
    	elem.className += ' ' + className;
    }
}

function removeClass(elem, className) {
	var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
	if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

function toggleClass(elem, className) {
    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, " " ) + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(" " + className + " ") >= 0 ) {
            newClass = newClass.replace( " " + className + " " , " " );
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    } else {
        elem.className += ' ' + className;
    }
}

theToggle.onclick = function() {
   toggleClass(this, 'on');
   return false;
}
