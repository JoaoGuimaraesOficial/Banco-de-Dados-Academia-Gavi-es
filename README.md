# Entrega 1 — Modelo Conceitual (DER)
### Modelagem de um sistema de gestão de informações para uma organização de pequeno porte

---

## Metadados

Nomes dos alunos e RGM:
Edilson Angel Arismendi Huanca - 49423452
Igor Alves - 48123528
Gabriel Alves Rodrigues - 47818191
Gabriel Viana de Lima - 48368881
João Victor Guimarães Moura - 48298549

---

## 1. Caracterização da Organização

**Nome e natureza da organização:** Academia Gaviões — empresa com fins lucrativos do setor de fitness e bem-estar.

**Contexto e porte:** Unidade que funciona 24 horas por dia, dividida em quatro turnos (madrugada, manhã, tarde e noite), com centenas de alunos atendidos diariamente. A equipe é formada por recepcionistas, professores, funcionários da limpeza, gerente, setor financeiro e personal trainers externos credenciados.

**Problemas e necessidades identificados:**
- Falta de comunicação entre os turnos: avisos e pendências de um turno nem sempre chegam à equipe seguinte, o que compromete a continuidade do atendimento.
- Saldo devedor incorreto: falhas na integração entre o cancelamento de planos (feito via SAC) e o sistema geram bloqueios indevidos na catraca, principalmente quando o problema envolve outra unidade.
- Falta de controle sobre itens promocionais e materiais de limpeza, sem registro de quantidade retirada/consumida.

**Justificativa da escolha:** A academia reúne processos variados e reais cadastro, controle de acesso por biometria facial, planos e pagamentos, prescrição de treinos, agendamento de aulas e diferentes níveis de permissão de acesso aos dados o que torna o caso adequado para a complexidade exigida nesta etapa.

**Evidências da organização:**
- Endereço: Av. Celso Garcia, 5492 - Tatuapé, São Paulo - SP, 03064-000
- Responsável entrevistado: Eduardo Curzio e Leticia
- Link oficial / Google Maps: https://share.google/RPpl0luAjH1SzWWri

---

## 2. Processos de Negócio

**Principais processos mapeados:**
- **Matrícula e cadastro:** registro de dados pessoais, foto e biometria facial no sistema Evo, com escolha do plano (recorrente ou não recorrente).
- **Controle de acesso:** leitura facial na catraca, validada contra a situação financeira do aluno; liberação manual pela recepção em caso de falha.
- **Prescrição de treinos:** professores criam e ajustam as fichas conforme experiência do aluno e limitações físicas relatadas.
- **Agendamento de aulas coletivas:** check-in obrigatório pelo aplicativo para o spinning (limite de 19 vagas); demais modalidades (boxe, muay thai etc.) normalmente não exigem reserva.
- **Comunicação entre turnos e manutenção:** registro de ocorrências e abertura de chamados técnicos, que seguem para o gerente e, se necessário, para a equipe regional.

---

## 3. Requisitos do Sistema

### 3.1 Requisitos Funcionais
- **RF01:** cadastrar alunos com dados pessoais, foto e biometria facial.
- **RF02:** controlar planos (recorrente/não recorrente) e registrar pagamentos.
- **RF03:** liberar ou bloquear o acesso na catraca conforme a adimplência do aluno.
- **RF04:** permitir que professores criem, editem e consultem treinos por categoria (A, B, C, superior, inferior).
- **RF05:** permitir check-in de alunos em aulas coletivas com limite de vagas.
- **RF06:** registrar ocorrências e recados entre os turnos de trabalho.
- **RF07:** registrar chamados e status de manutenção de equipamentos.
- **RF08:** controlar o estoque de materiais internos e itens promocionais.

### 3.2 Requisitos Não Funcionais
- **RNF01 (segurança/privacidade):** acesso baseado em papéis — professores não podem ver dados financeiros nem o número completo do cartão dos alunos.
- **RNF02 (disponibilidade):** validação de acesso na catraca deve funcionar 24h, com resposta em menos de 2 segundos.
- **RNF03 (integridade):** o histórico de treinos deve ser preservado mesmo após o desligamento do professor que os criou.

---

## 4. Regras de Negócio

**Regras operacionais:**
- **RN01:** o cancelamento de plano só ocorre por solicitação formal via SAC.
- **RN02:** inadimplência por período prolongado (segundo o entrevistado, cerca de 60 dias) cancela o plano automaticamente e bloqueia a catraca.
- **RN03:** o spinning tem limite fixo de 19 vagas por horário.
- **RN04:** personal trainers externos só podem atuar mediante cadastro ativo e pagamento de taxa mensal.

**Restrições organizacionais:**
- **RN05:** recepção e professores só visualizam os últimos 4 dígitos do cartão do aluno (conformidade com a LGPD).
- **RN06:** informações de saúde e limitações físicas são anexadas ao cadastro em formato digital (PDF/imagem).

---

## 5. Dicionário de Dados Conceitual (Preliminar)

