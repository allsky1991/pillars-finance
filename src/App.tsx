import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import {
  Shield,
  Zap,
  Cpu,
  Lock,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Database,
  Layers,
  Bot,
  TrendingUp,
  Activity,
} from "lucide-react";

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-bg/80 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src="https://ais-dev-clyzq2omzjo7hnqqmhk6px-357822238141.asia-southeast1.run.app/logo.jpg"
          alt="Pillars Finance Logo"
          className="w-10 h-10 object-contain rounded-sm"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://picsum.photos/seed/pillars/100/100";
          }}
        />
        <span className="font-display font-bold text-xl tracking-tight">
          Pillars Finance
        </span>
      </div>

      <div className="hidden md:flex items-center gap-10 text-base font-semibold text-text-secondary">
        <a href="#pillars" className="hover:text-accent transition-colors">
          Pillars
        </a>
        <a href="#products" className="hover:text-accent transition-colors">
          Products
        </a>
        <a href="#risk" className="hover:text-accent transition-colors">
          Risk Engine
        </a>
        <a href="#agents" className="hover:text-accent transition-colors">
          Agentic Commerce
        </a>
      </div>

      <button className="px-5 py-2 bg-accent text-bg font-bold rounded-sm text-sm glow-primary hover:opacity-90 transition-all">
        Launch App
      </button>
    </div>
  </nav>
);

