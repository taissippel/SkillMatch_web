export async function carregarVagas(){
    const resposta = await fetch("./assets/dados/vagas.json");
    const vagas = await resposta.json();
    const vagasObjetos = vagas.map((vaga) => {
        return new Vaga(
            vaga.id,
            vaga.empresa,
            vaga.cargo,
            vaga.requisitos,
            vaga.salario,
            vaga.modalidade
        );
    });
    return vagasObjetos;
}