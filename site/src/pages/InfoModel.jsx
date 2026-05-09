import React from 'react'
import ChapterLayout from '../components/ChapterLayout'
import Callout from '../components/Callout'
import FunFact from '../components/FunFact'
import GifCard from '../components/GifCard'
import AnalogyCard from '../components/AnalogyCard'
import { ANALOGIES } from '../data/chapters'

export default function InfoModel() {
  return (
    <ChapterLayout
      chapterId="infomodel"
      title="Information Model & Address Space"
      emoji="🗂️"
      prev="architecture"
      next="services"
    >
      <p>
        The OPC UA Address Space is a browsable, typed graph of nodes. Every data point, every object, every method,
        and every type definition is a node. Nodes are connected by References. You navigate the Address Space by
        following References from one node to another — the same way you navigate a filesystem by following directory
        entries.
      </p>

      <Callout type="key" title="Everything Is a Node">
        In OPC UA, there is no "flat tag list." Every data point is a Variable node in the Address Space. Every
        device is an Object node. Every relationship is a typed Reference between two nodes.
      </Callout>

      <h2 className="text-xl font-bold text-navy-700 mt-8 mb-3">NodeId — The Universal Identifier</h2>
      <p>
        Every node has a NodeId — a unique identifier within a Namespace. NodeIds come in four formats:
      </p>

      <div className="mt-4 space-y-3">
        {[
          { format: 'Numeric', example: 'ns=2;i=1001', desc: 'Namespace index + integer. Most common in auto-generated Address Spaces. OPC UA built-in nodes use ns=0.' },
          { format: 'String', example: 'ns=2;s=Temperature_PV', desc: 'Namespace index + string. Common in custom models and human-readable implementations.' },
          { format: 'GUID', example: 'ns=2;g=550e8400-e29b-41d4-a716-446655440000', desc: 'Namespace index + UUID. Used when global uniqueness is required across systems.' },
          { format: 'Opaque', example: 'ns=2;b=AAEC', desc: 'Namespace index + base64-encoded byte string. Rare. Exists for legacy interoperability.' },
        ].map(({ format, example, desc }) => (
          <div key={format} className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex-shrink-0">
              <div className="text-xs font-bold text-mblue-600 uppercase tracking-widest mb-1">{format}</div>
              <code className="text-xs bg-navy-700 text-mcyan-400 px-2 py-1 rounded-lg font-mono">{example}</code>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <Callout type="field" title="Namespace 0 Is Reserved">
        Namespace 0 (ns=0) is always the OPC UA specification's own namespace. Built-in nodes like the Server node
        (ns=0;i=2253) live here. Your custom nodes should start at ns=1 or higher. If you see ns=0 in a custom
        implementation, someone is using the wrong namespace.
      </Callout>

      <h2 className="text-xl font-bold text-navy-700 mt-8 mb-3">Node Classes</h2>
      <p>OPC UA defines eight node classes. The ones you'll actually encounter:</p>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy-700 text-white">
              <th className="px-4 py-3 text-left font-semibold rounded-tl-xl">Node Class</th>
              <th className="px-4 py-3 text-left font-semibold">Purpose</th>
              <th className="px-4 py-3 text-left font-semibold rounded-tr-xl">Example</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Object', 'Container for other nodes — represents a physical or logical entity', 'A PLC, a pump, a device'],
              ['Variable', 'Holds a value. The main data-bearing node.', 'Temperature, pressure, motor speed'],
              ['Method', 'Callable function on the server', 'StartPump(), ResetAlarm()'],
              ['ObjectType', 'Type definition for Objects — like a class in OOP', 'PumpType, MotorType'],
              ['VariableType', 'Type definition for Variables with constraints', 'AnalogItemType, DataItemType'],
              ['ReferenceType', 'Defines the semantic meaning of a Reference between two nodes', 'HasComponent, HasProperty, Organizes'],
              ['DataType', 'Defines the data type for Variable values', 'Float, Int32, Structure'],
              ['View', 'A pre-defined subset of the Address Space', 'Diagnostic view, operational view'],
            ].map(([cls, purpose, example], i) => (
              <tr key={cls} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-4 py-3 font-mono font-bold text-mblue-600 text-xs">{cls}</td>
                <td className="px-4 py-3 text-slate-700 text-xs">{purpose}</td>
                <td className="px-4 py-3 text-slate-500 text-xs italic">{example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold text-navy-700 mt-8 mb-3">References — How Nodes Connect</h2>
      <p>
        References are typed, directed connections between two nodes. The type determines the semantic meaning of
        the relationship. Key reference types:
      </p>

      <div className="space-y-2 mt-4">
        {[
          { ref: 'HierarchicalReferences', desc: 'Parent-child relationships. Following these hierarchically gives you the tree view you see in UA Expert.' },
          { ref: 'HasComponent', desc: 'Object HasComponent Variable/Method/Object. A pump object HasComponent a speed variable.' },
          { ref: 'HasProperty', desc: 'Node HasProperty Variable. Properties are descriptive attributes — engineering units, instrument range, description.' },
          { ref: 'Organizes', desc: 'Folder-style grouping. A Folder object Organizes its children. The root Objects folder uses this.' },
          { ref: 'HasTypeDefinition', desc: 'Every Object and Variable has exactly one type. Object HasTypeDefinition ObjectType.' },
          { ref: 'HasSubtype', desc: 'Type inheritance. AnalogItemType HasSubtype ArrayItemType.' },
        ].map(({ ref, desc }) => (
          <div key={ref} className="flex gap-3 p-3 bg-white border border-slate-100 rounded-xl">
            <code className="text-xs bg-slate-100 text-morange-500 px-2 py-1 rounded font-mono flex-shrink-0 self-start mt-0.5">{ref}</code>
            <p className="text-sm text-slate-600">{desc}</p>
          </div>
        ))}
      </div>

      <FunFact index={2} />

      <h2 className="text-xl font-bold text-navy-700 mt-8 mb-3">Variable Attributes</h2>
      <p>
        Every Variable node has attributes beyond just its value. The important ones:
      </p>

      <div className="bg-navy-700 rounded-xl p-5 font-mono text-sm mt-4">
        <div className="text-mcyan-400 mb-2 text-xs font-bold uppercase tracking-widest">Variable Node: Temperature_PV</div>
        <div className="space-y-1 text-xs">
          <div><span className="text-amber-400">NodeId:</span> <span className="text-slate-300">ns=2;s=Temperature_PV</span></div>
          <div><span className="text-amber-400">NodeClass:</span> <span className="text-slate-300">Variable</span></div>
          <div><span className="text-amber-400">BrowseName:</span> <span className="text-slate-300">2:Temperature_PV</span></div>
          <div><span className="text-amber-400">DisplayName:</span> <span className="text-slate-300">Temperature Process Value</span></div>
          <div><span className="text-amber-400">Value:</span> <span className="text-mgreen-400">98.6</span></div>
          <div><span className="text-amber-400">DataType:</span> <span className="text-slate-300">Float</span></div>
          <div><span className="text-amber-400">ValueRank:</span> <span className="text-slate-300">-1 (Scalar)</span></div>
          <div><span className="text-amber-400">AccessLevel:</span> <span className="text-slate-300">CurrentRead | CurrentWrite</span></div>
          <div><span className="text-amber-400">StatusCode:</span> <span className="text-mgreen-400">Good</span></div>
          <div><span className="text-amber-400">SourceTimestamp:</span> <span className="text-slate-300">2026-05-09T14:30:00Z</span></div>
        </div>
      </div>

      <Callout type="key" title="Every Value Has a StatusCode and Timestamp">
        OPC UA variables carry three things: the value, a StatusCode (Good/Uncertain/Bad), and a SourceTimestamp
        (when the device measured it) plus a ServerTimestamp (when the server received it). Bad status means the
        value is not trustworthy — your SCADA should not display it as valid data.
      </Callout>

      <h2 className="text-xl font-bold text-navy-700 mt-8 mb-3">The Standard Address Space Structure</h2>
      <p>
        Every OPC UA server has a root Address Space with these standard top-level folders:
      </p>

      <div className="mt-4 bg-navy-700 rounded-xl p-4 font-mono text-xs">
        <pre className="text-slate-300 leading-relaxed">{`Root (ns=0;i=84)
├── Objects (ns=0;i=85)
│   ├── Server (ns=0;i=2253)        ← Server diagnostics, capabilities
│   └── [Your device data here]
├── Types (ns=0;i=86)
│   ├── DataTypes
│   ├── ReferenceTypes
│   ├── ObjectTypes
│   └── VariableTypes
├── Views (ns=0;i=87)
└── [Vendor-specific folders]`}</pre>
      </div>

      <AnalogyCard analogy={ANALOGIES.infomodel} />
    </ChapterLayout>
  )
}
