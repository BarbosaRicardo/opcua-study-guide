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

export default function Subscriptions() {
  return (
    <ChapterLayout
      chapterId="subscriptions"
      title="Subscriptions & MonitoredItems"
      emoji="📡"
      prev="security"
      next="transport"
    >
      <p>
        OPC UA subscriptions are the protocol's answer to polling: instead of the client asking for values every
        500ms, the server monitors values and tells the client when they change. A Subscription is a container.
        MonitoredItems are the individual data points being watched inside that container.
      </p>

      <Callout type="key" title="Subscription vs MonitoredItem">
        A Subscription has a PublishingInterval — the rate at which the server sends notifications to the client.
        Each MonitoredItem has a SamplingInterval — the rate at which the server samples the data source internally.
        SamplingInterval can be faster than PublishingInterval. Changes are queued.
      </Callout>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">Subscription Lifecycle</h2>

      <div className="mt-4 space-y-3">
        {[
          { step: '1', service: 'CreateSubscription', desc: 'Client requests a subscription with PublishingInterval, LifetimeCount, MaxKeepAliveCount, MaxNotificationsPerPublish.' },
          { step: '2', service: 'CreateMonitoredItems', desc: 'Client adds one or more MonitoredItems to the subscription, each with a NodeId, SamplingInterval, QueueSize, and filter.' },
          { step: '3', service: 'Publish (repeated)', desc: 'Client sends Publish requests continuously. When the server has notifications ready, it sends them back in the Publish response. If no changes: KeepAlive or empty response.' },
          { step: '4', service: 'ModifyMonitoredItems (optional)', desc: 'Change sampling interval, queue size, or filter on existing MonitoredItems without recreating them.' },
          { step: '5', service: 'DeleteMonitoredItems / DeleteSubscriptions', desc: 'Clean up when done. Subscriptions are cleaned up automatically when a Session closes.' },
        ].map(({ step, service, desc }) => (
          <div key={step} className="flex gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex-shrink-0 w-8 h-8 bg-navy-700 rounded-full flex items-center justify-center text-mcyan-400 font-bold font-mono text-sm">{step}</div>
            <div>
              <code className="text-xs px-2 py-0.5 rounded font-mono font-bold" style={{ background: 'rgba(255,255,255,0.1)', color: '#22d3ee' }}>{service}</code>
              <p className="text-sm text-slate-600 mt-1">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">Key Subscription Parameters</h2>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy-700 text-white">
              <th className="px-4 py-3 text-left rounded-tl-xl font-semibold">Parameter</th>
              <th className="px-4 py-3 text-left font-semibold">Description</th>
              <th className="px-4 py-3 text-left rounded-tr-xl font-semibold">Typical Value</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['PublishingInterval', 'How often the server delivers notifications to the client (ms)', '500ms – 5000ms'],
              ['LifetimeCount', 'How many PublishingIntervals with no Publish request before server deletes subscription', '3× MaxKeepAliveCount'],
              ['MaxKeepAliveCount', 'How many empty PublishingIntervals before server sends a KeepAlive notification', '10 (= 5s at 500ms interval)'],
              ['MaxNotificationsPerPublish', 'Caps notifications per response to prevent flooding', '0 = unlimited'],
              ['SamplingInterval', 'Per MonitoredItem: how fast the server samples the data source (ms)', '100ms – 1000ms'],
              ['QueueSize', 'Per MonitoredItem: how many samples to buffer if PublishingInterval > SamplingInterval', '1 – 10 typical'],
              ['DiscardOldest', 'Per MonitoredItem: when queue is full, discard oldest or newest', 'true (discard oldest)'],
            ].map(([param, desc, typical], i) => (
              <tr key={param} className={i % 2 === 0 ? 'bg-white/5/5' : ''}>
                <td className="px-4 py-3 font-mono font-bold text-xs text-mblue-600">{param}</td>
                <td className="px-4 py-3 text-xs text-slate-400">{desc}</td>
                <td className="px-4 py-3 text-xs text-slate-500 font-mono">{typical}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="field" title="LifetimeCount Must Be 3x MaxKeepAliveCount or More">
        The spec requires LifetimeCount &gt;= 3 &times; MaxKeepAliveCount. If it isn't, the server will adjust it up automatically.
        A subscription times out when the server hasn't received a Publish request within LifetimeCount ×
        PublishingInterval milliseconds. If your client crashes and reconnects, subscriptions must be recreated —
        they don't survive session loss.
      </Callout>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">Data Change Filters</h2>
      <p>
        MonitoredItems can have DataChangeFilters that suppress notifications when the change isn't significant:
      </p>

      <div className="space-y-3 mt-4">
        {[
          {
            filter: 'Status',
            desc: 'Notify only when the StatusCode changes (Good → Bad, etc.). Does not suppress value-only changes.',
          },
          {
            filter: 'StatusValue',
            desc: 'Notify when StatusCode OR value changes. The default behavior — any change triggers notification.',
          },
          {
            filter: 'StatusValueTimestamp',
            desc: 'Notify when StatusCode, value, OR timestamp changes. Useful for historians that need every measurement.',
          },
        ].map(({ filter, desc }) => (
          <div key={filter} className="flex gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <code className="text-xs px-2 py-1 rounded font-mono flex-shrink-0 self-start" style={{ background: 'rgba(255,255,255,0.08)', color: '#fb923c' }}>{filter}</code>
            <p className="text-sm text-slate-400">{desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">Deadband Filtering</h2>
      <p>
        For analog values, deadband filtering prevents notification spam when a value oscillates slightly around
        a threshold. Two deadband types:
      </p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="p-4 rounded-xl" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
          <div className="font-bold text-blue-300 mb-1 text-sm">Absolute Deadband</div>
          <p className="text-xs text-blue-300">Suppress if |new - old| &lt; deadband value. Example: deadband=0.5, only notify if temperature changes by more than 0.5°C.</p>
        </div>
        <div className="p-4 bg-purple-500/100/10 border border-purple-500/25 rounded-xl">
          <div className="font-bold text-purple-800 mb-1 text-sm">Percentage Deadband</div>
          <p className="text-xs text-purple-400">Suppress if change &lt; X% of the EURange (engineering units range). Requires EURange property on the Variable.</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">Event Subscriptions</h2>
      <p>
        MonitoredItems can also monitor Events — discrete occurrences rather than value changes. An Event
        subscription on the Server node receives all events from the server. Events carry fields (EventType,
        Time, Severity, Message) selected by an EventFilter.
      </p>

      <Callout type="example" title="Alarm Subscriptions">
        In process automation, OPC UA alarms are Events. A client subscribes to alarm events on the Server node,
        applies an EventFilter for AlarmConditionType, and receives alarm activations/acknowledgements.
        This is how Ignition's Alarm Notification system works with OPC UA alarm sources.
      </Callout>

      <GifCard gifKey="network" caption="Subscription publish loop — server pushes, client receives"
      />

      <FunFact index={5} />

      <AnalogyCard analogy={ANALOGIES.subscriptions} />

      {QUIZZES.subscriptions && QUIZZES.subscriptions.length > 0 && (
        <QuizLevels chapterId="subscriptions" />
      )}
      <ChapterExercise exercise={OPCUA_CHAPTER_EXERCISES.subscriptions} />
    </ChapterLayout>
  )
}
