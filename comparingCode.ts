// O que deu errado

/* const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const formData = new FormData();

    formData.append('nome', nomePrato)
    formData.append('descricao', descricao)
    formData.append('tag', tag)
    formData.append('restaurante', restaurante)

    if (imagem) {
        formData.append('imagem', imagem)
    }

    http.request({
        url: 'pratos/novo',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
        .then(() => alert('Prato cadastrado com sucesso!'))
        .catch(error => console.error(error))
} */

// O que deu certo

/* 
const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        const formData = new FormData();

        formData.append('nome', nomePrato)
        formData.append('descricao', descricao)

        formData.append('tag', tag)

        formData.append('restaurante', restaurante)

        if (imagem) {
            formData.append('imagem', imagem)
        }

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
            .then(() => {
                setNomePrato('')
                setDescricao('')
                setTag('')
                setRestaurante('')
                alert('Prato cadastrado com sucesso!')
            })
            .catch(erro => console.log(erro))

    }
*/
