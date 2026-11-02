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
**Versão da documentação:** 1.0
**Última atualização:** 02/11/2026

---

## 1. Apresentação da organização

### 1.1 Caracterização

A organização escolhida foi a Academia Gaviões, do setor de fitness e bem-estar. A unidade que usamos como referência funciona 24 horas por dia e atende alunos em horários bem diferentes, então os funcionários são distribuídos em quatro turnos: madrugada, manhã, tarde e noite.

A equipe tem recepcionistas, professores, pessoal da limpeza, gerente, funcionários do financeiro e personal trainers externos credenciados.

### 1.2 Problemas identificados

Na conversa com os funcionários, apareceram algumas dificuldades da rotina:

- **Comunicação entre os turnos:** avisos, problemas e pendências nem sempre chegam para a equipe seguinte. Isso gera falha no atendimento e atrasa a resolução de problemas.
- **Pagamentos e cancelamentos:** teve relato de cancelamento de plano que não foi atualizado direito no sistema, o que acabou bloqueando a catraca de aluno que não devia.
- **Controle de materiais:** falta um acompanhamento melhor dos materiais de uso interno, itens promocionais e produtos de limpeza, principalmente em relação a quanto foi retirado e consumido.
- **Manutenção de equipamentos:** os problemas que aparecem durante o funcionamento precisam ser registrados e encaminhados para os responsáveis.

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

A partir da entrevista, identificamos os processos principais da rotina da academia.

### 2.1 Cadastro e matrícula

Começa com o cadastro do aluno (dados pessoais, foto e biometria facial). Depois é feito o vínculo com o plano escolhido, que pode ser de cobrança recorrente ou não recorrente.

### 2.2 Controle de acesso

A entrada dos alunos é feita por reconhecimento facial na catraca. O sistema precisa checar a situação da matrícula e a situação financeira antes de liberar.

Quando dá alguma falha na validação, a recepção pode fazer a liberação manual, seguindo o procedimento da academia.

### 2.3 Prescrição de treinos

Os professores elaboram e atualizam as fichas de treino dos alunos. Os exercícios são organizados de acordo com a necessidade, a experiência e as limitações físicas informadas pelo aluno.

O histórico dos treinos precisa ser preservado mesmo quando o professor responsável sai da academia.

### 2.4 Aulas coletivas

A academia oferece modalidades como spinning, boxe e muay thai.

O spinning tem controle de reserva pelo aplicativo e limite de 19 vagas por horário. As outras modalidades normalmente não exigem reserva antecipada, pelo que foi passado na entrevista.

### 2.5 Comunicação entre turnos

As ocorrências e os recados precisam ficar registrados para que os funcionários dos próximos turnos consigam consultar as pendências anteriores. A ideia é não depender só de conversa ou aviso verbal.

### 2.6 Estoque e manutenção

Os materiais usados pela academia precisam ter as movimentações acompanhadas, incluindo retiradas e consumo.

Também é necessário registrar problemas em equipamentos e acompanhar os chamados de manutenção até resolver.

---

## 3. Requisitos do sistema

### 3.1 Requisitos funcionais

- **RF01 — Cadastro de alunos:** permitir o cadastro de alunos com informações pessoais, foto e biometria facial.
- **RF02 — Controle de planos e pagamentos:** permitir o cadastro de planos, o vínculo com alunos e o registro das informações de pagamento.
- **RF03 — Controle de acesso:** liberar ou bloquear a entrada na catraca de acordo com a situação da matrícula e financeira do aluno.
- **RF04 — Controle de treinos:** permitir que professores criem, editem e consultem fichas de treino.
- **RF05 — Agendamento de aulas:** permitir o registro de check-in em aulas coletivas, respeitando o limite de vagas.
- **RF06 — Registro de ocorrências:** permitir que funcionários registrem avisos e pendências relacionados aos turnos de trabalho.
- **RF07 — Chamados de manutenção:** permitir o registro e o acompanhamento de problemas e solicitações de manutenção.
- **RF08 — Controle de estoque:** permitir o acompanhamento dos materiais internos e dos itens promocionais utilizados pela academia.

### 3.2 Requisitos não funcionais

- **RNF01 — Segurança e privacidade:** o acesso às informações deve ser controlado de acordo com a função de cada usuário. Professores, por exemplo, não devem consultar informações financeiras dos alunos nem visualizar os dados completos do cartão.
- **RNF02 — Disponibilidade:** a validação de acesso na catraca deve estar disponível durante todo o funcionamento da academia, com tempo de resposta inferior a dois segundos.
- **RNF03 — Integridade:** o histórico dos treinos deve continuar disponível mesmo após o desligamento do professor responsável por sua criação.

