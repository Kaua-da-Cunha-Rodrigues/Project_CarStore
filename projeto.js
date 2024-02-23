const enviarEmail = require("./envia-email");

/*
    1 - Criar a lista de clientes X
    2 - Verificar quem tem a tag X
    3 - criar a função para verificar o dia X
    4 - Criar função pra montar o corpo do email X
    5 - Criar função para enviar para cada cliente permitido
    5 - Tratar o retorno da mensagem de erro
*/

const listaClientes = [
    {
        nome: "Kauã",
        email: "teste@gmail.com",
        flag: true
    },
    {
        nome: "Cleiton",
        email: "teste2@gmail.com",
        flag: true
    },
    {
        nome: "Lara",
        email: "teste3@gmail.com",
        flag: false
    }
]

let clientesVerificados = []

function verificarCliente(clientes){

    for (const key in clientes) {
        if(clientes[key].flag === true){
            clientesVerificados.push(clientes[key])
        }
    }
}
verificarCliente(listaClientes)

function verificarDiaSemana(){
    const dataAtual = new Date();
    const diaSemana = dataAtual.getDay(); 
    return diaSemana === 1; 
}

function montarCorpoEmail() {
    const promocoes = [
        { modelo: "Carro X", desconto: "10%" },
        { modelo: "Carro Y", desconto: "15%" },
        { modelo: "Carro Z", desconto: "20%" }
    ]; 


    const corpoEmail = `
        Olá, Esperamos que esteja bem! 

        Queremos compartilhar algumas ofertas exclusivas para você da CarStore:

        Promoções Especiais:
        ${promocoes.map(promocao => `${promocao.modelo}: Desconto de ${promocao.desconto}`).join("\n")}

        Além disso, confira nossos novos modelos e os carros mais vendidos.

        Venha nos fazer uma visita esta semana e aproveite estas oportunidades!
    `;

    return corpoEmail;
}

function prepararEnvioEmail(){
    if(verificarDiaSemana()){
        for(const key in clientesVerificados){
            
            const endereco = clientesVerificados[key].email
            const assunto = "Promoções na CarStore!"
            const corpo = montarCorpoEmail()

            const verificarEnvioEmail = enviarEmail(endereco, assunto, corpo)

            checarEnvioEmail(verificarEnvioEmail)
        }
    }
}

function checarEnvioEmail(email){

        if(email.status === "Sucess"){
            console.log(`
            --------------------------------------------------------------------------
                                Mensagem Enviada com Sucesso!
            --------------------------------------------------------------------------
            `)
        }else{
            console.log(`
            --------------------------------------------------------------------------
                                   Falha ao Enviar a Mensagem!
            --------------------------------------------------------------------------
            `)
        }
}
prepararEnvioEmail()
