const submit = document.querySelector(".submitBtn");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

submit.addEventListener("click", async (ev) => {
    ev.preventDefault();
    const data = {
        username: username.value,
        password: password.value
    }
    const response = await fetch("/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const respJson = await response.json();
    console.log(respJson);
})