---

## 4. Regras de negócio

### 4.1 Regras operacionais

- **RN01 — Cancelamento de planos:** o cancelamento solicitado pelo aluno deve ser feito mediante solicitação formal pelo SAC.
- **RN02 — Inadimplência:** pela entrevista, a inadimplência prolongada (por volta de 60 dias) pode provocar o cancelamento automático do plano e o bloqueio do acesso pela catraca.
- **RN03 — Limite de vagas:** as aulas de spinning possuem limite de 19 participantes por horário.
- **RN04 — Personal trainers externos:** profissionais externos só podem atuar na academia quando possuem cadastro ativo e pagamento da taxa mensal correspondente.

A RN01 e a RN02 tratam de situações diferentes, mas precisam ser lidas juntas. O cancelamento pedido pelo aluno passa pelo SAC, enquanto o cancelamento por inadimplência segue uma regra operacional própria. O funcionamento exato dessa segunda situação ainda precisa ser confirmado com a academia.

### 4.2 Restrições organizacionais

- **RN05 — Dados de cartão:** recepcionistas e professores devem visualizar somente os últimos quatro dígitos do cartão do aluno, sem acesso ao número completo.
- **RN06 — Informações de saúde:** informações sobre limitações físicas e condições relevantes para a elaboração dos treinos podem ser anexadas ao cadastro do aluno em formato digital, como PDF ou imagem.

---

## 5. Modelagem conceitual

### 5.1 Entidades identificadas

Nesta versão do documento, estão descritas as seguintes entidades:

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

Essa lista tem 8 entidades, mas os requisitos também falam de estoque, manutenção, unidades e itens de treino. Essas funcionalidades provavelmente vão exigir entidades próprias (`ESTOQUE_MATERIAL`, `CHAMADO_MANUTENCAO`, `UNIDADE` e `ITEM_TREINO`), que já aparecem no Dicionário de Dados em HTML. Ou seja: o README ainda está com 8 entidades e o HTML com 12, e isso precisa ser alinhado antes da entrega final.

### 5.2 Relacionamentos e cardinalidades

| Relacionamento | Descrição |
|---|---|
| ALUNO — MATRICULA | Um aluno pode possuir várias matrículas ao longo do tempo. Cada matrícula pertence a um aluno. |
| PLANO — MATRICULA | Um plano pode estar associado a várias matrículas. Cada matrícula está vinculada a um plano. |
| ALUNO — TREINO | Um aluno pode possuir vários treinos. Cada treino pertence a um aluno. |
| FUNCIONARIO — TREINO | Um funcionário que atua como professor pode elaborar vários treinos. Cada treino possui um responsável. |
| ALUNO — AULA_COLETIVA | Um aluno pode participar de várias aulas, e uma aula pode receber vários alunos. O vínculo é registrado por CHECKIN_AULA. |
| FUNCIONARIO — OCORRENCIA_TURNO | Um funcionário pode registrar várias ocorrências. Cada ocorrência possui um funcionário responsável pelo registro. |

As cardinalidades exatas ainda precisam ser conferidas no DER final, porque a notação usada no README e a do diagrama podem não bater.

### 5.3 Justificativa da modelagem

Separar `ALUNO`, `PLANO` e `MATRICULA` permite manter os dados pessoais separados das informações de contratação. Assim o aluno pode trocar de plano ou fazer novas matrículas sem duplicar o cadastro.

A entidade `TREINO` mantém o registro dos exercícios elaborados pelos professores, o que preserva o histórico mesmo quando o funcionário sai da academia.

A entidade `OCORRENCIA_TURNO` foi pensada para resolver um dos problemas vistos na entrevista: a perda de informação na troca de turno. Com esse registro, os funcionários consultam avisos e acompanham pendências anteriores.

Já `CHECKIN_AULA` funciona como entidade associativa entre alunos e aulas coletivas. Ela permite registrar as participações e aplicar as regras de limite de vagas.

---

## 6. Fluxo de dados e controle de acesso

### 6.1 Fluxo de cadastro até a catraca

