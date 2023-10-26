//check if its homepage
var isHome = false;
if (document.getElementById('home')) {
	isHome = true;
} else {
	isHome = false
}
// emulating events using event handlers
window.addEventListener('load', (event) => {
	console.log('Page is fully loaded!');
});
//get author name from meta
document.querySelector('.designer_name').innerText = document.querySelector('meta[name="author"]').content;
//scroll to top 
document.addEventListener("scroll", handleScroll);
var scrollToTopBtn = document.querySelector(".scroll-top");

function handleScroll() {
	var scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	if ((document.documentElement.scrollTop / scrollableHeight) > 0.1) {
		scrollToTopBtn.style.display = "block";
	} else {
		scrollToTopBtn.style.display = "none";
	}
}

scrollToTopBtn.addEventListener("click", scrollToTop);

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
}
//mobile menu
var mt = document.querySelector('.menu-trigger'),
	nav = document.querySelector('.nav_list_mobile'),
	ham = document.querySelector('#hamburger_menu');

mt.onclick = function () {
	nav.classList.toggle('visible');
	ham.classList.toggle('open');
}
//close menu when click about menu on mobile

var subMenu = document.querySelectorAll('.nav_list_mobile li a');
for (var i = 0; i < subMenu.length; i++) {
	subMenu[i].onclick = function () {
		if (ham.className == "menu-trigger open") {
			nav.classList.toggle('visible');
			ham.classList.toggle('open');
		}
	}
}
// active about menu link
var activeMenu = document.querySelector('.active'),
	aboutMenu = document.querySelector('.about');
aboutMenu.onclick = function () {
	activeMenu.classList.remove('active');
	aboutMenu.classList.add('active');
}
if (location.hash == '#about' && isHome) {
	activeMenu.classList.remove('active');
	aboutMenu.classList.add('active')
}

//footer BOM get last modified
var last_mod = document.querySelector('.last_mod'),
	bom_mod = document.lastModified;
last_mod.innerHTML = 'last updated or modified : ' + bom_mod;
// modal window
var cButton = document.querySelector('.covid_modal'),
	modal = document.querySelector('#modal'),
	oButton = document.querySelector('.order'),
	orderInner = document.querySelector('.modal_contnet'),
	cClose = document.querySelector('.order_close'),
	placeOrder = document.querySelector('.order_now'),
	orderModal = document.querySelector('#modal_order');
cButton.onclick = function () {
	modal.style.display = 'block';
	document.body.style.overflowY = 'hidden';
}
oButton.onclick = function () {
	orderModal.style.display = 'block';
	document.body.style.overflowY = 'hidden';
	orderIsOpen = true;
}

placeOrder.onclick = function () {

	// Order Countdown
	var orderTime = new Date().getTime() + 1140000;
	var oTimer = document.querySelector(".order_timer");
	document.querySelector(".oTimerCointainer").style.display = 'block';

	function oTime() {
		var dNow = new Date().getTime();
		var diff = orderTime - dNow;
		var cSeconds = 1000;
		var cMinutes = 1000 * 60;
		var cHours = cMinutes * 60;
		var minutesLeft = Math.round((diff % cHours) / cMinutes);
		var secondsLeft = Math.round((diff % cMinutes) / cSeconds);
		if (secondsLeft>9){
			oTimer.innerHTML = minutesLeft + ":" + secondsLeft;
		}
		else{
			oTimer.innerHTML = minutesLeft + ":0" + secondsLeft;
		}
		

		if (diff < 0) {
			oTimer.innerHTML = '<strong>Times Up!</strong>';
		}
	}
	var oTimerStart = setInterval(oTime, 1000)

	this.disabled = "true"
}


modal.onclick = function () {
	modal.style.display = 'none';
	document.body.style.overflowY = 'auto';
}
cClose.onclick = function () {
	orderModal.style.display = 'none';
	document.body.style.overflowY = 'auto';
	clearInterval(oTime);
	oTime = 0;
}

