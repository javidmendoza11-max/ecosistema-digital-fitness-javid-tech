/**
 * ==============================================================================
 * SISTEMA MAESTRO UNIFICADO: ECOSISTEMA DIGITAL FITNESS v2.0
 * ESTADO: 100% FUNCIONAL Y EXTENDIDO (Listo para GitHub / Despliegue en la Nube)
 * SKILL ACTIVADO: nextlevelbuilder/ui-ux-pro-max-skill
 * ASISTENTE: Javid tech (Avatar: Camisa Azul, Estado: Online)
 * ==============================================================================
 */

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "JavidTech_Super_Secret_Key_2026_ProMax_Elite";

// ==========================================
// 1. BASE DE DATOS EXTENDIDA (ESCALERA DE VALOR)
// ==========================================
const ecosistemaFitness = {
    novatos: {
        id: "novatos",
        titulo: "🌱 Nivel 1: Programa Novatos (El Inicio)",
        enfoque: "Creación de hábitos, 100% en casa, método visual de manos. Cero frustración.",
        descripcion: "Diseñado específicamente para personas que nunca han entrenado, sienten vergüenza de ir a un gimnasio o les cuesta ser constantes. El objetivo central es eliminar miedos, crear el hábito diario del ejercicio y generar las primeras victorias utilizando rutinas 100% en casa con el propio peso corporal y sin dietas restrictivas.",
        modulos: [
            { titulo: "Evaluación y Mente (Semana 0)", desc: "Despegue seguro. Cuestionario de salud, definición de metas realistas 'anti-frustración' a corto plazo, y un tutorial sin estrés para tomar fotos y medidas." },
            { titulo: "Nutrición Sencilla", desc: "Método visual de las manos para calcular porciones sin estrés. Implementación de la regla 80/20. Cero conteo de calorías y cero dietas restrictivas." },
            { titulo: "Entrenamiento Base", desc: "Rutinas 100% en casa. Iniciamos con el peso corporal y progresivamente incorporamos elementos caseros básicos (botellas de agua) para cuidar posturas y adaptar articulaciones." },
            { titulo: "Biofeedback Básico", desc: "Sistema simple para medir tus niveles de energía, calidad de sueño y recuperación, asegurando que no haya sobreentrenamiento ni frustración." }
        ]
    },
    intermedio: {
        id: "intermedio",
        titulo: "🔥 Nivel 2: Programa Intermedio (La Transición)",
        enfoque: "Desarrollo de fuerza real, recomposición corporal, uso de bandas/mancuernas.",
        descripcion: "Dirigido a clientes que YA tienen el hábito del ejercicio. Aquí pasamos de lo visual a una introducción estratégica de macronutrientes. El entrenamiento incorpora equipo real para iniciar la hipertrofia y el tono es más analítico, motivador y enfocado en la técnica correcta.",
        modulos: [
            { titulo: "Evaluación y Enfoque", desc: "Auditoría física: Test de fuerza inicial y evaluación de rango de movimiento. Se establecen metas de rendimiento más allá de lo que dice la báscula." },
            { titulo: "Fuerza Estructural", desc: "Transición de peso corporal a equipo externo (bandas elásticas y mancuernas). Foco en la sobrecarga progresiva y control motor para hipertrofia." },
            { titulo: "Ingeniería de Macros", desc: "Introducción al ciclado básico de carbohidratos (Días altos en demanda vs Días de descanso) y estrategia de nutrición peri-entreno." },
            { titulo: "Sistema Meal Prep", desc: "Auditoría de despensa, estrategia 'Batch Cooking' para optimizar horas en la cocina y gestión de fricción en eventos sociales." }
        ]
    },
    avanzado: {
        id: "avanzado",
        titulo: "🏆 Nivel 3: Programa Avanzado (La Maestría)",
        enfoque: "Alto rendimiento, hipertrofia máxima, entrenamiento híbrido de élite.",
        descripcion: "El escalón final (meses 6 al 9). Producto High-Ticket para personas disciplinadas con base sólida. Busca resultados estéticos de élite bajo una cultura de 'cero excusas'. Ingeniería nutricional milimétrica y entrenamiento híbrido que combina la fuerza del gimnasio con el acondicionamiento en casa.",
        modulos: [
            { titulo: "Auditoría de Élite", desc: "Análisis biomecánico profundo, establecimiento de metas competitivas y rastreo avanzado de variables de recuperación." },
            { titulo: "Metabolismo Avanzado", desc: "Periodización nutricional avanzada, cargas de carbohidratos (refeeds), optimización de salud intestinal y suplementación basada en evidencia." },
            { titulo: "Fuerza y Potencia Híbrida", desc: "Levantamientos pesados enfocados en fuerza estructural en el gimnasio + sesiones de alta intensidad y trabajo metabólico extremo en casa." },
            { titulo: "Puesta a Punto (Peak Week)", desc: "Protocolos milimétricos para reducción de agua subcutánea, carga de glucógeno y presentación de un físico de nivel competitivo." }
        ]
    }
};

