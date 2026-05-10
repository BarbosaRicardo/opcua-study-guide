// OPC UA Code Lab — 3 difficulty levels
// Covers OPC UA addressing, security, subscriptions, and session management

export const OPCUA_LAB = [
  // ─────────────────────────────────────────────────────────────
  // LEVEL 1 — Foundations: OPC UA addressing and status codes
  // ─────────────────────────────────────────────────────────────
  {
    id: 'ua-l1-1',
    level: 1,
    title: 'OPC UA NodeId Parser',
    scenario: `Every node in an OPC UA Address Space is identified by a NodeId.
NodeIds have a namespace index and an identifier that can be numeric, string, GUID, or opaque.

Common formats:
  "i=84"            → namespace 0, numeric 84 (Root folder)
  "ns=2;i=1001"     → namespace 2, numeric 1001
  "ns=2;s=Tank1.Level" → namespace 2, string "Tank1.Level"
  "ns=3;g=..."      → namespace 3, GUID (rare)

Implement parseNodeId(str) that returns:
  { namespace: number, type: 'numeric'|'string'|'guid', identifier: string|number }

Return null for invalid input.`,
    hint: 'Split on ";" first. The namespace defaults to 0 if not specified. Numeric identifiers (i=) should be returned as numbers.',
    starter: `function parseNodeId(str) {
  if (!str || typeof str !== 'string') return null;

  let namespace = 0;
  let remaining = str.trim();

  // Check for namespace prefix "ns=X;"
  if (remaining.startsWith('ns=')) {
    const semi = remaining.indexOf(';');
    if (semi === -1) return null;
    namespace = parseInt(remaining.slice(3, semi), 10);
    remaining = remaining.slice(semi + 1);
  }

  if (remaining.startsWith('i=')) {
    const id = parseInt(remaining.slice(2), 10);
    if (isNaN(id)) return null;
    return { namespace, type: 'numeric', identifier: id };
  }

  if (remaining.startsWith('s=')) {
    return { namespace, type: 'string', identifier: remaining.slice(2) };
  }

  if (remaining.startsWith('g=')) {
    return { namespace, type: 'guid', identifier: remaining.slice(2) };
  }

  return null;
}

const solution = parseNodeId;

// Test it:
console.log(parseNodeId('i=84'));              // {namespace:0, type:'numeric', identifier:84}
console.log(parseNodeId('ns=2;s=Tank1.Level')); // {namespace:2, type:'string', identifier:'Tank1.Level'}
console.log(parseNodeId('ns=3;i=1001'));       // {namespace:3, type:'numeric', identifier:1001}`,
    tests: [
      { description: 'parseNodeId("i=84") → {namespace:0, type:"numeric", identifier:84}' },
      { description: 'parseNodeId("ns=2;s=Tank1.Level") → {namespace:2, type:"string", identifier:"Tank1.Level"}' },
      { description: 'parseNodeId("ns=3;i=1001") → {namespace:3, type:"numeric", identifier:1001}' },
      { description: 'parseNodeId(null) → null (invalid input guard)' },
    ],
    testRunner: function(solution) {
      if (typeof solution !== 'function') return [
        { passed: false, error: 'solution is not a function' },
        { passed: false, error: 'solution is not a function' },
        { passed: false, error: 'solution is not a function' },
        { passed: false, error: 'solution is not a function' },
      ]
      const cases = [
        { input: 'i=84',               check: r => r?.namespace===0 && r?.type==='numeric' && r?.identifier===84 },
        { input: 'ns=2;s=Tank1.Level', check: r => r?.namespace===2 && r?.type==='string' && r?.identifier==='Tank1.Level' },
        { input: 'ns=3;i=1001',        check: r => r?.namespace===3 && r?.type==='numeric' && r?.identifier===1001 },
        { input: null,                  check: r => r === null },
      ]
      return cases.map(c => {
        try {
          const result = solution(c.input)
          return { passed: c.check(result), actual: result }
        } catch(e) { return { passed: false, error: e.message } }
      })
    },
  },

  {
    id: 'ua-l1-2',
    level: 1,
    title: 'StatusCode Quality Decoder',
    scenario: `OPC UA StatusCodes encode quality, severity, and sub-codes in a 32-bit value.

Bit layout (high to low):
  Bits 31-30: Severity  0=Good, 1=Uncertain, 2=Bad, 3=Bad
  Bits 29-16: Sub-code  (what specifically went wrong)
  Bits 15-10: Limit bits (low/high limit flags)
  Bits  9-8:  Info type
  Bits  7-0:  Additional info

Common StatusCodes:
  0x00000000 = Good
  0x40000000 = Uncertain (severity 01)
  0x80000000 = Bad (severity 10)
  0x80350000 = BadNoCommunication
  0x80340000 = BadWaitingForInitialData

Implement decodeStatusCode(code) that returns:
  { severity: 'Good'|'Uncertain'|'Bad', isGood: bool, isBad: bool, hex: string, subCode: number }`,
    hint: 'Use unsigned right shift >>> to handle JavaScript\'s signed 32-bit integers. Severity = top 2 bits = (code >>> 30).',
    starter: `function decodeStatusCode(code) {
  // Ensure we treat this as unsigned 32-bit
  const u32 = code >>> 0;

  // Extract severity (top 2 bits)
  const severityBits = u32 >>> 30;

  const severityMap = { 0: 'Good', 1: 'Uncertain', 2: 'Bad', 3: 'Bad' };
  const severity = severityMap[severityBits];

  // Extract sub-code (bits 29-16)
  const subCode = (u32 >>> 16) & 0x3FFF;

  return {
    severity,
    isGood: severityBits === 0,
    isBad: severityBits >= 2,
    hex: '0x' + u32.toString(16).toUpperCase().padStart(8, '0'),
    subCode,
  };
}

const solution = decodeStatusCode;

// Test:
console.log(decodeStatusCode(0x00000000)); // Good
console.log(decodeStatusCode(0x80350000)); // Bad, subCode=0x35
console.log(decodeStatusCode(0x40000000)); // Uncertain`,
    tests: [
      { description: '0x00000000 → severity:"Good", isGood:true, isBad:false' },
      { description: '0x80000000 → severity:"Bad", isGood:false, isBad:true' },
      { description: '0x40000000 → severity:"Uncertain", isGood:false, isBad:false' },
      { description: '0x80350000 → Bad, subCode:0x35 (53 decimal)' },
    ],
    testRunner: function(solution) {
      if (typeof solution !== 'function') return [
        { passed: false, error: 'not a function' },
        { passed: false, error: 'not a function' },
        { passed: false, error: 'not a function' },
        { passed: false, error: 'not a function' },
      ]
      const cases = [
        { input: 0x00000000, check: r => r?.severity==='Good' && r?.isGood===true && r?.isBad===false },
        { input: 0x80000000, check: r => r?.severity==='Bad'  && r?.isGood===false && r?.isBad===true },
        { input: 0x40000000, check: r => r?.severity==='Uncertain' && r?.isGood===false && r?.isBad===false },
        { input: 0x80350000, check: r => r?.isBad===true && r?.subCode===0x35 },
      ]
      return cases.map(c => {
        try {
          const result = solution(c.input)
          return { passed: c.check(result), actual: result }
        } catch(e) { return { passed: false, error: e.message } }
      })
    },
  },

  // ─────────────────────────────────────────────────────────────
  // LEVEL 2 — Applied: subscriptions, security, and filtering
  // ─────────────────────────────────────────────────────────────
  {
    id: 'ua-l2-1',
    level: 2,
    title: 'Subscription Parameter Validator',
    scenario: `OPC UA subscriptions have rules that prevent server overload.
If you misconfigure them, the server will silently adjust or reject your subscription.

Rules from OPC UA Part 4:
  - PublishingInterval: minimum 100ms (servers may enforce higher floors)
  - MaxKeepAliveCount: must be >= 1
  - LifetimeCount: must be >= 3 × MaxKeepAliveCount
    (ensures connection has time to recover before subscription expires)
  - MaxNotificationsPerPublish: 0 means unlimited

Implement validateSubscription(params) that returns:
  { valid: boolean, errors: string[], warnings: string[], adjusted: object }

The adjusted object should contain corrected values where possible.
Flag a warning (not error) when PublishingInterval is below 1000ms for production use.`,
    hint: 'LifetimeCount >= 3 * MaxKeepAliveCount is the key OPC UA spec requirement. Real servers silently adjust, but your validator should surface the issue.',
    starter: `function validateSubscription(params) {
  const errors = [];
  const warnings = [];
  const adjusted = { ...params };

  // Validate and adjust PublishingInterval (min 100ms)
  if (params.publishingInterval < 100) {
    errors.push('publishingInterval must be >= 100ms (OPC UA minimum)');
    adjusted.publishingInterval = 100;
  } else if (params.publishingInterval < 1000) {
    warnings.push('publishingInterval < 1000ms — ensure server supports this rate in production');
  }

  // Validate MaxKeepAliveCount
  if (!params.maxKeepAliveCount || params.maxKeepAliveCount < 1) {
    errors.push('maxKeepAliveCount must be >= 1');
    adjusted.maxKeepAliveCount = 10;
  }

  // TODO: Validate LifetimeCount >= 3 * MaxKeepAliveCount
  // If invalid, adjust lifetimeCount to the minimum valid value

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    adjusted,
  };
}

const solution = validateSubscription;

// Test:
console.log(validateSubscription({
  publishingInterval: 500,
  maxKeepAliveCount: 10,
  lifetimeCount: 20,       // ← too low! should be >= 30
  maxNotificationsPerPublish: 0,
}));`,
    tests: [
      { description: 'Valid params (PI=1000, keepAlive=10, lifetime=30) → valid:true, no errors' },
      { description: 'lifetimeCount=20 with maxKeepAlive=10 → error about lifetime < 3x keepAlive' },
      { description: 'publishingInterval=50ms → error, adjusted to 100' },
      { description: 'publishingInterval=500ms (valid but fast) → warning issued' },
    ],
    testRunner: function(solution) {
      if (typeof solution !== 'function') return [{ passed: false, error: 'not a function' }]
      const cases = [
        {
          input: { publishingInterval: 1000, maxKeepAliveCount: 10, lifetimeCount: 30, maxNotificationsPerPublish: 0 },
          check: r => r?.valid === true && r?.errors?.length === 0,
        },
        {
          input: { publishingInterval: 1000, maxKeepAliveCount: 10, lifetimeCount: 20, maxNotificationsPerPublish: 0 },
          check: r => r?.valid === false && r?.errors?.some(e => /lifetime/i.test(e)),
        },
        {
          input: { publishingInterval: 50, maxKeepAliveCount: 10, lifetimeCount: 30, maxNotificationsPerPublish: 0 },
          check: r => r?.valid === false && r?.adjusted?.publishingInterval === 100,
        },
        {
          input: { publishingInterval: 500, maxKeepAliveCount: 10, lifetimeCount: 30, maxNotificationsPerPublish: 0 },
          check: r => r?.warnings?.length > 0,
        },
      ]
      return cases.map(c => {
        try { const result = solution(c.input); return { passed: c.check(result), actual: result } }
        catch(e) { return { passed: false, error: e.message } }
      })
    },
  },

  {
    id: 'ua-l2-2',
    level: 2,
    title: 'Deadband Filter for MonitoredItems',
    scenario: `OPC UA MonitoredItems support deadband filtering to reduce unnecessary notifications.
An absolute deadband means: only notify the subscriber when |newValue - lastReportedValue| >= deadband.

Percentage deadband uses the engineering range: trigger if change% >= deadband%, where:
  change% = |newValue - lastReportedValue| / (EURange_high - EURange_low) * 100

Implement a deadband filter class:
  class DeadbandFilter {
    constructor(type, value, euLow, euHigh)  // type: 'none'|'absolute'|'percent'
    shouldNotify(newValue)                    // returns boolean, updates internal state on true
    getLastReported()                         // returns last value that triggered notification
  }

This is the exact logic OPC UA servers run inside the sampling engine.`,
    hint: 'Track lastReportedValue internally. On shouldNotify, check the deadband condition. If it passes, update lastReportedValue and return true.',
    starter: `class DeadbandFilter {
  constructor(type, value, euLow = 0, euHigh = 100) {
    this.type = type;           // 'none', 'absolute', 'percent'
    this.deadbandValue = value;
    this.euLow = euLow;
    this.euHigh = euHigh;
    this.lastReported = null;   // null = never reported, always notify first time
  }

  shouldNotify(newValue) {
    // First value always notifies
    if (this.lastReported === null) {
      this.lastReported = newValue;
      return true;
    }

    const delta = Math.abs(newValue - this.lastReported);

    if (this.type === 'none') {
      // TODO: always notify
    }

    if (this.type === 'absolute') {
      // TODO: notify if delta >= deadbandValue
    }

    if (this.type === 'percent') {
      // TODO: notify if (delta / (euHigh - euLow) * 100) >= deadbandValue
    }

    return false;
  }

  getLastReported() {
    return this.lastReported;
  }
}

const solution = DeadbandFilter;

// Test:
const f = new DeadbandFilter('absolute', 2.0);
console.log(f.shouldNotify(10.0)); // true  (first value)
console.log(f.shouldNotify(11.5)); // true  (delta=1.5 >= 2.0? NO — should be false)
console.log(f.shouldNotify(12.5)); // true  (delta=2.5 >= 2.0? YES)
console.log(f.getLastReported());  // 12.5`,
    tests: [
      { description: 'Absolute deadband=2.0: first value always notifies' },
      { description: 'Absolute deadband=2.0: delta=1.5 does NOT notify; delta=2.5 DOES notify' },
      { description: 'Percent deadband=5% on 0-100 range: delta=4 → no notify; delta=6 → notify' },
      { description: 'Type=none: every value notifies regardless of delta' },
    ],
    testRunner: function(solution) {
      if (typeof solution !== 'function' && typeof solution !== 'function') {
        // also support class
        if (!solution || (typeof solution !== 'function')) return [{ passed: false, error: 'not a class or function' }]
      }
      try {
        const results = []
        // Test 1: first value always notifies
        const f1 = new solution('absolute', 2.0)
        results.push({ passed: f1.shouldNotify(10.0) === true, actual: 'first notify' })
        // Test 2: delta checks
        const f2 = new solution('absolute', 2.0)
        f2.shouldNotify(10.0) // seed
        const r2a = f2.shouldNotify(11.5) // delta 1.5 → no
        const r2b = f2.shouldNotify(12.5) // delta 2.5 from last reported (10.0) → yes
        results.push({ passed: r2a === false && r2b === true, actual: {r2a, r2b} })
        // Test 3: percent deadband
        const f3 = new solution('percent', 5, 0, 100)
        f3.shouldNotify(50.0) // seed
        const r3a = f3.shouldNotify(53.9) // 3.9% change → no
        const r3b = f3.shouldNotify(56.0) // 6% change from 50 → yes
        results.push({ passed: r3a === false && r3b === true, actual: {r3a, r3b} })
        // Test 4: none type
        const f4 = new solution('none', 0)
        f4.shouldNotify(10) // seed
        const r4 = f4.shouldNotify(10.001) // tiny change, none type → always notify
        results.push({ passed: r4 === true, actual: r4 })
        return results
      } catch(e) { return [{ passed: false, error: e.message }] }
    },
  },

  // ─────────────────────────────────────────────────────────────
  // LEVEL 3 — Expert: session management, security, Address Space
  // ─────────────────────────────────────────────────────────────
  {
    id: 'ua-l3-1',
    level: 3,
    title: 'OPC UA Session State Machine',
    scenario: `OPC UA clients must follow a strict sequence to establish a secure session.
Real drivers (Ignition, kepware, UA Expert) implement this exact state machine.

States (in order):
  DISCONNECTED → CHANNEL_OPEN → SESSION_CREATED → SESSION_ACTIVATED → BROWSING/READING → CLOSED

Each state has required actions:
  1. OpenSecureChannel   — establishes encrypted channel, returns channelId + token
  2. CreateSession       — creates session, returns sessionId + authToken
  3. ActivateSession     — activates with user credentials, returns revised authToken
  4. Browse/Read/Write   — normal operations (only valid after activation)
  5. CloseSession        — graceful disconnect

Implement a SessionManager class:
  class SessionManager {
    constructor(endpoint)
    openChannel(securityMode)   // returns { channelId, tokenId }
    createSession(appUri)       // returns { sessionId, authToken } — must have active channel
    activateSession(username, password) // returns { activated: true } — must have session
    read(nodeId)                // returns simulated value — must be activated
    closeSession()              // cleans up — returns { closed: true }
    getState()                  // returns current state string
  }

Each method must validate prerequisites and throw descriptive errors if called out of order.
This is not just theory — real OPC UA driver bugs are usually state machine violations.`,
    hint: 'Track state internally. Each method checks current state before proceeding. Use throw new Error("...") for prerequisite violations. The read() method can return a simulated value — focus on the state validation logic.',
    starter: `class SessionManager {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.state = 'DISCONNECTED';
    this.channelId = null;
    this.sessionId = null;
    this.authToken = null;
  }

  getState() {
    return this.state;
  }

  openChannel(securityMode = 'None') {
    if (this.state !== 'DISCONNECTED') {
      throw new Error('Cannot open channel: already connected (state: ' + this.state + ')');
    }
    // Simulate channel open
    this.channelId = Math.floor(Math.random() * 10000);
    this.state = 'CHANNEL_OPEN';
    return { channelId: this.channelId, tokenId: Math.floor(Math.random() * 1000), securityMode };
  }

  createSession(appUri) {
    // TODO: check state is CHANNEL_OPEN, throw if not
    // Simulate session creation
    this.sessionId = 'sess_' + Math.floor(Math.random() * 100000);
    this.authToken = 'token_' + Math.floor(Math.random() * 100000);
    this.state = 'SESSION_CREATED';
    return { sessionId: this.sessionId, authToken: this.authToken };
  }

  activateSession(username, password) {
    // TODO: check state is SESSION_CREATED, throw if not
    this.state = 'SESSION_ACTIVATED';
    return { activated: true, username };
  }

  read(nodeId) {
    // TODO: check state is SESSION_ACTIVATED, throw if not
    // Return simulated value
    return { nodeId, value: Math.random() * 100, statusCode: 0x00000000, timestamp: Date.now() };
  }

  closeSession() {
    if (this.state === 'DISCONNECTED') {
      throw new Error('No session to close');
    }
    this.state = 'DISCONNECTED';
    this.channelId = null;
    this.sessionId = null;
    this.authToken = null;
    return { closed: true };
  }
}

const solution = SessionManager;

// Test the happy path:
const mgr = new SessionManager('opc.tcp://localhost:4840');
console.log('State:', mgr.getState());                 // DISCONNECTED
mgr.openChannel('SignAndEncrypt');
console.log('State:', mgr.getState());                 // CHANNEL_OPEN
mgr.createSession('urn:myapp');
mgr.activateSession('engineer', 'password123');
console.log('State:', mgr.getState());                 // SESSION_ACTIVATED
const val = mgr.read('ns=2;s=Tank1.Level');
console.log('Read value:', val.value.toFixed(2));
mgr.closeSession();
console.log('State:', mgr.getState());                 // DISCONNECTED`,
    tests: [
      { description: 'Happy path: DISCONNECTED → CHANNEL_OPEN → SESSION_CREATED → SESSION_ACTIVATED' },
      { description: 'createSession() without openChannel() throws an error' },
      { description: 'read() before activateSession() throws an error' },
      { description: 'closeSession() resets state to DISCONNECTED' },
    ],
    testRunner: function(solution) {
      if (typeof solution !== 'function') return [{ passed: false, error: 'not a class' }]
      const results = []
      // Test 1: happy path state transitions
      try {
        const m = new solution('opc.tcp://localhost:4840')
        if (m.getState() !== 'DISCONNECTED') { results.push({ passed: false, error: 'initial state not DISCONNECTED' }); }
        else {
          m.openChannel()
          m.createSession('urn:test')
          m.activateSession('u', 'p')
          results.push({ passed: m.getState() === 'SESSION_ACTIVATED', actual: m.getState() })
        }
      } catch(e) { results.push({ passed: false, error: e.message }) }
      // Test 2: createSession without channel
      try {
        const m = new solution('opc.tcp://localhost:4840')
        let threw = false
        try { m.createSession('urn:test') } catch(e) { threw = true }
        results.push({ passed: threw, actual: threw ? 'threw correctly' : 'no error' })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      // Test 3: read before activation
      try {
        const m = new solution('opc.tcp://localhost:4840')
        m.openChannel()
        m.createSession('urn:test')
        let threw = false
        try { m.read('ns=2;i=1001') } catch(e) { threw = true }
        results.push({ passed: threw, actual: threw ? 'threw correctly' : 'no error thrown' })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      // Test 4: closeSession resets
      try {
        const m = new solution('opc.tcp://localhost:4840')
        m.openChannel(); m.createSession('urn:test'); m.activateSession('u', 'p')
        const r = m.closeSession()
        results.push({ passed: r?.closed === true && m.getState() === 'DISCONNECTED', actual: m.getState() })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      return results
    },
  },

  {
    id: 'ua-l3-2',
    level: 3,
    title: 'Certificate Trust Chain Validator',
    scenario: `OPC UA uses X.509 certificates for mutual authentication. A certificate is trusted if:
  1. It is in the trusted store directly, OR
  2. It was signed by a CA whose certificate is in the trusted store (chain of trust)
  3. It has not expired (validFrom <= now <= validTo)
  4. Its application URI (in SubjectAltName) matches the session's announced ApplicationUri

In real deployments (Ignition, kepware, UA Expert), this logic runs on EVERY connection attempt.
Getting it wrong causes BadCertificateUntrusted or BadCertificateTimeInvalid errors.

Implement validateCertificateChain(cert, trustedStore, now) where:
  cert = { thumbprint, issuer, subject, validFrom, validTo, appUri, isCa }
  trustedStore = array of cert objects
  now = timestamp (ms)

Return:
  { trusted: bool, reason: string }

The reason should be a descriptive OPC UA-style error name when not trusted.`,
    hint: 'Check: (1) is cert directly in trusted store by thumbprint, (2) find issuer cert in store and verify it is a CA, (3) check validity period, (4) the appUri check should be noted but does not apply to CA certs.',
    starter: `function validateCertificateChain(cert, trustedStore, now = Date.now()) {
  if (!cert || !trustedStore) {
    return { trusted: false, reason: 'BadCertificateInvalid' };
  }

  // Check 1: Is cert directly trusted by thumbprint?
  const directlyTrusted = trustedStore.some(t => t.thumbprint === cert.thumbprint);
  if (directlyTrusted) {
    // Still need to check validity period
    if (now < cert.validFrom || now > cert.validTo) {
      return { trusted: false, reason: 'BadCertificateTimeInvalid' };
    }
    return { trusted: true, reason: 'DirectlyTrusted' };
  }

  // Check 2: Find issuer in trusted store
  const issuerCert = trustedStore.find(t => t.subject === cert.issuer);
  if (!issuerCert) {
    return { trusted: false, reason: 'BadCertificateUntrusted' };
  }

  // TODO: Check that issuer cert is actually a CA (isCa === true)
  // Return BadCertificateIssuerNotTrusted if not

  // TODO: Check validity period for both cert and issuerCert
  // Return BadCertificateTimeInvalid if either is expired

  // If all checks pass:
  return { trusted: true, reason: 'ChainTrusted' };
}

const solution = validateCertificateChain;

// Build a test scenario:
const rootCA = {
  thumbprint: 'ca-thumb-001',
  subject: 'CN=MyCA,O=MyOrg',
  issuer: 'CN=MyCA,O=MyOrg',
  validFrom: Date.now() - 1000000,
  validTo: Date.now() + 31536000000, // 1 year
  isCa: true,
};

const clientCert = {
  thumbprint: 'client-thumb-001',
  subject: 'CN=IgnitionGateway,O=IA',
  issuer: 'CN=MyCA,O=MyOrg',
  validFrom: Date.now() - 86400000,
  validTo: Date.now() + 31536000000,
  appUri: 'urn:ignition:gateway',
  isCa: false,
};

const trustedStore = [rootCA];

console.log(validateCertificateChain(clientCert, trustedStore));
// Expected: { trusted: true, reason: 'ChainTrusted' }`,
    tests: [
      { description: 'Directly trusted cert (in store) with valid dates → {trusted:true, reason:"DirectlyTrusted"}' },
      { description: 'Chain trust: cert signed by trusted CA → {trusted:true, reason:"ChainTrusted"}' },
      { description: 'Non-CA cert as issuer → {trusted:false, reason:"BadCertificateIssuerNotTrusted"}' },
      { description: 'Expired cert (validTo in past) → {trusted:false, reason:"BadCertificateTimeInvalid"}' },
    ],
    testRunner: function(solution) {
      if (typeof solution !== 'function') return [{ passed: false, error: 'not a function' }]
      const NOW = Date.now()
      const rootCA = { thumbprint:'ca-001', subject:'CN=CA', issuer:'CN=CA', validFrom:NOW-1e6, validTo:NOW+1e9, isCa:true }
      const notCA  = { thumbprint:'nc-001', subject:'CN=NC', issuer:'CN=NC', validFrom:NOW-1e6, validTo:NOW+1e9, isCa:false }
      const clientCert = { thumbprint:'cl-001', subject:'CN=Client', issuer:'CN=CA', validFrom:NOW-1e6, validTo:NOW+1e9, isCa:false }
      const expiredCert= { thumbprint:'ex-001', subject:'CN=Exp', issuer:'CN=CA', validFrom:NOW-1e6, validTo:NOW-1000, isCa:false }
      const directCert = { thumbprint:'dir-001', subject:'CN=Direct', issuer:'CN=CA', validFrom:NOW-1e6, validTo:NOW+1e9, isCa:false }

      const cases = [
        // Direct trust
        { cert: directCert, store: [directCert, rootCA], check: r => r?.trusted===true && r?.reason==='DirectlyTrusted' },
        // Chain trust
        { cert: clientCert, store: [rootCA], check: r => r?.trusted===true && r?.reason==='ChainTrusted' },
        // Non-CA issuer
        { cert: clientCert, store: [notCA], check: r => r?.trusted===false && /Issuer/i.test(r?.reason) },
        // Expired
        { cert: expiredCert, store: [rootCA], check: r => r?.trusted===false && /Time/i.test(r?.reason) },
      ]
      return cases.map(c => {
        try { const r = solution(c.cert, c.store, NOW); return { passed: c.check(r), actual: r } }
        catch(e) { return { passed: false, error: e.message } }
      })
    },
  },
]
