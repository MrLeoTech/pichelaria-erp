# GestãoPro

ERP multi-área para gestão de serviços, clientes e relatórios. Adaptável a pichelaria, serralharia, eletricista, canalizador, mecânica auto, informática e serviços gerais.

## Funcionalidades

- **Dashboard** — Visão geral com estatísticas e gráficos
- **Serviços** — Registo completo com peças, mão de obra e totais automáticos
- **Clientes** — CRM com histórico e estatísticas
- **Relatórios** — Gráficos, filtros e exportações (PDF, CSV, Excel)
- **Definições** — Empresa, área de trabalho, tema, backup/restauro
- **Multi-plataforma** — Desktop, tablet e smartphone
- **PWA** — Instalável offline (Android, iOS, Windows)
- **Tema escuro** — Modo claro/escuro funcional

## Áreas de Trabalho

| Área | Prefixo | Terminologia |
|------|---------|--------------|
| Pichelaria | S- | Peças, Serviços |
| Serralharia | S- | Materiais |
| Eletricista | E- | Intervenções |
| Canalizador | C- | Materiais |
| Mecânica Auto | M- | Ordens de Serviço |
| Informática | I- | Atendimentos |
| Serviços Gerais | S- | Itens genéricos |

Configure em **Definições → Área de Trabalho**.

## Instalação

```bash
npm install
npm run dev
```

## Comandos

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run preview  # Preview da build
npm run icons    # Regenerar ícones PWA
```

## Deploy no Netlify

1. Push para GitHub
2. Build: `npm run build`
3. Publish: `dist`

## Licença

MIT