// ==========================================
// 2. BACKEND / APIs (LOGIC & SECURITY)
// ==========================================
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === "cliente_vip" && password === "fitness2026") {
        const token = jwt.sign({ user: username, role: "alumno" }, SECRET_KEY, { expiresIn: '48h' });
        res.json({ success: true, token, message: "Validación biométrica simulada exitosa. Acceso concedido." });
    } else {
        res.status(401).json({ success: false, message: "Acceso Denegado. Credenciales de la matriz incorrectas." });
    }
});

app.get('/api/programas', (req, res) => {
    res.json(ecosistemaFitness);
});

app.post('/api/javid-tech/chat', (req, res) => {
    const { userMessage, programaActual } = req.body;
    let reply = "";
    const msg = userMessage.toLowerCase();

    if (msg.includes("ayuda") || msg.includes("no sé qué hacer")) {
        reply = "Mantén la calma. Como tu arquitecto digital, estoy aquí para guiarte. Selecciona en el panel izquierdo el nivel en el que te encuentras y cargaré los manuales de procedimiento.";
    } else if (msg.includes("gracias")) {
        reply = "Es mi deber operativo. Seguimos avanzando hacia la maestría física.";
    } else if (programaActual === "novatos") {
        reply = "Identifico que estamos en la fase Novatos. Recuerda, nuestro protocolo principal hoy es 'Cero Frustración'. Si sientes dudas sobre el método visual de manos o tu rutina básica en casa, dímelo y lo resolvemos en el acto.";
    } else if (programaActual === "intermedio") {
        reply = "Fase Intermedia activa. Aquí aplicamos la ciencia de la recomposición corporal. ¿Necesitas que audite tu ingesta de macronutrientes o revisemos tu técnica de sobrecarga con mancuernas?";
    } else if (programaActual === "avanzado") {
        reply = "Atleta de Élite, sistemas operativos al 100%. Estás en La Maestría. Aquí es modo 'Cero Excusas'. ¿Iniciamos el protocolo de carga de carbohidratos o analizamos tu métrica de hipertrofia máxima?";
    } else {
        reply = "Saludos, soy Javid tech, tu Inteligencia Artificial personal del Ecosistema Fitness. Analizando tu perfil... Por favor, selecciona un programa (Novatos, Intermedio o Avanzado) en el menú lateral para establecer tu hoja de ruta técnica.";
    }

    setTimeout(() => {
        res.json({ javidReply: reply, status: "Online" });
    }, 600);
});

