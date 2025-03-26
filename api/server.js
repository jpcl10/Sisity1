const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios'); // Para enviar requisições HTTP

const calcularPontuacao = require('./calculator');

const app = express();

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear o corpo da requisição (body) no formato JSON
app.use(bodyParser.json());

// Middleware para servir arquivos estáticos do cliente
// Configura o middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../front')));

app.get('/BPA', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/BPA/index.html'));
});
app.get('/BPA', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/MAMOGRAFIA/index.html'));
  });
  
app.get('/APAC', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/APAC/index.html'));
  });

app.get('/RESSONANCIA', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/RESSONANCIA/index.html'));
})

// Rota POST para receber dados do formulário
app.post('/register/BPA', async (req, res) => {
    let formData = req.body;
    // URL do Google Apps Script
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbw0tyZgg4e3fjedW5WgM_Kub6kZbFEid7oF4vyPa-pWNJof4GTs_AtqEsbPPc1gdAK9Xg/exec';

    // Calcular a pontuação
    formData.score = calcularPontuacao(formData);
    console.log(formData)

    // Index da Página a partir do 0.
    formData.sheetIndex = 1;

    // Enviar os dados para o Google Apps Script
    try {
        await axios.post(googleScriptUrl, formData);

        res.status(200).json({
            message: 'Formulário recebido com sucesso e dados salvos na planilha!'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao salvar dados na planilha',
            error: error.message
        });

        console.log(error)
    }
});

// Rota POST para receber dados do formulário
app.post('/register/ressonancia', async (req, res) => {
    let formData = req.body;
    // URL do Google Apps Script
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbw1918nzgvOrfSIyOZuhHx4kHAYFLFvxOBiGNb8Zf2D8UoxGweMhbRiuWfvviafBJr4Pg/exec';

    // Calcular a pontuação
    formData.score = calcularPontuacao(formData);
    console.log(formData)

    // Index da Página a partir do 0.
    formData.sheetIndex = 2;

    // Enviar os dados para o Google Apps Script
    try {
        await axios.post(googleScriptUrl, formData);

        res.status(200).json({
            message: 'Formulário recebido com sucesso e dados salvos na planilha!'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao salvar dados na planilha',
            error: error.message
        });

        console.log(error)
    }
});

// Rota POST para receber dados do formulário
app.post('/register/mamografia', async (req, res) => {
    let formData = req.body;
    // URL do Google Apps Script
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxaJpFL5MyFBVXNEMJMHmvnuDBV5N-TQ5tM1cT_KEcFh3bQ90zX-PZJV6X0jxp0arwW/exec';

    // Calcular a pontuação
    formData.score = calcularPontuacao(formData);
    console.log(formData)

    // Index da Página a partir do 0.
    formData.sheetIndex = 3;

    // Enviar os dados para o Google Apps Script
    try {
        await axios.post(googleScriptUrl, formData);

        res.status(200).json({
            message: 'Formulário recebido com sucesso e dados salvos na planilha!'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao salvar dados na planilha',
            error: error.message
        });

        console.log(error)
    }
});


// Rota POST para receber dados do formulário
app.post('/register/apac', async (req, res) => {
    let formData = req.body;
    // URL do Google Apps Script
const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbwqu6x9xyfmcMif0a-nix_eihPNXCmTFZ4MGoqYcHgjfO5fEcAbJzPzj4BAJjSlon7I/exec';
    

    // Calcular a pontuação
    formData.score = calcularPontuacao(formData);

    // Enviar os dados para o Google Apps Script
    try {
        await axios.post(googleScriptUrl, formData);

        res.status(200).json({
            message: 'Formulário recebido com sucesso e dados salvos na planilha!'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao salvar dados na planilha',
            error: error.message
        });

        console.log(error)
    }
});


// Definindo a porta do servidor
const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
