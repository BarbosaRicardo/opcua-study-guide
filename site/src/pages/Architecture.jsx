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

export default function Architecture() {
  return (
    <ChapterLayout
      chapterId="architecture"
      title="OPC UA Architecture"
      emoji="🏗️"
      prev="intro"
      next="infomodel"
    >
      <p>
        OPC UA uses a client-server model. The server exposes an Address Space — a browsable tree of data nodes.
        The client connects, establishes a Secure Channel, opens a Session, then browses, reads, writes, and subscribes
        to data. This is the fundamental interaction pattern and everything else is built on top of it.
      </p>

      <Callout type="key" title="Core Architecture">
        OPC UA Server exposes an Address Space. OPC UA Client connects via a Secure Channel (transport-level security),
        then opens a Session (application-level identity). All service calls happen within a Session.
      </Callout>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">The Layered Model</h2>
      <p>
        OPC UA separates concerns into distinct layers. Understanding these layers explains why certain errors happen
        at certain points in the connection process:
      </p>

      <div className="space-y-3 mt-4">
        {[
          {
            layer: 'Transport Layer',
            color: 'bg-navy-700',
            text: 'text-white',
            desc: 'TCP, HTTPS, or WebSocket connection. Handles raw byte delivery. Port 4840 for OPC UA Binary/TCP.',
          },
          {
            layer: 'Secure Channel Layer',
            color: 'bg-mblue-600',
            text: 'text-white',
            desc: 'Certificate exchange, SecurityMode negotiation (None/Sign/SignAndEncrypt), session key establishment. This is where BadCertificateUntrusted errors occur.',
          },
          {
            layer: 'Session Layer',
            color: 'bg-mcyan-500',
            text: 'text-white',
            desc: 'User identity (anonymous/username/X.509), session token, session timeout. A Session runs on top of a Secure Channel.',
          },
          {
            layer: 'Service Layer',
            color: 'bg-mgreen-500',
            text: 'text-white',
            desc: 'Read, Write, Browse, Subscribe, Call. All OPC UA functionality is expressed as service calls within a Session.',
          },
        ].map(({ layer, color, text, desc }) => (
          <div key={layer} className={`${color} ${text} rounded-xl px-5 py-4`}>
            <div className="font-bold text-sm mb-1">{layer}</div>
            <div className="text-xs opacity-90 leading-relaxed">{desc}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">Server Roles</h2>
      <p>
        In practice, OPC UA servers appear in several different deployment patterns:
      </p>

      <div className="grid grid-cols-1 gap-4 mt-4">
        {[
          {
            role: 'Embedded Server',
            example: 'Siemens S7-1500, SEL RTAC, Beckhoff TwinCAT',
            desc: 'The OPC UA server runs directly on the device. The PLC or RTU IS the server. Clients (like Ignition) connect directly.',
          },
          {
            role: 'Gateway / Aggregation Server',
            example: 'Ignition Gateway, KEPServerEX, Matrikon SCADA',
            desc: 'A middleware server that connects to multiple field devices using various protocols and re-exposes them as a single OPC UA Address Space. Ignition is both a server (to external clients) and a client (to PLCs).',
          },
          {
            role: 'Aggregation Server',
            example: 'OPC UA Aggregation Server pattern',
            desc: 'Connects to multiple downstream OPC UA servers and merges their Address Spaces into one. A client talks to one aggregation server instead of ten device servers.',
          },
          {
            role: 'Historical Access Server',
            example: 'Osisoft PI, Historian databases',
            desc: 'Exposes historical data via OPC UA Part 11. Clients can query tag history using the same OPC UA client that reads live data.',
          },
        ].map(({ role, example, desc }) => (
          <div key={role} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-mblue-600 mt-2 flex-shrink-0" />
              <div>
                <div className="font-bold text-slate-100">{role}</div>
                <div className="text-xs text-mblue-500 font-mono mb-1">{example}</div>
                <div className="text-sm text-slate-400">{desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <GifCard gifKey="network" caption="Multiple OPC UA clients talking to one server" />

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">Secure Channel Lifecycle</h2>
      <p>
        When a client connects to a server, the following sequence occurs before any data exchange:
      </p>

      <div className="mt-4 bg-navy-700 rounded-xl p-5 font-mono text-sm">
        <div className="space-y-2">
          {[
            ['CLIENT', 'text-mcyan-400', '→ TCP Connect to server:4840'],
            ['CLIENT', 'text-mcyan-400', '→ OpenSecureChannel (SecurityMode, SecurityPolicy, ClientCert)'],
            ['SERVER', 'text-mgreen-400', '← OpenSecureChannelResponse (ServerCert, session keys)'],
            ['CLIENT', 'text-mcyan-400', '→ CreateSession (ClientCert, endpoint)'],
            ['SERVER', 'text-mgreen-400', '← CreateSessionResponse (SessionId, AuthToken)'],
            ['CLIENT', 'text-mcyan-400', '→ ActivateSession (UserIdentityToken)'],
            ['SERVER', 'text-mgreen-400', '← ActivateSessionResponse (OK)'],
            ['CLIENT', 'text-mcyan-400', '→ Read / Browse / Subscribe (all within Session)'],
          ].map(([actor, color, msg]) => (
            <div key={msg} className="flex gap-3">
              <span className={`${color} font-bold flex-shrink-0 w-16`}>{actor}</span>
              <span className="text-slate-300">{msg}</span>
            </div>
          ))}
        </div>
      </div>

      <Callout type="field" title="Certificate Errors Happen at OpenSecureChannel">
        If you see BadCertificateUntrusted or BadSecurityChecksFailed, the error is happening at the OpenSecureChannel
        step — before any Session is created. The server received the client's certificate but hasn't trusted it yet.
        Fix: add the client cert to the server's trusted store (and vice versa for mutual auth).
      </Callout>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">OPC UA Pub/Sub (Part 14)</h2>
      <p>
        The traditional client-server model requires clients to maintain connections and issue Publish requests. For
        large-scale IoT deployments with thousands of sensors, this creates connection management overhead.
        OPC UA Part 14 (PubSub), released in 2018, adds a publish-subscribe model using MQTT or UDP multicast:
      </p>

      <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 mt-3">
        <li>Server publishes data to an MQTT broker — no client connection required</li>
        <li>Clients subscribe to MQTT topics — no polling, server pushes changes</li>
        <li>Scales to thousands of publishers without connection overhead</li>
        <li>Used in IIoT architectures where field devices publish to cloud MQTT brokers</li>
        <li>Does NOT replace client-server for control commands — PubSub is one-way data broadcast</li>
      </ul>

      <FunFact index={1} />

      <AnalogyCard analogy={ANALOGIES.architecture} />

      {QUIZZES.architecture && QUIZZES.architecture.length > 0 && (
        <QuizLevels chapterId="architecture" />
      )}
      <ChapterExercise exercise={OPCUA_CHAPTER_EXERCISES.architecture} />
    </ChapterLayout>
  )
}
