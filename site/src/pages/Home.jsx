import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Zap, Award, Clock, ArrowRight, Globe, Plug, Shield, Lock } from 'lucide-react'
import { useProgress } from '../hooks/useProgress'
import { CHAPTERS } from '../data/chapters'
import GifCard from '../components/GifCard'
import TrainingPanel from '../components/TrainingPanel'

const ICON_MAP = { BookOpen, Globe, Shield, Lock, Zap, Plug }

const STATS = [
  { icon: BookOpen, label: '10 Chapters', sub: 'Spec to production' },
  { icon: Zap,      label: '30+ Quizzes', sub: 'Test yourself' },
  { icon: Clock,    label: '~4 Hours',    sub: 'Total study time' },
  { icon: Award,    label: 'Cert Paths',  sub: 'GICSP & beyond' },
]

export default function Home() {
  const { overallProgress, reset } = useProgress()
  const prog = overallProgress()

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl mx-auto py-10 px-4 space-y-10">

      {/* Hero */}
      <motion.div variants={item} className="text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-black text-slate-100 leading-tight mb-4">
              OPC UA<br />
              <span className="text-mblue-600">Made Modern.</span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed max-w-md">
              The protocol designed to kill OPC Classic — platform-independent, encrypted,
              and actually structured. No COM/DCOM required.
            </p>
            <div className="flex gap-3 mt-6">
              <Link to="/intro" className="btn-primary flex items-center gap-2">
                Start Learning <ArrowRight size={16} />
              </Link>
              {prog.pct > 0 && <Link to="/lab" className="btn-secondary">Practice Lab</Link>}
            </div>
          </div>
          <div className="flex-shrink-0">
            <GifCard gifKey="courseHero" caption="The universal translator of industrial protocols." side="right" tooltip="OPC UA speaks Siemens, Rockwell, Beckhoff, ABB, and any PLC that wants to join the conversation. It's the Rosetta Stone for factory floors — and unlike OPC Classic, it actually has security built in." />
          </div>
        </div>
      </motion.div>

      {/* Progress */}
      {prog.pct > 0 && (
        <motion.div variants={item} className="card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-100">Your Progress</h3>
            <button onClick={reset} className="text-xs text-slate-400 hover:text-red-400 transition-colors">Reset</button>
          </div>
          <div className="h-3 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div className="h-full bg-mblue-600 rounded-full" initial={{ width: 0 }} animate={{ width: `${prog.pct}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} />
          </div>
          <div className="flex justify-between text-sm text-slate-500">
            <span>{prog.visited}/{prog.total} chapters read</span>
            <span className="font-bold text-mblue-600">{prog.pct}% complete</span>
            <span>{prog.quizzes}/{prog.total} quizzes passed</span>
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <div key={i} className="card text-center">
            <div className="w-10 h-10 bg-mblue-50 rounded-xl flex items-center justify-center mx-auto mb-2">
              <s.icon size={20} className="text-mblue-600" />
            </div>
            <div className="font-bold text-slate-100">{s.label}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </motion.div>

      {/* Why it matters */}
      <motion.div variants={item} className="bg-gradient-to-r from-navy-700 to-mblue-700 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><Globe size={20} className="flex-shrink-0" /> Why OPC UA Is the Backbone of Modern IIoT</h2>
            <ul className="text-sm text-blue-100 space-y-1 list-none">
              <li className="flex items-center gap-2"><Plug size={13} className="flex-shrink-0" /> Supported by every major vendor — Siemens, Rockwell, Beckhoff, ABB, Ignition</li>
              <li className="flex items-center gap-2"><Shield size={13} className="flex-shrink-0" /> Built-in mutual authentication and encryption — unlike anything before it</li>
              <li className="flex items-center gap-2"><Globe size={13} className="flex-shrink-0" /> Platform-independent — runs on Windows, Linux, embedded ARM, and microcontrollers</li>
              <li className="flex items-center gap-2"><Lock size={13} className="flex-shrink-0" /> Knowing OPC UA means reading the IIoT future before it ships</li>
            </ul>
          </div>
          <div className="flex-shrink-0 text-center">
            <div className="text-5xl font-black text-amber-400">2008</div>
            <div className="text-blue-200 text-sm">Year OPC UA shipped</div>
            <div className="text-xs text-blue-300 mt-1">Still the standard in 2026</div>
          </div>
        </div>
      </motion.div>

      {/* Chapter grid */}
      <motion.div variants={item}>
        <h2 className="text-xl font-bold text-mblue-600 mb-4">Chapters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CHAPTERS.filter(c => c.id !== 'home' && c.id !== 'flashcards').map((ch) => (
            <Link key={ch.id} to={ch.path} className="card flex items-center gap-4 hover:border-mblue-200 hover:shadow-md transition-all group">
              <div className="w-10 h-10 rounded-xl bg-mblue-50 flex items-center justify-center flex-shrink-0">
                <BookOpen size={20} className="text-mblue-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-100 group-hover:text-mblue-600 transition-colors">{ch.label}</div>
              </div>
              <ArrowRight size={16} className="text-slate-300 group-hover:text-mblue-400 transition-colors" />
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Training */}
      <motion.div variants={item}>
        <TrainingPanel course="opcua" />
      </motion.div>

      {/* Footer */}
      <motion.div variants={item} className="text-center py-4">
        <p className="text-slate-400 text-sm italic">
          "OPC Classic worked fine until it didn't. OPC UA just works — and tells you why when it doesn't."
        </p>
      </motion.div>
    </motion.div>
  )
}
