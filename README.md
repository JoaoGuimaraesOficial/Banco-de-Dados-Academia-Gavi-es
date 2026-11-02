# Modelo Conceitual (DER)

### Sistema de gestão de informações da Academia Gaviões

## Metadados

**Integrantes do grupo:**

- Edilson Angel Arismendi Huanca — RGM 49423452
- Igor Alves — RGM 48123528
- Gabriel Alves Rodrigues — RGM 47818191
- Gabriel Viana de Lima — RGM 48368881
- João Victor Guimarães Moura — RGM 48298549

**Instituição:** Universidade Cidade de São Paulo (UNICID)
**Curso:** Ciência da Computação
**Disciplina:** Banco de Dados
**Versão da documentação:** 1.1
**Última atualização:** 02/11/2026

---

## 1. Apresentação da organização

### 1.1 Caracterização

A organização escolhida foi a Academia Gaviões, do setor de fitness e bem-estar. A unidade que usamos como referência funciona 24 horas por dia e atende alunos em horários bem diferentes, então os funcionários são divididos em quatro turnos: madrugada, manhã, tarde e noite.

A equipe tem recepcionistas, professores, pessoal da limpeza, gerente, funcionários do financeiro e personal trainers externos credenciados.

### 1.2 Problemas identificados

Na conversa com os funcionários, apareceram algumas dificuldades da rotina:

- **Comunicação entre os turnos:** avisos, problemas e pendências nem sempre chegam pra equipe seguinte. Isso gera falha no atendimento e atrasa a resolução de problemas.
- **Pagamentos e cancelamentos:** teve relato de cancelamento de plano que não foi atualizado direito no sistema, o que acabou bloqueando a catraca de um aluno que não devia ter o acesso bloqueado.
- **Controle de materiais:** falta um acompanhamento melhor dos materiais de uso interno, itens promocionais e produtos de limpeza, principalmente em relação a quanto foi retirado e consumido.
- **Manutenção de equipamentos:** os problemas que aparecem durante o funcionamento precisam ser registrados e encaminhados pros responsáveis.

### 1.3 Justificativa da escolha

A academia foi escolhida porque tem várias atividades que dependem de informação organizada e atualizada ao mesmo tempo.

Cadastro de aluno, controle de plano, pagamento, liberação de catraca, elaboração de treino e agendamento de aula são processos que precisam funcionar juntos.

Além disso, os cargos diferentes têm necessidades diferentes de acesso à informação. Isso ajuda a trabalhar conceitos de modelagem, integridade e controle de acesso.

### 1.4 Informações da visita

