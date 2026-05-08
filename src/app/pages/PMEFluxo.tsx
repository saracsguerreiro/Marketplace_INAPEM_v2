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
    <div className="min-h-screen bg-gray-bg">
      <div className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-coral transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Voltar</span>
          </Link>
          <div className="flex-1">
            <h3 className="text-sm">Pedido de Financiamento</h3>
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
    <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
      <div className="inline-flex items-center gap-2 bg-coral/10 text-coral text-[10px] px-3 py-1 rounded-full mb-3">
        PASSO 1 DE 6
      </div>
      <h1 className="mb-2">Registo da <span className="text-coral">Empresa</span></h1>
      <p className="text-muted-foreground mb-8 text-sm">
        Insira os dados da sua empresa para começar o processo de candidatura.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs mb-1.5">Nome da Empresa <span className="text-coral">*</span></label>
          <input type="text" placeholder="Ex: TecnoLuanda Lda" className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm outline-none focus:border-coral transition-colors" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1.5">NIF <span className="text-coral">*</span></label>
            <input type="text" placeholder="000000000" className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm outline-none focus:border-coral transition-colors" />
          </div>
          <div>
            <label className="block text-xs mb-1.5">Telefone <span className="text-coral">*</span></label>
            <input type="tel" placeholder="+244 900 000 000" className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm outline-none focus:border-coral transition-colors" />
          </div>
        </div>
        <div>
          <label className="block text-xs mb-1.5">Email Empresarial <span className="text-coral">*</span></label>
          <input type="email" placeholder="empresa@exemplo.ao" className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm outline-none focus:border-coral transition-colors" />
        </div>
        <div>
          <label className="block text-xs mb-1.5">Morada Completa <span className="text-coral">*</span></label>
          <input type="text" placeholder="Rua, Número, Bairro, Cidade" className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm outline-none focus:border-coral transition-colors" />
        </div>
        <div>
          <label className="block text-xs mb-1.5">Setor de Atividade <span className="text-coral">*</span></label>
          <select className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm outline-none focus:border-coral transition-colors">
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

      <button onClick={onNext} className="w-full mt-6 bg-coral text-white py-4 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
        Continuar
        <ArrowRight className="w-5 h-5" />
      </button>
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

    // Upload simulation
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

  const handleFile = (file: File) => {
    if (file) startAnalysis(file.name);
  };

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
    <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
      <div className="inline-flex items-center gap-2 bg-coral/10 text-coral text-[10px] px-3 py-1 rounded-full mb-3">
        PASSO 2 DE 6
      </div>
      <div className="flex items-center gap-2 mb-2">
        <h1>Análise de <span className="text-coral">Documentos</span></h1>
        <Sparkles className="w-5 h-5 text-coral" />
      </div>
      <p className="text-muted-foreground mb-6 text-sm">
        Carregue a sua certidão comercial ou declaração fiscal. A nossa IA extrai os dados automaticamente.
      </p>

      {/* Tipos aceites */}
      <div className="flex gap-2 mb-6">
        {["Certidão Comercial", "Declaração Fiscal", "Estatutos"].map((t) => (
          <span key={t} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-muted-foreground border border-border">{t}</span>
        ))}
      </div>

      {/* Zona de upload */}
      {phase === "idle" && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-2xl p-10 text-center cursor-pointer hover:border-coral hover:bg-coral/5 transition-all group"
        >
          <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-coral/10 transition-colors">
            <Upload className="w-7 h-7 text-muted-foreground group-hover:text-coral transition-colors" />
          </div>
          <p className="text-sm font-medium mb-1">Arraste o documento ou clique para selecionar</p>
          <p className="text-xs text-muted-foreground">PDF, JPG ou PNG · máx. 10MB</p>
        </div>
      )}

      {/* Upload em progresso */}
      {phase === "uploading" && (
        <div className="border-2 border-coral/30 bg-coral/5 rounded-2xl p-8 text-center">
          <div className="w-12 h-12 bg-coral/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Upload className="w-6 h-6 text-coral animate-bounce" />
          </div>
          <p className="text-sm font-medium mb-4">A carregar <span className="text-coral">{fileName}</span>...</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-coral h-2 rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-muted-foreground">{progress}%</p>
        </div>
      )}

      {/* A analisar */}
      {phase === "analysing" && (
        <div className="border-2 border-coral/30 bg-coral/5 rounded-2xl p-8 text-center">
          <div className="w-12 h-12 bg-coral/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-coral animate-pulse" />
          </div>
          <p className="text-sm font-semibold text-coral mb-1">{analysingMessages[msgIndex]}</p>
          <p className="text-xs text-muted-foreground mb-4">{fileName}</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-coral h-2 rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-muted-foreground">{progress}%</p>
        </div>
      )}

      {/* Resultado da análise */}
      {phase === "done" && (
        <>
          {/* Banner de sucesso */}
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-green-700">Análise concluída com sucesso</p>
              <p className="text-xs text-green-600">{fields.length} campos extraídos de <span className="font-medium">{fileName}</span></p>
            </div>
            <button onClick={() => { setPhase("idle"); setFileName(null); setProgress(0); setMsgIndex(0); }} className="ml-auto p-1 hover:bg-green-100 rounded-full transition-colors">
              <X className="w-4 h-4 text-green-600" />
            </button>
          </div>

          {/* Campos extraídos */}
          <div className="space-y-3 mb-6">
            {fields.map((field, i) => (
              <div key={i} className={`border rounded-xl p-4 ${confidenceBg(field.confidence)}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-muted-foreground font-medium">{field.label}</label>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-coral" />
                    <span className={`text-xs font-semibold ${confidenceColor(field.confidence)}`}>{field.confidence}%</span>
                    {field.confidence >= 95
                      ? <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                      : <AlertCircle className="w-3.5 h-3.5 text-orange-500" />
                    }
                  </div>
                </div>
                {field.editable ? (
                  <input
                    defaultValue={field.value}
                    onChange={(e) => setFields((prev) => prev.map((f, j) => j === i ? { ...f, value: e.target.value } : f))}
                    className="w-full text-sm font-semibold bg-white border border-border rounded-lg px-3 py-2 outline-none focus:border-coral transition-colors"
                  />
                ) : (
                  <p className="text-sm font-semibold text-foreground">{field.value}</p>
                )}
                {field.editable && (
                  <p className="text-[10px] text-orange-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Verifique e corrija se necessário
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="bg-coral/5 border border-coral/20 rounded-xl p-3 mb-6 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-coral flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Os dados marcados a <span className="text-orange-500 font-medium">laranja</span> têm menor confiança — confirme antes de continuar.
            </p>
          </div>
        </>
      )}

      <div className="flex gap-3 mt-6">
        <button onClick={onBack} className="flex-1 bg-secondary text-secondary-foreground py-4 rounded-full hover:bg-secondary/80 transition-colors">
          Voltar
        </button>
        <button
          onClick={onNext}
          disabled={phase !== "done"}
          className="flex-1 bg-coral text-white py-4 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Confirmar Dados
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ── STEP 3: Pedido de Crédito ───────────────────────────────────────

function Step3({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
      <div className="inline-flex items-center gap-2 bg-coral/10 text-coral text-[10px] px-3 py-1 rounded-full mb-3">
        PASSO 3 DE 6
      </div>
      <h1 className="mb-2">Pedido de <span className="text-coral">Crédito</span></h1>
      <p className="text-muted-foreground mb-8 text-sm">Defina o valor e o prazo do financiamento que necessita.</p>

      <div className="bg-coral/5 border-2 border-coral/20 rounded-xl p-5 mb-6 flex items-center gap-4">
        <div className="text-3xl">💰</div>
        <div>
          <h4 className="text-sm text-coral mb-1">Crédito Pré-Aprovado Disponível</h4>
          <p className="text-xs text-muted-foreground">Baseado nos seus dados, estimamos até 500.000 Kz</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs mb-1.5">Valor do Crédito Solicitado <span className="text-coral">*</span></label>
          <input type="text" defaultValue="250.000 Kz" className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm outline-none focus:border-coral transition-colors" />
        </div>
        <div>
          <label className="block text-xs mb-1.5">Prazo de Pagamento <span className="text-coral">*</span></label>
          <select className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm outline-none focus:border-coral transition-colors">
            <option>12 meses</option>
            <option>18 meses</option>
            <option>24 meses</option>
            <option>36 meses</option>
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1.5">Finalidade do Crédito <span className="text-coral">*</span></label>
          <textarea placeholder="Descreva para que vai utilizar este financiamento..." rows={3} className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm outline-none focus:border-coral transition-colors resize-none" />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={onBack} className="flex-1 bg-secondary text-secondary-foreground py-4 rounded-full hover:bg-secondary/80 transition-colors">Voltar</button>
        <button onClick={onNext} className="flex-1 bg-coral text-white py-4 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          Submeter Candidatura
        </button>
      </div>
    </div>
  );
}

// ── STEP 4: Pedido em Análise ───────────────────────────────────────

function Step4({ onNext }: { onNext: () => void }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-border shadow-sm text-center">
      <div className="inline-flex items-center gap-2 bg-coral/10 text-coral text-[10px] px-3 py-1 rounded-full mb-8">
        PASSO 4 DE 6
      </div>

      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <Sparkles className="w-10 h-10 text-blue-500" />
      </div>

      <h1 className="mb-3">Pedido <span className="text-blue-500">Em Análise</span></h1>
      <p className="text-muted-foreground mb-8 text-sm max-w-sm mx-auto">
        O seu pedido foi submetido com sucesso. A equipa do INAPEM irá analisar a sua candidatura e receberá uma notificação com a decisão.
      </p>

      <div className="bg-secondary rounded-xl p-6 mb-6 text-left space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Número do Pedido:</span>
          <span className="font-bold">#FIN-2026-04821</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Valor Solicitado:</span>
          <span className="font-bold">250.000 Kz</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Prazo Estimado de Resposta:</span>
          <span className="font-bold">48 horas úteis</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Estado:</span>
          <span className="font-bold text-blue-500 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse inline-block" />
            Em análise pelo gestor
          </span>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-left">
        <p className="text-xs text-blue-700">
          📧 Receberá um email de confirmação em <strong>empresa@exemplo.ao</strong> assim que a análise estiver concluída.
        </p>
      </div>

      <button onClick={onNext} className="w-full bg-coral text-white py-4 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-semibold">
        <ShoppingBag className="w-5 h-5" />
        Explorar o Marketplace enquanto aguarda
      </button>
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
    <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
      <div className="inline-flex items-center gap-2 bg-coral/10 text-coral text-[10px] px-3 py-1 rounded-full mb-3">
        PASSO 5 DE 6
      </div>
      <h1 className="mb-2">Escolha de <span className="text-coral">Produtos</span></h1>
      <p className="text-muted-foreground mb-6 text-sm">Selecione os produtos e serviços que deseja adquirir com o financiamento.</p>

      <div className="bg-coral/5 border border-coral/20 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Crédito Disponível:</span>
          <span className="font-extrabold text-coral">250.000 Kz</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-coral" style={{ width: "62%" }} />
        </div>
        <div className="text-xs text-muted-foreground mt-1">155.000 Kz utilizados</div>
      </div>

      <div className="space-y-3 mb-6">
        {mockProducts.map((product, index) => (
          <div key={index} className="flex items-center gap-4 p-4 border border-border rounded-xl">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-2xl flex-shrink-0">💻</div>
            <div className="flex-1">
              <div className="text-sm mb-1">{product.name}</div>
              <div className="text-xs text-muted-foreground">{product.vendor}</div>
            </div>
            <div className="text-right">
              <div className="font-extrabold">{product.price.toLocaleString()} Kz</div>
              <button className="text-xs text-coral hover:underline mt-1">Remover</button>
            </div>
          </div>
        ))}
      </div>

      <Link to="/marketplace" className="block w-full bg-secondary text-secondary-foreground py-3 rounded-full text-center hover:bg-secondary/80 transition-colors mb-4">
        + Adicionar Mais Produtos
      </Link>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 bg-secondary text-secondary-foreground py-4 rounded-full hover:bg-secondary/80 transition-colors">Voltar</button>
        <button onClick={onNext} className="flex-1 bg-coral text-white py-4 rounded-full hover:opacity-90 transition-opacity">Confirmar Encomenda</button>
      </div>
    </div>
  );
}

// ── STEP 6: Confirmação ─────────────────────────────────────────────

function Step6({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
      <div className="inline-flex items-center gap-2 bg-coral/10 text-coral text-[10px] px-3 py-1 rounded-full mb-3">
        PASSO 6 DE 6
      </div>
      <h1 className="mb-2">Aprovação da <span className="text-coral">Compra</span></h1>
      <p className="text-muted-foreground mb-8 text-sm">
        Confirme a sua encomenda. O INAPEM e o banco vão aprovar e pagar directamente ao fornecedor.
      </p>

      <div className="bg-secondary rounded-xl p-6 mb-6">
        <h3 className="mb-4 text-sm">Resumo da Encomenda</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal:</span>
            <span>155.000 Kz</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Taxa de Processamento:</span>
            <span>0 Kz</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-border">
            <span className="font-extrabold">Total:</span>
            <span className="font-extrabold text-coral">155.000 Kz</span>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
        <p className="text-xs text-orange-800">
          ⚠️ Ao confirmar, o banco irá processar o pagamento directamente aos fornecedores.
          As prestações mensais serão debitadas da sua conta a partir do próximo mês.
        </p>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 bg-secondary text-secondary-foreground py-4 rounded-full hover:bg-secondary/80 transition-colors">Voltar</button>
        <button onClick={onNext} className="flex-1 bg-coral text-white py-4 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <FileText className="w-5 h-5" />
          Confirmar e Finalizar
        </button>
      </div>
    </div>
  );
}
