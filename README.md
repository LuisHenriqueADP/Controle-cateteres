# sife LINE - Sistema de Controle de Cateteres

## Sobre o Projeto

O sife LINE é um sistema simples e eficiente que auxilia a equipe de enfermagem no controle de cateteres. Desenvolvido para facilitar o gerenciamento diário de pacientes com dispositivos invasivos, o sistema permite o monitoramento de diferentes tipos de cateteres utilizados em ambiente hospitalar, contribuindo para a segurança do paciente e a organização do trabalho da equipe de saúde.

## Funcionalidades Principais

- **Dashboard Resumido**: Visualização rápida do total de pacientes com cateteres e alertas para trocas pendentes.
- **Busca de Pacientes**: Campo de pesquisa para localizar rapidamente pacientes por nome, quarto ou tipo de cateter.
- **Cadastro de Novos Cateteres**: Formulário intuitivo para registrar novos cateteres com cálculo automático da data de próxima troca.
- **Lista de Pacientes**: Tabela completa com todos os pacientes que possuem cateteres ativos, incluindo informações detalhadas como data de inserção, dias ativos e próxima troca.
- **Alertas Visuais**: Identificação clara dos pacientes que necessitam de troca de cateter em breve.
- **Validação de Datas**: Sistema inteligente para evitar erros de cadastro, garantindo coerência entre datas de inserção e remoção.

## Tipos de Cateteres Suportados
- **Periférico**:
- **Venoso Central**
- **PICC** 
- **Totalmente Implantado**

## Tecnologias Utilizadas

- React 19
- TypeScript
- Vite
- CSS moderno (variáveis CSS, flexbox, grid)
- Gerenciamento de estado com React Hooks

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
4. Acesse a aplicação em seu navegador pelo endereço: `http://localhost:5173`

## Estrutura do Projeto

- `src/components/` - Componentes React reutilizáveis
- `src/hooks/` - Custom hooks, incluindo gerenciamento de pacientes
- `src/services/` - Serviços para lógica de negócios
- `src/types/` - Definições de tipos TypeScript
- `src/App.tsx` - Componente principal da aplicação
- `src/App.css` - Estilos globais da aplicação

## Banco de Dados de Demonstração

O sistema possui um banco de dados de demonstração com 8 pacientes fictícios, permitindo testar todas as funcionalidades sem necessidade de cadastro inicial. Os dados incluem diferentes tipos de cateteres e variadas situações de troca, representando cenários reais de uso.

## Próximos Passos

Este projeto implementa a versão inicial do sistema. Em versões futuras, planeja-se adicionar:

- Sistema de autenticação para diferentes níveis de usuários
- Registro detalhado de procedimentos realizados
- Histórico completo de cateteres por paciente
- Notificações automáticas para a equipe de enfermagem
- Relatórios estatísticos e analíticos
- Integração com sistemas hospitalares (HIS)
- Versão mobile para acesso à beira do leito

## Considerações sobre o Design

O design foi desenvolvido seguindo princípios de UX/UI para ambientes de saúde, priorizando:
- Interface limpa e intuitiva para uso em ambientes de alta demanda
- Código de cores para identificação rápida de prioridades
- Acessibilidade para diferentes usuários
- Responsividade para uso em diversos dispositivos

---

sife LINE - Segurança e Eficiência no Controle de Dispositivos Invasivos
