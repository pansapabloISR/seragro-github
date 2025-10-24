import Vapi from "@vapi-ai/web";

// ==========================================
// CONFIGURACIÓN
// ==========================================
const CONFIG = {
    whatsappPhone: "5493465432688",
    whatsappMessage: "Hola, vengo desde el sitio de SER AGRO",
    vapiPublicKey: "5a29292f-d9cc-4a21-bb7e-ff8df74763cd",
    vapiAssistantId: "776543a0-f4a2-4ed7-ad7a-f1fe0f6fd4d4",
    primaryColor: "#2E7D32",
    secondaryColor: "#1B5E20",
    whatsappColor: "#25D366",
};

let menuOpen = false;
let vapiClient = null;
let inCall = false;

// ==========================================
// INICIALIZAR CLIENTE VAPI
// ==========================================
function initVapiClient() {
    if (!vapiClient) {
        vapiClient = new Vapi(CONFIG.vapiPublicKey);

        // Eventos del cliente Vapi
        vapiClient.on("call-start", () => {
            console.log("✅ Llamada iniciada");
            inCall = true;
            showCallIndicator();
        });

        vapiClient.on("call-end", () => {
            console.log("✅ Llamada finalizada");
            inCall = false;
            hideCallIndicator();
        });

        vapiClient.on("error", (error) => {
            console.error("❌ Error en Vapi:", error);
            alert(
                "Ocurrió un error durante la llamada. Por favor, intentá de nuevo.",
            );
            inCall = false;
            hideCallIndicator();
        });

        vapiClient.on("speech-start", () => {
            console.log("🎤 Usuario comenzó a hablar");
        });

        vapiClient.on("speech-end", () => {
            console.log("🎤 Usuario dejó de hablar");
        });

        vapiClient.on("volume-level", (level) => {
            // Opcional: podés usar esto para mostrar un indicador visual
            // console.log('🔊 Nivel de volumen:', level);
        });
    }
}

// ==========================================
// FUNCIONES DE LLAMADA
// ==========================================
async function startVapiCall() {
    try {
        initVapiClient();

        console.log("📞 Iniciando llamada con Vapi...");

        await vapiClient.start(CONFIG.vapiAssistantId);

        console.log("✅ Llamada conectada exitosamente");
    } catch (error) {
        console.error("❌ Error al iniciar llamada:", error);
        alert(
            "No se pudo conectar la llamada. Por favor, verificá tu conexión e intentá nuevamente.",
        );
        inCall = false;
        hideCallIndicator();
    }
}

function endVapiCall() {
    if (vapiClient && inCall) {
        console.log("📴 Finalizando llamada...");
        vapiClient.stop();
    }
}

// ==========================================
// FUNCIONES DE WHATSAPP
// ==========================================
function openWhatsApp() {
    const message = encodeURIComponent(CONFIG.whatsappMessage);
    const whatsappURL = `https://wa.me/${CONFIG.whatsappPhone}?text=${message}`;
    window.open(whatsappURL, "_blank");
    closeMenu();
}

// ==========================================
// FUNCIONES DE MENÚ
// ==========================================
function toggleMenu() {
    const menu = document.getElementById("unified-contact-menu");
    const button = document.getElementById("unified-contact-button");

    if (!menu || !button) return;

    menuOpen = !menuOpen;

    if (menuOpen) {
        menu.classList.add("active");
        button.classList.add("active");
    } else {
        menu.classList.remove("active");
        button.classList.remove("active");
    }
}

function closeMenu() {
    const menu = document.getElementById("unified-contact-menu");
    const button = document.getElementById("unified-contact-button");

    if (menu) menu.classList.remove("active");
    if (button) button.classList.remove("active");
    menuOpen = false;
}

// ==========================================
// INDICADOR DE LLAMADA
// ==========================================
function showCallIndicator() {
    const overlay = document.getElementById("call-overlay");
    const indicator = document.getElementById("call-indicator");
    const mainButton = document.getElementById("unified-contact-button");

    if (overlay) {
        overlay.style.display = "block";
        setTimeout(() => overlay.classList.add("active"), 10);
    }

    if (indicator) {
        indicator.style.display = "flex";
        setTimeout(() => indicator.classList.add("active"), 10);
    }

    if (mainButton) {
        mainButton.style.display = "none";
    }

    closeMenu();
}

