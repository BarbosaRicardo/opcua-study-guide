// Chapter exercises for the OPC UA Study Guide
// One exercise per content chapter, embedded at the end via ChapterExercise component.

export const OPCUA_CHAPTER_EXERCISES = {

  // ─── Ch 1: What Is OPC UA? ─────────────────────────────────────────────────
  intro: {
    id: 'ua-ch1-ex',
    title: 'Classify an OPC UA Role',
    scenario: `OPC UA defines four roles in a communication session: client, server, publisher, and subscriber.
Given a plain-English description of a component, return the role string it best represents.

Rules:
  • 'client'     — initiates sessions, reads/writes tags, browses the address space
  • 'server'     — exposes a browsable address space, accepts connections, holds live data
  • 'publisher'  — pushes data to a message broker without a direct session (PubSub)
  • 'subscriber' — receives published data from a broker without polling

Return exactly one of: 'client' | 'server' | 'publisher' | 'subscriber'`,
    hint: `Look for keywords: "exposes", "accepts connections" → server; "polls" / "browses" → client; "broker" / "MQTT" → PubSub roles.`,
    starter: `function classifyUANode(description) {
  // OPC UA roles:
  //   server      → exposes address space, holds live data, accepts client sessions
  //   client      → connects to a server, reads/writes/browses
  //   publisher   → pushes data to a broker (PubSub / MQTT) — no direct session
  //   subscriber  → receives broker messages — no direct session

  // TODO: Check description (lowercased) for keywords and return the matching role.
  // Hint: description.toLowerCase() then check with includes()

  return ''; // replace with 'client', 'server', 'publisher', or 'subscriber'
}
const solution = classifyUANode;

console.log(classifyUANode('Ignition Gateway exposes live PLC tags over port 62541 and accepts incoming sessions'));
// → 'server'
console.log(classifyUANode('UA Expert connects and browses the address space of a remote server'));
// → 'client'`,
    starterPy: `def classify_ua_node(description):
    # OPC UA roles:
    #   server      -> exposes address space, holds live data, accepts sessions
    #   client      -> connects, reads/writes/browses
    #   publisher   -> pushes data to a broker (PubSub/MQTT), no session
    #   subscriber  -> receives broker messages, no session

    # TODO: Check description (lowercased) for keywords, return the matching role.
    desc = description.lower()

    # TODO: check for server keywords
    # TODO: check for publisher keywords
    # TODO: check for subscriber keywords
    # TODO: default to client

    return ''  # replace with 'client', 'server', 'publisher', or 'subscriber'

solution = classify_ua_node

print(classify_ua_node('Ignition Gateway exposes live PLC tags over port 62541'))  # server`,
    starterJython: `def classify_ua_node(description):
    # OPC UA roles:
    #   server      -> exposes address space, holds live data, accepts sessions
    #   client      -> connects, reads/writes/browses
    #   publisher   -> pushes data to a broker (PubSub/MQTT), no session
    #   subscriber  -> receives broker messages, no session

    desc = description.lower()

    # TODO: check for server keywords ('expose', 'accept', 'address space')
    # TODO: check for publisher keywords ('publish', 'broker', 'mqtt', 'push')
    # TODO: check for subscriber keywords ('subscribe', 'receive', 'listen')
    # TODO: default to client

    return ''

solution = classify_ua_node`,
    tests: [
      { description: "classifyUANode('...exposes live PLC tags...accepts incoming sessions') === 'server'" },
      { description: "classifyUANode('UA Expert connects and browses the address space') === 'client'" },
      { description: "classifyUANode('MQTT publisher pushes data to a broker without a session') === 'publisher'" },
      { description: "classifyUANode('Listener subscribes to broker topic for sensor readings') === 'subscriber'" },
    ],
    testRunner: function (solution) {
      const cases = [
        { input: 'Ignition Gateway exposes live PLC tags over port 62541 and accepts incoming sessions', expected: 'server' },
        { input: 'UA Expert connects and browses the address space of a remote server', expected: 'client' },
        { input: 'MQTT publisher pushes data to a broker without a direct session', expected: 'publisher' },
        { input: 'Listener subscribes to broker topic for sensor readings', expected: 'subscriber' },
      ]
      return cases.map(c => {
        try {
          const actual = solution(c.input)
          return { passed: actual === c.expected, expected: c.expected, actual }
        } catch (e) {
          return { passed: false, error: e.message }
        }
      })
    },
  },

  // ─── Ch 2: Architecture ────────────────────────────────────────────────────
  architecture: {
    id: 'ua-ch2-ex',
    title: 'Parse an OPC UA Endpoint URL',
    scenario: `OPC UA endpoints are identified by URLs like:
  opc.tcp://192.168.1.10:4840/OPCUA/SimulationServer
  opc.tcp://plc01.plant.local:62541

Parse the URL and return an object with four fields:
  { scheme, host, port, path }

Rules:
  • scheme — everything before "://" (e.g. "opc.tcp", "opc.https")
  • host   — hostname or IP (no port, no path)
  • port   — integer; default to 4840 if not present
  • path   — everything after host:port (empty string "" if none)`,
    hint: `Split on "://" to get the scheme, then split the remainder on "/" to separate host:port from path. Split host:port on ":" to extract port.`,
    starter: `function parseEndpointUrl(url) {
  // Step 1: Split on '://' to separate scheme from the rest
  // Step 2: Split the remainder on '/' — first chunk is host[:port], rest is path
  // Step 3: Split host[:port] on ':' — second part is port (parse as int)
  //         If no port, default to 4840
  // Step 4: Reassemble path with leading '/' or return '' if no path segments
  // Return { scheme, host, port, path }

  // TODO: implement parsing here

  return { scheme: '', host: '', port: 0, path: '' }; // replace with real values
}
const solution = parseEndpointUrl;

console.log(parseEndpointUrl('opc.tcp://192.168.1.10:4840/OPCUA/SimulationServer'));
// { scheme: 'opc.tcp', host: '192.168.1.10', port: 4840, path: '/OPCUA/SimulationServer' }`,
    starterPy: `def parse_endpoint_url(url):
    # Step 1: Split on '://' to get scheme and the rest
    # Step 2: Split remainder on '/' — first part is host[:port]
    # Step 3: Split host_port on ':' to get host and port (default 4840)
    # Step 4: Rebuild path from remaining segments
    # Return dict: { 'scheme', 'host', 'port', 'path' }

    # TODO: implement here

    return {'scheme': '', 'host': '', 'port': 0, 'path': ''}

solution = parse_endpoint_url`,
    starterJython: `def parse_endpoint_url(url):
    # Step 1: Split on '://' to get scheme and the rest
    # Step 2: Split remainder on '/' — first part is host[:port]
    # Step 3: Split host_port on ':' to get host and port (default 4840)
    # Step 4: Rebuild path from remaining segments
    # Return dict: { 'scheme', 'host', 'port', 'path' }

    # TODO: implement here

    return {'scheme': '', 'host': '', 'port': 0, 'path': ''}

solution = parse_endpoint_url`,
    tests: [
      { description: "parseEndpointUrl('opc.tcp://192.168.1.10:4840/OPCUA/Server') → port 4840, path '/OPCUA/Server'" },
      { description: "parseEndpointUrl('opc.tcp://plc01.plant.local:62541') → port 62541, path ''" },
      { description: "parseEndpointUrl('opc.https://historian.corp.com/ua') → scheme 'opc.https'" },
      { description: "parseEndpointUrl('opc.tcp://10.0.0.1') → port defaults to 4840" },
    ],
    testRunner: function (solution) {
      const cases = [
        {
          input: 'opc.tcp://192.168.1.10:4840/OPCUA/SimulationServer',
          check: r => r && r.scheme === 'opc.tcp' && r.host === '192.168.1.10' && r.port === 4840 && r.path === '/OPCUA/SimulationServer',
          expected: { scheme: 'opc.tcp', host: '192.168.1.10', port: 4840, path: '/OPCUA/SimulationServer' },
        },
        {
          input: 'opc.tcp://plc01.plant.local:62541',
          check: r => r && r.scheme === 'opc.tcp' && r.host === 'plc01.plant.local' && r.port === 62541 && r.path === '',
          expected: { scheme: 'opc.tcp', host: 'plc01.plant.local', port: 62541, path: '' },
        },
        {
          input: 'opc.https://historian.corp.com/ua',
          check: r => r && r.scheme === 'opc.https' && r.host === 'historian.corp.com',
          expected: { scheme: 'opc.https', host: 'historian.corp.com', port: 4840, path: '/ua' },
        },
        {
          input: 'opc.tcp://10.0.0.1',
          check: r => r && r.port === 4840 && r.path === '',
          expected: { scheme: 'opc.tcp', host: '10.0.0.1', port: 4840, path: '' },
        },
      ]
      return cases.map(c => {
        try {
          const actual = solution(c.input)
          const passed = c.check(actual)
          return { passed, expected: c.expected, actual }
        } catch (e) {
          return { passed: false, error: e.message }
        }
      })
    },
  },

  // ─── Ch 3: Information Model ───────────────────────────────────────────────
  infomodel: {
    id: 'ua-ch3-ex',
    title: 'Parse an OPC UA NodeId',
    scenario: `OPC UA NodeIds identify every node in the address space. They come in three common string forms:
  ns=2;i=1001       — numeric identifier in namespace 2
  ns=3;s=Temperature  — string identifier
  ns=0;g=C496578A-0DED-11D3-BDBE-00105A64690B  — GUID identifier
  i=84              — numeric, namespace 0 (when ns= is omitted)

Parse the NodeId string and return:
  { namespace: <int>, type: 'numeric'|'string'|'guid', identifier: <value> }

Where identifier is a number for numeric, a string for string/guid.`,
    hint: `Split on ';' to separate 'ns=N' from the type=value part. If 'ns=' is missing, namespace is 0. Check the prefix: 'i=' numeric, 's=' string, 'g=' guid.`,
    starter: `function parseNodeId(str) {
  // NodeId format examples:
  //   'ns=2;i=1001'      → { namespace: 2, type: 'numeric', identifier: 1001 }
  //   'ns=3;s=Temperature' → { namespace: 3, type: 'string', identifier: 'Temperature' }
  //   'i=84'             → { namespace: 0, type: 'numeric', identifier: 84 }

  // Step 1: Split on ';' — if two parts, first is 'ns=N'
  // Step 2: Parse namespace (default 0 if no 'ns=' part)
  // Step 3: Check the type prefix: i= → numeric, s= → string, g= → guid
  // Step 4: Parse identifier value (parseInt for numeric)

  // TODO: implement here

  return { namespace: 0, type: '', identifier: null }; // replace with real values
}
const solution = parseNodeId;

console.log(parseNodeId('ns=2;i=1001'));       // { namespace: 2, type: 'numeric', identifier: 1001 }
console.log(parseNodeId('ns=3;s=Temperature')); // { namespace: 3, type: 'string', identifier: 'Temperature' }
console.log(parseNodeId('i=84'));              // { namespace: 0, type: 'numeric', identifier: 84 }`,
    starterPy: `def parse_node_id(s):
    # NodeId format examples:
    #   'ns=2;i=1001'        -> { namespace: 2, type: 'numeric', identifier: 1001 }
    #   'ns=3;s=Temperature' -> { namespace: 3, type: 'string',  identifier: 'Temperature' }
    #   'i=84'               -> { namespace: 0, type: 'numeric', identifier: 84 }

    # Step 1: Split on ';' — check if first part starts with 'ns='
    # Step 2: Parse namespace (default 0)
    # Step 3: Identify type from prefix i= / s= / g=
    # Step 4: Extract identifier value

    # TODO: implement here

    return {'namespace': 0, 'type': '', 'identifier': None}

solution = parse_node_id`,
    starterJython: `def parse_node_id(s):
    # Same as Python version — no f-strings, use .format() if needed
    # Step 1: Split on ';'
    # Step 2: Parse namespace (default 0)
    # Step 3: Identify type: i= numeric, s= string, g= guid
    # Step 4: Extract identifier

    # TODO: implement here

    return {'namespace': 0, 'type': '', 'identifier': None}

solution = parse_node_id`,
    tests: [
      { description: "parseNodeId('ns=2;i=1001') → { namespace:2, type:'numeric', identifier:1001 }" },
      { description: "parseNodeId('ns=3;s=Temperature') → { namespace:3, type:'string', identifier:'Temperature' }" },
      { description: "parseNodeId('i=84') → { namespace:0, type:'numeric', identifier:84 }" },
      { description: "parseNodeId('ns=1;g=C496578A-0DED-11D3-BDBE-00105A64690B') → { type:'guid' }" },
    ],
    testRunner: function (solution) {
      const cases = [
        { input: 'ns=2;i=1001',   expected: { namespace: 2, type: 'numeric', identifier: 1001 } },
        { input: 'ns=3;s=Temperature', expected: { namespace: 3, type: 'string', identifier: 'Temperature' } },
        { input: 'i=84',          expected: { namespace: 0, type: 'numeric', identifier: 84 } },
        { input: 'ns=1;g=C496578A-0DED-11D3-BDBE-00105A64690B', expected: { namespace: 1, type: 'guid', identifier: 'C496578A-0DED-11D3-BDBE-00105A64690B' } },
      ]
      return cases.map(c => {
        try {
          const actual = solution(c.input)
          const passed = actual &&
            actual.namespace === c.expected.namespace &&
            actual.type === c.expected.type &&
            actual.identifier === c.expected.identifier
          return { passed: !!passed, expected: c.expected, actual }
        } catch (e) {
          return { passed: false, error: e.message }
        }
      })
    },
  },

  // ─── Ch 4: Services ────────────────────────────────────────────────────────
  services: {
    id: 'ua-ch4-ex',
    title: 'Classify an OPC UA Service Call',
    scenario: `OPC UA Part 4 defines five service families. Given a service name, return which family it belongs to:
  • 'read'       — ReadRequest, HistoricalRead, ReadRaw
  • 'write'      — WriteRequest, HistoricalWrite
  • 'browse'     — BrowseRequest, BrowseNextRequest, TranslateBrowsePathsToNodeIds
  • 'subscribe'  — CreateSubscription, CreateMonitoredItems, Publish, SetPublishingMode
  • 'method'     — Call (invoking UA Methods on a node)

Return exactly: 'read' | 'write' | 'browse' | 'subscribe' | 'method'`,
    hint: `Match on substrings: 'Read' → read, 'Write' → write, 'Browse'/'Translate' → browse, 'Subscription'/'MonitoredItem'/'Publish' → subscribe, 'Call' → method.`,
    starter: `function classifyService(serviceName) {
  // OPC UA service families:
  //   read      → ReadRequest, HistoricalRead
  //   write     → WriteRequest, HistoricalWrite
  //   browse    → BrowseRequest, BrowseNext, TranslateBrowsePaths...
  //   subscribe → CreateSubscription, CreateMonitoredItems, Publish, SetPublishingMode
  //   method    → Call

  // TODO: Check serviceName for keywords and return the matching family string.
  // Hint: use serviceName.includes('Keyword') or a series of if/else

  return ''; // replace with 'read', 'write', 'browse', 'subscribe', or 'method'
}
const solution = classifyService;

console.log(classifyService('ReadRequest'));           // 'read'
console.log(classifyService('CreateMonitoredItems')); // 'subscribe'
console.log(classifyService('Call'));                  // 'method'`,
    starterPy: `def classify_service(service_name):
    # Families: read, write, browse, subscribe, method
    # TODO: check service_name for keywords, return family string

    return ''  # replace with 'read', 'write', 'browse', 'subscribe', or 'method'

solution = classify_service`,
    starterJython: `def classify_service(service_name):
    # Families: read, write, browse, subscribe, method
    # TODO: check service_name for keywords, return family string

    return ''

solution = classify_service`,
    tests: [
      { description: "classifyService('ReadRequest') === 'read'" },
      { description: "classifyService('WriteRequest') === 'write'" },
      { description: "classifyService('BrowseNextRequest') === 'browse'" },
      { description: "classifyService('CreateMonitoredItems') === 'subscribe'" },
      { description: "classifyService('Call') === 'method'" },
    ],
    testRunner: function (solution) {
      const cases = [
        { input: 'ReadRequest',           expected: 'read' },
        { input: 'WriteRequest',          expected: 'write' },
        { input: 'BrowseNextRequest',     expected: 'browse' },
        { input: 'CreateMonitoredItems',  expected: 'subscribe' },
        { input: 'Call',                  expected: 'method' },
      ]
      return cases.map(c => {
        try {
          const actual = solution(c.input)
          return { passed: actual === c.expected, expected: c.expected, actual }
        } catch (e) {
          return { passed: false, error: e.message }
        }
      })
    },
  },

  // ─── Ch 5: Security ────────────────────────────────────────────────────────
  security: {
    id: 'ua-ch5-ex',
    title: 'Rank an OPC UA Security Mode',
    scenario: `OPC UA defines three message security modes. Given the mode name, return its security level as an integer 1–3:
  • 'None'             → 1  (no security — common in plant floors, dangerous on internet)
  • 'Sign'             → 2  (messages are signed, integrity verified, but not encrypted)
  • 'SignAndEncrypt'   → 3  (signed + encrypted — highest security)

Return 0 if the mode string is unrecognized.`,
    hint: `This is a simple lookup. A switch/case or an object map works well. Make sure you handle case sensitivity — the canonical forms are 'None', 'Sign', 'SignAndEncrypt'.`,
    starter: `function rankSecurityMode(mode) {
  // Security mode levels:
  //   'None'           → 1
  //   'Sign'           → 2
  //   'SignAndEncrypt' → 3
  //   unknown          → 0

  // TODO: return the integer rank for the given mode.
  // Hint: use a plain object map: const levels = { None: 1, Sign: 2, ... }

  return 0; // replace with 1, 2, or 3
}
const solution = rankSecurityMode;

console.log(rankSecurityMode('None'));           // 1
console.log(rankSecurityMode('Sign'));           // 2
console.log(rankSecurityMode('SignAndEncrypt')); // 3
console.log(rankSecurityMode('Unknown'));        // 0`,
    starterPy: `def rank_security_mode(mode):
    # Security mode levels:
    #   'None'           -> 1
    #   'Sign'           -> 2
    #   'SignAndEncrypt' -> 3
    #   unknown          -> 0

    # TODO: return the integer rank for the given mode.
    # Hint: use a dict: levels = {'None': 1, 'Sign': 2, 'SignAndEncrypt': 3}

    return 0

solution = rank_security_mode`,
    starterJython: `def rank_security_mode(mode):
    levels = {}  # TODO: populate with mode -> level mappings

    # TODO: return levels.get(mode, 0)
    return 0

solution = rank_security_mode`,
    tests: [
      { description: "rankSecurityMode('None') === 1" },
      { description: "rankSecurityMode('Sign') === 2" },
      { description: "rankSecurityMode('SignAndEncrypt') === 3" },
      { description: "rankSecurityMode('BadMode') === 0" },
    ],
    testRunner: function (solution) {
      const cases = [
        { input: 'None',           expected: 1 },
        { input: 'Sign',           expected: 2 },
        { input: 'SignAndEncrypt', expected: 3 },
        { input: 'BadMode',        expected: 0 },
      ]
      return cases.map(c => {
        try {
          const actual = solution(c.input)
          return { passed: actual === c.expected, expected: c.expected, actual }
        } catch (e) {
          return { passed: false, error: e.message }
        }
      })
    },
  },

  // ─── Ch 6: Subscriptions & MonitoredItems ─────────────────────────────────
  subscriptions: {
    id: 'ua-ch6-ex',
    title: 'Calculate Keep-Alive Timeout',
    scenario: `When an OPC UA subscription has no value changes, the server sends keep-alive messages to confirm the connection is alive. The keep-alive arrives after:
  keepAliveTimeout = publishingInterval × maxKeepAliveCount

Given publishingInterval (in milliseconds) and maxKeepAliveCount (integer), return the keep-alive timeout in milliseconds.

Edge case: if either argument is zero or negative, return -1 to indicate an invalid configuration.`,
    hint: `Multiply the two values. Handle the edge case first with a guard clause before doing math.`,
    starter: `function calcKeepAliveTimeout(publishingInterval, maxKeepAliveCount) {
  // Keep-alive formula:
  //   keepAliveTimeout = publishingInterval * maxKeepAliveCount
  //
  // Edge case: if publishingInterval <= 0 OR maxKeepAliveCount <= 0, return -1

  // TODO: Step 1 — guard clause: check for invalid inputs
  // TODO: Step 2 — return the product

  return 0; // replace with real calculation
}
const solution = calcKeepAliveTimeout;

console.log(calcKeepAliveTimeout(500, 10));  // 5000 ms
console.log(calcKeepAliveTimeout(1000, 3));  // 3000 ms
console.log(calcKeepAliveTimeout(0, 10));    // -1 (invalid)`,
    starterPy: `def calc_keep_alive_timeout(publishing_interval, max_keep_alive_count):
    # keepAliveTimeout = publishingInterval * maxKeepAliveCount
    # If either value <= 0, return -1

    # TODO: guard clause for invalid inputs
    # TODO: return the product

    return 0

solution = calc_keep_alive_timeout`,
    starterJython: `def calc_keep_alive_timeout(publishing_interval, max_keep_alive_count):
    # keepAliveTimeout = publishingInterval * maxKeepAliveCount
    # If either value <= 0, return -1

    # TODO: guard clause
    # TODO: return product

    return 0

solution = calc_keep_alive_timeout`,
    tests: [
      { description: 'calcKeepAliveTimeout(500, 10) === 5000' },
      { description: 'calcKeepAliveTimeout(1000, 3) === 3000' },
      { description: 'calcKeepAliveTimeout(0, 10) === -1 (invalid input)' },
      { description: 'calcKeepAliveTimeout(250, -1) === -1 (invalid input)' },
    ],
    testRunner: function (solution) {
      const cases = [
        { input: [500,  10], expected: 5000 },
        { input: [1000,  3], expected: 3000 },
        { input: [0,    10], expected: -1 },
        { input: [250,  -1], expected: -1 },
      ]
      return cases.map(c => {
        try {
          const actual = solution(...c.input)
          return { passed: actual === c.expected, expected: c.expected, actual }
        } catch (e) {
          return { passed: false, error: e.message }
        }
      })
    },
  },

  // ─── Ch 7: Transport & Encoding ────────────────────────────────────────────
  transport: {
    id: 'ua-ch7-ex',
    title: 'Select the Right OPC UA Encoding',
    scenario: `OPC UA supports three encodings. Given a requirements object, return the best encoding name:
  • 'ua-binary'  — fastest, smallest payload; use when performance matters and both ends are UA-native
  • 'json'       — human-readable, firewall-friendly; use when interop with non-UA systems is required
  • 'xml'        — verbose, legacy; use when the system requires it explicitly

Requirements object has boolean flags:
  { requiresInterop, requiresXml, prioritizePerformance }

Selection logic (in order of precedence):
  1. If requiresXml   → 'xml'
  2. If requiresInterop → 'json'
  3. If prioritizePerformance → 'ua-binary'
  4. Default → 'ua-binary'`,
    hint: `Evaluate the flags in the documented order of precedence. Use if/else if chains — the order matters.`,
    starter: `function selectEncoding(requirements) {
  // requirements = { requiresXml, requiresInterop, prioritizePerformance }
  //
  // Precedence:
  //   1. requiresXml          → 'xml'
  //   2. requiresInterop      → 'json'
  //   3. prioritizePerformance or default → 'ua-binary'

  // TODO: implement the precedence logic

  return ''; // replace with 'ua-binary', 'json', or 'xml'
}
const solution = selectEncoding;

console.log(selectEncoding({ requiresXml: true }));                          // 'xml'
console.log(selectEncoding({ requiresInterop: true }));                      // 'json'
console.log(selectEncoding({ prioritizePerformance: true }));                // 'ua-binary'
console.log(selectEncoding({}));                                             // 'ua-binary'`,
    starterPy: `def select_encoding(requirements):
    # requirements dict with optional keys: requiresXml, requiresInterop, prioritizePerformance
    # Precedence: xml > json > ua-binary (default)

    # TODO: implement precedence logic
    return ''

solution = select_encoding`,
    starterJython: `def select_encoding(requirements):
    # requirements dict: requiresXml, requiresInterop, prioritizePerformance
    # Precedence: xml > json > ua-binary (default)

    # TODO: implement precedence logic
    return ''

solution = select_encoding`,
    tests: [
      { description: "selectEncoding({ requiresXml: true }) === 'xml'" },
      { description: "selectEncoding({ requiresInterop: true }) === 'json'" },
      { description: "selectEncoding({ prioritizePerformance: true }) === 'ua-binary'" },
      { description: "selectEncoding({}) === 'ua-binary' (default)" },
    ],
    testRunner: function (solution) {
      const cases = [
        { input: { requiresXml: true },               expected: 'xml' },
        { input: { requiresInterop: true },            expected: 'json' },
        { input: { prioritizePerformance: true },      expected: 'ua-binary' },
        { input: {},                                   expected: 'ua-binary' },
      ]
      return cases.map(c => {
        try {
          const actual = solution(c.input)
          return { passed: actual === c.expected, expected: c.expected, actual }
        } catch (e) {
          return { passed: false, error: e.message }
        }
      })
    },
  },

  // ─── Ch 8: OPC UA in Ignition & RTAC ──────────────────────────────────────
  ignition: {
    id: 'ua-ch8-ex',
    title: 'Build an Ignition Tag Path',
    scenario: `Ignition tag paths follow this format:
  [provider]folder1/folder2/tagName

Given a provider name (string), an array of folder names (may be empty), and a tag name, construct and return the full tag path string.

Rules:
  • Provider is wrapped in square brackets: [provider]
  • Folders are joined with '/' with no leading slash
  • Tag name follows the last folder (or the provider directly if no folders) with a '/' separator
  • If folders array is empty, path is simply: [provider]tagName`,
    hint: `Combine provider in brackets with folders joined by '/' and tag name. Array.join('/') handles the folder path, then concatenate everything.`,
    starter: `function buildTagPath(provider, folders, tagName) {
  // Ignition tag path format: [provider]folder1/folder2/tagName
  // If folders is empty: [provider]tagName

  // TODO: Step 1 — wrap provider in brackets: '[' + provider + ']'
  // TODO: Step 2 — if folders.length > 0, join them with '/' and append '/'
  // TODO: Step 3 — append tagName
  // TODO: Return the assembled string

  return ''; // replace with real tag path
}
const solution = buildTagPath;

console.log(buildTagPath('default', ['Reactor', 'Feed'], 'FlowRate'));
// '[default]Reactor/Feed/FlowRate'
console.log(buildTagPath('RTAC', [], 'BreakerStatus'));
// '[RTAC]BreakerStatus'`,
    starterPy: `def build_tag_path(provider, folders, tag_name):
    # [provider]folder1/folder2/tagName
    # If folders is empty: [provider]tagName

    # TODO: wrap provider in brackets
    # TODO: join folders with '/'
    # TODO: append tag_name

    return ''

solution = build_tag_path`,
    starterJython: `def build_tag_path(provider, folders, tag_name):
    # [provider]folder1/folder2/tagName
    # If no folders: [provider]tagName

    # TODO: wrap provider in brackets
    # TODO: join folders (if any) with '/'
    # TODO: append tag_name

    return ''

solution = build_tag_path`,
    tests: [
      { description: "buildTagPath('default', ['Reactor','Feed'], 'FlowRate') === '[default]Reactor/Feed/FlowRate'" },
      { description: "buildTagPath('RTAC', [], 'BreakerStatus') === '[RTAC]BreakerStatus'" },
      { description: "buildTagPath('Ignition', ['Area1'], 'Temperature') === '[Ignition]Area1/Temperature'" },
      { description: "buildTagPath('sim', ['A','B','C'], 'Tag') === '[sim]A/B/C/Tag'" },
    ],
    testRunner: function (solution) {
      const cases = [
        { input: ['default', ['Reactor', 'Feed'], 'FlowRate'], expected: '[default]Reactor/Feed/FlowRate' },
        { input: ['RTAC',    [],                  'BreakerStatus'], expected: '[RTAC]BreakerStatus' },
        { input: ['Ignition',['Area1'],            'Temperature'], expected: '[Ignition]Area1/Temperature' },
        { input: ['sim',     ['A','B','C'],        'Tag'], expected: '[sim]A/B/C/Tag' },
      ]
      return cases.map(c => {
        try {
          const actual = solution(...c.input)
          return { passed: actual === c.expected, expected: c.expected, actual }
        } catch (e) {
          return { passed: false, error: e.message }
        }
      })
    },
  },

  // ─── Ch 9: Troubleshooting ─────────────────────────────────────────────────
  troubleshoot: {
    id: 'ua-ch9-ex',
    title: 'Classify an OPC UA Status Code',
    scenario: `OPC UA 32-bit status codes encode severity and category. The top two bits encode severity:
  0b00 (0x00000000 mask) → 'Good'
  0b01 (0x40000000 mask) → 'Uncertain'
  0b10 (0x80000000 mask) → 'Bad'

The next 12 bits (bits 16–27) encode the sub-category. For this exercise, classify only by severity using the top two bits.

Given a 32-bit integer status code, return:
  { severity: 'Good'|'Uncertain'|'Bad' }

Common examples:
  0x00000000 → Good (no error)
  0x40000000 → Uncertain (data quality questionable)
  0x80340000 → Bad (BadNoCommunication)
  0xC0000000 → Bad (top bits = 0b11 → also treated as Bad)`,
    hint: `Extract the top two bits with: (code >>> 30). Values: 0 = Good, 1 = Uncertain, 2 or 3 = Bad. Use >>> (unsigned right shift) not >> in JavaScript.`,
    starter: `function classifyStatusCode(code) {
  // Extract the top 2 bits: severity = code >>> 30
  //   0 → 'Good'
  //   1 → 'Uncertain'
  //   2 → 'Bad'
  //   3 → 'Bad' (also treated as Bad)
  //
  // Return { severity: 'Good' | 'Uncertain' | 'Bad' }

  // TODO: Step 1 — extract top 2 bits with >>> 30
  // TODO: Step 2 — map the value to severity string
  // TODO: Step 3 — return { severity }

  return { severity: '' }; // replace with real result
}
const solution = classifyStatusCode;

console.log(classifyStatusCode(0x00000000)); // { severity: 'Good' }
console.log(classifyStatusCode(0x80340000)); // { severity: 'Bad' }
console.log(classifyStatusCode(0x40000000)); // { severity: 'Uncertain' }`,
    starterPy: `def classify_status_code(code):
    # Extract top 2 bits: severity = (code >> 30) & 0x3
    #   0 -> 'Good', 1 -> 'Uncertain', 2 or 3 -> 'Bad'
    # Return {'severity': ...}

    # TODO: extract severity bits
    # TODO: map to string

    return {'severity': ''}

solution = classify_status_code`,
    starterJython: `def classify_status_code(code):
    # Extract top 2 bits: (code >> 30) & 0x3
    #   0 -> 'Good', 1 -> 'Uncertain', 2 or 3 -> 'Bad'
    # Return {'severity': ...}

    # TODO: extract and map

    return {'severity': ''}

solution = classify_status_code`,
    tests: [
      { description: "classifyStatusCode(0x00000000) → { severity: 'Good' }" },
      { description: "classifyStatusCode(0x40000000) → { severity: 'Uncertain' }" },
      { description: "classifyStatusCode(0x80340000) → { severity: 'Bad' } (BadNoCommunication)" },
      { description: "classifyStatusCode(0xC0000000) → { severity: 'Bad' } (top bits 11)" },
    ],
    testRunner: function (solution) {
      const cases = [
        { input: 0x00000000, expected: 'Good' },
        { input: 0x40000000, expected: 'Uncertain' },
        { input: 0x80340000, expected: 'Bad' },
        { input: 0xC0000000, expected: 'Bad' },
      ]
      return cases.map(c => {
        try {
          const actual = solution(c.input)
          return { passed: actual?.severity === c.expected, expected: { severity: c.expected }, actual }
        } catch (e) {
          return { passed: false, error: e.message }
        }
      })
    },
  },
}
