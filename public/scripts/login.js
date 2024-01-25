const submit = document.querySelector(".submitBtn");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const loadingIcon = document.querySelector(".lottieLoading");
const fullBox = document.querySelector(".box");
const errorText = document.querySelector(".urlError");

username.addEventListener("keydown", () => {
    errorText.classList.remove("showBlock");
})
password.addEventListener("keydown", () => {
    errorText.classList.remove("showBlock");
})

submit.addEventListener("click", async (ev) => {
    ev.preventDefault();
    const data = {
        username: username.value,
        password: password.value
    }
    if (!data.username) {
        return showError("Please enter your username!");
    }
    if (!data.password) {
        return showError("Please enter your password!");
    }

    loadingIcon.classList.add("showBlock");
    fullBox.classList.add("loading");

    const response = await fetch("/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const respJson = await response.json();
    if (respJson.success) {
        errorText.style.color = 'springgreen';
        showError(`Logged in successfully as ${data.username}!`);
        window.location.replace("/dashboard");
    } else {
        if (respJson.errorType === 'InvalidPassword') {
            showError("Invalid Password!");
        } else if (respJson.errorType === "InvalidUser") {
            showError("Invalid Username!");
        } else if (respJson.errorType === "LoggedIn") {
            showError(`You're already logged in as ${respJson.username}!`);
        } else {
            showError("Unknown Error Occured!");
            setTimeout(() => { errorText.classList.remove("showBlock") }, 2000);
        }
    }
})



function showError(text) {
    loadingIcon.classList.remove("showBlock");
    fullBox.classList.remove("loading");
    errorText.textContent = text;
    errorText.classList.add("showBlock");
}