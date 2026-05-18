import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Zap, Award, Clock, ArrowRight, Globe, Plug, Shield, Lock, CheckCircle2, Layers, FolderTree, Bell, Radio, Network, Settings, Wrench, FlaskConical } from 'lucide-react'
import { useProgress } from '../hooks/useProgress'
import { CHAPTERS } from '../data/chapters'
import GifCard from '../components/GifCard'
import TrainingPanel from '../components/TrainingPanel'

const COMMIT_KEY = 'opcua_committed'
const LAST_VISIT_KEY = 'opcua_last_visit'
const BANNER_SHOWN_KEY = 'opcua_banner_shown'

function getFreshStartMessage() {
  const lastVisit = parseInt(localStorage.getItem(LAST_VISIT_KEY) || '0', 10)
  const lastBanner = parseInt(localStorage.getItem(BANNER_SHOWN_KEY) || '0', 10)
  const now = Date.now()
  const daysSince = (now - lastVisit) / 86400000
  const hoursSinceBanner = (now - lastBanner) / 3600000
  if (hoursSinceBanner < 48) return null
  const d = new Date()
  const isMonday = d.getDay() === 1
  const isFirstOfMonth = d.getDate() === 1
  if (daysSince >= 5 || isMonday || isFirstOfMonth) {
    localStorage.setItem(BANNER_SHOWN_KEY, String(now))
    if (isMonday) return "New week — engineers who study consistently master protocols 3× faster."
    if (isFirstOfMonth) return "New month, fresh start — what will you finish before it ends?"
    return "Welcome back — pick up where you left off. Your OPC UA progress is exactly where you left it."
  }
  return null
}

const ICON_MAP = { BookOpen, Globe, Shield, Lock, Zap, Plug, Layers, FolderTree, Bell, Radio, Network, Settings, Wrench, FlaskConical }

const STATS = [
  { icon: BookOpen, label: '10 Chapters', sub: 'Spec to production' },
  { icon: Zap,      label: '30+ Quizzes', sub: 'Test yourself' },
  { icon: Clock,    label: '~4 Hours',    sub: 'Total study time' },
  { icon: Award,    label: 'Cert Paths',  sub: 'GICSP & beyond' },
]

