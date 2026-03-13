/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  CircleDollarSign, 
  TrendingUp, 
  Layers, 
  Coins, 
  Trophy, 
  Lock, 
  BarChart3, 
  ChevronDown, 
  Plus, 
  ArrowDown, 
  ExternalLink,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Search,
  CheckCircle2,
  Leaf
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

type Page = 'Mint' | 'Trade' | 'Stake' | 'Earn' | 'XP' | 'vePILL' | 'Dashboard';

// --- Constants ---

const TOKENS = [
  { symbol: 'xETH', name: 'Wrapped Ether', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', address: '0x7ceB...f172', verified: true, score: 100 },
  { symbol: 'USDC', name: 'USD Coin', icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png', address: '0x2791...e599', verified: true, score: 100 },
  { symbol: 'USDT', name: 'Tether USD', icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png', address: '0xc213...2d5d', verified: true, score: 100 },
  { symbol: 'USDpi', name: 'Pillars USD', icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png', address: '0xPill...USDp', verified: true, score: 100 },
];

// --- Components ---

const TokenSelectorModal = ({ 
  isOpen, 
  onClose, 
  onSelect, 
  selectedTokenSymbol 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  onSelect: (token: typeof TOKENS[0]) => void,
  selectedTokenSymbol: string
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTokens = TOKENS.filter(t => 
    t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[440px] bg-[#0D1117] border border-[#1F2937] rounded-2xl z-[70] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Search Header */}
            <div className="p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="text"
                  placeholder='Search any token. Include " " for exact match.'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0A0C12] border border-[#1F2937] rounded-xl py-3 pl-10 pr-12 text-sm outline-none focus:border-jupiter-green transition-colors"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#1F2937] text-[10px] font-bold px-1.5 py-0.5 rounded text-text-secondary">
                  Esc
                </div>
              </div>

              {/* Quick Select */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {TOKENS.map((t) => (
                  <button 
                    key={t.symbol}
                    onClick={() => {
                      onSelect(t);
                      onClose();
                    }}
                    className={`flex items-center gap-2 bg-[#131722] border rounded-full px-3 py-1.5 hover:bg-[#1F2937] transition-colors shrink-0 ${selectedTokenSymbol === t.symbol ? 'border-jupiter-green' : 'border-[#1F2937]'}`}
                  >
                    <img src={t.icon} alt={t.symbol} className="w-5 h-5 rounded-full" referrerPolicy="no-referrer" />
                    <span className="text-xs font-bold">{t.symbol}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Token List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {filteredTokens.map((t) => (
                <button
                  key={t.symbol}
                  onClick={() => {
                    onSelect(t);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-4 p-3 rounded-xl transition-colors hover:bg-white/5 group ${selectedTokenSymbol === t.symbol ? 'bg-white/5' : ''}`}
                >
                  <div className="relative">
                    <img src={t.icon} alt={t.symbol} className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-text-primary">{t.symbol}</span>
                      {t.verified && <CheckCircle2 size={14} className="text-jupiter-green" />}
                      <div className="flex items-center gap-0.5 text-[10px] text-jupiter-green font-bold">
                        <Leaf size={10} />
                        {t.score}
                      </div>
                    </div>
                    <div className="text-[11px] text-text-secondary flex items-center gap-1">
                      {t.name} • <span className="mono">{t.address}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Topbar = ({ currentPage, setCurrentPage }: { currentPage: Page, setCurrentPage: (p: Page) => void }) => {
  const navItems: Page[] = ['Mint', 'Trade', 'Stake', 'Earn', 'XP', 'vePILL'];
  
  return (
    <header className="h-[64px] border-b border-border-default bg-bg-page sticky top-0 z-50 px-6 flex items-center justify-between backdrop-blur-md bg-opacity-80">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('Dashboard')}>
          <div className="w-8 h-8 bg-jupiter-green rounded-lg flex items-center justify-center">
            <Layers className="text-bg-page w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">Pillars <span className="text-jupiter-green">Finance</span></span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setCurrentPage(item)}
              className={`relative h-[64px] text-sm font-bold transition-colors ${
                currentPage === item ? 'text-jupiter-green' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {item}
              {currentPage === item && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-jupiter-green"
                />
              )}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage('Dashboard')}
            className={`text-sm font-bold transition-colors ${currentPage === 'Dashboard' ? 'text-jupiter-green' : 'text-text-secondary hover:text-text-primary'}`}
          >
            Dashboard
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-bg-card border border-border-default rounded-lg px-3 py-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
          <div className="w-2 h-2 rounded-full bg-jupiter-green shadow-[0_0_8px_rgba(199,242,132,0.5)]" />
          Base
          <ChevronDown size={14} className="text-text-secondary" />
        </div>
        <button className="bg-jupiter-green text-bg-page font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(199,242,132,0.2)]">
          <Wallet size={16} />
          Connect Wallet
        </button>
      </div>
    </header>
  );
};

const TokenInput = ({ 
  label, 
  token, 
  balance, 
  value, 
  onChange, 
  showMax = true,
  estimated = false,
  onTokenSelect
}: { 
  label?: string, 
  token: string, 
  balance?: string, 
  value: string, 
  onChange?: (v: string) => void,
  showMax?: boolean,
  estimated?: boolean,
  onTokenSelect?: () => void
}) => {
  const tokenInfo = TOKENS.find(t => t.symbol === token) || { icon: '', symbol: token };

  return (
    <div className="space-y-1">
      {label && <div className="label-sm ml-1">{label}</div>}
      <div className="bg-bg-input border border-border-default rounded-2xl p-4 flex flex-col transition-all focus-within:border-jupiter-green focus-within:ring-4 focus-within:ring-jupiter-green/5">
        <div className="flex items-center justify-between mb-1">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-1 rounded-lg transition-colors"
            onClick={onTokenSelect}
          >
            {tokenInfo.icon ? (
              <img src={tokenInfo.icon} alt={token} className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-6 h-6 bg-accent-gold/20 rounded-full flex items-center justify-center text-[10px] font-bold text-accent-gold">
                {token[0]}
              </div>
            )}
            <span className="font-bold text-sm">{token}</span>
            <ChevronDown size={14} className="text-text-secondary" />
          </div>
          <input 
            type="text" 
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-right mono text-lg font-bold placeholder:text-text-muted"
            placeholder="0.00"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="text-[10px] text-text-secondary font-medium">
            {estimated ? `≈ $${value || '0.00'}` : balance ? `Balance: ${balance}` : ''}
          </div>
          {showMax && !estimated && (
            <button className="text-[9px] font-bold text-jupiter-green hover:underline transition-all">
              MAX
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, status }: { label: string, value: string, status?: 'healthy' | 'warning' | 'danger' }) => {
  const statusColor = {
    healthy: 'text-long-green',
    warning: 'text-warning-orange',
    danger: 'text-short-red'
  };

  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-[13px] text-text-secondary">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-[13px] mono text-text-primary">{value}</span>
        {status && (
          <div className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider ${statusColor[status]}`}>
            <div className={`w-1.5 h-1.5 rounded-full bg-current`} />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Page Components ---

const MintPage = () => {
  const [tab, setTab] = useState<'Mint' | 'Burn'>('Mint');
  const [selectedToken, setSelectedToken] = useState(TOKENS[1]); // Default to USDC
  const [isTokenSelectorOpen, setIsTokenSelectorOpen] = useState(false);
  
  return (
    <div className="max-w-[480px] mx-auto py-12 space-y-6 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-bg-card border border-border-default rounded-[32px] p-6 shadow-[0_0_40px_rgba(0,0,0,0.2)]"
      >
        <div className="flex justify-center mb-6">
          <div className="flex bg-bg-input p-1 rounded-2xl border border-border-default w-full max-w-[240px]">
            {(['Mint', 'Burn'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  tab === t 
                    ? t === 'Mint' 
                      ? 'bg-jupiter-green text-bg-page shadow-lg' 
                      : 'bg-short-red text-bg-page shadow-lg'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <TokenInput 
            token={tab === 'Mint' ? selectedToken.symbol : "USDpi"} 
            balance={tab === 'Mint' ? "2.45" : "1,200.00"} 
            value="1.500000" 
            onTokenSelect={tab === 'Mint' ? () => setIsTokenSelectorOpen(true) : undefined}
          />
          
          <div className="flex justify-center -my-7 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-bg-card border border-[#1F2937] flex items-center justify-center text-jupiter-green shadow-xl hover:scale-110 transition-transform cursor-pointer">
              <ArrowDown size={20} />
            </div>
          </div>

          <TokenInput 
            token={tab === 'Mint' ? "USDpi" : selectedToken.symbol} 
            value="4,821.00" 
            estimated={tab === 'Mint'}
            showMax={false}
            onTokenSelect={tab === 'Burn' ? () => setIsTokenSelectorOpen(true) : undefined}
          />

          <div className="pt-6 space-y-2 border-t border-border-default mt-4">
            <InfoRow label="Collateral Ratio" value="187%" status="healthy" />
            <InfoRow label="Mint Fee" value="0.20%" />
            <InfoRow label="Min CR after mint" value="150%" />
            <InfoRow label={`Oracle Price (${selectedToken.symbol})`} value="$3,214.00" />
          </div>

          <button className={`w-full h-[60px] rounded-2xl font-bold text-lg transition-all mt-6 shadow-lg ${
            tab === 'Mint' 
              ? 'bg-jupiter-green text-bg-page hover:shadow-[0_0_25px_rgba(199,242,132,0.4)]' 
              : 'bg-short-red text-bg-page hover:shadow-[0_0_25px_rgba(240,78,94,0.4)]'
          }`}>
            {tab === 'Mint' ? 'MINT' : 'BURN'}
          </button>
        </div>
      </motion.div>

      <TokenSelectorModal 
        isOpen={isTokenSelectorOpen}
        onClose={() => setIsTokenSelectorOpen(false)}
        onSelect={setSelectedToken}
        selectedTokenSymbol={selectedToken.symbol}
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="action-card"
      >
        <h3 className="label-sm mb-4">Protocol Stats</h3>
        <div className="grid grid-cols-2 gap-y-4">
          <div>
            <div className="text-[11px] text-text-secondary uppercase tracking-wider mb-1">TVL</div>
            <div className="mono text-lg">$2,450,000</div>
          </div>
          <div>
            <div className="text-[11px] text-text-secondary uppercase tracking-wider mb-1">USDpi Supply</div>
            <div className="mono text-lg">1,310,000</div>
          </div>
          <div>
            <div className="text-[11px] text-text-secondary uppercase tracking-wider mb-1">CR</div>
            <div className="flex items-center gap-2">
              <span className="mono text-lg">187%</span>
              <div className="badge-healthy">Healthy</div>
            </div>
          </div>
          <div>
            <div className="text-[11px] text-text-secondary uppercase tracking-wider mb-1">sUSDpi APY</div>
            <div className="mono text-lg text-jupiter-green">21.4%</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const TradePage = ({ ethPrice }: { ethPrice: number }) => {
  const [tab, setTab] = useState<'Long' | 'Short'>('Long');
  const [orderType, setOrderType] = useState<'Market' | 'Limit'>('Market');
  const [tradeTab, setTradeTab] = useState<'Positions' | 'History'>('Positions');
  const [leverage, setLeverage] = useState(1.1);
  const [payAmount, setPayAmount] = useState('500.00');
  const [selectedToken, setSelectedToken] = useState(TOKENS[1]); // Default to USDC
  const [isTokenSelectorOpen, setIsTokenSelectorOpen] = useState(false);
  
  const xPiPrice = ethPrice / 31.4;
  const sPiPrice = 0.91;

  const currentPrice = tab === 'Long' ? xPiPrice : sPiPrice;
  const coinAmount = (parseFloat(payAmount) * leverage / currentPrice).toFixed(2);

  // Generate more realistic candlestick data
  const mockCandles = useMemo(() => {
    const base = tab === 'Long' ? xPiPrice : sPiPrice;
    const data = [];
    let curr = base * 0.95;
    for (let i = 0; i < 40; i++) {
      const open = curr;
      const close = curr + (Math.random() - 0.45) * (base * 0.04);
      const high = Math.max(open, close) + Math.random() * (base * 0.02);
      const low = Math.min(open, close) - Math.random() * (base * 0.02);
      data.push({ o: open, h: high, l: low, c: close, type: close >= open ? 'up' : 'down' });
      curr = close;
    }
    return data;
  }, [tab, xPiPrice, sPiPrice]);

  return (
    <div className="max-w-[1600px] mx-auto py-4 px-4 lg:px-8">
      {/* Market Header */}
      <div className="flex flex-wrap items-center gap-6 mb-4 bg-bg-card/50 p-4 rounded-2xl border border-border-default/50">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-bg-page ${tab === 'Long' ? 'bg-long-green' : 'bg-short-red'}`}>
            {tab === 'Long' ? 'x' : 's'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base">{tab === 'Long' ? 'xPi / USDpi' : 'sPi / USDpi'}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${tab === 'Long' ? 'bg-long-green/10 text-long-green' : 'bg-short-red/10 text-short-red'}`}>
                {tab === 'Long' ? 'LONG' : 'SHORT'}
              </span>
            </div>
            <div className="text-[10px] text-text-secondary">Pillars Perpetual</div>
          </div>
        </div>

        <div className="h-8 w-[1px] bg-border-default hidden md:block" />

        <div className="flex flex-wrap gap-8">
          <div>
            <div className="text-[10px] text-text-secondary uppercase font-bold tracking-wider mb-0.5">Price</div>
            <div className={`mono text-sm font-bold ${tab === 'Long' ? 'text-long-green' : 'text-short-red'}`}>
              ${(tab === 'Long' ? xPiPrice : sPiPrice).toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-text-secondary uppercase font-bold tracking-wider mb-0.5">24h Change</div>
            <div className="mono text-sm font-bold text-long-green">+3.12%</div>
          </div>
          <div>
            <div className="text-[10px] text-text-secondary uppercase font-bold tracking-wider mb-0.5">Index Price</div>
            <div className="mono text-sm font-bold text-text-primary">
              ${ethPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <div className="hidden xl:block">
            <div className="text-[10px] text-text-secondary uppercase font-bold tracking-wider mb-0.5">24h Volume</div>
            <div className="mono text-sm font-bold">$1.24M</div>
          </div>
          <div className="hidden xl:block">
            <div className="text-[10px] text-text-secondary uppercase font-bold tracking-wider mb-0.5">Open Interest</div>
            <div className="mono text-sm font-bold">$4.82M</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* Left: Chart & Tabs */}
        <div className="flex-1 space-y-4 w-full min-w-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-bg-card border border-border-default rounded-[32px] h-[540px] flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-border-default flex items-center justify-between bg-bg-input/30">
              <div className="flex gap-1">
                {['1m', '5m', '15m', '1h', '4h', '1d'].map(t => (
                  <button key={t} className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${t === '1h' ? 'bg-jupiter-green text-bg-page' : 'text-text-secondary hover:text-text-primary hover:bg-white/5'}`}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-text-secondary">
                  <div className="w-2 h-2 rounded-full bg-long-green" />
                  Mainnet
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative bg-[#010409] p-4 flex flex-col">
              <div className="flex-1 relative">
                {/* Grid */}
                <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 pointer-events-none opacity-20">
                  {[...Array(72)].map((_, i) => (
                    <div key={i} className="border-[0.5px] border-white/20" />
                  ))}
                </div>
                
                {/* Candlesticks */}
                <div className="absolute inset-0 flex items-end justify-around px-2 pb-10">
                  {mockCandles.map((c, i) => {
                    const range = Math.max(...mockCandles.map(x => x.h)) - Math.min(...mockCandles.map(x => x.l));
                    const min = Math.min(...mockCandles.map(x => x.l));
                    const scale = (val: number) => ((val - min) / range) * 80 + 10;

                    return (
                      <div key={i} className="flex flex-col items-center group relative h-full justify-end w-full">
                        {/* Wick */}
                        <div 
                          className={`w-[1px] absolute ${c.type === 'up' ? 'bg-long-green' : 'bg-short-red'}`} 
                          style={{ 
                            height: `${scale(c.h) - scale(c.l)}%`, 
                            bottom: `${scale(c.l)}%` 
                          }} 
                        />
                        {/* Body */}
                        <div 
                          className={`w-[6px] md:w-[8px] rounded-[1px] relative z-10 ${c.type === 'up' ? 'bg-long-green' : 'bg-short-red'}`} 
                          style={{ 
                            height: `${Math.max(1, Math.abs(scale(c.c) - scale(c.o)))}%`, 
                            bottom: `${Math.min(scale(c.o), scale(c.c))}%` 
                          }} 
                        />
                        
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 hidden group-hover:block z-50 bg-bg-card border border-border-default p-3 rounded-xl shadow-2xl pointer-events-none min-w-[120px]">
                          <div className="text-[10px] mono space-y-1">
                            <div className="flex justify-between"><span className="text-text-secondary">Open</span> <span className="text-text-primary font-bold">${c.o.toFixed(4)}</span></div>
                            <div className="flex justify-between"><span className="text-text-secondary">High</span> <span className="text-text-primary font-bold">${c.h.toFixed(4)}</span></div>
                            <div className="flex justify-between"><span className="text-text-secondary">Low</span> <span className="text-text-primary font-bold">${c.l.toFixed(4)}</span></div>
                            <div className="flex justify-between"><span className="text-text-secondary">Close</span> <span className="text-text-primary font-bold">${c.c.toFixed(4)}</span></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Price Line */}
                <div className="absolute left-0 right-0 border-t border-jupiter-green/30 flex justify-end z-20" style={{ bottom: '50%' }}>
                  <div className="bg-jupiter-green text-bg-page text-[10px] font-bold px-2 py-0.5 rounded-l shadow-lg">
                    ${(tab === 'Long' ? xPiPrice : sPiPrice).toFixed(4)}
                  </div>
                </div>
              </div>
              
              {/* Volume Bars */}
              <div className="h-12 flex items-end justify-around px-2 gap-1 opacity-30">
                {mockCandles.map((_, i) => (
                  <div key={i} className="flex-1 bg-white/10 rounded-t-sm h-[20%] group hover:bg-jupiter-green/40 transition-all" style={{ height: `${Math.random() * 80 + 20}%` }} />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-bg-card border border-border-default rounded-[32px] overflow-hidden"
          >
            <div className="flex border-b border-border-default bg-bg-input/30">
              <button 
                onClick={() => setTradeTab('Positions')}
                className={`px-8 py-4 text-xs font-bold transition-all relative ${tradeTab === 'Positions' ? 'text-jupiter-green' : 'text-text-secondary hover:text-text-primary'}`}
              >
                Positions
                {tradeTab === 'Positions' && <motion.div layoutId="trade-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-jupiter-green" />}
              </button>
              <button 
                onClick={() => setTradeTab('History')}
                className={`px-8 py-4 text-xs font-bold transition-all relative ${tradeTab === 'History' ? 'text-jupiter-green' : 'text-text-secondary hover:text-text-primary'}`}
              >
                History
                {tradeTab === 'History' && <motion.div layoutId="trade-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-jupiter-green" />}
              </button>
            </div>
            <div className="overflow-x-auto">
              {tradeTab === 'Positions' ? (
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="border-b border-border-default bg-bg-input/20">
                      <th className="p-4 label-sm">Market</th>
                      <th className="p-4 label-sm">Size</th>
                      <th className="p-4 label-sm">Collateral</th>
                      <th className="p-4 label-sm">Entry Price</th>
                      <th className="p-4 label-sm">Mark Price</th>
                      <th className="p-4 label-sm">PnL</th>
                      <th className="p-4 label-sm text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { market: 'Long xPi', size: '$1,200.00', collat: '$400.00', entry: '$102.40', mark: xPiPrice.toFixed(2), pnl: '+$42.10 (+10.5%)', type: 'up' },
                      { market: 'Short sPi', size: '$500.00', collat: '$200.00', entry: '$0.95', mark: sPiPrice.toFixed(2), pnl: '+$12.40 (+6.2%)', type: 'up' },
                    ].map((p, i) => (
                      <tr key={i} className="border-b border-border-default/30 hover:bg-white/2 transition-colors">
                        <td className="p-4">
                          <div className={`text-sm font-bold whitespace-nowrap ${p.market.includes('Long') ? 'text-long-green' : 'text-short-red'}`}>{p.market}</div>
                          <div className="text-[10px] text-text-secondary">3.0x Leverage</div>
                        </td>
                        <td className="p-4 mono text-sm font-bold whitespace-nowrap">{p.size}</td>
                        <td className="p-4 mono text-sm text-text-secondary whitespace-nowrap">{p.collat}</td>
                        <td className="p-4 mono text-sm text-text-secondary whitespace-nowrap">${p.entry}</td>
                        <td className="p-4 mono text-sm font-bold whitespace-nowrap">${p.mark}</td>
                        <td className={`p-4 mono text-sm font-bold whitespace-nowrap ${p.type === 'up' ? 'text-long-green' : 'text-short-red'}`}>{p.pnl}</td>
                        <td className="p-4 text-right">
                          <button className="px-4 py-1.5 bg-white/5 border border-border-default rounded-xl text-[11px] font-bold hover:bg-white/10 transition-colors">Close</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="border-b border-border-default bg-bg-input/20">
                      <th className="p-4 label-sm">Market</th>
                      <th className="p-4 label-sm">Action</th>
                      <th className="p-4 label-sm">Size</th>
                      <th className="p-4 label-sm">Price</th>
                      <th className="p-4 label-sm">Time</th>
                      <th className="p-4 label-sm text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { market: 'Long xPi', action: 'Open', size: '$1,200.00', price: '$102.40', time: '2h ago', type: 'Long' },
                      { market: 'Short sPi', action: 'Close', size: '$800.00', price: '$0.94', time: '5h ago', type: 'Short' },
                      { market: 'Long xPi', action: 'Open', size: '$500.00', price: '$101.20', time: '1d ago', type: 'Long' },
                    ].map((h, i) => (
                      <tr key={i} className="border-b border-border-default/30 text-text-secondary hover:bg-white/2 transition-colors">
                        <td className={`p-4 text-sm font-bold whitespace-nowrap ${h.type === 'Long' ? 'text-long-green' : 'text-short-red'}`}>{h.market}</td>
                        <td className={`p-4 text-xs font-bold whitespace-nowrap ${h.type === 'Long' ? 'text-long-green/80' : 'text-short-red/80'}`}>{h.action}</td>
                        <td className="p-4 mono text-sm whitespace-nowrap">{h.size}</td>
                        <td className="p-4 mono text-sm whitespace-nowrap">{h.price}</td>
                        <td className="p-4 text-[11px] whitespace-nowrap">{h.time}</td>
                        <td className="p-4 text-right text-long-green text-[11px] font-bold whitespace-nowrap">Filled</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right: Action Card */}
        <div className="w-full lg:w-[380px] shrink-0">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#131722] border border-[#1F2937] rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Long/Short Tabs */}
            <div className="flex p-1 bg-[#0A0C12] border-b border-[#1F2937]">
              <button 
                onClick={() => setTab('Long')}
                className={`flex-1 py-3 text-sm font-bold transition-all rounded-xl ${
                  tab === 'Long' 
                    ? 'bg-long-green text-bg-page shadow-lg' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                LONG
              </button>
              <button 
                onClick={() => setTab('Short')}
                className={`flex-1 py-3 text-sm font-bold transition-all rounded-xl ${
                  tab === 'Short' 
                    ? 'bg-short-red text-bg-page shadow-lg' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                SHORT
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Market/Limit Tabs */}
              <div className="flex gap-2">
                <div className="flex bg-[#0A0C12] p-1 rounded-xl border border-[#1F2937] flex-1">
                  {(['Market', 'Limit'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setOrderType(t)}
                      className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                        orderType === t 
                          ? 'bg-[#1F2937] text-text-primary border border-white/10' 
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="bg-[#0A0C12] border border-[#1F2937] rounded-xl px-4 flex items-center justify-end flex-1">
                  <span className="mono text-xs font-bold text-text-primary">${currentPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Pay Section */}
              <div className="bg-[#0A0C12] border border-[#1F2937] rounded-2xl p-4 space-y-3 hover:border-white/10 transition-colors">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">You're paying</span>
                  <div className="flex items-center gap-1 text-[10px] text-text-secondary font-bold">
                    <Wallet size={10} />
                    0.00 {selectedToken.symbol}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setIsTokenSelectorOpen(true)}
                    className="flex items-center gap-2 bg-[#1F2937] hover:bg-[#2A3441] transition-colors px-2 py-1 rounded-xl border border-white/5"
                  >
                    <img src={selectedToken.icon} alt={selectedToken.symbol} className="w-5 h-5 rounded-full" referrerPolicy="no-referrer" />
                    <span className="font-bold text-sm">{selectedToken.symbol}</span>
                    <ChevronDown size={14} className="text-text-secondary" />
                  </button>
                  <input 
                    type="text" 
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    className="bg-transparent border-none outline-none text-right mono text-xl font-bold placeholder:text-text-muted w-1/2"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Leverage Slider Section */}
              <div className="bg-[#0A0C12] border border-[#1F2937] rounded-2xl p-4 space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Leverage</span>
                  <span className={`mono text-sm font-bold ${tab === 'Long' ? 'text-long-green' : 'text-short-red'}`}>{leverage.toFixed(1)}x</span>
                </div>

                <div className="px-2">
                  <div className="relative h-1.5 bg-[#1F2937] rounded-full">
                    {/* Track */}
                    <div 
                      className={`absolute top-0 left-0 h-full rounded-full transition-all duration-150 ${tab === 'Long' ? 'bg-long-green' : 'bg-short-red'}`} 
                      style={{ width: `${((leverage - 1.1) / (4 - 1.1)) * 100}%` }} 
                    />
                    {/* Markers */}
                    <div className="absolute inset-0 flex justify-between px-0 pointer-events-none">
                      {[1.1, 2, 3, 4].map((p) => (
                        <div key={p} className="relative">
                          <div className={`w-1.5 h-1.5 rounded-full -mt-[1px] transition-colors ${leverage >= p ? (tab === 'Long' ? 'bg-long-green' : 'bg-short-red') : 'bg-[#1F2937]'}`} />
                        </div>
                      ))}
                    </div>
                    {/* Thumb */}
                    <input 
                      type="range"
                      min="1.1"
                      max="4"
                      step="0.1"
                      value={leverage}
                      onChange={(e) => setLeverage(parseFloat(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    <motion.div 
                      animate={{ left: `calc(${((leverage - 1.1) / (4 - 1.1)) * 100}% - 8px)` }}
                      className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#0A0C12] shadow-xl pointer-events-none z-10 ${tab === 'Long' ? 'bg-long-green' : 'bg-short-red'}`}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] mono text-text-secondary font-bold mt-3">
                    <span>1.1x</span>
                    <span>2.0x</span>
                    <span>3.0x</span>
                    <span>4.0x</span>
                  </div>
                </div>
              </div>

              {/* Receive Section */}
              <div className="bg-[#0A0C12] border border-[#1F2937] rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">{tab === 'Long' ? 'Longing' : 'Shorting'}</span>
                  <span className="text-[10px] text-text-secondary font-bold">Entry Price: ${currentPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-bg-page ${tab === 'Long' ? 'bg-long-green' : 'bg-short-red'}`}>
                      {tab === 'Long' ? 'x' : 's'}
                    </div>
                    <span className="font-bold text-sm">{tab === 'Long' ? 'xPi' : 'sPi'}</span>
                  </div>
                  <div className="text-right">
                    <div className="mono text-lg font-bold text-text-primary">{coinAmount}</div>
                    <div className="text-[10px] text-text-secondary mono">≈ ${(parseFloat(payAmount) * leverage).toFixed(2)}</div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button className={`w-full h-14 rounded-2xl font-bold text-base transition-all shadow-xl uppercase tracking-wider ${
                tab === 'Long' ? 'bg-long-green text-bg-page hover:opacity-90' : 'bg-short-red text-bg-page hover:opacity-90'
              }`}>
                {tab === 'Long' ? 'Long xPi' : 'Short sPi'}
              </button>

              {/* Info Rows */}
              <div className="pt-2 space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-text-secondary">Slippage</span>
                  <span className="mono text-jupiter-green font-bold">Max: 1.0%</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-text-secondary">Total Fees</span>
                  <span className="mono text-text-primary font-bold">$1.25</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-text-secondary">Borrow Rate</span>
                  <span className="mono text-text-primary font-bold">0.001% / hr</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <TokenSelectorModal 
        isOpen={isTokenSelectorOpen}
        onClose={() => setIsTokenSelectorOpen(false)}
        onSelect={setSelectedToken}
        selectedTokenSymbol={selectedToken.symbol}
      />
    </div>
  );
};

const StakePage = () => {
  const [tab, setTab] = useState<'Stake' | 'Unstake'>('Stake');
  
  return (
    <div className="max-w-[480px] mx-auto py-12 space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-bg-card border border-border-default rounded-[32px] p-6 shadow-[0_0_40px_rgba(0,0,0,0.2)]"
      >
        <div className="flex justify-center mb-6">
          <div className="flex bg-bg-input p-1 rounded-2xl border border-border-default w-full max-w-[240px]">
            {(['Stake', 'Unstake'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  tab === t 
                    ? t === 'Stake' 
                      ? 'bg-long-green text-bg-page shadow-lg' 
                      : 'bg-short-red text-bg-page shadow-lg'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <TokenInput 
            token={tab === 'Stake' ? "USDpi" : "sUSDpi"} 
            balance={tab === 'Stake' ? "1,200.00" : "490.20"} 
            value="500.00" 
          />
          
          <div className="flex justify-center -my-2 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-bg-card border border-border-default flex items-center justify-center text-jupiter-green shadow-xl hover:scale-110 transition-transform cursor-pointer">
              <ArrowDown size={20} />
            </div>
          </div>

          <TokenInput 
            token={tab === 'Stake' ? "sUSDpi" : "USDpi"} 
            value="490.20" 
            estimated 
            showMax={false} 
          />

          <div className="pt-6 space-y-2 border-t border-border-default mt-4">
            <InfoRow label="APY" value="21.4%" />
            <InfoRow label="Yield source" value="LST staking" />
            <InfoRow label="Compounding" value="Daily" />
            <InfoRow label="Stability pool role" value="1st defense" />
          </div>

          <button className={`w-full h-[60px] rounded-2xl font-bold text-lg transition-all mt-6 shadow-lg ${
            tab === 'Stake' 
              ? 'bg-long-green text-bg-page hover:shadow-[0_0_25px_rgba(34,201,122,0.4)]' 
              : 'bg-short-red text-bg-page hover:shadow-[0_0_25px_rgba(240,78,94,0.4)]'
          }`}>
            {tab === 'Stake' ? 'STAKE' : 'UNSTAKE'}
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="action-card"
        >
          <h3 className="label-sm mb-4">My Stake</h3>
          <div className="space-y-3">
            <div>
              <div className="text-[10px] text-text-secondary uppercase mb-0.5">sUSDpi Balance</div>
              <div className="mono text-lg">490.20</div>
            </div>
            <div>
              <div className="text-[10px] text-text-secondary uppercase mb-0.5">Value</div>
              <div className="mono text-lg">$500.00</div>
            </div>
            <div className="pt-2 border-t border-border-default">
              <div className="text-[10px] text-text-secondary uppercase mb-0.5">Earned (est.)</div>
              <div className="mono text-jupiter-green">$29.40 / yr</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="action-card"
        >
          <h3 className="label-sm mb-4">Pool</h3>
          <div className="space-y-3">
            <div>
              <div className="text-[10px] text-text-secondary uppercase mb-0.5">Total Staked</div>
              <div className="mono text-lg">$980,000</div>
            </div>
            <div>
              <div className="text-[10px] text-text-secondary uppercase mb-0.5">sUSDpi Supply</div>
              <div className="mono text-lg">960,000</div>
            </div>
            <div className="pt-2 border-t border-border-default">
              <div className="text-[10px] text-text-secondary uppercase mb-0.5">Current APY</div>
              <div className="mono text-jupiter-green">21.4%</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const EarnPage = () => {
  const strategies = [
    { pool: 'USDpi / USDC', protocol: 'Aerodrome', type: 'Stable LP', apy: '12.4%', tvl: '$420K' },
    { pool: 'sUSDpi / USDpi', protocol: 'Aerodrome', type: 'Stable LP', apy: '18.2%', tvl: '$210K' },
    { pool: 'sUSDpi', protocol: 'Morpho', type: 'Lend', apy: '14.1%', tvl: '$180K' },
    { pool: 'sUSDpi PT / YT', protocol: 'Pendle', type: 'Yield split', apy: '9% fix', tvl: '$90K' },
  ];

  return (
    <div className="max-w-[960px] mx-auto py-12 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Earn</h1>
          <p className="text-text-secondary max-w-lg">
            Deploy USDpi and sUSDpi across DeFi to stack yield beyond base APY.
          </p>
        </div>
        <div className="text-right">
          <div className="label-sm mb-1">Total my deposits</div>
          <div className="mono text-2xl">$0.00</div>
        </div>
      </div>

      <div className="bg-bg-card border border-border-default rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-default">
              <th className="p-4 label-sm">Pool</th>
              <th className="p-4 label-sm">Protocol</th>
              <th className="p-4 label-sm">Type</th>
              <th className="p-4 label-sm">APY</th>
              <th className="p-4 label-sm">TVL</th>
              <th className="p-4 label-sm">My Deposit</th>
              <th className="p-4 label-sm text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {strategies.map((s, i) => (
              <tr key={i} className="border-b border-border-default/50 hover:bg-white/2 transition-colors cursor-pointer group">
                <td className="p-4 font-semibold text-sm">{s.pool}</td>
                <td className="p-4 text-sm text-text-secondary">{s.protocol}</td>
                <td className="p-4 text-sm text-text-secondary">
                  <span className="bg-bg-input border border-border-default px-2 py-0.5 rounded text-[10px] font-bold">
                    {s.type}
                  </span>
                </td>
                <td className="p-4 mono text-jupiter-green font-bold">{s.apy}</td>
                <td className="p-4 mono text-sm">{s.tvl}</td>
                <td className="p-4 mono text-sm text-text-muted">-</td>
                <td className="p-4 text-right">
                  <button className="w-8 h-8 rounded-lg bg-jupiter-green/10 text-jupiter-green flex items-center justify-center hover:bg-jupiter-green hover:text-bg-page transition-all">
                    <Plus size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const XPPage = () => {
  return (
    <div className="max-w-[960px] mx-auto py-12 space-y-8">
      <div className="max-w-[520px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="action-card"
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="label-sm mb-2">My XP</h2>
              <div className="mono text-4xl font-bold">1,240 <span className="text-sm text-text-secondary">pts</span></div>
            </div>
            <div className="text-right">
              <div className="label-sm mb-2">Rank</div>
              <div className="mono text-2xl font-bold text-jupiter-green">#142</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-text-secondary">Season 1</span>
              <span className="text-accent-gold mono">ends in 14d 6h</span>
            </div>
            <div className="h-1 bg-border-default rounded-full overflow-hidden">
              <div className="h-full bg-jupiter-green w-[65%]" />
            </div>
            
            <div className="pt-4 space-y-3 border-t border-border-default">
              <div className="flex justify-between items-center">
                <span className="text-sm">Mint USDpi</span>
                <span className="mono text-jupiter-green">+400 XP</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Stake sUSDpi</span>
                <span className="mono text-jupiter-green">+320 XP</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Trade xPi / sPi</span>
                <span className="mono text-jupiter-green">+520 XP</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-bg-card border border-border-default rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border-default flex justify-between items-center">
          <h3 className="label-sm">Leaderboard</h3>
          <div className="text-xs text-text-secondary">Updated every 1h</div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-default bg-bg-input/50">
              <th className="p-4 label-sm w-16">Rank</th>
              <th className="p-4 label-sm">Address</th>
              <th className="p-4 label-sm">XP</th>
              <th className="p-4 label-sm">Mint</th>
              <th className="p-4 label-sm">Stake</th>
              <th className="p-4 label-sm">Trade</th>
            </tr>
          </thead>
          <tbody>
            {[
              { rank: '#1', addr: '0xabc...123', xp: '48,200', mint: '12K', stake: '18K', trade: '18K' },
              { rank: '#2', addr: '0xdef...456', xp: '42,100', mint: '10K', stake: '15K', trade: '17K' },
              { rank: '#3', addr: '0xghi...789', xp: '39,500', mint: '9K', stake: '14K', trade: '16K' },
            ].map((u, i) => (
              <tr key={i} className="border-b border-border-default/50 hover:bg-white/2 transition-colors">
                <td className="p-4 mono text-sm font-bold text-accent-gold">{u.rank}</td>
                <td className="p-4 mono text-sm">{u.addr}</td>
                <td className="p-4 mono text-sm font-bold text-jupiter-green">{u.xp}</td>
                <td className="p-4 mono text-sm text-text-secondary">{u.mint}</td>
                <td className="p-4 mono text-sm text-text-secondary">{u.stake}</td>
                <td className="p-4 mono text-sm text-text-secondary">{u.trade}</td>
              </tr>
            ))}
            <tr className="bg-jupiter-green/5 border-l-2 border-l-jupiter-green">
              <td className="p-4 mono text-sm font-bold text-jupiter-green">#142</td>
              <td className="p-4 mono text-sm">0xYOU...</td>
              <td className="p-4 mono text-sm font-bold text-jupiter-green">1,240</td>
              <td className="p-4 mono text-sm text-text-secondary">400</td>
              <td className="p-4 mono text-sm text-text-secondary">320</td>
              <td className="p-4 mono text-sm text-text-secondary">520</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const VePillPage = () => {
  return (
    <div className="max-w-[960px] mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="action-card h-full"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-bold text-lg uppercase tracking-tight">Lock PILL → vePILL</h2>
              <div className="flex bg-bg-input p-1 rounded-lg border border-border-default">
                <button className="px-4 py-1.5 rounded-md text-xs font-semibold bg-bg-card text-text-primary shadow-sm">Lock</button>
                <button className="px-4 py-1.5 rounded-md text-xs font-semibold text-text-secondary">Extend</button>
              </div>
            </div>

            <div className="space-y-8">
              <TokenInput token="PILL" balance="1,000.00" value="1,000.00" label="Amount to Lock" />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="label-sm">Lock Duration</span>
                  <span className="mono text-jupiter-green font-bold">1 year</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {['3m', '6m', '1y', '4y'].map((d) => (
                    <button key={d} className={`h-10 rounded-lg border text-xs font-bold transition-all ${
                      d === '1y' ? 'bg-jupiter-green/10 border-jupiter-green text-jupiter-green' : 'bg-bg-input border-border-default text-text-secondary hover:text-text-primary'
                    }`}>
                      {d === '3m' ? '3 months' : d === '6m' ? '6 months' : d === '1y' ? '1 year' : '4 years'}
                    </button>
                  ))}
                </div>
                <div className="relative h-1 bg-border-default rounded-full mt-6">
                  <div className="absolute top-0 left-0 h-full bg-jupiter-green rounded-full" style={{ width: '75%' }} />
                  <div className="absolute top-1/2 -translate-y-1/2 left-[75%] w-3 h-3 bg-jupiter-green rounded-full border-2 border-bg-card shadow-lg" />
                </div>
              </div>

              <div className="pt-6 space-y-2 border-t border-border-default">
                <InfoRow label="vePILL received (est.)" value="250 vePILL" />
                <InfoRow label="APY boost" value="+15%" />
                <InfoRow label="Vote power" value="250 votes" />
                <InfoRow label="Revenue share" value="proportional" />
              </div>

              <button className="btn-primary">Lock PILL</button>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="action-card"
          >
            <h3 className="label-sm mb-4">My vePILL</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">vePILL balance</span>
                <span className="mono text-lg font-bold text-jupiter-green">250.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Locked PILL</span>
                <span className="mono text-sm">1,000.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Unlock date</span>
                <span className="mono text-sm">Mar 15 2027</span>
              </div>
              <div className="pt-4 border-t border-border-default flex justify-between items-center">
                <div>
                  <div className="text-[10px] text-text-secondary uppercase mb-0.5">Claimable rev.</div>
                  <div className="mono text-lg font-bold text-long-green">$12.40</div>
                </div>
                <button className="btn-ghost h-10 px-6 text-xs font-bold">Claim</button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="action-card"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="label-sm">Gauge Vote</h3>
              <span className="text-[10px] text-accent-gold font-bold">Resets weekly</span>
            </div>
            <div className="space-y-4">
              {[
                { name: 'USDpi/USDC', protocol: 'Aerodrome', weight: 40 },
                { name: 'sUSDpi/USDpi', protocol: 'Aerodrome', weight: 40 },
                { name: 'sUSDpi', protocol: 'Morpho', weight: 20 },
              ].map((g, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium">{g.name} <span className="text-text-muted text-[10px]">{g.protocol}</span></span>
                    <span className="mono text-jupiter-green">{g.weight}%</span>
                  </div>
                  <div className="h-1.5 bg-bg-input rounded-full overflow-hidden flex">
                    <div className="h-full bg-jupiter-green" style={{ width: `${g.weight}%` }} />
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t border-border-default flex justify-between items-center">
                <div className="text-xs text-text-secondary">Voting power: <span className="mono text-text-primary">250 / 250</span></div>
                <button className="btn-primary h-10 w-auto px-6 text-xs">Submit Vote</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = ({ ethPrice }: { ethPrice: number }) => {
  const tvlData = [
    { date: 'Oct 25', tvl: 1.2 },
    { date: 'Nov 25', tvl: 1.4 },
    { date: 'Dec 25', tvl: 1.35 },
    { date: 'Jan 26', tvl: 1.8 },
    { date: 'Feb 26', tvl: 2.1 },
    { date: 'Mar 26', tvl: 2.45 },
  ];

  const crData = [
    { date: 'Oct 25', cr: 210 },
    { date: 'Nov 25', cr: 205 },
    { date: 'Dec 25', cr: 195 },
    { date: 'Jan 26', cr: 190 },
    { date: 'Feb 26', cr: 185 },
    { date: 'Mar 26', cr: 187 },
  ];

  return (
    <div className="max-w-[1000px] mx-auto py-12 space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'TVL', value: '$2,450,000', change: '↑2.3%' },
          { label: 'CR', value: '187%', status: 'healthy' },
          { label: 'USDpi Supply', value: '1,310,000' },
          { label: 'sUSDpi APY', value: '21.4%' },
        ].map((s, i) => (
          <div key={i} className="bg-bg-card border border-border-default rounded-xl p-4">
            <div className="label-sm mb-2">{s.label}</div>
            <div className="flex items-end justify-between">
              <div className="mono text-xl font-bold">{s.value}</div>
              {s.change && <div className="text-[10px] mono text-long-green font-bold">{s.change}</div>}
              {s.status && <div className="badge-healthy">Healthy</div>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'ETH Price', value: `$${ethPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
          { label: 'xPi Price', value: `$${(ethPrice / 31.4).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
          { label: 'sPi Price', value: '$0.91' },
        ].map((s, i) => (
          <div key={i} className="bg-bg-card border border-border-default rounded-xl p-4 flex justify-between items-center">
            <span className="label-sm">{s.label}</span>
            <span className="mono text-lg font-bold">{s.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="action-card h-[400px] flex flex-col p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="label-sm">TVL over time</h3>
            <div className="mono text-sm font-bold text-jupiter-green">$2.45M</div>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tvlData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 10 }} 
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141e2b', border: '1px solid #ffffff10', borderRadius: '8px' }}
                  itemStyle={{ color: '#C7F284' }}
                  labelStyle={{ color: '#9ca3af', fontSize: '10px' }}
                />
                <Bar dataKey="tvl" fill="#C7F284" radius={[4, 4, 0, 0]} opacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="action-card h-[400px] flex flex-col p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="label-sm">CR over time</h3>
            <div className="mono text-sm font-bold text-long-green">187%</div>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={crData}>
                <defs>
                  <linearGradient id="colorCr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C7F284" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C7F284" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 10 }} 
                  dy={10}
                />
                <YAxis hide domain={[100, 250]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141e2b', border: '1px solid #ffffff10', borderRadius: '8px' }}
                  itemStyle={{ color: '#C7F284' }}
                  labelStyle={{ color: '#9ca3af', fontSize: '10px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="cr" 
                  stroke="#C7F284" 
                  fillOpacity={1} 
                  fill="url(#colorCr)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="action-card">
        <h3 className="label-sm mb-6">Collateral Breakdown</h3>
        <div className="space-y-6">
          {[
            { name: 'wstETH', value: '$1,225,000', pct: 50, color: 'bg-jupiter-green' },
            { name: 'cbETH', value: '$735,000', pct: 30, color: 'bg-accent-gold' },
            { name: 'weETH', value: '$490,000', pct: 20, color: 'bg-gov-purple' },
          ].map((c, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${c.color}`} />
                  <span className="font-semibold text-sm">{c.name}</span>
                </div>
                <div className="text-right">
                  <div className="mono text-sm font-bold">{c.value}</div>
                  <div className="mono text-[10px] text-text-secondary">{c.pct}%</div>
                </div>
              </div>
              <div className="h-2 bg-bg-input rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${c.pct}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full ${c.color}`} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function AppTrade() {
  const [currentPage, setCurrentPage] = useState<Page>('Mint');
  const [ethPrice, setEthPrice] = useState<number>(3402.50);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT');
        const data = await res.json();
        if (data.price) setEthPrice(parseFloat(data.price));
      } catch (e) {
        console.error("Failed to fetch ETH price", e);
      }
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'Mint': return <MintPage />;
      case 'Trade': return <TradePage ethPrice={ethPrice} />;
      case 'Stake': return <StakePage />;
      case 'Earn': return <EarnPage />;
      case 'XP': return <XPPage />;
      case 'vePILL': return <VePillPage />;
      case 'Dashboard': return <DashboardPage ethPrice={ethPrice} />;
      default: return <MintPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-1 overflow-y-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer / Toast Area */}
      <div className="fixed bottom-6 right-6 pointer-events-none">
        <AnimatePresence>
          {/* Example Toast */}
          {/* <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-bg-card border border-border-default p-4 rounded-xl shadow-2xl pointer-events-auto flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-long-green/20 rounded-full flex items-center justify-center text-long-green">
              <TrendingUp size={16} />
            </div>
            <div>
              <div className="text-sm font-bold">Transaction Confirmed</div>
              <div className="text-xs text-text-secondary">Minted 4,821.00 USDpi</div>
            </div>
          </motion.div> */}
        </AnimatePresence>
      </div>
    </div>
  );
}