function hideCallIndicator() {
    const overlay = document.getElementById("call-overlay");
    const indicator = document.getElementById("call-indicator");
    const mainButton = document.getElementById("unified-contact-button");

    if (overlay) {
        overlay.classList.remove("active");
        setTimeout(() => (overlay.style.display = "none"), 300);
    }

    if (indicator) {
        indicator.classList.remove("active");
        setTimeout(() => (indicator.style.display = "none"), 300);
    }

    if (mainButton) {
        mainButton.style.display = "flex";
    }
}

// ==========================================
// CREAR ELEMENTOS DEL DOM
// ==========================================
function createContactElements() {
    // Verificar si ya existen los elementos
    if (document.getElementById("unified-contact-button")) {
        console.log("⚠️ Elementos de contacto ya existen");
        return;
    }

    // Crear overlay para el fondo oscuro durante la llamada
    const overlay = document.createElement("div");
    overlay.id = "call-overlay";
    overlay.className = "call-overlay";
    document.body.appendChild(overlay);

    // Crear indicador de llamada (centrado en pantalla)
    const indicator = document.createElement("div");
    indicator.id = "call-indicator";
    indicator.className = "call-indicator";
    indicator.innerHTML = `
        <div class="pulse-dot"></div>
        <span style="font-size: 18px; font-weight: 600; margin: 10px 0;">En llamada...</span>
        <button class="end-call-btn" id="end-call-btn">
            <span style="font-size: 24px; margin-right: 8px;">✕</span>
            COLGAR
        </button>
    `;
    document.body.appendChild(indicator);

    // Crear contenedor principal
    const container = document.createElement("div");
    container.id = "unified-contact-container";
    container.className = "unified-contact-container";

    // Crear menú de opciones
    const menu = document.createElement("div");
    menu.id = "unified-contact-menu";
    menu.className = "unified-contact-menu";
    menu.innerHTML = `
        <button class="contact-option" id="call-option">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>Llamar</span>
        </button>
        <button class="contact-option" id="whatsapp-option">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>WhatsApp</span>
        </button>
    `;

    // Crear botón principal
    const button = document.createElement("button");
    button.id = "unified-contact-button";
    button.className = "unified-contact-button";
    button.innerHTML = `
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span class="button-text">Hablá con nosotros</span>
    `;

    // Ensamblar todo
    container.appendChild(menu);
    container.appendChild(button);
    document.body.appendChild(container);

    // Event Listeners
    button.addEventListener("click", toggleMenu);

    document.getElementById("call-option").addEventListener("click", () => {
        closeMenu();
        startVapiCall();
    });

    document
        .getElementById("whatsapp-option")
        .addEventListener("click", openWhatsApp);

    document
        .getElementById("end-call-btn")
        .addEventListener("click", endVapiCall);

    // Cerrar menú al hacer click fuera
    document.addEventListener("click", (e) => {
        if (
            menuOpen &&
            !container.contains(e.target) &&
            !menu.contains(e.target)
        ) {
            closeMenu();
        }
    });

    console.log("✅ Sistema de contacto unificado inicializado");
}

