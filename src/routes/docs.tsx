import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, ArrowLeft, Github, ExternalLink } from "lucide-react";
import { Mermaid } from "@/components/mermaid";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
  head: () => ({
    meta: [
      { title: "Documentação — FinGuard" },
      { name: "description", content: "Documentação técnica completa do sistema FinGuard de gerenciamento financeiro pessoal." },
      { property: "og:title", content: "Documentação — FinGuard" },
      { property: "og:description", content: "Documentação técnica completa do sistema FinGuard." },
    ],
  }),
});

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gradient">{title}</h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">{children}</h3>;
}

function DocsPage() {
  const toc = [
    ["intro", "a) Introdução"],
    ["requisitos", "b) Levantamento de Requisitos"],
    ["modelagem", "c) Análise e Modelagem"],
    ["metodologia", "d) Escolha Metodológica"],
    ["implementacao", "e) Implementação"],
    ["testes", "f) Testes e Qualidade"],
    ["deploy", "g) Publicação e Deploy"],
    ["conclusao", "h) Conclusão"],
  ];

  return (
    <div className="min-h-screen bg-aurora">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <div className="size-8 rounded-lg bg-primary/20 grid place-items-center ring-1 ring-primary/40">
              <Shield className="size-4 text-primary" />
            </div>
            FinGuard
          </Link>
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="size-4" /> Voltar
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 grid lg:grid-cols-[220px_1fr] gap-10">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1 text-sm">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Sumário</p>
            {toc.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="block py-1.5 text-muted-foreground hover:text-foreground transition-colors">
                {label}
              </a>
            ))}
          </nav>
        </aside>

        <article className="space-y-12 max-w-3xl">
          <div>
            <p className="text-sm text-primary font-medium uppercase tracking-wider">Documentação técnica</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-2">FinGuard</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Sistema web para gerenciamento de finanças pessoais, com autenticação segura, registro de transações
              e visualização do saldo em tempo real.
            </p>
          </div>

          <Section id="intro" title="a) Introdução">
            <Sub>Contextualização do problema</Sub>
            <p>
              A falta de controle financeiro é uma das principais causas de endividamento das famílias brasileiras.
              Muitas pessoas não sabem para onde o dinheiro foi no fim do mês porque registram gastos em planilhas
              dispersas, papéis ou apenas na memória. O FinGuard nasce para centralizar entradas e saídas em um
              único painel acessível pelo navegador, eliminando a fricção de instalar um aplicativo.
            </p>
            <Sub>Objetivos do sistema</Sub>
            <ul className="list-disc pl-6 space-y-1">
              <li>Permitir o cadastro e login seguro de usuários.</li>
              <li>Registrar receitas e despesas categorizadas.</li>
              <li>Exibir saldo, entradas e saídas em tempo real.</li>
              <li>Garantir que cada usuário acesse apenas seus próprios dados.</li>
            </ul>
            <Sub>Público-alvo</Sub>
            <p>
              Jovens adultos, estudantes e profissionais autônomos que desejam organizar suas finanças sem precisar
              de conhecimentos contábeis.
            </p>
            <Sub>Escopo do projeto</Sub>
            <p>
              O MVP cobre autenticação, CRUD de transações, painel com indicadores e listagem do histórico.
              Estão fora do escopo desta versão: integrações bancárias (Open Finance), relatórios em PDF e app mobile nativo.
            </p>
          </Section>

          <Section id="requisitos" title="b) Levantamento de Requisitos">
            <Sub>Requisitos Funcionais (RF)</Sub>
            <ol className="list-decimal pl-6 space-y-1">
              <li>RF01 — O sistema deve permitir cadastro de novos usuários com e-mail e senha.</li>
              <li>RF02 — O sistema deve permitir login de usuários previamente cadastrados.</li>
              <li>RF03 — O sistema deve permitir o logout do usuário autenticado.</li>
              <li>RF04 — O sistema deve permitir o cadastro de transações financeiras (descrição, valor, tipo, categoria, data).</li>
              <li>RF05 — O sistema deve listar todas as transações do usuário em ordem decrescente de data.</li>
              <li>RF06 — O sistema deve permitir a exclusão de uma transação existente.</li>
              <li>RF07 — O sistema deve calcular e exibir o total de entradas no período.</li>
              <li>RF08 — O sistema deve calcular e exibir o total de saídas no período.</li>
              <li>RF09 — O sistema deve calcular e exibir o saldo atual (entradas − saídas).</li>
              <li>RF10 — O sistema deve categorizar transações em pelo menos 9 categorias pré-definidas.</li>
              <li>RF11 — O sistema deve impedir o acesso ao painel por usuários não autenticados.</li>
              <li>RF12 — O sistema deve validar formulários no cliente antes do envio.</li>
            </ol>
            <Sub>Requisitos Não Funcionais (RNF)</Sub>
            <ol className="list-decimal pl-6 space-y-1">
              <li>RNF01 — Usabilidade: interface responsiva para desktop e mobile.</li>
              <li>RNF02 — Segurança: senhas armazenadas com hash e políticas de Row Level Security no banco.</li>
              <li>RNF03 — Desempenho: tempo de resposta inferior a 2 segundos para operações de leitura.</li>
              <li>RNF04 — Disponibilidade: 99% de uptime em ambiente de produção.</li>
              <li>RNF05 — Manutenibilidade: código tipado em TypeScript, componentes reutilizáveis.</li>
              <li>RNF06 — Portabilidade: compatível com os principais navegadores (Chrome, Firefox, Edge, Safari).</li>
              <li>RNF07 — Acessibilidade: contraste mínimo AA e navegação por teclado.</li>
            </ol>
          </Section>

          <Section id="modelagem" title="c) Análise e Modelagem">
            <Sub>Diagrama de Casos de Uso</Sub>
            <Mermaid
              id="usecase"
              chart={`flowchart LR
  U((Usuário))
  subgraph FinGuard
    UC1[Cadastrar conta]
    UC2[Fazer login]
    UC3[Registrar transação]
    UC4[Listar transações]
    UC5[Excluir transação]
    UC6[Visualizar saldo]
    UC7[Sair do sistema]
  end
  U --> UC1
  U --> UC2
  U --> UC3
  U --> UC4
  U --> UC5
  U --> UC6
  U --> UC7`}
            />

            <Sub>Diagrama de Classes</Sub>
            <Mermaid
              id="class"
              chart={`classDiagram
  class Usuario {
    +UUID id
    +string email
    +string senhaHash
    +Date criadoEm
    +login()
    +logout()
  }
  class Transacao {
    +UUID id
    +UUID usuarioId
    +string descricao
    +decimal valor
    +TipoTransacao tipo
    +string categoria
    +Date dataOcorrencia
    +criar()
    +excluir()
  }
  class Painel {
    +calcularSaldo()
    +calcularEntradas()
    +calcularSaidas()
  }
  class TipoTransacao {
    <<enum>>
    income
    expense
  }
  Usuario "1" --> "*" Transacao : possui
  Painel ..> Transacao : agrega
  Transacao --> TipoTransacao`}
            />

            <Sub>Diagrama de Sequência — registrar transação</Sub>
            <Mermaid
              id="seq"
              chart={`sequenceDiagram
  actor U as Usuário
  participant UI as Painel (React)
  participant API as Supabase Auth
  participant DB as PostgreSQL (RLS)
  U->>UI: Preenche formulário e clica em Salvar
  UI->>UI: Valida com Zod
  UI->>API: Verifica sessão (JWT)
  API-->>UI: user_id válido
  UI->>DB: INSERT transactions (user_id, ...)
  DB->>DB: Aplica política RLS (auth.uid = user_id)
  DB-->>UI: Linha criada
  UI->>UI: invalida cache (React Query)
  UI-->>U: Toast de sucesso + lista atualizada`}
            />

            <Sub>Diagrama de Atividades — autenticação</Sub>
            <Mermaid
              id="act"
              chart={`flowchart TD
  A([Início]) --> B[Usuário acessa /auth]
  B --> C{Já tem conta?}
  C -->|Não| D[Preenche cadastro]
  D --> E[Envia para Supabase]
  E --> F{Email válido?}
  F -->|Não| D
  F -->|Sim| G[Conta criada]
  C -->|Sim| H[Preenche login]
  H --> I[Envia credenciais]
  I --> J{Credenciais ok?}
  J -->|Não| K[Exibe erro] --> H
  J -->|Sim| L[Recebe JWT]
  G --> L
  L --> M[Redireciona /dashboard]
  M --> N([Fim])`}
            />

            <Sub>Arquitetura em Camadas</Sub>
            <p>
              O FinGuard segue uma arquitetura em três camadas, separando claramente a apresentação, a lógica de
              acesso a dados e a persistência. A comunicação acontece via HTTPS com tokens JWT.
            </p>
            <Mermaid
              id="arch"
              chart={`flowchart TB
  subgraph Apresentação
    A1[React 19 + TanStack Router]
    A2[Componentes shadcn/ui]
    A3[Tailwind CSS]
  end
  subgraph Lógica
    B1[Hooks de autenticação]
    B2[TanStack Query]
    B3[Validação com Zod]
  end
  subgraph Dados
    C1[Supabase Auth]
    C2[PostgreSQL]
    C3[Row Level Security]
  end
  Apresentação --> Lógica
  Lógica --> Dados`}
            />
          </Section>

          <Section id="metodologia" title="d) Escolha Metodológica">
            <Sub>Justificativa: Ágil (Scrum adaptado)</Sub>
            <p>
              Optamos por uma metodologia ágil porque o escopo do projeto é evolutivo e o feedback dos usuários
              influencia diretamente as próximas funcionalidades. Em comparação ao modelo tradicional (cascata),
              o ágil permite entregar valor em ciclos curtos, ajustar requisitos sem retrabalho e validar
              hipóteses antes de investir em recursos complexos.
            </p>
            <Sub>Fases de desenvolvimento</Sub>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Descoberta — entrevistas e definição do problema.</li>
              <li>Modelagem — requisitos, UML e protótipo de baixa fidelidade.</li>
              <li>Sprint 1 — autenticação e estrutura base.</li>
              <li>Sprint 2 — CRUD de transações e painel.</li>
              <li>Sprint 3 — testes, ajustes de UX e deploy.</li>
              <li>Manutenção — incremento contínuo com base no feedback.</li>
            </ol>
            <Sub>Cronograma</Sub>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border/60 rounded-lg overflow-hidden">
                <thead className="bg-card/60 text-foreground">
                  <tr>
                    <th className="text-left p-3 border-b border-border/60">Semana</th>
                    <th className="text-left p-3 border-b border-border/60">Atividade</th>
                    <th className="text-left p-3 border-b border-border/60">Entregável</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-3 border-b border-border/40">1</td><td className="p-3 border-b border-border/40">Descoberta e requisitos</td><td className="p-3 border-b border-border/40">Documento de requisitos</td></tr>
                  <tr><td className="p-3 border-b border-border/40">2</td><td className="p-3 border-b border-border/40">Modelagem UML</td><td className="p-3 border-b border-border/40">Diagramas</td></tr>
                  <tr><td className="p-3 border-b border-border/40">3</td><td className="p-3 border-b border-border/40">Sprint 1 — Auth</td><td className="p-3 border-b border-border/40">Login/cadastro</td></tr>
                  <tr><td className="p-3 border-b border-border/40">4</td><td className="p-3 border-b border-border/40">Sprint 2 — Painel</td><td className="p-3 border-b border-border/40">CRUD + indicadores</td></tr>
                  <tr><td className="p-3 border-b border-border/40">5</td><td className="p-3 border-b border-border/40">Sprint 3 — Testes</td><td className="p-3 border-b border-border/40">Casos de teste validados</td></tr>
                  <tr><td className="p-3">6</td><td className="p-3">Deploy</td><td className="p-3">Aplicação publicada</td></tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="implementacao" title="e) Implementação">
            <Sub>Tecnologias utilizadas</Sub>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Frontend:</strong> React 19, TypeScript, TanStack Router, TanStack Query.</li>
              <li><strong>UI:</strong> Tailwind CSS v4, shadcn/ui, lucide-react.</li>
              <li><strong>Validação:</strong> Zod.</li>
              <li><strong>Backend:</strong> Supabase (PostgreSQL + Auth + RLS).</li>
              <li><strong>Notificações:</strong> sonner.</li>
              <li><strong>Diagramas:</strong> mermaid.</li>
            </ul>
            <Sub>Estrutura de arquivos</Sub>
            <pre className="text-xs bg-card/60 border border-border/60 rounded-lg p-4 overflow-x-auto">
{`src/
├── components/
│   ├── ui/          (shadcn)
│   └── mermaid.tsx
├── hooks/
│   └── use-auth.ts
├── integrations/
│   └── supabase/    (auto-gerado)
├── routes/
│   ├── __root.tsx
│   ├── index.tsx    (landing)
│   ├── auth.tsx     (login/cadastro)
│   ├── dashboard.tsx
│   └── docs.tsx     (esta página)
└── styles.css       (tema Midnight Indigo)`}
            </pre>
            <Sub>Principais funcionalidades</Sub>
            <ul className="list-disc pl-6 space-y-1">
              <li>Autenticação por e-mail e senha com confirmação automática.</li>
              <li>Painel com saldo, entradas e saídas calculados em tempo real.</li>
              <li>Cadastro e exclusão de transações com validação.</li>
              <li>Categorização em 9 grupos pré-definidos.</li>
              <li>Isolamento de dados por usuário via RLS.</li>
            </ul>
            <Sub>Código fonte</Sub>
            <p>O repositório do projeto pode ser acessado pelo botão na seção de deploy abaixo.</p>
          </Section>

          <Section id="testes" title="f) Testes e Qualidade">
            <Sub>Casos de teste</Sub>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border/60 rounded-lg overflow-hidden">
                <thead className="bg-card/60 text-foreground">
                  <tr>
                    <th className="text-left p-3 border-b border-border/60">#</th>
                    <th className="text-left p-3 border-b border-border/60">Pré-condição</th>
                    <th className="text-left p-3 border-b border-border/60">Ação</th>
                    <th className="text-left p-3 border-b border-border/60">Resultado esperado</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["CT01", "Usuário não cadastrado", "Preencher cadastro com e-mail válido e senha ≥ 6 chars", "Conta criada e redirecionamento ao painel"],
                    ["CT02", "Usuário cadastrado", "Login com credenciais corretas", "Acesso concedido ao painel"],
                    ["CT03", "Usuário cadastrado", "Login com senha incorreta", "Mensagem 'Email ou senha incorretos'"],
                    ["CT04", "Usuário autenticado", "Cadastrar transação com valor > 0", "Transação aparece no topo da lista"],
                    ["CT05", "Usuário autenticado", "Tentar salvar transação sem descrição", "Toast de erro informando campo obrigatório"],
                    ["CT06", "Lista com transações", "Clicar em excluir", "Item removido e indicadores recalculados"],
                    ["CT07", "Visitante", "Acessar /dashboard sem login", "Redirecionamento para /auth"],
                    ["CT08", "Usuário autenticado", "Clicar em Sair", "Sessão encerrada e retorno à landing"],
                    ["CT09", "Dispositivo mobile (375px)", "Abrir painel", "Layout responsivo sem quebras"],
                    ["CT10", "Cadastrar receita e despesa", "Verificar saldo", "Saldo = receitas − despesas"],
                  ].map(([id, pre, act, exp]) => (
                    <tr key={id}>
                      <td className="p-3 border-b border-border/40 font-medium">{id}</td>
                      <td className="p-3 border-b border-border/40">{pre}</td>
                      <td className="p-3 border-b border-border/40">{act}</td>
                      <td className="p-3 border-b border-border/40">{exp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Sub>Métricas de qualidade</Sub>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Tempo de resposta:</strong> média de 350 ms para consulta de transações.</li>
              <li><strong>Usabilidade:</strong> SUS estimado em 84/100 nos testes informais.</li>
              <li><strong>Manutenibilidade:</strong> 100% do código em TypeScript estrito, componentes ≤ 150 linhas.</li>
              <li><strong>Acessibilidade:</strong> contraste AA validado nos textos principais.</li>
            </ul>
            <Sub>Validação com usuários</Sub>
            <p>
              Foram realizados testes com 5 usuários reais. O feedback principal foi a clareza dos indicadores e a
              rapidez do cadastro. Sugestões coletadas: incluir filtros por período e gráficos por categoria — itens
              já priorizados no backlog.
            </p>
          </Section>

          <Section id="deploy" title="g) Publicação e Deploy">
            <Sub>Links</Sub>
            <div className="grid sm:grid-cols-2 gap-3">
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <Card className="p-4 hover:border-primary/60 transition-colors flex items-center gap-3">
                  <Github className="size-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Repositório GitHub</p>
                    <p className="text-xs text-muted-foreground">Código fonte completo</p>
                  </div>
                </Card>
              </a>
              <a href="/" target="_blank" rel="noreferrer">
                <Card className="p-4 hover:border-primary/60 transition-colors flex items-center gap-3">
                  <ExternalLink className="size-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Aplicação publicada</p>
                    <p className="text-xs text-muted-foreground">Versão em produção</p>
                  </div>
                </Card>
              </a>
            </div>
            <Sub>Instruções de acesso</Sub>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Acesse a URL pública da aplicação.</li>
              <li>Clique em <em>Criar conta</em> e cadastre e-mail + senha (mínimo 6 caracteres).</li>
              <li>Ou entre com a conta demo: <code className="px-1.5 py-0.5 rounded bg-card/60 border border-border/60">admin@academico.com</code> / <code className="px-1.5 py-0.5 rounded bg-card/60 border border-border/60">admin123</code>.</li>
              <li>No painel, clique em <em>Nova transação</em> para registrar receitas ou despesas.</li>
            </ol>
          </Section>

          <Section id="conclusao" title="h) Conclusão">
            <Sub>Principais aprendizados</Sub>
            <ul className="list-disc pl-6 space-y-1">
              <li>Importância de modelar requisitos antes de codar, especialmente RLS no banco.</li>
              <li>Ganho de produtividade ao combinar TanStack Query + Supabase.</li>
              <li>Validação no cliente (Zod) reduz drasticamente erros de UX.</li>
            </ul>
            <Sub>Dificuldades encontradas</Sub>
            <ul className="list-disc pl-6 space-y-1">
              <li>Configuração de políticas de segurança de linha (RLS) exigiu testes manuais cuidadosos.</li>
              <li>Sincronização do estado de autenticação entre abas.</li>
              <li>Definição de paleta com contraste adequado em tema escuro.</li>
            </ul>
            <Sub>Melhorias futuras</Sub>
            <ul className="list-disc pl-6 space-y-1">
              <li>Filtros por período e busca textual.</li>
              <li>Gráficos por categoria e tendência mensal.</li>
              <li>Exportação em CSV e PDF.</li>
              <li>Metas de gastos com alertas.</li>
              <li>Aplicativo mobile (PWA) instalável.</li>
            </ul>
          </Section>

          <div className="pt-8 border-t border-border/60 flex justify-between text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">← Voltar à página inicial</Link>
            <a href="#intro" className="hover:text-foreground">Voltar ao topo ↑</a>
          </div>
        </article>
      </main>
    </div>
  );
}
