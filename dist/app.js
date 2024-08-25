"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
// Função para buscar os Pokémon da PokeAPI
function carregarPokemons() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://pokeapi.co/api/v2/pokemon?limit=9999';
        try {
            const resposta = yield fetch(url);
            const dados = yield resposta.json();
            const pokemons = dados.results.map((pokemon) => pokemon.name);
            preencherDatalist(pokemons);
        }
        catch (erro) {
            console.error('Erro ao carregar Pokémon:', erro);
        }
    });
}
// Função para preencher o datalist com Pokémon
function preencherDatalist(pokemons) {
    const datalist = document.getElementById('pokemons');
    datalist.innerHTML = '';
    pokemons.forEach(pokemon => {
        const option = document.createElement('option');
        option.value = capitalizeFirstLetter(pokemon);
        datalist.appendChild(option);
    });
}
// Função para deixar primeira letra Maiúscula
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// Manipulador de envio do formulário
(_a = document.getElementById('meuForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault(); // Evita o envio do formulário vazio
        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const pokemonName = document.getElementById('pokemon').value.toLowerCase();
        // Buscar detalhes do Pokémon selecionado
        try {
            const resposta = yield fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            if (!resposta.ok) {
                throw new Error('Pokémon não encontrado');
            }
            const pokemonData = yield resposta.json();
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
        }
        catch (erro) {
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
});
// Carregar Pokémon quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', carregarPokemons);
