# Pichelaria ERP

Sistema ERP profissional para gestão de serviços de pichelaria (serviços de serralharia, chaves, fechaduras, etc.).

## Funcionalidades

- **Dashboard** — Visão geral do negócio com estatísticas e gráficos
- **Serviços** — Registo, edição, duplicação e gestão completa de serviços
- **Clientes** — CRM com histórico de serviços e estatísticas
- **Relatórios** — Gráficos interativos, filtros e exportações (PDF, CSV, Excel)
- **Definições** — Configuração da empresa, backup/restauro, personalização
- **PWA** — Aplicação instalável em Android, iOS e Windows

## Tecnologias

- React 19 + Vite
- Tailwind CSS 4
- Recharts (gráficos)
- jsPDF (PDFs)
- PapaParse (CSV)
- Lucide React (ícones)
- Context API + LocalStorage

## Instalação

```bash
git clone <repo>
cd pichelaria-erp
npm install
```

## Comandos

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run preview  # Preview da build
```

## Deploy no Netlify

1. Fazer push para o GitHub
2. Conectar o repositório no Netlify
3. Configurar build: `npm run build`
4. Diretório de publicação: `dist`

Ou fazer drag & drop da pasta `dist` após `npm run build`.

## Estrutura

```
src/
  components/    # Componentes reutilizáveis
  context/       # Context API
  hooks/         # Custom hooks
  pages/         # Páginas principais
  services/pdf/  # Sistema de PDF
  utils/         # Utilitários
public/          # Assets estáticos
```

## Licença

MIT
