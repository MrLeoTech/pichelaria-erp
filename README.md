# ERP Pro — Gestão Multi-Área

Sistema ERP profissional adaptável a várias áreas de trabalho: pichelaria, serralharia, eletricista, canalizador, mecânica auto, informática e serviços gerais.

## Funcionalidades

- **Dashboard** — Visão geral com estatísticas e gráficos
- **Serviços** — Registo completo com peças, mão de obra e totais automáticos
- **Clientes** — CRM com histórico e estatísticas
- **Relatórios** — Gráficos, filtros e exportações (PDF, CSV, Excel)
- **Definições** — Empresa, área de trabalho, tema, backup/restauro
- **Multi-plataforma** — Desktop, tablet e smartphone com navegação inferior
- **PWA** — Instalável offline (Android, iOS, Windows)
- **Tema escuro** — Modo claro/escuro funcional

## Áreas de Trabalho

| Área | Prefixo | Terminologia |
|------|---------|--------------|
| Pichelaria | S- | Peças, Serviços |
| Serralharia | S- | Materiais |
| Eletricista | E- | Intervenções, Materiais |
| Canalizador | C- | Materiais |
| Mecânica Auto | M- | Ordens de Serviço |
| Informática | I- | Atendimentos, Componentes |
| Serviços Gerais | S- | Itens genéricos |

Configure em **Definições → Área de Trabalho**.

## Tecnologias

- React 19 + Vite 6
- Tailwind CSS 4
- Recharts · jsPDF · PapaParse
- Context API + LocalStorage

## Instalação

```bash
cd pichelaria-erp
npm install
npm run dev
```

## Comandos

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção (gera ícones PWA)
npm run preview  # Preview da build
npm run icons    # Regenerar ícones PWA
```

## Deploy no Netlify

1. Push para GitHub
2. Build: `npm run build`
3. Publish: `dist`

## Estrutura

```
src/
  config/        # Perfis de área de trabalho
  components/    # UI reutilizável + BottomNav mobile
  context/       # Estado global unificado
  hooks/         # useIndustry, useMobile, etc.
  pages/         # Páginas principais
  services/pdf/  # Geração de PDF
  utils/         # Utilitários
public/          # PWA, service worker, ícones
```

## Licença

MIT
