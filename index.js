/**
 * ==============================================================================
 * ECOSISTEMA DIGITAL v7.0 — JAVID MENDOZA COACH
 * ARQUITECTURA SPA: HUB DE INICIO, PANELES COLAPSABLES Y MÉTRICAS FÍSICAS
 * ==============================================================================
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "JavidMendoza_V7_Elite";
const DB_FILE = path.join(__dirname, 'database.json');

// ==========================================
// 1. BASE DE DATOS AUTO-GENERABLE
// ==========================================
const FECHA_HOY = new Date().toISOString().split('T')[0];

const dbInicial = {
    configuracion: { instagram: "https://instagram.com/javidmendoza", youtube: "https://youtube.com/", whatsapp: "https://wa.me/573000000000" },
    feed: {
        titulo: "La Mentalidad del 1% (Cero Excusas)",
        videoUrl: "https://www.youtube.com/embed/Q1anc5MN8KM",
        descripcion: "Bienvenido al ecosistema. Prepara tu mente para la transformación estructural de 9 meses."
    },
    usuarios: [
        { id: 1, username: "javid_admin", password: "mododios", rol: "admin", nombre: "Javid Mendoza", peso: "85", altura: "180" },
        { id: 2, username: "coach_camilo", password: "coach2026", rol: "coach", nombre: "Camilo Gonzalez", alumnosAsignados: [3, 4] },
        { id: 3, username: "kelly_g", password: "fitness2026", rol: "alumno", nombre: "Kelly González", programa: "novatos", peso: "68", altura: "165" },
        { id: 4, username: "andres_v", password: "fitness2026", rol: "alumno", nombre: "Andrés Villar", programa: "intermedio", peso: "82", altura: "178" }
    ],
    historial: {
        "3": { "2026-06-20": { entreno: true, nutricion: true, estiramiento: false, sueno: true } }
    },
    programas: {
        novatos: {
            id: "novatos", titulo: "🌱 NIVEL 1: LA FUNDACIÓN", duracion: "Semanas 1 a 12 (Mes 1 al 3)",
            intro: "Desintoxicación celular y adaptación biomecánica sin frustración.",
            videoPrincipal: "https://www.youtube.com/embed/Q1anc5MN8KM",
            nutricion: "Eliminación absoluta de alcohol y azúcares. Aprenderás el Método Visual. Protocolos Detox: Jugos Verde, Naranja y Morado.",
            entrenamiento: "Fuerza base utilizando tu propio peso corporal. Conexión mente-músculo y reparación de postura."
        },
        intermedio: {
            id: "intermedio", titulo: "🔥 NIVEL 2: RECOMPOSICIÓN CORPORAL", duracion: "Semanas 13 a 24 (Mes 4 al 6)",
            intro: "Transición a los hierros y nutrición inteligente.",
            videoPrincipal: "https://www.youtube.com/embed/jNQXAC9IVRw",
            nutricion: "Cuantificación estratégica. Ciclado de carbohidratos. Sistema Meal Prep (Batch Cooking) para optimizar tu tiempo.",
            entrenamiento: "Fuerza Estructural. Sobrecarga progresiva e hipertrofia funcional con pesas libres."
        },
        avanzado: {
            id: "avanzado", titulo: "🏆 NIVEL 3: LA MAESTRÍA", duracion: "Semanas 25 a 36 (Mes 7 al 9)",
            intro: "Alto rendimiento, hipertrofia máxima y estética de élite.",
            videoPrincipal: "https://www.youtube.com/embed/Q1anc5MN8KM",
            nutricion: "Periodización Milimétrica. Refeeds metabólicos estratégicos. Peak Week para condición competitiva.",
            entrenamiento: "Entrenamiento Híbrido Extremo. Llegando al fallo real, drop sets y rest-pause."
        }
    }
};

if (!fs.existsSync(DB_FILE)) { fs.writeFileSync(DB_FILE, JSON.stringify(dbInicial, null, 2)); }
function leerDB() { return JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); }
function guardarDB(data) { fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2)); }

// ==========================================
// 2. ENDPOINTS (API REST)
// ==========================================
app.post('/api/login', (req, res) => {
    const db = leerDB();
    const { username, password } = req.body;
    const user = db.usuarios.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ success: true, token, usuario: user });
    } else res.status(401).json({ success: false, message: "Credenciales incorrectas." });
});

app.get('/api/datos', (req, res) => { res.json(leerDB()); });

app.post('/api/progreso/tarea', (req, res) => {
    const { userId, fecha, tarea, valor } = req.body;
    const db = leerDB();
    if (!db.historial[userId]) db.historial[userId] = {};
    if (!db.historial[userId][fecha]) db.historial[userId][fecha] = { entreno: false, nutricion: false, estiramiento: false, sueno: false };
    db.historial[userId][fecha][tarea] = valor;
    guardarDB(db);
    res.json({ success: true, historial: db.historial[userId] });
});

app.post('/api/usuario/metricas', (req, res) => {
    const { userId, peso, altura } = req.body;
    const db = leerDB();
    const index = db.usuarios.findIndex(u => u.id === userId);
    if(index !== -1) {
        db.usuarios[index].peso = peso;
        db.usuarios[index].altura = altura;
        guardarDB(db);
        res.json({ success: true, usuario: db.usuarios[index] });
    } else res.status(404).json({ success: false });
});

app.post('/api/admin/actualizar', (req, res) => {
    const db = leerDB();
    db.configuracion = req.body.configuracion;
    db.feed = req.body.feed;
    db.programas = req.body.programas;
    guardarDB(db);
    res.json({ success: true });
});

// ==========================================
// 3. FRONTEND (UI LUXURY NEGRO/DORADO)
// ==========================================
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Javid Mendoza Coach | Plataforma Oficial</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
        <style>
            :root { --bg-main: #050505; --bg-panel: #0f0f0f; --bg-card: #151515; --border-color: #2a2a2a; --primary-gold: #D4AF37; --status-green: #10b981; --text-main: #ffffff; --text-muted: #888888; }
            * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
            body { background-color: var(--bg-main); color: var(--text-main); overflow-x: hidden; }
            
            .hidden { display: none !important; }
            button { cursor: pointer; transition: 0.3s; outline: none; }
            
            /* TOP NAVBAR */
            header { display: flex; justify-content: space-between; align-items: center; padding: 15px 40px; background: rgba(15, 15, 15, 0.95); border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 100; backdrop-filter: blur(10px);}
            .logo-text { font-size: 20px; font-weight: 800; letter-spacing: 1px; color: var(--text-main); }
            .logo-text span { color: var(--primary-gold); }
            
            /* PERFIL DROPDOWN & PANEL LATERAL */
            .profile-trigger { display: flex; align-items: center; gap: 10px; cursor: pointer; padding: 5px 10px; border-radius: 30px; border: 1px solid var(--border-color); transition: 0.3s; }
            .profile-trigger:hover { border-color: var(--primary-gold); }
            .profile-img { width: 35px; height: 35px; background: var(--primary-gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: black; font-weight: bold; }
            
            .side-panel { position: fixed; top: 71px; right: -400px; width: 380px; height: calc(100vh - 71px); background: var(--bg-panel); border-left: 1px solid var(--primary-gold); z-index: 99; transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1); padding: 30px; overflow-y: auto; box-shadow: -10px 0 30px rgba(0,0,0,0.8);}
            .side-panel.open { right: 0; }
            
            /* ESTRUCTURA PRINCIPAL (HUB vs MAXIMIZADO) */
            main { padding: 40px; max-width: 1200px; margin: 0 auto; transition: 0.3s; }
            .hero-section { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 50px; align-items: center;}
            .video-container iframe { width: 100%; aspect-ratio: 16/9; border-radius: 12px; border: 1px solid var(--primary-gold); }
            
            .btn-gold { background: var(--primary-gold); color: black; padding: 12px 25px; border: none; font-weight: bold; border-radius: 6px; text-transform: uppercase; letter-spacing: 1px; }
            .btn-outline { background: transparent; border: 1px solid var(--primary-gold); color: var(--primary-gold); padding: 12px 25px; border-radius: 6px; font-weight: bold; }
            .btn-outline:hover { background: rgba(212, 175, 55, 0.1); }
            
            /* TARJETAS DE PROGRAMAS (MINIMIZADAS) */
            .programs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
            .prog-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 25px; transition: 0.3s; position: relative; overflow: hidden; cursor: pointer;}
            .prog-card::before { content: ''; position: absolute; top:0; left:0; width: 4px; height: 100%; background: var(--primary-gold); opacity: 0; transition: 0.3s;}
            .prog-card:hover { transform: translateY(-5px); border-color: var(--primary-gold); }
            .prog-card:hover::before { opacity: 1; }
            
            /* PROGRAMA MAXIMIZADO */
            .maximized-view { display: none; animation: fadeIn 0.4s; }
            .maximized-view.active { display: block; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            
            /* PANEL PERSONAL UI (Gamificación y Métricas) */
            .metric-box { background: var(--bg-card); border: 1px solid var(--border-color); padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .metric-input { width: 100%; background: var(--bg-main); border: 1px dashed var(--border-color); color: white; padding: 8px; margin-top: 5px; outline: none; border-radius: 4px; text-align: center;}
            .metric-input:focus { border-color: var(--primary-gold); }
            
            .progress-bar-bg { width: 100%; height: 6px; background: var(--bg-main); border-radius: 10px; overflow: hidden; margin: 10px 0;}
            .progress-bar-fill { height: 100%; background: linear-gradient(90deg, #D4AF37, #FFF); width: 0%; transition: 0.8s; }
            
            .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-top: 15px; }
            .cal-day { aspect-ratio: 1; background: var(--bg-main); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 11px; cursor: pointer; border: 1px solid transparent; }
            .cal-day:hover { border-color: var(--primary-gold); }
            .cal-day.done { background: rgba(16, 185, 129, 0.15); color: var(--status-green); border-color: var(--status-green); }
            .cal-day.today { border: 2px solid var(--primary-gold); font-weight: bold; }

            /* LOGIN */
            #login-screen { position: fixed; top:0; left:0; width: 100%; height: 100%; background: var(--bg-main); display: flex; justify-content: center; align-items: center; z-index: 1000; }
            .login-box { background: var(--bg-panel); padding: 50px; border-radius: 12px; border: 1px solid var(--primary-gold); text-align: center; width: 380px; }
            .login-box input { width: 100%; padding: 15px; margin-bottom: 15px; border-radius: 6px; border: 1px solid var(--border-color); background: var(--bg-main); color: white; outline: none; }
        </style>
    </head>
    <body>

        <div id="login-screen">
            <div class="login-box">
                <h1 style="color:var(--primary-gold); font-size:24px;">JAVID MENDOZA</h1>
                <p style="color:var(--text-muted); font-size:12px; letter-spacing:3px; margin-bottom:30px;">COACHING DIGITAL</p>
                <input type="text" id="user" placeholder="Usuario (Ej. kelly_g)">
                <input type="password" id="pass" placeholder="Contraseña">
                <button class="btn-gold" style="width:100%;" onclick="login()">INGRESAR AL SISTEMA</button>
                <p id="err-msg" style="color:#ef4444; margin-top:15px; font-size:13px;"></p>
            </div>
        </div>

        <div id="app-screen" class="hidden">
            <header>
                <div class="logo-text" onclick="mostrarHub()" style="cursor:pointer;">JAVID <span>MENDOZA</span></div>
                
                <div style="display:flex; gap:15px; align-items:center;">
                    <button id="btn-admin" class="btn-outline hidden" onclick="mostrarModoDios()">⚙️ Modo Dios</button>
                    
                    <div class="profile-trigger" onclick="togglePanel()">
                        <div class="profile-img" id="user-initials">--</div>
                        <span id="user-name" style="font-size:14px; font-weight:600;">Usuario</span>
                        <span style="font-size:10px;">▼</span>
                    </div>
                </div>
            </header>

            <aside class="side-panel" id="side-panel">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
                    <h2 style="color:var(--primary-gold); font-size:18px;">Dashboard Personal</h2>
                    <button onclick="togglePanel()" style="background:none; border:none; color:white; font-size:20px;">×</button>
                </div>

                <div class="metric-box">
                    <h3 style="font-size:14px; color:var(--text-muted); margin-bottom:10px;">Métricas Actuales</h3>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                        <div>
                            <label style="font-size:11px; color:var(--primary-gold);">Peso (kg)</label>
                            <input type="text" id="val-peso" class="metric-input" onchange="guardarMetricas()">
                        </div>
                        <div>
                            <label style="font-size:11px; color:var(--primary-gold);">Altura (cm)</label>
                            <input type="text" id="val-altura" class="metric-input" onchange="guardarMetricas()">
                        </div>
                    </div>
                </div>

                <div class="metric-box" id="gamification-container">
                    </div>
                
                <button class="btn-outline" style="width:100%; border-color:#ef4444; color:#ef4444; margin-top:20px;" onclick="location.reload()">Cerrar Sesión</button>
            </aside>

            <main>
                <div id="view-hub">
                    <div class="hero-section">
                        <div>
                            <h1 style="font-size:42px; line-height:1.1; margin-bottom:20px;">Bienvenido al Ecosistema de <span style="color:var(--primary-gold);">Transformación</span></h1>
                            <p style="color:var(--text-muted); font-size:16px; margin-bottom:30px;" id="hub-desc"></p>
                            <div style="display:flex; gap:15px;">
                                <button class="btn-gold" onclick="document.getElementById('seccion-programas').scrollIntoView({behavior:'smooth'})">Ver Mis Programas</button>
                                <button class="btn-outline" id="btn-ig" onclick="">Instagram</button>
                            </div>
                        </div>
                        <div class="video-container">
                            <iframe id="hub-video" src="" allowfullscreen></iframe>
                        </div>
                    </div>

                    <h2 id="seccion-programas" style="margin-bottom:20px; font-size:24px; color:var(--primary-gold); border-bottom:1px solid var(--border-color); padding-bottom:10px;">Selecciona tu Nivel</h2>
                    
                    <div class="programs-grid" id="programs-grid">
                        </div>
                </div>

                <div id="view-maximized" class="maximized-view">
                    <button class="btn-outline" style="margin-bottom:30px;" onclick="mostrarHub()">← Volver al Inicio</button>
                    <div id="maximized-content"></div>
                </div>

                <div id="view-admin" class="maximized-view">
                    </div>
            </main>
        </div>

        <script>
            let db = {};
            let usuarioActual = {};
            const FECHA_HOY = new Date().toISOString().split('T')[0];

            // --- INICIALIZACIÓN ---
            async function login() {
                const u = document.getElementById('user').value;
                const p = document.getElementById('pass').value;
                const res = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({username:u, password:p})});
                const data = await res.json();
                
                if(data.success) {
                    usuarioActual = data.usuario;
                    document.getElementById('login-screen').classList.add('hidden');
                    document.getElementById('app-screen').classList.remove('hidden');
                    
                    document.getElementById('user-name').innerText = usuarioActual.nombre;
                    document.getElementById('user-initials').innerText = usuarioActual.nombre.substring(0,2).toUpperCase();
                    
                    if(usuarioActual.rol === 'admin') document.getElementById('btn-admin').classList.remove('hidden');
                    
                    await obtenerDatosDB();
                } else {
                    document.getElementById('err-msg').innerText = data.message;
                }
            }

            async function obtenerDatosDB() {
                const res = await fetch('/api/datos');
                db = await res.json();
                
                // Cargar datos en UI
                document.getElementById('hub-desc').innerText = db.feed.descripcion;
                document.getElementById('hub-video').src = db.feed.videoUrl;
                document.getElementById('btn-ig').onclick = () => window.open(db.configuracion.instagram, '_blank');
                
                document.getElementById('val-peso').value = usuarioActual.peso || '';
                document.getElementById('val-altura').value = usuarioActual.altura || '';

                renderHubCards();
                renderGamificacion();
                mostrarHub();
            }

            // --- NAVEGACIÓN Y VISTAS ---
            function mostrarHub() {
                document.getElementById('view-hub').style.display = 'block';
                document.getElementById('view-maximized').classList.remove('active');
                document.getElementById('view-admin').classList.remove('active');
            }

            function maximizarPrograma(id) {
                // Validación de acceso
                if(usuarioActual.rol === 'alumno' && usuarioActual.programa !== id && id !== 'novatos') {
                    alert("🔒 Nivel Bloqueado. Debes completar el nivel actual para avanzar.");
                    return;
                }

                document.getElementById('view-hub').style.display = 'none';
                const container = document.getElementById('view-maximized');
                const p = db.programas[id];

                document.getElementById('maximized-content').innerHTML = \`
                    <h1 style="font-size:38px; color:var(--primary-gold); margin-bottom:5px; text-transform:uppercase;">\${p.titulo}</h1>
                    <p style="color:var(--text-muted); letter-spacing:2px; font-size:14px; margin-bottom:30px;">\${p.duracion}</p>
                    
                    <div class="video-container" style="margin-bottom:40px;">
                        <iframe src="\${p.videoPrincipal}" style="height:500px;" allowfullscreen></iframe>
                    </div>

                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:30px;">
                        <div style="background:var(--bg-card); padding:30px; border-radius:12px; border-top:3px solid var(--primary-gold);">
                            <h2 style="margin-bottom:15px; font-size:20px;">🥗 Ingeniería Nutricional</h2>
                            <p style="color:var(--text-muted); line-height:1.7; font-size:15px; margin-bottom:20px;">\${p.nutricion}</p>
                            <button class="btn-outline" style="width:100%;">Abrir Guía PDF</button>
                        </div>
                        <div style="background:var(--bg-card); padding:30px; border-radius:12px; border-top:3px solid var(--primary-gold);">
                            <h2 style="margin-bottom:15px; font-size:20px;">💪 Módulo de Entrenamiento</h2>
                            <p style="color:var(--text-muted); line-height:1.7; font-size:15px; margin-bottom:20px;">\${p.entrenamiento}</p>
                            <button class="btn-outline" style="width:100%;">Iniciar Reproductor de Rutina</button>
                        </div>
                    </div>
                \`;
                container.classList.add('active');
            }

            function renderHubCards() {
                const grid = document.getElementById('programs-grid');
                grid.innerHTML = '';
                Object.values(db.programas).forEach(p => {
                    const lock = (usuarioActual.rol === 'alumno' && p.id !== 'novatos' && usuarioActual.programa !== p.id) ? '🔒 ' : '';
                    grid.innerHTML += \`
                        <div class="prog-card" onclick="maximizarPrograma('\${p.id}')">
                            <h3 style="color:var(--primary-gold); font-size:16px; margin-bottom:10px;">\${lock}\${p.titulo}</h3>
                            <p style="font-size:13px; color:var(--text-muted); line-height:1.5;">\${p.intro}</p>
                            <div style="margin-top:15px; font-size:11px; font-weight:bold; letter-spacing:1px; color:#fff;">MAXIMIZAR INFO ↗</div>
                        </div>
                    \`;
                });
            }

            // --- PANEL LATERAL (GAMIFICACIÓN) ---
            function togglePanel() {
                document.getElementById('side-panel').classList.toggle('open');
            }

            async function guardarMetricas() {
                const p = document.getElementById('val-peso').value;
                const a = document.getElementById('val-altura').value;
                await fetch('/api/usuario/metricas', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({userId: usuarioActual.id, peso: p, altura: a})});
            }

            function renderGamificacion() {
                const container = document.getElementById('gamification-container');
                const hist = db.historial[usuarioActual.id] || {};
                
                // Lógica simplificada de progreso (Simula % basado en días registrados)
                const diasRegistrados = Object.keys(hist).length;
                const porcentaje = Math.min(100, Math.floor((diasRegistrados / 84) * 100)); // 84 días = 12 semanas

                // Render Calendario
                let diasHTML = '';
                const hoy = new Date();
                hoy.setDate(hoy.getDate() - 14); // Últimos 14 días
                
                for(let i=0; i<28; i++) {
                    const dStr = hoy.toISOString().split('T')[0];
                    let clase = "cal-day";
                    if(dStr === FECHA_HOY) clase += " today";
                    if(hist[dStr] && hist[dStr].entreno) clase += " done";
                    
                    diasHTML += \`<div class="\${clase}" onclick="marcarHoy('\${dStr}')">\${hoy.getDate()}</div>\`;
                    hoy.setDate(hoy.getDate() + 1);
                }

                container.innerHTML = \`
                    <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                        <h3 style="font-size:14px; color:var(--text-muted);">Cumplimiento</h3>
                        <span style="color:var(--primary-gold); font-size:24px; font-weight:bold;">\${porcentaje}%</span>
                    </div>
                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:\${porcentaje}%"></div></div>
                    
                    <h3 style="font-size:12px; color:var(--text-muted); margin-top:25px; margin-bottom:10px;">Calendario Operativo</h3>
                    <div style="display:flex; justify-content:space-between; font-size:10px; color:#555;">
                        <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
                    </div>
                    <div class="cal-grid">\${diasHTML}</div>
                    <p style="font-size:10px; color:#555; text-align:center; margin-top:10px;">Haz clic en HOY para marcar tu check diario.</p>
                \`;
            }

            async function marcarHoy(fecha) {
                if(fecha !== FECHA_HOY) { alert("Solo puedes auditar el día actual."); return; }
                const hist = db.historial[usuarioActual.id] || {};
                const actual = hist[fecha] ? hist[fecha].entreno : false;
                
                await fetch('/api/progreso/tarea', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({userId: usuarioActual.id, fecha: FECHA_HOY, tarea: 'entreno', valor: !actual})});
                await obtenerDatosDB(); // Recargar data
            }

            // --- MODO DIOS ---
            function mostrarModoDios() {
                document.getElementById('view-hub').style.display = 'none';
                document.getElementById('view-maximized').classList.remove('active');
                const container = document.getElementById('view-admin');
                
                container.innerHTML = \`
                    <h1 style="color:var(--primary-gold); margin-bottom:20px;">⚙️ CONTROL MAESTRO</h1>
                    <div class="metric-box">
                        <h3 style="margin-bottom:10px;">Video Landing (Hub)</h3>
                        <input type="text" id="adm-vid" class="metric-input" style="text-align:left;" value="\${db.feed.videoUrl}">
                        <h3 style="margin-top:15px; margin-bottom:10px;">Texto Bienvenida</h3>
                        <textarea id="adm-desc" class="metric-input" style="height:80px; text-align:left; resize:vertical;">\${db.feed.descripcion}</textarea>
                    </div>
                    <button class="btn-gold" style="width:100%;" onclick="guardarAdmin()">💾 SOBREESCRIBIR MATRIZ</button>
                    <button class="btn-outline" style="width:100%; margin-top:15px;" onclick="mostrarHub()">Volver al Hub</button>
                \`;
                container.classList.add('active');
            }

            async function guardarAdmin() {
                db.feed.videoUrl = document.getElementById('adm-vid').value;
                db.feed.descripcion = document.getElementById('adm-desc').value;
                await fetch('/api/admin/actualizar', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(db)});
                alert("Matriz actualizada permanentemente.");
                obtenerDatosDB();
            }
        </script>
    </body>
    </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🚀 ARQUITECTURA SPA V7 DESPLEGADA: HUB, MÉTRICAS Y GAMIFICACIÓN LISTOS."));
