// ui.js
// Responsável pela interação com o formulário e pela renderização da tela.

const formulario = document.getElementById("formulario-perfil");
const campoNome = document.getElementById("nome");
const campoArea = document.getElementById("area");
const campoHabilidades = document.getElementById("habilidades");
const campoExperiencia = document.getElementById("experiencia");

const statusVagas = document.getElementById("status-vagas");
const listaVagas = document.getElementById("lista-vagas");
const melhorVaga = document.getElementById("melhor-vaga");


// ======================================================
// CAPTURAR O FORMULÁRIO
// ======================================================

export function obterFormulario() {
    return formulario;
}


// ======================================================
// COLETAR OS DADOS DO CANDIDATO
// ======================================================

export function coletarDadosDoCandidato() {
    const habilidades = campoHabilidades.value
        .split(",")
        .map((habilidade) => habilidade.trim())
        .filter((habilidade) => habilidade !== "");

    return {
        nome: campoNome.value.trim(),
        area: campoArea.value.trim(),
        habilidades,
        experienciaMeses: Number(campoExperiencia.value)
    };
}

// - RECEBER O PERFIL RECUPERADO 
// - ENCERRAR SE FOR A PRIMEIRA VISITA 
// - PREENCHE NOME E ÁREA
// - TRANSFORMA O ARRAY DE HABILIDADES EM TEXTO SEPARADO POR VÍRGULA
// - RESTAURA A EXPERIÊNCIA.
export function preencherFormulario(perfil) {
    if (perfil === null) {
        return;
    }

    campoNome.value = perfil.nome ?? "";
    campoArea.value = perfil.area ?? "Front-End";

    campoHabilidades.value = Array.isArray(perfil.habilidades)
        ? perfil.habilidades.join(", ")
        : "";

    campoExperiencia.value = perfil.experienciaMeses ?? 0;
}


// ======================================================
// MOSTRAR STATUS
// ======================================================

export function mostrarStatus(mensagem) {
    statusVagas.textContent = mensagem;
}


// ======================================================
// LIMPAR RESULTADOS
// ======================================================

export function limparResultados() {
    listaVagas.innerHTML = "";
    melhorVaga.innerHTML = "";
}


// ======================================================
// CRIAR UM CARD DE VAGA
// ======================================================

function criarCardVaga(resultado) {
    const card = document.createElement("article");
    card.classList.add("card-vaga");

    const titulo = document.createElement("h3");
    titulo.textContent = resultado.vaga.cargo;

    const empresa = document.createElement("p");
    empresa.textContent = `Empresa: ${resultado.vaga.empresa}`;

    const modalidade = document.createElement("p");
    modalidade.textContent = `Modalidade: ${resultado.vaga.modalidade}`;

    const salario = document.createElement("p");
    salario.textContent = `Salário: R$ ${resultado.vaga.salario.toFixed(2)}`;

    const percentual = document.createElement("p");
    percentual.classList.add("percentual");
    percentual.textContent = `Compatibilidade: ${resultado.percentual}%`;

    const classificacao = document.createElement("p");
    classificacao.textContent = resultado.classificacao;

    const encontradas = document.createElement("p");
    encontradas.textContent = `Habilidades encontradas: ${
        resultado.habilidadesEncontradas.length > 0
            ? resultado.habilidadesEncontradas.join(", ")
            : "Nenhuma"
    }`;

    const faltantes = document.createElement("p");
    faltantes.textContent = `Habilidades faltantes: ${
        resultado.habilidadesFaltantes.length > 0
            ? resultado.habilidadesFaltantes.join(", ")
            : "Nenhuma"
    }`;

    card.append(
        titulo,
        empresa,
        modalidade,
        salario,
        percentual,
        classificacao,
        encontradas,
        faltantes
    );

    return card;
}


// ======================================================
// MOSTRAR TODOS OS CARDS
// ======================================================

export function renderizarVagas(resultados) {
    limparResultados();

    if (resultados.length === 0) {
        mostrarStatus("Nada encontrado.");
        return;
    }

    resultados.forEach((resultado) => {
        const card = criarCardVaga(resultado);

        listaVagas.appendChild(card);
    });

    mostrarStatus(`${resultados.length} vaga(s) analisada(s).`);
}


// ======================================================
// MOSTRAR A MELHOR VAGA
// ======================================================

export function renderizarMelhorVaga(resultado, recomendacao) {
    if (!resultado) {
        melhorVaga.textContent = "Não foi possível identificar a melhor vaga.";
        return;
    }

    const destaque = document.createElement("article");
    destaque.classList.add("melhor-vaga");

    const titulo = document.createElement("h3");
    titulo.textContent = "Melhor oportunidade";

    const descricao = document.createElement("p");
    descricao.textContent =
        `${resultado.vaga.cargo} na empresa ${resultado.vaga.empresa} — ` +
        `${resultado.percentual}% de compatibilidade.`;

    const textoRecomendacao = document.createElement("p");
    textoRecomendacao.textContent = recomendacao;

    destaque.append(
        titulo,
        descricao,
        textoRecomendacao
    );

    melhorVaga.appendChild(destaque);
}