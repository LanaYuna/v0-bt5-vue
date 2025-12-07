# Barra de Pesquisa

Anteriormente, a barra de pesquisa era utilizada apenas para navegar entre páginas existentes na barra de navegação.  
O objetivo da modificação foi alterar essa funcionalidade para permitir **filtrar palavras dentro da página atual** e **sublinhar** os trechos correspondentes.

## Provide/Inject
O `provide` foi definido no componente raiz `App.vue`, enviando para os componentes filhos o valor digitado na barra de pesquisa.  
Os componentes filhos usam `inject` para receber esse valor e realizar o destaque (highlight) das palavras correspondentes.

## Chave de comunicação
Foi criado o arquivo `keys.ts` contendo a chave compartilhada utilizada pelo `provide` e `inject`.  
Isso garante uma comunicação tipada, segura e consistente entre componentes no Vue 3.

## Diretivas e renderização condicional
Após receber a `query` via `inject`, o componente realiza a busca no conteúdo e sublinha o texto correspondente.  
As diretivas `v-if` e `v-else` foram utilizadas para alternar entre:

- **Template com destaque**, quando o usuário está digitando
- **Template normal**, quando a barra de pesquisa está vazia

Isso garante que o conteúdo só seja reprocessado para highlight quando necessário.

---

# Página "Sobre"

## Diretivas e refatoração
A página possuía diversos blocos `<h2>` e `<p>` duplicados manualmente.  
Para otimizar, foi utilizada a diretiva `v-for` para percorrer a lista `sections` e renderizar títulos e parágrafos de forma **dinâmica e reutilizável**.

## Estilização
O layout original mostrava os textos empilhados verticalmente.  
A estilização foi aprimorada utilizando `flex-wrap`, permitindo que as seções:

- fiquem lado a lado quando houver espaço
- quebrem linha de forma natural quando necessário

Também foi adicionada uma animação hover para melhorar a experiência visual.

---

# Página "Cursos"

Os cursos não possuíam ação ao serem clicados.  
Para resolver isso, cada item da lista `cursos` recebeu um campo `url`, e as seções passaram a redirecionar o usuário para a página correspondente ao curso ao serem clicadas.