const HERO_OPTIONS = [
  { id: '077i6AULCXc0FKTj9s',  caption: `The OPC UA address space: every node connected to everything.`, tooltip: `OPC UA's address space is a browsable object graph — variables, methods, objects, and types all have defined relationships. Unlike Modbus register maps you must know in advance, a UA server describes its own data. You can browse and discover it at runtime.` },
  { id: 'xT0xeJpnrWC4XWblEk',  caption: `When you finally understand OPC UA's security model.`,          tooltip: `OPC UA has message-level signing AND encryption, X.509 certificates, and role-based access control — all defined in the protocol spec. It is the first widely-deployed industrial protocol where security was designed in from the start, not patched on after a breach.` },
  { id: '3oEjHFOscgNwdSRRDy',  caption: `Publishing interval, sampling rate, queue size. UA has opinions.`, tooltip: `OPC UA subscriptions have three separate timing parameters: how often the server samples the variable, how often it sends updates, and how many changes to buffer between sends. Modbus has none of these. Pick your protocol carefully.` },
  { id: 'NSzHiAwAcazs7dcDr9',  caption: `Browsing the UA address space for the first time.`,             tooltip: `Unlike Modbus (you must know addresses in advance) and DNP3 (a fixed object model), OPC UA lets you browse the server address space at runtime and discover what data exists. Self-describing systems aren't magic — they just feel like it the first time.` },
  { id: '3oKIPtjElfqwMOTbH2',        caption: `OPC UA server passes the CTT compliance test. Ship it.`,        tooltip: `The OPC Foundation Compliance Test Tool (CTT) is the gatekeeper of UA interoperability. Passing it means sessions, subscriptions, security, and discovery all work correctly. Failing means you're not OPC UA-compliant, regardless of what the marketing says.` },
]
export default function Home() {
  const { overallProgress, getChapterStatus, reset } = useProgress()
  const [heroIdx] = useState(() => Math.floor(Math.random() * HERO_OPTIONS.length))
  const [committed, setCommitted] = useState(() => !!localStorage.getItem(COMMIT_KEY))
  const [freshMsg] = useState(() => getFreshStartMessage())
  const [streak] = useState(() => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
      const lastDate = localStorage.getItem('opcua_streak_date') || ''
      const cur = parseInt(localStorage.getItem('opcua_streak') || '0', 10)
      if (lastDate === today) return cur
      const next = lastDate === yesterday ? cur + 1 : 1
      localStorage.setItem('opcua_streak', String(next))
      localStorage.setItem('opcua_streak_date', today)
      return next
    } catch { return 1 }
  })
  const prog = overallProgress()

  // Track last visit for Fresh Start Effect
  useState(() => { localStorage.setItem(LAST_VISIT_KEY, String(Date.now())) })

  const chaptersOnly = CHAPTERS.filter(c => c.id !== 'home' && c.id !== 'flashcards')

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

  function handleCommit() {
    localStorage.setItem(COMMIT_KEY, '1')
    setCommitted(true)
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl mx-auto py-10 px-4 space-y-10">

      {/* Fresh Start Effect banner */}
      {freshMsg && (
        <motion.div variants={item}
          className="rounded-xl px-4 py-3 text-sm flex items-center gap-3"
          style={{ background: 'rgba(45,212,191,0.07)', border: '1px solid rgba(45,212,191,0.2)' }}
        >
          <span style={{ color: '#2dd4bf' }}>↺</span>
          <span style={{ color: 'rgba(45,212,191,0.8)' }}>{freshMsg}</span>
        </motion.div>
      )}

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
                {prog.visited > 0 ? 'Continue Learning' : 'Start Learning'} <ArrowRight size={16} />
              </Link>
              {prog.pct > 0 && <Link to="/lab" className="btn-secondary">Practice Lab</Link>}
            </div>

            {!committed && prog.visited === 0 && (
              <button
                onClick={handleCommit}
                className="mt-4 flex items-center gap-2 text-sm transition-all hover:opacity-90"
                style={{ color: 'rgba(45,212,191,0.6)' }}
              >
                <div className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: 'rgba(45,212,191,0.4)' }} />
                I commit to finishing this course
              </button>
            )}
            {committed && prog.visited === 0 && (
              <div className="mt-4 flex items-center gap-2 text-sm" style={{ color: 'rgba(45,212,191,0.55)' }}>
                <CheckCircle2 size={14} style={{ color: '#2dd4bf' }} />
                <span>Committed. Chapter 1 is waiting.</span>
              </div>
            )}
          </div>
          <div className="flex-shrink-0">
            <GifCard gifId={HERO_OPTIONS[heroIdx].id} caption={HERO_OPTIONS[heroIdx].caption} tooltip={HERO_OPTIONS[heroIdx].tooltip} side="right" />
          </div>
        </div>
      </motion.div>

      {/* Progress — always shown */}
      <motion.div variants={item} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        {streak > 1 && (
          <div className="flex items-center gap-2 mb-3 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span>🔥</span>
            <span className="font-bold text-sm" style={{ color: '#f97316' }}>{streak}-day streak</span>
            <span className="text-xs" style={{ color: 'rgba(249,115,22,0.45)' }}>
              {streak >= 7 ? '— elite consistency' : streak >= 3 ? '— keep the chain going' : "— don't break it"}
            </span>
          </div>
        )}
        {prog.visited === 0 ? (
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-200 mb-1">Your Learning Journey</div>
              <div className="text-sm text-slate-500">10 chapters · ~4 hours · starts with one click</div>
            </div>
            <Link to="/intro" className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all"
              style={{ background: 'rgba(45,212,191,0.1)', color: '#2dd4bf', border: '1px solid rgba(45,212,191,0.2)' }}>
              Begin Ch 1 <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-100">
                {prog.pct >= 80 ? 'Almost there — keep going' : prog.pct >= 40 ? "Good momentum — don't stop now" : "You've started — finish what you started"}
              </h3>
              <button onClick={reset} className="text-xs text-slate-600 hover:text-red-400 transition-colors">Reset</button>
            </div>
            <div className="h-3 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #2dd4bf, #06b6d4)' }} initial={{ width: 0 }} animate={{ width: `${prog.pct}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">{prog.visited}/{prog.total} chapters read</span>
              <span className="font-bold" style={{ color: '#2dd4bf' }}>{prog.pct}% complete</span>
              <span className="text-slate-500">{prog.quizzes}/{prog.total} quizzes passed</span>
            </div>
          </>
        )}
      </motion.div>

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

      {/* Chapter grid — 4-dot progress */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-mblue-600">Chapters</h2>
          {prog.visited > 0 && (
            <span className="text-xs text-slate-500">
              {chaptersOnly.filter(ch => getChapterStatus(ch.id).visited).length} of {chaptersOnly.length} visited
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {chaptersOnly.map((ch) => {
            const ChIcon = ICON_MAP[ch.icon] || BookOpen
            const status = getChapterStatus(ch.id)
            const allFour = status.level1Passed && status.level2Passed && status.level3Passed && status.level4Passed
            return (
              <Link key={ch.id} to={ch.path} className="card flex items-center gap-4 hover:border-mblue-200 hover:shadow-md transition-all group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: allFour
                      ? 'rgba(74,222,128,0.15)'
                      : status.visited
                        ? 'rgba(45,212,191,0.12)'
                        : 'rgba(59,130,246,0.08)',
                  }}>
                  <ChIcon size={20} style={{ color: allFour ? '#4ade80' : status.visited ? '#2dd4bf' : '#60a5fa' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-100 group-hover:text-mblue-600 transition-colors truncate">{ch.label}</div>
                  {status.visited && (
                    <div className="flex items-center gap-1 mt-1">
                      {[
                        { key: 'level1Passed', color: '#34d399' },
                        { key: 'level2Passed', color: '#fbbf24' },
                        { key: 'level3Passed', color: '#f87171' },
                        { key: 'level4Passed', color: '#4ade80' },
                      ].map((dot) => (
                        <div key={dot.key} className="w-1.5 h-1.5 rounded-full"
                          style={{ background: status[dot.key] ? dot.color : 'rgba(255,255,255,0.12)' }} />
                      ))}
                      <span className="text-xs ml-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        {allFour ? 'complete' : 'in progress'}
                      </span>
                    </div>
                  )}
                </div>
                {allFour
                  ? <CheckCircle2 size={16} style={{ color: '#4ade80' }} className="flex-shrink-0" />
                  : <ArrowRight size={16} className="text-slate-300 group-hover:text-mblue-400 transition-colors flex-shrink-0" />
                }
              </Link>
            )
          })}
        </div>
      </motion.div>

      {/* Training */}
      <motion.div variants={item}>
        <TrainingPanel course="opcua" />
      </motion.div>

      {/* Footer motivator — loss framing when in progress */}
      <motion.div variants={item} className="text-center py-4">
        {prog.visited > 0 && prog.pct < 100 ? (
          <p className="text-slate-400 text-sm italic">
            "{chaptersOnly.length - prog.visited} chapters left to finish. Don't leave them unread."
          </p>
        ) : prog.pct === 100 ? (
          <p className="text-slate-400 text-sm italic">
            "You finished. OPC UA is the backbone of modern IIoT. You now speak it fluently."
          </p>
        ) : (
          <p className="text-slate-400 text-sm italic">
            "OPC Classic worked fine until it didn't. OPC UA just works — and tells you why when it doesn't."
          </p>
        )}
      </motion.div>
    </motion.div>
  )
}
