/**
 * ==============================================================================
 * SISTEMA MAESTRO V11.0 OMNIVERSO - JAVID MENDOZA COACH
 * Arquitectura: SPA Expandible, CMS Dinámico (Modo Dios), Matriz de 84 Días
 * Desarrolladores: Ricardo & IA Architect
 * ==============================================================================
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));

const SECRET_KEY = "JavidMendoza_Matriz_V11_GodMode_2026";
const DB_FILE = path.join(__dirname, 'database.json');

// --- 1. GENERADOR DE BASE DE DATOS SEMILLA (ESTRUCTURA V11) ---
// Si el JSON no existe o está viejo, el motor inyecta esta estructura preparada para 84 días
function inicializarDB() {
    if (!fs.existsSync(DB_FILE)) {
        const seed = {
            config: { colorPrimario: "#D4AF37", marca: "Javid Mendoza Coach" },
            usuarios: [
                { id: 1, username: "javid_admin", password: "mododios", rol: "admin", nombre: "Javid Mendoza" },
                { id: 2, username: "ricardo_dev", password: "mododios", rol: "admin", nombre: "Ricardo (Dev)" },
                { id: 3, username: "kelly_g", password: "fitness2026", rol: "alumno", nombre: "Kelly González", programaActivo: "novatos" },
                { id: 4, username: "andres_v", password: "fitness2026", rol: "alumno", nombre: "Andrés Villar", programaActivo: "intermedio" }
            ],
            posts: [
                { id: 1, fecha: "2026-06-23", titulo: "Bienvenidos al Ecosistema V11", contenido: "La disciplina es el puente entre tus metas y tus logros. Cero excusas.", video: "https://www.youtube.com/embed/Q1anc5MN8KM" }
            ],
            programas: {
                novatos: {
                    titulo: "Novatos (Fase de Arranque)",
                    descripcion: "Elimina miedos y construye el hábito.",
                    tarjetas: {
                        nutricion: { titulo: "Nutrición Inteligente", contenido: "Método visual de las manos. Sin contar calorías, priorizando desinflamar el cuerpo. Cero azúcar.", pdf: "#" },
                        entrenamiento: { titulo: "Gravedad Cero", contenido: "100% en casa. Domina tu peso corporal antes de tocar una pesa.", pdf: "#" },
                        mindset: { titulo: "Mentalidad de Acero", contenido: "Regla del 1%. Pequeñas victorias diarias.", pdf: "#" }
                    }
                }
                // Intermedio y Avanzado seguirían la misma lógica
            },
            cache_diario: {} // Guarda { userId: { "novatos": { "dia_1": { entreno: true, dieta: false } } } }
        };
        fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2));
    }
}
inicializarDB();

function getDatabase() { return JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); }
function saveDatabase(db) { fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2)); return true; }

// --- 2. MIDDLEWARES ---
function verificarToken(req, res, next) {
    const bearer = req.headers['authorization'];
    if (!bearer) return res.status(403).json({ error: 'Denegado' });
    jwt.verify(bearer.split(' ')[1], SECRET_KEY, (err, data) => {
        if (err) return res.status(403).json({ error: 'Token Inválido' });
        req.user = data; next();
    });
}

// --- 3. ENDPOINTS API ---
app.post('/api/login', (req, res) => {
    const db = getDatabase();
    const user = db.usuarios.find(u => u.username === req.body.username && u.password === req.body.password);
    if (user) {
        const token = jwt.sign({ id: user.id, rol: user.rol, nombre: user.nombre }, SECRET_KEY, { expiresIn: '7d' });
        res.json({ success: true, token, user: { id: user.id, nombre: user.nombre, rol: user.rol, programa: user.programaActivo } });
    } else res.status(401).json({ success: false });
});

app.get('/api/data', verificarToken, (req, res) => res.json(getDatabase()));

app.post('/api/progreso', verificarToken, (req, res) => {
    const { progId, dia, task, valor } = req.body;
    const db = getDatabase();
    const uid = req.user.id;
    
    if (!db.cache_diario[uid]) db.cache_diario[uid] = {};
    if (!db.cache_diario[uid][progId]) db.cache_diario[uid][progId] = {};
    if (!db.cache_diario[uid][progId][dia]) db.cache_diario[uid][progId][dia] = {};
    
    db.cache_diario[uid][progId][dia][task] = valor;
    saveDatabase(db);
    res.json({ success: true, cache: db.cache_diario[uid] });
});

app.post('/api/godmode/post', verificarToken, (req, res) => {
    if (req.user.rol !== 'admin') return res.status(403).json({ error: 'No admin' });
    const db = getDatabase();
    db.posts.unshift({ id: Date.now(), fecha: new Date().toISOString().split('T')[0], ...req.body });
    saveDatabase(db);
    res.json({ success: true });
});

// --- 4. RENDERIZADOR FRONTEND MASIVO (UI/UX PRO MAX) ---
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Plataforma Élite | Javid Mendoza</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&display=swap" rel="stylesheet">
        <style>
            :root { --bg: #030303; --card: #0a0a0a; --border: #222; --gold: #D4AF37; --text: #f5f5f5; --muted: #888; }
            * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
            body { background: var(--bg); color: var(--text); overflow-x: hidden; }
            .hidden { display: none !important; }
            
            /* Utilidades UI */
            .btn { background: var(--gold); color: #000; padding: 12px 24px; font-weight: 800; border: none; cursor: pointer; text-transform: uppercase; border-radius: 4px; transition: 0.3s; }
            .btn:hover { box-shadow: 0 0 15px rgba(212,175,55,0.4); transform: translateY(-2px); }
            .btn-outline { background: transparent; color: var(--gold); border: 1px solid var(--gold); }
            .input { width: 100%; padding: 15px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: white; margin-bottom: 15px; border-radius: 4px; }
            
            /* Header */
            header { display: flex; justify-content: space-between; padding: 20px 40px; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; }
            .logo { font-weight: 900; font-size: 24px; cursor: pointer; letter-spacing: 1px; }
            .logo span { color: var(--gold); }
            
            /* Layout Principal */
            main { padding: 40px; max-width: 1400px; margin: 0 auto; }
            
            /* Feed / Home */
            .feed-grid { display: grid; gap: 30px; }
            .post-card { background: var(--card); border: 1px solid var(--border); padding: 30px; border-radius: 12px; }
            
            /* Tarjetas Expandibles de Programas */
            .expandable-card { background: var(--card); border: 1px solid var(--border); border-radius: 8px; margin-bottom: 15px; overflow: hidden; transition: 0.3s; }
            .card-header { padding: 20px; display: flex; justify-content: space-between; cursor: pointer; font-weight: 800; color: var(--gold); text-transform: uppercase; }
            .card-header:hover { background: rgba(255,255,255,0.02); }
            .card-body { padding: 0 20px; max-height: 0; overflow: hidden; transition: all 0.4s ease-out; }
            .expandable-card.active .card-body { padding: 20px; max-height: 1000px; border-top: 1px dashed var(--border); }
            
            /* Matriz 84 Días */
            .matrix-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 10px; margin-top: 30px; }
            .day-btn { aspect-ratio: 1; background: #111; border: 1px solid var(--border); color: var(--muted); display: flex; align-items: center; justify-content: center; font-weight: 800; cursor: pointer; border-radius: 6px; transition: 0.3s; }
            .day-btn:hover { border-color: var(--gold); color: white; }
            .day-btn.completed { background: rgba(212,175,55,0.15); border-color: var(--gold); color: var(--gold); }
            
            /* Modal Diario (El Checklist) */
            .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); display: flex; justify-content: center; align-items: center; z-index: 1000; backdrop-filter: blur(5px); }
            .modal-content { background: var(--card); border: 1px solid var(--gold); padding: 40px; border-radius: 12px; width: 90%; max-width: 500px; position: relative; }
            .close-modal { position: absolute; top: 15px; right: 20px; background: none; border: none; color: white; font-size: 24px; cursor: pointer; }
            
            .checklist-item { display: flex; align-items: center; gap: 15px; padding: 15px; border: 1px solid var(--border); border-radius: 8px; margin-bottom: 10px; cursor: pointer; }
            .checklist-item.active { border-color: var(--gold); background: rgba(212,175,55,0.05); }
            .check-box { width: 20px; height: 20px; border: 2px solid var(--gold); border-radius: 4px; display: flex; align-items: center; justify-content: center; }
            .checklist-item.active .check-box { background: var(--gold); }
            .checklist-item.active .check-box::after { content: '✓'; color: black; font-size: 14px; font-weight: 900; }

            /* Modo Dios */
            .god-panel { display: grid; grid-template-columns: 250px 1fr; gap: 30px; }
            .god-menu button { display: block; width: 100%; text-align: left; background: none; border: none; color: var(--muted); padding: 15px; cursor: pointer; font-weight: 600; border-left: 2px solid transparent; }
            .god-menu button:hover, .god-menu button.active { color: var(--gold); border-left-color: var(--gold); background: rgba(255,255,255,0.02); }

        </style>
    </head>
    <body>

        <div id="login-screen" style="height: 100vh; display: flex; justify-content: center; align-items: center;">
            <div style="background: var(--card); padding: 50px; border: 1px solid var(--border); border-radius: 8px; width: 400px; text-align: center;">
                <h1 class="logo" style="margin-bottom: 30px;">JAVID <span>MENDOZA</span></h1>
                <input type="text" id="log-user" class="input" placeholder="Usuario">
                <input type="password" id="log-pass" class="input" placeholder="Contraseña">
                <button class="btn" style="width: 100%;" onclick="login()">Acceder a la Matriz</button>
            </div>
        </div>

        <div id="app" class="hidden">
            <header>
                <div class="logo" onclick="renderHome()">JAVID <span>MENDOZA</span></div>
                <div style="display: flex; gap: 15px;">
                    <button id="btn-god" class="btn btn-outline hidden" onclick="renderGodMode()">MODO DIOS ⚙️</button>
                    <button class="btn btn-outline" style="border-color: #ef4444; color: #ef4444;" onclick="logout()">Salir</button>
                </div>
            </header>
            <main id="main-content"></main>
        </div>

        <div id="day-modal" class="modal-overlay hidden">
            <div class="modal-content">
                <button class="close-modal" onclick="document.getElementById('day-modal').classList.add('hidden')">×</button>
                <h2 id="modal-title" style="color: var(--gold); margin-bottom: 20px;">DÍA X</h2>
                <div id="modal-checklist"></div>
            </div>
        </div>

        <script>
            const state = { token: null, user: null, db: null };

            async function req(url, method='GET', body=null) {
                const opt = { method, headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + state.token }};
                if(body) opt.body = JSON.stringify(body);
                const r = await fetch(url, opt);
                return await r.json();
            }

            async function login() {
                const res = await req('/api/login', 'POST', { u: document.getElementById('log-user').value, p: document.getElementById('log-pass').value });
                if(res.success) { state.token = res.token; state.user = res.user; initApp(); }
                else alert("Credenciales incorrectas");
            }

            function logout() { location.reload(); }

            async function initApp() {
                document.getElementById('login-screen').classList.add('hidden');
                document.getElementById('app').classList.remove('hidden');
                if(state.user.rol === 'admin') document.getElementById('btn-god').classList.remove('hidden');
                state.db = await req('/api/data');
                renderHome();
            }

            // --- RENDERIZADORES DE VISTAS ---
            function renderHome() {
                let html = \`<h1 style="margin-bottom: 40px; font-size: 3rem; text-transform: uppercase;">Muro del <span style="color:var(--gold)">1%</span></h1><div class="feed-grid">\`;
                
                // Renderizar Posts
                state.db.posts.forEach(p => {
                    let vid = p.video ? \`<iframe src="\${p.video}" style="width:100%; height:400px; border:none; margin-top:20px; border-radius:8px;"></iframe>\` : '';
                    html += \`<div class="post-card">
                        <div style="color:var(--muted); font-size: 12px; margin-bottom: 10px;">\${p.fecha}</div>
                        <h2 style="color:var(--gold); margin-bottom: 15px;">\${p.titulo}</h2>
                        <p style="line-height: 1.6;">\${p.contenido}</p>
                        \${vid}
                    </div>\`;
                });
                
                html += \`<button class="btn" style="margin-top: 40px; width:100%; padding: 20px; font-size: 1.2rem;" onclick="renderPrograma('novatos')">INGRESAR A MI ENTRENAMIENTO</button>\`;
                document.getElementById('main-content').innerHTML = html;
            }

            function renderPrograma(progKey) {
                const prog = state.db.programas[progKey];
                let html = \`<button class="btn btn-outline" style="margin-bottom:20px;" onclick="renderHome()">← Volver</button>
                            <h1 style="color:var(--gold); font-size: 3rem; margin-bottom: 10px; text-transform:uppercase;">\${prog.titulo}</h1>
                            <p style="color:var(--muted); margin-bottom: 40px;">\${prog.descripcion}</p>\`;

                // 1. Renderizar Tarjetas Expandibles (Nutrición, Entreno, etc)
                Object.entries(prog.tarjetas).forEach(([key, data]) => {
                    html += \`
                    <div class="expandable-card" onclick="this.classList.toggle('active')">
                        <div class="card-header"><span>\${data.titulo}</span> <span>▼</span></div>
                        <div class="card-body">
                            <p style="line-height:1.7; color:#ccc; margin-bottom:15px;">\${data.contenido}</p>
                            \${data.pdf !== '#' ? \`<a href="\${data.pdf}" target="_blank" class="btn btn-outline" style="font-size:12px;">Descargar PDF</a>\` : ''}
                        </div>
                    </div>\`;
                });

                // 2. Renderizar Matriz de 84 Días (Gamificación)
                html += \`<h3 style="margin-top: 50px; border-bottom: 1px solid var(--border); padding-bottom:10px;">TU PROGRESO DIARIO (84 DÍAS)</h3>
                         <div class="matrix-grid">\`;
                
                const cacheUsuario = (state.db.cache_diario[state.user.id] || {})[progKey] || {};

                for(let i=1; i<=84; i++) {
                    const diaKey = \`dia_\${i}\`;
                    const status = cacheUsuario[diaKey] || {};
                    // Chequear si completó al menos una tarea del día
                    const completado = Object.values(status).some(v => v === true) ? 'completed' : '';
                    html += \`<div class="day-btn \${completado}" onclick="abrirDia('\${progKey}', '\${diaKey}', \${i})">\${i}</div>\`;
                }
                html += \`</div>\`;

                document.getElementById('main-content').innerHTML = html;
            }

            // --- LÓGICA DE GAMIFICACIÓN DIARIA ---
            function abrirDia(progKey, diaKey, numDia) {
                const modal = document.getElementById('day-modal');
                document.getElementById('modal-title').innerText = \`DÍA \${numDia} - CHECKLIST\`;
                
                const cacheUsuario = (state.db.cache_diario[state.user.id] || {})[progKey] || {};
                const estadoDia = cacheUsuario[diaKey] || {};

                // Tareas estandarizadas (Esto se puede volver dinámico desde la DB)
                const tareas = [
                    { id: 'sueño', label: 'Dormí 7-8 Horas' },
                    { id: 'agua', label: 'Hidratación Optimizada (3L)' },
                    { id: 'desayuno', label: 'Desayuno Anti-inflamatorio' },
                    { id: 'entreno', label: 'Rutina del Día Completada' }
                ];

                let checkHtml = '';
                tareas.forEach(t => {
                    const activo = estadoDia[t.id] ? 'active' : '';
                    checkHtml += \`
                    <div class="checklist-item \${activo}" onclick="toggleTask(this, '\${progKey}', '\${diaKey}', '\${t.id}')">
                        <div class="check-box"></div>
                        <span>\${t.label}</span>
                    </div>\`;
                });

                document.getElementById('modal-checklist').innerHTML = checkHtml;
                modal.classList.remove('hidden');
            }

            async function toggleTask(el, progKey, diaKey, taskId) {
                const isNowActive = !el.classList.contains('active');
                if(isNowActive) el.classList.add('active'); else el.classList.remove('active');
                
                const res = await req('/api/progreso', 'POST', { progId: progKey, dia: diaKey, task: taskId, valor: isNowActive });
                if(res.success) {
                    state.db.cache_diario[state.user.id] = res.cache;
                    // Recargar visual de la matriz de fondo silenciosamente
                    const btnArray = document.querySelectorAll('.day-btn');
                    const diaNum = parseInt(diaKey.split('_')[1]);
                    const estadoActualizado = res.cache[progKey][diaKey] || {};
                    if(Object.values(estadoActualizado).some(v => v === true)) {
                        btnArray[diaNum-1].classList.add('completed');
                    } else {
                        btnArray[diaNum-1].classList.remove('completed');
                    }
                }
            }

            // --- MODO DIOS (CMS Dinámico) ---
            function renderGodMode() {
                let html = \`
                <button class="btn btn-outline" style="margin-bottom:20px;" onclick="renderHome()">← Salir Modo Dios</button>
                <h1 style="color:var(--gold); font-size: 3rem; margin-bottom: 30px;">PANEL DE CONTROL</h1>
                
                <div class="god-panel">
                    <div class="god-menu">
                        <button class="active" onclick="showTab('god-posts')">📝 Crear Post en Muro</button>
                        <button onclick="showTab('god-cards')">🗂️ Modificar Tarjetas (Programas)</button>
                        <button onclick="showTab('god-users')">👥 Gestión de Alumnos</button>
                    </div>
                    
                    <div class="god-content">
                        <div id="god-posts" class="god-tab">
                            <h2 style="margin-bottom:20px;">Nuevo Post de Autoridad</h2>
                            <input type="text" id="post-tit" class="input" placeholder="Título del Post">
                            <textarea id="post-desc" class="input" style="height:150px;" placeholder="Contenido o reflexión..."></textarea>
                            <input type="text" id="post-vid" class="input" placeholder="URL Video YouTube (Opcional)">
                            <button class="btn" onclick="crearPost()">Publicar al Ecosistema</button>
                        </div>
                        
                        <div id="god-cards" class="god-tab hidden">
                            <h2 style="margin-bottom:20px;">Edición Estructural (JSON Crudo)</h2>
                            <p style="color:var(--muted); font-size:12px; margin-bottom:15px;">Modifica los textos, añade módulos y cambia los links de los PDFs directamente aquí.</p>
                            <textarea id="db-programas-editor" class="input" style="height: 400px; font-family: monospace; font-size:13px;">\${JSON.stringify(state.db.programas, null, 2)}</textarea>
                            <button class="btn">Guardar Estructura</button>
                        </div>

                         <div id="god-users" class="god-tab hidden">
                            <h2 style="margin-bottom:20px;">Métricas Próximamente</h2>
                            <p style="color:var(--muted);">Visualización del caché de alumnos en la siguiente actualización.</p>
                        </div>
                    </div>
                </div>\`;
                
                document.getElementById('main-content').innerHTML = html;
            }

            function showTab(tabId) {
                document.querySelectorAll('.god-tab').forEach(e => e.classList.add('hidden'));
                document.getElementById(tabId).classList.remove('hidden');
            }

            async function crearPost() {
                const payload = {
                    titulo: document.getElementById('post-tit').value,
                    contenido: document.getElementById('post-desc').value,
                    video: document.getElementById('post-vid').value
                };
                await req('/api/godmode/post', 'POST', payload);
                alert("Post Inyectado con éxito.");
                state.db = await req('/api/data'); // Refrescar estado global
                renderHome();
            }
        </script>
    </body>
    </html>
    `);
});

const PORT = 3000;
app.listen(PORT, () => console.log("🔥 MOTOR V11.0 OMNIVERSO EN LÍNEA. LISTO PARA DESPLIEGUE."));
