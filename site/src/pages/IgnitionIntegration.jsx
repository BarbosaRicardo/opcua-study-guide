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

export default function IgnitionIntegration() {
  return (
    <ChapterLayout
      chapterId="ignition"
      title="OPC UA in Ignition & RTAC"
      emoji="⚙️"
      prev="transport"
      next="troubleshoot"
    >
      <p>
        Ignition is simultaneously an OPC UA server and an OPC UA client. As a server, it exposes the Ignition
        tag database to external OPC UA clients. As a client, it connects to PLC and SCADA OPC UA servers to
        read and write process data. Most of the certificate pain in OPC UA deployments happens here.
      </p>

      <Callout type="key" title="Ignition Is Both Server and Client">
        Ignition's built-in OPC UA server runs on port 62541 by default. External systems connect TO Ignition
        via OPC UA. Ignition also connects OUT to device OPC UA servers (PLCs, RTACs) as a client. These are
        two independent certificate trust relationships.
      </Callout>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">Ignition's Built-In OPC UA Server</h2>
      <p>
        The Ignition Gateway includes an OPC UA server that exposes the Tag Provider as an OPC UA Address Space.
        External OPC UA clients — HMI systems, historian software, other SCADA platforms — can browse and
        subscribe to Ignition tags using standard OPC UA.
      </p>

      <div className="mt-4 space-y-2">
        {[
          ['Default Port', '62541 (not 4840 — deliberate, reduces accidental exposure)'],
          ['Location', 'Gateway → OPC UA → Server Settings'],
          ['Certificate', 'Auto-generated self-signed on first start. Export to give to clients.'],
          ['Security', 'Supports None, Sign, SignAndEncrypt. Default is often None in test installs.'],
          ['Address Space', 'Tag providers are browseable. Path: Ignition/[Provider]/[Tag path]'],
        ].map(([label, value]) => (
          <div key={label} className="flex gap-3 p-3 bg-white/4 border border-white/6 rounded-xl text-sm">
            <span className="font-semibold text-slate-100 flex-shrink-0 w-32">{label}:</span>
            <span className="text-slate-400">{value}</span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">Ignition OPC UA Client — Connecting to PLCs</h2>
      <p>
        The OPC UA module in Ignition allows connecting to external OPC UA servers. Configuration is done in
        Gateway → OPC UA → Connections. The workflow:
      </p>

      <div className="mt-4 space-y-3">
        {[
          { step: '1', title: 'Add OPC UA Connection', desc: 'Enter the server endpoint URL (opc.tcp://192.168.1.100:4840), select security mode and policy.' },
          { step: '2', title: 'Download server certificate', desc: 'On first connect attempt, Ignition downloads the server\'s certificate and places it in the "Quarantine" folder (certificates that haven\'t been trusted yet).' },
          { step: '3', title: 'Trust the server certificate', desc: 'Gateway → OPC UA → Certificates → Quarantined. Click "Trust" on the server\'s certificate. It moves to the Trusted folder.' },
          { step: '4', title: 'Push Ignition\'s client certificate to the server', desc: 'If SecurityMode=Sign or SignAndEncrypt, the server also needs to trust Ignition\'s certificate. Export it from Ignition and add it to the server\'s trusted store.' },
          { step: '5', title: 'Verify connection', desc: 'Status should show "Connected". If it stays "Faulted", check the console for the specific error code.' },
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

      <Callout type="field" title="Certificate Trust Is on BOTH Sides — Always">
        This is the most common OPC UA commissioning mistake. You trust the server's cert in Ignition. The
        connection still fails. Why? Because the server (e.g., SEL RTAC) also needs to trust Ignition's
        certificate. Export Ignition's OPC UA client certificate and load it into the server's trusted store.
        Mutual authentication means BOTH sides trust BOTH certificates.
      </Callout>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">SEL RTAC as OPC UA Server</h2>
      <p>
        The SEL RTAC (Real Time Automation Controller) includes an OPC UA server that exposes protection relay
        data, I/O points, and communications status to OPC UA clients. The RTAC OPC UA server exposes data from
        connected IEDs (relays, meters) and internal RTAC logic tags.
      </p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="font-bold text-slate-100 text-sm mb-2">RTAC OPC UA Configuration</div>
          <ul className="space-y-1 text-xs text-slate-400">
            <li>• AcSELerator RTAC: Communications → OPC UA Server</li>
            <li>• Default port: 4840</li>
            <li>• Certificate management in AcSELerator</li>
            <li>• Tags auto-populated from device configuration</li>
            <li>• Supports SecurityMode: None and SignAndEncrypt</li>
          </ul>
        </div>
        <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="font-bold text-slate-100 text-sm mb-2">Common RTAC Gotchas</div>
          <ul className="space-y-1 text-xs text-slate-400">
            <li>• RTAC generates self-signed certificate — must trust it in Ignition</li>
            <li>• Ignition certificate must be imported into RTAC trusted store</li>
            <li>• Node paths differ by RTAC firmware version</li>
            <li>• Some older RTAC firmware has node count limits</li>
            <li>• Check RTAC OPC UA log in AcSELerator for server-side errors</li>
          </ul>
        </div>
      </div>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">Tag Creation from OPC UA</h2>
      <p>
        Once an OPC UA connection is established in Ignition, you can browse the server's Address Space directly
        from the Tag Browser and drag nodes into your tag tree. Ignition creates OPC UA tags with the NodeId
        as the tag's OPC item path.
      </p>

      <div className="bg-navy-700 rounded-xl p-4 font-mono text-xs mt-4">
        <div className="text-mcyan-400 mb-2 font-bold">Example Tag OPC Item Path</div>
        <div className="text-slate-300 space-y-1">
          <div><span className="text-amber-400">Connection:</span> SEL_RTAC_Station_A</div>
          <div><span className="text-amber-400">Item Path:</span> ns=2;s=SEL351.SEL351_TRIP</div>
          <div className="mt-2 text-slate-500 text-xs">Or equivalently:</div>
          <div><span className="text-amber-400">Item Path:</span> [SEL_RTAC_Station_A]ns=2;s=SEL351.SEL351_TRIP</div>
        </div>
      </div>

      <Callout type="pro" title="Use Browse-Based Tag Import">
        Don't type NodeIds manually. Use Ignition's OPC Browser (Tag Browser → Create Tags → Browse → select your
        OPC UA connection) to browse the server and import tags by clicking. Manual NodeId entry is error-prone and
        unnecessary.
      </Callout>

      <GifCard gifKey="robot" caption="Ignition and RTAC finally trusting each other's certificates"
        body="Before Ignition and an OPC UA device can exchange data, both endpoints must trust each other's X.509 certificates. Ignition presents its certificate on first connect; the remote server stores it as trusted. Without mutual certificate trust, the OpenSecureChannel step fails — regardless of username or password — because the secure channel can't open."
      />

      <FunFact index={8} />

      <AnalogyCard analogy={ANALOGIES.ignition} />

      {QUIZZES.ignition && QUIZZES.ignition.length > 0 && (
        <QuizLevels chapterId="ignition" />
      )}
      <ChapterExercise exercise={OPCUA_CHAPTER_EXERCISES.ignition} />
    </ChapterLayout>
  )
}
