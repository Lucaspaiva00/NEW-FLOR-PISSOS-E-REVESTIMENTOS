const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const year = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const budgetForm = document.getElementById("budgetForm");

if (year) {
    year.textContent = new Date().getFullYear();
}

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
        });
    });
}

/* reveal */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const trigger = window.innerHeight * 0.88;

    reveals.forEach((item) => {
        const top = item.getBoundingClientRect().top;
        if (top < trigger) {
            item.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* contato rápido */
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const empresa = document.getElementById("empresa").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        const texto =
            `Olá, vim pelo site da New Floor.%0A%0A` +
            `*Contato rápido*%0A` +
            `Nome: ${nome || "-"}%0A` +
            `Empresa: ${empresa || "-"}%0A` +
            `Telefone: ${telefone || "-"}%0A` +
            `Mensagem: ${mensagem || "-"}`;

        window.open(`https://wa.me/5519999999700?text=${texto}`, "_blank");
    });
}

/* wizard */
const wizardSteps = document.querySelectorAll(".wizard-step");
const stepIndicators = document.querySelectorAll(".stepper-item");
const nextButtons = document.querySelectorAll(".next-step");
const prevButtons = document.querySelectorAll(".prev-step");

let currentStep = 1;

function showStep(step) {
    currentStep = step;

    wizardSteps.forEach((item) => {
        item.classList.toggle("active", Number(item.dataset.step) === step);
    });

    stepIndicators.forEach((item) => {
        const indicatorStep = Number(item.dataset.stepIndicator);
        item.classList.remove("active", "done");

        if (indicatorStep === step) {
            item.classList.add("active");
        } else if (indicatorStep < step) {
            item.classList.add("done");
        }
    });

    window.scrollTo({
        top: document.querySelector(".wizard-column")?.offsetTop - 90 || 0,
        behavior: "smooth"
    });
}

nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const next = Number(button.dataset.next);
        showStep(next);
    });
});

prevButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const prev = Number(button.dataset.prev);
        showStep(prev);
    });
});

/* cálculo da área */
const comprimentoInput = document.getElementById("comprimento");
const larguraInput = document.getElementById("largura");
const areaTotalInput = document.getElementById("area_total");

function calcularArea() {
    if (!comprimentoInput || !larguraInput || !areaTotalInput) return;

    const comprimento = parseFloat(comprimentoInput.value) || 0;
    const largura = parseFloat(larguraInput.value) || 0;
    const area = comprimento * largura;

    areaTotalInput.value = area > 0 ? `${area.toFixed(2)} m²` : "";
}

if (comprimentoInput && larguraInput) {
    comprimentoInput.addEventListener("input", calcularArea);
    larguraInput.addEventListener("input", calcularArea);
}

/* blocos condicionais */
const servicoPrincipalInputs = document.querySelectorAll('input[name="servico_principal"]');
const blocoPintura = document.getElementById("blocoPintura");
const blocoRevestimento = document.getElementById("blocoRevestimento");
const blocoLapidacao = document.getElementById("blocoLapidacao");

function updateServicoBlocos() {
    const selecionado = document.querySelector('input[name="servico_principal"]:checked')?.value || "";

    blocoPintura?.classList.remove("active");
    blocoRevestimento?.classList.remove("active");
    blocoLapidacao?.classList.remove("active");

    if (selecionado === "Pintura") {
        blocoPintura?.classList.add("active");
    }

    if (selecionado === "Revestimento") {
        blocoRevestimento?.classList.add("active");
    }

    if (selecionado === "Lapidação") {
        blocoLapidacao?.classList.add("active");
    }
}

servicoPrincipalInputs.forEach((input) => {
    input.addEventListener("change", updateServicoBlocos);
});

const supVerticaisInputs = document.querySelectorAll('input[name="sup_verticais"]');
const demarcacoesInputs = document.querySelectorAll('input[name="demarcacoes"]');
const blocoVerticais = document.getElementById("blocoVerticais");
const blocoDemarcacoes = document.getElementById("blocoDemarcacoes");

function updateVerticais() {
    const valor = document.querySelector('input[name="sup_verticais"]:checked')?.value || "Não";
    blocoVerticais?.classList.toggle("active", valor === "Sim");
}

function updateDemarcacoes() {
    const valor = document.querySelector('input[name="demarcacoes"]:checked')?.value || "Não";
    blocoDemarcacoes?.classList.toggle("active", valor === "Sim");
}

