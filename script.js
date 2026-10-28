// Helpers and number formatting for the benefit calculator.
const formatRub = (value) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);
const bill = document.querySelector("#bill");
const saving = document.querySelector("#saving");
function updateCalculator() {
  const monthly = (Number(bill.value) * Number(saving.value)) / 100;
  document.querySelector("#bill-output").textContent = formatRub(
    Number(bill.value),
  );
  document.querySelector("#saving-output").textContent = `${saving.value}%`;
  document.querySelector("#monthly-saving").textContent = formatRub(monthly);
  document.querySelector("#yearly-saving").textContent = formatRub(
    monthly * 12,
  );
}
[bill, saving].forEach((input) =>
  input.addEventListener("input", updateCalculator),
);
updateCalculator();

// Persist the visitor's theme preference.
const themeButton = document.querySelector(".theme-toggle");
function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  themeButton.textContent = dark ? "☀" : "☾";
  themeButton.setAttribute("aria-pressed", String(dark));
  localStorage.setItem("ecoflow-theme", dark ? "dark" : "light");
}
setTheme(localStorage.getItem("ecoflow-theme") === "dark");
themeButton.addEventListener("click", () =>
  setTheme(!document.body.classList.contains("dark")),
);

// Pass selected pricing tier into the lead form.
document.querySelectorAll("[data-plan]").forEach((link) => {
  link.addEventListener("click", () => {
    const selectedPlan = link.dataset.plan;

    // Сохраняем тариф в скрытом поле формы
    document.querySelector("#selected-plan").value = selectedPlan;

    // Показываем выбранный тариф посетителю
    document.querySelector("#plan-display").textContent =
      `Выбранный тариф: ${selectedPlan}`;
  });
});
// Client-side validation. Demo form does NOT transmit or store personal data.
const form = document.querySelector("#lead-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const nameError = document.querySelector("#name-error");
  const emailError = document.querySelector("#email-error");
  const status = document.querySelector("#form-status");
  nameError.textContent = "";
  emailError.textContent = "";
  status.textContent = "";
  let valid = true;
  if (name.value.trim().length < 2) {
    nameError.textContent = "Введите имя (минимум 2 символа).";
    valid = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    emailError.textContent = "Введите корректный email.";
    valid = false;
  }
  if (!valid) {
    status.textContent = "Проверьте выделенные поля.";
    return;
  }
  status.textContent =
    "✓ Форма заполнена верно. Это демоверсия: заявка не отправлена.";
  // Production integration: send validated fields to your backend here,
  // handle network errors, add spam protection and consent logging.
});
document.querySelector("#year").textContent = new Date().getFullYear();
// Мобильное меню
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");

// Открытие и закрытие меню
menuToggle.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("is-open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Закрыть меню" : "Открыть меню",
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Закрытие меню при выборе раздела
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Открыть меню");
    menuToggle.textContent = "☰";
  });
});
