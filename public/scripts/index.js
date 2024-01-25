const longUrl = document.getElementById("longUrl");
const alias = document.getElementById("shortUrl");
const submit = document.querySelector(".submitBtn");
const errorText = document.querySelector(".urlError");

const urlPattern = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/;

longUrl.addEventListener("keydown", () => {
    errorText.classList.remove("showBlock");
})

alias.addEventListener("keydown", () => {
    errorText.classList.remove("showBlock");
})

let response;
const loadingIcon = document.querySelector(".lottieLoading");
const fullBox = document.querySelector(".box");

submit.addEventListener("click", async (ev) => {
    ev.preventDefault();

    let originalUrl = longUrl.value.trim();
    let short_url_pref = alias.value;
    if (!originalUrl) {
        errorText.textContent = "Error: Please enter a link to shorten!";
        errorText.classList.add("showBlock");
        longUrl.value = "";
        return;
    }
    if (!urlPattern.test(originalUrl)) {
        errorText.textContent = "Error: Please enter a valid link!";
        errorText.classList.add("showBlock");
        return;
    }
    if (short_url_pref) {
        if (!short_url_pref.match(/^[a-zA-Z0-9]+$/)) {
            errorText.textContent = "Error: Please enter only alphabets and numbers in alias!";
            errorText.classList.add("showBlock");
            return;
        }
    }

    loadingIcon.classList.add("showBlock");
    fullBox.classList.add("loading");

    let data;
    if (short_url_pref) {
        data = { long_url: originalUrl, alias: short_url_pref };
    } else {
        data = { long_url: originalUrl };
    }

    let result = await fetch('/createShortUrl', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    response = await result.json();
    if (result.status == 200) {
        if (response.success) {
            let currentZipLink = response.redirect_link;
            showResultUrl(originalUrl, currentZipLink);
        } else {
            showError("ZipLink with this alias already exists!\n Please enter another alias.");
            alias.value = "";
            console.log(response.reason);
        }
    } else if (result.status == 500) {
        showError("Internal Server Error occured!\n" + response.reason);
    } else {
        showError("Unexpected error occured! This shouldn't be happening.\n Please try again.")
    }
})


function showError(text) {
    loadingIcon.classList.remove("showBlock");
    fullBox.classList.remove("loading");
    errorText.textContent = text;
    errorText.classList.add("showBlock");
}

const resultBox = document.querySelector(".resultUrl");
const resultLongUrl = document.getElementById("originalLongUrl");
const resultZipLink = document.getElementById("genShortLink");
const resultBtns = document.querySelector(".resultBtns");


function showResultUrl(originalUrl, zipLink) {
    loadingIcon.classList.remove("showBlock");
    fullBox.classList.remove("loading");
    resultLongUrl.value = originalUrl;
    resultZipLink.value = zipLink;
    resultBox.style.right = '50%';
}


const qrCodeImg = document.querySelector(".getQrCode img");
const copyUrl = document.querySelector(".copyShortUrl");
let qrImageVisible = false;

resultBtns.addEventListener("click", (ev) => {
    switch (ev.target.dataset.btntype) {
        case "copyUrl":
            navigator.clipboard.writeText(resultZipLink.value);
            copyUrl.textContent = "Copied!";
            setTimeout(() => {
                copyUrl.textContent = "Copy Ziplink!";
            }, 1100);
            return;
        case "qrCodeBtn":
            qrImageVisible = !qrImageVisible;
            qrCodeImg.src = `http://api.qrserver.com/v1/create-qr-code/?data=${resultZipLink.value}&size=130x130`;
            qrCodeImg.onload = () => { qrCodeImg.style.display = (qrImageVisible ? "block" : "none") };
            return;
        case "anotherZiplink":
            qrCodeImg.style.display = 'none';
            resultBox.style.right = '-100vw';
            longUrl.value = '';
            alias.value = '';
            return;
        default:
            return;
    }
})