- **Endereço:** Av. Celso Garcia, 5492 — Tatuapé, São Paulo — SP, 03064-000.
- **Responsáveis entrevistados:** Eduardo Curzio e Leticia, recepcionistas.
- **Localização:** [Consultar no Google Maps](https://share.google/RPpl0luAjH1SzWWri).

---

## 2. Processos de negócio

A partir da entrevista, a gente identificou os principais processos da rotina da academia.

### 2.1 Cadastro e matrícula

Começa com o cadastro do aluno (dados pessoais, foto e biometria facial). Depois é feito o vínculo com o plano escolhido, que pode ser de cobrança recorrente ou não recorrente.

### 2.2 Controle de acesso

A entrada dos alunos é feita por reconhecimento facial na catraca. O sistema precisa checar a situação da matrícula e a situação financeira antes de liberar o acesso.

Quando dá alguma falha na validação, a recepção pode fazer a liberação manual, seguindo o procedimento da academia.

### 2.3 Prescrição de treinos

Os professores elaboram e atualizam as fichas de treino dos alunos. Os exercícios são organizados de acordo com a necessidade, a experiência e as limitações físicas informadas pelo aluno.

O histórico dos treinos precisa ser preservado mesmo quando o professor responsável sai da academia.

### 2.4 Aulas coletivas

A academia oferece modalidades como spinning, boxe e muay thai.

O spinning tem controle de reserva pelo aplicativo e limite de 19 vagas por horário. As outras modalidades normalmente não exigem reserva antecipada, pelo que foi passado na entrevista.

### 2.5 Comunicação entre turnos

As ocorrências e os recados precisam ficar registrados pra que os funcionários dos próximos turnos consigam consultar as pendências anteriores. A ideia é não depender só de conversa ou aviso verbal.

### 2.6 Estoque e manutenção

Os materiais usados pela academia precisam ter as movimentações acompanhadas, incluindo retiradas e consumo.

Também é necessário registrar problemas em equipamentos e acompanhar os chamados de manutenção até resolver.

---

## 3. Requisitos do sistema

### 3.1 Requisitos funcionais

- **RF01 — Cadastro de alunos:** permitir o cadastro de alunos com informações pessoais, foto, biometria facial e documentação de saúde necessária à matrícula.
- **RF02 — Controle de planos e pagamentos:** permitir o cadastro de planos, o vínculo com alunos e o registro das informações de pagamento, cancelamento e condições contratuais.
- **RF03 — Controle de acesso:** liberar ou bloquear a entrada na catraca de acordo com a situação da matrícula e financeira do aluno.
- **RF04 — Controle de treinos:** permitir que professores criem, editem e consultem fichas de treino, considerando as necessidades e limitações dos alunos.
- **RF05 — Agendamento de aulas:** permitir o registro de check-in em aulas coletivas, respeitando o limite de vagas de cada modalidade.
- **RF06 — Registro de ocorrências:** permitir que funcionários registrem avisos e pendências relacionados aos turnos de trabalho, mantendo as ocorrências disponíveis para os turnos seguintes até serem resolvidas.
- **RF07 — Chamados de manutenção:** permitir o registro e o acompanhamento de problemas e solicitações de manutenção.
- **RF08 — Controle de estoque:** permitir o acompanhamento dos materiais internos e dos itens promocionais utilizados pela academia, incluindo o registro de retiradas por funcionários.
- **RF09 — Cadastro e credenciamento de profissionais:** permitir o cadastro de funcionários e personal trainers externos, registrando as informações necessárias para verificar sua situação e habilitação profissional.
- **RF10 — Acesso entre unidades:** permitir a verificação das permissões de acesso do aluno a outras unidades de acordo com o plano contratado.

### 3.2 Requisitos não funcionais

- **RNF01 — Segurança e privacidade:** o acesso às informações deve ser controlado de acordo com a função de cada usuário. Professores, por exemplo, não devem consultar informações financeiras dos alunos nem visualizar os dados completos do cartão.
- **RNF02 — Disponibilidade:** a validação de acesso na catraca deve estar disponível durante todo o funcionamento da academia, com tempo de resposta inferior a dois segundos.
- **RNF03 — Integridade:** o histórico dos treinos deve continuar disponível mesmo após o desligamento do professor responsável por sua criação.

---

## 4. Regras de negócio

As regras de negócio são as condições que o sistema tem que respeitar durante o funcionamento da academia. A gente organizou elas de acordo com a natureza e com o que foi passado na entrevista.

**Legenda de origem:**

- ✅ **Confirmada na entrevista:** foi falado pelos entrevistados.
- ⚠️ **Não confirmada na entrevista:** a gente identificou como possibilidade ou necessidade, mas ainda precisa validar com a academia.

### 4.1 Regras operacionais

| Código | Regra | Dados envolvidos | Justificativa | Origem |
|---|---|---|---|---|
| **RN01** | O cancelamento de plano só ocorre por solicitação formal via SAC. | MATRICULA (`ID_MATRICULA`, `DT_FIM`, status de cancelamento). | Dá rastreabilidade ao pedido e evita cancelamento indevido ou contestado depois, que pode gerar bloqueio errado na catraca. | ✅ |
| **RN02** | A inadimplência prolongada, por volta de 60 dias segundo o entrevistado, pode cancelar o plano automaticamente e bloquear a catraca. | MATRICULA (`status`, `DT_INICIO`, `DT_FIM`), ALUNO (`IN_ATIVO`). | Limita o prejuízo financeiro e mantém a base de alunos ativos coerente com a situação dos pagamentos. | ✅ |
| **RN03** | O spinning tem limite fixo de 19 vagas por horário, e o check-in é obrigatório pelo aplicativo. | AULA_COLETIVA (`NM_MODALIDADE`, `DT_HORARIO`, `QT_LIMITE_VAGAS`), CHECKIN_AULA (`ID_AULA`, `ID_ALUNO`, `DT_REALIZACAO`). | Respeita a capacidade da sala e das bicicletas, garantindo segurança e qualidade da aula. | ✅ |
| **RN04** | Personal trainer externo só pode atuar com cadastro ativo e pagamento de taxa mensal. | Cadastro de personal externo (nome, CPF, status e taxa mensal — entidade a definir), PAGAMENTO. | Controla quem circula na academia e formaliza a contrapartida pelo uso da estrutura. | ✅ |
| **RN07** | A matrícula exige idade mínima e apresentação de atestado médico ou PAR-Q. | ALUNO (`DT_NASCIMENTO`), documento de saúde anexado. | Protege a saúde do aluno e reduz os riscos pra academia. A idade mínima ainda precisa ser confirmada. | ⚠️ |
| **RN08** | O acesso a outras unidades depende do plano contratado. | PLANO (possível atributo `IN_ACESSO_OUTRAS_UNIDADES`), ALUNO (`DS_BIOMETRIA_FACIAL`). | Diferencia os planos comercialmente e evita acesso indevido a outras unidades. | ⚠️ |
| **RN09** | Planos com fidelidade têm multa em caso de cancelamento antecipado. | PLANO (possíveis atributos `QT_MESES_FIDELIDADE` e `VL_MULTA`), MATRICULA (`DT_INICIO`, `DT_FIM`). | Protege a receita prevista em contrato. O prazo e o valor da multa ainda não foram informados. | ⚠️ |
| **RN10** | Toda retirada de material por funcionário deve ser registrada com funcionário responsável, material, quantidade e data. | FUNCIONARIO, ESTOQUE_MATERIAL e entidade de movimentação (quantidade e data). | Resolve o problema de falta de controle dos itens promocionais e de limpeza. | ⚠️ |
| **RN11** | Ocorrências pendentes são transferidas ao turno seguinte até serem resolvidas. | OCORRENCIA_TURNO (`DT_REGISTRO`, turno, `ID_FUNCIONARIO_AUTOR`, `DS_MENSAGEM`, `IN_RESOLVIDO`). | Resolve a falha de comunicação entre turnos e evita que pendências sejam esquecidas. | ⚠️ |

A RN01 e a RN02 tratam de situações diferentes. O cancelamento pedido pelo aluno passa pelo SAC, enquanto o cancelamento por inadimplência segue uma regra operacional própria. O funcionamento exato do cancelamento automático ainda precisa ser confirmado com a academia.

### 4.2 Restrições legais e organizacionais

| Código | Regra | Dados envolvidos | Justificativa | Origem |
|---|---|---|---|---|
| **RN05** | Recepção e professores só podem visualizar os quatro últimos dígitos do cartão do aluno. | MATRICULA (`CD_ULTIMOS_DIGITOS_CARTAO`). | Reduz o risco de exposição de dados financeiros e limita o acesso às informações do cartão. | ✅ |
| **RN06** | Informações de saúde e limitações físicas ficam anexadas ao cadastro em formato digital, como PDF ou imagem. | ALUNO, TREINO (`DS_OBSERVACAO_MEDICA`). | Permite elaborar treinos mais seguros. Como são dados pessoais sensíveis, o acesso deve ser restrito de acordo com a função do usuário. | ✅ |
| **RN12** | Todo professor deve possuir registro ativo no CREF. | FUNCIONARIO (tipo de funcionário = professor; possível atributo `CD_CREF`). | Permite verificar a habilitação profissional dos professores. | ⚠️ |

### 4.3 Regras prováveis ainda não incluídas

Essas regras aqui são comuns em academia, mas não foram confirmadas na entrevista. Por isso ficam pendentes de decisão do grupo.

| Regra | Decisão do grupo | Motivo |
|---|---|---|
| Emissão de nota fiscal | A definir. | Confirmar se a organização emite nota fiscal e como funciona o processo. |
| Trancamento ou congelamento de plano | A definir. | Não foi informado se existe essa opção. |
| Aula experimental ou visitante | A definir. | Não foi informado se a academia permite esse tipo de acesso. |
| Convênios (Wellhub, TotalPass etc.) | A definir. | Perguntar na entrevista como funciona essa modalidade. |
| Reajuste de mensalidade | A definir. | Entender melhor como funciona a parte financeira e a atualização dos valores. |

### 4.4 Alinhamento entre regras e requisitos funcionais

As regras de negócio precisam aparecer nos requisitos funcionais, senão o sistema não tem como respeitá-las.

| Regra | RF relacionado | Situação |
|---|---|---|
| RN01, RN05 e RN09 | RF02 — Planos e pagamentos | O RF02 contempla planos, pagamentos e cancelamentos. Os campos de fidelidade e multa dependem de confirmação. |
| RN02 | RF03 — Controle de acesso | O RF03 contempla o bloqueio de acesso conforme a situação financeira e da matrícula. |
| RN03 | RF05 — Agendamento de aulas | O RF05 contempla o limite de vagas e o registro de check-in. |
| RN06 e RN07 | RF01 — Cadastro de alunos | O RF01 deve contemplar a documentação de saúde e a verificação dos requisitos pra matrícula. |
| RN10 | RF08 — Controle de estoque | O RF08 contempla o registro das retiradas por funcionários. |
| RN11 | RF06 — Registro de ocorrências | O RF06 contempla a transferência de pendências entre turnos. |
| RN04 | RF09 — Cadastro e credenciamento de profissionais | O RF09 contempla o cadastro e o controle de personal trainers externos. |
| RN08 | RF10 — Acesso entre unidades | O RF10 contempla a verificação das permissões de acesso conforme o plano. |
| RN12 | RF09 — Cadastro e credenciamento de profissionais | O RF09 deve contemplar o registro do CREF para professores. |

---

## 5. Modelagem conceitual

### 5.1 Entidades identificadas

Nesta versão, as oito entidades principais descritas no modelo conceitual são:

| Entidade | Descrição |
|---|---|
| **ALUNO** | Armazena os dados dos alunos cadastrados na academia. |
| **PLANO** | Representa os planos oferecidos pela academia. |
| **MATRICULA** | Registra o vínculo entre um aluno e um plano. |
| **FUNCIONARIO** | Armazena os dados dos funcionários e suas funções. |
| **TREINO** | Representa as fichas de exercícios elaboradas para os alunos. |
| **AULA_COLETIVA** | Armazena as informações das aulas, como modalidade, horário e limite de vagas. |
| **CHECKIN_AULA** | Registra a participação ou reserva de um aluno em uma aula coletiva. |
| **OCORRENCIA_TURNO** | Armazena avisos e pendências registrados pelos funcionários durante os turnos. |

Mas os requisitos também falam de estoque, manutenção, unidades e itens de treino. Essas funcionalidades provavelmente vão exigir entidades próprias, tipo:

- `ITEM_TREINO`;
- `UNIDADE`;
- `ESTOQUE_MATERIAL`;
- `CHAMADO_MANUTENCAO`.

Essas quatro entidades já estão no Dicionário de Dados em HTML. Ou seja: o README ainda está com 8 entidades e o HTML com 12, e isso precisa ser alinhado antes da entrega final.

### 5.2 Relacionamentos e cardinalidades

| Relacionamento | Descrição |
|---|---|
| ALUNO — MATRICULA | Um aluno pode possuir várias matrículas ao longo do tempo. Cada matrícula pertence a um aluno. |
| PLANO — MATRICULA | Um plano pode estar associado a várias matrículas. Cada matrícula está vinculada a um plano. |
| ALUNO — TREINO | Um aluno pode possuir vários treinos. Cada treino pertence a um aluno. |
| FUNCIONARIO — TREINO | Um funcionário que atua como professor pode elaborar vários treinos. Cada treino possui um responsável. |
| ALUNO — AULA_COLETIVA | Um aluno pode participar de várias aulas, e uma aula pode receber vários alunos. O vínculo é registrado por CHECKIN_AULA. |
| FUNCIONARIO — OCORRENCIA_TURNO | Um funcionário pode registrar várias ocorrências. Cada ocorrência possui um funcionário responsável pelo registro. |

As cardinalidades exatas ainda precisam ser conferidas no DER final, porque a notação usada no README, no dicionário e nos diagramas tem que representar os mesmos relacionamentos.

### 5.3 Justificativa da modelagem

Separar `ALUNO`, `PLANO` e `MATRICULA` permite manter os dados pessoais separados das informações de contratação. Assim o aluno pode trocar de plano ou fazer novas matrículas sem duplicar o cadastro.

A entidade `TREINO` mantém o registro dos exercícios elaborados pelos professores, o que preserva o histórico mesmo quando o funcionário sai da academia.

A entidade `OCORRENCIA_TURNO` foi pensada pra resolver um dos problemas vistos na entrevista: a perda de informação na troca de turno. Com esse registro, os funcionários consultam avisos e acompanham pendências anteriores.

Já `CHECKIN_AULA` funciona como entidade associativa entre alunos e aulas coletivas. Ela permite registrar as participações e aplicar as regras de limite de vagas.

As entidades de estoque, manutenção, unidades e itens de treino devem complementar essa estrutura caso sejam confirmadas no modelo final.

---

## 6. Fluxo de dados e controle de acesso

### 6.1 Fluxo de cadastro até a catraca

1. **Cadastro:** o aluno informa seus dados pessoais e faz o cadastro na academia.
2. **Identificação:** são registradas as informações necessárias pra identificação, incluindo foto e biometria facial.
3. **Documentação:** são anexados os documentos necessários pra matrícula, conforme as regras da academia.
4. **Matrícula:** o aluno escolhe um plano e o cadastro é vinculado à matrícula correspondente.
5. **Reconhecimento facial:** ao chegar na academia, o aluno faz a identificação na catraca.
6. **Validação:** o sistema consulta a matrícula e verifica a situação financeira do aluno.
7. **Decisão:** se as condições estiverem regulares, a catraca libera o acesso. Caso tenha alguma pendência, o acesso é bloqueado.
8. **Atendimento pela recepção:** se der falha na identificação ou na validação, a recepção verifica a situação e faz o procedimento manual previsto pela academia.

Esse fluxo é o funcionamento esperado com base na entrevista. Os detalhes técnicos da integração com o reconhecimento facial ainda dependem da implementação.

### 6.2 Níveis de acesso

| Perfil | Acesso previsto |
|---|---|
| **Recepção** | Consultar e atualizar informações cadastrais, verificar matrículas e ajudar na resolução de problemas de acesso. Deve visualizar apenas os quatro últimos dígitos do cartão. |
| **Professor** | Consultar as informações necessárias pra acompanhar os alunos e elaborar treinos, sem acesso aos dados financeiros completos. Deve visualizar apenas os quatro últimos dígitos do cartão. |
| **Gerente** | Acompanhar informações operacionais, matrículas, ocorrências e dados necessários à administração da unidade. |
| **Financeiro** | Consultar informações relacionadas a pagamentos, planos e situações financeiras. |

As permissões detalhadas de cadastro, alteração, exclusão e consulta devem ser definidas na etapa de implementação do controle de acesso.

### 6.3 Proteção e registro de informações sensíveis

Informações como biometria facial e dados de saúde exigem cuidado especial por serem dados pessoais sensíveis segundo a LGPD. As informações financeiras também precisam de proteção, embora não sejam automaticamente classificadas como sensíveis pela lei.

O sistema deve restringir o acesso de acordo com a função de cada funcionário. Também é importante manter registro das operações feitas sobre essas informações, permitindo identificar:

- Quem acessou ou alterou os dados;
- Qual informação foi consultada ou modificada;
- Qual operação foi realizada;
- Em qual data e horário ocorreu a operação.

A estrutura específica pra armazenar esses registros ainda não foi definida no modelo.

---

## 7. Dicionário de dados e convenções

O Dicionário de Dados complementa o DER, apresentando os atributos das entidades, seus tipos, suas chaves e as regras relacionadas a cada informação.

Pra evitar repetição, a documentação detalhada dos atributos fica em um documento separado.

**Dicionário de Dados:** [Inserir aqui o link para o arquivo HTML no GitHub.]

### 7.1 Convenções de nomenclatura

| Prefixo | Significado | Exemplo |
|---|---|---|
| `ID_` | Identificador | `ID_ALUNO` |
| `NM_` | Nome | `NM_ALUNO` |
| `DT_` | Data | `DT_NASCIMENTO` |
| `CD_` | Código | `CD_ULTIMOS_DIGITOS_CARTAO` |
| `QT_` | Quantidade | `QT_SERIES` |
| `TP_` | Tipo ou categoria | `TP_STATUS` |
| `IN_` | Indicador booleano | `IN_ATIVO` |
| `DS_` | Descrição ou texto | `DS_MENSAGEM` |
| `VL_` | Valor monetário | `VL_MENSALIDADE` |

### 7.2 Notação utilizada

- **PK (Primary Key):** chave primária, identifica cada registro de uma tabela.
- **FK (Foreign Key):** chave estrangeira, relaciona uma tabela a outra.
- **1:N:** um registro pode estar relacionado a vários registros de outra entidade.
- **N:N:** vários registros de uma entidade podem se relacionar com vários registros de outra.
- **UNIQUE:** impede que determinado valor seja repetido em uma coluna ou combinação de colunas.
- **NOT NULL:** indica que o preenchimento daquele campo é obrigatório.

### 7.3 Banco de dados e collation

A tecnologia definida pro projeto é o MySQL 8, com o mecanismo de armazenamento InnoDB.

O conjunto de caracteres previsto é `utf8mb4`, que permite armazenar caracteres de diferentes idiomas, incluindo acentos e símbolos usados no português.

A collation escolhida é `utf8mb4_0900_ai_ci`. A terminação `ai_ci` indica que as comparações não diferenciam acentos (*accent insensitive*) nem maiúsculas e minúsculas (*case insensitive*). Isso facilita buscas e comparações de nomes e textos.

A configuração definitiva deve ser conferida com o script de criação do banco.

---

## 8. Diagramas do projeto

- **Modelo conceitual (DER):** [Inserir link para a imagem do DER.]
- **Modelo lógico:** [Inserir link para a imagem do modelo lógico.]

Os diagramas e o Dicionário de Dados precisam ficar coerentes entre si. Toda alteração em entidade, atributo ou relacionamento tem que ser refletida nos documentos correspondentes.

---

## 9. Justificativa técnica

A estrutura proposta organiza as informações da academia de forma que os processos possam ser feitos sem duplicação desnecessária de dados.

Separar alunos, planos e matrículas permite manter o histórico de vínculos e alterações contratuais. O uso de entidades associativas, como `CHECKIN_AULA`, permite representar situações em que vários alunos participam de várias aulas.

A relação entre treinos e funcionários também é importante pra preservar a autoria das fichas, assim o histórico não depende da permanência do professor na empresa.

Por fim, o registro de ocorrências atende a uma necessidade vista direto na rotina da academia: melhorar a comunicação entre os turnos e evitar que pendências sejam esquecidas.

As funcionalidades de estoque, manutenção e controle de unidades também fazem parte dos requisitos levantados e precisam estar representadas no modelo final.

---

## 10. Uso de inteligência artificial

As ferramentas de inteligência artificial foram usadas como apoio durante a organização das informações e a elaboração da documentação.

| Item | Registro |
|---|---|
| **Ferramentas utilizadas** | Informar todas as ferramentas efetivamente utilizadas pelo grupo. |
| **Etapas de utilização** | Organização da entrevista, levantamento de requisitos, estruturação do Dicionário de Dados e elaboração do modelo conceitual. |
| **Motivação** | Facilitar a organização das anotações e transformar as informações levantadas em uma documentação mais clara. |
| **Material utilizado** | Transcrição da entrevista realizada na Academia Gaviões. |
| **Verificação** | As informações e sugestões foram comparadas com as anotações da entrevista e com os conteúdos estudados na disciplina de Banco de Dados. |

A utilização dessas ferramentas teve caráter de apoio. As decisões finais sobre a modelagem e a documentação devem ser revisadas e validadas pelos integrantes do grupo.

---

## 11. Considerações finais

No fim, o projeto serviu pra perceber como os processos da academia dependem de informação organizada e acessível pras pessoas certas.

A entrevista mostrou necessidades ligadas a cadastro, controle financeiro, acesso à unidade, elaboração de treino, aulas coletivas, comunicação entre funcionários e manutenção.

A modelagem proposta tenta representar essas necessidades por meio de entidades, atributos e relacionamentos. O DER, o modelo lógico e o Dicionário de Dados precisam ser mantidos atualizados em conjunto, senão a documentação não representa o que a academia realmente precisa.

As regras de negócio também ajudam a entender o funcionamento esperado do sistema, mostrando quais condições devem ser respeitadas em cada processo. As regras que ainda não foram confirmadas precisam ser validadas antes de fechar a modelagem.
