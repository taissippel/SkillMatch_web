import { Vaga } from "./motor.js";

export async function carregarVagas() {

    const resposta = await fetch("./assets/dados/vagas.json");

    if (!resposta.ok) {
        throw new Error("Não foi possível carregar as vagas.");
    }

    const vagas = await resposta.json();

    return vagas.map((vaga) => {

        return new Vaga(
            vaga.id,
            vaga.empresa,
            vaga.cargo,
            vaga.requisitos,
            vaga.salario,
            vaga.modalidade
        );

    });

}