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

export default function Transport() {
  return (
    <ChapterLayout
      chapterId="transport"
      title="Transport & Encoding"
      emoji="🚚"
      prev="subscriptions"
      next="ignition"
    >
      <p>
        OPC UA separates the data model from the transport. The same Address Space, the same services, the same
        security model — three different ways to put bytes on the wire. The binary TCP transport is the one you'll
        use in 95% of industrial deployments.
      </p>

      <h2 className="text-xl font-bold text-navy-700 mt-8 mb-3">Three Transport Mappings</h2>

      <div className="space-y-4 mt-4">
        {[
          {
            name: 'OPC UA Binary / TCP (UA-TCP)',
            port: '4840',
            uri: 'opc.tcp://hostname:4840',
            color: 'border-mblue-600 bg-blue-50',
            header: 'text-mblue-700',
            pros: ['Fastest — binary encoding minimizes overhead', 'Most widely implemented', 'Lowest CPU and memory overhead', 'Supported by every OPC UA stack'],
            cons: ['Not human-readable', 'Requires binary protocol analysis tools (UA Expert, Wireshark)'],
            verdict: 'Use this. Always.',
          },
          {
            name: 'OPC UA HTTPS / JSON or Binary',
            port: '4843',
            uri: 'https://hostname:4843',
            color: 'border-amber-300 bg-amber-50',
            header: 'text-amber-700',
            pros: ['Works through HTTP proxies and firewalls', 'JSON encoding is human-readable and debug-friendly', 'IT infrastructure already understands HTTPS'],
            cons: ['Higher overhead than binary TCP', 'Not supported by all OPC UA stacks', 'JSON encoding is significantly larger than binary'],
            verdict: 'Use for IT/OT integration, REST-like access, cloud connectivity.',
          },
          {
            name: 'OPC UA WebSocket',
            port: '4840 or 443',
            uri: 'opc.wss://hostname:443',
            color: 'border-slate-300 bg-slate-50',
            header: 'text-slate-600',
            pros: ['Works through web proxies', 'Browser-compatible OPC UA clients possible'],
            cons: ['Limited implementation support', 'Highest overhead of the three', 'Rarely required in industrial environments'],
            verdict: 'For browser-based OPC UA dashboards. Rare.',
          },
        ].map(({ name, port, uri, color, header, pros, cons, verdict }) => (
          <div key={name} className={`p-5 rounded-xl border-2 ${color}`}>
            <div className={`font-bold text-sm mb-1 ${header}`}>{name}</div>
            <div className="font-mono text-xs text-slate-500 mb-3">{uri} · Port {port}</div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <div className="text-xs font-bold text-green-600 mb-1">Pros</div>
                <ul className="space-y-0.5">{pros.map(p => <li key={p} className="text-xs text-slate-600 flex gap-1"><span className="text-green-500">+</span>{p}</li>)}</ul>
              </div>
              <div>
                <div className="text-xs font-bold text-red-600 mb-1">Cons</div>
                <ul className="space-y-0.5">{cons.map(c => <li key={c} className="text-xs text-slate-600 flex gap-1"><span className="text-red-500">−</span>{c}</li>)}</ul>
              </div>
            </div>
            <div className="text-xs font-bold text-slate-700 bg-white/70 rounded-lg px-3 py-1.5 inline-block">{verdict}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-navy-700 mt-8 mb-3">Binary Encoding — Message Structure</h2>
      <p>
        Every OPC UA Binary/TCP message has a 8-byte message header followed by the message body:
      </p>

      <div className="flex overflow-x-auto mt-4 bg-slate-50 rounded-xl border border-slate-200">
        {[
          { label: 'MessageType', bytes: '3 bytes', color: 'bg-mblue-600', detail: 'HEL, ACK, ERR, OPN, CLO, MSG' },
          { label: 'Reserved', bytes: '1 byte', color: 'bg-slate-400', detail: 'F (Final chunk)' },
          { label: 'MessageSize', bytes: '4 bytes', color: 'bg-mcyan-500', detail: 'Total message length including header' },
          { label: 'Body', bytes: 'variable', color: 'bg-mgreen-500', detail: 'Encoded service request/response' },
        ].map(({ label, bytes, color, detail }) => (
          <div key={label} className={`${color} text-white flex-1 flex flex-col items-center justify-center py-4 px-2 text-center min-w-24`}>
            <div className="font-bold text-xs">{label}</div>
            <div className="text-xs opacity-80 mt-1">{bytes}</div>
            <div className="text-xs opacity-70 mt-1 text-center">{detail}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-navy-700 mt-8 mb-3">Built-In Data Types</h2>
      <p>
        OPC UA defines 25 built-in data types. These are the leaf types — everything else is built from them:
      </p>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {[
          { group: 'Boolean', types: ['Boolean (1 byte)'] },
          { group: 'Integer', types: ['SByte (1)', 'Byte (1)', 'Int16 (2)', 'UInt16 (2)', 'Int32 (4)', 'UInt32 (4)', 'Int64 (8)', 'UInt64 (8)'] },
          { group: 'Float', types: ['Float (4)', 'Double (8)'] },
          { group: 'String / Binary', types: ['String (4+N)', 'ByteString (4+N)', 'XmlElement'] },
          { group: 'Identifiers', types: ['NodeId', 'ExpandedNodeId', 'Guid (16)'] },
          { group: 'Time', types: ['DateTime (8 bytes, 100ns ticks since 1601)'] },
          { group: 'Status', types: ['StatusCode (4 bytes)'] },
          { group: 'Container', types: ['Variant (type+value)', 'DataValue (value+status+timestamps)', 'ExtensionObject (any type)'] },
        ].map(({ group, types }) => (
          <div key={group} className="p-3 bg-white border border-slate-100 rounded-xl">
            <div className="text-xs font-bold text-mblue-600 uppercase tracking-widest mb-1">{group}</div>
            {types.map(t => <div key={t} className="text-xs font-mono text-slate-600">{t}</div>)}
          </div>
        ))}
      </div>

      <Callout type="key" title="Variant — The Universal Container">
        The Variant type can hold any built-in type plus arrays thereof. Variable values are typically transmitted
        as Variants. A Variant has a type field (which built-in type) followed by the encoded value. This is how
        OPC UA handles a heterogeneous Address Space without separate serialization for each data type.
      </Callout>

      <h2 className="text-xl font-bold text-navy-700 mt-8 mb-3">Chunking — Large Messages</h2>
      <p>
        When a message exceeds the negotiated MaxMessageSize, it is split into chunks. Each chunk has the same
        message header with a chunk indicator: 'C' (intermediate chunk) or 'F' (final chunk). The receiver
        reassembles chunks before processing.
      </p>

      <Callout type="pro" title="MaxMessageSize Negotiation">
        During the Hello/Acknowledge handshake, client and server negotiate MaxMessageSize and MaxChunkCount.
        If a message exceeds MaxMessageSize and would require more than MaxChunkCount chunks, the service
        call fails with BadRequestTooLarge. Increase MaxMessageSize on both sides if you're browsing
        large Address Spaces or reading large arrays.
      </Callout>

      <FunFact index={6} />

      <AnalogyCard analogy={ANALOGIES.transport} />

      {QUIZZES.transport && QUIZZES.transport.length > 0 && (
        <QuizLevels chapterId="transport" />
      )}
      <ChapterExercise exercise={OPCUA_CHAPTER_EXERCISES.transport} />
    </ChapterLayout>
  )
}
