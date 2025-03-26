# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# sife LINE - Sistema de Controle de Cateteres

## Sobre o Projeto

O sife LINE é um sistema simples e eficiente que auxilia a equipe de enfermagem no controle de cateteres. Desenvolvido como parte de um teste técnico para uma empresa de desenvolvimento de software da área de saúde, o sistema permite o gerenciamento e monitoramento de diferentes tipos de cateteres utilizados em pacientes.

## Funcionalidades Principais

- **Dashboard Resumido**: Visualização rápida do total de pacientes com cateteres e alertas para trocas pendentes.
- **Busca de Pacientes**: Campo de pesquisa para localizar rapidamente pacientes por nome, quarto ou tipo de cateter.
- **Cadastro de Novos Cateteres**: Formulário simples para registrar novos cateteres com cálculo automático da data de próxima troca.
- **Lista de Pacientes**: Tabela com todos os pacientes que possuem cateteres ativos, incluindo informações importantes como data de inserção, dias ativos e próxima troca.
- **Alertas Visuais**: Identificação clara dos pacientes que necessitam de troca de cateter em breve.

## Tipos de Cateteres Suportados

- Periférico (troca a cada 3 dias)
- Venoso Central (troca a cada 7 dias)
- PICC (troca a cada 14 dias)
- Totalmente Implantado

## Tecnologias Utilizadas

- React 19
- TypeScript
- Vite
- CSS moderno (variáveis CSS, flexbox)

## Como Executar o Projeto

1. Clone este repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Execute o projeto:
   ```
   npm run dev
   ```

## Estrutura do Projeto

- `src/App.tsx` - Componente principal da aplicação
- `src/App.css` - Estilos da aplicação
- `public/` - Arquivos estáticos (ícones, etc.)

## Próximos Passos

Este projeto implementa apenas a página inicial como solicitado no teste. Em uma versão completa, seria possível adicionar:

- Sistema de autenticação
- Registro de procedimentos realizados
- Histórico de cateteres por paciente
- Notificações para a equipe de enfermagem
- Relatórios detalhados

## Considerações sobre o Design

O design foi pensado para ser limpo, intuitivo e funcional, priorizando a facilidade de uso para a equipe de enfermagem. A interface utiliza código de cores para facilitar a identificação de cateteres que necessitam de atenção imediata.

---

Desenvolvido como parte de um teste técnico para área de saúde.
