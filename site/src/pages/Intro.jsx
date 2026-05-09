import React from 'react'
import ChapterLayout from '../components/ChapterLayout'
import Callout from '../components/Callout'
import FunFact from '../components/FunFact'
import GifCard from '../components/GifCard'
import AnalogyCard from '../components/AnalogyCard'
import { ANALOGIES } from '../data/chapters'

export default function Intro() {
  return (
    <ChapterLayout
      chapterId="intro"
      title="What Is OPC UA?"
      emoji="🔌"
      next="architecture"
    >
      <p>
        OPC UA — Unified Architecture — is an industrial communication standard published by the OPC Foundation in 2008.
        It defines how machines, sensors, PLCs, SCADA systems, and enterprise software exchange data in a platform-independent,
        secure, and structured way. It is the protocol that replaced OPC Classic, which worked fine as long as you
        enjoyed debugging Windows DCOM at 2am.
      </p>

      <Callout type="key" title="The One-Sentence Version">
        OPC UA is a platform-independent, secure, structured data exchange protocol for industrial automation — designed
        by the OPC Foundation after enough people suffered through OPC Classic's COM/DCOM dependency.
      </Callout>

      <h2 className="text-xl font-bold text-navy-700 mt-8 mb-3">Why OPC Classic Failed (At Scale)</h2>
      <p>
        OPC Classic — primarily OPC-DA (Data Access) — was released in 1996 and used Microsoft's COM/DCOM technology.
        This meant it was Windows-only, required COM registration, DCOM configuration, and Windows firewall exceptions
        that varied by OS version and patch level. Connecting two OPC Classic nodes across a network firewall was
        approximately 40% protocol work and 60% Windows ceremony.
      </p>
      <p>
        OPC Classic also lacked built-in security — no encryption, no authentication beyond Windows user accounts,
        no certificate infrastructure. As industrial networks became less air-gapped, this became a problem.
      </p>

      <GifCard gifKey="mindBlown" caption="When DCOM finally connects after three hours of firewall rules" />

      <Callout type="warning" title="OPC Classic Is Still Everywhere">
        OPC-DA servers still run in production facilities built before 2010. Many Ignition installations connect to
        legacy OPC-DA servers via the OPC-COM module. Knowing OPC UA doesn't mean you'll never see OPC-DA again.
        You will. Probably next week.
      </Callout>

      <h2 className="text-xl font-bold text-navy-700 mt-8 mb-3">What OPC UA Fixed</h2>
      <p>OPC UA was designed from scratch with a specific list of requirements that OPC Classic could not meet:</p>

      <ul className="list-none space-y-3 mt-4">
        {[
          ['Platform Independence', 'No COM/DCOM. Runs on Windows, Linux, embedded systems, microcontrollers. Implementations exist in C, C++, Java, Python, .NET, and others.'],
          ['Built-In Security', 'Mutual certificate authentication, session encryption, message signing. SecurityMode can be None/Sign/SignAndEncrypt. (More on this later — spoiler: most deployments use None.)'],
          ['Structured Information Model', 'Data is organized as a browsable address space of typed nodes, not a flat list of tag names. You can navigate the server like a file system.'],
          ['Transport Flexibility', 'Binary TCP (fastest), HTTPS (IT-friendly), WebSocket (for when someone had a grant). All carry the same data model.'],
          ['Companion Specifications', 'Domain-specific extensions — OPC UA for PLCopen, PackML, ISA-95, machine tools, weighing, and dozens more. Industry groups define standard information models on top of OPC UA.'],
        ].map(([title, desc]) => (
          <li key={title} className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-mblue-600 font-bold text-sm flex-shrink-0 mt-0.5">→</span>
            <div>
              <span className="font-semibold text-slate-800">{title}: </span>
              <span className="text-slate-600 text-sm">{desc}</span>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold text-navy-700 mt-8 mb-3">Who Uses OPC UA</h2>
      <p>
        Every major industrial automation vendor ships OPC UA server capability. This is not aspirational — it is the
        current state of the market:
      </p>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {[
          ['Inductive Automation Ignition', 'Built-in OPC UA server and client. The server runs on port 62541 by default. Most Ignition SCADA deployments use OPC UA to talk to PLCs.'],
          ['Siemens S7-1200/1500', 'Native OPC UA server built into the CPU since TIA Portal V14. No additional module required.'],
          ['Rockwell Automation', 'OPC UA via FactoryTalk Linx. The Studio 5000 ecosystem connects through a local OPC UA server.'],
          ['SEL RTAC', 'OPC UA server capability built in. Used to expose protection relay and RTU data to SCADA systems including Ignition.'],
          ['Beckhoff TwinCAT 3', 'Native OPC UA server. Beckhoff was an early adopter and their implementation is frequently cited as a reference.'],
          ['ABB, Emerson, Honeywell', 'DCS vendors all ship OPC UA interfaces. If a modern DCS historian or controller has an external interface, it speaks OPC UA.'],
        ].map(([vendor, desc]) => (
          <div key={vendor} className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
            <div className="font-semibold text-navy-700 text-sm mb-1">{vendor}</div>
            <div className="text-xs text-slate-500 leading-relaxed">{desc}</div>
          </div>
        ))}
      </div>

      <FunFact index={0} />

      <h2 className="text-xl font-bold text-navy-700 mt-8 mb-3">The Specification Structure</h2>
      <p>
        OPC UA is documented across 14 parts. You will never read all of them. The important ones:
      </p>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy-700 text-white">
              <th className="px-4 py-3 text-left font-semibold rounded-tl-xl">Part</th>
              <th className="px-4 py-3 text-left font-semibold">Title</th>
              <th className="px-4 py-3 text-left font-semibold rounded-tr-xl">Why You Care</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Part 1', 'Overview and Concepts', 'The executive summary. Read this first.'],
              ['Part 3', 'Address Space Model', 'Nodes, NodeIds, References, the information model.'],
              ['Part 4', 'Services', 'Read, Write, Browse, Subscribe — all 37 service definitions.'],
              ['Part 6', 'Mappings', 'Binary encoding, HTTPS encoding, transport details.'],
              ['Part 11', 'Historical Access', 'Reading historian data via OPC UA.'],
              ['Part 14', 'PubSub', 'MQTT-based publish/subscribe extension added in 2018.'],
            ].map(([part, title, reason], i) => (
              <tr key={part} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-4 py-3 font-mono font-bold text-mblue-600">{part}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{title}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnalogyCard analogy={ANALOGIES.intro} />

      <Callout type="pro" title="Start With Part 1 and UA Expert">
        Read OPC UA Part 1 (it's short — about 60 pages). Then download UA Expert for free from Unified Automation
        and connect to the Prosys OPC UA Simulation Server. Reading the spec while you can click around a real server
        cuts comprehension time in half.
      </Callout>
    </ChapterLayout>
  )
}