**Convenções:** SGBD MySQL 8 (InnoDB), codificação `utf8mb4_0900_ai_ci`.
**Prefixos usados:** `ID_` identificador, `NM_` nome, `DT_` data, `CD_` código, `QT_` quantidade, `TP_` tipo/categoria, `IN_` indicador booleano, `DS_` descrição/texto livre, `VL_` valor monetário.

### ALUNO
`= @ID_ALUNO + NM_ALUNO + ID_CPF + NM_EMAIL + DT_NASCIMENTO + (DS_FOTO_PERFIL) + (DS_BIOMETRIA_FACIAL) + IN_ATIVO`

| Atributo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| ID_ALUNO | integer | Sim (PK) | Identificador interno |
| NM_ALUNO | varchar(120) | Sim | Nome completo |
| ID_CPF | varchar(11) | Sim (único) | Usado na busca pela recepção |
| NM_EMAIL | varchar(100) | Sim | Login no app e contato com SAC |
| DT_NASCIMENTO | date | Sim | Validação de idade/contrato |
| DS_FOTO_PERFIL | varchar(255) | Não | Pode ser cadastrada depois |
| DS_BIOMETRIA_FACIAL | text | Não | Válida em outras unidades |
| IN_ATIVO | boolean | Sim | Muda com inadimplência prolongada |

*Índices: PK em ID_ALUNO; índices secundários em ID_CPF e NM_ALUNO.*

### PLANO
`= @ID_PLANO + NM_PLANO + [TP_RECORRENTE | TP_NAO_RECORRENTE] + VL_MENSALIDADE + IN_ATIVO`

| Atributo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| ID_PLANO | integer | Sim (PK) | — |
| NM_PLANO | varchar(60) | Sim | Ex.: "Mensal", "Black" |
| TP_RECORRENTE / TP_NAO_RECORRENTE | varchar(20) | Sim | Cobrança automática ou avulsa |
| VL_MENSALIDADE | decimal(10,2) | Sim | > 0 |
| IN_ATIVO | boolean | Sim | Disponível para nova adesão |

### MATRICULA (entidade associativa entre ALUNO e PLANO)
`= @ID_MATRICULA + ID_ALUNO + ID_PLANO + DT_INICIO + (DT_FIM) + [TP_PAGO | TP_PENDENTE | TP_INADIMPLENTE | TP_CANCELADO] + (CD_ULTIMOS_DIGITOS_CARTAO)`

| Atributo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| ID_MATRICULA | integer | Sim (PK) | — |
| ID_ALUNO | integer | Sim (FK) | — |
| ID_PLANO | integer | Sim (FK) | — |
| DT_INICIO | date | Sim | — |
| DT_FIM | date | Não | Preenchida no cancelamento |
| Status (pago/pendente/inadimplente/cancelado) | varchar(20) | Sim | Inadimplente bloqueia a catraca |
| CD_ULTIMOS_DIGITOS_CARTAO | varchar(4) | Não | Conferência sem expor dado sensível |

### FUNCIONARIO
`= @ID_FUNCIONARIO + NM_FUNCIONARIO + ID_CPF + [TP_RECEPCAO | TP_PROFESSOR | TP_GERENTE | TP_FINANCEIRO] + IN_ATIVO`

| Atributo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| ID_FUNCIONARIO | integer | Sim (PK) | — |
| NM_FUNCIONARIO | varchar(120) | Sim | — |
| ID_CPF | varchar(11) | Sim (único) | — |
| Papel (recepção/professor/gerente/financeiro) | varchar(20) | Sim | Define permissões de acesso |
| IN_ATIVO | boolean | Sim | — |

### TREINO
`= @ID_TREINO + ID_ALUNO + ID_PROFESSOR + DT_CRIACAO + DT_VALIDADE + 1{ITEM_EXERCICIO}100 + (DS_OBSERVACAO_MEDICA)`

*(cada item de exercício = NM_EXERCICIO + QT_SERIES + QT_REPETICOES + (DS_CARGA))*

| Atributo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| ID_TREINO | integer | Sim (PK) | — |
| ID_ALUNO | integer | Sim (FK) | — |
| ID_PROFESSOR | integer | Sim (FK) | Referencia FUNCIONARIO |
| DT_CRIACAO / DT_VALIDADE | date | Sim | Define renovação da ficha |
| NM_EXERCICIO, QT_SERIES, QT_REPETICOES | — | Sim | Um treino tem de 1 a 100 exercícios |
| DS_CARGA | varchar(30) | Não | — |
| DS_OBSERVACAO_MEDICA | text | Não | Limitações físicas do aluno |

### AULA_COLETIVA
`= @ID_AULA + NM_MODALIDADE + DT_HORARIO + QT_LIMITE_VAGAS + ID_INSTRUTOR`

| Atributo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| ID_AULA | integer | Sim (PK) | — |
| NM_MODALIDADE | varchar(60) | Sim | Spinning, boxe, muay thai etc. |
| DT_HORARIO | datetime | Sim | — |
| QT_LIMITE_VAGAS | integer | Sim | 19 para o spinning |
| ID_INSTRUTOR | integer | Sim (FK) | Referencia FUNCIONARIO |

