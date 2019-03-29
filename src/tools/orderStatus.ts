export const status = function (status: number | string) {
    const orderStatus = [{
        "desc": "Espera pela revisão",
        "value": 1
    },
    {
        "desc": "Aprovação da revisão",
        "value": 2
    },
    {
        "desc": "Emprestando",
        "value": 3
    },
    {
        "desc": "Espera por pagar",
        "value": 4
    },
    {
        "desc": "Finalizada",
        "value": 6
    },
    {
        "desc": "Cancelamento manual",
        "value": 8
    },
    {
        "desc": "Recusa pela avaliação",
        "value": 9
    },
    {
        "desc": "Fecho do sistema",
        "value": 11
    },
    {
        "desc": "Recusa pela avaliação",
        "value": 12
    },
    {
        "desc": "Insucesso de emprestar",
        "value": 13
    }
    ]
    if (status || status === 0) {

        let val = orderStatus.find(item => {
            return item.value == status;
        });

        return val.desc;

    } else {

        return "Estado desconhecido";

    };
};