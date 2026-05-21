import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, Bell, PieChart, Sparkles, ArrowRight, CheckCircle2, BarChart3, Wallet } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "FinGuard — Gerenciamento financeiro inteligente" },
      { name: "description", content: "Organize suas finanças com o FinGuard: registre entradas e saídas, acompanhe seu saldo e tome decisões melhores com seu dinheiro." },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen bg-aurora text-foreground">
      <Nav />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/40 border-b border-border/50">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <div className="size-8 rounded-lg bg-primary/20 grid place-items-center ring-1 ring-primary/40">
            <Shield className="size-4 text-primary" />
          </div>
          <span className="tracking-tight">FinGuard</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Recursos</a>
          <a href="#how" className="hover:text-foreground transition-colors">Como funciona</a>
          <a href="#cta" className="hover:text-foreground transition-colors">Começar</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/auth">
            <Button variant="ghost" size="sm">Entrar</Button>
          </Link>
          <Link to="/auth" search={{ mode: "signup" } as never}>
            <Button size="sm">Criar conta</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-32 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <Sparkles className="size-3 text-primary" />
          Controle total das suas finanças
        </div>
        <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
          Domine seu <span className="text-gradient">dinheiro</span>
          <br />com clareza.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          O FinGuard organiza suas entradas, saídas e categorias em um só lugar.
          Veja para onde seu dinheiro vai e tome decisões com confiança.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link to="/auth" search={{ mode: "signup" } as never}>
            <Button size="lg" className="gap-2">
              Começar grátis <ArrowRight className="size-4" />
            </Button>
          </Link>
          <a href="#features">
            <Button size="lg" variant="outline">Ver recursos</Button>
          </a>
        </div>

        <div className="mt-20 mx-auto max-w-5xl">
          <div className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xl p-6 shadow-2xl shadow-primary/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Saldo atual", value: "R$ 4.580", trend: "+12,4% este mês" },
                { label: "Entradas", value: "R$ 7.200", trend: "Salário + extras" },
                { label: "Saídas", value: "R$ 2.620", trend: "36% do orçamento" },
              ].map((m) => (
                <div key={m.label} className="rounded-xl bg-background/40 border border-border/40 p-5 text-left">
                  <div className="text-xs text-muted-foreground">{m.label}</div>
                  <div className="mt-2 text-2xl font-semibold">{m.value}</div>
                  <div className="mt-1 text-xs text-primary">{m.trend}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Wallet, title: "Registro simples", desc: "Adicione entradas e saídas em segundos, com categorias inteligentes." },
    { icon: PieChart, title: "Categorias claras", desc: "Veja exatamente em que você gasta: alimentação, lazer, moradia e mais." },
    { icon: BarChart3, title: "Saldo em tempo real", desc: "Acompanhe seu saldo, receitas e despesas atualizados a cada lançamento." },
    { icon: TrendingUp, title: "Metas pessoais", desc: "Defina objetivos de economia e acompanhe seu progresso mês a mês." },
    { icon: Bell, title: "Lembretes úteis", desc: "Nunca esqueça uma conta a pagar ou um lançamento importante." },
    { icon: Shield, title: "Seus dados seguros", desc: "Criptografia forte e privacidade total — seus dados são só seus." },
  ];
  return (
    <section id="features" className="py-24 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Tudo que você precisa para dormir tranquilo.</h2>
          <p className="mt-4 text-muted-foreground">Recursos pensados para quem quer entender e proteger o próprio dinheiro sem complicação.</p>
        </div>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur p-6 hover:bg-card/70 transition-colors">
              <div className="size-10 rounded-lg bg-primary/15 ring-1 ring-primary/30 grid place-items-center">
                <Icon className="size-5 text-primary" />
              </div>
              <h3 className="mt-5 text-lg font-medium">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Crie sua conta", d: "Cadastro rápido com email e senha. Sem burocracia." },
    { n: "02", t: "Conecte suas contas", d: "Adicione contas bancárias e cartões com segurança." },
    { n: "03", t: "Relaxe", d: "O FinGuard cuida do resto, monitorando 24/7." },
  ];
  return (
    <section id="how" className="py-24 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Comece em 2 minutos.</h2>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur p-8">
              <div className="text-sm text-primary font-mono">{s.n}</div>
              <h3 className="mt-4 text-xl font-medium">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="py-24 border-t border-border/40">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Proteja seu dinheiro hoje.</h2>
        <p className="mt-4 text-muted-foreground">Sem cartão de crédito. Sem letras miúdas.</p>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          {["Grátis para começar", "Cancele quando quiser", "Suporte humano"].map((t) => (
            <li key={t} className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" /> {t}</li>
          ))}
        </ul>
        <div className="mt-10">
          <Link to="/auth" search={{ mode: "signup" } as never}>
            <Button size="lg" className="gap-2">Criar minha conta <ArrowRight className="size-4" /></Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/40 py-10">
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} FinGuard</span>
        <span>Feito com cuidado para sua segurança.</span>
      </div>
    </footer>
  );
}
