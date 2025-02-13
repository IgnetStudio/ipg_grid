// HTML elements

const body = document.body;
const toggleBtn = document.querySelector(".toggle__btn");
const tooltipBtns = document.querySelectorAll(".widget__info");
const tooltipSpans = document.querySelectorAll(".widget__list-item");
const contentInner = document.querySelector(".content__inner");

// Overlay

for (let i = 0; i < tooltipBtns.length; i++) {
	tooltipBtns[i].addEventListener("mouseover", function () {
		contentInner.classList.add("overlayed");
	});

	tooltipBtns[i].addEventListener("mouseout", function () {
		contentInner.classList.remove("overlayed");
	});
}

for (let i = 0; i < tooltipSpans.length; i++) {
	tooltipSpans[i].addEventListener("mouseover", function () {
		contentInner.classList.add("overlayed");
	});

	tooltipSpans[i].addEventListener("mouseout", function () {
		contentInner.classList.remove("overlayed");
	});
}

window.onload = function () {
	const isDark = localStorage.getItem("darkMode");
	if (isDark === "true") {
		toggleDark();
	}
};

const toggleDark = function () {
	body.classList.toggle("dark-mode");
};

toggleBtn.addEventListener("click", function () {
	const isDark = body.classList.contains("dark-mode");
	toggleDark();
	localStorage.setItem("darkMode", !isDark);
	if (isDark) {
		document.getElementById("switchOffAudio").play();
	} else {
		document.getElementById("switchOnAudio").play();
	}
});

// Dark mode toggle, as per hour

function isNight() {
	const hour = new Date().getHours();
	return hour > 22 || hour < 6;
}

if (isNight() === true) {
	const isDark = localStorage.getItem("darkMode");
	if (isDark === null) {
		toggleDark();
	}
}

// @LM img src error handler, will be utilized in the future
async function checkImage(url) {
	try {
		// sends a request without downloading the whole image
		const response = await fetch(url, { method: "HEAD" });

		if (!response.ok) throw new Error("Image not found");
		console.log("Image is valid and accessible");
	} catch (error) {
		console.log("Image is broken:", error.message);
		// toast placeholder
		// apply fallback styles to img with broken image icon
	}
}

checkImage("assets/img/card/3H-thumbnail.png");

// Scroll to top

const folioTarget = document.querySelector("#folio");
const cardTarget = document.querySelector(".card");
const scrollTarget = document.querySelector(".footer__scroll-top button");

// @LM buggy solution
// cardTarget.addEventListener("click", function (e) {
// 	folioTarget.scrollIntoView({ behavior: "smooth" });
// });

// scrollTarget.addEventListener("click", function (e) {
// 	folioTarget.scrollIntoView({ behavior: "smooth" });
// });
