import {
    carregarVagas,
    salvarPerfil,
    carregarPerfil
} from "./dados.js";

import {
    analisarVagas,
    encontrarMelhorVaga,
    gerarRecomendacao,
    finalizarAnalise,
    criarContadorDeAnalises
} from "./motor.js";

import {
    obterFormulario,
    coletarDadosDoCandidato,
    preencherFormulario,
    mostrarStatus,
    renderizarVagas,
    renderizarMelhorVaga
} from "./ui.js";


const formulario = obterFormulario();
const contadorDeAnalises = criarContadorDeAnalises();

let vagasCarregadas = [];


async function iniciarAplicacao() {
    const perfilSalvo = carregarPerfil();

    preencherFormulario(perfilSalvo);

    try {
        mostrarStatus("Carregando vagas...");

        vagasCarregadas = await carregarVagas();

        mostrarStatus(
            "Vagas carregadas. Preencha seu perfil para iniciar a análise."
        );

    } catch (erro) {
        mostrarStatus(
            "Não foi possível carregar as vagas. Tente novamente mais tarde."
        );

        console.error(erro);
    }
}


formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const candidato = coletarDadosDoCandidato();

    salvarPerfil(candidato);

    const resultados = analisarVagas(
        candidato,
        vagasCarregadas
    );

    const melhorResultado = encontrarMelhorVaga(resultados);

    const recomendacao = gerarRecomendacao(melhorResultado);

    renderizarVagas(resultados);

    renderizarMelhorVaga(
        melhorResultado,
        recomendacao
    );

    const numeroDaAnalise = contadorDeAnalises();

    finalizarAnalise(candidato.nome, function (mensagem) {
        console.log(`${mensagem} Análise número ${numeroDaAnalise}.`);
    });
});


iniciarAplicacao();