const Hero = () => {
  const [index, setIndex] = useState(0);
  const lines = [
    "Fully on-chain.",
    "Organic yield.",
    "Capital-efficient.",
    "Built-in agentic commerce",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % lines.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg z-0" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] orb-glow z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] orb-glow z-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-4xl"
      >
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-[1.1] tracking-tight">
          The Stablecoin for the
          <br />
          <span className="text-accent">Agentic Age</span>
        </h1>

        <div className="h-12 flex items-center justify-center mb-12">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl text-white font-light tracking-wide"
            >
              {lines[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-10 py-5 bg-accent text-bg font-bold rounded-sm glow-primary hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-lg">
            Launch App <ArrowRight size={20} />
          </button>
          <button className="w-full sm:w-auto px-10 py-5 border border-accent/30 text-accent font-bold rounded-sm hover:bg-accent/5 transition-all text-lg">
            Read Docs
          </button>
        </div>
      </motion.div>
    </section>
  );
};

const StatsBar = () => (
  <section className="py-12 px-6 relative z-10">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: "Target APY", value: "15–30%" },
        { label: "Collateral", value: "100% On-Chain" },
        { label: "Leverage Long/Short", value: "Zero Liquidation" },
        { label: "Agentic Payment", value: "Native x402" },
      ].map((stat, i) => (
        <div
          key={i}
          className="glass-card p-6 md:p-10 text-center flex flex-col justify-center border border-white/10 rounded-sm bg-card-bg/30 min-h-[140px]"
        >
          <div className="font-mono text-2xl md:text-3xl lg:text-4xl font-bold text-accent mb-3 tracking-tighter leading-tight">
            {stat.value}
          </div>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white font-bold">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const PillarsGrid = () => (
  <section id="pillars" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
    <div className="text-center mb-20">
      <h2 className="text-4xl font-display font-bold mb-4">Core Pillars</h2>
      <div className="w-24 h-1 bg-accent mx-auto" />
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          title: "Fully On-Chain",
          icon: <Lock className="text-accent" size={28} />,
          desc: "No custodians. No blacklists. Every position and peg is enforced by math on-chain. Fully auditable and decentralized.",
          color: "rgba(0, 194, 255, 0.05)",
        },
        {
          title: "Organic Yield",
          icon: <TrendingUp className="text-success" size={28} />,
          desc: "Yield flows from LSTs and flagship assets, not emissions. Capital-efficient architecture amplifies sustainable real yield.",
          color: "rgba(0, 230, 118, 0.05)",
        },
        {
          title: "Low Risk by Design",
          icon: <Shield className="text-secondary" size={28} />,
          desc: "Volatility is absorbed by xPi/sPi holders. Three autonomous defense layers protect the peg without human intervention.",
          color: "rgba(245, 166, 35, 0.05)",
        },
        {
          title: "Built for AI Agents",
          icon: <Bot className="text-accent" size={28} />,
          desc: "Native x402 support for gasless, sub-second payments. Idle agent capital auto-stakes to earn 15–30% APY.",
          color: "rgba(0, 194, 255, 0.05)",
        },
        {
          title: "veToken Governance",
          icon: <Cpu className="text-secondary" size={28} />,
          desc: "Lock PILL for vePILL to boost yield and vote on emissions. A self-reinforcing liquidity flywheel for the ecosystem.",
          color: "rgba(245, 166, 35, 0.05)",
        },
      ].map((pillar, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -4, borderColor: "rgba(0, 194, 255, 0.5)" }}
          className={`glass-card p-10 rounded-sm transition-all group relative overflow-hidden ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
          style={{ backgroundColor: pillar.color }}
        >
          <div className="mb-8">{pillar.icon}</div>
          <h3 className="text-2xl font-display font-bold mb-6">
            {pillar.title}
          </h3>
          <p className="text-white/80 leading-relaxed text-base">
            {pillar.desc}
          </p>
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.02] transition-colors pointer-events-none" />
        </motion.div>
      ))}
    </div>
  </section>
);

const ProductCards = () => (
  <section id="products" className="py-32 px-6 bg-card-bg/20 relative z-10">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[
          {
            name: "USDpi",
            sub: "Stablecoin",
            desc: "Always $1. Backed by LSTs and flagship assets. No custodians. Redeem anytime.",
            color: "bg-accent",
            symbol: "$",
          },
          {
            name: "sUSDpi",
            sub: "Yield Vault",
            desc: "Stake USDpi to earn 15–30% organic APY. Auto-compounded daily.",
            color: "bg-success",
            symbol: "S",
          },
          {
            name: "xPi",
            sub: "Leveraged Long",
            desc: "Leveraged long exposure to the collateral basket. Up to 4x. No liquidations.",
            color: "bg-secondary",
            symbol: "X",
          },
          {
            name: "sPi",
            sub: "Leveraged Short",
            desc: "Inverse exposure to the collateral basket. Hedge or speculate on downside. No liquidations.",
            color: "bg-alert",
            symbol: "I",
          },
        ].map((token, i) => (
          <div
            key={i}
            className="glass-card p-8 rounded-sm border-l-4 flex flex-col h-full"
            style={{
              borderLeftColor: `var(--color-${token.color.split("-")[1]})`,
            }}
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-display font-bold text-xl">{token.name}</h4>
              <div
                className={`w-10 h-10 rounded-full ${token.color} flex items-center justify-center text-bg font-bold text-sm`}
              >
                {token.symbol}
              </div>
            </div>
            <div className="text-xs uppercase tracking-[0.15em] text-accent font-bold mb-6">
              {token.sub}
            </div>
            <p className="text-white/80 text-base leading-relaxed">
              {token.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="glass-card p-10 rounded-sm border-t-2 border-accent/20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h4 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
              <Activity className="text-accent" size={24} /> Ecosystem &
              Liquidity
            </h4>
            <p className="text-white/80 text-base leading-relaxed">
              Deep liquidity on Base. Trade, lend, and loop for amplified
              yields. vePILL directs incentives where it matters.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
    <div className="text-center mb-20">
      <h2 className="text-4xl font-display font-bold mb-4">How It Works</h2>
      <div className="w-24 h-1 bg-accent mx-auto" />
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
      {[
        {
          step: "💰",
          title: "Mint & Earn",
          icon: <Database size={28} />,
          desc: "Deposit LSTs or flagship assets → Mint USDpi → Stake into sUSDpi → Earn up to 30% APY.",
        },
        {
          step: "📈",
          title: "Trade with Leverage",
          icon: <Layers size={28} />,
          desc: "Mint xPi (long) or sPi (short). Up to 4x. No liquidations. Exit anytime.",
        },
        {
          step: "🔄",
          title: "Loop & Amplify",
          icon: <Activity size={28} />,
          desc: "Bring USDpi to Morpho or Aave. Lend, borrow, loop — amplify yield beyond base sUSDpi APY.",
        },
        {
          step: "🤖",
          title: "Agent Payments + Yield",
          icon: <Bot size={28} />,
          desc: "Agents hold USDpi. Idle capital auto-stakes into sUSDpi (15–30% APY). Redeems instantly when x402 payment fires. Spend when needed. Earn while waiting.",
        },
      ].map((item, i) => (
        <div key={i} className="flex flex-col group">
          <div className="w-20 h-20 rounded-sm border border-accent/20 flex items-center justify-center mb-8 group-hover:border-accent transition-colors relative bg-card-bg">
            <div className="absolute -top-3 -right-3 text-lg bg-bg px-2 py-0.5 border border-accent/20">
              {item.step}
            </div>
            <div className="text-accent">{item.icon}</div>
          </div>
          <h4 className="font-display font-bold text-xl mb-4">{item.title}</h4>
          <p className="text-white/80 text-base leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const RiskEngine = () => (
  <section
    id="risk"
    className="py-32 px-6 bg-card-bg/30 relative z-10 overflow-hidden"
  >
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
      <div>
        <h2 className="text-4xl font-display font-bold mb-8">
          Protected by Design
        </h2>
        <p className="text-xl text-white mb-10 leading-relaxed">
          Three autonomous layers. Zero manual intervention. The peg holds by
          math.
        </p>
        <div className="space-y-8">
          {[
            {
              title: "Stage 1",
              text: "Market volatility hits xPi & sPi first — USDpi never sees it directly",
            },
            {
              title: "Stage 2",
              text: "CR 130–150%: fees auto-adjust to restore balance",
            },
            {
              title: "Stage 3",
              text: "CR < 130%: stability pool + on-chain bounties defend the peg",
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-6">
              <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0 shadow-[0_0_12px_rgba(0,194,255,1)]" />
              <div>
                <div className="text-base font-bold text-accent mb-2 uppercase tracking-widest">
                  {item.title}
                </div>
                <div className="text-lg text-white/90 leading-relaxed">
                  {item.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative aspect-square glass-card rounded-sm p-12 flex items-center justify-center border-accent/30 shadow-[0_0_60px_rgba(0,194,255,0.15)] bg-bg/40">
        <div className="absolute inset-0 orb-glow opacity-40" />

        {/* Technical Grid Overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #00C2FF 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="relative w-full h-full flex flex-col items-center justify-between">
          {/* Top Section: Incoming Volatility */}
          <div className="w-full">
            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-accent" />
              <div className="px-6 py-2 border border-accent/40 bg-accent/5 rounded-sm font-mono text-xs text-accent uppercase tracking-[0.3em] font-bold backdrop-blur-sm">
                Market Volatility
              </div>
              <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-accent/30 to-accent" />
            </div>

            <div className="grid grid-cols-2 gap-8 px-4">
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  borderColor: [
                    "rgba(245,166,35,0.3)",
                    "rgba(245,166,35,0.8)",
                    "rgba(245,166,35,0.3)",
                  ],
                  boxShadow: [
                    "0 0 20px rgba(245,166,35,0.1)",
                    "0 0 40px rgba(245,166,35,0.3)",
                    "0 0 20px rgba(245,166,35,0.1)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="px-6 py-14 border-2 border-secondary bg-secondary/5 rounded-sm text-center backdrop-blur-md relative group"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-secondary text-bg text-[10px] font-bold uppercase tracking-tighter">
                  Absorption
                </div>
                <div className="text-secondary font-black text-3xl mb-2 tracking-tighter">
                  xPi
                </div>
                <div className="text-[10px] text-secondary/80 uppercase font-bold tracking-[0.2em]">
                  Leveraged Long
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 15, 0],
                  borderColor: [
                    "rgba(255,68,68,0.3)",
                    "rgba(255,68,68,0.8)",
                    "rgba(255,68,68,0.3)",
                  ],
                  boxShadow: [
                    "0 0 20px rgba(255,68,68,0.1)",
                    "0 0 40px rgba(255,68,68,0.3)",
                    "0 0 20px rgba(255,68,68,0.1)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="px-6 py-14 border-2 border-alert bg-alert/5 rounded-sm text-center backdrop-blur-md relative"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-alert text-bg text-[10px] font-bold uppercase tracking-tighter">
                  Absorption
                </div>
                <div className="text-alert font-black text-3xl mb-2 tracking-tighter">
                  sPi
                </div>
                <div className="text-[10px] text-alert/80 uppercase font-bold tracking-[0.2em]">
                  Leveraged Short
                </div>
              </motion.div>
            </div>
          </div>

          {/* Connection Lines */}
          <div className="flex gap-20 h-20 items-center">
            <div className="w-px h-full bg-gradient-to-b from-secondary to-accent/50" />
            <div className="w-px h-full bg-gradient-to-b from-alert to-accent/50" />
          </div>

          {/* Bottom Section: Stable Peg */}
          <div className="w-full flex flex-col items-center gap-8">
            <motion.div
              animate={{
                scale: [1, 1.03, 1],
                boxShadow: [
                  "0 0 30px rgba(0,194,255,0.2)",
                  "0 0 60px rgba(0,194,255,0.5)",
                  "0 0 30px rgba(0,194,255,0.2)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="px-16 py-10 bg-accent text-bg font-black rounded-sm text-4xl tracking-tighter relative"
            >
              USDpi: $1.00
            </motion.div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const AIAgentSection = () => (
  <section id="agents" className="py-32 px-6 bg-[#0D0F1E] relative z-10">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-5xl font-display font-bold mb-8">
        The Currency of the Agentic Internet
      </h2>
      <p className="text-white/90 max-w-4xl mx-auto text-xl leading-relaxed font-light mb-20">
        Gasless. Sub-second. Earn while idle. Programmable limits. Trustless.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {[
          { label: "Gasless", icon: <Zap size={28} /> },
          { label: "Earn while Idle", icon: <TrendingUp size={28} /> },
          { label: "Sub-second", icon: <Activity size={28} /> },
          { label: "Trustless", icon: <Shield size={28} /> },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-4 group">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-bg transition-all duration-300 border border-accent/20">
              {item.icon}
            </div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-white group-hover:text-accent transition-colors">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Ecosystem = () => (
  <section className="py-32 px-6 max-w-7xl mx-auto text-center relative z-10">
    <h3 className="text-sm uppercase tracking-[0.4em] text-white font-bold mb-20">
      Ecosystem
    </h3>
    <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20">
      {[
        { name: "Aerodrome", color: "#0052FF", icon: <Zap size={32} /> },
        { name: "Morpho", color: "#00E676", icon: <Activity size={32} /> },
        { name: "Pendle", color: "#627EEA", icon: <TrendingUp size={32} /> },
        { name: "Aave", color: "#B6509E", icon: <Shield size={32} /> },
        { name: "x402 Foundation", color: "#00C2FF", icon: <Cpu size={32} /> },
      ].map((partner, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05, y: -5 }}
          className="flex items-center gap-4 px-8 py-4 glass-card rounded-full border border-white/10 hover:border-accent/30 transition-all cursor-default shadow-lg"
        >
          <div style={{ color: partner.color }}>{partner.icon}</div>
          <span
            className="font-display font-bold tracking-tight text-2xl"
            style={{ color: partner.color }}
          >
            {partner.name}
          </span>
        </motion.div>
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer className="relative z-10 bg-bg">
    {/* Final Loop Section */}
    <section className="py-32 px-6 border-t border-white/5 bg-gradient-to-b from-bg to-card-bg/20 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-12 leading-tight">
          Ready for the
          <br />
          <span className="text-accent">Agentic Age?</span>
        </h2>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="px-12 py-6 bg-accent text-bg font-black rounded-sm text-xl glow-primary hover:scale-105 transition-all flex items-center gap-4 mx-auto"
        >
          Return to Pillars <ChevronRight className="-rotate-90" />
        </button>
      </motion.div>
    </section>

    <div className="py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-8">
              <img
                src="https://picsum.photos/seed/pillars/100/100"
                alt="Pillars Finance Logo"
                className="w-10 h-10 object-contain rounded-sm"
                referrerPolicy="no-referrer"
              />
              <span className="font-display font-bold text-2xl tracking-tight">
                Pillars Finance
              </span>
            </div>
            <p className="text-white/60 text-lg leading-relaxed">
              The Stablecoin Designed for Agentic Commerce.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-20">
            <div>
              <h5 className="font-bold mb-8 text-sm uppercase tracking-[0.2em] text-white">
                Protocol
              </h5>
              <ul className="space-y-6 text-base text-white/40">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Risk Engine
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Security Audits
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Governance
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-8 text-sm uppercase tracking-[0.2em] text-white">
                Community
              </h5>
              <ul className="space-y-6 text-base text-white/40">
                <li>
                  <a
                    href="#"
                    className="hover:text-accent transition-colors flex items-center gap-2"
                  >
                    Twitter <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-accent transition-colors flex items-center gap-2"
                  >
                    Discord <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-accent transition-colors flex items-center gap-2"
                  >
                    Github <ExternalLink size={14} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 text-xs text-white/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© 2026 Pillars Finance. All rights reserved.</p>
          <div className="flex gap-12 font-medium">
            <a
              href="#"
              className="hover:text-white transition-colors uppercase tracking-widest"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors uppercase tracking-widest"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="bg-bg min-h-screen selection:bg-accent/30 selection:text-white">
      <Navbar />
      <Hero />
      <StatsBar />
      <PillarsGrid />
      <ProductCards />
      <HowItWorks />
      <RiskEngine />
      <AIAgentSection />
      <Ecosystem />
      <Footer />
    </div>
  );
}
