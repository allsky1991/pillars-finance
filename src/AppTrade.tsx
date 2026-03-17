/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import {
  LayoutGrid,
  TrendingUp,
  ChevronDown,
  ArrowDownUp,
  Info,
  ExternalLink,
  Wallet,
  Settings,
  ArrowRight,
  ShieldCheck,
  X,
  MoreHorizontal,
  Activity,
  FileText,
  Shield,
  Copy,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const USDpiIcon = ({
  size = 24,
  className,
  noBg = false,
}: {
  size?: number;
  className?: string;
  noBg?: boolean;
}) => {
  const content = (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full p-[18%]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="10"
        y="15"
        width="80"
        height="10"
        rx="2"
        fill={noBg ? "currentColor" : "#13151a"}
      />
      <rect
        x="10"
        y="75"
        width="80"
        height="10"
        rx="2"
        fill={noBg ? "currentColor" : "#13151a"}
      />
      <rect
        x="20"
        y="30"
        width="15"
        height="40"
        rx="2"
        fill={noBg ? "currentColor" : "#13151a"}
      />
      <rect
        x="42.5"
        y="30"
        width="15"
        height="40"
        rx="2"
        fill={noBg ? "currentColor" : "#13151a"}
      />
      <rect
        x="65"
        y="30"
        width="15"
        height="40"
        rx="2"
        fill={noBg ? "currentColor" : "#13151a"}
      />
    </svg>
  );

  if (noBg)
    return (
      <div className={className} style={{ width: size, height: size }}>
        {content}
      </div>
    );

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full bg-jup-primary shadow-lg overflow-hidden shrink-0",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {content}
    </div>
  );
};

const SUsdPiIcon = ({
  size = 24,
  className,
  noBg = false,
}: {
  size?: number;
  className?: string;
  noBg?: boolean;
}) => {
  const content = (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full p-[18%]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="10"
        y="15"
        width="80"
        height="10"
        rx="2"
        fill={noBg ? "currentColor" : "#c7f284"}
      />
      <rect
        x="10"
        y="75"
        width="80"
        height="10"
        rx="2"
        fill={noBg ? "currentColor" : "#c7f284"}
      />
      <rect
        x="20"
        y="30"
        width="15"
        height="40"
        rx="2"
        fill={noBg ? "currentColor" : "#c7f284"}
      />
      <rect
        x="42.5"
        y="30"
        width="15"
        height="40"
        rx="2"
        fill={noBg ? "currentColor" : "#c7f284"}
      />
      <rect
        x="65"
        y="30"
        width="15"
        height="40"
        rx="2"
        fill={noBg ? "currentColor" : "#c7f284"}
      />
    </svg>
  );

  if (noBg)
    return (
      <div className={className} style={{ width: size, height: size }}>
        {content}
      </div>
    );

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full bg-[#13151a] border-2 border-jup-primary shadow-lg overflow-hidden shrink-0",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {content}
    </div>
  );
};

// --- Mock Data ---
const CHART_DATA = [
  { time: "00:00", price: 145.2 },
  { time: "04:00", price: 148.5 },
  { time: "08:00", price: 146.8 },
  { time: "12:00", price: 152.1 },
  { time: "16:00", price: 155.4 },
  { time: "20:00", price: 153.2 },
  { time: "24:00", price: 158.9 },
];

const STAKE_CHART_DATA = [
  { time: "Feb 17", price: 1.18, apy: 14.2 },
  { time: "Feb 20", price: 1.22, apy: 14.8 },
  { time: "Feb 24", price: 1.19, apy: 15.1 },
  { time: "Mar 1", price: 1.25, apy: 15.5 },
  { time: "Mar 5", price: 1.21, apy: 15.8 },
  { time: "Mar 8", price: 1.24, apy: 16.0 },
  { time: "Mar 12", price: 1.26, apy: 16.1 },
  { time: "Mar 15", price: 1.28, apy: 16.19 },
];

const EARN_POOLS = [
  {
    id: 1,
    pair: "USDpi/USDC",
    protocol: "Aerodrome",
    apy: "12.4%",
    tvl: "$4.2M",
    voted: "1.2M vePILL",
  },
  {
    id: 2,
    pair: "USDpi",
    protocol: "Aave",
    apy: "8.2%",
    tvl: "$12.8M",
    voted: "850K vePILL",
  },
  {
    id: 3,
    pair: "USDpi/USDT",
    protocol: "Curve Finance",
    apy: "4.5%",
    tvl: "$25.1M",
    voted: "2.1M vePILL",
  },
];

// --- Components ---

