import React, { useState, useEffect, useCallback } from 'react'
import { RotateCcw, Shuffle, ChevronLeft, ChevronRight, Check, X, BookOpen, Keyboard } from 'lucide-react'

const STORAGE_KEY = 'opcua_flashcard_v1'

const FLASHCARD_CHAPTERS = [
  { id: 'all', label: 'All Topics' },
  { id: 'nodes', label: '🔗 Address Space & Nodes' },
  { id: 'services', label: '⚙️ Services & Sessions' },
  { id: 'security', label: '🔒 Security & Certificates' },
  { id: 'subscriptions', label: '📡 Subscriptions & Monitoring' },
  { id: 'datatypes', label: '📐 Data Types & Variants' },
  { id: 'transport', label: '🚀 Transport Layer' },
]

const FLASHCARDS = [
  // ADDRESS SPACE & NODES
  { id: 'n01', chapter: 'nodes', front: 'OPC UA NodeId formats', back: 'A NodeId uniquely identifies every node in the address space. Four encoding types: (1) Numeric: ns=2;i=1001 — namespace index + integer. (2) String: ns=1;s=Temperature — namespace index + string. (3) GUID: ns=1;g=550e8400-e29b-41d4-a716-446655440000. (4) Opaque/ByteString: ns=1;b=M/RbJ0... All NodeIds in namespace 0 (ns=0) are OPC UA standard types.' },
  { id: 'n02', chapter: 'nodes', front: 'OPC UA node classes', back: 'Eight node classes: Object (represents things — devices, folders), Variable (holds a data value), Method (callable function), ObjectType (class definition for Objects), VariableType (class definition for Variables), DataType (defines data type structure), ReferenceType (defines relationship types), View (a filtered subset of the address space). Every node has exactly one node class.' },
  { id: 'n03', chapter: 'nodes', front: 'Namespace 0 vs custom namespaces', back: 'Namespace index 0 (ns=0) is reserved for OPC UA standard types defined in the OPC UA specification — built-in data types, standard object types, base reference types. Client-side applications begin custom namespaces at ns=1. The namespace URI is registered in the server\'s namespace array. NodeIds from different servers with the same URI share the same semantic meaning.' },
  { id: 'n04', chapter: 'nodes', front: 'OPC UA address space hierarchy', back: 'The address space is a graph of nodes connected by references. The root is the Objects folder (ns=0;i=85). Under it: DeviceSet (IEC 62541 companion spec), Server (server diagnostics and capabilities), and application-specific folders. All nodes are reachable by browsing from the root. The hierarchy is not a tree — nodes can have multiple parents via references.' },
  { id: 'n05', chapter: 'nodes', front: 'References in OPC UA', back: 'References are directed typed links between nodes. Base types: HierarchicalReferences (browsable, tree-like: HasComponent, HasProperty, Organizes), NonHierarchicalReferences (HasTypeDefinition, HasModellingRule, GeneratesEvent). A Variable node typically has: HasTypeDefinition → its VariableType, and is contained in an Object via HasComponent or HasProperty.' },
  { id: 'n06', chapter: 'nodes', front: 'Variable node attributes', back: 'A Variable node has mandatory attributes: NodeId, NodeClass, BrowseName, DisplayName, Description, Value, DataType, ValueRank, ArrayDimensions, AccessLevel, UserAccessLevel, MinimumSamplingInterval, Historizing. The Value attribute holds the actual data. AccessLevel bits: 0=CurrentRead, 1=CurrentWrite, 2=HistoryRead, 3=HistoryWrite.' },
  { id: 'n07', chapter: 'nodes', front: 'BrowseName vs DisplayName', back: 'BrowseName is a qualified name (namespace index + string) used programmatically to navigate the address space. It must be unique among sibling nodes. DisplayName is a LocalizedText (language + string) for human display in client UIs — can be localized per client locale. A node named "Tank1_Level" as BrowseName might display as "Tank 1 Level" in the UI.' },
  { id: 'n08', chapter: 'nodes', front: 'HasProperty vs HasComponent reference', back: 'Both are hierarchical references. HasComponent links an Object to its Variables, Methods, and sub-Objects (main components). HasProperty links a node to its Properties — simple scalar metadata (e.g., EngineeringUnits, EURange on a Variable). Properties are not browsable sub-components; they describe the parent node. EURange and EngineeringUnits are always HasProperty references.' },
  { id: 'n09', chapter: 'nodes', front: 'OPC UA companion specifications', back: 'Companion specifications extend OPC UA with domain-specific information models. Examples: OPC UA for Devices (DI, Part 100), OPC UA for PLCopen (IEC 61131-3 FB data exposure), OPC UA for PLC (Profibus+Profinet), OPC UA for MDIS (oil & gas valves). They define node hierarchies, variable types, and method signatures for specific equipment classes.' },
  { id: 'n10', chapter: 'nodes', front: 'Server node and capabilities', back: 'Every OPC UA server exposes a Server node (ns=0;i=2253) in its address space. Under it: ServerArray (list of all known server URIs), NamespaceArray (all namespace URIs), ServerStatus (CurrentTime, BuildInfo, ServerState, SecondsTillShutdown), ServerCapabilities (MaxNodes, MaxBrowse, supported features). Clients read this node to discover server capabilities before connecting.' },

  // SERVICES & SESSIONS
  { id: 's01', chapter: 'services', front: 'OPC UA session lifecycle', back: 'Full connection sequence: (1) GetEndpoints (discover available endpoints — no session needed). (2) OpenSecureChannel (establish cryptographic channel, negotiate security). (3) CreateSession (create logical session, exchange certificates, get session ID). (4) ActivateSession (authenticate user — Anonymous, UserName+Password, or Certificate). (5) Service calls. (6) CloseSession. (7) CloseSecureChannel.' },
  { id: 's02', chapter: 'services', front: 'GetEndpoints service', back: 'GetEndpoints (no session required) returns the list of all endpoints the server supports, each with: EndpointUrl, SecurityMode (None/Sign/SignAndEncrypt), SecurityPolicyUri, TransportProfileUri, and the server\'s application instance certificate. Clients call this first to discover which security combinations are available before deciding how to connect.' },
  { id: 's03', chapter: 'services', front: 'Browse service', back: 'Browse traverses the address space graph. The client specifies a starting NodeId and BrowseDirection (Forward, Inverse, Both), ReferenceTypeId filter, and NodeClassMask. The server returns BrowseResults: each result contains ReferenceDescriptions (NodeId, BrowseName, DisplayName, NodeClass, TypeDefinition of each referenced node). BrowseNext handles result sets exceeding the server\'s MaxReferencesPerNode.' },
  { id: 's04', chapter: 'services', front: 'Read service', back: 'Read retrieves values of node attributes. The client sends a list of ReadValueId items: each specifies NodeId, AttributeId (13=Value, 1=NodeClass, 4=BrowseName, etc.), IndexRange (for arrays), and DataEncoding. The server returns a DataValue for each: containing the Value, StatusCode, SourceTimestamp (from the device), and ServerTimestamp.' },
  { id: 's05', chapter: 'services', front: 'Write service', back: 'Write sets attribute values on nodes. The client sends WriteValue items: NodeId, AttributeId (almost always 13=Value), IndexRange, and the new DataValue. The server validates: node exists, attribute is writable (AccessLevel bit), user has write permission, data type matches. Returns a StatusCode per item. Common error: BadNotWritable when AccessLevel bit 1 is not set.' },
  { id: 's06', chapter: 'services', front: 'Call service (Methods)', back: 'The Call service invokes Method nodes. Request: ObjectId (parent object), MethodId, and InputArguments (array of Variants). Response: StatusCode, InputArgumentResults, OutputArguments. Methods are used for structured operations: device commands, diagnostics, configuration changes. Unlike Write, Methods can have multiple inputs/outputs and can reject calls with domain-specific status codes.' },
  { id: 's07', chapter: 'services', front: 'TranslateBrowsePathsToNodeIds', back: 'Converts a browse path (sequence of relative references) to NodeIds without manually browsing. The client specifies a starting NodeId and a sequence of BrowseName steps. Example: start at Objects, path [DeviceSet, Device1, Temperature]. The server returns the NodeId of the node at the end of the path. Used by clients that know the information model structure ahead of time.' },
  { id: 's08', chapter: 'services', front: 'RegisterNodes / UnregisterNodes', back: 'RegisterNodes optimizes repeated access to the same nodes. The client sends a list of NodeIds; the server returns optimized NodeIds (possibly different handles). Subsequent Read/Write/MonitoredItem operations using these handles are faster — the server skips address space lookups. Call UnregisterNodes when done. Useful for high-frequency polling of a fixed tag list.' },
  { id: 's09', chapter: 'services', front: 'HistoricalAccess services', back: 'OPC UA Historical Access (Part 11) provides three main services: ReadRaw (raw stored values between start/end time), ReadProcessed (aggregated data: average, min, max, count), ReadAtTime (interpolated values at specific timestamps). The client specifies ReadRawModifiedDetails or ReadProcessedDetails. Requires the server to have Historizing=True on the Variable.' },
  { id: 's10', chapter: 'services', front: 'UserTokenPolicy types', back: 'Each endpoint lists supported UserTokenPolicies. Types: (1) Anonymous — no authentication, minimal security. (2) UserName — username/password, password encrypted with server certificate public key. (3) Certificate — client proves identity with X.509 certificate (private key signature). (4) IssuedToken — token from external identity provider (OAuth-like). Most industrial deployments use UserName or Anonymous.' },

  // SECURITY & CERTIFICATES
  { id: 'sec01', chapter: 'security', front: 'OPC UA security modes', back: 'Three security modes: (1) None — no encryption, no signing; all data in plaintext. (2) Sign — messages are signed (integrity) but not encrypted; prevents tampering, but data visible. (3) SignAndEncrypt — messages are both signed and encrypted; confidentiality + integrity. SecurityMode is selected per SecureChannel. Most production systems should use SignAndEncrypt.' },
  { id: 'sec02', chapter: 'security', front: 'OPC UA security policies', back: 'Security policies define the cryptographic algorithms. Common policies: (1) None (no security). (2) Basic256Sha256 — RSA-PKCS1-v1.5 for key exchange, AES-256-CBC for encryption, SHA-256 for signing. (3) Aes128_Sha256_RsaOaep — AES-128-CBC, RSA-OAEP, SHA-256. (4) Aes256_Sha256_RsaPss — AES-256-CBC, RSA-PSS, SHA-256. Avoid Basic128Rsa15 (deprecated, SHA-1 vulnerable).' },
  { id: 'sec03', chapter: 'security', front: 'Application instance certificates', back: 'Every OPC UA server and client application has a unique X.509 certificate called its ApplicationInstanceCertificate. It contains: Application URI (must match the actual endpoint URI), Subject CN, validity dates, public key. This certificate is used for SecureChannel key exchange and mutual authentication. Self-signed certificates are common in OT; CA-signed preferred for enterprise deployments.' },
  { id: 'sec04', chapter: 'security', front: 'Certificate trust model — mutual', back: 'OPC UA uses mutual certificate authentication: both client and server must trust each other\'s certificates. Each side has a Trust List (accepted certificates or CA certs) and a Rejected List. When a connection is attempted: the server checks if the client cert is trusted; the client checks if the server cert is trusted. Both checks must pass. This differs from HTTPS where only the server is authenticated by default.' },
  { id: 'sec05', chapter: 'security', front: 'Certificate Revocation List (CRL)', back: 'CRLs list certificates that have been revoked before their expiration date (due to compromise, decommissioning). OPC UA servers can be configured to check CRLs before accepting a certificate. In air-gapped OT environments, CRL distribution points (CDPs) in certificates may be unreachable — configure CRL checking accordingly or use local CRL copies.' },
  { id: 'sec06', chapter: 'security', front: 'SecureChannel vs Session', back: 'These are distinct: SecureChannel = the cryptographic transport layer; encrypts and signs all messages; identified by SecureChannelId; has a Lifetime (typically 1 hour, renewed automatically). Session = the logical application layer; carries user identity; identified by SessionId; has a SessionTimeout. One SecureChannel can host exactly one Session. If the SecureChannel is renegotiated, the Session transfers to the new channel.' },
  { id: 'sec07', chapter: 'security', front: 'Role-based security in OPC UA', back: 'OPC UA Part 18 (Role-Based Security) defines server-side roles: Anonymous, AuthenticatedUser, Observer (read-only), Operator (read + write non-safety), Engineer (operator + config), Supervisor, ConfigureAdmin (full config), SecurityAdmin (manage certs/roles). Each role has a set of permissions. Servers map authenticated users to roles. Ignition uses its own role system mapped to OPC UA permissions.' },
  { id: 'sec08', chapter: 'security', front: 'SecurityMode=None risks', back: 'With SecurityMode=None: all OPC UA messages are transmitted in plaintext; any device with network access can read all tag values, modify any writable tag, capture session credentials, and replay messages. Despite this, SecurityMode=None is common in isolated OT networks due to certificate management complexity. Never use None across untrusted network segments.' },

  // SUBSCRIPTIONS & MONITORING
  { id: 'sub01', chapter: 'subscriptions', front: 'Subscription vs MonitoredItem', back: 'A Subscription is a server-side object that periodically publishes data changes to the client. It has a PublishingInterval (how often the server sends Publish responses). A MonitoredItem is a specific node+attribute being watched within a subscription. Each subscription can contain many MonitoredItems. MonitoredItems have a SamplingInterval (how often the server samples the source).' },
  { id: 'sub02', chapter: 'subscriptions', front: 'LifetimeCount and MaxKeepAliveCount', back: 'LifetimeCount: number of publish intervals with no client Publish request before the server deletes the subscription. MaxKeepAliveCount: number of publish intervals with no data changes before the server sends an empty KeepAlive Publish response. Rule: LifetimeCount >= 3 × MaxKeepAliveCount. If LifetimeCount is too low and the client misses requests, the subscription is silently deleted.' },
  { id: 'sub03', chapter: 'subscriptions', front: 'Publish service flow', back: 'Publish is client-initiated (request-response, not server push). The client sends a Publish request containing acknowledgements for previously received NotificationMessages. The server queues the Publish requests and responds when: (1) new notifications are ready, or (2) the keep-alive counter expires. The client must keep Publish requests outstanding to receive timely notifications.' },
  { id: 'sub04', chapter: 'subscriptions', front: 'MonitoredItem trigger modes', back: 'Three trigger modes: (1) Status — report only when StatusCode changes (rare). (2) StatusValue — report when StatusCode or Value changes (default, most common). (3) StatusValueTimestamp — report when StatusCode, Value, or source timestamp changes. Also: DataChangeFilter can apply deadband (AbsoluteDeadband, PercentDeadband) to further filter which changes trigger a notification.' },
  { id: 'sub05', chapter: 'subscriptions', front: 'AbsoluteDeadband vs PercentDeadband', back: 'Deadband filters suppress MonitoredItem notifications for small changes. AbsoluteDeadband: notify only when |new - old| > deadband value (e.g., ±0.5 engineering units). PercentDeadband: notify only when |new - old| / (EURange.High - EURange.Low) × 100 > deadband%. PercentDeadband requires the EURange Property to be set on the Variable. Both prevent event floods from noisy analog signals.' },
  { id: 'sub06', chapter: 'subscriptions', front: 'SamplingInterval vs PublishingInterval', back: 'SamplingInterval (per MonitoredItem): how frequently the server samples the underlying data source. Can be as low as 0 (use fastest possible), or any positive value in milliseconds. PublishingInterval (per Subscription): how often the server batches and sends accumulated notifications to the client. If PublishingInterval=1000ms and SamplingInterval=100ms, up to 10 samples may be queued per publish cycle.' },
  { id: 'sub07', chapter: 'subscriptions', front: 'Event MonitoredItems', back: 'MonitoredItems can monitor Events (not just data values) by setting the MonitoringMode and providing an EventFilter. The client specifies: SelectClauses (which event fields to return — EventType, SourceName, Severity, Message, etc.) and WhereClause (filter by event type or field values). The server delivers matching events in Publish responses alongside data change notifications.' },
  { id: 'sub08', chapter: 'subscriptions', front: 'SetPublishingMode service', back: 'SetPublishingMode enables or disables publishing on one or more Subscriptions without deleting them. When disabled, the server continues sampling MonitoredItems but does not send Publish responses. Useful for pausing notifications during operator acknowledgment workflows or maintenance windows without losing the subscription state.' },

  // DATA TYPES & VARIANTS
  { id: 'd01', chapter: 'datatypes', front: 'OPC UA built-in data types', back: 'OPC UA defines 25 built-in data types (namespace 0): Boolean, SByte, Byte, Int16, UInt16, Int32, UInt32, Int64, UInt64, Float, Double, String (UTF-8), DateTime (100ns intervals since 1601-01-01), Guid, ByteString, XmlElement, NodeId, ExpandedNodeId, StatusCode, QualifiedName, LocalizedText, ExtensionObject, DataValue, Variant, DiagnosticInfo.' },
  { id: 'd02', chapter: 'datatypes', front: 'Variant type', back: 'A Variant is a union type that can hold any OPC UA built-in data type or an array of any built-in type. It consists of an encoding byte (indicating the contained type) followed by the value. The Value attribute of Variable nodes is always a Variant. This allows a single node to change its data type representation dynamically, though good practice is to keep the data type consistent.' },
  { id: 'd03', chapter: 'datatypes', front: 'ExtensionObject', back: 'ExtensionObject wraps complex (structured) data types that are not built-in. It contains: TypeId (NodeId of the DataType), Encoding (Binary, XML, or None), and the encoded body. Used for OPC UA structures defined in information models — e.g., EURange (High + Low doubles), Argument (for Method parameters), ServerStatusDataType. The client must know the structure definition to decode the body.' },
  { id: 'd04', chapter: 'datatypes', front: 'StatusCode structure', back: 'StatusCode is a 32-bit value encoding OPC UA quality. Bits 30-31 (severity): 0b00=Good (0x00000000), 0b01=Uncertain (0x40000000), 0b10=Bad (0x80000000), 0b11=Bad (same). Bits 16-29 (sub-code): specific condition within the severity. Bits 0-15 (additional info bits). Common: 0x00000000=Good, 0x80340000=BadNoCommunication, 0x406F0000=UncertainSensorNotAccurate.' },
  { id: 'd05', chapter: 'datatypes', front: 'OPC quality vs Ignition quality', back: 'OPC UA StatusCode severity maps: Good (bits 30-31 = 00) → Ignition quality "Good" (192 = 0xC0 in OPC-DA legacy mapping). Uncertain (bits 30-31 = 01) → "Uncertain" (64 = 0x40). Bad (bits 30-31 = 10 or 11) → "Bad" (0 = 0x00). Ignition displays quality as Good/Bad/Uncertain in the Tag Browser. In scripting: tag.quality.isGood(), tag.quality.isBad().' },
  { id: 'd06', chapter: 'datatypes', front: 'DateTime encoding in OPC UA', back: 'OPC UA DateTime is a 64-bit integer: 100-nanosecond intervals since January 1, 1601, 00:00:00 UTC (Windows FILETIME format). To convert to Unix timestamp: subtract 11644473600 seconds. SourceTimestamp comes from the data source (PLC, sensor); ServerTimestamp from the OPC UA server. In Ignition: system.date.now() returns Java Date; OPC timestamps are automatically converted.' },
  { id: 'd07', chapter: 'datatypes', front: 'Array types in OPC UA', back: 'Any built-in type can form an array. The Variable node\'s ValueRank attribute: -3=ScalarOrOneDimensional, -2=Any, -1=Scalar (no array), 0=OneOrMoreDimensions, 1=OneDimensional, 2=TwoDimensional (matrix), etc. ArrayDimensions attribute specifies fixed dimensions. Arrays are sent as flat sequences in Binary encoding preceded by a length Int32. Zero-length array is valid (empty array).' },
  { id: 'd08', chapter: 'datatypes', front: 'EngineeringUnits Property', back: 'The EURange Property (DataType=Range, with Low and High Double fields) and EngineeringUnits Property (DataType=EUInformation, with NamespaceUri, UnitId, DisplayName, Description) are standard Properties on analog Variable nodes. EUInformation unit codes come from UNECE Recommendation 20 (e.g., 4480323="°C", 5067843="bar"). Clients use these for axis scaling in trending views.' },

  // TRANSPORT LAYER
  { id: 't01', chapter: 'transport', front: 'OPC UA Binary protocol (UA-TCP)', back: 'The primary OPC UA transport: UA-TCP carries OPC UA Binary-encoded messages over TCP. Default port 4840. Message types: HEL (Hello — client initiates), ACK (server confirms parameters), ERR (error, connection rejected), OPN (OpenSecureChannel), CLO (CloseSecureChannel), MSG (all other service messages). Binary encoding is compact and fast — the recommended transport for all SCADA use.' },
  { id: 't02', chapter: 'transport', front: 'OPC UA HTTPS transport', back: 'OPC UA can be transported over HTTPS (port 443), with OPC UA Binary or OPC UA JSON encoding in the HTTP body. Used when traversing corporate firewalls that block port 4840. Performance is significantly lower than UA-TCP due to HTTP overhead. The OPC UA security layer (SecureChannel) is separate from TLS — both may be active simultaneously, providing double encryption.' },
  { id: 't03', chapter: 'transport', front: 'OPC UA JSON encoding', back: 'OPC UA Part 6 defines a JSON encoding for all OPC UA data types. Used with HTTPS transport and OPC UA Pub/Sub over MQTT. Verbose compared to Binary — a Float value costs more bytes in JSON. NodeIds use syntax like {"Id":1001,"Namespace":2}. ExtensionObjects must carry type information. Used for integration with REST-based IT systems.' },
  { id: 't04', chapter: 'transport', front: 'Hello/Acknowledge parameter negotiation', back: 'The first UA-TCP messages negotiate transport parameters. HEL (client→server): ProtocolVersion, ReceiveBufferSize, SendBufferSize, MaxMessageSize, MaxChunkCount, EndpointUrl. ACK (server→client): same fields with server-negotiated values. The actual parameters used are the minimum of client and server values. Mismatched EndpointUrl causes immediate connection rejection.' },
  { id: 't05', chapter: 'transport', front: 'Message chunking in OPC UA Binary', back: 'Large OPC UA messages are split into Chunks. Each chunk has a MessageHeader (MessageType, ChunkType, MessageSize) and a SequenceHeader (SequenceNumber, RequestId). ChunkType: \'F\'=Final (last chunk), \'C\'=Intermediate Chunk, \'A\'=Abort (cancel the message). The receiver reassembles chunks by RequestId. MaxChunkCount and ReceiveBufferSize are negotiated in HEL/ACK.' },
  { id: 't06', chapter: 'transport', front: 'OPC UA Pub/Sub (Part 14)', back: 'OPC UA Pub/Sub decouples publishers and subscribers via a message broker (MQTT) or UDP multicast. Publishers send DataSetMessages on configured WriterGroups. Subscribers filter by DataSetMetaData. This scales better than client-server for many consumers of the same data. Not yet widely deployed in traditional SCADA but growing in IIoT architectures where data goes to cloud analytics.' },
  { id: 't07', chapter: 'transport', front: 'Port 4840 vs Ignition port 62541', back: 'IANA-assigned OPC UA port is 4840. Ignition runs its built-in OPC UA server on port 62541 by default (configurable). This non-standard port keeps Ignition\'s internal OPC UA server separate from external field device OPC UA servers. When configuring an Ignition OPC UA Device Connection to a PLC, use the PLC\'s port (usually 4840). When connecting UA Expert to Ignition, use 62541.' },
  { id: 't08', chapter: 'transport', front: 'SecureChannel renewal', back: 'A SecureChannel has a Lifetime (typically 3600 seconds / 1 hour). Before expiry, the client sends a new OpenSecureChannel request with RequestType=Renew to get a new SecurityToken. The server continues honoring the old token briefly during transition. Session continues uninterrupted across SecureChannel renewal. If renewal fails and the channel expires, the client must create a new channel and re-activate the session.' },
  { id: 't09', chapter: 'transport', front: 'OPC UA connection keep-alive mechanism', back: 'Unlike TCP keep-alive, OPC UA uses the Subscription/Publish mechanism as an application-level heartbeat. If the client stops sending Publish requests, the server detects an inactive client after LifetimeCount × PublishingInterval. The server then deletes the subscription. Additionally, the TCP connection itself uses OS-level TCP keep-alive. Both mechanisms must be configured correctly for reliable operation.' },
  { id: 't10', chapter: 'transport', front: 'Discovery server and LDS', back: 'The Local Discovery Server (LDS) is an OPC UA server that maintains a registry of other OPC UA servers on the local network. Servers register themselves with the LDS at startup. Clients query the LDS (port 4840 on the LDS host) using FindServers or FindServersOnNetwork to discover available servers. The global discovery server (GDS) extends this concept for enterprise-wide certificate management.' },
]

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
}
function saveProgress(prog) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prog))
}

