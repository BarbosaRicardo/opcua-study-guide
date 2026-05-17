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

export default function Troubleshoot() {
  return (
    <ChapterLayout
      chapterId="troubleshoot"
      title="Troubleshooting OPC UA"
      emoji="🔍"
      prev="ignition"
      next="lab"
    >
      <p>
        OPC UA has specific, documented status codes for every failure mode. This is both a blessing (you know
        exactly what failed) and a curse (you have to look up what the code means). This chapter covers the
        failures you will actually encounter, in order of frequency.
      </p>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">The Diagnostic Ladder</h2>
      <p>Before diving into status codes, run through this sequence in order:</p>

      <div className="mt-4 space-y-2">
        {[
          ['Can you ping the server IP?', 'If no: network/routing problem. Nothing else matters yet.'],
          ['Is port 4840 (or custom port) open?', 'telnet hostname 4840 or nc -zv hostname 4840. If blocked: firewall. Always the firewall.'],
          ['Is the OPC UA server service running?', 'Check device status, service list, or logs on the server itself.'],
          ['Can UA Expert connect with SecurityMode=None?', 'If yes: security/certificate issue. If no: server config or firewall.'],
          ['What is the exact error code?', 'UA Expert shows the StatusCode name. Google it if needed. The OPC Foundation publishes the full list.'],
        ].map(([q, action], i) => (
          <div key={q} className="flex gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex-shrink-0 w-6 h-6 bg-mblue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">{i + 1}</div>
            <div>
              <div className="font-semibold text-slate-200 text-sm">{q}</div>
              <div className="text-xs text-slate-500">{action}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">Common Status Codes</h2>

      <div className="space-y-4 mt-4">
        {[
          {
            code: 'BadCertificateUntrusted',
            hex: '0x80120000',
            when: 'During OpenSecureChannel',
            cause: 'The server received the client\'s certificate but it\'s not in the trusted store. Or the client received the server\'s certificate but hasn\'t trusted it.',
            fix: 'Trust the certificate in the appropriate certificate store (Ignition: Gateway → OPC UA → Certificates → Quarantined). Also ensure the OTHER side has trusted your certificate.',
            color: 'border-red-500/40 bg-red-500/10',
          },
          {
            code: 'BadSecureChannelClosed',
            hex: '0x80860000',
            when: 'During service calls, after initial connection',
            cause: 'The secure channel was closed by the server or timed out. Can happen when the server restarts, network interruption, or session timeout.',
            fix: 'Reconnect. If recurring: check server logs for why it\'s closing the channel. May be certificate expiry or server-side session limit.',
            color: 'border-orange-500/40 bg-orange-500/10',
          },
          {
            code: 'BadNodeIdUnknown',
            hex: '0x80340000',
            when: 'During Read, Write, CreateMonitoredItems',
            cause: 'The NodeId specified in the request doesn\'t exist in the server\'s Address Space.',
            fix: 'Browse the server to verify the NodeId exists and is spelled correctly. Check namespace index — ns=1 vs ns=2 is a common error. NodeIds are case-sensitive for string format.',
            color: 'border-amber-500/40 bg-amber-500/10',
          },
          {
            code: 'BadUserAccessDenied',
            hex: '0x801F0000',
            when: 'During Read, Write, or ActivateSession',
            cause: 'The authenticated user doesn\'t have permission to perform the requested operation, or the user credentials were rejected.',
            fix: 'Verify username/password. Check server\'s user permission configuration. Some servers restrict write access to specific user roles.',
            color: 'border-yellow-500/40 bg-yellow-500/10',
          },
          {
            code: 'BadSubscriptionIdInvalid',
            hex: '0x80280000',
            when: 'During Publish, ModifySubscription',
            cause: 'The SubscriptionId doesn\'t exist on the server. Subscription was deleted or the session was lost and recreated without recreating subscriptions.',
            fix: 'Recreate the subscription. Subscriptions are tied to Sessions — if the session closes, all subscriptions are gone.',
            color: 'border-blue-500/40 bg-blue-500/10',
          },
          {
            code: 'BadNotConnected',
            hex: '0x80AE0000',
            when: 'Immediately on any request',
            cause: 'Client is not connected to the server. TCP connection dropped or never established.',
            fix: 'Reconnect. Check network connectivity first.',
            color: 'border border-slate-700 bg-white/5/5',
          },
          {
            code: 'BadTooManySubscriptions',
            hex: '0x80611000',
            when: 'During CreateSubscription',
            cause: 'Server has a per-session or global limit on subscriptions and it\'s been reached.',
            fix: 'Check server config for subscription limits. Delete unused subscriptions. Some embedded devices have very low limits (e.g., 10 subscriptions per session).',
            color: 'border-purple-500/40 bg-purple-500/100/10',
          },
        ].map(({ code, hex, when, cause, fix, color }) => (
          <div key={code} className={`p-5 rounded-xl border ${color}`}>
            <div className="flex items-center gap-3 mb-3">
              <code className="font-mono font-bold text-sm text-slate-200">{code}</code>
              <code className="font-mono text-xs text-slate-500">{hex}</code>
              <span className="ml-auto text-xs text-slate-400 px-2 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.06)' }}>When: {when}</span>
            </div>
            <div className="text-sm text-slate-300 mb-2"><span className="font-semibold">Cause:</span> {cause}</div>
            <div className="text-sm text-slate-300"><span className="font-semibold">Fix:</span> {fix}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">UA Expert for Diagnosis</h2>
      <p>
        UA Expert (Unified Automation, free) is the go-to OPC UA diagnostic client. Key diagnostic capabilities:
      </p>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {[
          ['Connect with SecurityMode=None', 'Test basic connectivity bypassing certificate issues. If this works but your production config doesn\'t, it\'s a security/cert problem.'],
          ['Browse Address Space', 'Navigate the full node tree. Verify NodeIds, data types, access levels before writing client code.'],
          ['Subscribe to nodes', 'Add nodes to the Data Access View, watch live values. Verify data is changing at expected rates.'],
          ['View Session / Subscription info', 'Server → Sessions → see active sessions. Subscription → monitor states.'],
          ['Connection log', 'Shows every service call and response, including exact error codes and StatusCodes.'],
          ['Certificate management', 'Accept/reject server certificates directly from UA Expert\'s certificate dialog.'],
        ].map(([feature, desc]) => (
          <div key={feature} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="font-semibold text-slate-100 text-xs mb-1">{feature}</div>
            <div className="text-xs text-slate-500">{desc}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-3">Wireshark OPC UA Analysis</h2>
      <p>
        Wireshark includes an OPC UA dissector that decodes OPC UA Binary/TCP frames. Use display filter
        <code>opcua</code> to isolate OPC UA traffic. For SecurityMode=None sessions, the entire
        request/response content is visible and human-readable after Wireshark decodes it.
      </p>

      <Callout type="warning" title="Wireshark Cannot Decrypt SignAndEncrypt Sessions">
        If SecurityMode=SignAndEncrypt, Wireshark sees only encrypted blobs. To analyze an encrypted session,
        you need the session keys — possible with some implementations that support key logging, but not
        generally available in production OPC UA stacks.
      </Callout>

      <GifCard gifKey="nerd" caption="Opening UA Expert at 2am to find the BadCertificateUntrusted"
      />

      <FunFact index={11} />

      <AnalogyCard analogy={ANALOGIES.troubleshoot} />

      {QUIZZES.troubleshoot && QUIZZES.troubleshoot.length > 0 && (
        <QuizLevels chapterId="troubleshoot" />
      )}
      <ChapterExercise exercise={OPCUA_CHAPTER_EXERCISES.troubleshoot} />
    </ChapterLayout>
  )
}
