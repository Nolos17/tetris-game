🎮 Juego de Tetris
¡Un clásico juego de Tetris desarrollado con Vite! 🚀 Disfruta de un diseño responsivo, piezas coloridas, sistema de puntuación y un modal de fin de juego. Incluye una imagen de fondo personalizada y un título centrado para una experiencia inmersiva. 🖼️
📋 Tabla de Contenidos

✨ Características
🛠️ Tecnologías Usadas
📸 Capturas de Pantalla
🔧 Instalación
🚀 Ejecutar el Proyecto
🎲 Instrucciones de Juego
📂 Estructura del Proyecto
🤝 Contribuir
📜 Licencia

✨ Características

🧩 Juego clásico de Tetris con las 7 piezas (tetriminos): O, T, S, Z, L, J, I.
📱 Diseño responsivo con un título centrado y una imagen de fondo (fondoTetris.png).
⭐ Sistema de puntuación en un contenedor estilizado.
🚪 Modal de fin de juego con botón de reinicio.
🎨 Animaciones suaves y sombras para un aspecto moderno.
📲 Adaptado para móviles con estilos optimizados para pantallas pequeñas.

🛠️ Tecnologías Usadas

⚡ Vite: Herramienta de construcción rápida y servidor de desarrollo.
📜 JavaScript: Lógica del juego (movimiento, colisiones, puntuación).
🎨 HTML5 Canvas: Renderizado del tablero y piezas.
💅 CSS: Estilos para el contenedor, título, modal y diseño responsivo.
🌐 Git: Control de versiones para el proyecto.

📸 Capturas de Pantalla
🎮 Pantalla principal con el tablero, puntuación e imagen de fondo.
🚪 Modal de fin de juego con botón de reinicio.

Nota: Agrega las capturas a la carpeta screenshots/ y actualiza las rutas si cambias los nombres.

🔧 Instalación
Sigue estos pasos para configurar el proyecto localmente:

📥 Clonar el repositorio:
git clone https://github.com/tu-usuario/tetris-vite.git
cd tetris-vite

📦 Instalar dependencias:Asegúrate de tener Node.js (versión 16 o superior) instalado. Luego:
npm install

🖼️ Verificar activos:Confirma que fondoTetris.png esté en public/ o src/, como se referencia en src/styles/style.css.

🚀 Ejecutar el Proyecto

🌐 Iniciar el servidor de desarrollo:
npm run dev

Abre http://localhost:5173 en tu navegador para jugar.

📦 Construir para producción (opcional):
npm run build

Genera archivos estáticos en dist/.

👀 Previsualizar el build (opcional):
npm run preview

Abre http://localhost:4173 para probar el build.

🎲 Instrucciones de Juego

🕹️ Controles:
⬅️ Flecha Izquierda: Mover pieza a la izquierda.
➡️ Flecha Derecha: Mover pieza a la derecha.
⬇️ Flecha Abajo: Bajar pieza más rápido.
⬆️ Flecha Arriba: Rotar pieza.
❇️ Espacio: Dejar caer la pieza instantáneamente.

🎯 Objetivo: Acomoda las piezas para completar líneas horizontales, sumando puntos.
🏁 Fin del Juego: Si las piezas llegan arriba, aparece un modal con botón de reinicio.

🤝 Contribuir
¡Tus ideas son bienvenidas! 🌟 Para contribuir:

🍴 Haz un fork del repositorio.
🌱 Crea una nueva rama (git checkout -b rama-caracteristica).
✍️ Real
