import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Check, ShoppingBag, FileText, Upload, Sparkles, CheckCircle, AlertCircle, X } from "lucide-react";
import { Link, useNavigate } from "react-router";

export function PMEFluxo() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const steps = [
    { num: 1, label: "Dados da Empresa" },
    { num: 2, label: "Documentos" },
    { num: 3, label: "Pedido de Crédito" },
    { num: 4, label: "Aprovação" },
    { num: 5, label: "Escolha de Produtos" },
    { num: 6, label: "Confirmação" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--ds-background-subtle)" }}>
      <div className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link to="/" className="ds-button ds-button--ghost ds-button--sm flex items-center gap-2" style={{ textDecoration: "none" }}>
            <ArrowLeft className="ds-icon ds-icon--sm" />
            <span>Voltar</span>
          </Link>
          <div className="flex-1">
            <h3 className="text-sm font-semibold" style={{ color: "var(--ds-content-default)" }}>Pedido de Financiamento</h3>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.num} className="flex-1 relative flex flex-col items-center">
                {index < steps.length - 1 && (
                  <div className={`absolute top-3 left-1/2 right-0 h-0.5 ${currentStep > step.num ? "bg-coral" : "bg-border"}`} />
                )}
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-extrabold relative z-10 transition-all ${
                  currentStep > step.num
                    ? "bg-green-600 border-green-600 text-white"
                    : currentStep === step.num
                    ? "bg-coral border-coral text-white"
                    : "bg-white border-border text-muted-foreground"
                }`}>
                  {currentStep > step.num ? <Check className="w-4 h-4" /> : step.num}
                </div>
                <div className={`text-[10px] mt-1.5 text-center ${
                  currentStep === step.num ? "text-coral font-extrabold" : currentStep > step.num ? "text-green-600 font-bold" : "text-muted-foreground"
                }`}>
                  {step.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {currentStep === 1 && <Step1 onNext={() => setCurrentStep(2)} />}
        {currentStep === 2 && <Step2 onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />}
        {currentStep === 3 && <Step3 onNext={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)} />}
        {currentStep === 4 && <Step4 onNext={() => setCurrentStep(5)} />}
        {currentStep === 5 && <Step5 onNext={() => setCurrentStep(6)} onBack={() => setCurrentStep(4)} />}
        {currentStep === 6 && <Step6 onNext={() => navigate("/empresa/dashboard")} onBack={() => setCurrentStep(5)} />}
      </div>
    </div>
  );
}

// ── STEP 1: Dados da Empresa ────────────────────────────────────────

function Step1({ onNext }: { onNext: () => void }) {
  return (
    <div className="ds-card ds-card--elevated">
      <div className="ds-card__container">
        <span className="ds-badge ds-badge--brand ds-badge--subtle" style={{ marginBottom: "0.75rem" }}>PASSO 1 DE 6</span>
        <h1 className="mb-2">Registo da <span className="text-coral">Empresa</span></h1>
        <p className="text-muted-foreground mb-8 text-sm">
          Insira os dados da sua empresa para começar o processo de candidatura.
        </p>

        <div className="space-y-4">
          <div className="ds-field">
            <div className="ds-field__label-row">
              <label className="ds-field__label">Nome da Empresa <span className="ds-field__required">*</span></label>
            </div>
            <div className="ds-input ds-input--lg ds-input--full">
              <input type="text" className="ds-input__field" placeholder="Ex: TecnoLuanda Lda" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="ds-field">
              <div className="ds-field__label-row">
                <label className="ds-field__label">NIF <span className="ds-field__required">*</span></label>
              </div>
              <div className="ds-input ds-input--lg ds-input--full">
                <input type="text" className="ds-input__field" placeholder="000000000" />
              </div>
            </div>
            <div className="ds-field">
              <div className="ds-field__label-row">
                <label className="ds-field__label">Telefone <span className="ds-field__required">*</span></label>
              </div>
              <div className="ds-input ds-input--lg ds-input--full">
                <input type="tel" className="ds-input__field" placeholder="+244 900 000 000" />
              </div>
            </div>
          </div>

          <div className="ds-field">
            <div className="ds-field__label-row">
              <label className="ds-field__label">Email Empresarial <span className="ds-field__required">*</span></label>
            </div>
            <div className="ds-input ds-input--lg ds-input--full">
              <input type="email" className="ds-input__field" placeholder="empresa@exemplo.ao" />
            </div>
          </div>

          <div className="ds-field">
            <div className="ds-field__label-row">
              <label className="ds-field__label">Morada Completa <span className="ds-field__required">*</span></label>
            </div>
            <div className="ds-input ds-input--lg ds-input--full">
              <input type="text" className="ds-input__field" placeholder="Rua, Número, Bairro, Cidade" />
            </div>
          </div>

          <div className="ds-field">
            <div className="ds-field__label-row">
              <label className="ds-field__label">Setor de Atividade <span className="ds-field__required">*</span></label>
            </div>
            <div className="ds-input ds-input--lg ds-input--full">
              <select className="ds-input__field" style={{ cursor: "pointer" }}>
                <option>Selecione...</option>
                <option>Comércio</option>
                <option>Serviços</option>
                <option>Indústria</option>
                <option>Tecnologia</option>
                <option>Construção</option>
                <option>Outro</option>
              </select>
            </div>
          </div>
        </div>

        <button onClick={onNext} className="ds-button ds-button--brand ds-button--lg ds-button--full" style={{ marginTop: "1.5rem" }}>
          <span className="ds-button__label">Continuar</span>
          <ArrowRight className="ds-icon ds-icon--sm" />
        </button>
      </div>
    </div>
  );
}

// ── STEP 2: Análise de Documentos ──────────────────────────────────

type AnalysisPhase = "idle" | "uploading" | "analysing" | "done";

interface ExtractedField {
  label: string;
  value: string;
  confidence: number;
  editable: boolean;
}

const mockExtracted: ExtractedField[] = [
  { label: "Nome da Empresa",       value: "TecnoLuanda Lda",          confidence: 98, editable: false },
  { label: "NIF",                   value: "5417823001",                confidence: 99, editable: false },
  { label: "Capital Social",        value: "2.500.000 Kz",             confidence: 94, editable: true  },
  { label: "Data de Constituição",  value: "12 de Março de 2019",      confidence: 97, editable: false },
  { label: "Volume de Negócios",    value: "18.400.000 Kz (2025)",     confidence: 89, editable: true  },
  { label: "Situação Fiscal",       value: "Regularizada",             confidence: 96, editable: false },
];

const analysingMessages = [
  "A ler documento...",
  "A identificar campos...",
  "A extrair dados fiscais...",
  "A verificar autenticidade...",
  "A concluir análise...",
];

function Step2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [phase, setPhase] = useState<AnalysisPhase>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [fields, setFields] = useState<ExtractedField[]>(mockExtracted);
  const inputRef = useRef<HTMLInputElement>(null);

  const startAnalysis = (name: string) => {
    setFileName(name);
    setPhase("uploading");
    setProgress(0);
    let p = 0;
    const uploadInterval = setInterval(() => {
      p += 20;
      setProgress(p);
      if (p >= 100) {
        clearInterval(uploadInterval);
        setPhase("analysing");
        setProgress(0);
        startAnalysing();
      }
    }, 200);
  };

  const startAnalysing = () => {
    let p = 0;
    let msg = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p % 20 === 0 && msg < analysingMessages.length - 1) {
        msg++;
        setMsgIndex(msg);
      }
      if (p >= 100) {
        clearInterval(interval);
        setPhase("done");
      }
    }, 80);
  };

  const handleFile = (file: File) => { if (file) startAnalysis(file.name); };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const confidenceColor = (c: number) =>
    c >= 95 ? "text-green-600" : c >= 85 ? "text-orange-500" : "text-red-500";

  const confidenceBg = (c: number) =>
    c >= 95 ? "bg-green-50 border-green-200" : c >= 85 ? "bg-orange-50 border-orange-200" : "bg-red-50 border-red-200";

  return (
    <div className="ds-card ds-card--elevated">
      <div className="ds-card__container">
        <span className="ds-badge ds-badge--brand ds-badge--subtle" style={{ marginBottom: "0.75rem" }}>PASSO 2 DE 6</span>
        <div className="flex items-center gap-2 mb-2">
          <h1>Análise de <span className="text-coral">Documentos</span></h1>
          <Sparkles className="ds-icon" style={{ color: "var(--ds-primary-content-default)" }} />
        </div>
        <p className="text-muted-foreground mb-6 text-sm">
          Carregue a sua certidão comercial ou declaração fiscal. A nossa IA extrai os dados automaticamente.
        </p>

        <div className="flex gap-2 mb-6">
          {["Certidão Comercial", "Declaração Fiscal", "Estatutos"].map((t) => (
            <span key={t} className="ds-badge ds-badge--neutral ds-badge--subtle">{t}</span>
          ))}
        </div>

        {phase === "idle" && (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all group"
            style={{ borderColor: "var(--ds-border-default)", background: "transparent" }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--ds-primary-background-default)"; (e.currentTarget as HTMLDivElement).style.background = "var(--ds-toned-background-default)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--ds-border-default)"; (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
          >
            <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            <div style={{ width: "3.5rem", height: "3.5rem", background: "var(--ds-neutral-background-default)", borderRadius: "var(--ds-radius-lg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
              <Upload className="ds-icon" style={{ color: "var(--ds-content-subtle)" }} />
            </div>
            <p className="text-sm font-medium mb-1" style={{ color: "var(--ds-content-default)" }}>Arraste o documento ou clique para selecionar</p>
            <p className="text-xs" style={{ color: "var(--ds-content-subtle)" }}>PDF, JPG ou PNG · máx. 10MB</p>
          </div>
        )}

        {phase === "uploading" && (
          <div className="rounded-xl p-8 text-center" style={{ background: "var(--ds-toned-background-default)", border: "2px solid var(--ds-primary-background-default)" }}>
            <div style={{ width: "3rem", height: "3rem", background: "var(--ds-toned-background-hover)", borderRadius: "var(--ds-radius-lg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
              <Upload className="ds-icon animate-bounce" style={{ color: "var(--ds-primary-content-default)" }} />
            </div>
            <p className="text-sm font-medium mb-4">A carregar <span className="text-coral">{fileName}</span>...</p>
            <div className="w-full rounded-full h-2 mb-2" style={{ background: "var(--ds-neutral-background-default)" }}>
              <div className="h-2 rounded-full transition-all duration-200" style={{ width: `${progress}%`, background: "var(--ds-primary-background-default)" }} />
            </div>
            <p className="text-xs" style={{ color: "var(--ds-content-subtle)" }}>{progress}%</p>
          </div>
        )}

        {phase === "analysing" && (
          <div className="rounded-xl p-8 text-center" style={{ background: "var(--ds-toned-background-default)", border: "2px solid var(--ds-primary-background-default)" }}>
            <div style={{ width: "3rem", height: "3rem", background: "var(--ds-toned-background-hover)", borderRadius: "var(--ds-radius-lg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
              <Sparkles className="ds-icon animate-pulse" style={{ color: "var(--ds-primary-content-default)" }} />
            </div>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--ds-primary-content-default)" }}>{analysingMessages[msgIndex]}</p>
            <p className="text-xs mb-4" style={{ color: "var(--ds-content-subtle)" }}>{fileName}</p>
            <div className="w-full rounded-full h-2 mb-2" style={{ background: "var(--ds-neutral-background-default)" }}>
              <div className="h-2 rounded-full transition-all duration-100" style={{ width: `${progress}%`, background: "var(--ds-primary-background-default)" }} />
            </div>
            <p className="text-xs" style={{ color: "var(--ds-content-subtle)" }}>{progress}%</p>
          </div>
        )}

        {phase === "done" && (
          <>
            <div className="flex items-center gap-3 rounded-xl p-4 mb-6" style={{ background: "#f0fdf4", border: "1px solid #86efac" }}>
              <CheckCircle className="ds-icon flex-shrink-0" style={{ color: "#16a34a" }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: "#15803d" }}>Análise concluída com sucesso</p>
                <p className="text-xs" style={{ color: "#16a34a" }}>{fields.length} campos extraídos de <span className="font-medium">{fileName}</span></p>
              </div>
              <button onClick={() => { setPhase("idle"); setFileName(null); setProgress(0); setMsgIndex(0); }}
                className="ml-auto ds-button ds-button--ghost ds-button--sm ds-button--icon-only">
                <X className="ds-icon ds-icon--sm" style={{ color: "#16a34a" }} />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {fields.map((field, i) => (
                <div key={i} className={`border rounded-xl p-4 ${confidenceBg(field.confidence)}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium" style={{ color: "var(--ds-content-subtle)" }}>{field.label}</label>
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" style={{ color: "var(--ds-primary-content-default)" }} />
                      <span className={`text-xs font-semibold ${confidenceColor(field.confidence)}`}>{field.confidence}%</span>
                      {field.confidence >= 95
                        ? <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                        : <AlertCircle className="w-3.5 h-3.5 text-orange-500" />
                      }
                    </div>
                  </div>
                  {field.editable ? (
                    <div className="ds-input ds-input--sm ds-input--full">
                      <input
                        defaultValue={field.value}
                        onChange={(e) => setFields((prev) => prev.map((f, j) => j === i ? { ...f, value: e.target.value } : f))}
                        className="ds-input__field"
                      />
                    </div>
                  ) : (
                    <p className="text-sm font-semibold" style={{ color: "var(--ds-content-default)" }}>{field.value}</p>
                  )}
                  {field.editable && (
                    <p className="text-[10px] text-orange-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Verifique e corrija se necessário
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="rounded-xl p-3 mb-6 flex items-center gap-2" style={{ background: "var(--ds-toned-background-default)", border: "1px solid var(--ds-toned-background-hover)" }}>
              <Sparkles className="ds-icon ds-icon--sm flex-shrink-0" style={{ color: "var(--ds-primary-content-default)" }} />
              <p className="text-xs" style={{ color: "var(--ds-content-subtle)" }}>
                Os dados marcados a <span className="text-orange-500 font-medium">laranja</span> têm menor confiança — confirme antes de continuar.
              </p>
            </div>
          </>
        )}

        <div className="flex gap-3 mt-6">
          <button onClick={onBack} className="ds-button ds-button--outline ds-button--lg" style={{ flex: 1 }}>
            <span className="ds-button__label">Voltar</span>
          </button>
          <button
            onClick={onNext}
            disabled={phase !== "done"}
            className="ds-button ds-button--brand ds-button--lg" style={{ flex: 1 }}
          >
            <span className="ds-button__label">Confirmar Dados</span>
            <ArrowRight className="ds-icon ds-icon--sm" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── STEP 3: Pedido de Crédito ───────────────────────────────────────