### CHECKIN_AULA (entidade associativa entre ALUNO e AULA_COLETIVA)
`= @ID_CHECKIN + ID_AULA + ID_ALUNO + DT_REALIZACAO`

| Atributo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| ID_CHECKIN | integer | Sim (PK) | — |
| ID_AULA / ID_ALUNO | integer | Sim (FK) | Índice único (ID_AULA, ID_ALUNO) evita reserva duplicada |
| DT_REALIZACAO | datetime | Sim | — |

### OCORRENCIA_TURNO
`= @ID_OCORRENCIA + DT_REGISTRO + [TP_MADRUGADA | TP_MANHA | TP_TARDE | TP_NOITE] + ID_FUNCIONARIO_AUTOR + DS_MENSAGEM + IN_RESOLVIDO`

| Atributo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| ID_OCORRENCIA | integer | Sim (PK) | — |
| DT_REGISTRO | datetime | Sim | — |
| Turno (madrugada/manhã/tarde/noite) | varchar(20) | Sim | — |
| ID_FUNCIONARIO_AUTOR | integer | Sim (FK) | — |
| DS_MENSAGEM | text | Sim | Pendência ou aviso operacional |
| IN_RESOLVIDO | boolean | Sim | — |

> Todos os valores de exemplo acima são fictícios, usados apenas para ilustrar a estrutura dos atributos.

**Controle de acesso e LGPD:** professores só têm acesso a ID_ALUNO, CPF e dados do treino (sem ver dados financeiros ou cadastrais completos); a recepção tem acesso mais amplo para atualizações cadastrais; o gerente consulta matrículas, acesso e financeiro; dados sensíveis (saúde e biometria) se enquadram no art. 5º, II da LGPD, com base legal em execução de contrato e tutela da saúde. Ao fim do contrato, os dados são mantidos pelo prazo legal e depois anonimizados para fins estatísticos.

---

## 6. Modelagem Conceitual (Entidades, Atributos, Relacionamentos)

**Entidades reconhecidas:**
- **ALUNO** — cliente contratante, entidade central para acesso, cobrança e treinos.
- **PLANO** — modalidade comercial contratada, separada do cadastro do aluno para preservar o histórico financeiro.
- **MATRICULA** — associa aluno e plano, permitindo múltiplos vínculos ao longo do tempo.
- **FUNCIONARIO** — recepcionistas, professores, gerente e financeiro; necessário para autoria de treinos e controle de permissões.
- **TREINO** — ficha de exercícios prescrita, vinculada a um aluno e a um professor.
- **AULA_COLETIVA** — sessões com horário e limite de vagas.
- **CHECKIN_AULA** — associa aluno e aula, controlando o limite de participantes.
- **OCORRENCIA_TURNO** — registro de comunicação entre turnos, criado para resolver o principal problema identificado na entrevista.

**Relacionamentos principais:**
- `ALUNO (1,1) — possui — (1,N) MATRICULA`
- `PLANO (1,1) — rege — (0,N) MATRICULA`
- `ALUNO (1,1) — realiza — (0,N) TREINO`
- `FUNCIONARIO (1,1) — elabora — (0,N) TREINO`
- `ALUNO (0,N) — reserva — (0,N) AULA_COLETIVA`, via `CHECKIN_AULA`
- `FUNCIONARIO (1,1) — registra — (0,N) OCORRENCIA_TURNO`

---

## 7. Justificativa Técnica

- **ALUNO, PLANO e MATRICULA separados:** evita guardar dados de pagamento direto no cadastro do aluno. A entidade associativa MATRICULA preserva o histórico de renovações e trocas de plano sem duplicar dados cadastrais.
- **TREINO ligado a FUNCIONARIO, mas independente do vínculo empregatício:** o desligamento de um professor não apaga os treinos que ele criou — apenas mantém a referência ao autor original, permitindo que outro professor assuma e continue o histórico, como relatado na entrevista.
- **OCORRENCIA_TURNO como entidade própria:** a falha de comunicação entre turnos foi apontada como o principal gargalo operacional; essa entidade digitaliza o "livro de ocorrências" e permite marcar avisos como resolvidos.
- **CHECKIN_AULA como associativa:** trata a reserva de aula como um relacionamento controlado, permitindo aplicar a regra de limite de vagas (19 no spinning) diretamente na modelagem.

---

## 8. Uso de Inteligência Artificial

| Item | Registro |
|---|---|
| **Ferramenta e etapa** | Gemini — estruturação da entrevista, organização dos requisitos, dicionário de dados e modelo conceitual. |
| **Motivação** | Agilizar a transformação das anotações de campo em requisitos e estrutura de dados. |
| **Prompt(s) utilizados** | Transcrição da entrevista da Academia Gaviões, transformando arquivo de áudio em texto para melhor estruturar. |
| **Fontes consultadas e verificadas** | Comparação das entidades e regras sugeridas com as anotações da entrevista presencial. E análise de conteúdo da matéria Banco de Dados da Unicid. |
