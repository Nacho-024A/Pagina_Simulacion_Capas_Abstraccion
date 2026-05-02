# 🖥️ Capas de Abstracción — Sitio Educativo

Sitio web educativo e interactivo que explica cómo funciona un computador por dentro, desde los transistores hasta las aplicaciones que usamos a diario. Diseñado para que cualquier persona, sin importar su nivel técnico, pueda entender estos conceptos de forma visual y sencilla.

---

## Ver el sitio

(Aun no disponible)

---

## 📁 Estructura del repositorio

```
📦 proyecto/
│
├── index.html            ← Página de inicio
├── capas.html            ← Simulación de capas de abstracción
├── whatsapp.html         ← Simulador del flujo de un mensaje
├── binario.html          ← Convertidor binario ↔ decimal
│
├── css/
│   └── styles.css        ← Estilos globales compartidos
│
└── js/
    ├── nav.js            ← Lógica del menú de navegación
    ├── capas.js          ← Lógica simulación de capas
    ├── whatsapp.js       ← Lógica simulador WhatsApp
    └── binario.js        ← Lógica convertidor binario
```

---

## 📄 Páginas

### 🏠 Inicio (`index.html`)
Presentación del sitio: propósito, contenido disponible y guía de navegación.

### 🔬 Simulación de Capas (`capas.html`)
Recorre de forma interactiva las 5 capas de abstracción de un computador:
- Transistores / Hardware
- Lenguaje máquina (bits)
- Sistema operativo
- Lenguaje de programación
- Aplicación

### 📱 Simulador de Flujo WhatsApp (`whatsapp.html`)
Visualiza paso a paso qué ocurre cuando envías un mensaje de WhatsApp:
- La app llama a la función `Enviar_mensaje()`
- El lenguaje (Java/Kotlin) procesa la instrucción
- El sistema operativo delega al módulo de red
- El mensaje se convierte en binario
- Viaja por la red hasta el destinatario
- El proceso se invierte en el dispositivo receptor

### 🔢 Convertidor Binario ↔ Decimal (`binario.html`)
Convierte números entre binario y decimal mostrando el proceso paso a paso:
- **Binario → Decimal:** suma de dígito × 2 elevado a la posición
- **Decimal → Binario:** divisiones sucesivas entre 2

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura de cada página |
| CSS3 | Estilos y diseño visual |
| JavaScript (Vanilla) | Interactividad y simulaciones |

Sin frameworks, sin dependencias externas. Funciona directamente en el navegador.

---

## 👨‍💻 Autor

Andres David Osorio Moreno
"Hecho para enseñar cómo funciona la tecnología que usamos todos los días."