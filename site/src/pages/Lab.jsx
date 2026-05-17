import React from 'react'
import ChapterLayout from '../components/ChapterLayout'
import Callout from '../components/Callout'
import FunFact from '../components/FunFact'
import GifCard from '../components/GifCard'
import AnalogyCard from '../components/AnalogyCard'
import QuizLevels from '../components/QuizLevels'
import CodeLab from '../components/CodeLab'
import { ANALOGIES } from '../data/chapters'
import { QUIZZES } from '../data/quizzes'
import { OPCUA_LAB } from '../data/labExercises'

export default function Lab() {
  return (
    <ChapterLayout
      chapterId="lab"
      title="Lab & Tools"
      emoji="🧪"
      prev="troubleshoot"
    >
      <section>
        <h2 className="text-xl font-bold text-white mb-2">OPC UA Code Lab</h2>
        <p className="text-slate-400">
          Six exercises across three difficulty levels. Parse NodeIds, decode StatusCodes,
          validate subscriptions, implement deadband filtering, build a session state machine,
          and validate certificate chains. These are the algorithms inside every OPC UA driver.
        </p>
      </section>

      <CodeLab exercises={OPCUA_LAB} />

      <p>
        Every concept in this guide has a free, downloadable tool that lets you test it. There is no reason
        to commission a real OPC UA server without having first browsed, subscribed, and debugged a simulated one.
        Do the lab. UA Expert and Prosys are both free.
      </p>

      <Callout type="key" title="Minimum Lab Setup">
        Download UA Expert (client) + Prosys OPC UA Simulation Server (server). Connect UA Expert to the
        simulation server. Browse the Address Space. Subscribe to some tags. Watch values update. You now
        understand OPC UA subscriptions better than 40% of people who claim to know OPC UA.
      </Callout>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">Required Tools</h2>

      <div className="space-y-4 mt-4">
        {[
          {
            name: 'UA Expert',
            provider: 'Unified Automation',
            cost: 'Free',
            url: 'https://www.unified-automation.com/products/development-tools/uaexpert.html',
            platform: 'Windows, Linux, macOS',
            desc: 'The standard OPC UA diagnostic client. Browse Address Spaces, subscribe to data, view session info, manage certificates. Every OPC UA engineer needs this.',
            use: 'Diagnosing connections, verifying NodeIds, testing subscriptions, debugging certificate issues',
          },
          {
            name: 'Prosys OPC UA Simulation Server',
            provider: 'Prosys OPC Ltd',
            cost: 'Free',
            url: 'https://prosysopc.com/products/opc-ua-simulation-server/',
            platform: 'Windows, Linux, macOS',
            desc: 'A full-featured OPC UA server that runs locally and simulates process data. Includes sinusoidal values, random noise, counters. Configurable security modes.',
            use: 'Learning OPC UA without a real PLC, testing client code, practicing security configuration',
          },
          {
            name: 'Node-RED OPC UA Nodes',
            provider: '@opcua/node-opcua-client (npm)',
            cost: 'Free',
            url: 'https://flows.nodered.org/search?term=opc+ua',
            platform: 'Windows, Linux, macOS (Node.js)',
            desc: 'Node-RED flow-based OPC UA client. Drag-and-drop OPC UA read/subscribe/write nodes. Good for building quick integration tests without writing code.',
            use: 'Rapid prototyping, integration testing, building simple OPC UA dashboards',
          },
          {
            name: 'opcua-asyncio (Python)',
            provider: 'Open source (PyPI)',
            cost: 'Free',
            url: 'https://github.com/FreeOpcUa/opcua-asyncio',
            platform: 'Windows, Linux, macOS (Python 3.7+)',
            desc: 'Full-featured async Python OPC UA client and server library. Can run as both client and server. Good for scripting, testing, and building custom OPC UA integrations.',
            use: 'Scripted testing, data export, building custom OPC UA clients in Python',
          },
        ].map(({ name, provider, cost, url, platform, desc, use }) => (
          <div key={name} className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-bold text-slate-100 text-base">{name}</div>
                <div className="text-xs text-slate-500">{provider} · {platform}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-400 text-xs font-bold rounded-lg">{cost}</span>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-mblue-600 text-white text-xs font-bold rounded-lg hover:bg-mblue-700 transition-colors"
                >
                  Download →
                </a>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-2">{desc}</p>
            <div className="text-xs text-slate-500"><span className="font-semibold">Use for:</span> {use}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">Lab Exercises</h2>
      <p>Complete these in order. Each one builds on the previous.</p>

      <div className="space-y-4 mt-4">
        {[
          {
            n: '1',
            title: 'Basic Connection',
            time: '15 min',
            steps: [
              'Download and install Prosys OPC UA Simulation Server',
              'Start the server — note the endpoint URL (opc.tcp://localhost:53530)',
              'Download and install UA Expert',
              'In UA Expert: Add Server → enter the endpoint URL',
              'Connect with SecurityMode=None',
              'Browse the Address Space — find the sinusoidal and random nodes under Objects',
            ],
          },
          {
            n: '2',
            title: 'Subscribe and Watch Data',
            time: '15 min',
            steps: [
              'With UA Expert connected to Prosys, find a Dynamic/Sinusoidal1 node',
              'Drag it to the Data Access View (bottom panel)',
              'Watch the value change every second',
              'Right-click → Subscribe → change PublishingInterval to 100ms',
              'Add 5 more nodes. Note the update behavior.',
              'Change SamplingInterval on one node to 5000ms — does it still update quickly?',
            ],
          },
          {
            n: '3',
            title: 'Security Mode Configuration',
            time: '20 min',
            steps: [
              'In Prosys server: Endpoints → add SignAndEncrypt with Basic256Sha256',
              'In UA Expert: disconnect, change endpoint to the SignAndEncrypt endpoint',
              'Connect — UA Expert will show a certificate warning',
              'Trust the server certificate in UA Expert',
              'Check Prosys server: it will show UA Expert\'s certificate in Rejected certs',
              'In Prosys: trust UA Expert\'s certificate → reconnect',
              'Verify: connection works with encryption. Capture in Wireshark — traffic should be unreadable.',
            ],
          },
          {
            n: '4',
            title: 'Python OPC UA Client',
            time: '30 min',
            steps: [
              'pip install asyncua',
              'Write a script: connect to Prosys, read the sinusoidal node, print value every second',
              'Extend it: create a subscription instead of polling',
              'Extend it again: write a value to a writeable node',
              'Run with SecurityMode=SignAndEncrypt (requires certificate config in opcua-asyncio)',
            ],
          },
          {
            n: '5',
            title: 'Ignition + Prosys',
            time: '30 min (requires Ignition trial or existing install)',
            steps: [
              'In Ignition: OPC UA → Connections → Add new connection to Prosys endpoint',
              'Attempt connect — it will fail with certificate error',
              'Trust Prosys certificate in Ignition: OPC UA → Certificates → Quarantined → Trust',
              'Export Ignition\'s client certificate, import it into Prosys trusted store',
              'Connection should succeed',
              'Browse Prosys nodes from Ignition Tag Browser → create a few tags',
              'Verify tags update in Ignition with live Prosys simulation data',
            ],
          },
        ].map(({ n, title, time, steps }) => (
          <div key={n} className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-navy-700 rounded-full flex items-center justify-center text-mcyan-400 font-bold text-sm flex-shrink-0">{n}</div>
              <div>
                <div className="font-bold text-slate-100">{title}</div>
                <div className="text-xs text-slate-400">Estimated: {time}</div>
              </div>
            </div>
            <ol className="space-y-1">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-400">
                  <span className="text-mblue-400 font-mono text-xs mt-0.5 flex-shrink-0">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <Callout type="pro" title="Do Lab 5 Before Any Real Commission">
        The Ignition + OPC UA certificate dance is the single most time-consuming part of any new OPC UA
        deployment. If you've done it in a lab with Prosys, the real commissioning takes 10 minutes instead
        of an hour of debugging. Muscle memory matters.
      </Callout>

      <GifCard gifKey="done" caption="Lab complete. Now go commission something real." />

      <FunFact index={10} />

      <AnalogyCard analogy={ANALOGIES.lab} />

      {QUIZZES.lab && (
        <QuizLevels chapterId="lab" />
      )}
    </ChapterLayout>
  )
}
