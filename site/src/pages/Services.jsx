import React from 'react'
import ChapterLayout from '../components/ChapterLayout'
import Callout from '../components/Callout'
import FunFact from '../components/FunFact'
import GifCard from '../components/GifCard'
import AnalogyCard from '../components/AnalogyCard'
import Quiz from '../components/Quiz'
import ChapterExercise from '../components/ChapterExercise'
import { ANALOGIES } from '../data/chapters'
import { QUIZZES } from '../data/quizzes'
import { OPCUA_CHAPTER_EXERCISES } from '../data/chapterExercises'

export default function Services() {
  return (
    <ChapterLayout
      chapterId="services"
      title="OPC UA Services"
      emoji="🛎️"
      prev="infomodel"
      next="security"
    >
      <p>
        OPC UA defines 37 services organized into 11 service sets. Every interaction between a client and server
        is a service call — a request/response pair with defined parameters and status codes. This chapter covers
        the ones you'll actually use.
      </p>

      <Callout type="key" title="Services Are Request/Response Pairs">
        Every OPC UA service call is synchronous request/response. The client sends a request, the server processes
        it, returns a response. Asynchronous behavior (subscriptions) is built on top of synchronous Publish calls.
      </Callout>

      <h2 className="text-xl font-bold text-navy-700 mt-8 mb-3">Service Sets</h2>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy-700 text-white">
              <th className="px-4 py-3 text-left font-semibold rounded-tl-xl">Service Set</th>
              <th className="px-4 py-3 text-left font-semibold">Key Services</th>
              <th className="px-4 py-3 text-left font-semibold rounded-tr-xl">Use Case</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Discovery', 'FindServers, GetEndpoints', 'Find servers on a network, get available endpoints and security configs'],
              ['SecureChannel', 'OpenSecureChannel, CloseSecureChannel', 'Establish/tear down transport-level security'],
              ['Session', 'CreateSession, ActivateSession, CloseSession', 'Application-level connection management'],
              ['View (Browse)', 'Browse, BrowseNext, TranslateBrowsePathsToNodeIds', 'Navigate the Address Space'],
              ['Attribute', 'Read, Write, HistoryRead, HistoryUpdate', 'Read/write node values and attributes'],
              ['Method', 'Call', 'Invoke server-side methods'],
              ['MonitoredItem', 'CreateMonitoredItems, ModifyMonitoredItems, DeleteMonitoredItems', 'Set up data change/event monitoring'],
              ['Subscription', 'CreateSubscription, ModifySubscription, Publish, Republish, DeleteSubscriptions', 'Manage publish/subscribe lifecycle'],
              ['NodeManagement', 'AddNodes, DeleteNodes, AddReferences', 'Dynamic Address Space modification (rare in practice)'],
              ['Query', 'QueryFirst, QueryNext', 'Complex server-side filtering (rarely implemented)'],
            ].map(([set, services, useCase], i) => (
              <tr key={set} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-4 py-3 font-bold text-navy-700 text-xs">{set}</td>
                <td className="px-4 py-3 font-mono text-xs text-mblue-600">{services}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{useCase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold text-navy-700 mt-8 mb-3">Browse — Navigating the Address Space</h2>
      <p>
        The Browse service walks the Address Space by following References. You specify a starting node, a direction
        (forward/backward/both), and optionally a ReferenceType filter. The response returns a list of
        ReferenceDescriptions — each containing the target's NodeId, BrowseName, DisplayName, and NodeClass.
      </p>

      <div className="bg-navy-700 rounded-xl p-5 font-mono text-xs mt-4">
        <div className="text-mcyan-400 mb-2 font-bold">BrowseRequest (simplified)</div>
        <pre className="text-slate-300 leading-relaxed">{`NodeToBrowse: {
  NodeId: ns=0;i=85         // Start from Objects folder
  BrowseDirection: Forward  // Follow forward references
  ReferenceTypeId: Organizes
  IncludeSubtypes: true
  NodeClassMask: Object | Variable
  ResultMask: BrowseName | DisplayName | NodeClass | NodeId
}`}</pre>
        <div className="text-mgreen-400 mt-3 mb-1 font-bold">BrowseResponse (one result)</div>
        <pre className="text-slate-300 leading-relaxed">{`References: [
  {
    NodeId: ns=2;i=1001
    BrowseName: 2:PumpStation_A
    DisplayName: Pump Station A
    NodeClass: Object
    TypeDefinition: ns=0;i=58  // BaseObjectType
  }
]`}</pre>
      </div>

      <Callout type="pro" title="BrowseNext for Large Result Sets">
        If a Browse returns a ContinuationPoint, there are more results than the server sent. Call BrowseNext with
        that ContinuationPoint to get the next page. UA Expert handles this automatically. If you're writing a custom
        client, you must handle ContinuationPoints or you'll silently miss nodes.
      </Callout>

      <h2 className="text-xl font-bold text-navy-700 mt-8 mb-3">Read vs Subscribe</h2>
      <p>
        This is the most important architectural decision in any OPC UA client implementation. Read is polling —
        you ask for the value every cycle. Subscribe is event-driven — the server tells you when the value changes.
      </p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="font-bold text-red-800 mb-2">Read (Polling)</div>
          <ul className="space-y-1 text-xs text-red-700">
            <li>• Client requests value every N milliseconds</li>
            <li>• Always gets current value</li>
            <li>• Network traffic proportional to poll rate × tag count</li>
            <li>• Use for: infrequent queries, one-time reads, commissioning</li>
            <li>• 500 tags at 500ms = 1000 requests/sec. This adds up.</li>
          </ul>
        </div>
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="font-bold text-green-800 mb-2">Subscribe (Event-Driven)</div>
          <ul className="space-y-1 text-xs text-green-700">
            <li>• Server samples at sampling interval</li>
            <li>• Sends notification only when value changes</li>
            <li>• Network traffic proportional to change rate</li>
            <li>• Use for: live data, SCADA displays, historian feed</li>
            <li>• 500 tags, only 3 changing = 3 notifications/cycle</li>
          </ul>
        </div>
      </div>

      <Callout type="field" title="Ignition Uses Subscriptions">
        Ignition's OPC UA client uses subscriptions, not polling. When you add a tag with an OPC UA path, Ignition
        creates a MonitoredItem in a Subscription. The server notifies Ignition when the value changes. This is why
        Ignition is more network-efficient than Modbus TCP polling at scale.
      </Callout>

      <h2 className="text-xl font-bold text-navy-700 mt-8 mb-3">Write Service</h2>
      <p>
        Write sets the value of one or more Variable nodes. The request includes a NodeId, AttributeId (usually
        Value = 13), and a DataValue (value + StatusCode + timestamps). The response returns a StatusCode per write.
      </p>

      <Callout type="warning" title="Write Permission Is Separate From Read Permission">
        AccessLevel on a Variable controls read/write independently. A Variable can be CurrentRead but not
        CurrentWrite. Attempting to write a read-only variable returns BadNotWritable. Attempting to write
        with insufficient user permissions returns BadUserAccessDenied.
      </Callout>

      <h2 className="text-xl font-bold text-navy-700 mt-8 mb-3">Method Call</h2>
      <p>
        OPC UA Methods are functions that run server-side. The Call service passes an Object node (parent),
        a Method NodeId, and input arguments. The server executes the method and returns output arguments and
        a StatusCode. Methods are used for actions — start a sequence, reset a fault, run a calibration.
      </p>

      <div className="bg-navy-700 rounded-xl p-5 font-mono text-xs mt-4">
        <div className="text-mcyan-400 mb-2 font-bold">CallRequest (simplified)</div>
        <pre className="text-slate-300 leading-relaxed">{`MethodsToCall: [{
  ObjectId: ns=2;s=PumpStation_A      // The parent Object
  MethodId: ns=2;s=PumpStation_A.Start // The Method to call
  InputArguments: [
    { DataType: Boolean, Value: true }  // Enable dry-run mode
  ]
}]`}</pre>
      </div>

      <FunFact index={3} />

      <AnalogyCard analogy={ANALOGIES.services} />

      {QUIZZES.services && QUIZZES.services.length > 0 && (
        <Quiz chapterId="services" questions={QUIZZES.services} level={1} />
      )}
      <ChapterExercise exercise={OPCUA_CHAPTER_EXERCISES.services} />
    </ChapterLayout>
  )
}
