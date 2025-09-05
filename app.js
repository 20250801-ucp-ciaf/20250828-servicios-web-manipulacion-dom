console.log("cambio hecho desde github");
console.log("cambio hecho desde git local");
// Event listeners mejorados
document.addEventListener("DOMContentLoaded", function () {
  console.log("holiii");
  // Mostrar estadísticas iniciales
  // setTimeout(() => {
  //   showPageStats();
  // }, 1000);

  // Event listeners para botones de tema

  const btnThemeLight = document.getElementById("btn-theme-light");
  btnThemeLight.addEventListener("click", () => changeTheme("light"));

  const btnThemeDark = document.getElementById("btn-theme-dark");
  btnThemeDark.addEventListener("click", () => changeTheme("dark"));

  document
    .getElementById("btn-theme-colorful")
    .addEventListener("click", () => changeTheme("colorful"));

  // Restaurar tema guardado
  restoreTheme();

  // Efectos hover en elementos interactivos
  const interactiveElements = document.querySelectorAll(
    "button, .navigation, li"
  );
  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.cursor = "pointer";
    });
  });
});

// Función para mostrar estadísticas de la página
function showPageStats() {
  const totalElements = document.querySelectorAll("*").length;
  const totalTextNodes = document.querySelectorAll(
    "p, h1, h2, h3, li, span"
  ).length;
  const totalButtons = document.querySelectorAll("button").length;

  showResult("=== ESTADÍSTICAS DE LA PÁGINA ===", "info");
  showResult(`<strong>Total de elementos:</strong> ${totalElements}`, "info");
  showResult(`<strong>Elementos de texto:</strong> ${totalTextNodes}`, "info");
  showResult(`<strong>Botones:</strong> ${totalButtons}`, "info");
}

// Función para restaurar tema guardado
function restoreTheme() {
  const savedTheme = localStorage.getItem("preferred-theme");
  if (savedTheme) {
    changeTheme(savedTheme);
  }
}

// Función para cambiar el tema de la página
function changeTheme(themeName) {
  // Remover todas las clases de tema existentes
  const body = document.body;
  body.classList.remove("theme-dark", "theme-colorful");

  // Aplicar el nuevo tema
  if (themeName === "dark") {
    body.classList.add("theme-dark");
    showResult("🌙 Tema oscuro aplicado", "success");
  } else if (themeName === "colorful") {
    body.classList.add("theme-colorful");
    showResult("🌈 Tema colorido aplicado", "success");
  } else {
    // Tema claro (por defecto)
    showResult("☀️ Tema claro aplicado", "success");
  }

  // Guardar preferencia en localStorage
  localStorage.setItem("preferred-theme", themeName);

  // Aplicar transición suave
  document.body.style.transition = "all 0.5s ease-in-out";
  setTimeout(() => {
    document.body.style.transition = "";
  }, 500);
}

// Función para mostrar resultados en pantalla con mejor formato
function showResult(message, type = "info") {
  // message = tema colorido aplicado
  // type = success
  const output = document.getElementById("output");
  const timestamp = new Date().toLocaleTimeString();

  const resultElement = document.createElement("div"); // crear div
  resultElement.className = `result-item result-${type}`;

  resultElement.innerHTML = `
    <div class="result-header">
      <span class="result-type">${getTypeIcon(
        type
      )} ${type.toUpperCase()}</span>
      <span class="result-time">${timestamp}</span>
    </div>
    <div class="result-content">${message}</div>
  `;

  output.appendChild(resultElement);

  // Scroll automático al resultado más reciente
  resultElement.scrollIntoView({ behavior: "smooth", block: "nearest" });

  // Efecto de entrada
  setTimeout(() => {
    resultElement.style.opacity = "1";
    resultElement.style.transform = "translateX(0)";
  }, 100);
}

// Función para obtener iconos según el tipo de resultado
function getTypeIcon(type) {
  const icons = {
    info: "ℹ️",
    success: "✅",
    warning: "⚠️",
    error: "❌",
  };
  return icons[type] || icons.info;
}