supVerticaisInputs.forEach((input) => {
    input.addEventListener("change", updateVerticais);
});

demarcacoesInputs.forEach((input) => {
    input.addEventListener("change", updateDemarcacoes);
});

updateServicoBlocos();
updateVerticais();
updateDemarcacoes();

/* orçamento personalizado */
if (budgetForm) {
    budgetForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const getValue = (id) => {
            const el = document.getElementById(id);
            return el ? el.value.trim() : "";
        };

        const getRadioValue = (name) => {
            const checked = document.querySelector(`input[name="${name}"]:checked`);
            return checked ? checked.value : "";
        };

        const texto =
            `Olá, vim pelo site da New Floor e quero solicitar um orçamento personalizado.%0A%0A` +

            `*1. DADOS DO SOLICITANTE*%0A` +
            `Nome: ${getValue("orc_nome") || "-"}%0A` +
            `Empresa: ${getValue("orc_empresa") || "-"}%0A` +
            `Telefone: ${getValue("orc_telefone") || "-"}%0A` +
            `E-mail: ${getValue("orc_email") || "-"}%0A` +
            `Cidade/UF: ${getValue("orc_cidade") || "-"}%0A%0A` +

            `*2. CONDIÇÃO DO SUBSTRATO / BASE*%0A` +
            `Condição: ${getValue("substrato") || "-"}%0A` +
            `Observações da base: ${getValue("substrato_outros") || "-"}%0A%0A` +

            `*3. ÁREA E MODELO DE ORÇAMENTO*%0A` +
            `Comprimento (m): ${getValue("comprimento") || "-"}%0A` +
            `Largura (m): ${getValue("largura") || "-"}%0A` +
            `Área total: ${getValue("area_total") || "-"}%0A` +
            `Tipo de orçamento: ${getRadioValue("tipo_orcamento") || "-"}%0A` +
            `Serviço principal: ${getRadioValue("servico_principal") || "-"}%0A%0A` +

            `*4. SISTEMA / DETALHES*%0A` +
            `Pintura - tipo: ${getValue("pintura_tipo") || "-"}%0A` +
            `Pintura - micras: ${getValue("pintura_micras") || "-"}%0A` +
            `Pintura - observações: ${getValue("pintura_obs") || "-"}%0A` +
            `Revestimento - tipo: ${getValue("revest_tipo") || "-"}%0A` +
            `Revestimento - acabamento: ${getValue("revest_acabamento") || "-"}%0A` +
            `Revestimento - espessura (mm): ${getValue("revest_espessura") || "-"}%0A` +
            `Revestimento - outros: ${getValue("revest_outros") || "-"}%0A` +
            `Lapidação - tipo: ${getValue("lapidacao_tipo") || "-"}%0A` +
            `Lapidação - observações: ${getValue("lapidacao_obs") || "-"}%0A%0A` +

            `*5. COMPLEMENTOS*%0A` +
            `Possui superfícies verticais: ${getRadioValue("sup_verticais") || "-"}%0A` +
            `Tipo superfície vertical: ${getValue("sup_tipo") || "-"}%0A` +
            `Comprimento superfície vertical (m): ${getValue("sup_comprimento") || "-"}%0A` +
            `Altura superfície vertical (cm): ${getValue("sup_altura") || "-"}%0A%0A` +

            `Possui demarcações: ${getRadioValue("demarcacoes") || "-"}%0A` +
            `Faixas - largura (cm): ${getValue("faixas_largura") || "-"}%0A` +
            `Faixas - comprimento (m): ${getValue("faixas_comprimento") || "-"}%0A` +
            `Hidrantes - quantidade: ${getValue("hidrantes_qtd") || "-"}%0A` +
            `Extintores - quantidade: ${getValue("extintores_qtd") || "-"}%0A` +
            `PNE - quantidade: ${getValue("pne_qtd") || "-"}%0A` +
            `Faixa zebrada - largura (m): ${getValue("zebrada_largura") || "-"}%0A` +
            `Faixa zebrada - comprimento (m): ${getValue("zebrada_comprimento") || "-"}%0A` +
            `Divisões / especificar: ${getValue("divisoes_obs") || "-"}%0A%0A` +

            `*6. OBSERVAÇÕES FINAIS*%0A` +
            `${getValue("orc_obs_final") || "-"}`;

        window.open(`https://wa.me/5519999999700?text=${texto}`, "_blank");
    });
}