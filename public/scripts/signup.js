const submit = document.querySelector(".submitBtn");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

const loadingIcon = document.querySelector(".lottieLoading");
const fullBox = document.querySelector(".box");
const errorText = document.querySelector(".urlError");

username.addEventListener("keydown", () => {
    errorText.classList.remove("showBlock");
})
password.addEventListener("keydown", () => {
    errorText.classList.remove("showBlock");
})
confirmPassword.addEventListener("keydown", () => {
    errorText.classList.remove("showBlock");
})

submit.addEventListener("click", async (ev) => {
    ev.preventDefault();
    const data = {
        username: username.value,
        password: password.value,
        confirmPassword: confirmPassword.value
    }
    if (!data.username) {
        return showError("Please enter your username!");
    }
    if (data.username.length<3) {
        return showError("Username should be atleast 3 characters long!");
    }
    if (!data.password) {
        return showError("Please enter your password!");
    }
    if (data.password.length<6) {
        return showError("Password should be atleast 6 characters long!");
    }
    if (!data.confirmPassword) {
        return showError("Please confirm your password!");
    }
    if (data.password !== data.confirmPassword) {
        return showError("Error: The entered password and confirmed password do not match.");
    }

    loadingIcon.classList.add("showBlock");
    fullBox.classList.add("loading");

    const response = await fetch("/signup", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const respJson = await response.json();
    console.log(respJson);
    if (respJson.success) {
        errorText.style.color = 'springgreen';
        showError(`Signed up successfully as ${data.username}!`);
        window.location.replace("/dashboard");
    } else {
        if (respJson.errorType === "UsernameConflict") {
            showError("Error: Username already exists!");
            username.value = '';
        } else if (respJson.errorType === "LoggedIn") {
            showError(`Error: You're already logged in as ${respJson.username}!`);
        } else {
            showError("Unknown error occured!")
        }
    }
})



function showError(text) {
    loadingIcon.classList.remove("showBlock");
    fullBox.classList.remove("loading");
    errorText.textContent = text;
    errorText.classList.add("showBlock");
}