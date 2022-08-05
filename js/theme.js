const checkbox = document.querySelector(".switch__checkbox");
const theme = document.querySelector("#theme-link");

checkbox.addEventListener("click", () => {

  if (theme.getAttribute("href") == "style/style-black.css") {
    theme.href = "style/style-light.css";
  } else {
    theme.href = "style/style-black.css";
  };
});