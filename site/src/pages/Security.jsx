import React from 'react'
import ChapterLayout from '../components/ChapterLayout'
import Callout from '../components/Callout'
import FunFact from '../components/FunFact'
import GifCard from '../components/GifCard'
import AnalogyCard from '../components/AnalogyCard'
import QuizLevels from '../components/QuizLevels'
import ChapterExercise from '../components/ChapterExercise'
import { ANALOGIES } from '../data/chapters'
import { QUIZZES } from '../data/quizzes'
import { OPCUA_CHAPTER_EXERCISES } from '../data/chapterExercises'

export default function Security() {
  return (
    <ChapterLayout
      chapterId="security"
      title="Security & Certificates"
      emoji="🔐"
      prev="services"
      next="subscriptions"
    >
      <p>
        OPC UA has a well-designed security architecture — mutual certificate authentication, encrypted sessions,
        signed messages. The problem is implementation rate. The vast majority of OPC UA deployments in production
        run SecurityMode=None because configuring certificates is hard, the deadline was yesterday, and someone
        will "fix it later." They won't.
      </p>

      <Callout type="warning" title="SecurityMode=None Is Unacceptable on a Production Network">
        SecurityMode=None means all OPC UA traffic is unencrypted and unsigned. Anyone on the network can read
        your process data and replay messages. If your OPC UA server is accessible from outside the control network,
        this is a critical vulnerability. Not a checkbox item — a critical vulnerability.
      </Callout>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">Security Modes</h2>

      <div className="space-y-4 mt-4">
        {[
          {
            mode: 'SecurityMode=None',
            color: 'bg-red-500/100/10 border-red-500/25',
            label: 'text-red-400',
            desc: 'No security. Messages are not signed or encrypted. Any device on the network can read all traffic. No certificates required on either side.',
            useCase: 'Development, isolated test networks, legacy device compatibility. Never production.',
          },
          {
            mode: 'SecurityMode=Sign',
            color: 'bg-amber-500/100/10 border-amber-500/25',
            label: 'text-amber-400',
            desc: 'Messages are digitally signed. The receiver can verify message integrity and sender identity. Messages are NOT encrypted — content is readable.',
            useCase: 'When you need message integrity verification but can tolerate readable traffic (uncommon).',
          },
          {
            mode: 'SecurityMode=SignAndEncrypt',
            color: 'bg-green-500/100/10 border-green-500/25',
            label: 'text-green-400',
            desc: 'Messages are both signed and encrypted. This is the correct mode for production systems. Requires valid certificates on both client and server.',
            useCase: 'All production deployments. This is the only acceptable mode on an accessible network.',
          },
        ].map(({ mode, color, label, desc, useCase }) => (
          <div key={mode} className={`p-5 rounded-xl border ${color}`}>
            <div className={`font-bold font-mono text-sm mb-2 ${label}`}>{mode}</div>
            <p className="text-sm text-slate-300 mb-2">{desc}</p>
            <div className="text-xs text-slate-500"><span className="font-semibold">Use when:</span> {useCase}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">Security Policies</h2>
      <p>
        SecurityPolicy defines the cryptographic algorithms used for signing and encrypting. Common policies:
      </p>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy-700 text-white">
              <th className="px-4 py-3 text-left rounded-tl-xl">Policy</th>
              <th className="px-4 py-3 text-left">Signing</th>
              <th className="px-4 py-3 text-left">Encryption</th>
              <th className="px-4 py-3 text-left rounded-tr-xl">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['None', 'None', 'None', 'Only valid with SecurityMode=None'],
              ['Basic128Rsa15', 'HMAC-SHA1', 'AES-128', 'Deprecated — SHA1 is broken'],
              ['Basic256', 'HMAC-SHA1', 'AES-256', 'Deprecated — SHA1 is broken'],
              ['Basic256Sha256', 'HMAC-SHA256', 'AES-256', 'Current minimum acceptable standard'],
              ['Aes128_Sha256_RsaOaep', 'SHA256', 'AES-128', 'Current — use for constrained devices'],
              ['Aes256_Sha256_RsaPss', 'SHA256+RSA-PSS', 'AES-256', 'Current — highest security'],
            ].map(([policy, signing, enc, status], i) => (
              <tr key={policy} className={i % 2 === 0 ? 'bg-white/5/5' : ''}>
                <td className="px-4 py-3 font-mono font-bold text-xs text-mblue-600">{policy}</td>
                <td className="px-4 py-3 text-xs text-slate-400">{signing}</td>
                <td className="px-4 py-3 text-xs text-slate-400">{enc}</td>
                <td className={`px-4 py-3 text-xs font-medium ${status.includes('Deprecated') ? 'text-red-400' : status.includes('minimum') ? 'text-amber-400' : status.includes('None') ? 'text-slate-400' : 'text-green-400'}`}>{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">Application Instance Certificates</h2>
      <p>
        Every OPC UA application — client or server — has an Application Instance Certificate. This is an X.509
        certificate that uniquely identifies the application instance. Unlike web TLS where only the server has
        a certificate, OPC UA uses mutual authentication: both client and server present certificates.
      </p>

      <div className="mt-4 space-y-3">
        {[
          { step: '1', title: 'Server generates certificate', desc: 'On first startup, the server generates a self-signed X.509 certificate with its application URI in the Subject Alternative Name.' },
          { step: '2', title: 'Client connects and receives server cert', desc: 'During OpenSecureChannel, the server sends its certificate. The client checks its trusted store.' },
          { step: '3', title: 'Client presents its own certificate', desc: 'For mutual auth (Sign/SignAndEncrypt), the client also sends its certificate. The server checks its trusted store.' },
          { step: '4', title: 'Trust must be explicit on both sides', desc: 'If either side hasn\'t explicitly trusted the other\'s certificate, the connection fails with BadCertificateUntrusted.' },
        ].map(({ step, title, desc }) => (
          <div key={step} className="flex gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex-shrink-0 w-8 h-8 bg-mblue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">{step}</div>
            <div>
              <div className="font-semibold text-slate-200 text-sm">{title}</div>
              <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <Callout type="field" title="Self-Signed vs CA-Signed Certificates">
        Most OPC UA deployments use self-signed certificates — each application generates its own. This is fine for
        isolated OT networks. For enterprise environments or systems connected to IT infrastructure, a PKI with a
        Certificate Authority is better. Ignition supports both. The SEL RTAC generates self-signed certificates.
        You must manually trust them on the client side.
      </Callout>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">User Authentication</h2>
      <p>
        Separate from application certificates, OPC UA also authenticates the user within a Session.
        Three token types:
      </p>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {[
          { type: 'Anonymous', desc: 'No credentials. Server decides what access level to grant. Often used in development. Fine for read-only public data.', risk: 'High' },
          { type: 'Username/Password', desc: 'Classic credential pair. Transmitted over the Secure Channel — encrypted if SecurityMode=SignAndEncrypt, plaintext if None.', risk: 'Medium' },
          { type: 'X.509 Certificate', desc: 'User presents a certificate as identity. The most secure option. Requires per-user certificate management.', risk: 'Low' },
        ].map(({ type, desc, risk }) => (
          <div key={type} className={`p-4 rounded-xl border ${risk === 'High' ? 'border-red-500/30 bg-red-500/100/10' : risk === 'Medium' ? 'border-amber-500/30 bg-amber-500/100/10' : 'border-green-500/30 bg-green-500/100/10'}`}>
            <div className="font-bold text-slate-200 text-sm mb-1">{type}</div>
            <div className="text-xs text-slate-400 mb-2">{desc}</div>
            <div className={`text-xs font-bold ${risk === 'High' ? 'text-red-400' : risk === 'Medium' ? 'text-amber-400' : 'text-green-400'}`}>Risk: {risk}</div>
          </div>
        ))}
      </div>

      <GifCard gifKey="warning" caption="SecurityMode=None on a production network"
      />

      <FunFact index={4} />

      <AnalogyCard analogy={ANALOGIES.security} />

      {QUIZZES.security && QUIZZES.security.length > 0 && (
        <QuizLevels chapterId="security" />
      )}
      <ChapterExercise exercise={OPCUA_CHAPTER_EXERCISES.security} />
    </ChapterLayout>
  )
}
