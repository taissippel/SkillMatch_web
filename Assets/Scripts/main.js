import {
    Vaga,
    VagaFrontEndJunior,
    analisarVagas,
    encontrarMelhorVaga,
    gerarRecomendacao,
    finalizarAnalise,
    criarContadorDeAnalises,
} from "./motor.js";

console.log("Motor importado com sucesso");

const contadorDeAnalise = criarContadorDeAnalises();

console.log("Análise número:", contadorDeAnalise());