import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, LogOut, TrendingUp, Bell, Lock, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Painel — FinGuard" }] }),
});

function Dashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  async function logout() {
    await supabase.auth.signOut();
    toast.success("Você saiu.");
    navigate({ to: "/" });
  }

  if (loading || !user) {
    return <div className="min-h-screen grid place-items-center bg-aurora text-muted-foreground">Carregando…</div>;
  }

  return (
    <div className="min-h-screen bg-aurora">
      <header className="border-b border-border/40 backdrop-blur-xl bg-background/40">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <div className="size-8 rounded-lg bg-primary/20 grid place-items-center ring-1 ring-primary/40">
              <Shield className="size-4 text-primary" />
            </div>
            FinGuard
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-muted-foreground">{user.email}</span>
            <Button variant="outline" size="sm" onClick={logout} className="gap-2">
              <LogOut className="size-4" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">Bem-vindo de volta 👋</h1>
        <p className="mt-2 text-muted-foreground">Aqui está um resumo da sua proteção financeira.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: TrendingUp, label: "Saldo protegido", value: "R$ 24.580,00", note: "+12,4% este mês" },
            { icon: Bell, label: "Alertas ativos", value: "3", note: "2 resolvidos hoje" },
            { icon: Lock, label: "Score de segurança", value: "98/100", note: "Excelente" },
          ].map(({ icon: Icon, label, value, note }) => (
            <div key={label} className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{label}</span>
                <Icon className="size-4 text-primary" />
              </div>
              <div className="mt-3 text-3xl font-semibold">{value}</div>
              <div className="mt-1 text-xs text-primary">{note}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border/60 bg-card/50 backdrop-blur p-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-primary" />
            <h2 className="text-lg font-medium">Atividade recente</h2>
          </div>
          <ul className="mt-5 divide-y divide-border/50">
            {[
              { t: "Tentativa de login bloqueada", d: "IP desconhecido — São Paulo", time: "há 12 min" },
              { t: "Cobrança recorrente identificada", d: "Streaming — R$ 39,90", time: "há 2 h" },
              { t: "Meta de economia atingida", d: "Reserva de emergência", time: "ontem" },
            ].map((a) => (
              <li key={a.t} className="py-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{a.t}</div>
                  <div className="text-xs text-muted-foreground">{a.d}</div>
                </div>
                <span className="text-xs text-muted-foreground">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