const Navbar = ({
  activeTab,
  setActiveTab,
  isConnected,
  onConnect,
  walletAddress,
  setTab,
}: {
  activeTab: string;
  setActiveTab: (t: string) => void;
  isConnected: boolean;
  onConnect: () => void;
  walletAddress: string;
  setTab: (t: number) => void;
}) => {
  const tabs = [
    { id: "stablecoin", label: "Stablecoin", icon: USDpiIcon },
    { id: "leverage", label: "Leverage", icon: TrendingUp },
    { id: "stake", label: "Stake", icon: SUsdPiIcon },
    { id: "earn", label: "Earn", icon: LayoutGrid },
  ];

  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);
  const networks = [
    {
      id: "base",
      name: "Base",
      color: "text-[#0052FF]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
    },
    {
      id: "bnb",
      name: "BNB",
      color: "text-[#F3BA2F]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 1L16.5 5.5L12 10L7.5 5.5L12 1zM12 14L16.5 18.5L12 23L7.5 18.5L12 14zM23 12L18.5 16.5L14 12L18.5 7.5L23 12zM10 12L5.5 16.5L1 12L5.5 7.5L10 12z" />
        </svg>
      ),
    },
    {
      id: "sui",
      name: "Sui",
      color: "text-[#6FBCF0]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 24c-4.4 0-8-3.6-8-8 0-4.4 3.6-12 8-12s8 7.6 8 12c0 4.4-3.6 8-8 8zm0-17.5c-2.5 2.5-5.5 7.5-5.5 9.5 0 3 2.5 5.5 5.5 5.5s5.5-2.5 5.5-5.5c0-2-3-7-5.5-9.5z" />
        </svg>
      ),
    },
    {
      id: "monad",
      name: "Monad",
      color: "text-[#836EF9]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
        </svg>
      ),
    },
  ];
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-jup-border sticky top-0 bg-jup-bg/80 backdrop-blur-md z-50">
      <div className="flex items-center gap-8">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setTab(0)}
        >
          <img
            src="/logo.jpg"
            alt="Pillars Finance Logo"
            className="w-14 h-14 object-contain rounded-xl"
          />
        </div>

        <div className="hidden md:flex items-center gap-1 bg-jup-secondary/50 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-3 px-5 py-2.5 rounded-lg text-base font-bold transition-all",
                activeTab === tab.id
                  ? "bg-jup-secondary text-jup-primary shadow-sm"
                  : "text-jup-text-dim hover:text-white",
              )}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}

          <div className="relative group">
            <button
              className={cn(
                "flex items-center gap-3 px-5 py-2.5 rounded-lg text-base font-bold transition-all",
                ["vetoken", "dashboard"].includes(activeTab)
                  ? "bg-jup-secondary text-jup-primary shadow-sm"
                  : "text-jup-text-dim hover:text-white",
              )}
            >
              <MoreHorizontal size={20} />
              More
              <ChevronDown size={16} />
            </button>
            <div className="absolute left-0 mt-1 w-48 bg-jup-card border border-jup-border rounded-xl overflow-hidden hidden group-hover:block z-50 shadow-2xl">
              <button
                onClick={() => setActiveTab("vetoken")}
                className="w-full px-4 py-3 text-left hover:bg-white/5 text-sm font-bold transition-colors flex items-center gap-2"
              >
                VeToken
              </button>
              <button
                onClick={() => setActiveTab("dashboard")}
                className="w-full px-4 py-3 text-left hover:bg-white/5 text-sm font-bold transition-colors flex items-center gap-2"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
            className="flex items-center gap-2 bg-jup-secondary/50 hover:bg-jup-secondary px-3 py-2 rounded-xl transition-all border border-jup-border/50"
          >
            <div
              className={cn(
                "flex items-center justify-center",
                selectedNetwork.color,
              )}
            >
              {selectedNetwork.icon}
            </div>
            <span className="text-sm font-bold hidden sm:inline">
              {selectedNetwork.name}
            </span>
            <ChevronDown
              size={14}
              className={cn(
                "transition-transform",
                showNetworkDropdown && "rotate-180",
              )}
            />
          </button>

          <AnimatePresence>
            {showNetworkDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute right-0 mt-2 w-40 bg-jup-card border border-jup-border rounded-xl overflow-hidden z-50 shadow-2xl"
              >
                {networks.map((net) => (
                  <button
                    key={net.id}
                    onClick={() => {
                      setSelectedNetwork(net);
                      setShowNetworkDropdown(false);
                    }}
                    className={cn(
                      "w-full px-4 py-3 text-left text-sm font-bold hover:bg-white/5 transition-colors flex items-center gap-3",
                      selectedNetwork.id === net.id
                        ? "text-jup-primary bg-jup-primary/5"
                        : "text-jup-text-dim",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center",
                        net.color,
                      )}
                    >
                      {net.icon}
                    </div>
                    {net.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isConnected ? (
          <div className="relative">
            <button
              onClick={() => setShowWalletDropdown(!showWalletDropdown)}
              className="flex items-center gap-2 bg-jup-secondary/50 border border-jup-border/50 px-4 py-2 rounded-xl font-mono text-sm font-bold text-jup-primary hover:bg-jup-secondary transition-all"
            >
              <div className="w-2 h-2 bg-jup-primary rounded-full animate-pulse" />
              {walletAddress}
              <ChevronDown
                size={14}
                className={cn(
                  "transition-transform",
                  showWalletDropdown && "rotate-180",
                )}
              />
            </button>

            <AnimatePresence>
              {showWalletDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 mt-2 w-56 bg-jup-card border border-jup-border rounded-xl overflow-hidden z-50 shadow-2xl p-1"
                >
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("0x71C...892b");
                      setShowWalletDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm font-bold hover:bg-white/5 transition-colors flex items-center gap-3 text-white"
                  >
                    <Copy size={18} className="text-jup-text-dim" />
                    Copy address
                  </button>
                  <button className="w-full px-4 py-3 text-left text-sm font-bold hover:bg-white/5 transition-colors flex items-center gap-3 text-white">
                    <ExternalLink size={18} className="text-jup-text-dim" />
                    View in Explorer
                  </button>
                  <div className="h-px bg-jup-border my-1" />
                  <button
                    onClick={() => {
                      window.location.reload();
                    }}
                    className="w-full px-4 py-3 text-left text-sm font-bold hover:bg-white/5 transition-colors flex items-center gap-3 text-rose-500"
                  >
                    <LogOut size={18} />
                    Disconnect
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <button
            onClick={onConnect}
            className="flex items-center gap-2 bg-jup-primary/10 border border-jup-primary/20 text-jup-primary px-5 py-2.5 rounded-xl font-bold hover:bg-jup-primary/20 transition-all"
          >
            <Wallet size={20} />
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

// --- Assets ---
const ASSETS = [
  {
    symbol: "USDC",
    name: "USD Coin",
    address: "0xA0b8...eB48",
    icon: "U",
    color: "bg-blue-500",
    balance: "1,240.50",
    price: "$1.00",
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    address: "0xdAC1...1ec7",
    icon: "T",
    color: "bg-emerald-500",
    balance: "850.00",
    price: "$1.00",
  },
  {
    symbol: "xPI",
    name: "Wrapped Pillars",
    address: "0xeeee...eeee",
    icon: <USDpiIcon size={24} noBg />,
    color: "bg-jup-primary",
    balance: "2.45",
    price: "$3,842.15",
  },
  {
    symbol: "sPI",
    name: "Staked Pillars",
    address: "0xspi...7890",
    icon: <SUsdPiIcon size={24} noBg />,
    color: "bg-[#13151a]",
    balance: "12.45",
    price: "$4,120.50",
  },
  {
    symbol: "USDpi",
    name: "Pillars Stablecoin",
    address: "0xusd...pi",
    icon: <USDpiIcon size={24} noBg />,
    color: "bg-jup-primary",
    balance: "1,000.00",
    price: "$1.00",
  },
  {
    symbol: "sUSDpi",
    name: "Staked Pillars Stablecoin",
    address: "0xsusd...pi",
    icon: <SUsdPiIcon size={24} noBg />,
    color: "bg-[#13151a]",
    balance: "450.20",
    price: "$1.284",
  },
  {
    symbol: "xMON",
    name: "Wrapped Monad",
    address: "0xmon...1234",
    icon: "M",
    color: "bg-[#836EF9]",
    balance: "150.00",
    price: "$1.45",
  },
  {
    symbol: "xBNB",
    name: "Wrapped BNB",
    address: "0xbnb...5678",
    icon: "B",
    color: "bg-[#F3BA2F]",
    balance: "12.50",
    price: "$612.30",
  },
  {
    symbol: "xSUI",
    name: "Wrapped Sui",
    address: "0xsui...9012",
    icon: "S",
    color: "bg-[#6FBCF0]",
    balance: "840.00",
    price: "$1.85",
  },
];

const TokenSelectorModal = ({
  isOpen,
  onClose,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (asset: (typeof ASSETS)[0]) => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#13151a] border border-jup-border rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-5 border-b border-jup-border flex items-center justify-between">
              <h2 className="text-lg font-bold">Select Token</h2>
              <button
                onClick={onClose}
                className="text-jup-text-dim hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-3 max-h-[60vh] overflow-y-auto space-y-2">
              {ASSETS.map((asset) => (
                <button
                  key={asset.symbol}
                  onClick={() => {
                    onSelect(asset);
                    onClose();
                  }}
                  className="w-full p-4 rounded-xl bg-jup-secondary/20 border border-jup-border/30 hover:border-jup-primary/40 hover:bg-jup-secondary/40 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg",
                        asset.color,
                      )}
                    >
                      {asset.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-base">{asset.symbol}</div>
                      <div className="text-xs text-jup-text-dim">
                        {asset.name}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] bg-jup-secondary px-1.5 py-0.5 rounded text-jup-text-dim font-mono">
                          {asset.address}
                        </span>
                        <ExternalLink size={10} className="text-jup-text-dim" />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-base">{asset.balance}</div>
                    <div className="text-xs text-jup-text-dim">
                      {asset.price}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const StablecoinView = () => {
  const [mode, setMode] = useState<"Mint" | "Burn">("Mint");
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [showTokenSelector, setShowTokenSelector] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(ASSETS[0]);
  const [amount, setAmount] = useState("");
  const [showSlippageDropdown, setShowSlippageDropdown] = useState(false);
  const [slippage, setSlippage] = useState("0.2%");

  const assetPrice = parseFloat(selectedAsset.price.replace("$", ""));
  const assetBalance = parseFloat(selectedAsset.balance.replace(",", ""));

  const calculatedOutput = useMemo(() => {
    const val = parseFloat(amount) || 0;
    if (mode === "Mint") {
      return (val * assetPrice).toFixed(2);
    } else {
      return (val / assetPrice).toFixed(4);
    }
  }, [amount, assetPrice, mode]);

  const handleHalf = () => {
    if (mode === "Mint") {
      setAmount((assetBalance / 2).toString());
    } else {
      setAmount("500");
    }
  };

  const handleMax = () => {
    if (mode === "Mint") {
      setAmount(assetBalance.toString());
    } else {
      setAmount("1000");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <TokenSelectorModal
        isOpen={showTokenSelector}
        onClose={() => setShowTokenSelector(false)}
        onSelect={setSelectedAsset}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <div className="jup-card p-6 bg-[#13151a]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <USDpiIcon size={32} />
                <span className="text-xl font-bold">USDpi</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <button
                    onClick={() =>
                      setShowSlippageDropdown(!showSlippageDropdown)
                    }
                    className="flex items-center gap-2 px-3 py-2 bg-jup-secondary/50 rounded-xl text-sm font-bold text-white hover:bg-jup-secondary transition-all border border-jup-border/50"
                  >
                    <Settings size={14} className="text-jup-text-dim" />
                    {slippage}
                  </button>

                  <AnimatePresence>
                    {showSlippageDropdown && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-24 bg-[#1a1c24] border border-jup-border rounded-xl overflow-hidden z-30 shadow-2xl p-1"
                      >
                        {["0.1%", "0.2%", "0.5%", "1%"].map((s) => (
                          <button
                            key={s}
                            onClick={() => {
                              setSlippage(s);
                              setShowSlippageDropdown(false);
                            }}
                            className={cn(
                              "w-full px-3 py-2 text-left text-sm font-bold rounded-lg transition-colors",
                              slippage === s
                                ? "text-jup-primary bg-jup-primary/10"
                                : "text-jup-text-dim hover:text-white hover:bg-white/5",
                            )}
                          >
                            {s}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowModeDropdown(!showModeDropdown)}
                    className="flex items-center gap-2 bg-jup-secondary px-4 py-2 rounded-xl text-xl font-black hover:bg-white/5 transition-colors text-jup-primary"
                  >
                    {mode}{" "}
                    <ChevronDown
                      size={20}
                      className={cn(
                        "transition-transform",
                        showModeDropdown && "rotate-180",
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {showModeDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute right-0 mt-2 w-40 bg-jup-card border border-jup-border rounded-xl overflow-hidden z-20 shadow-2xl"
                      >
                        {["Mint", "Burn"].map((m) => (
                          <button
                            key={m}
                            onClick={() => {
                              setMode(m as any);
                              setShowModeDropdown(false);
                              setAmount("");
                            }}
                            className={cn(
                              "w-full px-4 py-4 text-left text-lg font-black hover:bg-white/5 transition-colors",
                              mode === m
                                ? "text-jup-primary"
                                : "text-jup-text-dim",
                            )}
                          >
                            {m}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="bg-jup-secondary/40 p-4 rounded-2xl border border-jup-border/50">
                <div className="flex justify-between text-sm font-bold mb-3">
                  <span className="text-jup-text-dim">You supply</span>
                  <span className="text-jup-text-dim">
                    $
                    {mode === "Mint"
                      ? (parseFloat(amount) * assetPrice || 0).toFixed(2)
                      : amount || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  {mode === "Mint" ? (
                    <button
                      onClick={() => setShowTokenSelector(true)}
                      className="flex items-center gap-2 bg-jup-secondary px-3 py-2 rounded-xl hover:bg-white/5 transition-colors border border-jup-border/50"
                    >
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white",
                          selectedAsset.color,
                        )}
                      >
                        {selectedAsset.icon}
                      </div>
                      <span className="font-bold">{selectedAsset.symbol}</span>
                      <ChevronDown size={14} />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-jup-secondary px-3 py-2 rounded-xl border border-jup-border/50">
                      <USDpiIcon size={24} />
                      <span className="font-bold">USDpi</span>
                    </div>
                  )}
                  <input
                    type="number"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-transparent text-right text-3xl font-bold focus:outline-none w-full"
                  />
                </div>

                <div className="flex justify-between items-center mt-4 text-xs font-bold">
                  <span className="text-jup-text-dim">
                    Balance:{" "}
                    {mode === "Mint" ? selectedAsset.balance : "1,000.00"}{" "}
                    {mode === "Mint" ? selectedAsset.symbol : "USDpi"}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleHalf}
                      className="text-jup-text-dim hover:text-white px-2 py-1 rounded bg-jup-secondary/50"
                    >
                      HALF
                    </button>
                    <button
                      onClick={handleMax}
                      className="text-jup-text-dim hover:text-white px-2 py-1 rounded bg-jup-secondary/50"
                    >
                      MAX
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center -my-3 relative z-10">
                <div className="bg-[#13151a] p-1 rounded-full">
                  <div className="bg-jup-secondary border border-jup-border p-2 rounded-full text-jup-text-dim">
                    <ArrowDownUp size={18} />
                  </div>
                </div>
              </div>

              <div className="bg-jup-secondary/40 p-4 rounded-2xl border border-jup-border/50">
                <div className="flex justify-between text-sm font-bold mb-3">
                  <span className="text-jup-text-dim">You get</span>
                  <span className="text-jup-text-dim">
                    $
                    {mode === "Mint"
                      ? calculatedOutput
                      : (
                          parseFloat(calculatedOutput) * assetPrice || 0
                        ).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  {mode === "Mint" ? (
                    <div className="flex items-center gap-2 bg-jup-secondary px-3 py-2 rounded-xl border border-jup-border/50">
                      <USDpiIcon size={24} />
                      <span className="font-bold">USDpi</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowTokenSelector(true)}
                      className="flex items-center gap-2 bg-jup-secondary px-3 py-2 rounded-xl hover:bg-white/5 transition-colors border border-jup-border/50"
                    >
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white",
                          selectedAsset.color,
                        )}
                      >
                        {selectedAsset.icon}
                      </div>
                      <span className="font-bold">{selectedAsset.symbol}</span>
                      <ChevronDown size={14} />
                    </button>
                  )}
                  <input
                    type="number"
                    placeholder="0"
                    value={calculatedOutput}
                    readOnly
                    className="bg-transparent text-right text-3xl font-bold focus:outline-none w-full opacity-50"
                  />
                </div>

                <div className="mt-4 text-xs font-bold">
                  <span className="text-jup-text-dim">
                    Balance: {mode === "Mint" ? "0" : selectedAsset.balance}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-[#3d2408]/30 border border-[#f59e0b]/20 p-4 rounded-2xl flex gap-3">
              <Info className="text-[#f59e0b] shrink-0" size={20} />
              <div className="text-sm">
                <p className="font-bold text-[#f59e0b]">
                  Elevated Minting Fees
                </p>
                <p className="text-[#f59e0b]/80">
                  Fees have been adjusted due to market conditions.{" "}
                  <span className="underline cursor-pointer">Learn more</span>
                </p>
              </div>
            </div>

            <button className="w-full bg-jup-primary hover:bg-jup-primary-hover text-black font-black py-4 rounded-2xl text-lg mt-6 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(199,242,132,0.2)]">
              Connect Wallet
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="jup-card p-8 bg-[#13151a]/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-jup-primary/20 rounded-xl flex items-center justify-center border border-jup-primary/30">
                <Activity className="text-jup-primary" size={24} />
              </div>
              <h3 className="text-2xl font-black">Status</h3>
            </div>

            <div className="grid grid-cols-2 gap-y-10 gap-x-8">
              <div>
                <p className="text-jup-text-dim text-xs font-bold uppercase tracking-widest mb-2">
                  TVL
                </p>
                <p className="text-2xl font-mono font-bold">$2,450,000</p>
              </div>
              <div>
                <p className="text-jup-text-dim text-xs font-bold uppercase tracking-widest mb-2">
                  SUPPLY
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-mono font-bold">1,310,000</p>
                  <span className="text-sm text-jup-text-dim font-bold">
                    USDpi
                  </span>
                </div>
              </div>
              <div>
                <p className="text-jup-text-dim text-xs font-bold uppercase tracking-widest mb-2">
                  CR
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-mono font-bold">187%</p>
                  <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                    Healthy
                  </span>
                </div>
              </div>
              <div>
                <p className="text-jup-text-dim text-xs font-bold uppercase tracking-widest mb-2">
                  SUSDPI APY
                </p>
                <p className="text-2xl font-mono font-bold text-jup-primary">
                  21.4%
                </p>
              </div>

              <div className="col-span-2 h-px bg-jup-border my-2"></div>

              <div>
                <p className="text-jup-text-dim text-xs font-bold uppercase tracking-widest mb-2">
                  Staked
                </p>
                <p className="text-xl font-mono font-bold">$850,000</p>
              </div>
              <div>
                <p className="text-jup-text-dim text-xs font-bold uppercase tracking-widest mb-2">
                  Agents Locked
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-xl font-mono font-bold">420,000</p>
                  <span className="text-sm text-jup-text-dim font-bold">
                    USDpi
                  </span>
                </div>
              </div>
              <div>
                <p className="text-jup-text-dim text-xs font-bold uppercase tracking-widest mb-2">
                  Agents
                </p>
                <p className="text-xl font-mono font-bold">1,240</p>
              </div>
            </div>
          </div>

          <div className="jup-card p-6 bg-gradient-to-br from-jup-primary/5 to-transparent border-jup-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="text-jup-primary" size={24} />
              <h4 className="font-bold">Security & Audits</h4>
            </div>
            <p className="text-sm text-jup-text-dim leading-relaxed">
              Pillars Protocol is secured by multiple independent audits and a
              robust stability pool mechanism. Your assets are protected by
              over-collateralization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MOCK_POSITIONS = [
  {
    id: 1,
    side: "Long",
    asset: "xPI",
    size: "$2,500",
    leverage: "5.0x",
    entryPrice: "$3,842.15",
    pnl: "+$124.50",
    pnlPercent: "+4.98%",
    isPositive: true,
  },
];

const MOCK_HISTORY = [
  {
    id: 1,
    side: "Short",
    asset: "xPI",
    size: "$1,200",
    leverage: "3.0x",
    price: "$3,862.10",
    pnl: "-$45.20",
    pnlPercent: "-3.76%",
    isPositive: false,
    date: "2024-03-15 14:20",
  },
  {
    id: 2,
    side: "Long",
    asset: "xPI",
    size: "$5,000",
    leverage: "10.0x",
    price: "$3,815.80",
    pnl: "+$840.00",
    pnlPercent: "+16.8%",
    isPositive: true,
    date: "2024-03-14 09:15",
  },
];

const LeverageView = ({
  isConnected,
  onConnect,
  positions,
  setPositions,
  historyCount,
}: {
  isConnected: boolean;
  onConnect: () => void;
  positions: typeof MOCK_POSITIONS;
  setPositions: React.Dispatch<React.SetStateAction<typeof MOCK_POSITIONS>>;
  historyCount: number;
}) => {
  const [side, setSide] = useState<"long" | "short">("long");
  const [leverage, setLeverage] = useState(5.0);
  const [activeSubTab, setActiveSubTab] = useState<"positions" | "history">(
    "positions",
  );
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(ASSETS[2]);
  const [payAmount, setPayAmount] = useState("");

  const handleOpenPosition = () => {
    const newPos = {
      id: Date.now(),
      side: side === "long" ? "Long" : "Short",
      asset: side === "long" ? "xPI" : "sPI",
      size: `$${(parseFloat(payAmount) * leverage || 2500).toLocaleString()}`,
      leverage: `${leverage.toFixed(1)}x`,
      entryPrice: "$3,842.15",
      pnl: "+$0.00",
      pnlPercent: "0.00%",
      isPositive: true,
    };
    setPositions([newPos, ...positions]);
    setPayAmount("");
  };

  const handleHalf = () => {
    const bal = parseFloat(selectedAsset.balance.replace(",", ""));
    setPayAmount((bal / 2).toFixed(2));
  };

  const handleMax = () => {
    const bal = parseFloat(selectedAsset.balance.replace(",", ""));
    setPayAmount(bal.toString());
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-73px)] overflow-hidden">
      <TokenSelectorModal
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        onSelect={(asset) => {
          setSelectedAsset(asset);
          setIsSelectorOpen(false);
        }}
      />
      <div className="flex-1 border-r border-jup-border p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black text-black",
                  side === "long" ? "bg-jup-primary" : "bg-rose-500",
                )}
              >
                {side === "long" ? "X" : "S"}
              </div>
              <span className="text-xl font-bold">
                {side === "long" ? "xPI" : "sPI"}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">$3,842.15</span>
              <span className="text-sm text-emerald-400 font-bold">+4.2%</span>
            </div>
          </div>
          <div className="flex gap-2">
            {["1H", "4H", "1D", "1W"].map((t) => (
              <button
                key={t}
                className="px-3 py-1 rounded-lg bg-jup-secondary text-xs font-bold hover:text-jup-primary transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[400px] w-full bg-jup-secondary/20 rounded-2xl p-4 border border-jup-border">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CHART_DATA}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c7f284" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#c7f284" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="time"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={["auto", "auto"]}
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#13151a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                }}
                itemStyle={{ color: "#c7f284" }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#c7f284"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-6 mb-4 border-b border-jup-border">
            <button
              onClick={() => setActiveSubTab("positions")}
              className={cn(
                "pb-2 text-sm font-bold transition-colors relative",
                activeSubTab === "positions"
                  ? "text-jup-primary"
                  : "text-jup-text-dim hover:text-white",
              )}
            >
              Positions ({positions.length})
              {activeSubTab === "positions" && (
                <motion.div
                  layoutId="subtab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-jup-primary"
                />
              )}
            </button>
            <button
              onClick={() => setActiveSubTab("history")}
              className={cn(
                "pb-2 text-sm font-bold transition-colors relative",
                activeSubTab === "history"
                  ? "text-jup-primary"
                  : "text-jup-text-dim hover:text-white",
              )}
            >
              History ({historyCount})
              {activeSubTab === "history" && (
                <motion.div
                  layoutId="subtab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-jup-primary"
                />
              )}
            </button>
          </div>

          <div className="overflow-x-auto">
            {activeSubTab === "positions" ? (
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-[10px] text-jup-text-dim uppercase tracking-[0.2em]">
                    <th className="pb-2 font-black text-center">position</th>
                    <th className="pb-2 font-black text-center">size</th>
                    <th className="pb-2 font-black text-center">leverage</th>
                    <th className="pb-2 font-black text-center">entry price</th>
                    <th className="pb-2 font-black text-center">pnl</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {positions.map((pos) => (
                    <tr
                      key={pos.id}
                      className="bg-white/[0.02] border border-jup-border/50 group hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 text-center rounded-l-xl border-y border-l border-jup-border/30">
                        <div className="flex items-center justify-center gap-2">
                          <span
                            className={cn(
                              "px-1.5 py-0.5 rounded text-[10px] font-black uppercase",
                              pos.side === "Long"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-rose-500/10 text-rose-400",
                            )}
                          >
                            {pos.side}
                          </span>
                          <span className="font-bold text-white">
                            {pos.asset}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 font-mono font-bold text-white text-center border-y border-jup-border/30">
                        {pos.size}
                      </td>
                      <td className="py-4 font-mono font-bold text-white text-center border-y border-jup-border/30">
                        {pos.leverage}
                      </td>
                      <td className="py-4 font-mono font-bold text-white text-center border-y border-jup-border/30">
                        {pos.entryPrice}
                      </td>
                      <td
                        className={cn(
                          "py-4 text-center font-mono font-bold rounded-r-xl border-y border-r border-jup-border/30",
                          pos.isPositive ? "text-emerald-400" : "text-rose-400",
                        )}
                      >
                        {pos.pnl} ({pos.pnlPercent})
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-[10px] text-jup-text-dim uppercase tracking-[0.2em]">
                    <th className="pb-2 font-black text-center">position</th>
                    <th className="pb-2 font-black text-center">size</th>
                    <th className="pb-2 font-black text-center">leverage</th>
                    <th className="pb-2 font-black text-center">price</th>
                    <th className="pb-2 font-black text-center">date</th>
                    <th className="pb-2 font-black text-center">pnl</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {MOCK_HISTORY.map((item) => (
                    <tr
                      key={item.id}
                      className="bg-white/[0.02] border border-jup-border/50 group hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 text-center rounded-l-xl border-y border-l border-jup-border/30">
                        <div className="flex items-center justify-center gap-2">
                          <span
                            className={cn(
                              "px-1.5 py-0.5 rounded text-[10px] font-black uppercase",
                              item.side === "Long"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-rose-500/10 text-rose-400",
                            )}
                          >
                            {item.side}
                          </span>
                          <span className="font-bold text-white">
                            {item.asset}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 font-mono font-bold text-white text-center border-y border-jup-border/30">
                        {item.size}
                      </td>
                      <td className="py-4 font-mono font-bold text-white text-center border-y border-jup-border/30">
                        {item.leverage}
                      </td>
                      <td className="py-4 font-mono font-bold text-white text-center border-y border-jup-border/30">
                        {item.price}
                      </td>
                      <td className="py-4 text-xs text-jup-text-dim font-bold text-center border-y border-jup-border/30">
                        {item.date}
                      </td>
                      <td
                        className={cn(
                          "py-4 text-center font-mono font-bold rounded-r-xl border-y border-r border-jup-border/30",
                          item.isPositive
                            ? "text-emerald-400"
                            : "text-rose-400",
                        )}
                      >
                        {item.pnl} ({item.pnlPercent})
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[400px] p-6 bg-jup-card/30 overflow-y-auto">
        <div className="flex gap-1 bg-jup-secondary/50 p-1 rounded-xl mb-6">
          <button
            onClick={() => setSide("long")}
            className={cn(
              "flex-1 py-3 rounded-lg text-lg font-black transition-all",
              side === "long"
                ? "bg-jup-primary text-black"
                : "text-jup-text-dim hover:text-white",
            )}
          >
            Long
          </button>
          <button
            onClick={() => setSide("short")}
            className={cn(
              "flex-1 py-3 rounded-lg text-lg font-black transition-all",
              side === "short"
                ? "bg-rose-500 text-white"
                : "text-jup-text-dim hover:text-white",
            )}
          >
            Short
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-jup-text-dim font-bold">You pay</span>
              <span className="text-jup-text-dim font-bold font-mono">
                $
                {(
                  parseFloat(payAmount) *
                    parseFloat(
                      selectedAsset.price.replace("$", "").replace(",", ""),
                    ) || 0
                ).toFixed(2)}
              </span>
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="0.00"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                className="w-full jup-input text-xl font-bold pr-24 bg-jup-secondary/40"
              />
              <button
                onClick={() => setIsSelectorOpen(true)}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-jup-secondary px-2 py-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
                    selectedAsset.color,
                  )}
                >
                  {selectedAsset.icon}
                </div>
                <span className="font-bold text-sm">
                  {selectedAsset.symbol}
                </span>
                <ChevronDown size={14} className="text-jup-text-dim" />
              </button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-1.5 text-jup-text-dim text-xs font-bold">
                <Wallet size={12} className="text-jup-primary" />
                <span>Balance: {selectedAsset.balance}</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleHalf}
                  className="text-jup-text-dim hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
                >
                  Half
                </button>
                <button
                  onClick={handleMax}
                  className="text-jup-text-dim hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
                >
                  Max
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-jup-text-dim font-bold text-sm">
                Leverage
              </span>
              <span className="text-jup-primary font-mono font-bold text-lg">
                1.1x
              </span>
            </div>
          </div>

          <div className="bg-jup-secondary/30 rounded-xl p-4 space-y-3 border border-jup-border/50">
            <div className="flex justify-between text-sm">
              <span className="text-jup-text-dim font-bold">Entry Price</span>
              <span className="font-mono font-bold">$3,842.15</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-jup-text-dim font-bold">Fees</span>
              <span className="font-mono font-bold">$1.20</span>
            </div>
          </div>

          {!isConnected ? (
            <button
              onClick={onConnect}
              className="w-full py-4 rounded-2xl font-black text-lg transition-all active:scale-[0.98] shadow-lg bg-jup-primary text-black hover:bg-jup-primary-hover shadow-jup-primary/20"
            >
              Connect Wallet
            </button>
          ) : (
            <button
              onClick={handleOpenPosition}
              className={cn(
                "w-full py-4 rounded-2xl font-black text-lg transition-all active:scale-[0.98] shadow-lg",
                side === "long"
                  ? "bg-jup-primary text-black hover:bg-jup-primary-hover shadow-jup-primary/20"
                  : "bg-rose-500 text-white hover:bg-rose-400 shadow-rose-500/20",
              )}
            >
              Open {side === "long" ? "Long" : "Short"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const EarnView = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Earn Yield</h1>
          <p className="text-jup-text-dim">
            Provide liquidity or stake assets to earn protocol rewards.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-xs text-jup-text-dim uppercase font-bold tracking-widest mr-2">
              Total Earned
            </span>
            <span className="text-xl font-bold text-white">$0.00</span>
          </div>
          <button className="jup-button-primary py-2 px-6 text-sm hover:brightness-110 active:scale-95 transition-all">
            Claim All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {EARN_POOLS.map((pool) => (
          <div
            key={pool.id}
            className="jup-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-jup-primary/30 hover:bg-white/[0.02] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4 w-full md:w-2/5">
              <div className="shrink-0">
                <USDpiIcon size={48} />
              </div>
              <div>
                <h3 className="font-bold text-lg">{pool.pair}</h3>
                <p className="text-sm text-jup-text-dim">
                  {pool.pair} by {pool.protocol}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-around w-full md:flex-1">
              <div className="text-center">
                <p className="text-xs text-jup-text-dim uppercase font-bold tracking-widest mb-1">
                  APY
                </p>
                <p className="text-xl font-bold text-emerald-400">{pool.apy}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-jup-text-dim uppercase font-bold tracking-widest mb-1">
                  TVL
                </p>
                <p className="text-xl font-bold text-white">{pool.tvl}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-jup-text-dim uppercase font-bold tracking-widest mb-1">
                  Voted
                </p>
                <p className="text-xl font-bold text-jup-primary">
                  {pool.voted}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-jup-text-dim uppercase font-bold tracking-widest mb-1">
                  My Deposit
                </p>
                <p className="text-xl font-bold text-white">$0.00</p>
              </div>
            </div>

            <div className="w-full md:w-auto">
              <button className="w-full md:w-auto jup-button-secondary flex items-center justify-center gap-2 group-hover:bg-jup-primary group-hover:text-black hover:brightness-110 active:scale-95 transition-all duration-200">
                Manage{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StakeView = ({
  isConnected,
  onConnect,
  setActiveTab,
}: {
  isConnected: boolean;
  onConnect: () => void;
  setActiveTab: (t: string) => void;
}) => {
  const [mode, setMode] = useState<"stake" | "unstake">("stake");
  const [timeframe, setTimeframe] = useState("30 days");
  const [activeMetric, setActiveMetric] = useState<"price" | "apy">("price");
  const [amount, setAmount] = useState("");
  const [usdPiBalance, setUsdPiBalance] = useState(1250.45);
  const [sUsdPiBalance, setSUsdPiBalance] = useState(450.2);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [showSlippageDropdown, setShowSlippageDropdown] = useState(false);
  const [slippage, setSlippage] = useState("0.2%");

  const sUsdPiPrice = 1.284;

  const toggleMode = () => {
    setMode((prev) => (prev === "stake" ? "unstake" : "stake"));
    setAmount("");
  };

  const handleAction = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;

    if (mode === "stake") {
      if (val > usdPiBalance) return;
      setUsdPiBalance((prev) => prev - val);
      setSUsdPiBalance((prev) => prev + val / 1.284);
    } else {
      if (val > sUsdPiBalance) return;
      setSUsdPiBalance((prev) => prev - val);
      setUsdPiBalance((prev) => prev + val * 1.284);
    }
    setAmount("");
  };

  const handleHalf = () => {
    const bal = mode === "stake" ? usdPiBalance : sUsdPiBalance;
    setAmount((bal / 2).toFixed(2));
  };

  const handleMax = () => {
    const bal = mode === "stake" ? usdPiBalance : sUsdPiBalance;
    setAmount(bal.toString());
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 jup-card p-8 flex flex-col">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Market Overview</h2>
            <p className="text-sm text-jup-text-dim mt-1">
              sUSDpi represents USDpi deposited in the stability pool, accruing
              returns from protocol-held assets
            </p>
          </div>

          <div className="flex items-center justify-between mb-8 border-b border-jup-border/50">
            <div className="flex items-center gap-8">
              <button
                onClick={() => setActiveMetric("price")}
                className={cn(
                  "pb-3 text-lg font-bold transition-all relative flex items-center gap-2",
                  activeMetric === "price"
                    ? "text-jup-primary"
                    : "text-jup-text-dim hover:text-white",
                )}
              >
                Price
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-black">
                  $1.284
                </span>
                {activeMetric === "price" && (
                  <motion.div
                    layoutId="metric-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-jup-primary"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveMetric("apy")}
                className={cn(
                  "pb-3 text-lg font-bold transition-all relative flex items-center gap-2",
                  activeMetric === "apy"
                    ? "text-jup-primary"
                    : "text-jup-text-dim hover:text-white",
                )}
              >
                APY
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-black">
                  16.19%
                </span>
                {activeMetric === "apy" && (
                  <motion.div
                    layoutId="metric-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-jup-primary"
                  />
                )}
              </button>
            </div>

            <div className="flex items-center gap-6 pb-3">
              <div className="flex items-center gap-1.5">
                <Wallet size={14} className="text-jup-text-dim" />
                <span className="font-mono font-bold text-white text-sm flex items-center gap-1">
                  {usdPiBalance.toLocaleString()} <USDpiIcon size={14} noBg />
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-jup-text-dim" />
                <span className="font-mono font-bold text-white text-sm flex items-center gap-1">
                  {sUsdPiBalance.toLocaleString()} <SUsdPiIcon size={14} noBg />
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-jup-text-dim font-bold text-xs uppercase tracking-wider">
                  TVL
                </span>
                <span className="font-mono font-bold text-white text-sm">
                  $9,690,892
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-jup-text-dim font-bold text-xs uppercase tracking-wider">
                  CR
                </span>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-lg font-black text-xs">
                  148.88%
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mb-8">
            {["24 hours", "7 days", "30 days"].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-sm font-bold transition-all",
                  timeframe === t
                    ? "bg-jup-primary/20 text-jup-primary"
                    : "bg-jup-secondary/30 text-jup-text-dim hover:text-white",
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex-1 min-h-[400px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={STAKE_CHART_DATA}>
                <defs>
                  <linearGradient id="colorStake" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c7f284" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#c7f284" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis
                  dataKey="time"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  domain={
                    activeMetric === "price"
                      ? ["dataMin - 0.05", "dataMax + 0.05"]
                      : ["dataMin - 1", "dataMax + 1"]
                  }
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  orientation="right"
                  tickFormatter={(val) =>
                    activeMetric === "price" ? `$${val.toFixed(3)}` : `${val}%`
                  }
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#13151a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                  }}
                  itemStyle={{ color: "#c7f284" }}
                />
                <Area
                  type="monotone"
                  dataKey={activeMetric}
                  stroke="#c7f284"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorStake)"
                />
              </AreaChart>
            </ResponsiveContainer>

            <div className="absolute top-0 right-0 bg-jup-primary text-black px-3 py-1 rounded-lg font-black text-sm shadow-lg">
              {activeMetric === "price" ? "$1.284" : "16.19%"}
            </div>
          </div>
        </div>

        <div className="jup-card p-8 flex flex-col min-w-[420px]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <SUsdPiIcon size={40} />
              <span className="text-xl font-bold">sUSDpi</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowSlippageDropdown(!showSlippageDropdown)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-jup-secondary/50 rounded-xl text-sm font-bold text-white hover:bg-jup-secondary transition-all border border-jup-border/50"
                >
                  <Settings size={14} className="text-jup-text-dim" />
                  {slippage}
                </button>

                <AnimatePresence>
                  {showSlippageDropdown && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-24 bg-[#1a1c24] border border-jup-border rounded-xl overflow-hidden z-30 shadow-2xl p-1"
                    >
                      {["0.1%", "0.2%", "0.5%", "1%"].map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setSlippage(s);
                            setShowSlippageDropdown(false);
                          }}
                          className={cn(
                            "w-full px-3 py-2 text-left text-sm font-bold rounded-lg transition-colors",
                            slippage === s
                              ? "text-jup-primary bg-jup-primary/10"
                              : "text-jup-text-dim hover:text-white hover:bg-white/5",
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowModeDropdown(!showModeDropdown)}
                  className="flex items-center justify-center gap-2 bg-jup-secondary px-4 py-2 rounded-xl text-sm font-black hover:bg-white/5 transition-colors text-jup-primary capitalize"
                >
                  {mode}{" "}
                  <ChevronDown
                    size={16}
                    className={cn(
                      "transition-transform",
                      showModeDropdown && "rotate-180",
                    )}
                  />
                </button>

                <AnimatePresence>
                  {showModeDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute right-0 mt-2 w-32 bg-jup-card border border-jup-border rounded-xl overflow-hidden z-20 shadow-2xl"
                    >
                      {["stake", "unstake"].map((m) => (
                        <button
                          key={m}
                          onClick={() => {
                            setMode(m as any);
                            setShowModeDropdown(false);
                            setAmount("");
                          }}
                          className={cn(
                            "w-full px-4 py-3 text-left text-sm font-black hover:bg-white/5 transition-colors capitalize",
                            mode === m
                              ? "text-jup-primary"
                              : "text-jup-text-dim",
                          )}
                        >
                          {m}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-jup-text-dim font-bold">
                      You supply
                    </span>
                    <span className="text-jup-text-dim font-bold font-mono">
                      $
                      {(
                        parseFloat(amount) *
                          (mode === "stake" ? 1 : sUsdPiPrice) || 0
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="bg-jup-secondary/40 p-5 rounded-2xl border border-jup-border/50">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2 bg-jup-secondary px-3 py-1.5 rounded-xl border border-jup-border/50">
                        {mode === "stake" ? (
                          <>
                            <USDpiIcon size={24} />
                            <span className="font-bold">USDpi</span>
                          </>
                        ) : (
                          <>
                            <SUsdPiIcon size={24} />
                            <span className="font-bold">sUSDpi</span>
                          </>
                        )}
                      </div>
                      <input
                        type="number"
                        placeholder="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-transparent text-right text-2xl font-bold w-1/2 focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-1.5 text-jup-text-dim font-bold">
                        <Wallet size={12} className="text-jup-primary" />
                        <span>
                          {mode === "stake"
                            ? usdPiBalance.toLocaleString()
                            : sUsdPiBalance.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleHalf}
                          className="text-jup-text-dim hover:text-jup-primary transition-colors font-bold"
                        >
                          HALF
                        </button>
                        <button
                          onClick={handleMax}
                          className="text-jup-text-dim hover:text-jup-primary transition-colors font-bold"
                        >
                          MAX
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center -my-3 relative z-10">
                  <button
                    onClick={toggleMode}
                    className="bg-jup-secondary p-2 rounded-xl border border-jup-border hover:border-jup-primary/50 transition-all shadow-xl active:scale-90"
                  >
                    <ArrowDownUp size={20} className="text-jup-primary" />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-jup-text-dim font-bold">You get</span>
                    <span className="text-jup-text-dim font-bold font-mono">
                      $
                      {(
                        parseFloat(amount) *
                          (mode === "stake" ? sUsdPiPrice : 1) || 0
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="bg-jup-secondary/40 p-5 rounded-2xl border border-jup-border/50">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2 bg-jup-secondary px-3 py-1.5 rounded-xl border border-jup-border/50">
                        {mode === "stake" ? (
                          <>
                            <SUsdPiIcon size={24} />
                            <span className="font-bold">sUSDpi</span>
                          </>
                        ) : (
                          <>
                            <USDpiIcon size={24} />
                            <span className="font-bold">USDpi</span>
                          </>
                        )}
                      </div>
                      <input
                        type="number"
                        placeholder="0"
                        readOnly
                        value={
                          amount
                            ? (mode === "stake"
                                ? parseFloat(amount) / 1.284
                                : parseFloat(amount) * 1.284
                              ).toFixed(2)
                            : ""
                        }
                        className="bg-transparent text-right text-2xl font-bold w-1/2 focus:outline-none opacity-50"
                      />
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-1.5 text-jup-text-dim font-bold">
                        <Wallet size={12} className="text-jup-primary" />
                        <span>
                          {mode === "stake"
                            ? sUsdPiBalance.toLocaleString()
                            : usdPiBalance.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {!isConnected ? (
              <button
                onClick={onConnect}
                className="w-full jup-button-primary py-5 text-xl font-black mt-4 shadow-jup-primary/20 shadow-lg"
              >
                Connect Wallet
              </button>
            ) : (
              <button
                onClick={handleAction}
                className="w-full jup-button-primary py-5 text-xl font-black mt-4 shadow-jup-primary/20 shadow-lg capitalize"
              >
                {mode}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardView = () => {
  const stats = [
    { label: "TVL", value: "$42.5M", change: "+5.2%" },
    { label: "24h Volume", value: "$12.8M", change: "+12.4%" },
    { label: "USDpi Supply", value: "18.2M", change: "+2.1%" },
    { label: "Revenue", value: "$450K", change: "+8.5%" },
  ];

  const sections = [
    {
      title: "Portfolio",
      metrics: [
        { label: "NAV", value: "$0.00" },
        { label: "Positions", value: "0" },
        { label: "Claimable Rewards", value: "$0.00" },
      ],
    },
    {
      title: "Stablecoin",
      metrics: [
        { label: "Collateral Ratio (CR)", value: "152.4%" },
        { label: "Stability Fee", value: "2.5%" },
        { label: "Minted USDpi", value: "12.4M" },
      ],
    },
    {
      title: "Leverage",
      metrics: [
        { label: "Open Interest", value: "$8.2M" },
        { label: "Long Positions", value: "65%" },
        { label: "Short Positions", value: "35%" },
      ],
    },
    {
      title: "Stake",
      metrics: [
        { label: "Total Staked", value: "$9.6M" },
        { label: "Staking APY", value: "16.19%" },
        { label: "sUSDpi Price", value: "$1.284" },
      ],
    },
    {
      title: "Agent Payment",
      metrics: [
        { label: "Total Agents", value: "1,240" },
        { label: "Locked", value: "$2.4M" },
        { label: "Staked", value: "$1.8M" },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4">Protocol Dashboard</h1>
        <p className="text-jup-text-dim text-lg">
          Real-time overview of the Pillars ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="jup-card p-6">
            <p className="text-xs text-jup-text-dim uppercase font-bold tracking-widest mb-4 text-center">
              {stat.label}
            </p>
            <div className="flex flex-col items-center">
              <p className="text-[40px] leading-tight font-black">
                {stat.value}
              </p>
              <p className="text-sm text-emerald-400 font-bold mt-1">
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, i) => (
          <div key={i} className="jup-card p-8">
            <h2 className="text-2xl font-black mb-8 border-b border-jup-border/50 pb-4 text-center">
              {section.title}
            </h2>
            <div className="space-y-6">
              {section.metrics.map((metric, j) => (
                <div key={j} className="flex justify-between items-center">
                  <span className="text-jup-text-dim font-bold">
                    {metric.label}
                  </span>
                  <span className="font-mono font-bold text-lg">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function AppTrade({ setTab }: { setTab: (t: number) => void }) {
  const [activeTab, setActiveTab] = useState("stablecoin");
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [positions, setPositions] = useState(MOCK_POSITIONS);
  const [historyCount, setHistoryCount] = useState(MOCK_HISTORY.length);

  const handleConnect = () => {
    setIsConnected(true);
    setWalletAddress("0x71C...892b");
  };

  return (
    <div className="min-h-screen flex flex-col bg-jup-bg">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isConnected={isConnected}
        onConnect={handleConnect}
        walletAddress={walletAddress}
        setTab={setTab}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeTab === "stablecoin" && <StablecoinView />}
            {activeTab === "leverage" && (
              <LeverageView
                isConnected={isConnected}
                onConnect={handleConnect}
                positions={positions}
                setPositions={setPositions}
                historyCount={historyCount}
              />
            )}
            {activeTab === "stake" && (
              <StakeView
                isConnected={isConnected}
                onConnect={handleConnect}
                setActiveTab={setActiveTab}
              />
            )}
            {activeTab === "earn" && <EarnView />}
            {activeTab === "dashboard" && <DashboardView />}
            {activeTab === "vetoken" && (
              <div className="max-w-7xl mx-auto py-24 px-6 text-center">
                <h1 className="text-5xl font-black mb-4">VeToken</h1>
                <p className="text-jup-text-dim text-xl">Coming Soon</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="py-12 px-6 border-t border-jup-border bg-jup-card/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <USDpiIcon size={32} />
            <span className="font-bold uppercase tracking-widest text-lg">
              PILLARS
            </span>
          </div>

          <div className="flex gap-10 text-sm text-jup-text-dim">
            <a
              href="#"
              className="hover:text-white transition-colors"
              title="Documentation"
            >
              <FileText size={26} />
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
              title="X (Twitter)"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
              title="Discord"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
              title="Terms of Service"
            >
              <Shield size={26} />
            </a>
          </div>

          <div className="flex items-center gap-2 text-xs text-jup-text-dim"></div>
        </div>
      </footer>
    </div>
  );
}
