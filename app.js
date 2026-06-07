// ==========================================
// 1. DATA MOCK (ESTADOS SIMULADOS)
// ==========================================
let mockUsers = [
    { name: "Carlos Mendoza", email: "carlos@gmail.com", role: "Socio de Oro", status: "Activo" },
    { name: "Isabella Gómez", email: "isabella@hotmail.com", role: "Estudiante", status: "Activo" },
    { name: "Marcos Torres", email: "marcos.t@outlook.com", role: "Socio Plan Gym", status: "Inactivo" }
];

let mockPayments = [
    { id: 101, user: "Andry Suárez", amount: "$350", method: "Pago Móvil", date: "06/06/2026", status: "Pendiente" },
    { id: 102, user: "Heider Noguera", amount: "$190", method: "Transferencia", date: "05/06/2026", status: "Validado" },
    { id: 103, user: "Daniel Castillo", amount: "$350", method: "Pago Móvil", date: "04/06/2026", status: "Pendiente" }
];

// DATA DE RUTINAS EXPANDIDA (Estructura de 6 días completos con Abdomen, Antebrazo y Running)
const mockUserRoutines = [
    {
        day: "Día 1 - Pecho y Tríceps",
        exercises: [
            { name: "Press Banca Plano", series: "4x10", note: "Controlar la fase excéntrica" },
            { name: "Press Inclinado con Mancuernas", series: "3x12", note: "Enfoque en haz clavicular" },
            { name: "Fondos en Paralelas (Tríceps)", series: "3xMax", note: "Mantener cuerpo erguido" },
            { name: "Extensiones en Polea Alta", series: "4x12", note: "Sostenido 1s abajo" },
            { name: "Abdomen: Crunches en Polea", series: "4x20", note: "Enfoque en contracción" }
        ]
    },
    {
        day: "Día 2 - Espalda y Bíceps",
        exercises: [
            { name: "Dominadas / Jalón al Pecho", series: "4x8", note: "Máxima elongación" },
            { name: "Remo con Barra", series: "3x10", note: "Sujeción supina" },
            { name: "Curl de Bíceps Alterno", series: "4x12", note: "Giro supinado al subir" },
            { name: "Curl Martillo (Bíceps/Antebrazo)", series: "3x12", note: "Agarre neutro continuo" },
            { name: "Extensión de Muñeca (Antebrazo)", series: "3x15", note: "Barra corta en polea baja" }
        ]
    },
    {
        day: "Día 3 - Piernas y Hombro",
        exercises: [
            { name: "Sentadilla Libre Profunda", series: "4x10", note: "Aumento progresivo de carga" },
            { name: "Prensa Inclinada", series: "3x12", note: "Bajo la paralela" },
            { name: "Press Militar con Barra (Hombro)", series: "4x8", note: "Cuidar la zona lumbar" },
            { name: "Elevaciones Laterales Mancuerna", series: "4x15", note: "Bajo peso, alta densidad" },
            { name: "Cardio: Running Intervalado", series: "20 min", note: "Hiit: 1min sprint x 1min trote" }
        ]
    },
    {
        day: "Día 4 - Pecho y Tríceps",
        exercises: [
            { name: "Press Banca Inclinado con Barra", series: "4x10", note: "Enfoque en fuerza" },
            { name: "Aperturas en Peck Deck", series: "3x15", note: "Aislamiento pectoral máximo" },
            { name: "Press Francés con Barra Z", series: "4x10", note: "Bajar controlado a la frente" },
            { name: "Abdomen: Elevación de Piernas Colgado", series: "4x15", note: "Evitar el balanceo" },
            { name: "Abdomen: Plancha Isométrica", series: "4x1 min", note: "Core totalmente compacto" }
        ]
    },
    {
        day: "Día 5 - Espalda y Bíceps",
        exercises: [
            { name: "Remo Gironda (Polea Baja)", series: "4x12", note: "Retracción escapular marcada" },
            { name: "Pullover con Cuerda en Polea", series: "3x15", note: "Aislamiento de dorsales" },
            { name: "Curl de Bíceps en Banco Predicador", series: "4x10", note: "Extensión casi completa" },
            { name: "Flexión de Muñeca (Antebrazo)", series: "3x15", note: "Barra con agarre prono" },
            { name: "Cardio: Running en Cinta (LISS)", series: "25 min", note: "Ritmo constante zona aeróbica" }
        ]
    },
    {
        day: "Día 6 - Pierna y Hombro",
        exercises: [
            { name: "Peso Muerto Rumano", series: "4x10", note: "Enfoque en isquiotibiales y glúteos" },
            { name: "Extensiones de Cuádriceps", series: "4x15", note: "Isometría de 2s arriba" },
            { name: "Press Arnold", series: "3x12", note: "Rotación fluida de muñeca" },
            { name: "Pájaros con Mancuerna (Deltoide Post)", series: "4x15", note: "Tronco inclinado hacia adelante" },
            { name: "Abdomen: Giros Rusos con Disco", series: "4x24", note: "Trabajo de oblicuos" }
        ]
    }
];

// Inicialización de la Aplicación (Manejador del Ciclo de Vida del DOM)
document.addEventListener("DOMContentLoaded", () => {
    renderUsersTable();
    renderPaymentsTable();
    renderUserRoutines();
    initializeCharts();
});