// open modal with href
if (location.hash == '#modal') {
	modal.style.display = 'block';
	document.body.style.overflowY = 'hidden';
}

//Order Calculation

function calcOrder() {
	var tPrice = document.querySelector('.total_price'),
		dPrice = parseFloat(document.querySelector('input[name="drinks"]:checked').value),
		pPrice = parseFloat(document.querySelector('input[name="pizza-type"]:checked').value);
	tPrice.innerText = dPrice + pPrice;
}
// delivery
function deliverType() {
	var orderAddress = document.querySelector('.orderaddress');
	if (document.querySelector('input[name="deliver"]:checked').value == 'delivery'){
		orderAddress.style.display = 'flex';
	}
	else{
		orderAddress.style.display = 'none';
	}
}



// form validation
var vName, vEmail, vMessage = false;

function validateName() {
	var fName = document.querySelector('#name');
	if (fName.value.trim() === "") {
		this.setStatus(fName, 'Name cannot be blank', "error");
		vName = false;
	} else {
		this.setStatus(fName, null, "success");
		vName = true;
	}
};

function validateEmail() {
	var f_EM = document.querySelector('#email');
	var regex = /\S+@\S+\.\S+/;
	if (regex.test(f_EM.value)) {
		this.setStatus(f_EM, null, "success");
		vEmail = true;
	} else {
		this.setStatus(f_EM, "Please enter valid email address", "error");
		vEmail = false;
	}
};

function validateTextArea() {
	var f_TA = document.querySelector('#message');
	if (f_TA.value.trim() === "") {
		this.setStatus(f_TA, 'Message cannot be blank', "error");
		vMessage = false;
	} else {
		this.setStatus(f_TA, null, "success");
		vMessage = true;
	}
};

function setStatus(field, message, status) {
	var successIcon = field.parentElement.querySelector('.icon-success'),
		errorIcon = field.parentElement.querySelector('.icon-error'),
		errorMessage = field.parentElement.querySelector('.error-message');

	if (status === "success") {
		if (errorIcon) {
			errorIcon.classList.add('hidden');
		}
		if (errorMessage) {
			errorMessage.innerText = "";
		}
		successIcon.classList.remove('hidden');
		field.classList.remove('input-error');
		field.classList.add('input-success');
	}

	if (status === "error") {
		if (successIcon) {
			successIcon.classList.add('hidden');
		}
		field.parentElement.querySelector('.error-message').innerText = message;
		errorIcon.classList.remove('hidden');
		field.classList.add('input-error');
		field.classList.remove('input-success');
	}
	if (vName && vEmail && vMessage) {
		alert('All enteries are validated')
	}
}


// Countdown

// Predefined date for next branch openning
var dDate = new Date("April 30, 2023 8:30:00").getTime();
var countdownDiv = document.querySelector(".countdown");
if (isHome) {
	var x = setInterval(function () {
		// Get the number of milliseconds 
		var dNow = new Date().getTime();
		// Calculate date difference
		var diff = dDate - dNow;
		// Calculations for days, hours, minutes and seconds
		var cSeconds = 1000;
		var cMinutes = 1000 * 60;
		var cHours = cMinutes * 60;
		var cDays = cHours * 24;
		var daysLeft = Math.round(diff / cDays);
		var hoursLeft = Math.round((diff % cDays) / cHours);
		var minutesLeft = Math.round((diff % cHours) / cMinutes);
		var secondsLeft = Math.round((diff % cMinutes) / cSeconds);

		countdownDiv.innerHTML = "<h2>Time Left To Our Next Branch Openning</h2><span class='days'>" + daysLeft + "</span><span class='hours'>" + hoursLeft + "</span><span class='minutes'>" + minutesLeft + "</span><span class='seconds'>" + secondsLeft + "</span>";
	}, 1000)
};