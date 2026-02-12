
import React, { useState, useEffect, useCallback } from 'react';
import { 
  CheckCircle2, 
  ChevronDown, 
  ShieldCheck, 
  Clock, 
  Smartphone, 
  FileText, 
  LayoutDashboard, 
  Users, 
  Zap,
  CalendarDays,
  X,
  ArrowRight,
  Star,
  Medal
} from 'lucide-react';

// --- Helper Components ---

const Notification = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ name: 'Juliana', time: 'agora' });
  
  const names = ['Mariana', 'Cláudia', 'Renata', 'Patrícia', 'Fernanda', 'Amanda', 'Juliana', 'Beatriz', 'Camila', 'Larissa', 'Suelen', 'Tainá', 'Gisele', 'Bruna'];
  
  const showNext = useCallback(() => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    setData({ name: randomName, time: 'agora' });
    setVisible(true);
    
    setTimeout(() => {
      setVisible(false);
    }, 4000);
  }, [names]);

  useEffect(() => {
    // Simulação de compra de 10 em 10 segundos
    const timer = setInterval(() => {
      showNext();
    }, 10000);
    
    const initialTimer = setTimeout(() => showNext(), 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(initialTimer);
    };
  }, [showNext]);

  return (
    <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 transform ${visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
      <div className="bg-white rounded-full shadow-2xl border border-blue-100 px-6 py-3 flex items-center gap-3 w-[320px] max-w-[90vw]">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-inner">
          {data.name[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800 leading-tight">
            {data.name} acabou de assinar!
          </p>
          <p className="text-xs text-slate-500">
            Plano Professor Infantil Pro • {data.time}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left focus:outline-none"
      >
        <span className="font-semibold text-slate-800 text-lg leading-snug">{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`mt-2 text-slate-600 transition-all overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <p className="pb-2 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const CTAButton = ({ children, href = "#oferta", className = "" }: { children?: React.ReactNode, href?: string, className?: string }) => (
  <a 
    href={href}
    className={`block w-full text-center bg-green-500 hover:bg-green-600 text-white font-extrabold py-4 px-6 rounded-2xl text-xl transition-all active:scale-95 shadow-lg shadow-green-200 ${className}`}
  >
    {children}
  </a>
);

const HeaderBanner = () => {
  const [today, setToday] = useState('');

  useEffect(() => {
    const date = new Date();
    const formatted = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    setToday(formatted);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm px-4 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <p className="text-[10px] md:text-sm font-bold text-slate-800 uppercase tracking-tighter">
          Oferta válida: <span className="text-red-600 font-extrabold">{today}</span>
        </p>
      </div>
      <a 
        href="#oferta" 
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-xs md:text-sm font-extrabold transition-all flex items-center gap-2 shadow-md shadow-blue-100"
      >
        ASSINAR AGORA <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
};

const GuaranteeSeal = () => (
  <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl animate-float">
      <defs>
        <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
      </defs>
      {/* Outer Glow */}
      <circle cx="100" cy="100" r="95" fill="rgba(250, 204, 21, 0.2)" />
      {/* Badge Ribbons/Shape */}
      <path d="M100 0 L110 30 L140 30 L120 55 L130 85 L100 70 L70 85 L80 55 L60 30 L90 30 Z" fill="#facc15" transform="translate(0, 100) scale(2) translate(-100, -50)" opacity="0.3" />
      
      {/* Main Seal */}
      <circle cx="100" cy="100" r="90" fill="#facc15" stroke="#eab308" strokeWidth="2" />
      <circle cx="100" cy="100" r="82" fill="none" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
      <circle cx="100" cy="100" r="75" fill="#1e40af" />
      
      {/* Rotating Text */}
      <text fill="white" fontSize="13" fontStyle="italic" fontWeight="bold" letterSpacing="1">
        <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
          • GARANTIA TOTAL • RISCO ZERO • SATISFAÇÃO •
        </textPath>
      </text>
      
      {/* Center Content */}
      <text x="100" y="95" textAnchor="middle" fill="white" fontSize="55" fontWeight="900" style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))' }}>7</text>
      <text x="100" y="125" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" style={{ textTransform: 'uppercase' }}>Dias</text>
      <rect x="55" y="135" width="90" height="2" fill="rgba(255,255,255,0.4)" />
      <text x="100" y="152" textAnchor="middle" fill="white" fontSize="11" fontWeight="extrabold" style={{ textTransform: 'uppercase' }}>Incondicionais</text>
    </svg>
  </div>
);

// --- Main Application ---

export default function App() {
  const checkoutLink = "https://pay.lowify.com.br/checkout?product_id=GOQ4T1";

  return (
    <div className="min-h-screen selection:bg-blue-100 bg-white">
      <HeaderBanner />
      <Notification />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-soft-gradient relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-20 -left-20 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-20 w-80 h-80 bg-green-100/40 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-blue-100 text-blue-700 font-bold px-5 py-2 rounded-full text-xs uppercase tracking-widest mb-6 shadow-sm">
            App Planejamento Infantil Pro
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
            + DE <span className="text-blue-600">3.000 ATIVIDADES</span> SEMANAIS PRONTAS
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Abra o app, escolha a semana e aplique em sala com segurança. 
            Um aplicativo completo com atividades da Educação Infantil, organizadas por idade, tema e semana.
          </p>
          
          {/* UGC Video Container - Primeira Dobra */}
          <div className="relative max-w-[340px] md:max-w-[400px] mx-auto mb-12 group">
             <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-blue-400 to-green-500 rounded-[3rem] blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
             <div className="relative aspect-[9/16] w-full bg-black rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border-8 border-white">
                <iframe 
                  src="https://player.vimeo.com/video/1153737685?h=8346f0d111&autoplay=0&loop=1&title=0&byline=0&portrait=0" 
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture" 
                  allowFullScreen
                ></iframe>
             </div>
             {/* Float badge */}
             <div className="absolute -bottom-4 -right-4 md:-right-8 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-100">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                   <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Aprovado por</p>
                  <p className="text-sm font-extrabold text-slate-800 leading-none mt-1">+10k Professoras</p>
                </div>
             </div>
          </div>

          <div className="max-w-sm mx-auto">
            <CTAButton href="#oferta">
              👉 Quero acessar o app agora
            </CTAButton>
            
            {/* Imagem solicitada abaixo do botão do vídeo */}
            <div className="mt-6 flex justify-center">
              <img 
                src="https://i.ibb.co/Qvt3Ycfc/Chat-GPT-Image-12-de-fev-de-2026-17-43-10.png" 
                alt="Banner informativo" 
                className="w-full max-w-[320px] h-auto rounded-xl shadow-md"
              />
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Compra 100% segura • Acesso imediato</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-10 text-center leading-tight">
            Você se sente assim na <span className="text-red-500 underline decoration-red-200 underline-offset-4">rotina escolar?</span>
          </h2>
          <div className="grid gap-4">
            {[
              "Falta de tempo para montar atividades toda semana",
              "Medo de repetir sempre as mesmas propostas",
              "Insegurança se a atividade é adequada para a idade",
              "Planejamento bagunçado e feito em cima da hora",
              "Cansaço por levar trabalho para casa todos os dias"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors group">
                <div className="mt-1 flex-shrink-0 bg-red-100 rounded-full p-1 group-hover:scale-110 transition-transform">
                  <X className="w-4 h-4 text-red-500" />
                </div>
                <p className="text-slate-700 font-bold text-lg leading-snug">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-slate-500 font-semibold italic text-lg">
            "Se você se identificou, esse app foi feito exatamente para você."
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-12 text-center">
            O que dizem professoras que já usam
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Mariana Silva",
                role: "Professora Infantil • 3 a 4 anos",
                initials: "MS",
                text: "Antes eu passava horas procurando atividades. Agora é só abrir o app, escolher a semana e imprimir. Me sinto muito mais tranquila."
              },
              {
                name: "Cláudia Rocha",
                role: "Professora de Educação Infantil",
                initials: "CR",
                text: "O que eu mais amo é a organização por temas e idades. Facilita demais o planejamento e as crianças amam as atividades."
              },
              {
                name: "Renata Mendes",
                role: "Coordenadora Pedagógica",
                initials: "RM",
                text: "Esse app salvou minha rotina. Hoje consigo planejar o mês inteiro em poucos minutos sem estresse."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative group hover:shadow-xl transition-all">
                <div className="absolute -top-4 -right-4 bg-yellow-400 p-2 rounded-xl text-white">
                  <Star className="w-4 h-4 fill-white" />
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-extrabold text-lg">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base leading-tight">{item.name}</h4>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{item.role}</p>
                  </div>
                </div>
                <p className="text-slate-600 text-base italic leading-relaxed">“{item.text}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inside the App */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Tudo em um só lugar</h2>
          <p className="text-slate-500 text-lg mb-16 font-medium">Materiais organizados por semana, idade e tema, prontos para uso.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: FileText, text: "Atividades semanais prontas" },
              { icon: Medal, text: "Coordenação motora" },
              { icon: Smartphone, text: "Pintura, colagem e recorte" },
              { icon: LayoutDashboard, text: "Letras e números" },
              { icon: Users, text: "Atividades lúdicas" },
              { icon: CalendarDays, text: "Datas comemorativas" },
              { icon: Clock, text: "Rotina escolar" },
              { icon: CheckCircle2, text: "Planejamento completo" },
              { icon: ShieldCheck, text: "Checklists pedagógicos" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center p-8 bg-blue-50/40 rounded-[2rem] border border-blue-50 hover:bg-blue-50 transition-colors group">
                <item.icon className="w-10 h-10 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                <span className="text-slate-700 font-extrabold text-sm leading-tight">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Updates Hook */}
      <section className="py-24 px-6 bg-blue-600 text-white rounded-[3rem] mx-4 my-12 overflow-hidden relative shadow-2xl shadow-blue-200">
        <div className="absolute top-0 right-0 p-12 opacity-5">
           <Zap className="w-96 h-96 rotate-12" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8">Toda semana novos materiais!</h2>
          <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            No nosso app você nunca fica sem atividade. Toda semana liberamos novas propostas para facilitar sua rotina.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {["Novas atividades lúdicas", "Temas atualizados", "Planejamentos mensais"].map((text, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full flex items-center gap-3 border border-white/20">
                <CheckCircle2 className="w-5 h-5 text-blue-200" />
                <span className="font-bold text-base">{text}</span>
              </div>
            ))}
          </div>
          <div className="max-w-sm mx-auto">
            <CTAButton href="#oferta" className="bg-white !text-blue-600 hover:bg-blue-50">
              QUERO RECEBER TUDO AGORA
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Pricing Table - ID OFERTA */}
      <section id="oferta" className="py-24 px-6 bg-slate-50 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 text-center">Escolha o seu plano</h2>
          <p className="text-center text-slate-500 mb-20 text-lg font-medium">Acesso imediato e vitalício ao seu novo planejamento.</p>
          
          <div className="grid md:grid-cols-2 gap-10 items-stretch max-w-4xl mx-auto">
            
            {/* Basic Plan */}
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl flex flex-col relative transition-all hover:translate-y-[-8px]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                   <div className="w-5 h-5 bg-blue-600 rotate-45"></div>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">Plano Básico</h3>
              </div>
              
              <div className="mb-10">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">POR APENAS:</p>
                <div className="flex items-start">
                  <span className="text-2xl font-bold text-slate-900 mt-2 mr-1">R$</span>
                  <span className="text-8xl font-black text-slate-900 leading-none tracking-tighter">17,90</span>
                  <div className="self-end mb-2 ml-3">
                    <span className="block text-slate-400 text-sm font-bold uppercase">Pagamento</span>
                    <span className="block text-slate-400 text-sm font-bold uppercase">Único</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-5 mb-12 flex-grow">
                {[
                  "Acesso ao app",
                  "Atividades essenciais",
                  "Atualizações semanais básicas",
                  "Acesso vitalício"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                       <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-slate-700 font-bold text-base leading-tight">✓ {item}</span>
                  </li>
                ))}
              </ul>
              
              <a href={checkoutLink} className="block w-full text-center bg-slate-50 hover:bg-slate-100 text-slate-900 font-extrabold py-5 rounded-2xl transition-all border-2 border-slate-200 text-lg">
                👉 Escolher Básico
              </a>
            </div>

            {/* Pro Plan */}
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border-[6px] border-blue-600 shadow-2xl flex flex-col relative transition-all hover:translate-y-[-8px]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-10 py-3 rounded-full text-sm font-black uppercase tracking-[0.2em] shadow-xl whitespace-nowrap z-20">
                MAIS ESCOLHIDO
              </div>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center">
                   <Star className="w-7 h-7 text-yellow-500 fill-yellow-500" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">Plano Professor Pro</h3>
              </div>

              <div className="mb-10">
                <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-2">POR APENAS:</p>
                <div className="flex items-start">
                  <span className="text-2xl font-bold text-slate-900 mt-2 mr-1">R$</span>
                  <span className="text-8xl font-black text-slate-900 leading-none tracking-tighter">27,90</span>
                  <div className="self-end mb-2 ml-3">
                    <span className="block text-slate-400 text-sm font-bold uppercase">Pagamento</span>
                    <span className="block text-slate-400 text-sm font-bold uppercase">Único</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-5 mb-12 flex-grow">
                {[
                  "Tudo do plano Básico",
                  "Atividades completas por idade",
                  "Planejamento mensal e anual",
                  "Materiais extras temáticos",
                  "Comunidade exclusiva"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                       <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                    <span className="text-slate-900 font-bold text-base leading-tight">✓ {item}</span>
                  </li>
                ))}
              </ul>
              
              <a href={checkoutLink} className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-2xl text-xl transition-all active:scale-95 shadow-2xl shadow-blue-200">
                👉 Assinar Pro Agora
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 bg-slate-50 p-10 md:p-16 rounded-[4rem] border border-slate-100 shadow-sm">
          <div className="shrink-0 scale-110">
             <GuaranteeSeal />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Garantia Risco Zero</h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8 font-medium">
              A nossa confiança no método é tão grande que oferecemos 7 dias de garantia. Se não gostar, devolvemos seu dinheiro imediatamente. Sem burocracia.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
              <div className="flex items-center gap-2 text-slate-800 font-black uppercase text-xs tracking-widest">
                <ShieldCheck className="w-6 h-6 text-green-500" />
                <span>Compra Protegida</span>
              </div>
              <a href="#oferta" className="text-blue-600 font-extrabold underline decoration-blue-200 underline-offset-8 hover:decoration-blue-400 transition-all">Começar teste grátis de 7 dias</a>
            </div>
          </div>
        </div>
      </section>

      {/* Recap Section */}
      <section className="py-24 px-6 bg-slate-900 text-white rounded-t-[4rem]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-16 text-center leading-tight">O que você recebe <span className="text-blue-400">ao entrar hoje</span></h2>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {[
              "Acesso vitalício ao app",
              "Atividades prontas para imprimir",
              "Organização por semana e idade",
              "Atualizações semanais inclusas",
              "Materiais de alfabetização",
              "Suporte especializado"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group">
                <div className="bg-blue-500/20 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 group-hover:text-white" />
                </div>
                <span className="font-bold text-lg">{item}</span>
              </div>
            ))}
          </div>
          <div className="max-w-md mx-auto">
            <CTAButton href="#oferta" className="!py-6 text-2xl !bg-green-500 hover:!bg-green-600">
               SIM! QUERO TUDO ISSO
            </CTAButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-12 text-center">Tire suas dúvidas</h2>
          <div className="space-y-2">
            <FAQItem 
              question="1) É indicado para qual idade?" 
              answer="O app possui atividades completas para toda a Educação Infantil (Berçário, Maternal e Pré-Escola)." 
            />
            <FAQItem 
              question="2) Posso imprimir quantas vezes quiser?" 
              answer="Sim! O material é seu para sempre e você pode imprimir quantas vezes forem necessárias para suas turmas." 
            />
            <FAQItem 
              question="3) O pagamento é mensalidade?" 
              answer="Não. O pagamento é único. Você paga uma vez e tem acesso vitalício e a todas as atualizações futuras." 
            />
            <FAQItem 
              question="4) Como recebo o acesso?" 
              answer="Imediatamente após a confirmação do pagamento você receberá um e-mail com seus dados de acesso ao aplicativo." 
            />
            <FAQItem 
              question="5) Tenho suporte se precisar?" 
              answer="Sim, temos uma equipe de suporte pronta para te ajudar via WhatsApp e E-mail." 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-blue-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-lg shadow-blue-100">
            <LayoutDashboard className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-6 leading-tight">
            Pare de levar trabalho para casa.
          </h2>
          <p className="text-xl text-slate-500 mb-12 leading-relaxed font-bold uppercase tracking-widest text-sm">
            Retome seu tempo e sua paz.
          </p>
          <div className="max-w-sm mx-auto mb-16">
            <CTAButton href="#oferta">
              👉 ASSINAR AGORA COM DESCONTO
            </CTAButton>
          </div>
          <div className="pt-12 border-t border-slate-200 text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-loose">
            &copy; 2024 App Planejamento Infantil Pro • Todos os direitos reservados.<br/>
            Este site não faz parte do Facebook ou Google. Além disso, não é endossado por eles de qualquer maneira.
          </div>
        </div>
      </footer>
    </div>
  );
}
