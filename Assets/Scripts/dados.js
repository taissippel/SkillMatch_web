import { Vaga } from "./motor.js";

const CHAVE_PERFIL = "skillmatch_perfil";

export async function carregarVagas() {

    const resposta = await fetch("./Assets/Dados/vagas.json");

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

export function salvarPerfil(candidato) {
    const candidatoEmTexto = JSON.stringify(candidato);

    localStorage.setItem(CHAVE_PERFIL, candidatoEmTexto);
}

export function carregarPerfil() {
    const perfilSalvo = localStorage.getItem(CHAVE_PERFIL);

    if (perfilSalvo === null) {
        return null;
    }

    try {
        return JSON.parse(perfilSalvo);
    } catch (erro) {
        localStorage.removeItem(CHAVE_PERFIL);
        return null;
    }
}