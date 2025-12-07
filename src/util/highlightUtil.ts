export const highlightedText = (text: string, query: string): string => {
  if (!query) return text;
  
  // 1. Escapar caracteres especiais de Regex que possam estar na pesquisa (ex: ., *, +)
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // 2. Criar a Expressão Regular:
  // new RegExp(escapedQuery, 'gi')
  // 'g': Global (encontra todas as ocorrências)
  // 'i': Case-Insensitive (não diferencia maiúsculas/minúsculas)
  const regex = new RegExp(escapedQuery, 'gi');

  // 3. Substituir as ocorrências encontradas. 
  // O "$&" representa o texto que foi correspondido pela Regex.
  return text.replace(regex, (match) => `<mark>${match}</mark>`);
};



