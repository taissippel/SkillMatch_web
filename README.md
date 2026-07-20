# SkillMatch Web

Aplicação web que analisa a compatibilidade entre o perfil de um candidato e vagas de desenvolvimento Front-End e Front-End Junior.

O usuário informa suas habilidades e experiência. O sistema compara esses dados com os requisitos das vagas, calcula o percentual de compatibilidade, apresenta as habilidades encontradas e faltantes, destaca a melhor oportunidade e gera uma recomendação de estudo.

## Linkd do projeto
- Quadro do Trello
https://trello.com/invite/b/6a09f19d089ee592f73bcd75/ATTI934cb5a83850600ad823c6f89f50430a61271A1D/skillmatch-js-web-simulador

- Vídeo de apresentação do Google Drive
https://drive.google.com/file/d/1s-H-97RlWfXUBBWDkDF8zVVyDfYuUPmC/view?usp=drive_link 

## Funcionalidades

- Cadastro do perfil do candidato;
- Validação acessível do formulário;
- Carregamento das vagas por `fetch`;
- Tratamento dos estados de carregamento, vazio, erro e sucesso;
- Cálculo do percentual de compatibilidade;
- Classificação em alta, média ou baixa compatibilidade;
- Identificação das habilidades encontradas e faltantes;
- Destaque da vaga mais compatível;
- Recomendação de estudo;
- Verificação de experiência mínima para vaga Júnior;
- Comparação de habilidades sem diferenciar maiúsculas e minúsculas;
- Persistência do perfil com `localStorage`;
- Interface responsiva para celular e desktop.

## Tecnologias utilizadas

- HTML5;
- CSS3;
- JavaScript;
- Módulos ES com `import` e `export`;
- JSON;
- LocalStorage;
- Git e GitHub;
- GitHub Desktop;
- Trello;
- Live Server.

## Conceitos de JavaScript demonstrados

- Objetos e arrays;
- Classes, construtor e `this`;
- Herança com `extends` e `super`;
- Sobrescrita de método;
- `map`, `filter` e `reduce`;
- Callback;
- Closure;
- Promise, `async` e `await`;
- Manipulação do DOM;
- `addEventListener`;
- `preventDefault`;
- `fetch`;
- `try/catch`;
- `JSON.stringify` e `JSON.parse`.

## Estrutura do projeto

```text
SkillMatch_web/
├── index.html
├── README.md
└── Assets/
    ├── Dados/
    │   └── vagas.json
    ├── Imagens/
    │   └── logo.svg
    ├── Scripts/
    │   ├── dados.js
    │   ├── main.js
    │   ├── motor.js
    │   └── ui.js
    └── Styles/
        └── style.css
```

## Organização dos módulos

- `main.js`: coordena o fluxo da aplicação;
- `dados.js`: carrega as vagas e controla o `localStorage`;
- `motor.js`: contém as classes, os cálculos e as regras do SkillMatch;
- `ui.js`: coleta o formulário e renderiza os resultados;
- `vagas.json`: armazena o catálogo de vagas.

## Como executar

1. Baixe ou clone este repositório.
2. Abra a pasta do projeto no VS Code.
3. Instale a extensão Live Server, caso ainda não possua.
4. Clique com o botão direito no arquivo `index.html`.
5. Selecione **Open with Live Server**.
6. Preencha o formulário.
7. Clique em **Analisar compatibilidade**.

A aplicação utiliza módulos ES e `fetch`. Por isso, não deve ser executada abrindo o `index.html` diretamente pelo protocolo `file://`.

## Uso de orientação a objetos

A classe `Vaga` representa as vagas comuns e possui o método responsável por analisar o candidato.

A classe `VagaFrontEndJunior` herda de `Vaga`, acrescenta a experiência mínima e sobrescreve comportamentos. Essa herança aplica uma regra específica somente às vagas Júnior.

## Depuração realizada

Durante o desenvolvimento, o debugger e o Console do navegador foram utilizados para investigar diferentes comportamentos.

Um dos erros ocorria porque o JavaScript procurava o elemento `lista-vagas`, mas o HTML possuía o identificador `lista`. Após igualar os IDs, os cards passaram a ser renderizados.

Outro problema ocorreu porque `experienciaMinima` não estava chegando ao motor. Com o debugger, foi identificado que a propriedade estava `undefined`. O JSON foi corrigido e a vaga passou a ser criada como `VagaFrontEndJunior`.

Também foi corrigida a comparação de habilidades. Antes, `HTML` e `html` eram considerados valores diferentes. As habilidades passaram a ser normalizadas com `toLowerCase()` antes da comparação.

## Branches utilizadas

- `main`: versão estável;
- `develop`: integração das funcionalidades;
- `feature/localstorage`: persistência do perfil;
- `feature/validacao-formulario`: validação acessível;
- `feature/heranca-experiencia`: herança e experiência mínima;
- `feature/interface-responsiva`: layout e responsividade;
- `feature/estados-fetch`: tratamento do carregamento das vagas;
- `fix/revisao-tecnica`: correções finais;
- `docs/readme`: documentação.

## Melhorias futuras

- Filtro por modalidade;
- Ordenação por compatibilidade ou salário;
- Tema claro e escuro;
- Publicação no GitHub Pages;
- Novas áreas profissionais e categorias de vagas.

## Uso de inteligência artificial

A inteligência artificial foi utilizada como apoio para explicações, organização das etapas e investigação de erros. O código foi adaptado, testado e validado durante o desenvolvimento.