1. **Cadastro:** o aluno informa os dados pessoais e faz o cadastro na academia.
2. **Identificação:** são registradas as informações necessárias para a identificação, incluindo foto e biometria facial.
3. **Matrícula:** o aluno escolhe um plano e o cadastro é vinculado à matrícula correspondente.
4. **Reconhecimento facial:** ao chegar à academia, o aluno faz a identificação na catraca.
5. **Validação:** o sistema consulta a matrícula e verifica a situação financeira do aluno.
6. **Decisão:** se as condições estiverem regulares, a catraca libera. Caso exista pendência, o acesso é bloqueado.
7. **Atendimento pela recepção:** se der falha na identificação ou na validação, a recepção verifica a situação e faz o procedimento manual previsto pela academia.

Esse fluxo é o funcionamento esperado com base na entrevista. Os detalhes técnicos da integração com o reconhecimento facial ainda dependem da implementação.

### 6.2 Níveis de acesso

| Perfil | Acesso previsto |
|---|---|
| **Recepção** | Consultar e atualizar informações cadastrais, verificar matrículas e ajudar na resolução de problemas de acesso. |
| **Professor** | Consultar informações necessárias para acompanhar os alunos e elaborar treinos, sem acesso aos dados financeiros. |
| **Gerente** | Acompanhar informações operacionais, matrículas, ocorrências e dados necessários à administração da unidade. |
| **Financeiro** | Consultar informações relacionadas a pagamentos, planos e situações financeiras. |

As permissões detalhadas (cadastrar, alterar, excluir, consultar) devem ser definidas na etapa de implementação do controle de acesso.

### 6.3 Proteção e registro de informações sensíveis

Informações como biometria facial, dados de saúde e informações financeiras exigem cuidado especial.

O sistema deve restringir o acesso a essas informações de acordo com a função do funcionário. Também é importante manter registro das operações feitas sobre dados sensíveis, para identificar quem acessou ou alterou, o que foi consultado e quando aconteceu.

A estrutura específica para armazenar esses registros ainda não foi definida no modelo.

---

## 7. Dicionário de dados e convenções

O Dicionário de Dados complementa o DER, apresentando os atributos das entidades, seus tipos, suas chaves e as regras relacionadas a cada informação.

Para o README não ficar repetitivo, a documentação detalhada dos atributos fica em um documento separado.

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

A tecnologia definida para o projeto é o MySQL 8, com o mecanismo InnoDB.

A codificação prevista é `utf8mb4_0900_ai_ci`, que permite armazenar caracteres de diferentes idiomas, incluindo acentos e símbolos usados no português.

A terminação `ai_ci` indica que as comparações não diferenciam acentos nem maiúsculas e minúsculas, o que facilita buscas e comparações de nomes e textos.

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

A relação entre treinos e funcionários também é importante para preservar a autoria das fichas, assim o histórico não depende da permanência do professor na empresa.

Por fim, o registro de ocorrências atende a uma necessidade vista direto na rotina da academia: melhorar a comunicação entre os turnos e evitar que pendências sejam esquecidas.

As funcionalidades de estoque, manutenção e controle de unidades também fazem parte dos requisitos levantados e precisam estar representadas no modelo final.

---

## 10. Uso de inteligência artificial

As ferramentas de inteligência artificial foram usadas como apoio durante a organização das informações e a elaboração da documentação.

| Item | Registro |
|---|---|
| **Ferramenta utilizada** | Gemini. |
| **Etapas de utilização** | Organização da entrevista, levantamento de requisitos, estruturação do Dicionário de Dados e elaboração do modelo conceitual. |
| **Motivação** | Facilitar a organização das anotações e transformar as informações levantadas em uma documentação mais clara. |
| **Material utilizado** | Transcrição da entrevista realizada na Academia Gaviões. |
| **Verificação** | As informações e sugestões foram comparadas com as anotações da entrevista e com os conteúdos estudados na disciplina de Banco de Dados. |

A utilização dessas ferramentas teve caráter de apoio. As decisões finais sobre a modelagem e a documentação devem ser revisadas e validadas pelos integrantes do grupo.

---

## 11. Considerações finais

No fim, o projeto serviu para perceber que os processos da academia dependem de informação organizada e acessível para as pessoas certas.

A entrevista mostrou necessidades ligadas a cadastro, controle financeiro, acesso à unidade, elaboração de treino, aulas coletivas, comunicação entre funcionários e manutenção.

A modelagem proposta tenta representar essas necessidades por meio de entidades e relacionamentos, e o DER, o modelo lógico e o Dicionário de Dados precisam ser mantidos atualizados em conjunto.