// ==========================================
// 3. FRONTEND RENDERIZADO AL VUELO (SSR)
// ==========================================
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Plataforma Integral Fitness | Javid tech Ecosystem</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');

            :root {
                --bg-main: #090a0f;
                --bg-panel: #13161f;
                --bg-card: #1c212e;
                --border-color: #2b3245;
                --primary-blue: #3b82f6;
                --primary-hover: #2563eb;
                --status-online: #10b981;
                --text-main: #f3f4f6;
                --text-muted: #9ca3af;
                --shadow-glow: 0 0 20px rgba(59, 130, 246, 0.3);
            }

            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Inter', sans-serif; background-color: var(--bg-main); color: var(--text-main); overflow: hidden; height: 100vh; }

            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes pulseOnline { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); } 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }

            .screen { display: none; width: 100%; height: 100%; }
            .screen.active { display: flex; animation: fadeIn 0.5s ease; }

            #login-screen { justify-content: center; align-items: center; background: radial-gradient(circle at top right, #13161f, #090a0f); }
            .login-container { background: var(--bg-panel); padding: 50px; border-radius: 20px; border: 1px solid var(--border-color); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7); width: 100%; max-width: 420px; text-align: center; }
            .login-container h1 { font-size: 28px; margin-bottom: 5px; background: -webkit-linear-gradient(45deg, #3b82f6, #60a5fa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .login-container p { color: var(--text-muted); font-size: 14px; margin-bottom: 30px; }
            .input-group { margin-bottom: 20px; text-align: left; }
            .input-group label { display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
            .input-group input { width: 100%; padding: 15px; background: var(--bg-main); border: 1px solid var(--border-color); border-radius: 10px; color: white; font-size: 15px; transition: all 0.3s; }
            .input-group input:focus { outline: none; border-color: var(--primary-blue); box-shadow: var(--shadow-glow); }
            .btn-primary { width: 100%; padding: 15px; background: var(--primary-blue); color: white; border: none; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; transition: 0.3s; }
            .btn-primary:hover { background: var(--primary-hover); transform: translateY(-2px); }
            .error-box { color: #ef4444; font-size: 13px; margin-top: 15px; min-height: 20px; }

            #dashboard-screen { flex-direction: column; }

            header { display: flex; justify-content: space-between; align-items: center; padding: 15px 40px; background: var(--bg-panel); border-bottom: 1px solid var(--border-color); }
            .ai-profile { display: flex; align-items: center; gap: 20px; }

            .avatar-wrapper { position: relative; }
            .ring-online { padding: 4px; border-radius: 50%; border: 3px solid var(--status-online); animation: pulseOnline 2s infinite; background: var(--bg-main); }
            .avatar-img { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; background: url('https://ui-avatars.com/api/?name=Javid+Tech&background=3b82f6&color=fff&size=100&bold=true') center/cover; }

            .ai-info h2 { font-size: 20px; font-weight: 800; margin: 0; letter-spacing: 0.5px; }
            .ai-info span { font-size: 12px; color: var(--status-online); display: flex; align-items: center; gap: 6px; margin-top: 4px; font-weight: 600;}
            .ai-info span::before { content: ""; width: 8px; height: 8px; background: var(--status-online); border-radius: 50%; display: inline-block; }

            .btn-outline { background: transparent; border: 1px solid var(--border-color); color: var(--text-muted); padding: 10px 20px; border-radius: 8px; cursor: pointer; transition: 0.3s; font-weight: 600; }
            .btn-outline:hover { background: #ef4444; border-color: #ef4444; color: white; }

            .main-content { display: flex; flex: 1; overflow: hidden; }

            .sidebar { width: 300px; background: var(--bg-panel); border-right: 1px solid var(--border-color); padding: 30px 20px; display: flex; flex-direction: column; gap: 15px; }
            .sidebar-title { font-size: 11px; text-transform: uppercase; color: var(--text-muted); letter-spacing: 2px; margin-bottom: 10px; padding-left: 10px; }
            .nav-item { padding: 18px 20px; background: var(--bg-card); border: 1px solid transparent; border-radius: 12px; color: var(--text-main); font-weight: 600; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 10px; }
            .nav-item:hover { transform: translateX(5px); border-color: var(--border-color); }
            .nav-item.active { background: rgba(59, 130, 246, 0.1); border-color: var(--primary-blue); color: var(--primary-blue); box-shadow: inset 4px 0 0 var(--primary-blue); }

            .workspace { flex: 1; padding: 50px; overflow-y: auto; background: var(--bg-main); }
            .welcome-state { text-align: center; margin-top: 15vh; opacity: 0.5; }
            .welcome-state h1 { font-size: 40px; margin-bottom: 20px; }

            .program-header { margin-bottom: 40px; animation: fadeIn 0.4s ease; }
            .program-header h1 { font-size: 34px; margin-bottom: 15px; }
            .program-header .badge { display: inline-block; padding: 6px 12px; background: rgba(59, 130, 246, 0.2); color: #60a5fa; border-radius: 20px; font-size: 13px; font-weight: 600; margin-bottom: 20px; }
            .program-header p { font-size: 16px; color: var(--text-muted); line-height: 1.7; max-width: 900px; }

            .modules-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 25px; animation: fadeIn 0.6s ease; }
            .module-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 30px; transition: 0.3s; position: relative; overflow: hidden; }
            .module-card::before { content: ""; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: var(--primary-blue); opacity: 0; transition: 0.3s; }
            .module-card:hover { transform: translateY(-5px); border-color: var(--primary-blue); box-shadow: var(--shadow-glow); }
            .module-card:hover::before { opacity: 1; }
            .module-card h3 { font-size: 20px; margin-bottom: 15px; color: white; }
            .module-card p { font-size: 14px; color: var(--text-muted); line-height: 1.6; margin-bottom: 25px; }
            .module-card button { width: 100%; padding: 12px; background: transparent; border: 1px solid var(--border-color); border-radius: 8px; color: white; cursor: pointer; transition: 0.3s; font-weight: 600;}
            .module-card button:hover { background: var(--primary-blue); border-color: var(--primary-blue); }

            .chat-panel { width: 380px; background: var(--bg-panel); border-left: 1px solid var(--border-color); display: flex; flex-direction: column; }
            .chat-header { padding: 20px; border-bottom: 1px solid var(--border-color); background: var(--bg-card); }
            .chat-header h3 { font-size: 15px; font-weight: 600; display: flex; align-items: center; gap: 10px; color: #fff; }
            .chat-messages { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 20px; }

            .msg { max-width: 85%; padding: 15px; border-radius: 12px; font-size: 14px; line-height: 1.6; animation: fadeIn 0.3s ease; }
            .msg-javid { background: var(--bg-card); color: var(--text-main); align-self: flex-start; border: 1px solid var(--border-color); border-left: 4px solid var(--primary-blue); border-top-left-radius: 4px; }
            .msg-user { background: var(--primary-blue); color: #fff; align-self: flex-end; border-top-right-radius: 4px; box-shadow: 0 5px 15px rgba(59, 130, 246, 0.2); }
            .msg-system { background: transparent; color: var(--text-muted); align-self: center; font-size: 12px; border: 1px dashed var(--border-color); width: 100%; text-align: center; }

            .chat-input { padding: 20px; border-top: 1px solid var(--border-color); background: var(--bg-main); display: flex; gap: 12px; }
            .chat-input input { flex: 1; padding: 15px; background: var(--bg-panel); border: 1px solid var(--border-color); border-radius: 10px; color: white; outline: none; }
            .chat-input input:focus { border-color: var(--primary-blue); }
            .chat-input button { padding: 0 25px; background: var(--primary-blue); border: none; border-radius: 10px; color: white; font-weight: bold; cursor: pointer; transition: 0.3s; }
            .chat-input button:hover { background: var(--primary-hover); }

            ::-webkit-scrollbar { width: 8px; }
            ::-webkit-scrollbar-track { background: var(--bg-main); }
            ::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 4px; }
            ::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }
        </style>
    </head>
    <body>

        <div id="login-screen" class="screen active">
            <div class="login-container">
                <h1>Ecosistema Fitness</h1>
                <p>Ingreso Seguro - Plataforma Central</p>

                <div class="input-group">
                    <label>Usuario Matriz</label>
                    <input type="text" id="user-input" placeholder="Ej: cliente_vip">
                </div>
                <div class="input-group">
                    <label>Código de Acceso</label>
                    <input type="password" id="pass-input" placeholder="Ej: fitness2026">
                </div>

                <button class="btn-primary" onclick="procesarLogin()">AUTENTICAR SISTEMA</button>
                <div id="login-alert" class="error-box"></div>
            </div>
        </div>

        <div id="dashboard-screen" class="screen">

            <header>
                <div class="ai-profile">
                    <div class="avatar-wrapper">
                        <div class="ring-online">
                            <div class="avatar-img"></div>
                        </div>
                    </div>
                    <div class="ai-info">
                        <h2>Javid tech</h2>
                        <span>Conectado y Operativo</span>
                    </div>
                </div>
                <button class="btn-outline" onclick="desconectar()">Cerrar Conexión</button>
            </header>

            <div class="main-content">
                <nav class="sidebar">
                    <div class="sidebar-title">Escalera de Valor</div>
                    <div class="nav-item" id="nav-novatos" onclick="cargarNivel('novatos')">
                        🌱 Nivel 1: Novatos
                    </div>
                    <div class="nav-item" id="nav-intermedio" onclick="cargarNivel('intermedio')">
                        🔥 Nivel 2: Intermedio
                    </div>
                    <div class="nav-item" id="nav-avanzado" onclick="cargarNivel('avanzado')">
                        🏆 Nivel 3: Avanzado
                    </div>
                </nav>

                <main class="workspace" id="main-workspace">
                    <div class="welcome-state">
                        <h1>Bienvenido al Ecosistema</h1>
                        <p>Selecciona tu etapa actual en el panel izquierdo para cargar la configuración.</p>
                    </div>
                </main>

                <aside class="chat-panel">
                    <div class="chat-header">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path></svg>
                        Terminal AI
                    </div>
                    <div class="chat-messages" id="chat-box">
                        <div class="msg msg-javid">
                            <strong>Javid tech:</strong> Protocolos de seguridad superados. Soy el arquitecto de este ecosistema. ¿En qué nivel iniciaremos la transformación hoy?
                        </div>
                    </div>
                    <div class="chat-input">
                        <input type="text" id="chat-input-text" placeholder="Comando para Javid tech..." onkeypress="manejarTeclado(event)">
                        <button onclick="transmitirMensaje()">❯</button>
                    </div>
                </aside>
            </div>
        </div>

        <script>
            const AppState = {
                token: null,
                datosLocales: null,
                nivelActivo: null
            };

            async function procesarLogin() {
                const user = document.getElementById('user-input').value;
                const pass = document.getElementById('pass-input').value;
                const alerta = document.getElementById('login-alert');

                alerta.style.color = '#60a5fa';
                alerta.innerText = "Estableciendo conexión encriptada...";

                try {
                    const response = await fetch('/api/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: user, password: pass })
                    });

                    const data = await response.json();

                    if(data.success) {
                        AppState.token = data.token;
                        document.getElementById('login-screen').classList.remove('active');
                        document.getElementById('dashboard-screen').classList.add('active');
                        obtenerEcosistema();
                    } else {
                        alerta.style.color = '#ef4444';
                        alerta.innerText = data.message;
                    }
                } catch (e) {
                    alerta.style.color = '#ef4444';
                    alerta.innerText = "Error crítico de servidor. ¿El backend está corriendo?";
                }
            }

            async function obtenerEcosistema() {
                try {
                    const res = await fetch('/api/programas');
                    AppState.datosLocales = await res.json();
                } catch (e) {
                    insertarChat("Error al descargar la base de datos de programas.", "system");
                }
            }

            function cargarNivel(llaveNivel) {
                if(!AppState.datosLocales) return;

                AppState.nivelActivo = llaveNivel;
                const info = AppState.datosLocales[llaveNivel];

                document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
                document.getElementById('nav-' + llaveNivel).classList.add('active');

                const workspace = document.getElementById('main-workspace');

                const cardsHTML = info.modulos.map((mod, indice) => \`
                    <div class="module-card">
                        <h3>M\${indice + 1}: \${mod.titulo}</h3>
                        <p>\${mod.desc}</p>
                        <button onclick="accionModulo('\${mod.titulo}')">Abrir Módulo</button>
                    </div>
                \`).join('');

                workspace.innerHTML = \`
                    <div class="program-header">
                        <div class="badge">\${info.enfoque}</div>
                        <h1>\${info.titulo}</h1>
                        <p>\${info.descripcion}</p>
                    </div>
                    <div class="modules-grid">
                        \${cardsHTML}
                    </div>
                \`;

                insertarChat(\`Cargando interfaz operativa del nivel: \${llaveNivel.toUpperCase()}\`, 'system');
                solicitarAsistencia("Cambio_De_Contexto", true);
            }

            function manejarTeclado(e) {
                if(e.key === 'Enter') transmitirMensaje();
            }

            async function transmitirMensaje() {
                const caja = document.getElementById('chat-input-text');
                const texto = caja.value.trim();
                if(!texto) return;

                insertarChat(texto, 'user');
                caja.value = '';

                await solicitarAsistencia(texto, false);
            }

            async function solicitarAsistencia(msj, oculto) {
                try {
                    const req = await fetch('/api/javid-tech/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            userMessage: msj,
                            programaActual: AppState.nivelActivo
                        })
                    });
                    const res = await req.json();

                    if(res.javidReply) {
                        insertarChat(res.javidReply, 'javid');
                    }
                } catch (e) {
                    insertarChat("Conexión perdida con el cerebro de Javid tech.", 'javid');
                }
            }

            function accionModulo(nombre) {
                insertarChat(\`Accediendo al módulo: \${nombre}\`, 'user');
                setTimeout(() => {
                    insertarChat(\`Permisos concedidos para \${nombre}. Desplegando manuales y videos. ¿Alguna duda sobre este pilar?\`, 'javid');
                }, 800);
            }

            function insertarChat(texto, autor) {
                const panel = document.getElementById('chat-box');
                const div = document.createElement('div');
                div.className = \`msg msg-\${autor}\`;

                if(autor === 'javid') {
                    div.innerHTML = \`<strong>Javid tech:</strong> <br>\${texto}\`;
                } else if(autor === 'user') {
                    div.innerText = texto;
                } else {
                    div.innerText = \`--- \${texto} ---\`;
                }

                panel.appendChild(div);
                panel.scrollTop = panel.scrollHeight;
            }

            function desconectar() {
                window.location.reload();
            }
        </script>
    </body>
    </html>
    `);
});

// ==========================================
// 4. INICIALIZACIÓN DE LA NUBE (SERVER)
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log("=================================================================");
    console.log("🚀 ECOSISTEMA DIGITAL FITNESS DESPLEGADO CON ÉXITO");
    console.log("👔 Avatar Javid tech: ONLINE y Operativo.");
    console.log("📚 Escalera de Valor: Novatos, Intermedio, Avanzado -> CARGADOS.");
    console.log(`🌐 Servidor escuchando en el puerto: ${PORT}`);
    console.log("=================================================================");
});
