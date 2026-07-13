import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import {
  X,
  ArrowRight,
  Shield,
  Activity,
  Database,
  TrendingDown,
  Cpu,
  RefreshCw,
  Server,
  Terminal,
  Lock,
  Check,
  AlertTriangle,
  Play,
  Cloud,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

// --- DIAGRAM COMPONENTS FOR THE DETAILS MODAL ---

// 1. Cloud Deployment — pure SVG, single coordinate space
function CloudDeploymentDiagram() {
  const [step, setStep] = useState(0)
  const steps = [
    { name: 'Git Commit', sub: 'Dev Push' },
    { name: 'CI/CD Build', sub: 'Test & Build' },
    { name: 'IaC Provision', sub: 'Terraform' },
    { name: 'Live App', sub: 'Production' }
  ]

  // All positions in viewBox="0 0 460 160" coordinate space
  const NODE_Y = 78
  const nodeX = [58, 178, 298, 418]
  const nodeColors = ['#22d3ee', '#818cf8', '#60a5fa', '#34d399']
  const nodeBg    = ['#083344', '#1e1b4b', '#172554', '#052e16']
  const nodeBord  = ['#06b6d4', '#6366f1', '#3b82f6', '#10b981']
  // Simple SVG icon paths (centered at origin, will be translated)
  const iconPaths = [
    'M-6 5 L0 -1 L6 5 M0 -5 L0 5',                          // terminal >
    'M0 -7 A7 7 0 1 1 -0.1 -7 M0 -4 L0 0 L3 2',            // clock / cpu
    'M7 0 A7 7 0 0 1 -7 0 A7 7 0 0 0 7 0 M-9 3 A9 9 0 1 1 9 3', // cloud
    'M-6 0 L-1 5 L7 -5'                                       // checkmark
  ]

  React.useEffect(() => {
    const timer = setInterval(() => setStep(s => (s + 1) % 4), 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Pure SVG canvas — all coords share one viewBox */}
      <div className="bg-slate-950/80 border border-white/10 rounded-xl flex-1 flex items-center justify-center relative overflow-hidden min-h-[200px]">
        <svg
          viewBox="0 0 460 160"
          className="w-full h-full"
          style={{ maxHeight: 200 }}
        >
          {/* Background rail line */}
          <line x1={nodeX[0]} y1={NODE_Y} x2={nodeX[3]} y2={NODE_Y} stroke="#334155" strokeWidth="2" />

          {/* Completed progress line */}
          <motion.line
            x1={nodeX[0]} y1={NODE_Y} y2={NODE_Y}
            stroke="#22d3ee" strokeWidth="2" strokeOpacity="0.45"
            animate={{ x2: nodeX[step] }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          />

          {/* Node circles + labels */}
          {nodeX.map((cx, idx) => (
            <g key={idx}>
              <circle
                cx={cx} cy={NODE_Y} r="27"
                fill={step >= idx ? nodeBg[idx] : '#0f172a'}
                stroke={step >= idx ? nodeBord[idx] : '#475569'}
                strokeWidth={step >= idx ? 2 : 1}
                style={{ transition: 'fill 0.4s ease, stroke 0.4s ease' }}
              />
              {/* Icon */}
              <g
                transform={`translate(${cx},${NODE_Y})`}
                stroke={step >= idx ? nodeColors[idx] : '#64748b'}
                strokeWidth="2" fill="none"
                strokeLinecap="round" strokeLinejoin="round"
                style={{ transition: 'stroke 0.4s ease' }}
              >
                <path d={iconPaths[idx]} />
              </g>
              {/* Sub-label */}
              <text
                x={cx} y={NODE_Y + 45}
                textAnchor="middle"
                fill={step >= idx ? nodeColors[idx] : '#64748b'}
                fontSize="9" fontWeight="600"
                fontFamily="Inter, system-ui, sans-serif"
                style={{ transition: 'fill 0.4s ease' }}
              >
                {steps[idx].sub}
              </text>
            </g>
          ))}

          {/* Animated flow dot — moves exactly between node centers */}
          <motion.circle
            r="7" cy={NODE_Y}
            fill="#22d3ee"
            style={{ filter: 'drop-shadow(0 0 6px #22d3ee)' }}
            animate={{ cx: nodeX[step] }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          />
        </svg>
      </div>

      {/* Control Tabs */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setStep(idx)}
            className={`p-2.5 rounded-lg border text-left transition-all duration-300 ${
              step === idx
                ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-400'
                : 'bg-slate-900/50 border-white/5 text-slate-400 hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <div className="text-[10px] font-bold tracking-wide uppercase text-slate-500">Step {idx + 1}</div>
            <div className="text-xs font-semibold truncate">{s.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

// 2. Cloud Migration — pure SVG coordinate space
function CloudMigrationDiagram() {
  const [isSyncing, setIsSyncing] = useState(false)
  const [progress, setProgress] = useState(0)

  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (isSyncing) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) { setIsSyncing(false); return 100 }
          return prev + 4
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isSyncing])

  const triggerMigration = () => { setProgress(0); setIsSyncing(true) }

  // viewBox="0 0 440 160"
  // On-Prem node center: (70, 72), Cloud node center: (370, 72)
  // Rail line: x1=110 → x2=330, y=72 (between the two node edges)
  const SRC_X = 70, CLOUD_X = 370, NODE_Y = 72
  const RAIL_X1 = 115, RAIL_X2 = 325
  const filledX2 = RAIL_X1 + (RAIL_X2 - RAIL_X1) * (progress / 100)

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="bg-slate-950/80 border border-white/10 rounded-xl flex-1 flex flex-col justify-between relative overflow-hidden min-h-[200px] p-3">
        <svg viewBox="0 0 440 145" className="w-full flex-1" style={{ maxHeight: 170 }}>
          {/* Rail line */}
          <line x1={RAIL_X1} y1={NODE_Y} x2={RAIL_X2} y2={NODE_Y} stroke="#334155" strokeWidth="3" strokeLinecap="round"/>
          {/* Filled progress line */}
          {isSyncing && (
            <motion.line
              x1={RAIL_X1} y1={NODE_Y}
              y2={NODE_Y}
              stroke="url(#migGrad)" strokeWidth="3" strokeLinecap="round"
              animate={{ x2: filledX2 }}
              transition={{ ease: 'linear' }}
            />
          )}
          {progress === 100 && (
            <line x1={RAIL_X1} y1={NODE_Y} x2={RAIL_X2} y2={NODE_Y} stroke="#22d3ee" strokeWidth="3" strokeLinecap="round"/>
          )}
          <defs>
            <linearGradient id="migGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6"/>
              <stop offset="100%" stopColor="#22d3ee"/>
            </linearGradient>
          </defs>

          {/* On-Prem node */}
          <rect x={SRC_X - 44} y={NODE_Y - 32} width="88" height="64" rx="10"
            fill="#1e293b" stroke="#475569" strokeWidth="1.5"/>
          {/* Server icon in On-Prem */}
          <rect x={SRC_X - 16} y={NODE_Y - 18} width="32" height="8" rx="2" fill="none" stroke="#64748b" strokeWidth="1.5"/>
          <circle cx={SRC_X - 10} cy={NODE_Y - 14} r="1.5" fill="#64748b"/>
          <rect x={SRC_X - 16} y={NODE_Y - 6} width="32" height="8" rx="2" fill="none" stroke="#64748b" strokeWidth="1.5"/>
          <circle cx={SRC_X - 10} cy={NODE_Y - 2} r="1.5" fill="#64748b"/>
          <rect x={SRC_X - 16} y={NODE_Y + 6} width="32" height="8" rx="2" fill="none" stroke="#64748b" strokeWidth="1.5"/>
          <text x={SRC_X} y={NODE_Y + 46} textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="600">On-Prem</text>
          <text x={SRC_X} y={NODE_Y + 58} textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="Inter,sans-serif">Legacy Rack</text>

          {/* Cloud node */}
          <rect x={CLOUD_X - 44} y={NODE_Y - 32} width="88" height="64" rx="10"
            fill={progress === 100 ? '#083344' : isSyncing ? '#1e3a5f' : '#1e293b'}
            stroke={progress === 100 ? '#22d3ee' : isSyncing ? '#3b82f6' : '#334155'}
            strokeWidth="1.5"
            style={{ transition: 'fill 0.4s ease, stroke 0.4s ease' }}
          />
          {/* Cloud icon */}
          <path d={`M${CLOUD_X - 12},${NODE_Y + 6} a8,8 0 1,1 16,0 a6,6 0 1,1 -2,-11 a8,8 0 0,0 -14,11z`}
            fill="none"
            stroke={progress === 100 ? '#22d3ee' : isSyncing ? '#60a5fa' : '#64748b'}
            strokeWidth="1.5" strokeLinejoin="round"
            style={{ transition: 'stroke 0.4s ease' }}
          />
          <text x={CLOUD_X} y={NODE_Y + 46} textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="600">AWS / Azure</text>
          <text x={CLOUD_X} y={NODE_Y + 58} textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="Inter,sans-serif">Cloud Target</text>

          {/* Status badge in center */}
          <rect x="185" y={NODE_Y - 12} width="70" height="24" rx="6"
            fill={progress === 100 ? '#052e16' : isSyncing ? '#1e3a5f' : '#1e293b'}
            stroke={progress === 100 ? '#22c55e' : isSyncing ? '#3b82f6' : '#475569'}
            strokeWidth="1"
            style={{ transition: 'all 0.3s ease' }}
          />
          <text x="220" y={NODE_Y + 5} textAnchor="middle"
            fill={progress === 100 ? '#4ade80' : isSyncing ? '#60a5fa' : '#94a3b8'}
            fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700"
            style={{ transition: 'fill 0.3s ease' }}
          >
            {progress === 100 ? 'SUCCESS' : isSyncing ? `${progress}%` : 'READY'}
          </text>
        </svg>

        {/* Log console */}
        <div className="bg-slate-900/60 border border-white/5 rounded p-2 text-left">
          <p className="text-[10px] font-mono text-slate-400 leading-tight">
            {isSyncing && `> Syncing block storage partition... ${progress}%`}
            {progress === 100 && '> Migration replication finished. DNS healthcheck: [PASS]'}
            {!isSyncing && progress === 0 && '> Standby replica configured. Click "Start replication" to sync.'}
          </p>
        </div>
      </div>

      <button
        onClick={triggerMigration}
        disabled={isSyncing}
        className="w-full mt-4 py-2.5 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-2 border bg-blue-600 border-blue-500 hover:bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
        {isSyncing ? 'Syncing Infrastructure...' : progress === 100 ? 'Re-Run Migration Stream' : 'Start Live Replication'}
      </button>
    </div>
  )
}

// 3. Infrastructure Setup & Management — pure SVG
function CloudInfrastructureDiagram() {
  const [traffic, setTraffic] = useState<'low' | 'high'>('low')

  // viewBox="0 0 440 200"
  // Client center:      (55, 100)
  // LB center:          (220, 100)  box: x=186 y=76 w=68 h=48
  // Server A center:    (380, 65)   box: x=352 y=46 w=58 h=38
  // Server B center:    (380, 134)  box: x=352 y=115 w=58 h=38
  // Paths:
  //   Client -> LB: M 95,100 L 186,100
  //   LB -> A:      M 254,100 Q 310,65 352,65
  //   LB -> B:      M 254,100 Q 310,134 352,134
  const LB_CX = 220, LB_CY = 100
  const CLI_CX = 55, CLI_CY = 100
  const SRV_A_CX = 380, SRV_A_CY = 65
  const SRV_B_CX = 380, SRV_B_CY = 134

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="bg-slate-950/80 border border-white/10 rounded-xl flex-1 flex items-center justify-center relative overflow-hidden min-h-[200px]">
        <svg viewBox="0 0 440 200" className="w-full h-full" style={{ maxHeight: 200 }}>
          {/* Connection lines */}
          <line x1="95" y1={CLI_CY} x2="186" y2={LB_CY} stroke="#334155" strokeWidth="2"/>
          <path d="M 254,100 Q 310,65 352,65" stroke="#334155" strokeWidth="2" fill="none"/>
          <path d="M 254,100 Q 310,134 352,134" stroke="#334155" strokeWidth="2" fill="none"/>

          {/* Animated packets: Client → LB */}
          <motion.circle r="4" fill="#22d3ee"
            style={{ filter: 'drop-shadow(0 0 4px #22d3ee)' }}
            animate={{ cx: [95, 186], cy: [CLI_CY, LB_CY] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          />
          {traffic === 'high' && (
            <motion.circle r="4" fill="#22d3ee"
              style={{ filter: 'drop-shadow(0 0 4px #22d3ee)' }}
              animate={{ cx: [95, 186], cy: [CLI_CY, LB_CY] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: 0.6, ease: 'linear' }}
            />
          )}

          {/* Packet: LB → Server A */}
          <motion.circle r="4" fill="#22d3ee"
            style={{ filter: 'drop-shadow(0 0 4px #22d3ee)' }}
            animate={{ cx: [254, 310, 352], cy: [LB_CY, 65, SRV_A_CY] }}
            transition={{ repeat: Infinity, duration: 1.0, ease: 'linear', delay: 0.3 }}
          />

          {/* Packet: LB → Server B (only when high) */}
          {traffic === 'high' && (
            <motion.circle r="4" fill="#3b82f6"
              style={{ filter: 'drop-shadow(0 0 4px #3b82f6)' }}
              animate={{ cx: [254, 310, 352], cy: [LB_CY, 134, SRV_B_CY] }}
              transition={{ repeat: Infinity, duration: 1.0, ease: 'linear', delay: 0.15 }}
            />
          )}

          {/* Client node */}
          <circle cx={CLI_CX} cy={CLI_CY} r="35" fill="#1e293b" stroke="#475569" strokeWidth="1.5"/>
          <text x={CLI_CX} y={CLI_CY + 4} textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="700">Client</text>

          {/* Load Balancer node */}
          <rect x="186" y="76" width="68" height="48" rx="8" fill="#083344" stroke="#0e7490" strokeWidth="1.5"/>
          {/* Activity icon lines */}
          <polyline points="194,100 200,93 207,107 214,93 221,100 228,100 234,100 240,100 246,100" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinejoin="round"/>
          <text x={LB_CX} y="116" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="700">LOAD BALANCER</text>

          {/* Server A */}
          <rect x="352" y="46" width="70" height="38" rx="6"
            fill="#052e16" stroke="#22c55e" strokeWidth="1.5"/>
          <text x={SRV_A_CX} y={SRV_A_CY - 3} textAnchor="middle" fill="#4ade80" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="700">NODE A</text>
          <text x={SRV_A_CX} y={SRV_A_CY + 9} textAnchor="middle" fill="#22c55e" fontSize="7" fontFamily="Inter,sans-serif">● ACTIVE</text>

          {/* Server B */}
          <rect x="352" y="115" width="70" height="38" rx="6"
            fill={traffic === 'high' ? '#172554' : '#1e293b'}
            stroke={traffic === 'high' ? '#3b82f6' : '#334155'}
            strokeWidth="1.5"
            style={{ transition: 'fill 0.5s ease, stroke 0.5s ease' }}
          />
          <text x={SRV_B_CX} y={SRV_B_CY - 3} textAnchor="middle"
            fill={traffic === 'high' ? '#60a5fa' : '#64748b'}
            fontSize="8" fontFamily="Inter,sans-serif" fontWeight="700"
            style={{ transition: 'fill 0.5s ease' }}
          >NODE B</text>
          <text x={SRV_B_CX} y={SRV_B_CY + 9} textAnchor="middle"
            fill={traffic === 'high' ? '#3b82f6' : '#475569'}
            fontSize="7" fontFamily="Inter,sans-serif"
            style={{ transition: 'fill 0.5s ease' }}
          >{traffic === 'high' ? '↑ SCALE-UP' : '○ STANDBY'}</text>
        </svg>
      </div>

      {/* Slider Selector */}
      <div className="mt-4 p-2 bg-slate-900 border border-white/5 rounded-lg flex justify-between items-center">
        <span className="text-xs font-semibold text-slate-400">Traffic Simulation:</span>
        <div className="flex bg-slate-950 p-1 rounded-md border border-white/5">
          <button onClick={() => setTraffic('low')}
            className={`px-3 py-1 rounded text-xs font-bold transition-all ${
              traffic === 'low' ? 'bg-cyan-950 border border-cyan-800 text-cyan-400' : 'text-slate-400 hover:text-white'
            }`}
          >Normal Load</button>
          <button onClick={() => setTraffic('high')}
            className={`px-3 py-1 rounded text-xs font-bold transition-all ${
              traffic === 'high' ? 'bg-red-950 border border-red-800 text-red-400' : 'text-slate-400 hover:text-white'
            }`}
          >Spike Load (+Scale)</button>
        </div>
      </div>
    </div>
  )
}

// 4. Automation & DevOps
function DevOpsAutomationDiagram() {
  const [activeStage, setActiveStage] = useState<'commit' | 'test' | 'build' | 'deploy'>('commit')

  const stages = [
    { id: 'commit' as const, label: '1. Commit', code: 'git push origin main\n> branch: main\n> commit: e2d69fa\n> [OK] Webhook triggered' },
    { id: 'test' as const, label: '2. Unit Test', code: 'npm run test:coverage\n> PASS src/auth.test.ts (14ms)\n> PASS src/api.test.ts (28ms)\n> Coverage: 96.8%' },
    { id: 'build' as const, label: '3. Docker Build', code: 'docker build -t app:e2d69fa .\n> Step 5/12 : RUN npm run build\n> Pushing tag to registry...\n> [Registry] PUSHED app:e2d69fa' },
    { id: 'deploy' as const, label: '4. K8s Rollout', code: 'kubectl set image deployment/app\n> deployment "app" image updated\n> Waiting for rollout status...\n> Rollout success: 3 healthy pods' }
  ]

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex-1 flex flex-col gap-4">
        {/* Progress Pipeline bar */}
        <div className="flex justify-between items-center bg-slate-900/80 border border-white/5 rounded-xl p-2">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`flex-1 mx-1 py-2 text-center rounded-lg text-[10px] font-bold border transition-all ${
                activeStage === stage.id
                  ? 'bg-indigo-950/60 border-indigo-400/50 text-indigo-400'
                  : 'bg-slate-950 border-white/5 text-slate-500 hover:text-slate-300'
              }`}
            >
              {stage.label}
            </button>
          ))}
        </div>

        {/* Terminal Screen Console */}
        <div className="flex-1 min-h-[160px] bg-slate-950 border border-white/10 rounded-xl p-4 font-mono text-left flex flex-col relative overflow-hidden">
          <div className="absolute top-2 right-2 flex gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500/80" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
            <span className="w-2 h-2 rounded-full bg-green-500/80" />
          </div>
          <div className="text-[10px] text-slate-500 mb-2 border-b border-white/5 pb-1">Shell - CI/CD Pipeline console</div>
          <pre className="text-xs text-indigo-400 font-mono leading-relaxed whitespace-pre-wrap flex-1 overflow-auto">
            {stages.find((s) => s.id === activeStage)?.code}
          </pre>
        </div>
      </div>
    </div>
  )
}

// 5. Cloud Monitoring & Reporting
function CloudMonitoringDiagram() {
  const [load, setLoad] = useState<number>(30)

  // Calculate SVG Graph path coordinates dynamic based on load
  const graphPoints = [
    [0, 80],
    [50, 75],
    [100, load > 70 ? 25 : 60],
    [150, load > 50 ? 40 : 65],
    [200, load > 80 ? 15 : 70],
    [250, load > 60 ? 30 : 65],
    [300, 110 - load]
  ]
  const pathD = `M ${graphPoints.map((p) => p.join(',')).join(' L ')}`

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="bg-slate-950/80 border border-white/10 rounded-xl p-4 flex-1 flex flex-col justify-between relative overflow-hidden min-h-[220px]">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
          <div className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${load >= 80 ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`} />
            <span className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">
              {load >= 80 ? 'ALERTING: CRITICAL' : 'SYSTEM HEALTHY'}
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-white bg-slate-900 border border-white/5 px-2 py-0.5 rounded">
            CPU: {load}%
          </span>
        </div>

        {/* Live dynamic graph chart */}
        <div className="h-28 w-full flex items-end justify-center relative mt-3">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 110">
            <path
              d={pathD}
              fill="none"
              stroke={load >= 80 ? '#ef4444' : '#22d3ee'}
              strokeWidth="2.5"
              strokeLinecap="round"
              className="transition-colors duration-300"
            />
            {/* Ambient graph filling area */}
            <path
              d={`${pathD} L 300,110 L 0,110 Z`}
              fill={load >= 80 ? 'rgba(239,68,68,0.06)' : 'rgba(34,211,238,0.06)'}
              className="transition-colors duration-300"
            />
          </svg>
        </div>

        {/* Notification simulation */}
        <AnimatePresence>
          {load >= 80 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="absolute bottom-2 left-2 right-2 bg-red-950/80 border border-red-700/50 rounded-lg p-2 flex items-center justify-between text-red-200 text-[10px] z-20"
            >
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-red-500 animate-bounce" />
                <span className="font-bold">Slack Alert: cpu-utilization-warning</span>
              </div>
              <span className="font-semibold text-slate-400">Triggered</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CPU load Slider controller */}
      <div className="mt-4 p-3 bg-slate-900 border border-white/5 rounded-lg flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-400 font-semibold">Simulate Cloud Activity Level:</span>
          <span className={`font-bold ${load >= 80 ? 'text-red-400' : 'text-cyan-400'}`}>
            {load}% Load
          </span>
        </div>
        <input
          type="range"
          min="15"
          max="95"
          value={load}
          onChange={(e) => setLoad(Number(e.target.value))}
          className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
      </div>
    </div>
  )
}

// 6. Cloud Cost Optimization
function CloudCostDiagram() {
  const [optimized, setOptimized] = useState(false)

  const items = [
    { label: 'Unused Databases', oldCost: 2800, newCost: 0, percentage: '-100%' },
    { label: 'Oversized EC2 Nodes', oldCost: 4500, newCost: 1800, percentage: '-60%' },
    { label: 'Storage Archiving', oldCost: 2200, newCost: 600, percentage: '-72%' },
    { label: 'On-Demand RDS Server', oldCost: 3000, newCost: 1500, percentage: '-50%' }
  ]

  const totalOld = items.reduce((acc, curr) => acc + curr.oldCost, 0)
  const totalNew = items.reduce((acc, curr) => acc + curr.newCost, 0)

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="bg-slate-950/80 border border-white/10 rounded-xl p-4 flex-1 flex flex-col justify-between min-h-[220px]">
        {/* Header bills */}
        <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
          <div className="text-left">
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block">Monthly Spending</span>
            <span className={`text-lg font-mono font-bold transition-colors ${optimized ? 'text-cyan-400' : 'text-red-400'}`}>
              ${optimized ? totalNew.toLocaleString() : totalOld.toLocaleString()} / mo
            </span>
          </div>

          {optimized && (
            <div className="bg-emerald-950/60 border border-emerald-500/30 rounded px-2 py-0.5 text-[10px] text-emerald-400 font-bold">
              SAVED ${ (totalOld - totalNew).toLocaleString() } ({(100 - (totalNew / totalOld) * 100).toFixed(0)}%)
            </div>
          )}
        </div>

        {/* Cost breakdown bars */}
        <div className="flex-1 flex flex-col justify-around gap-2 text-left">
          {items.map((item, idx) => {
            const currentCost = optimized ? item.newCost : item.oldCost
            const maxCost = 4500
            const fillWidth = (currentCost / maxCost) * 100

            return (
              <div key={idx} className="flex flex-col text-[10px]">
                <div className="flex justify-between font-semibold text-slate-400 mb-0.5">
                  <span>{item.label}</span>
                  <span className="font-mono">${currentCost.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-slate-900 border border-white/5 rounded-full overflow-hidden w-full relative">
                  <motion.div
                    className={`h-full rounded-full ${optimized ? 'bg-cyan-500' : 'bg-orange-500'}`}
                    animate={{ width: `${fillWidth}%` }}
                    transition={{ type: 'spring', stiffness: 60, damping: 12 }}
                  />
                  {optimized && item.newCost < item.oldCost && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] font-extrabold text-cyan-300">
                      {item.percentage}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <button
        onClick={() => setOptimized(!optimized)}
        className={`w-full mt-4 py-2.5 rounded-lg font-bold text-xs border transition-all flex items-center justify-center gap-2 ${
          optimized
            ? 'bg-slate-900 border-cyan-500/30 text-cyan-400 hover:bg-slate-800'
            : 'bg-cyan-500 border-cyan-400 hover:bg-cyan-400 text-slate-950'
        }`}
      >
        <TrendingDown className="w-4 h-4" />
        {optimized ? 'Reset Spend Audit' : 'Apply Cost Optimization Engine'}
      </button>
    </div>
  )
}

// 7. Backup & Disaster Recovery — pure SVG
function CloudDRDiagram() {
  const [status, setStatus] = useState<'normal' | 'outage' | 'failover' | 'recovered'>('normal')

  const triggerOutage = () => {
    setStatus('outage')
    setTimeout(() => {
      setStatus('failover')
      setTimeout(() => setStatus('recovered'), 2500)
    }, 2000)
  }
  const reset = () => setStatus('normal')

  // viewBox="0 0 440 190"
  // DNS badge:  center (220, 38)
  // Primary:    center (90, 142)   box x=55 y=114 w=70 h=56
  // Standby DR: center (350, 142)  box x=315 y=114 w=70 h=56
  // Lines:
  //   DNS→Primary:  M220,58 L90,114
  //   DNS→Standby:  M220,58 L350,114
  const DNS_X = 220, DNS_Y = 38
  const PRI_X = 90,  PRI_Y = 142
  const STB_X = 350, STB_Y = 142
  const LINE_FROM_Y = 58
  const LINE_TO_Y = 114

  const priColor = status === 'normal' ? '#22d3ee' : '#ef4444'
  const stbColor = status === 'recovered' ? '#10b981' : status === 'failover' ? '#fbbf24' : '#475569'

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="bg-slate-950/80 border border-white/10 rounded-xl flex-1 flex flex-col justify-between relative overflow-hidden min-h-[200px] p-3">
        <svg viewBox="0 0 440 190" className="w-full flex-1" style={{ maxHeight: 190 }}>
          {/* Connection lines */}
          <line x1={DNS_X} y1={LINE_FROM_Y} x2={PRI_X} y2={LINE_TO_Y}
            stroke={priColor} strokeWidth="2.5" strokeLinecap="round"
            style={{ transition: 'stroke 0.3s ease' }}
          />
          <line x1={DNS_X} y1={LINE_FROM_Y} x2={STB_X} y2={LINE_TO_Y}
            stroke={stbColor} strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray={status === 'failover' ? '7 5' : '0'}
            style={{ transition: 'stroke 0.3s ease' }}
          />

          {/* Animated flow dot on active route */}
          {status === 'normal' && (
            <motion.circle r="5" fill="#22d3ee"
              style={{ filter: 'drop-shadow(0 0 5px #22d3ee)' }}
              animate={{ cx: [DNS_X, PRI_X], cy: [LINE_FROM_Y, LINE_TO_Y] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
            />
          )}
          {status === 'recovered' && (
            <motion.circle r="5" fill="#10b981"
              style={{ filter: 'drop-shadow(0 0 5px #10b981)' }}
              animate={{ cx: [DNS_X, STB_X], cy: [LINE_FROM_Y, LINE_TO_Y] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
            />
          )}

          {/* DNS Gateway badge */}
          <rect x="162" y="20" width="116" height="36" rx="8"
            fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
          <text x={DNS_X} y="33" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="700" letterSpacing="0.05em">DNS GATEWAY</text>
          <text x={DNS_X} y="47" textAnchor="middle"
            fill={status === 'outage' ? '#ef4444' : status === 'recovered' ? '#10b981' : '#60a5fa'}
            fontSize="8" fontFamily="Inter,sans-serif" fontWeight="600"
            style={{ transition: 'fill 0.3s ease' }}
          >
            {status === 'normal' ? '→ PRIMARY_VPC' : status === 'outage' ? '✕ FAILING...' : '→ BACKUP_DR_VPC'}
          </text>

          {/* Primary Region box */}
          <rect x="55" y="114" width="70" height="56" rx="8"
            fill={status === 'normal' ? '#083344' : '#450a0a'}
            stroke={status === 'normal' ? '#22d3ee' : '#ef4444'}
            strokeWidth="2"
            style={{ transition: 'fill 0.4s ease, stroke 0.4s ease' }}
          />
          {/* Server icon */}
          <rect x="72" y="122" width="36" height="6" rx="2" fill="none"
            stroke={status === 'normal' ? '#22d3ee' : '#ef4444'} strokeWidth="1.2"
            style={{ transition: 'stroke 0.4s ease' }}
          />
          <rect x="72" y="131" width="36" height="6" rx="2" fill="none"
            stroke={status === 'normal' ? '#06b6d4' : '#dc2626'} strokeWidth="1.2"
            style={{ transition: 'stroke 0.4s ease' }}
          />
          <text x={PRI_X} y="152" textAnchor="middle"
            fill={status === 'normal' ? '#22d3ee' : '#f87171'}
            fontSize="8" fontFamily="Inter,sans-serif" fontWeight="700"
            style={{ transition: 'fill 0.4s ease' }}
          >PRIMARY</text>
          <text x={PRI_X} y="163" textAnchor="middle"
            fill={status === 'normal' ? '#0e7490' : '#b91c1c'}
            fontSize="7" fontFamily="Inter,sans-serif"
            style={{ transition: 'fill 0.4s ease' }}
          >{status === 'normal' ? '● ONLINE' : '✕ CRASHED'}</text>

          {/* Standby DR box */}
          <rect x="315" y="114" width="70" height="56" rx="8"
            fill={status === 'recovered' ? '#052e16' : status === 'failover' ? '#451a03' : '#1e293b'}
            stroke={status === 'recovered' ? '#22c55e' : status === 'failover' ? '#f59e0b' : '#334155'}
            strokeWidth="2"
            style={{ transition: 'fill 0.4s ease, stroke 0.4s ease' }}
          />
          {/* Database icon */}
          <ellipse cx={STB_X} cy="126" rx="17" ry="6" fill="none"
            stroke={status === 'recovered' ? '#22c55e' : status === 'failover' ? '#f59e0b' : '#64748b'}
            strokeWidth="1.2"
            style={{ transition: 'stroke 0.4s ease' }}
          />
          <line x1={STB_X - 17} y1="126" x2={STB_X - 17} y2="142" stroke={status === 'recovered' ? '#22c55e' : status === 'failover' ? '#f59e0b' : '#64748b'} strokeWidth="1.2" style={{ transition: 'stroke 0.4s ease' }}/>
          <line x1={STB_X + 17} y1="126" x2={STB_X + 17} y2="142" stroke={status === 'recovered' ? '#22c55e' : status === 'failover' ? '#f59e0b' : '#64748b'} strokeWidth="1.2" style={{ transition: 'stroke 0.4s ease' }}/>
          <ellipse cx={STB_X} cy="142" rx="17" ry="6" fill="none"
            stroke={status === 'recovered' ? '#22c55e' : status === 'failover' ? '#f59e0b' : '#64748b'}
            strokeWidth="1.2"
            style={{ transition: 'stroke 0.4s ease' }}
          />
          <text x={STB_X} y="157" textAnchor="middle"
            fill={status === 'recovered' ? '#4ade80' : status === 'failover' ? '#fbbf24' : '#94a3b8'}
            fontSize="8" fontFamily="Inter,sans-serif" fontWeight="700"
            style={{ transition: 'fill 0.4s ease' }}
          >{status === 'recovered' ? 'NEW PRIMARY' : 'STANDBY DR'}</text>
          <text x={STB_X} y="163" textAnchor="middle"
            fill={status === 'recovered' ? '#22c55e' : status === 'failover' ? '#d97706' : '#64748b'}
            fontSize="7" fontFamily="Inter,sans-serif"
            style={{ transition: 'fill 0.4s ease' }}
          >{status === 'recovered' ? '● ACTIVE' : status === 'failover' ? '↑ PROMOTING' : '○ SYNCED'}</text>
        </svg>

        {/* Log console */}
        <div className="bg-slate-900/60 border border-white/5 rounded p-2 text-left">
          <p className="text-[9px] font-mono text-slate-400 leading-tight">
            {status === 'normal' && '> Active replica syncing data blocks continuously... RPO: <3s'}
            {status === 'outage' && '> [CRITICAL] Primary regional healthcheck fail! Outage detected.'}
            {status === 'failover' && '> DNS failover runbook triggered... promoting standby db to primary...'}
            {status === 'recovered' && '> [RECOVERED] Failover complete! All clients routed to Backup Region.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <button onClick={triggerOutage} disabled={status !== 'normal'}
          className="py-2.5 rounded-lg border bg-red-950/60 border-red-500/50 hover:bg-red-900 text-red-200 font-bold text-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >Inject Outage</button>
        <button onClick={reset} disabled={status === 'normal'}
          className="py-2.5 rounded-lg border bg-slate-900 border-white/10 hover:bg-slate-800 text-slate-300 font-bold text-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >Reset Environment</button>
      </div>
    </div>
  )
}

// 8. Cloud Security & Compliance — pure SVG
function CloudSecurityDiagram() {
  const [reqType, setReqType] = useState<'safe' | 'attack' | null>(null)
  const [animKey, setAnimKey] = useState(0)

  const handleTrigger = (type: 'safe' | 'attack') => {
    setReqType(type)
    setAnimKey(k => k + 1)
  }

  // viewBox="0 0 440 160"
  // Request node: cx=60,  cy=80
  // WAF node:     cx=220, cy=80  box: x=186 y=55 w=68 h=50
  // Prod DB node: cx=380, cy=80  box: x=348 y=60 w=62 h=40
  // Lines:
  //   Req→WAF: x1=100 y1=80 x2=186 y2=80
  //   WAF→DB:  x1=254 y1=80 x2=348 y2=80
  const REQ_CX = 60, WAF_CX = 220, DB_CX = 380, LINE_Y = 80

  const wafColor = reqType === 'attack' ? '#ef4444' : reqType === 'safe' ? '#22c55e' : '#94a3b8'
  const wafBg    = reqType === 'attack' ? '#450a0a' : reqType === 'safe' ? '#052e16' : '#1e293b'
  const wafBord  = reqType === 'attack' ? '#ef4444' : reqType === 'safe' ? '#22c55e' : '#475569'

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="bg-slate-950/80 border border-white/10 rounded-xl flex-1 flex flex-col justify-between relative overflow-hidden min-h-[200px] p-3">
        <svg viewBox="0 0 440 160" className="w-full flex-1" style={{ maxHeight: 170 }}>
          {/* Connection lines */}
          <line x1="100" y1={LINE_Y} x2="186" y2={LINE_Y} stroke="#334155" strokeWidth="2" strokeLinecap="round"/>
          <line x1="254" y1={LINE_Y} x2="348" y2={LINE_Y} stroke="#334155" strokeWidth="2" strokeLinecap="round"/>

          {/* Safe packet: travels all the way through WAF to DB */}
          {reqType === 'safe' && (
            <motion.circle
              key={`safe-${animKey}`}
              r="5" cy={LINE_Y}
              fill="#10b981"
              style={{ filter: 'drop-shadow(0 0 5px #10b981)' }}
              animate={{ cx: [60, 220, 380] }}
              transition={{ duration: 2, ease: 'easeInOut', times: [0, 0.55, 1] }}
            />
          )}
          {/* Attack packet: stopped at WAF (cx stops at WAF center) */}
          {reqType === 'attack' && (
            <motion.circle
              key={`attack-${animKey}`}
              r="5" cy={LINE_Y}
              fill="#ef4444"
              style={{ filter: 'drop-shadow(0 0 5px #ef4444)' }}
              animate={{ cx: [60, 220] }}
              transition={{ duration: 0.7, ease: 'easeIn' }}
            />
          )}
          {/* WAF shield burst on attack */}
          {reqType === 'attack' && (
            <motion.circle
              key={`burst-${animKey}`}
              cx={WAF_CX} cy={LINE_Y}
              r="0" fill="none" stroke="#ef4444" strokeWidth="2"
              animate={{ r: [0, 40], opacity: [1, 0] }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.65 }}
            />
          )}

          {/* Request node */}
          <circle cx={REQ_CX} cy={LINE_Y} r="36" fill="#1e293b" stroke="#475569" strokeWidth="1.5"/>
          <text x={REQ_CX} y={LINE_Y - 4} textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">HTTP</text>
          <text x={REQ_CX} y={LINE_Y + 9} textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="Inter,sans-serif">Request</text>

          {/* WAF Gateway box */}
          <rect x="186" y="55" width="68" height="50" rx="8"
            fill={wafBg} stroke={wafBord} strokeWidth="2"
            style={{ transition: 'fill 0.3s ease, stroke 0.3s ease' }}
          />
          {/* Shield icon */}
          <path d={`M${WAF_CX},${LINE_Y - 16} L${WAF_CX + 11},${LINE_Y - 12} L${WAF_CX + 11},${LINE_Y - 4} Q${WAF_CX + 11},${LINE_Y + 4} ${WAF_CX},${LINE_Y + 8} Q${WAF_CX - 11},${LINE_Y + 4} ${WAF_CX - 11},${LINE_Y - 4} L${WAF_CX - 11},${LINE_Y - 12} Z`}
            fill="none" stroke={wafColor} strokeWidth="1.5" strokeLinejoin="round"
            style={{ transition: 'stroke 0.3s ease' }}
          />
          <path d={`M${WAF_CX - 5},${LINE_Y - 4} L${WAF_CX - 2},${LINE_Y + 2} L${WAF_CX + 6},${LINE_Y - 8}`}
            fill="none" stroke={wafColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: 'stroke 0.3s ease' }}
          />
          <text x={WAF_CX} y="98" textAnchor="middle"
            fill={wafColor} fontSize="8" fontFamily="Inter,sans-serif" fontWeight="700"
            style={{ transition: 'fill 0.3s ease' }}
          >{reqType === 'attack' ? '⚠ BLOCKED' : reqType === 'safe' ? '✓ PASSED' : 'CLOUD WAF'}</text>

          {/* Prod DB */}
          <rect x="348" y="60" width="62" height="40" rx="8"
            fill={reqType === 'safe' ? '#172554' : '#1e293b'}
            stroke={reqType === 'safe' ? '#3b82f6' : '#334155'}
            strokeWidth="1.5"
            style={{ transition: 'fill 0.4s ease, stroke 0.4s ease' }}
          />
          {/* Lock icon */}
          <rect x={DB_CX - 8} y={LINE_Y - 4} width="16" height="12" rx="2" fill="none"
            stroke={reqType === 'safe' ? '#60a5fa' : '#64748b'} strokeWidth="1.5"
            style={{ transition: 'stroke 0.4s ease' }}
          />
          <path d={`M${DB_CX - 5},${LINE_Y - 4} Q${DB_CX - 5},${LINE_Y - 12} ${DB_CX},${LINE_Y - 12} Q${DB_CX + 5},${LINE_Y - 12} ${DB_CX + 5},${LINE_Y - 4}`}
            fill="none" stroke={reqType === 'safe' ? '#60a5fa' : '#64748b'} strokeWidth="1.5"
            style={{ transition: 'stroke 0.4s ease' }}
          />
          <text x={DB_CX} y="96" textAnchor="middle"
            fill={reqType === 'safe' ? '#60a5fa' : '#64748b'}
            fontSize="8" fontFamily="Inter,sans-serif" fontWeight="700"
            style={{ transition: 'fill 0.4s ease' }}
          >PROD DB</text>
        </svg>

        {/* Security Logs */}
        <div className="bg-slate-900/60 border border-white/5 rounded p-2 text-left">
          <p className="text-[9px] font-mono leading-tight"
            style={{ color: reqType === 'attack' ? '#fca5a5' : reqType === 'safe' ? '#86efac' : '#94a3b8' }}
          >
            {reqType === 'safe' && '> [PASS] GET /users/me/profile — JWT valid. Records fetched from DB.'}
            {reqType === 'attack' && '> [BLOCKED] POST /login — SQL injection detected. Threat IP blacklisted.'}
            {!reqType && '> WAF ruleset active. Awaiting traffic simulation...'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <button onClick={() => handleTrigger('safe')}
          className="py-2.5 rounded-lg border bg-slate-900 border-white/10 hover:bg-slate-800 text-emerald-400 font-bold text-xs transition-all"
        >Send Clean API</button>
        <button onClick={() => handleTrigger('attack')}
          className="py-2.5 rounded-lg border bg-slate-900 border-white/10 hover:bg-slate-800 text-red-400 font-bold text-xs transition-all"
        >Send Malicious SQL</button>
      </div>
    </div>
  )
}

// --- CORE DATA STRUCTURE FOR THE 8 SERVICES ---

interface Service {
  icon: React.ReactNode
  title: string
  problem: string
  solution: string
  gradientFrom: string
  gradientTo: string
  accentColor: string
  glowColor: string
  category: 'deploy' | 'migrate' | 'secure'
  features: string[]
  details: string
  diagramComponent: React.ComponentType
}

const services: Service[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 16v-8" />
        <path d="M9 11l3-3 3 3" />
        <path d="M22 12h-5l-2 3H9l-2-3H2" />
        <path d="M5.5 8.5A5 5 0 0 1 15 8" />
        <path d="M15 8a5 5 0 0 1 3.5 4.5" />
      </svg>
    ),
    title: 'Cloud Deployment',
    problem: 'Build new cloud environments correctly from day one.',
    solution: 'Launch production-grade infrastructure in minutes with automated provisioning, immutable deployments, and built-in best practices that eliminate configuration drift.',
    gradientFrom: '#22d3ee',
    gradientTo: '#3b82f6',
    accentColor: '#22d3ee',
    glowColor: 'rgba(34,211,238,0.2)',
    category: 'deploy',
    features: ['Terraform / OpenTofu IaC', 'GitOps Integration', 'Zero-Downtime Deployments'],
    details: 'We architect and provision highly available cloud environments using Infrastructure as Code (IaC). From VPC design to multi-zone load balancing, your platform is built securely, consistently, and without manual steps, allowing fast and secure code delivery from day one.',
    diagramComponent: CloudDeploymentDiagram
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M5 5h4l4 4" />
        <path d="M19 5h-4l-4 4" />
        <path d="M5 19h4l4-4" />
        <path d="M19 19h-4l-4-4" />
        <path d="M9 5v14" />
        <path d="M15 5v14" />
      </svg>
    ),
    title: 'Cloud Migration',
    problem: 'Migrate existing systems to the cloud with minimal downtime.',
    solution: 'Execute lift-and-shift or re-architecture migrations with automated discovery, phased cutover planning, and real-time replication that keeps your business running.',
    gradientFrom: '#3b82f6',
    gradientTo: '#818cf8',
    accentColor: '#60a5fa',
    glowColor: 'rgba(96,165,250,0.2)',
    category: 'migrate',
    features: ['Zero-Downtime Replication', 'Lift & Shift or Refactor', 'Validation Testing'],
    details: 'Relocate your existing apps, VMs, and data to the cloud with expert planning. We utilize active synchronization and replication to perform final switchovers inside minute-level windows, avoiding business disruption while modernizing your storage and computing setups.',
    diagramComponent: CloudMigrationDiagram
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="8" rx="2" />
        <rect x="2" y="13" width="20" height="8" rx="2" />
        <path d="M6 7h.01" />
        <path d="M6 17h.01" />
      </svg>
    ),
    title: 'Infrastructure Setup & Management',
    problem: 'Manage scalable and reliable infrastructure professionally.',
    solution: 'We design, deploy, and manage cloud environments with auto-scaling, load balancing, and self-healing architectures that adapt to your traffic patterns automatically.',
    gradientFrom: '#34d399',
    gradientTo: '#14b8a6',
    accentColor: '#34d399',
    glowColor: 'rgba(52,211,153,0.2)',
    category: 'migrate',
    features: ['Auto-Scaling Groups', '24/7 Server Management', 'Self-Healing Nodes'],
    details: 'Offload the management of your cloud clusters and server fleets. We setup auto-scaling boundaries and self-healing mechanics, monitoring CPU/memory thresholds to dynamically resize nodes, while performing routine security patches and OS maintenance in the background.',
    diagramComponent: CloudInfrastructureDiagram
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 12a9 9 0 1 1-9-9" />
        <path d="M12 6v6l3 2" />
        <path d="M21 3v6h-6" />
      </svg>
    ),
    title: 'Automation & DevOps',
    problem: 'Accelerate software delivery through automation and DevOps practices.',
    solution: 'Implement CI/CD pipelines, infrastructure-as-code, and automated testing frameworks that reduce deployment cycles from weeks to minutes with zero manual errors.',
    gradientFrom: '#8b5cf6',
    gradientTo: '#ec4899',
    accentColor: '#a78bfa',
    glowColor: 'rgba(167,139,250,0.2)',
    category: 'deploy',
    features: ['Kubernetes Orchestration', 'Automated Testing', 'GitLab / GitHub Actions'],
    details: 'Bridge the gap between development and operations. We implement production-grade container orchestration and continuous integration flows, ensuring code is run through strict static analysis, unit tests, and security scans before automatic cluster deployment.',
    diagramComponent: DevOpsAutomationDiagram
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M22 12h-4l-3 4-4-8-3 4H2" />
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v4" />
        <path d="M12 18v4" />
      </svg>
    ),
    title: 'Cloud Monitoring & Reporting',
    problem: 'Detect and resolve issues before customers are impacted.',
    solution: 'Real-time observability across your entire stack with intelligent alerting, distributed tracing, and custom dashboards that surface anomalies before they become incidents.',
    gradientFrom: '#f43f5e',
    gradientTo: '#f97316',
    accentColor: '#f43f5e',
    glowColor: 'rgba(244,63,94,0.2)',
    category: 'secure',
    features: ['APM Request Tracing', 'Custom Grafana Panels', 'Predictive Slack Alerting'],
    details: 'Obtain complete visibility across your frontend, backend, databases, and container pods. We configure unified logging, alert triggers for anomalous traffic, and custom business dashboards so you know exactly when and why latency or failure rates spike.',
    diagramComponent: CloudMonitoringDiagram
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2v20" />
        <path d="M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        <path d="M6 17h2" />
      </svg>
    ),
    title: 'Cloud Cost Optimization',
    problem: 'Reduce unnecessary cloud spending and improve efficiency.',
    solution: 'Continuous cost analysis with automated rightsizing, reserved instance optimization, and granular resource tagging that identifies savings opportunities across your entire cloud footprint.',
    gradientFrom: '#f59e0b',
    gradientTo: '#eab308',
    accentColor: '#fbbf24',
    glowColor: 'rgba(251,191,36,0.2)',
    category: 'secure',
    features: ['Idle Resource Shutdown', 'AWS Savings Plans Mapping', 'FinOps Right-sizing Audit'],
    details: 'Avoid runaway cloud bills. We review your resources hourly, establishing automated shutdown schedules for dev/staging environments, identifying oversized VM instances to downsize, and mapping reserved capacity plans that slice your monthly bill by up to 50%.',
    diagramComponent: CloudCostDiagram
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V5l7-3z" />
        <path d="M9 12l2 2 4-4" />
        <path d="M6 17l-2 3" />
        <path d="M18 17l2 3" />
      </svg>
    ),
    title: 'Backup & Disaster Recovery',
    problem: 'Protect critical business data and ensure business continuity.',
    solution: 'Automated, encrypted backups with point-in-time recovery, cross-region replication, and tested DR runbooks that guarantee RPO and RTO compliance for any scenario.',
    gradientFrom: '#14b8a6',
    gradientTo: '#22d3ee',
    accentColor: '#22d3ee',
    glowColor: 'rgba(34,211,238,0.2)',
    category: 'migrate',
    features: ['Active Cross-Region Sync', 'Continuous Snapshot Backups', 'Automated Failover Drills'],
    details: 'Secure your business operations against any localized failure. We setup continuous database backups with RPO under 1 minute and build active cross-region disaster recovery runbooks that guarantee systems recover automatically within minutes during outages.',
    diagramComponent: CloudDRDiagram
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" />
      </svg>
    ),
    title: 'Cloud Security & Compliance',
    problem: 'Maintain strong security posture and compliance readiness.',
    solution: 'Zero-trust architecture with continuous compliance monitoring, automated threat detection, and policy-as-code enforcement that meets SOC 2, HIPAA, and GDPR standards.',
    gradientFrom: '#22c55e',
    gradientTo: '#06b6d4',
    accentColor: '#4ade80',
    glowColor: 'rgba(74,222,128,0.2)',
    category: 'secure',
    features: ['WAF Shield & DDoS Shielding', 'Strict IAM Role Auditing', 'SOC2 Compliance Setup'],
    details: 'Implement a zero-trust architecture. We set up active firewalls, isolate databases in private subnets, apply strictly audited role-based access policies (IAM), and integrate automated continuous compliance checks to maintain compliance readiness year-round.',
    diagramComponent: CloudSecurityDiagram
  }
]

// --- INNER CARD COMPONENT (WITH CURSOR TRACKING GLOW) ---

function ServiceCard({
  service,
  index,
  onOpenDetails
}: {
  service: Service
  index: number
  onOpenDetails: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  // Ref on the inner .srv-card div — this is the element the spotlight lives inside,
  // so coords must be relative to IT, not the outer motion wrapper.
  const cardRef = React.useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    // Set vars directly on the card element so the CSS radial-gradient reads them
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 15 }}
      transition={{
        opacity: { duration: 0.2 },
        layout: { type: 'spring', stiffness: 350, damping: 30 },
        scale: { duration: 0.25 },
        y: { type: 'spring', stiffness: 350, damping: 30 }
      }}
      className="srv-card-wrapper"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        // Reset so there's no stale glow position after leaving
        if (cardRef.current) {
          cardRef.current.style.setProperty('--mouse-x', '-9999px')
          cardRef.current.style.setProperty('--mouse-y', '-9999px')
        }
      }}
    >
      <div
        ref={cardRef}
        className={`srv-card group ${isHovered ? 'srv-hovered' : ''}`}
        style={{
          '--accent-color': service.accentColor,
          '--glow-color': service.glowColor,
          '--grad-from': service.gradientFrom,
          '--grad-to': service.gradientTo,
          '--mouse-x': '-9999px',
          '--mouse-y': '-9999px',
        } as React.CSSProperties}
      >
        {/* Cursor tracking spotlight — reads --mouse-x/y from THIS div */}
        <div className="srv-card-spotlight" />

        {/* Top colorful gradient highlight bar */}
        <div className="srv-card-top-glow" />

        {/* Ambient glow behind card */}
        <div className="srv-card-bg-glow" />

        {/* Card Header area */}
        <div className="srv-card-header">
          <div className="srv-icon-box">
            {service.icon}
          </div>
          <h3 className="srv-card-title">{service.title}</h3>
        </div>

        {/* Pain Point Section */}
        <div className="srv-pain-box">
          <div className="srv-pain-label flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-red-500/80 group-hover:text-[var(--accent-color)] transition-colors duration-300" />
            Pain Point
          </div>
          <p className="srv-pain-text">&ldquo;{service.problem}&rdquo;</p>
        </div>

        {/* Solution Body */}
        <p className="srv-solution-text">{service.solution}</p>

        {/* Key Features List inside card */}
        <div className="mt-auto mb-4 text-left">
          <ul className="space-y-1.5">
            {service.features.map((feat, fIdx) => (
              <li key={fIdx} className="flex items-center gap-1.5 text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                <Check className="w-3 h-3 text-[var(--accent-color)] flex-shrink-0" />
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Link Footer (Commented out to hide for now. Uncomment the block below to show it again) */}
        {/*
        <div className="srv-card-footer">
          <button onClick={onOpenDetails} className="srv-learn-more cursor-pointer w-full text-left">
            <span>View Interactive Architecture</span>
            <ArrowRight className="w-3.5 h-3.5 srv-arrow-icon" />
          </button>
        </div>
        */}
      </div>
    </motion.div>
  )
}