// ==========================================
// ESTILOS CSS
// ==========================================
function injectStyles() {
    if (document.getElementById("unified-contact-styles")) {
        console.log("⚠️ Estilos ya inyectados");
        return;
    }

    const style = document.createElement("style");
    style.id = "unified-contact-styles";
    style.textContent = `
        /* ==========================================
           OVERLAY FONDO OSCURO
           ========================================== */
        .call-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.85);
            z-index: 9999;
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .call-overlay.active {
            opacity: 1;
        }

        /* ==========================================
           INDICADOR DE LLAMADA (CENTRADO)
           ========================================== */
        .call-indicator {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(211, 47, 47, 0.95);
            color: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            display: none;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            z-index: 10000;
            text-align: center;
            min-width: 280px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .call-indicator.active {
            opacity: 1;
        }

        /* ==========================================
           PUNTO PULSANTE (INDICADOR DE LLAMADA)
           ========================================== */
        .pulse-dot {
            width: 20px;
            height: 20px;
            background: white;
            border-radius: 50%;
            animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.3);
                opacity: 0.7;
            }
        }

        /* ==========================================
           BOTÓN COLGAR
           ========================================== */
        .end-call-btn {
            background: white;
            border: none;
            color: #d32f2f;
            border-radius: 12px;
            padding: 16px 32px;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 180px;
            font-family: 'Open Sans', sans-serif;
        }

        .end-call-btn:hover {
            background: #f5f5f5;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        .end-call-btn:active {
            transform: translateY(0);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        /* ==========================================
           CONTENEDOR PRINCIPAL
           ========================================== */
        .unified-contact-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9998;
            font-family: 'Open Sans', sans-serif;
        }

        /* ==========================================
           MENÚ DE OPCIONES
           ========================================== */
        .unified-contact-menu {
            position: absolute;
            bottom: 80px;
            right: 0;
            background: white;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            padding: 8px;
            min-width: 200px;
            opacity: 0;
            transform: translateY(10px);
            pointer-events: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .unified-contact-menu.active {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }

        /* ==========================================
           OPCIONES DE CONTACTO
           ========================================== */
        .contact-option {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 14px 16px;
            border: none;
            background: white;
            color: #333;
            font-size: 16px;
            font-weight: 600;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: 'Open Sans', sans-serif;
        }

        .contact-option:hover {
            background: #f5f5f5;
            transform: translateX(-4px);
        }

        .contact-option:active {
            transform: translateX(-2px);
        }

        .contact-option svg {
            flex-shrink: 0;
        }

        .contact-option:first-child {
            color: ${CONFIG.primaryColor};
        }

        .contact-option:last-child {
            color: ${CONFIG.whatsappColor};
        }

        /* ==========================================
           BOTÓN PRINCIPAL
           ========================================== */
        .unified-contact-button {
            width: 280px;
            height: 64px;
            background: linear-gradient(135deg, ${CONFIG.primaryColor} 0%, ${CONFIG.secondaryColor} 100%);
            border: none;
            border-radius: 32px;
            color: white;
            font-size: 17px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 6px 24px rgba(46, 125, 50, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-family: 'Open Sans', sans-serif;
            padding: 0 24px;
        }

        .unified-contact-button:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 32px rgba(46, 125, 50, 0.5);
        }

        .unified-contact-button:active {
            transform: translateY(-2px);
        }

        .unified-contact-button.active {
            background: ${CONFIG.secondaryColor};
        }

        .unified-contact-button svg {
            flex-shrink: 0;
        }

        /* ==========================================
           RESPONSIVE - TABLETS
           ========================================== */
        @media (max-width: 768px) {
            .unified-contact-button {
                width: 240px;
                height: 56px;
                font-size: 15px;
            }

            .call-indicator {
                padding: 32px;
                min-width: 240px;
            }

            .end-call-btn {
                padding: 14px 28px;
                font-size: 16px;
                min-width: 160px;
            }
        }

        /* ==========================================
           RESPONSIVE - MÓVILES
           ========================================== */
        @media (max-width: 480px) {
            .unified-contact-container {
                bottom: 16px;
                right: 16px;
            }

            .unified-contact-button {
                width: 200px;
                height: 52px;
                font-size: 14px;
                gap: 8px;
            }

            .unified-contact-button svg {
                width: 22px;
                height: 22px;
            }

            .button-text {
                font-size: 14px;
            }

            .unified-contact-menu {
                bottom: 70px;
                min-width: 180px;
            }

            .contact-option {
                font-size: 14px;
                padding: 12px 14px;
            }

            .contact-option svg {
                width: 20px;
                height: 20px;
            }

            .call-indicator {
                padding: 28px;
                min-width: 220px;
            }

            .end-call-btn {
                padding: 12px 24px;
                font-size: 15px;
                min-width: 140px;
            }
        }

        /* ==========================================
           ANIMACIÓN DE ENTRADA
           ========================================== */
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .unified-contact-container {
            animation: slideInUp 0.5s ease-out;
        }
    `;

    document.head.appendChild(style);
    console.log("✅ Estilos inyectados");
}

// ==========================================
// INICIALIZACIÓN
// ==========================================
function init() {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            injectStyles();
            createContactElements();
        });
    } else {
        injectStyles();
        createContactElements();
    }
}

// Inicializar el sistema
init();

export { startVapiCall, endVapiCall, openWhatsApp };
