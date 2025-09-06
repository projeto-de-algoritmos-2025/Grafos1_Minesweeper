# Campo minado

**Conteúdo da Disciplina**: Grafos 1<br>

## Alunos

|Matrícula | Aluno |
| -- | -- |
| 211062080  | Leandro Almeida Rocha Santos |
| 232029210  | Mariana Pereira da Silva |

## Sobre

Este projeto teve como objetivo implementar algoritmos de busca em grafos no desenvolvimento de um jogo de campo minado. Ao clicar em um campo vazio, é realizado uma expansão autómatica para todos os campos vazios adjacentes, utilizando o algoritmo de busca em largura(BFS). Além disso, quando o jogador clica em uma bomba e perde a partida, todas as bombas do tabuleiro são reveladas por meio de uma busca em profundidade(DFS)

Principais funcionalidades:
- Clique com o botão esquerdo: revela o conteúdo do campo selecionado.
- Clique com o botão direito: marca o campo com uma flag, indicando a possível presença de bombas.
- Botão reset: reinicia o tabuleiro para uma nova partida.
- Botão de level: permite selecionar a dificuldade do jogo, variando o tamanho do tabuleiro e a quantidade de bombas de acordo com o nível escolhido.

## Screenshots


---

## Instalação

**Linguagem**: Typescript<br>
**Framework**: Não utilizado<br>
**Bibliotecas**: React, schadcn/ui, Radix UI<br>

Pré-requisitos:
- Node.js (versão recomendada: >= 18.x)
- npm ou yarn como gerenciador de pacotes

Para instalar as dependências, execute o comando:

```cmd
yarn install
```

## Uso

1. Execute na raiz do projeto:
   ```cmd
   yarn run dev
   ```
   ou acesse https://projeto-de-algoritmos-2025.github.io/Grafos1_Minesweeper/
2. Clique com o botão esquerdo para revelar o conteúdo de um campo.
3. Clique com o botão direito para marcar o campo com uma flag, indicando a possível presença de uma bomba.
4. O conteúdo revelado pode ser:  
   - **Vazio** → não há bombas nos 8 campos vizinhos.  
   - **Número (1 a 8)** → indica a quantidade de bombas nos campos vizinhos.  
   - **Bomba** → encerra o jogo.
5. Para alterar o nível de dificuldade, selecione o botão "level". O tamanho do tabuleiro e a quantidade de bombas variam conforme o nível.
6. Para reiniciar a partida, selecione o botão "reset".

## Apresentação

Vídeo disponível em: 

## Outros

Para dúvidas, sugestões ou melhorias, entre em contato com os autores.
