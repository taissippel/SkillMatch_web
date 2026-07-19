// motor.js
// Responsável pelas regras e pelos cálculos do SkillMatch.

// ======================================================
// CLASSE PRINCIPAL
// ======================================================

export class Vaga {
    constructor(id, empresa, cargo, requisitos, salario, modalidade) {
        this.id = id;
        this.empresa = empresa;
        this.cargo = cargo;
        this.requisitos = requisitos;
        this.salario = salario;
        this.modalidade = modalidade;
    }

    // Método da classe que usa os dados da própria vaga.
        analisarCandidato(candidato) {
            const habilidadesNormalizadas = candidato.habilidades.map(
                (habilidade) => {
                    return habilidade.toLowerCase();
                }
            );

            const habilidadesEncontradas = this.requisitos.filter(
                (requisito) => {
                    return habilidadesNormalizadas.includes(
                        requisito.toLowerCase()
                    );
                }
            );

            const habilidadesFaltantes = this.requisitos.filter(
                (requisito) => {
                    return !habilidadesNormalizadas.includes(
                        requisito.toLowerCase()
                    );
                }
            );

            const percentual = Math.round(
                (habilidadesEncontradas.length / this.requisitos.length) * 100
            );

            return {
                vaga: this,
                percentual,
                classificacao: classificarCompatibilidade(percentual),
                habilidadesEncontradas,
                habilidadesFaltantes
        };
    }

        obterRotulo() {
            return `${this.cargo} — ${this.empresa}`;
        }
    }


// ======================================================
// HERANÇA
// ======================================================

export class VagaFrontEndJunior extends Vaga {
    constructor(
        id,
        empresa,
        cargo,
        requisitos,
        salario,
        modalidade,
        experienciaMinima
    ) {
        super(id, empresa, cargo, requisitos, salario, modalidade);

        this.experienciaMinima = experienciaMinima;
    }

    // Sobrescreve o método da classe Vaga.
    obterRotulo() {
        return `${this.cargo} Júnior — ${this.empresa}`;
    }

    verificarExperiencia(candidato) {
        return candidato.experienciaMeses >= this.experienciaMinima;
    }

    analisarCandidato(candidato) {
        const resultado = super.analisarCandidato(candidato);

        return {
            ...resultado,
            atendeExperiencia: this.verificarExperiencia(candidato),
            experienciaMinima: this.experienciaMinima
        };
    }
}


// ======================================================
// CLASSIFICAÇÃO
// ======================================================

export function classificarCompatibilidade(percentual) {
    if (percentual >= 80) {
        return "Alta compatibilidade";
    }

    if (percentual >= 50) {
        return "Média compatibilidade";
    }

    return "Baixa compatibilidade";
}


// ======================================================
// ANALISAR TODAS AS VAGAS
// ======================================================

export function analisarVagas(candidato, vagas) {
    return vagas.map((vaga) => {
        return vaga.analisarCandidato(candidato);
    });
}


// ======================================================
// ENCONTRAR A MELHOR VAGA
// ======================================================

export function encontrarMelhorVaga(resultados) {
    if (resultados.length === 0) {
        return null;
    }

    return resultados.reduce((melhorResultado, resultadoAtual) => {
        if (resultadoAtual.percentual > melhorResultado.percentual) {
            return resultadoAtual;
        }

        return melhorResultado;
    });
}


// ======================================================
// RECOMENDAÇÃO DE ESTUDO
// ======================================================

export function gerarRecomendacao(melhorResultado) {
    if (!melhorResultado) {
        return "Nenhuma vaga foi encontrada para análise.";
    }

    const faltantes = melhorResultado.habilidadesFaltantes;

    if (faltantes.length === 0) {
        return "Você atende a todos os requisitos da vaga. Parabéns!";
    }

    return `Para aumentar sua compatibilidade, recomendamos estudar: ${faltantes.join(
        ", "
    )}.`;
}


// ======================================================
// CALLBACK
// ======================================================

export function finalizarAnalise(nome, callback) {
    const mensagem = `${nome}, sua análise foi concluída.`;

    callback(mensagem);
}


// ======================================================
// CLOSURE
// ======================================================

export function criarContadorDeAnalises() {
    let total = 0;

    return function () {
        total++;

        return total;
    };
}