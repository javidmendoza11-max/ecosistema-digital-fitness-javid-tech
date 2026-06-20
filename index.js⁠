/**
 * ==============================================================================
 * SISTEMA MAESTRO UNIFICADO v4.0: MODO DIOS, INTERFAZ FLUIDA Y ESTÉTICA LUXURY
 * ==============================================================================
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = path.join(__dirname, 'database.json');

// --- 1. INICIALIZACIÓN DE BASE DE DATOS (AUTO-CREACIÓN) ---
const dbInicial = {
    configuracion: {
        instagram: "https://instagram.com/",
        youtube: "https://youtube.com/",
        whatsapp: "https://wa.me/573000000000"
    },
    feed: {
        tituloVideo: "La Mentalidad del 1% (Cero Excusas)",
        urlVideo: "https://www.youtube.com/embed/jNQXAC9IVRw",
        descVideo: "Javid tech te explica cómo blindar tu mente para esta semana."
    }
};

// Si no existe la base de datos, la crea automáticamente
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(dbInicial, null, 2));
}

function leerDB() {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function guardarDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// --- 2. ENDPOINTS DE LA API ---

// API Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === "cliente_vip" && password === "fitness2026") {
        res.json({ success: true, role: "cliente", message: "Acceso Cliente Concedido." });
    } else if (username === "javid_admin" && password === "mododios") {
        res.json({ success: true, role: "admin", message: "Modo Administrador Activado." });
    } else {
        res.status(401).json({ success: false, message: "Credenciales incorrectas." });
    }
});

// API Obtener Datos
app.get('/api/datos', (req, res) => {
    res.json(leerDB());
});

// API Guardar Datos (Modo Dios)
app.post('/api/admin/actualizar', (req, res) => {
    try {
        guardarDB(req.body);
        res.json({ success: true, message: "Cambios guardados permanentemente." });
    } catch (e) {
        res.status(500).json({ success: false, message: "Error al guardar." });
    }
});

// IA Chat Simple
app.post('/api/javid-tech/chat', (req, res) => {
    res.json({ javidReply: "Soy Javid tech. He registrado tu interacción. Sigue ejecutando tu plan, la consistencia es la clave del alto rendimiento." });
});

// --- 3. FRONTEND MAGISTRAL (UI LUXURY, FLUIDA Y MINIMALISTA) ---
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Plataforma High-Ticket | Javid Mendoza Coach</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
        <style>
            /* ESTÉTICA LUXURY: NEGRO Y DORADO MINIMALISTA */
            :root {
                --bg-main: #050505; --bg-panel: #0f0f0f; --bg-card: #1a1a1a;
                --border-color: #2a2a2a; --primary-gold: #D4AF37; --gold-hover: #F3E5AB;
                --text-main: #ffffff; --text-muted: #888888;
                --shadow-gold: 0 0 15px rgba(212, 175, 55, 0.2);
            }
            * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
            body { background-color: var(--bg-main); color: var(--text-main); height: 100vh; overflow: hidden; display: flex; }
            
            /* Utilidades UI */
            .hidden { display: none !important; }
            button { cursor: pointer; transition: 0.3s; }
            
            /* --- PANTALLAS --- */
            .screen { position: absolute; width: 100%; height: 100%; display: flex; flex-direction: column; z-index: 1; background: var(--bg-main); transition: 0.4s;}
            
            /* LOGIN */
            #login-screen { justify-content: center; align-items: center; z-index: 100; }
            .login-box { background: var(--bg-panel); padding: 40px; border-radius: 12px; border: 1px solid var(--border-color); text-align: center; width: 350px; box-shadow: var(--shadow-gold); }
            .login-box input { width: 100%; padding: 15px; margin-bottom: 15px; border-radius: 6px; border: 1px solid var(--border-color); background: var(--bg-main); color: white; outline: none; }
            .login-box input:focus { border-color: var(--primary-gold); }
            .login-box button { width: 100%; padding: 15px; background: var(--primary-gold); color: black; border: none; border-radius: 6px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
            
            /* --- LAYOUT PRINCIPAL FLUIDO --- */
            header { display: flex; justify-content: space-between; align-items: center; padding: 15px 30px; background: var(--bg-panel); border-bottom: 1px solid var(--border-color); height: 70px;}
            .menu-btn { background: transparent; border: 1px solid var(--primary-gold); color: var(--primary-gold); padding: 8px 15px; border-radius: 4px; font-weight: bold; }
            
            .main-content { display: flex; height: calc(100vh - 70px); position: relative; }
            
            /* SIDEBAR RETRÁCTIL */
            .sidebar { width: 280px; background: var(--bg-panel); border-right: 1px solid var(--border-color); transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1); overflow-y: auto; display: flex; flex-direction: column;}
            .sidebar.collapsed { width: 0; transform: translateX(-100%); border: none; }
            .nav-item { padding: 18px 25px; border-bottom: 1px solid var(--border-color); cursor: pointer; color: var(--text-muted); font-weight: 600; display: flex; justify-content: space-between;}
            .nav-item:hover, .nav-item.active { color: var(--primary-gold); border-left: 3px solid var(--primary-gold); background: rgba(212, 175, 55, 0.05); }

            /* ESPACIO DE TRABAJO (CENTRO) */
            .workspace { flex: 1; padding: 40px; overflow-y: auto; transition: 0.3s; position: relative;}
            
            /* TARJETAS Y FEED */
            .card { background: var(--bg-card); padding: 25px; border-radius: 12px; border: 1px solid var(--border-color); margin-bottom: 20px; }
            .video-container iframe { width: 100%; height: 450px; border-radius: 8px; border: 1px solid var(--border-color); }
            
            /* ENLACES SOCIALES DINÁMICOS */
            .social-links { display: flex; gap: 15px; margin-top: 20px; }
            .social-btn { padding: 10px 20px; background: var(--bg-panel); border: 1px solid var(--border-color); color: white; text-decoration: none; border-radius: 6px; font-size: 14px; transition: 0.3s;}
            .social-btn:hover { border-color: var(--primary-gold); color: var(--primary-gold); }

            /* --- ASISTENTE IA FLOTANTE --- */
            .ai-fab { position: fixed; bottom: 30px; right: 30px; width: 60px; height: 60px; background: var(--primary-gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: var(--shadow-gold); z-index: 50; transition: transform 0.2s; font-size: 24px; color: black; font-weight:bold;}
            .ai-fab:hover { transform: scale(1.1); }
            
            .ai-panel { position: fixed; bottom: 100px; right: 30px; width: 350px; height: 500px; background: var(--bg-panel); border: 1px solid var(--primary-gold); border-radius: 12px; display: flex; flex-direction: column; transform: translateY(20px); opacity: 0; pointer-events: none; transition: 0.3s; z-index: 49; box-shadow: 0 10px 30px rgba(0,0,0,0.5);}
            .ai-panel.open { transform: translateY(0); opacity: 1; pointer-events: all; }
            .ai-header { padding: 15px; background: var(--bg-card); border-bottom: 1px solid var(--border-color); font-weight: bold; color: var(--primary-gold); border-radius: 12px 12px 0 0;}
            .chat-box { flex: 1; padding: 15px; overflow-y: auto; color: var(--text-muted); font-size: 14px; }
            .chat-input { display: flex; padding: 15px; border-top: 1px solid var(--border-color); }
            .chat-input input { flex: 1; padding: 10px; background: var(--bg-main); border: 1px solid var(--border-color); color: white; border-radius: 4px; outline:none;}
            
            /* --- MODO DIOS (PANEL ADMIN) --- */
            #admin-panel { background: rgba(212, 175, 55, 0.1); border: 1px solid var(--primary-gold); }
            .admin-form-group { margin-bottom: 15px; }
            .admin-form-group label { display: block; margin-bottom: 5px; font-size: 13px; color: var(--primary-gold); }
            .admin-form-group input { width: 100%; padding: 10px; background: var(--bg-main); border: 1px solid var(--border-color); color: white; border-radius: 4px; }
            .save-btn { background: var(--primary-gold); color: black; padding: 10px 20px; border: none; font-weight: bold; border-radius: 4px; width: 100%; margin-top: 10px;}

        </style>
    </head>
    <body>

        <div id="login-screen" class="screen">
            <div class="login-box">
                <h1 style="color:var(--primary-gold); margin-bottom:5px; font-size:24px;">JAVID MENDOZA</h1>
                <p style="color:var(--text-muted); margin-bottom:30px; font-size:12px; letter-spacing:2px; text-transform:uppercase;">Ecosistema Digital</p>
                <input type="text" id="user-input" placeholder="Usuario">
                <input type="password" id="pass-input" placeholder="Contraseña">
                <button onclick="login()">Ingresar</button>
                <p id="login-err" style="color:#ef4444; font-size:13px; margin-top:15px; min-height:15px;"></p>
                <p style="font-size:10px; color:#555; margin-top:20px;">Acceso Cliente: cliente_vip / fitness2026<br>Acceso Admin: javid_admin / mododios</p>
            </div>
        </div>

        <div id="dashboard-screen" class="screen hidden">
            
            <header>
                <div style="display:flex; align-items:center; gap:15px;">
                    <button class="menu-btn" onclick="toggleSidebar()">☰ MENÚ</button>
                    <h2 style="font-size:18px; color:var(--text-main);">PLATAFORMA <span style="color:var(--primary-gold);">ÉLITE</span></h2>
                </div>
                <div style="display:flex; gap:15px;">
                    <button id="btn-modo-dios" class="menu-btn hidden" style="background:var(--primary-gold); color:black;" onclick="mostrarAdmin()">⚙️ MODO DIOS</button>
                    <button class="menu-btn" style="border-color:#ef4444; color:#ef4444;" onclick="location.reload()">SALIR</button>
                </div>
            </header>

            <div class="main-content">
                <aside class="sidebar" id="sidebar">
                    <div style="padding:20px; font-size:11px; color:var(--text-muted); letter-spacing:1px; text-transform:uppercase;">Centro de Control</div>
                    <div class="nav-item active" onclick="mostrarFeed()">📺 Bienvenida & Feed</div>
                    <div class="nav-item" onclick="mostrarPrograma('novatos')">🌱 Nivel 1: Novatos</div>
                    <div class="nav-item" onclick="mostrarPrograma('intermedio')">🔥 Nivel 2: Intermedio <span style="font-size:10px;">🔒</span></div>
                    <div class="nav-item" onclick="mostrarPrograma('avanzado')">🏆 Nivel 3: Avanzado <span style="font-size:10px;">🔒</span></div>
                </aside>

                <main class="workspace" id="workspace">
                    </main>

                <div class="ai-fab" onclick="toggleAI()">IA</div>
                <div class="ai-panel" id="ai-panel">
                    <div class="ai-header">Javid tech ⚡</div>
                    <div class="chat-box" id="chat-box">
                        <p style="margin-bottom:10px;"><strong>Javid tech:</strong> Plataforma en línea. Analizando métricas. ¿En qué te guío hoy?</p>
                    </div>
                    <div class="chat-input">
                        <input type="text" id="chat-input-text" placeholder="Consultar a la IA..." onkeypress="if(event.key==='Enter') enviarMsg()">
                    </div>
                </div>
            </div>
        </div>

        <script>
            let datosGlobales = {};
            let rolUsuario = "";

            // --- 1. LÓGICA DE LOGIN Y ARRANQUE ---
            async function login() {
                const u = document.getElementById('user-input').value;
                const p = document.getElementById('pass-input').value;
                try {
                    const res = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({username:u, password:p})});
                    const data = await res.json();
                    
                    if(data.success) {
                        rolUsuario = data.role;
                        document.getElementById('login-screen').classList.add('hidden');
                        document.getElementById('dashboard-screen').classList.remove('hidden');
                        
                        // Si es admin, mostrar botón secreto
                        if(rolUsuario === "admin") {
                            document.getElementById('btn-modo-dios').classList.remove('hidden');
                        }
                        
                        cargarDatosServidor();
                    } else {
                        document.getElementById('login-err').innerText = data.message;
                    }
                } catch(e) { document.getElementById('login-err').innerText = "Error conectando al servidor."; }
            }

            // --- 2. COMUNICACIÓN CON BASE DE DATOS ---
            async function cargarDatosServidor() {
                const res = await fetch('/api/datos');
                datosGlobales = await res.json();
                mostrarFeed(); // Pantalla inicial
            }

            async function guardarCambiosAdmin() {
                // Recoger datos del formulario
                const nuevaData = {
                    configuracion: {
                        instagram: document.getElementById('admin-ig').value,
                        youtube: document.getElementById('admin-yt').value,
                        whatsapp: document.getElementById('admin-wa').value
                    },
                    feed: {
                        tituloVideo: document.getElementById('admin-vid-tit').value,
                        urlVideo: document.getElementById('admin-vid-url').value,
                        descVideo: datosGlobales.feed.descVideo // Mantenemos descripción para no complicar
                    }
                };

                const res = await fetch('/api/admin/actualizar', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(nuevaData)});
                const data = await res.json();
                
                if(data.success) {
                    alert("¡Modo Dios: Base de datos actualizada con éxito!");
                    datosGlobales = nuevaData;
                    mostrarFeed(); // Recargar la vista para ver los cambios
                }
            }

            // --- 3. RENDERIZADO DINÁMICO (VISTAS) ---
            function mostrarFeed() {
                activarMenu(0);
                const feed = datosGlobales.feed;
                const config = datosGlobales.configuracion;

                document.getElementById('workspace').innerHTML = \`
                    <h1 style="color:var(--primary-gold); margin-bottom:20px;">Bienvenido al Ecosistema</h1>
                    
                    <div class="card">
                        <h2 style="margin-bottom:15px;">\${feed.tituloVideo}</h2>
                        <div class="video-container">
                            <iframe src="\${feed.urlVideo}" allowfullscreen></iframe>
                        </div>
                    </div>

                    <div class="card">
                        <h3 style="margin-bottom:15px; color:var(--primary-gold);">Redes de Contacto Oficiales</h3>
                        <p style="font-size:14px; color:var(--text-muted); margin-bottom:15px;">Estos enlaces son funcionales y dinámicos.</p>
                        <div class="social-links">
                            <a href="\${config.instagram}" target="_blank" class="social-btn">📷 Instagram</a>
                            <a href="\${config.youtube}" target="_blank" class="social-btn">▶️ YouTube</a>
                            <a href="\${config.whatsapp}" target="_blank" class="social-btn">📱 WhatsApp Élite</a>
                        </div>
                    </div>
                \`;
            }

            function mostrarAdmin() {
                const feed = datosGlobales.feed;
                const config = datosGlobales.configuracion;

                document.getElementById('workspace').innerHTML = \`
                    <div class="card" id="admin-panel">
                        <h1 style="color:var(--primary-gold); margin-bottom:20px;">⚙️ MODO DIOS (Panel de Control)</h1>
                        <p style="margin-bottom:20px; font-size:14px; color:var(--text-muted);">Los cambios que hagas aquí se guardarán permanentemente en la base de datos de la plataforma.</p>
                        
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:30px;">
                            <div>
                                <h3 style="margin-bottom:15px; border-bottom:1px solid var(--primary-gold); padding-bottom:5px;">Enlaces Sociales</h3>
                                <div class="admin-form-group"><label>Instagram URL:</label><input type="text" id="admin-ig" value="\${config.instagram}"></div>
                                <div class="admin-form-group"><label>YouTube URL:</label><input type="text" id="admin-yt" value="\${config.youtube}"></div>
                                <div class="admin-form-group"><label>WhatsApp URL:</label><input type="text" id="admin-wa" value="\${config.whatsapp}"></div>
                            </div>
                            <div>
                                <h3 style="margin-bottom:15px; border-bottom:1px solid var(--primary-gold); padding-bottom:5px;">Video de Bienvenida</h3>
                                <div class="admin-form-group"><label>Título del Video:</label><input type="text" id="admin-vid-tit" value="\${feed.tituloVideo}"></div>
                                <div class="admin-form-group"><label>URL de YouTube (Formato Embed):</label><input type="text" id="admin-vid-url" value="\${feed.urlVideo}"></div>
                                <p style="font-size:11px; color:#ef4444;">Nota: Usa enlaces que contengan '/embed/' para que funcionen correctamente en el reproductor.</p>
                            </div>
                        </div>
                        <button class="save-btn" onclick="guardarCambiosAdmin()">💾 GUARDAR CAMBIOS EN LA MATRIZ</button>
                    </div>
                \`;
            }

            function mostrarPrograma(id) {
                // Por ahora una vista simple para no saturar el código, luego conectamos la gamificación aislada
                document.getElementById('workspace').innerHTML = \`
                    <div class="card">
                        <h1 style="color:var(--primary-gold); margin-bottom:10px;">Módulo Activo: \${id.toUpperCase()}</h1>
                        <p style="color:var(--text-muted);">El contenido profundo y las tareas interactivas de este nivel se cargarán en la siguiente fase de desarrollo. Vuelve al Feed o al Modo Dios por ahora.</p>
                    </div>
                \`;
            }

            // --- 4. INTERACCIONES DE LA INTERFAZ (UI FLUIDA) ---
            function toggleSidebar() {
                document.getElementById('sidebar').classList.toggle('collapsed');
            }

            function toggleAI() {
                document.getElementById('ai-panel').classList.toggle('open');
            }

            function activarMenu(index) {
                const items = document.querySelectorAll('.nav-item');
                items.forEach(i => i.classList.remove('active'));
                items[index].classList.add('active');
            }

            async function enviarMsg() {
                const input = document.getElementById('chat-input-text');
                const box = document.getElementById('chat-box');
                if(!input.value.trim()) return;
                box.innerHTML += \`<p style="margin-top:10px; color:white;"><strong>Tú:</strong> \${input.value}</p>\`;
                input.value = '';
                box.scrollTop = box.scrollHeight;
                
                const res = await fetch('/api/javid-tech/chat', { method: 'POST'});
                const data = await res.json();
                setTimeout(() => {
                    box.innerHTML += \`<p style="margin-top:10px; color:var(--primary-gold);"><strong>Javid tech:</strong> \${data.javidReply}</p>\`;
                    box.scrollTop = box.scrollHeight;
                }, 600);
            }
        </script>
    </body>
    </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("🚀 MATRIZ V4 INICIALIZADA: MODO DIOS ACTIVADO.");
    console.log(`🌐 Servidor corriendo en puerto ${PORT}`);
});
