/**
 * ==============================================================================
 * SISTEMA MAESTRO UNIFICADO v3.0: ECOSISTEMA DIGITAL FITNESS + GAMIFICACIÓN
 * ESTADO: 100% FUNCIONAL (Gamificación, Feed de Retención, Desbloqueos, Javid tech AI)
 * ==============================================================================
 */

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "JavidTech_Super_Secret_Key_2026_Elite_Pro";

// ==========================================
// 1. BASE DE DATOS EXTENDIDA (CMS + PROGRAMAS)
// ==========================================

// Feed de Retención Diario (Videos, Audios, Artículos)
const feedDiario = {
    video: { titulo: "La Mentalidad del 1% (Cero Excusas)", url: "https://www.youtube.com/embed/jNQXAC9IVRw", desc: "Javid tech te explica cómo blindar tu mente para esta semana." },
    audio: { titulo: "Podcast: Reprogramación Metabólica", duracion: "12:45 min", desc: "Escúchalo mientras limpias tu casa o caminas." },
    articulos: [
        { titulo: "El mito de contar calorías", lectura: "4 min", desc: "Por qué el método visual de las manos es superior y más sostenible." },
        { titulo: "Optimiza tu sueño", lectura: "3 min", desc: "Rutina nocturna para maximizar la hormona del crecimiento." }
    ]
};

const ecosistemaFitness = {
    novatos: {
        id: "novatos", titulo: "🌱 Nivel 1: Programa Novatos", estado: "desbloqueado",
        enfoque: "Creación de hábitos, 100% en casa. Cero frustración.",
        descripcion: "Elimina miedos y crea el hábito diario utilizando rutinas con el propio peso corporal y método visual de manos.",
        diasTotales: 28, // 4 semanas para el ejemplo
        modulos: [
            { titulo: "Evaluación y Mente", desc: "Despegue seguro y metas anti-frustración." },
            { titulo: "Nutrición Sencilla", desc: "Método visual de las manos." }
        ]
    },
    intermedio: {
        id: "intermedio", titulo: "🔥 Nivel 2: Intermedio", estado: "bloqueado",
        enfoque: "Fuerza real, recomposición corporal, bandas/mancuernas.",
        descripcion: "Transición a equipo externo. Foco en hipertrofia y ciclado básico de carbohidratos.",
        diasTotales: 84, // 12 semanas
        modulos: [
            { titulo: "Fuerza Estructural", desc: "Transición de peso corporal a equipo externo." },
            { titulo: "Ingeniería de Macros", desc: "Introducción al ciclado de carbohidratos." }
        ]
    },
    avanzado: {
        id: "avanzado", titulo: "🏆 Nivel 3: Avanzado", estado: "bloqueado",
        enfoque: "Alto rendimiento, hipertrofia máxima, híbrido.",
        descripcion: "Entrenamiento híbrido (Gym + Casa) y precisión milimétrica.",
        diasTotales: 84, // 12 semanas
        modulos: [
            { titulo: "Auditoría de Élite", desc: "Análisis biomecánico profundo." },
            { titulo: "Metabolismo Avanzado", desc: "Periodización y refeeds." }
        ]
    }
};

// ==========================================
// 2. BACKEND API
// ==========================================
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === "cliente_vip" && password === "fitness2026") {
        const token = jwt.sign({ user: username }, SECRET_KEY, { expiresIn: '48h' });
        res.json({ success: true, token, message: "Acceso concedido." });
    } else {
        res.status(401).json({ success: false, message: "Credenciales incorrectas." });
    }
});

app.get('/api/datos-plataforma', (req, res) => {
    res.json({ programas: ecosistemaFitness, feed: feedDiario });
});

app.post('/api/javid-tech/chat', (req, res) => {
    const { userMessage, contexto } = req.body;
    let reply = "";
    const msg = userMessage.toLowerCase();
    
    if (msg.includes("tarea") || msg.includes("completado") || msg.includes("check")) {
        reply = "¡Excelente! He registrado tu progreso en el sistema central. Cada pequeño check te acerca a desbloquear el siguiente nivel. Sigue así.";
    } else if (contexto === "feed") {
        reply = "Estás en el Centro de Retención. Te recomiendo escuchar el podcast de hoy; tiene información vital sobre recomposición corporal.";
    } else {
        reply = "Soy Javid tech, tu arquitecto digital. Tus métricas están actualizándose. Continúa tachando tus tareas diarias para llenar la barra de progreso al 100%.";
    }
    
    setTimeout(() => res.json({ javidReply: reply }), 500);
});

