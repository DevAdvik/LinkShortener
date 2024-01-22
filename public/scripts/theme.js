const root = document.querySelector(":root");

let isDark = true;
document.querySelector(".themeSelector").addEventListener("click", (ev) => {
    isDark = (ev.target.id === 'darkTheme') ? true : (ev.target.id === 'lightTheme') ? false : isDark; //Basically if else-if else

    root.style.setProperty("--main-bg", isDark ? "#0d0f15" : "#e6e6e6");
    root.style.setProperty("--sec-bg", isDark ? "#1f232a" : "#ffffff");
    root.style.setProperty("--text-color", isDark ? "#ffffff" : "#1C1B1E");
    root.style.setProperty("--inverse-text-color", isDark ? "#1C1B1E" : "#ffffff");
    root.style.setProperty("--footer-color", isDark ? "#e6e6e6" : "#1f232a");
    root.style.setProperty("--flashy-blue", isDark ? "#2764d6" : "#3b7df8");
    root.style.setProperty("--result-bg", isDark ? "#1e1e22" : "#f8f8f8");

})