// --- MAIN PORTFOLIO COMPONENT ---

export default function Services() {
  const headerRef = useReveal<HTMLDivElement>(0.1, 'visible')
  const [activeTab, setActiveTab] = useState<'all' | 'deploy' | 'migrate' | 'secure'>('all')
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  // Filter services list
  const filteredServices = services.filter((srv) => {
    if (activeTab === 'all') return true
    return srv.category === activeTab
  })

  // Prevent background scrolling when modal is active
  React.useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedService])

  const DiagramComponent = selectedService?.diagramComponent

  return (
    <section id="services" className="srv-section" aria-labelledby="services-heading">
      {/* Decorative Grid Patterns & Ambient Light */}
      <div className="srv-dot-pattern" aria-hidden="true" />
      <div className="srv-glow-top-right" aria-hidden="true" />
      <div className="srv-glow-bottom-left" aria-hidden="true" />

      {/* Animated Flowing Line */}
      <div className="srv-divider-line" aria-hidden="true" />

      <div className="srv-container px-4 sm:px-6">
        <header ref={headerRef} className="srv-header reveal">
          <span className="srv-badge">
            <span className="srv-badge-dot" aria-hidden="true" />
            Our Services
          </span>

          <h2 id="services-heading" className="srv-title">
            Comprehensive cloud services{' '}
            <span className="srv-title-gradient">
              built for scale
            </span>
          </h2>

          <p className="srv-subtitle">
            From migration to managed infrastructure, security to cost optimization — we deliver enterprise-grade cloud solutions that align technology with business outcomes.
          </p>
        </header>

        {/* Categories Tab Selector */}
        <div className="flex justify-center mb-10 max-w-lg mx-auto bg-slate-950/80 border border-white/5 p-1 rounded-full relative z-20">
          {(['all', 'deploy', 'migrate', 'secure'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 relative ${
                activeTab === tab
                  ? 'text-cyan-400 z-10 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-slate-900 border border-white/10 rounded-full z-[-1]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {tab === 'all'
                ? 'All Services'
                : tab === 'deploy'
                ? 'Deploy & DevOps'
                : tab === 'migrate'
                ? 'Migration & Ops'
                : 'Security & Costs'}
            </button>
          ))}
        </div>

        {/* Services Bento Grid */}
        <div className="srv-grid-wrapper relative z-10">
          <motion.div layout className="srv-grid">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, i) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  index={i}
                  onOpenDetails={() => setSelectedService(service)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* --- PREMIUM INTERACTIVE DRAWER / MODAL OVERLAY --- */}
      <AnimatePresence>
        {selectedService && DiagramComponent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark glass backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-zoom-out"
            />

            {/* Modal Box wrapper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-slate-900/90 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] relative z-50 flex flex-col md:flex-row"
            >
              {/* Left Side: Service Details Info */}
              <div className="p-6 md:p-8 flex-1 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center border text-white"
                      style={{
                        borderColor: selectedService.accentColor,
                        background: `radial-gradient(circle, ${selectedService.glowColor} 0%, transparent 100%)`
                      }}
                    >
                      {selectedService.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-black tracking-tight text-white">{selectedService.title}</h3>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {selectedService.details}
                  </p>

                  {/* Pain point callout in modal */}
                  <div className="bg-slate-950/60 border border-red-500/20 rounded-xl p-4 mb-6">
                    <span className="text-[10px] font-bold tracking-widest text-red-400 uppercase flex items-center gap-1.5 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                      Client Pain Point
                    </span>
                    <p className="text-slate-300 italic text-xs leading-relaxed">
                      &ldquo;{selectedService.problem}&rdquo;
                    </p>
                  </div>

                  {/* Core checklist */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-3">Service Capabilities</h4>
                    <ul className="space-y-2">
                      {selectedService.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-slate-300 text-xs">
                          <div className="w-4 h-4 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-cyan-400" />
                          </div>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-slate-500 font-mono">
                  <span>Cloud Axis Catalog v2</span>
                  <span>Secure & Reliable</span>
                </div>
              </div>

              {/* Right Side: Interactive Live Diagram Canvas */}
              <div className="p-6 md:p-8 flex-1 bg-slate-950/40 flex flex-col justify-between">
                <div className="mb-4 text-left">
                  <span className="text-[9px] font-mono tracking-widest text-cyan-400 uppercase block mb-1">Interactive Sandbox</span>
                  <h4 className="text-base font-bold text-white leading-tight">Live Architectural Workflow</h4>
                  <p className="text-xs text-slate-500 mt-1">Interact with the controls below to simulate active cloud processes.</p>
                </div>

                {/* Live Sandbox Render Area */}
                <div className="flex-1 flex flex-col justify-center min-h-[260px]">
                  <DiagramComponent />
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-950/80 border border-white/10 hover:border-white/20 p-2 rounded-full transition-all duration-300 hover:rotate-90 z-25 cursor-pointer"
                aria-label="Close detailed view"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