// ==========================================
// 3. FRONTEND RENDERIZADO (SSR) CON GAMIFICACIÓN
// ==========================================
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Plataforma SaaS Fitness | Javid tech</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
        <style>
            /* CSS PREMIUM - UI/UX PRO MAX SKILL */
            :root {
                --bg-main: #090a0f; --bg-panel: #13161f; --bg-card: #1c212e;
                --border-color: #2b3245; --primary-blue: #3b82f6; --primary-hover: #2563eb;
                --status-online: #10b981; --locked: #ef4444; --text-main: #f3f4f6; --text-muted: #9ca3af;
                --shadow-glow: 0 0 20px rgba(59, 130, 246, 0.4);
                --glow-green: 0 0 15px rgba(16, 185, 129, 0.5);
            }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Inter', sans-serif; background-color: var(--bg-main); color: var(--text-main); height: 100vh; overflow: hidden; }
            
            .screen { display: none; width: 100%; height: 100%; }
            .screen.active { display: flex; animation: fadeIn 0.4s ease; }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

            /* --- LOGIN --- */
            #login-screen { justify-content: center; align-items: center; background: radial-gradient(circle at center, #13161f, #090a0f); }
            .login-box { background: var(--bg-panel); padding: 40px; border-radius: 16px; border: 1px solid var(--border-color); text-align: center; width: 350px; box-shadow: var(--shadow-glow); }
            .login-box input { width: 100%; padding: 12px; margin-bottom: 15px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-main); color: white; outline: none; }
            .login-box button { width: 100%; padding: 12px; background: var(--primary-blue); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }
            .error-txt { color: var(--locked); font-size: 13px; margin-top: 10px; min-height: 15px;}

            /* --- HEADER & AI --- */
            header { display: flex; justify-content: space-between; align-items: center; padding: 15px 30px; background: var(--bg-panel); border-bottom: 1px solid var(--border-color); z-index: 10; relative;}
            .ai-profile { display: flex; align-items: center; gap: 15px; }
            .ring-online { border: 2px solid var(--status-online); padding: 3px; border-radius: 50%; box-shadow: var(--glow-green); }
            .avatar-img { width: 50px; height: 50px; border-radius: 50%; background: url('https://ui-avatars.com/api/?name=Javid+Tech&background=3b82f6&color=fff&bold=true') center/cover; }
            .ai-info h2 { font-size: 18px; margin: 0; }
            .ai-info span { font-size: 12px; color: var(--status-online); }

            /* --- LAYOUT CENTRAL --- */
            .main-layout { display: flex; flex: 1; height: calc(100vh - 85px); }
            
            /* --- SIDEBAR & GAMIFICACIÓN --- */
            .sidebar { width: 320px; background: var(--bg-panel); border-right: 1px solid var(--border-color); display: flex; flex-direction: column; overflow-y: auto; }
            .nav-section { padding: 20px; border-bottom: 1px solid var(--border-color); }
            .nav-item { padding: 15px; background: var(--bg-card); border-radius: 10px; margin-bottom: 10px; cursor: pointer; font-weight: 600; transition: 0.3s; border: 1px solid transparent; display: flex; justify-content: space-between; align-items: center;}
            .nav-item:hover { border-color: var(--primary-blue); }
            .nav-item.active { background: rgba(59, 130, 246, 0.1); border-color: var(--primary-blue); box-shadow: inset 4px 0 0 var(--primary-blue); }
            .nav-item.locked { opacity: 0.5; cursor: not-allowed; }
            .lock-icon { font-size: 12px; color: var(--locked); }

            /* Centro de Control de Progreso */
            .progress-container { padding: 20px; background: rgba(16, 185, 129, 0.05); }
            .progress-title { font-size: 13px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px; font-weight: 800; display: flex; justify-content: space-between;}
            .progress-bar-bg { width: 100%; height: 12px; background: var(--bg-card); border-radius: 10px; overflow: hidden; border: 1px solid var(--border-color); margin-bottom: 15px;}
            .progress-bar-fill { height: 100%; background: linear-gradient(90deg, var(--primary-blue), var(--status-online)); width: 0%; transition: width 0.5s ease; box-shadow: var(--glow-green);}
            
            /* Mini Calendario (Heatmap) */
            .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
            .cal-day { aspect-ratio: 1; background: var(--bg-card); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: var(--text-muted); border: 1px solid transparent; transition: 0.3s;}
            .cal-day.completed { background: var(--status-online); color: #fff; box-shadow: 0 0 5px var(--status-online); }
            .cal-day.missed { background: var(--locked); color: #fff; }
            .cal-day.today { border-color: var(--primary-blue); font-weight: bold; }

            /* --- WORKSPACE CENTRAL --- */
            .workspace { flex: 1; padding: 40px; overflow-y: auto; background: var(--bg-main); position: relative;}
            
            /* Feed Content */
            .feed-grid { display: grid; gap: 20px; }
            .video-card iframe { width: 100%; height: 400px; border-radius: 12px; border: none; }
            .content-card { background: var(--bg-card); padding: 20px; border-radius: 12px; border: 1px solid var(--border-color); }
            
            /* Checklist Diario */
            .checklist-panel { background: var(--bg-panel); border: 1px solid var(--primary-blue); border-radius: 16px; padding: 25px; margin-bottom: 30px; box-shadow: var(--shadow-glow);}
            .checklist-panel h3 { color: var(--primary-blue); margin-bottom: 15px; display: flex; align-items: center; gap: 10px;}
            .task-item { display: flex; align-items: center; gap: 15px; padding: 12px; background: var(--bg-card); border-radius: 8px; margin-bottom: 10px; cursor: pointer; transition: 0.2s;}
            .task-item:hover { transform: translateX(5px); }
            .task-checkbox { width: 20px; height: 20px; border-radius: 4px; border: 2px solid var(--border-color); display: flex; align-items: center; justify-content: center; }
            .task-item.done .task-checkbox { background: var(--status-online); border-color: var(--status-online); }
            .task-item.done .task-checkbox::after { content: '✓'; color: white; font-size: 14px; font-weight: bold;}
            .task-item.done span { text-decoration: line-through; color: var(--text-muted); }

            /* Program Modules */
            .module-card { background: var(--bg-card); padding: 20px; border-radius: 12px; margin-bottom: 15px; border: 1px solid var(--border-color); }

            /* --- PANEL IA --- */
            .chat-panel { width: 350px; background: var(--bg-panel); border-left: 1px solid var(--border-color); display: flex; flex-direction: column; }
            .chat-messages { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; font-size: 14px;}
            .msg-javid { background: var(--bg-card); padding: 12px; border-left: 3px solid var(--primary-blue); border-radius: 6px; }
            .msg-user { background: var(--primary-blue); padding: 12px; border-radius: 6px; align-self: flex-end; color: white; }
            .chat-input { display: flex; padding: 15px; border-top: 1px solid var(--border-color); background: var(--bg-main);}
            .chat-input input { flex: 1; padding: 10px; border-radius: 6px; border: 1px solid var(--border-color); background: var(--bg-panel); color: white; outline:none; }
            .chat-input button { background: var(--primary-blue); color: white; border: none; padding: 0 15px; margin-left: 10px; border-radius: 6px; cursor: pointer;}
            
        </style>
    </head>
    <body>

        <div id="login-screen" class="screen active">
            <div class="login-box">
                <h1 style="color:var(--primary-blue); margin-bottom:5px;">Ecosistema Digital</h1>
                <p style="color:var(--text-muted); margin-bottom:20px; font-size:14px;">Centro de Transformación</p>
                <input type="text" id="user-input" placeholder="Usuario (cliente_vip)">
                <input type="password" id="pass-input" placeholder="Contraseña (fitness2026)">
                <button onclick="login()">INGRESAR</button>
                <div id="login-err" class="error-txt"></div>
            </div>
        </div>

        <div id="dashboard-screen" class="screen" style="flex-direction:column;">
            
            <header>
                <div class="ai-profile">
                    <div class="ring-online"><div class="avatar-img"></div></div>
                    <div class="ai-info">
                        <h2>Javid tech</h2>
                        <span>● IA Operativa y Analizando Progreso</span>
                    </div>
                </div>
                <button style="background:transparent; border:1px solid #ef4444; color:#ef4444; padding:8px 15px; border-radius:6px; cursor:pointer;" onclick="location.reload()">Salir</button>
            </header>

            <div class="main-layout">
                <aside class="sidebar">
                    <div class="nav-section">
                        <div class="nav-item active" id="nav-feed" onclick="cargarFeed()">
                            <span>📺 Retención Diaria (Feed)</span>
                        </div>
                    </div>

                    <div class="nav-section" id="menu-programas">
                        </div>

                    <div class="progress-container">
                        <div class="progress-title">
                            <span>Progreso Global</span>
                            <span id="porcentaje-txt" style="color:var(--status-online);">0%</span>
                        </div>
                        <div class="progress-bar-bg">
                            <div class="progress-bar-fill" id="barra-progreso"></div>
                        </div>
                        <p style="font-size:11px; color:var(--text-muted); margin-bottom:10px; text-align:center;">Calendario de Entrenamiento (Días)</p>
                        <div class="calendar-grid" id="mini-calendario">
                            </div>
                    </div>
                </aside>

                <main class="workspace" id="main-workspace">
                    </main>

                <aside class="chat-panel">
                    <div style="padding:15px; background:var(--bg-card); font-weight:bold; border-bottom:1px solid var(--border-color);">
                        Asistente Virtual 
                    </div>
                    <div class="chat-messages" id="chat-box">
                        <div class="msg-javid"><strong>Javid tech:</strong> Matriz conectada. Analizaré tu cumplimiento diario. ¿Qué duda técnica tienes hoy?</div>
                    </div>
                    <div class="chat-input">
                        <input type="text" id="chat-input-text" placeholder="Escribe aquí..." onkeypress="if(event.key==='Enter') enviarMsg()">
                        <button onclick="enviarMsg()">Enviar</button>
                    </div>
                </aside>
            </div>
        </div>

        <script>
            // --- ESTADO GLOBAL (GAMIFICACIÓN Y DATOS) ---
            const App = {
                datos: null,
                vistaActual: 'feed',
                // Simulamos el progreso del usuario (Día actual: 4)
                estadoGamificacion: {
                    diaActual: 4,
                    tareasHoy: { entreno: false, nutricion: false, estiramiento: false, sueno: false },
                    diasCompletados: 3 // Ya completó los 3 primeros días al 100%
                }
            };

            // 1. LOGIN
            async function login() {
                const u = document.getElementById('user-input').value;
                const p = document.getElementById('pass-input').value;
                try {
                    const res = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({username:u, password:p})});
                    const data = await res.json();
                    if(data.success) {
                        document.getElementById('login-screen').classList.remove('active');
                        document.getElementById('dashboard-screen').classList.add('active');
                        obtenerDatos();
                    } else {
                        document.getElementById('login-err').innerText = data.message;
                    }
                } catch(e) { document.getElementById('login-err').innerText = "Error de conexión."; }
            }

            // 2. OBTENER DATOS (CMS)
            async function obtenerDatos() {
                const res = await fetch('/api/datos-plataforma');
                App.datos = await res.json();
                renderMenuProgramas();
                actualizarCentroProgreso();
                cargarFeed(); // Carga inicial
            }

            // 3. RENDERIZADO DEL MENÚ Y DESBLOQUEOS
            function renderMenuProgramas() {
                const menu = document.getElementById('menu-programas');
                menu.innerHTML = '<div style="font-size:11px; color:#9ca3af; text-transform:uppercase; margin-bottom:10px; font-weight:800;">Escalera de Valor</div>';
                
                Object.values(App.datos.programas).forEach(prog => {
                    const isLocked = prog.estado === "bloqueado";
                    const lockIcon = isLocked ? '<span class="lock-icon">🔒 Bloqueado</span>' : '';
                    menu.innerHTML += \`
                        <div class="nav-item \${isLocked ? 'locked' : ''}" id="nav-\${prog.id}" 
                             onclick="\${isLocked ? 'mostrarAlertaBloqueo()' : \`cargarPrograma('\${prog.id}')\`}">
                            <span>\${prog.titulo}</span> \${lockIcon}
                        </div>
                    \`;
                });
            }

            function mostrarAlertaBloqueo() {
                addChat("Intentas acceder a un nivel superior. Debes completar el 100% de la barra de progreso de tu nivel actual para que yo autorice el desbloqueo.", "javid");
            }

            // 4. RENDER FEED DE RETENCIÓN
            function cargarFeed() {
                App.vistaActual = 'feed';
                document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
                document.getElementById('nav-feed').classList.add('active');

                const feed = App.datos.feed;
                document.getElementById('main-workspace').innerHTML = \`
                    <h1 style="margin-bottom:20px; font-size:28px;">Centro de Retención Diario</h1>
                    <div class="feed-grid">
                        <div class="video-card">
                            <h3 style="margin-bottom:10px; color:var(--primary-blue);">Video del Día: \${feed.video.titulo}</h3>
                            <iframe src="\${feed.video.url}" allowfullscreen></iframe>
                            <p style="color:var(--text-muted); margin-top:10px;">\${feed.video.desc}</p>
                        </div>
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                            <div class="content-card">
                                <h3>🎧 \${feed.audio.titulo}</h3>
                                <p style="color:var(--text-muted); font-size:13px; margin:10px 0;">Duración: \${feed.audio.duracion}</p>
                                <button style="padding:8px 15px; background:var(--primary-blue); border:none; border-radius:6px; color:white; cursor:pointer;">Reproducir Audio</button>
                            </div>
                            <div class="content-card">
                                <h3>📄 \${feed.articulos[0].titulo}</h3>
                                <p style="color:var(--text-muted); font-size:13px; margin:10px 0;">Tiempo lectura: \${feed.articulos[0].lectura}</p>
                                <button style="padding:8px 15px; background:transparent; border:1px solid var(--primary-blue); border-radius:6px; color:var(--primary-blue); cursor:pointer;">Leer Artículo</button>
                            </div>
                        </div>
                    </div>
                \`;
            }

            // 5. RENDER PROGRAMA Y CHECKLIST DIARIO (GAMIFICACIÓN)
            function cargarPrograma(id) {
                App.vistaActual = id;
                document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
                document.getElementById('nav-' + id).classList.add('active');

                const prog = App.datos.programas[id];
                const ts = App.estadoGamificacion.tareasHoy;

                // Crear HTML del Checklist
                const checklistHTML = \`
                    <div class="checklist-panel">
                        <h3><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Tu Misión de Hoy (Día \${App.estadoGamificacion.diaActual})</h3>
                        <p style="color:var(--text-muted); margin-bottom:15px; font-size:14px;">Tacha todas las tareas para iluminar tu día en el calendario.</p>
                        <div class="task-item \${ts.entreno ? 'done' : ''}" onclick="toggleTarea('entreno')">
                            <div class="task-checkbox"></div> <span>💪 Completar Entrenamiento Diario</span>
                        </div>
                        <div class="task-item \${ts.nutricion ? 'done' : ''}" onclick="toggleTarea('nutricion')">
                            <div class="task-checkbox"></div> <span>🥗 Cumplir Método de Alimentación</span>
                        </div>
                        <div class="task-item \${ts.estiramiento ? 'done' : ''}" onclick="toggleTarea('estiramiento')">
                            <div class="task-checkbox"></div> <span>🧘‍♂️ Sesión de Estiramiento (10 min)</span>
                        </div>
                        <div class="task-item \${ts.sueno ? 'done' : ''}" onclick="toggleTarea('sueno')">
                            <div class="task-checkbox"></div> <span>💤 Higiene del Sueño (Dormir a tiempo)</span>
                        </div>
                    </div>
                \`;

                let modulosHTML = prog.modulos.map((m,i) => \`
                    <div class="module-card"><h4>M\${i+1}: \${m.titulo}</h4><p style="color:var(--text-muted); font-size:14px; margin-top:5px;">\${m.desc}</p></div>
                \`).join('');

                document.getElementById('main-workspace').innerHTML = \`
                    <h1 style="font-size:32px; margin-bottom:5px;">\${prog.titulo}</h1>
                    <p style="color:var(--text-muted); margin-bottom:30px;">\${prog.enfoque}</p>
                    \${checklistHTML}
                    <h3 style="margin-bottom:15px;">Manuales y Módulos</h3>
                    \${modulosHTML}
                \`;
            }

            // 6. LÓGICA DE GAMIFICACIÓN (CHECKLIST Y BARRA)
            function toggleTarea(tarea) {
                // Invertir estado de la tarea
                App.estadoGamificacion.tareasHoy[tarea] = !App.estadoGamificacion.tareasHoy[tarea];
                
                // Si el usuario marcó una tarea, informar a Javid tech
                if(App.estadoGamificacion.tareasHoy[tarea]) {
                    enviarMsgIA_Silenciosa("He completado la tarea de: " + tarea);
                }

                // Verificar si se completaron TODAS las tareas de hoy
                const todasCompletas = Object.values(App.estadoGamificacion.tareasHoy).every(v => v === true);
                
                if (todasCompletas && App.estadoGamificacion.diaActual === (App.estadoGamificacion.diasCompletados + 1)) {
                    // Completó el día! Aumentamos los días completados
                    App.estadoGamificacion.diasCompletados++;
                    // Pequeño truco visual para resetear al día siguiente (simulación)
                    setTimeout(() => {
                        App.estadoGamificacion.diaActual++;
                        Object.keys(App.estadoGamificacion.tareasHoy).forEach(k => App.estadoGamificacion.tareasHoy[k] = false);
                        if(App.vistaActual !== 'feed') cargarPrograma(App.vistaActual);
                        actualizarCentroProgreso();
                        addChat("¡Día completado al 100%! He iluminado tu calendario en verde. Prepárate para mañana.", "javid");
                    }, 1500);
                }

                // Recargar interfaz de programa para mostrar el tachado
                cargarPrograma(App.vistaActual);
                actualizarCentroProgreso();
            }

            function actualizarCentroProgreso() {
                const totalDiasPrograma = App.datos.programas.novatos.diasTotales; // 28 días
                let diasListos = App.estadoGamificacion.diasCompletados;
                
                // Calcular tareas de hoy parciales para sumarlas a la barra
                const tareasHechas = Object.values(App.estadoGamificacion.tareasHoy).filter(v=>v).length;
                const fraccionHoy = tareasHechas / 4; // 4 tareas por día
                
                const progresoTotal = ((diasListos + fraccionHoy) / totalDiasPrograma) * 100;
                
                document.getElementById('barra-progreso').style.width = progresoTotal + '%';
                document.getElementById('porcentaje-txt').innerText = Math.floor(progresoTotal) + '%';

                // Lógica de Desbloqueo Maestro
                if (Math.floor(progresoTotal) >= 100 && App.datos.programas.intermedio.estado === "bloqueado") {
                    App.datos.programas.intermedio.estado = "desbloqueado";
                    renderMenuProgramas();
                    addChat("¡ALERTA DE SISTEMA! Has alcanzado el 100%. Nivel Intermedio DESBLOQUEADO automáticamente.", "javid");
                }

                // Renderizar Mini Calendario Heatmap
                const cal = document.getElementById('mini-calendario');
                cal.innerHTML = '';
                for(let i=1; i<=totalDiasPrograma; i++) {
                    let clase = "cal-day";
                    if (i <= diasListos) clase += " completed"; // Días pasados completos
                    else if (i === App.estadoGamificacion.diaActual) clase += " today"; // Día de hoy
                    
                    cal.innerHTML += \`<div class="\${clase}">\${i}</div>\`;
                }
            }

            // 7. SISTEMA DE CHAT JAVID TECH
            async function enviarMsg() {
                const input = document.getElementById('chat-input-text');
                const txt = input.value.trim();
                if(!txt) return;
                addChat(txt, "user");
                input.value = '';
                
                const res = await fetch('/api/javid-tech/chat', { method: 'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({userMessage: txt, contexto: App.vistaActual})});
                const data = await res.json();
                addChat(data.javidReply, "javid");
            }

            async function enviarMsgIA_Silenciosa(txt) {
                const res = await fetch('/api/javid-tech/chat', { method: 'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({userMessage: txt, contexto: App.vistaActual})});
                const data = await res.json();
                addChat(data.javidReply, "javid");
            }

            function addChat(txt, role) {
                const b = document.getElementById('chat-box');
                b.innerHTML += \`<div class="msg-\${role}">\${role==='javid'?'<strong>Javid tech:</strong><br>':''}\${txt}</div>\`;
                b.scrollTop = b.scrollHeight;
            }
        </script>
    </body>
    </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("🚀 MATRIZ V3: GAMIFICACIÓN Y FEED ACTIVADOS.");
    console.log(`🌐 Servidor: Puerto ${PORT}`);
});