function seededShuffle(arr, seed) {
  const a = [...arr]
  let s = seed >>> 0
  for (let i = a.length - 1; i > 0; i--) {
    s = (Math.imul(s ^ (s >>> 15), s | 1) ^ (s + Math.imul(s ^ (s >>> 7), s | 61))) >>> 0
    const j = s % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Flashcards() {
  const [chapter, setChapter] = useState('all')
  const [progress, setProgress] = useState(loadProgress)
  const [shuffled, setShuffled] = useState(false)
  const [seed, setSeed] = useState(Date.now())
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const baseCards = chapter === 'all' ? FLASHCARDS : FLASHCARDS.filter(c => c.chapter === chapter)
  const cards = shuffled ? seededShuffle(baseCards, seed) : baseCards
  const current = cards[index] || null

  const isMastered = current ? !!progress[current.id]?.mastered : false
  const isSeen = current ? !!progress[current.id]?.seen : false
  const seenCount = cards.filter(c => progress[c.id]?.seen).length
  const masteredCount = cards.filter(c => progress[c.id]?.mastered).length
  const pct = cards.length ? Math.round((masteredCount / cards.length) * 100) : 0

  const go = useCallback((dir) => {
    if (animating) return
    setAnimating(true)
    setFlipped(false)
    setTimeout(() => {
      setIndex(i => {
        const next = i + dir
        if (next < 0) return cards.length - 1
        if (next >= cards.length) return 0
        return next
      })
      setAnimating(false)
    }, 200)
  }, [animating, cards.length])

  const flip = useCallback(() => {
    if (animating) return
    setFlipped(f => !f)
    if (current) {
      const p = { ...progress }
      p[current.id] = { ...p[current.id], seen: true }
      setProgress(p)
      saveProgress(p)
    }
  }, [animating, current, progress])

  const markMastered = useCallback(() => {
    if (!current) return
    const p = { ...progress }
    p[current.id] = { ...p[current.id], seen: true, mastered: true }
    setProgress(p)
    saveProgress(p)
    go(1)
  }, [current, progress, go])

  const markNeeds = useCallback(() => {
    if (!current) return
    const p = { ...progress }
    p[current.id] = { ...p[current.id], seen: true, mastered: false }
    setProgress(p)
    saveProgress(p)
    go(1)
  }, [current, progress, go])

  const resetProgress = () => {
    setProgress({})
    saveProgress({})
    setIndex(0)
    setFlipped(false)
  }

  const doShuffle = () => { setSeed(Date.now()); setShuffled(true); setIndex(0); setFlipped(false) }
  const unShuffle = () => { setShuffled(false); setIndex(0); setFlipped(false) }

  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); flip() }
      if (e.code === 'ArrowRight' || e.code === 'KeyL') go(1)
      if (e.code === 'ArrowLeft' || e.code === 'KeyH') go(-1)
      if (e.code === 'KeyM') markMastered()
      if (e.code === 'KeyN') markNeeds()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [flip, go, markMastered, markNeeds])

  useEffect(() => { setIndex(0); setFlipped(false) }, [chapter])

  if (!current) return (
    <div className="p-8 text-center text-slate-400">No cards for this category yet.</div>
  )

  return (
    <div className="min-h-screen p-4 lg:p-8" style={{ background: 'linear-gradient(135deg, #060e1a, #0f1e37, #0a1628)' }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen size={24} style={{ color: '#22d3ee' }} />
              OPC UA Flashcards
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">{FLASHCARDS.length} cards · Space to flip · ← → navigate · M mastered · N needs review</p>
          </div>
          <button
            onClick={() => setShowHint(h => !h)}
            className="p-2 rounded-xl text-slate-400 transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)' }}
            title="Keyboard shortcuts"
          >
            <Keyboard size={20} />
          </button>
        </div>

        {showHint && (
          <div className="mb-4 p-4 rounded-2xl text-xs text-slate-500 grid grid-cols-2 gap-2"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div><kbd className="px-1.5 py-0.5 rounded font-mono" style={{ background: 'rgba(255,255,255,0.1)' }}>Space</kbd> Flip card</div>
            <div><kbd className="px-1.5 py-0.5 rounded font-mono" style={{ background: 'rgba(255,255,255,0.1)' }}>← →</kbd> Navigate</div>
            <div><kbd className="px-1.5 py-0.5 rounded font-mono" style={{ background: 'rgba(255,255,255,0.1)' }}>M</kbd> Mark mastered</div>
            <div><kbd className="px-1.5 py-0.5 rounded font-mono" style={{ background: 'rgba(255,255,255,0.1)' }}>N</kbd> Needs review</div>
          </div>
        )}

        {/* Chapter filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FLASHCARD_CHAPTERS.map(ch => (
            <button
              key={ch.id}
              onClick={() => setChapter(ch.id)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
              style={chapter === ch.id
                ? { background: '#0077a8', color: 'white', boxShadow: '0 0 12px rgba(0,180,216,0.4)' }
                : { background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)' }
              }
            >
              {ch.label}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="mb-6 p-4 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>{index + 1} / {cards.length} cards</span>
            <div className="flex gap-4">
              <span className="text-amber-500 font-semibold">{seenCount} seen</span>
              <span className="font-semibold" style={{ color: '#34d399' }}>{masteredCount} mastered</span>
              <span className="font-bold" style={{ color: '#22d3ee' }}>{pct}%</span>
            </div>
          </div>
          <div className="h-2 rounded-full overflow-hidden relative" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="absolute left-0 top-0 h-full rounded-full bg-amber-400 transition-all duration-500"
              style={{ width: `${cards.length ? (seenCount / cards.length) * 100 : 0}%` }} />
            <div className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
              style={{ width: `${cards.length ? (masteredCount / cards.length) * 100 : 0}%`, background: '#34d399' }} />
          </div>
          {cards.length <= 25 && (
            <div className="flex gap-1 mt-2 justify-center flex-wrap">
              {cards.map((c, i) => (
                <button key={c.id} onClick={() => { setIndex(i); setFlipped(false) }}
                  className="w-2.5 h-2.5 rounded-full transition-all duration-200"
                  style={{
                    transform: i === index ? 'scale(1.5)' : 'scale(1)',
                    background: i === index ? '#22d3ee' : progress[c.id]?.mastered ? '#34d399' : progress[c.id]?.seen ? '#fbbf24' : 'rgba(255,255,255,0.15)',
                  }} />
              ))}
            </div>
          )}
        </div>

        {/* Card */}
        <div onClick={flip} className="relative cursor-pointer select-none mb-6"
          style={{ perspective: '1200px', minHeight: 300 }}>
          <div className="relative w-full transition-transform duration-500"
            style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)', minHeight: 300 }}>

            {/* Front */}
            <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
              <div className="h-full min-h-[300px] rounded-3xl p-8 flex flex-col"
                style={{ background: 'rgba(10,22,40,0.95)', border: '2px solid rgba(0,180,216,0.3)', boxShadow: '0 0 40px rgba(0,180,216,0.1)' }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                    style={{ background: 'rgba(0,180,216,0.15)', color: '#22d3ee' }}>
                    {FLASHCARD_CHAPTERS.find(c => c.id === current.chapter)?.label || current.chapter}
                  </span>
                  {isMastered && (
                    <span className="px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                      style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399' }}>
                      <Check size={12} /> Mastered
                    </span>
                  )}
                  {isSeen && !isMastered && (
                    <span className="px-2 py-1 rounded-full text-xs font-bold"
                      style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}>Review</span>
                  )}
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-xl font-semibold text-white text-center leading-relaxed">{current.front}</p>
                </div>
                <div className="flex items-center justify-center gap-2 mt-4 text-slate-500 text-sm">
                  <div className="w-6 h-6 rounded-full border-2 border-slate-600 flex items-center justify-center animate-bounce">
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full" />
                  </div>
                  <span>Tap to reveal</span>
                </div>
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <div className="h-full min-h-[300px] rounded-3xl p-8 flex flex-col"
                style={{ background: 'linear-gradient(135deg, rgba(6,14,26,0.98), rgba(0,40,70,0.95))', border: '2px solid rgba(0,180,216,0.2)' }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                    style={{ background: 'rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                    {current.front}
                  </span>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Definition</span>
                </div>
                <div className="flex-1 flex items-start justify-center overflow-y-auto">
                  <p className="text-sm leading-relaxed text-left w-full" style={{ color: '#cbd5e1' }}>{current.back}</p>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={(e) => { e.stopPropagation(); markNeeds() }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
                    style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5' }}>
                    <X size={16} /> Needs Review
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); markMastered() }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
                    style={{ background: 'rgba(52,211,153,0.15)', color: '#6ee7b7' }}>
                    <Check size={16} /> Got It
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button onClick={() => go(-1)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm text-slate-300 transition-all active:scale-95"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <ChevronLeft size={18} /> Prev
          </button>

          <div className="flex gap-2">
            <button onClick={shuffled ? unShuffle : doShuffle}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl font-semibold text-sm transition-all active:scale-95"
              style={shuffled
                ? { background: '#0077a8', color: 'white', boxShadow: '0 0 12px rgba(0,180,216,0.3)' }
                : { background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)' }
              }>
              <Shuffle size={16} /> {shuffled ? 'Shuffled' : 'Shuffle'}
            </button>
            <button onClick={resetProgress}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl font-semibold text-sm text-slate-500 transition-all active:scale-95 hover:text-red-400"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              title="Reset progress">
              <RotateCcw size={16} />
            </button>
          </div>

          <button onClick={() => go(1)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm text-slate-300 transition-all active:scale-95"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            Next <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
