const cubo = document.getElementById('cubo');

let targetXRotation = 0;
let targetYRotation = 0;
let currentXRotation = 0;
let currentYRotation = 0;

let isDragging = false; // Para controlar el estado del arrastre
let lastMouseX = 0;
let lastMouseY = 0;

// Control de la suavidad de la rotación
const smoothFactor = 0.1; // Cambia este valor para ajustar la suavidad

// Función para manejar el movimiento del mouse o táctil
const handleMove = (clientX, clientY) => {
    if (isDragging) {
        // Calcula el cambio en la posición del mouse o táctil
        const deltaX = clientX - lastMouseX;
        const deltaY = clientY - lastMouseY;

        // Actualiza las rotaciones objetivo basadas en el movimiento
        targetXRotation -= deltaY * 0.5; // Ajusta la sensibilidad si es necesario
        targetYRotation += deltaX * 0.5; // Ajusta la sensibilidad si es necesario
    }

    // Guarda la última posición del mouse o táctil
    lastMouseX = clientX;
    lastMouseY = clientY;
};

// Evento para rastrear la posición del mouse
document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    handleMove(clientX, clientY);
});

// Evento para iniciar el arrastre con el mouse
document.addEventListener('mousedown', (event) => {
    isDragging = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
});

// Evento para detener el arrastre con el mouse
document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Eventos para manejar el tacto
document.addEventListener('touchstart', (event) => {
    isDragging = true;
    const touch = event.touches[0];
    lastMouseX = touch.clientX;
    lastMouseY = touch.clientY;
});

document.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    handleMove(touch.clientX, touch.clientY);
    event.preventDefault(); // Evita el desplazamiento de la página
});

document.addEventListener('touchend', () => {
    isDragging = false;
});

// Función de actualización del cubo
function updateCubo() {
    // Interpolación suave
    currentXRotation += (targetXRotation - currentXRotation) * smoothFactor;
    currentYRotation += (targetYRotation - currentYRotation) * smoothFactor;

    // Aplica la transformación al cubo
    cubo.style.transform = `translateZ(-50px) rotateX(${currentXRotation}deg) rotateY(${currentYRotation}deg)`;

    // Llama a la función en el siguiente frame
    requestAnimationFrame(updateCubo);
}

// Inicia la actualización
updateCubo();