function Step3({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="ds-card ds-card--elevated">
      <div className="ds-card__container">
        <span className="ds-badge ds-badge--brand ds-badge--subtle" style={{ marginBottom: "0.75rem" }}>PASSO 3 DE 6</span>
        <h1 className="mb-2">Pedido de <span className="text-coral">Crédito</span></h1>
        <p className="text-muted-foreground mb-8 text-sm">Defina o valor e o prazo do financiamento que necessita.</p>

        <div className="rounded-xl p-5 mb-6 flex items-center gap-4" style={{ background: "var(--ds-toned-background-default)", border: "2px solid var(--ds-toned-background-hover)" }}>
          <div className="text-3xl">💰</div>
          <div>
            <h4 className="text-sm mb-1" style={{ color: "var(--ds-primary-content-default)" }}>Crédito Pré-Aprovado Disponível</h4>
            <p className="text-xs text-muted-foreground">Baseado nos seus dados, estimamos até 500.000 Kz</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="ds-field">
            <div className="ds-field__label-row">
              <label className="ds-field__label">Valor do Crédito Solicitado <span className="ds-field__required">*</span></label>
            </div>
            <div className="ds-input ds-input--lg ds-input--full">
              <input type="text" defaultValue="250.000 Kz" className="ds-input__field" />
            </div>
          </div>

          <div className="ds-field">
            <div className="ds-field__label-row">
              <label className="ds-field__label">Prazo de Pagamento <span className="ds-field__required">*</span></label>
            </div>
            <div className="ds-input ds-input--lg ds-input--full">
              <select className="ds-input__field" style={{ cursor: "pointer" }}>
                <option>12 meses</option>
                <option>18 meses</option>
                <option>24 meses</option>
                <option>36 meses</option>
              </select>
            </div>
          </div>

          <div className="ds-field">
            <div className="ds-field__label-row">
              <label className="ds-field__label">Finalidade do Crédito <span className="ds-field__required">*</span></label>
            </div>
            <div className="ds-input ds-input--full" style={{ height: "auto", alignItems: "flex-start", padding: "0.75rem 1rem" }}>
              <textarea placeholder="Descreva para que vai utilizar este financiamento..." rows={3} className="ds-input__field" style={{ resize: "none", marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }} />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onBack} className="ds-button ds-button--outline ds-button--lg" style={{ flex: 1 }}>
            <span className="ds-button__label">Voltar</span>
          </button>
          <button onClick={onNext} className="ds-button ds-button--brand ds-button--lg" style={{ flex: 1 }}>
            <span className="ds-button__label">Submeter Candidatura</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── STEP 4: Pedido em Análise ───────────────────────────────────────

function Step4({ onNext }: { onNext: () => void }) {
  return (
    <div className="ds-card ds-card--elevated">
      <div className="ds-card__container text-center">
        <span className="ds-badge ds-badge--brand ds-badge--subtle" style={{ marginBottom: "2rem" }}>PASSO 4 DE 6</span>

        <div style={{ width: "5rem", height: "5rem", background: "var(--ds-toned-background-default)", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
          <Sparkles style={{ width: "2.5rem", height: "2.5rem", color: "var(--ds-primary-content-default)" }} />
        </div>

        <h1 className="mb-3">Pedido <span className="text-coral">Em Análise</span></h1>
        <p className="text-muted-foreground mb-8 text-sm max-w-sm mx-auto">
          O seu pedido foi submetido com sucesso. A equipa do INAPEM irá analisar a sua candidatura e receberá uma notificação com a decisão.
        </p>

        <div className="rounded-xl p-6 mb-6 text-left space-y-3" style={{ background: "var(--ds-background-subtle)" }}>
          {[
            { label: "Número do Pedido:", value: "#FIN-2026-04821" },
            { label: "Valor Solicitado:", value: "250.000 Kz" },
            { label: "Prazo Estimado de Resposta:", value: "48 horas úteis" },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span style={{ color: "var(--ds-content-subtle)" }}>{label}</span>
              <span className="font-bold" style={{ color: "var(--ds-content-default)" }}>{value}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm">
            <span style={{ color: "var(--ds-content-subtle)" }}>Estado:</span>
            <span className="font-bold flex items-center gap-1" style={{ color: "var(--ds-primary-content-default)" }}>
              <span className="w-2 h-2 rounded-full animate-pulse inline-block" style={{ background: "var(--ds-primary-background-default)" }} />
              Em análise pelo gestor
            </span>
          </div>
        </div>

        <div className="rounded-xl p-4 mb-8 text-left" style={{ background: "var(--ds-toned-background-default)", border: "1px solid var(--ds-toned-background-hover)" }}>
          <p className="text-xs" style={{ color: "var(--ds-primary-content-default)" }}>
            📧 Receberá um email de confirmação em <strong>empresa@exemplo.ao</strong> assim que a análise estiver concluída.
          </p>
        </div>

        <button onClick={onNext} className="ds-button ds-button--brand ds-button--lg ds-button--full">
          <ShoppingBag className="ds-icon ds-icon--sm" />
          <span className="ds-button__label">Explorar o Marketplace enquanto aguarda</span>
        </button>
      </div>
    </div>
  );
}

// ── STEP 5: Escolha de Produtos ─────────────────────────────────────

function Step5({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const mockProducts = [
    { name: "Computador Dell OptiPlex", vendor: "TechSupply", price: 85000 },
    { name: "Impressora HP LaserJet",   vendor: "OfficeMax",  price: 45000 },
    { name: "Software Microsoft 365",   vendor: "Microsoft Angola", price: 25000 },
  ];

  return (
    <div className="ds-card ds-card--elevated">
      <div className="ds-card__container">
        <span className="ds-badge ds-badge--brand ds-badge--subtle" style={{ marginBottom: "0.75rem" }}>PASSO 5 DE 6</span>
        <h1 className="mb-2">Escolha de <span className="text-coral">Produtos</span></h1>
        <p className="text-muted-foreground mb-6 text-sm">Selecione os produtos e serviços que deseja adquirir com o financiamento.</p>

        <div className="rounded-xl p-4 mb-6" style={{ background: "var(--ds-toned-background-default)", border: "1px solid var(--ds-toned-background-hover)" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm" style={{ color: "var(--ds-content-subtle)" }}>Crédito Disponível:</span>
            <span className="font-extrabold text-coral">250.000 Kz</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--ds-neutral-background-default)" }}>
            <div className="h-full" style={{ width: "62%", background: "var(--ds-primary-background-default)" }} />
          </div>
          <div className="text-xs mt-1" style={{ color: "var(--ds-content-subtle)" }}>155.000 Kz utilizados</div>
        </div>

        <div className="space-y-3 mb-6">
          {mockProducts.map((product, index) => (
            <div key={index} className="ds-card ds-card--outlined" style={{ flexDirection: "row", alignItems: "center", gap: "1rem", padding: "1rem" }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "var(--ds-background-subtle)" }}>💻</div>
              <div className="flex-1">
                <div className="text-sm mb-1" style={{ color: "var(--ds-content-default)" }}>{product.name}</div>
                <div className="text-xs" style={{ color: "var(--ds-content-subtle)" }}>{product.vendor}</div>
              </div>
              <div className="text-right">
                <div className="font-extrabold" style={{ color: "var(--ds-content-default)" }}>{product.price.toLocaleString()} Kz</div>
                <button className="ds-button ds-button--ghost ds-button--sm" style={{ marginTop: "0.25rem", color: "var(--ds-feedback-error-content-default)", fontSize: "0.75rem" }}>Remover</button>
              </div>
            </div>
          ))}
        </div>

        <Link to="/marketplace" className="ds-button ds-button--outline ds-button--lg ds-button--full" style={{ marginBottom: "1rem", textDecoration: "none" }}>
          <span className="ds-button__label">+ Adicionar Mais Produtos</span>
        </Link>

        <div className="flex gap-3">
          <button onClick={onBack} className="ds-button ds-button--outline ds-button--lg" style={{ flex: 1 }}>
            <span className="ds-button__label">Voltar</span>
          </button>
          <button onClick={onNext} className="ds-button ds-button--brand ds-button--lg" style={{ flex: 1 }}>
            <span className="ds-button__label">Confirmar Encomenda</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── STEP 6: Confirmação ─────────────────────────────────────────────

function Step6({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="ds-card ds-card--elevated">
      <div className="ds-card__container">
        <span className="ds-badge ds-badge--brand ds-badge--subtle" style={{ marginBottom: "0.75rem" }}>PASSO 6 DE 6</span>
        <h1 className="mb-2">Aprovação da <span className="text-coral">Compra</span></h1>
        <p className="text-muted-foreground mb-8 text-sm">
          Confirme a sua encomenda. O INAPEM e o banco vão aprovar e pagar directamente ao fornecedor.
        </p>

        <div className="rounded-xl p-6 mb-6" style={{ background: "var(--ds-background-subtle)" }}>
          <h3 className="mb-4 text-sm font-semibold">Resumo da Encomenda</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span style={{ color: "var(--ds-content-subtle)" }}>Subtotal:</span>
              <span>155.000 Kz</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "var(--ds-content-subtle)" }}>Taxa de Processamento:</span>
              <span>0 Kz</span>
            </div>
            <div className="flex justify-between pt-3" style={{ borderTop: "1px solid var(--ds-border-default)" }}>
              <span className="font-extrabold">Total:</span>
              <span className="font-extrabold text-coral">155.000 Kz</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-4 mb-6" style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}>
          <p className="text-xs" style={{ color: "#92400e" }}>
            ⚠️ Ao confirmar, o banco irá processar o pagamento directamente aos fornecedores.
            As prestações mensais serão debitadas da sua conta a partir do próximo mês.
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={onBack} className="ds-button ds-button--outline ds-button--lg" style={{ flex: 1 }}>
            <span className="ds-button__label">Voltar</span>
          </button>
          <button onClick={onNext} className="ds-button ds-button--brand ds-button--lg" style={{ flex: 1 }}>
            <FileText className="ds-icon ds-icon--sm" />
            <span className="ds-button__label">Confirmar e Finalizar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
