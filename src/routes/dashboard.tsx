import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Shield, LogOut, TrendingUp, TrendingDown, Wallet, Plus, Trash2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Painel — FinGuard" }] }),
});

type Tx = {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  occurred_at: string;
};

const CATEGORIES = ["Alimentação", "Moradia", "Transporte", "Lazer", "Saúde", "Educação", "Salário", "Investimentos", "Outros"];

const txSchema = z.object({
  description: z.string().trim().min(1, "Descrição obrigatória").max(120),
  amount: z.number().positive("Valor deve ser maior que 0"),
  type: z.enum(["income", "expense"]),
  category: z.string().min(1).max(40),
  occurred_at: z.string().min(1),
});

function Dashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  const { data: txs = [], isLoading } = useQuery({
    enabled: !!user,
    queryKey: ["transactions", user?.id],
    queryFn: async (): Promise<Tx[]> => {
      const { data, error } = await supabase
        .from("transactions")
        .select("id,description,amount,type,category,occurred_at")
        .order("occurred_at", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((t) => ({ ...t, amount: Number(t.amount) })) as Tx[];
    },
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("transactions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transactions", user?.id] });
      toast.success("Transação removida");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const totals = useMemo(() => {
    const income = txs.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expense = txs.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [txs]);

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
      <header className="border-b border-border/40 backdrop-blur-xl bg-background/40 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <div className="size-8 rounded-lg bg-primary/20 grid place-items-center ring-1 ring-primary/40">
              <Shield className="size-4 text-primary" />
            </div>
            FinGuard
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-muted-foreground">{user.email}</span>
            <Button variant="outline" size="sm" onClick={logout} className="gap-2">
              <LogOut className="size-4" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Suas finanças</h1>
            <p className="mt-1 text-muted-foreground">Acompanhe entradas, saídas e seu saldo em tempo real.</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2"><Plus className="size-4" /> Nova transação</Button>
            </DialogTrigger>
            <TxDialog onClose={() => setOpen(false)} userId={user.id} />
          </Dialog>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard icon={Wallet} label="Saldo atual" value={totals.balance} accent={totals.balance >= 0 ? "primary" : "destructive"} />
          <SummaryCard icon={TrendingUp} label="Entradas" value={totals.income} accent="primary" />
          <SummaryCard icon={TrendingDown} label="Saídas" value={totals.expense} accent="destructive" />
        </div>

        <section className="mt-8 rounded-2xl border border-border/60 bg-card/50 backdrop-blur">
          <div className="px-6 py-4 border-b border-border/40">
            <h2 className="font-medium">Histórico</h2>
          </div>
          {isLoading ? (
            <div className="p-10 text-center text-muted-foreground"><Loader2 className="size-5 animate-spin inline mr-2" />Carregando…</div>
          ) : txs.length === 0 ? (
            <div className="p-10 text-center text-muted-foreground">
              Nenhuma transação ainda. Clique em "Nova transação" para começar.
            </div>
          ) : (
            <ul className="divide-y divide-border/40">
              {txs.map((t) => (
                <li key={t.id} className="px-6 py-4 flex items-center gap-4">
                  <div className={`size-10 rounded-lg grid place-items-center ${t.type === "income" ? "bg-primary/15 text-primary" : "bg-destructive/15 text-destructive"}`}>
                    {t.type === "income" ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{t.description}</div>
                    <div className="text-xs text-muted-foreground">{t.category} · {formatDate(t.occurred_at)}</div>
                  </div>
                  <div className={`font-semibold tabular-nums ${t.type === "income" ? "text-primary" : "text-destructive"}`}>
                    {t.type === "income" ? "+" : "−"} {formatBRL(t.amount)}
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => del.mutate(t.id)} aria-label="Excluir">
                    <Trash2 className="size-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, accent }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number; accent: "primary" | "destructive" }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur p-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <Icon className={`size-4 ${accent === "primary" ? "text-primary" : "text-destructive"}`} />
      </div>
      <div className="mt-3 text-3xl font-semibold tabular-nums">{formatBRL(value)}</div>
    </div>
  );
}

function TxDialog({ onClose, userId }: { onClose: () => void; userId: string }) {
  const qc = useQueryClient();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("Outros");
  const [occurredAt, setOccurredAt] = useState(() => new Date().toISOString().slice(0, 10));

  const save = useMutation({
    mutationFn: async () => {
      const parsed = txSchema.safeParse({
        description,
        amount: Number(amount.replace(",", ".")),
        type,
        category,
        occurred_at: occurredAt,
      });
      if (!parsed.success) throw new Error(parsed.error.issues[0].message);
      const { error } = await supabase.from("transactions").insert({
        ...parsed.data,
        user_id: userId,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transactions", userId] });
      toast.success("Transação adicionada");
      onClose();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <DialogContent className="bg-card/95 backdrop-blur-xl border-border/60">
      <DialogHeader>
        <DialogTitle>Nova transação</DialogTitle>
      </DialogHeader>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          save.mutate();
        }}
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select value={type} onValueChange={(v) => setType(v as "income" | "expense")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">Saída</SelectItem>
                <SelectItem value="income">Entrada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="desc">Descrição</Label>
          <Input id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ex: Supermercado" maxLength={120} required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="amount">Valor (R$)</Label>
            <Input id="amount" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0,00" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input id="date" type="date" value={occurredAt} onChange={(e) => setOccurredAt(e.target.value)} required />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button type="submit" disabled={save.isPending}>
            {save.isPending && <Loader2 className="size-4 mr-2 animate-spin" />}
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

function formatBRL(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function formatDate(d: string) {
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}