// ==========================================
// 2. CONTROLADOR DE ENTORNO (ADMIN VS USER)
// ==========================================
function switchEnvironment(env) {
    const adminEnv = document.getElementById('admin-environment');
    const userEnv = document.getElementById('user-environment');
    const buttons = document.querySelectorAll('.env-btn');

    buttons.forEach(btn => btn.classList.remove('active-env'));

    if(env === 'admin') {
        adminEnv.classList.remove('hidden-env');
        userEnv.classList.add('hidden-env');
        buttons[0].classList.add('active-env');
    } else {
        adminEnv.classList.add('hidden-env');
        userEnv.classList.remove('hidden-env');
        buttons[1].classList.add('active-env');
    }
}

// ==========================================
// 3. NAVEGACIÓN SINGLE PAGE APPLICATION (SPA)
// ==========================================
function navigateAdmin(viewId) {
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active-section');
    });
    document.getElementById(viewId).classList.add('active-section');

    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

function navigateUser(tabId, element) {
    document.querySelectorAll('.user-tab').forEach(tab => {
        tab.classList.remove('active-tab');
    });
    document.getElementById(tabId).classList.add('active-tab');

    document.querySelectorAll('.nav-icon').forEach(icon => {
        icon.classList.remove('active');
    });
    element.classList.add('active');
}

// ==========================================
// 4. LÓGICA DE TABLAS Y ACCIÓN DE VALIDACIÓN
// ==========================================
function renderUsersTable() {
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = mockUsers.map(u => `
        <tr>
            <td><strong>${u.name}</strong></td>
            <td>${u.email}</td>
            <td>${u.role}</td>
            <td><span class="status-badge ${u.status === 'Activo' ? 'success' : 'pending'}">${u.status}</span></td>
            <td><button class="btn-action"><i class="fa-solid fa-pen-to-square"></i></button></td>
        </tr>
    `).join('');
}

function renderPaymentsTable() {
    const tbody = document.getElementById('payments-table-body');
    tbody.innerHTML = mockPayments.map(p => `
        <tr id="pay-row-${p.id}">
            <td><strong>${p.user}</strong></td>
            <td>${p.amount}</td>
            <td><i class="fa-solid fa-money-bill-transfer"></i> ${p.method}</td>
            <td>${p.date}</td>
            <td><span class="status-badge ${p.status === 'Validado' ? 'success' : 'pending'}">${p.status}</span></td>
            <td>
                ${p.status === 'Pendiente' 
                    ? `<button class="btn-action validate" onclick="validatePaymentSimulation(${p.id})">Validar</button>` 
                    : `<i class="fa-solid fa-circle-check text-green" style="font-size:18px; margin-left:15px;"></i>`
                }
            </td>
        </tr>
    `).join('');
}

function validatePaymentSimulation(id) {
    const payment = mockPayments.find(p => p.id === id);
    if(payment) {
        payment.status = "Validado";
        
        const row = document.getElementById(`pay-row-${id}`);
        const badge = row.querySelector('.status-badge');
        badge.className = "status-badge success";
        badge.innerText = "Validado";
        
        const actionCell = row.cells[5];
        actionCell.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#22c55e; font-size:18px; margin-left:15px;"></i>`;
    }
}

// ==========================================
// 5. COMPONENTES INTERACTIVOS MÓVILES (RUTINAS)
// ==========================================
function renderUserRoutines() {
    const routinesContainer = document.getElementById('u-routines');
    let htmlContent = `<h2 class="tab-title">Mis Rutinas</h2>`;
    
    mockUserRoutines.forEach((routine) => {
        const exercisesList = routine.exercises.map(ex => `
            <div class="exercise-row" style="padding: 8px 0; border-bottom: 1px solid #262626; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <span style="color: #fff; font-weight: 500; display: block;">${ex.name}</span>
                    <small style="color: #737373; font-size: 11px;">${ex.note}</small>
                </div>
                <span class="text-green" style="font-weight: 600; font-size: 13px;">${ex.series}</span>
            </div>
        `).join('');

        htmlContent += `
            <div class="accordion-item">
                <div class="accordion-header" onclick="toggleAccordion(this)">
                    <span><i class="fa-solid fa-calendar-day text-green" style="margin-right: 8px;"></i> ${routine.day}</span>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <div class="accordion-content" style="padding: 12px 16px; background-color: #161616;">
                    ${exercisesList}
                </div>
            </div>
        `;
    });
    
    routinesContainer.innerHTML = htmlContent;
}

function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.fa-chevron-down, .fa-chevron-up');
    
    if(content.style.display === "block") {
        content.style.display = "none";
        icon.className = "fa-solid fa-chevron-down";
    } else {
        content.style.display = "block";
        icon.className = "fa-solid fa-chevron-up";
    }
}

// ==========================================
// 6. RENDERIZADO DE GRÁFICAS (CHART.JS)
// ==========================================
function initializeCharts() {
    const ctxIncome = document.getElementById('incomeChart').getContext('2d');
    new Chart(ctxIncome, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
                label: 'Ingresos Mensuales ($)',
                data: [3200, 4100, 3900, 5400, 6420, 7100],
                borderColor: '#6366F1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    const ctxMemberships = document.getElementById('membershipChart').getContext('2d');
    new Chart(ctxMemberships, {
        type: 'doughnut',
        data: {
            labels: ['Mensual', 'Trimestral', 'Anual'],
            datasets: [{
                data: [120, 98, 54],
                backgroundColor: ['#6366F1', '#10B981', '#F59E0B'],
                borderWidth: 0
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}