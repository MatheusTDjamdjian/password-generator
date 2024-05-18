const lengthSlider = document.querySelector(".pass-length input"),
  options = document.querySelectorAll(".option input"),
  copyIcon = document.querySelector(".input-box span"),
  passwordInput = document.querySelector(".input-box input"),
  passIndicator = document.querySelector(".pass-indicator"),
  generateBtn = document.querySelector(".generate-btn");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~"
};

const generatePassword = () => {
  let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;

  let lowercaseCount = document.querySelector(".lowercase-count").value;
  let uppercaseCount = document.querySelector(".uppercase-count").value;
  let numberCount = document.querySelector(".number-count").value;
  let symbolCount = document.querySelector(".symbol-count").value;

  const selectedOptions = {
    lowercase: lowercaseCount,
    uppercase: uppercaseCount,
    numbers: numberCount,
    symbols: symbolCount
  };

  for (let [type, count] of Object.entries(selectedOptions)) {
    if (count > 0) {
      staticPassword += characters[type].repeat(count);
    }
  }

  staticPassword = staticPassword.split('').sort(() => Math.random() - 0.5).join('');

  for (let i = 0; i < passLength; i++) {
    let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  passwordInput.value = randomPassword;
};

const updatePassIndicator = () => {
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};

const updateSlider = () => {
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
};
updateSlider();

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.innerText = "check";
  copyIcon.style.color = "#4285F4";
  setTimeout(() => {
    copyIcon.innerText = "copy_all";
    copyIcon.style.color = "#707070";
  }, 1500);
};

const clearPassword = () => {
  passwordInput.value = '';
};

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
passwordInput.addEventListener("focus", clearPassword);

const UpdatePassIndicator = () => {
  const strengthText = document.querySelector(".pass-strength-text");
  let strength = lengthSlider.value <= 8 ? "Weak" : lengthSlider.value <= 16 ? "Medium" : "Strong";
  passIndicator.id = strength.toLowerCase();
  strengthText.innerText = strength;
};

const toggleModeBtn = document.querySelector(".toggle-mode-btn");

const toggleMode = () => {
  document.body.classList.toggle("dark-mode");
};

toggleModeBtn.addEventListener("click", toggleMode);

const savePassword = () => {
  localStorage.setItem('savedPassword', passwordInput.value);
  alert("Password saved!");
};

const loadSavedPassword = () => {
  const savedPassword = localStorage.getItem('savedPassword');
  if (savedPassword) {
    passwordInput.value = savedPassword;
    alert("Saved password loaded!");
  } else {
    alert("No saved password found.");
  }
};

const saveBtn = document.querySelector(".save-btn");
const loadBtn = document.querySelector(".load-btn");

saveBtn.addEventListener("click", savePassword);
loadBtn.addEventListener("click", loadSavedPassword);

const exportPassword = () => {
  const blob = new Blob([passwordInput.value], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'password.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const exportBtn = document.querySelector(".export-btn");
exportBtn.addEventListener("click", exportPassword);