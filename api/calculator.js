/**
 * Calcula a idade com base na data de nascimento
 * @param {string} dataNascimento - Data de nascimento no formato DD/MM/AAAA
 * @return {number} - Idade em anos
 */
function calcularIdade(dataNascimento) {
    if (!dataNascimento) return 0;

    var partes = dataNascimento.split('/');
    if (partes.length !== 3) return 0;

    var dia = parseInt(partes[0], 10);
    var mes = parseInt(partes[1], 10) - 1; // Mês em JavaScript é 0-indexed
    var ano = parseInt(partes[2], 10);

    var dataNasc = new Date(ano, mes, dia);
    var hoje = new Date();

    var idade = hoje.getFullYear() - dataNasc.getFullYear();
    var m = hoje.getMonth() - dataNasc.getMonth();

    if (m < 0 || (m === 0 && hoje.getDate() < dataNasc.getDate())) {
        idade--;
    }

    return idade;
}

/**
 * Calcula o score de idade com base nos critérios definidos
 * @param {number} idade - Idade em anos
 * @return {number} - Score de idade (0, 5 ou 10)
 */
function calcularScoreIdade(idade) {
    if (idade >= 80) return 10; // Idosos com 80+ anos: +10 pontos
    if (idade >= 60) return 5;  // Idosos entre 60-79 anos: +5 pontos
    if (idade < 1) return 10;   // Bebês menores de 1 ano: +10 pontos
    if (idade < 5) return 5;    // Crianças menores de 5 anos: +5 pontos
    return 0; // Outros grupos etários: 0 pontos
}

/**
 * Calcula o score de prioridade clínica com base no nível selecionado
 * @param {string} prioridade - Nível de prioridade (1-4)
 * @return {number} - Score de prioridade (10, 40, 70 ou 100)
 */
function calcularScorePrioridade(prioridade) {
    if (!prioridade) return 0;

    var nivel = typeof prioridade === 'string' ? parseInt(prioridade, 10) : prioridade;

    switch (nivel) {
        case 1: return 100; // Prioridade 1 – Muito urgente (100 pontos)
        case 2: return 70;  // Prioridade 2 – Alta urgência (70 pontos)
        case 3: return 40;  // Prioridade 3 – Moderada (40 pontos)
        case 4: return 10;  // Prioridade 4 – Baixa urgência (10 pontos)
        default: return 0;  // Sem prioridade definida
    }
}

/**
 * Calcula o score para gestação ou puerpério
 * @param {string} gestacao - "Sim" ou "Não"
 * @return {number} - Score (0 ou 5)
 */
function calcularScoreGestacao(gestacao) {
    return gestacao && gestacao.toLowerCase() === 'sim' ? 5 : 0;
}

/**
 * Calcula o score para comorbidades
 * @param {string} comorbidades - Quantidade de comorbidades ("Nenhuma", "1-2", "3 ou mais")
 * @return {number} - Score (0, 5 ou 10)
 */
function calcularScoreComorbidades(comorbidades) {
    if (!comorbidades) return 0;

    var comorbidadesLower = comorbidades.toLowerCase();
    if (comorbidadesLower.includes('3 ou mais')) return 10;
    if (comorbidadesLower.includes('1-2')) return 5;
    return 0; // Nenhuma comorbidade
}

/**
 * Calcula o score para limitação funcional
 * @param {string} limitacao - Nível de limitação ("Nenhuma", "Leve", "Moderada", "Severa")
 * @return {number} - Score (0, 3, 5 ou 10)
 */
function calcularScoreLimitacao(limitacao) {
    if (!limitacao) return 0;

    var limitacaoLower = limitacao.toLowerCase();
    if (limitacaoLower.includes('severa')) return 10;
    if (limitacaoLower.includes('moderada')) return 5;
    if (limitacaoLower.includes('leve')) return 3;
    return 0; // Nenhuma limitação
}

/**
 * Calcula o score para histórico recente de internação/emergência
 * @param {string} historico - "Sim" ou "Não"
 * @return {number} - Score (0 ou 5)
 */
function calcularScoreHistorico(historico) {
    return historico && historico.toLowerCase() === 'sim' ? 5 : 0;
}

/**
 * Função principal que calcula a pontuação total
 * @param {Object} dados - Dados do paciente e da solicitação
 * @return {number} - Pontuação total
 */
function calcularPontuacao(dados) {
    let pontuacao = 0;

    // Calcula a idade e pontuação de idade
    const idade = calcularIdade(dados.paciente_dt_nasc);
    pontuacao += calcularScoreIdade(idade);

    // Calcula a pontuação de prioridade clínica
    pontuacao += calcularScorePrioridade(dados.paciente_prioridade_clinica);

    // Pontuação para gestação ou puerpério
    pontuacao += calcularScoreGestacao(dados.paciente_gestacao_puerperio);

    // Pontuação para comorbidades
    pontuacao += calcularScoreComorbidades(dados.paciente_comorbidades);

    // Pontuação para limitação funcional
    pontuacao += calcularScoreLimitacao(dados.paciente_limitacao_funcional);

    // Pontuação para histórico de internação/emergência
    pontuacao += calcularScoreHistorico(dados.paciente_historico_internacao);

    return pontuacao;
}

module.exports = calcularPontuacao;