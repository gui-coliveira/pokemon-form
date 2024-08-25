// Função para buscar os Pokémon da PokeAPI
async function carregarPokemons() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=9999';
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        const pokemons = dados.results.map((pokemon: { name: string }) => pokemon.name);
        preencherDatalist(pokemons);
    } catch (erro) {
        console.error('Erro ao carregar Pokémon:', erro);
    }
}

// Função para preencher o datalist com Pokémon
function preencherDatalist(pokemons: string[]) {
    const datalist = document.getElementById('pokemons') as HTMLDataListElement;

    datalist.innerHTML = '';

    pokemons.forEach(pokemon => {
        const option = document.createElement('option');
        option.value = capitalizeFirstLetter(pokemon);
        datalist.appendChild(option);
    });
}

// Função para deixar primeira letra Maiúscula
function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Manipulador de envio do formulário
document.getElementById('meuForm')?.addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita o envio do formulário vazio

    const nome = (document.getElementById('nome') as HTMLInputElement).value;
    const idade = (document.getElementById('idade') as HTMLInputElement).value;
    const pokemonName = (document.getElementById('pokemon') as HTMLInputElement).value.toLowerCase();

    // Buscar detalhes do Pokémon selecionado
    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!resposta.ok) {
            throw new Error('Pokémon não encontrado');
        }

        const pokemonData = await resposta.json();
        const pokemonNumber = pokemonData.id;
        const pokemonImage = pokemonData.sprites.front_default;

        const resultadoDiv = document.getElementById('resultado');
        if (resultadoDiv) {
            resultadoDiv.innerHTML = `
                <div>
                    <p><b>Nome: </b>${nome}</p>
                    <p><b>Idade: </b>${idade}</p>
                    <p><b>Pokémon Preferido: </b>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</p>
                    <p><b>Nº Pokédex: </b>${pokemonNumber}</p>
                </div>
                <img src="${pokemonImage}" alt="${pokemonData.name}" />
            `;

            resultadoDiv.style.borderTop = '1px solid rgba(0, 0, 0, 0.253)';
        }
    } catch (erro) {
        console.error('Erro ao buscar detalhes do Pokémon:', erro);
        const resultadoDiv = document.getElementById('resultado');
        if (resultadoDiv) {
            resultadoDiv.innerHTML = `
                <div>
                    <p><b>Nome: </b>${nome}</p>
                    <p><b>Idade: </b>${idade}</p>
                    <p><b>Pokémon Preferido: </b>${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</p>
                    <b style="color: red;">Erro: Pokémon não encontrado.</b>
                </div>
                <img src="https://placehold.co/600x400?text=?" />
            `;

            resultadoDiv.style.borderTop = '1px solid rgba(0, 0, 0, 0.253)';
        }
    }
});

// Carregar Pokémon quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', carregarPokemons);