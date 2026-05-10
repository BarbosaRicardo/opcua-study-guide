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
  // NodeId format: [ns=X;]i=N  or  [ns=X;]s=Name  or  [ns=X;]g=GUID
  // Step 1: Guard — return null for null/non-string input
  // Step 2: Default namespace = 0. If string starts with "ns=", extract the
  //         number before ";" then advance past the ";" to get the remaining part
  // Step 3: Check the identifier prefix:
  //   "i=" → type: 'numeric', parse the number with parseInt (return null if NaN)
  //   "s=" → type: 'string', take everything after "s="
  //   "g=" → type: 'guid',   take everything after "g="
  //   anything else → return null
  // Return format: { namespace, type: 'numeric'|'string'|'guid', identifier }

  // TODO: Step 1 — guard clause

  let namespace = 0;
  let remaining = str.trim();

  // TODO: Step 2 — detect and parse "ns=X;" prefix, update namespace and remaining

  // TODO: Step 3 — detect "i=", "s=", or "g=" prefix and return the right object

  return null; // replace this
}

const solution = parseNodeId;

// Test it:
console.log(parseNodeId('i=84'));              // {namespace:0, type:'numeric', identifier:84}
console.log(parseNodeId('ns=2;s=Tank1.Level')); // {namespace:2, type:'string', identifier:'Tank1.Level'}
console.log(parseNodeId('ns=3;i=1001'));       // {namespace:3, type:'numeric', identifier:1001}`,
    starterPy: `def parse_node_id(s):
    """Parse an OPC UA NodeId string into components."""
    # NodeId format: [ns=X;]i=N  or  [ns=X;]s=Name  or  [ns=X;]g=GUID
    # Step 1: Guard — return None for falsy or non-string input
    # Step 2: Default namespace = 0.
    #         If string starts with 'ns=', find the ';', parse the number, advance remaining
    # Step 3: Check the identifier prefix:
    #   'i=' → type: 'numeric', int(remaining[2:]), return None on ValueError
    #   's=' → type: 'string',  remaining[2:]
    #   'g=' → type: 'guid',    remaining[2:]
    #   anything else → return None
    # Return format: {'namespace': ..., 'type': ..., 'identifier': ...}

    # TODO: Step 1 — guard clause

    namespace = 0
    remaining = s.strip()

    # TODO: Step 2 — detect and parse 'ns=X;' prefix

    # TODO: Step 3 — detect 'i=', 's=', 'g=' prefix and return the right dict

    return None  # replace this

solution = parse_node_id

print(parse_node_id('i=84'))
print(parse_node_id('ns=2;s=Tank1.Level'))
print(parse_node_id('ns=3;i=1001'))
print(parse_node_id(None))`,
    starterJython: `def parse_node_id(s):
    """Parse an OPC UA NodeId string. Jython 2.7."""
    # NodeId format: [ns=X;]i=N  or  [ns=X;]s=Name  or  [ns=X;]g=GUID
    # Step 1: Guard — return None for falsy or non-string input
    # Step 2: Default namespace = 0.
    #         If string starts with 'ns=', find the ';', parse the number, advance remaining
    # Step 3: Check the identifier prefix:
    #   'i=' → type: 'numeric', int(remaining[2:]), return None on ValueError
    #   's=' → type: 'string',  remaining[2:]
    #   'g=' → type: 'guid',    remaining[2:]
    #   anything else → return None

    # TODO: Step 1 — guard clause

    namespace = 0
    remaining = s.strip()

    # TODO: Step 2 — detect and parse 'ns=X;' prefix

    # TODO: Step 3 — detect 'i=', 's=', 'g=' prefix and return the right dict

    return None  # replace this

solution = parse_node_id

print(parse_node_id('i=84'))
print(parse_node_id('ns=2;s=Tank1.Level'))`,
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
  // Step 1: Normalize to unsigned 32-bit integer using ">>> 0"
  // Step 2: Extract severity — top 2 bits: (u32 >>> 30)
  //         Map: 0 → 'Good', 1 → 'Uncertain', 2 → 'Bad', 3 → 'Bad'
  // Step 3: Extract sub-code — bits 29-16: (u32 >>> 16) & 0x3FFF
  // Step 4: Build and return the result object:
  //   { severity, isGood: severityBits===0, isBad: severityBits>=2,
  //     hex: '0x' + u32.toString(16).toUpperCase().padStart(8,'0'), subCode }

  // TODO: Step 1 — normalize to u32

  // TODO: Step 2 — extract severityBits (top 2 bits) and map to severity string

  // TODO: Step 3 — extract subCode from bits 29-16

  // TODO: Step 4 — return the result object

  return { severity: 'Good', isGood: true, isBad: false, hex: '0x00000000', subCode: 0 }; // placeholder
}

const solution = decodeStatusCode;

// Test:
console.log(decodeStatusCode(0x00000000)); // Good
console.log(decodeStatusCode(0x80350000)); // Bad, subCode=0x35
console.log(decodeStatusCode(0x40000000)); // Uncertain`,
    starterPy: `def decode_status_code(code):
    """Decode an OPC UA StatusCode into severity and sub-code."""
    # Step 1: Normalize to unsigned 32-bit integer: code & 0xFFFFFFFF
    # Step 2: Extract severity bits — top 2 bits: (u32 >> 30) & 0x03
    #         Map: {0: 'Good', 1: 'Uncertain', 2: 'Bad', 3: 'Bad'}
    # Step 3: Extract sub_code — bits 29-16: (u32 >> 16) & 0x3FFF
    # Step 4: Return dict:
    #   {'severity': severity, 'isGood': severity_bits==0, 'isBad': severity_bits>=2,
    #    'hex': '0x{:08X}'.format(u32), 'subCode': sub_code}

    # TODO: Step 1 — normalize to u32

    # TODO: Step 2 — extract severity_bits and map to severity string

    # TODO: Step 3 — extract sub_code

    # TODO: Step 4 — return result dict

    return {'severity': 'Good', 'isGood': True, 'isBad': False, 'hex': '0x00000000', 'subCode': 0}  # placeholder

solution = decode_status_code

print(decode_status_code(0x00000000))  # Good
print(decode_status_code(0x80350000))  # Bad, subCode=0x35
print(decode_status_code(0x40000000))  # Uncertain`,
    starterJython: `def decode_status_code(code):
    """Decode an OPC UA StatusCode. Jython 2.7."""
    # Step 1: Normalize to unsigned 32-bit integer: code & 0xFFFFFFFF
    # Step 2: Extract severity bits — top 2 bits: (u32 >> 30) & 0x03
    #         Map: {0: 'Good', 1: 'Uncertain', 2: 'Bad', 3: 'Bad'}
    # Step 3: Extract sub_code — bits 29-16: (u32 >> 16) & 0x3FFF
    # Step 4: Return dict with severity, isGood, isBad, hex (0x%08X format), subCode
    #         NOTE: in Jython 2.7 use '0x%08X' % u32 for hex formatting

    # TODO: Step 1 — normalize to u32

    # TODO: Step 2 — extract severity_bits and map to severity string

    # TODO: Step 3 — extract sub_code

    # TODO: Step 4 — return result dict

    return {'severity': 'Good', 'isGood': True, 'isBad': False, 'hex': '0x00000000', 'subCode': 0}  # placeholder

solution = decode_status_code

print(decode_status_code(0x00000000))
print(decode_status_code(0x80350000))
print(decode_status_code(0x40000000))`,
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
  // Step 1: Initialize errors[], warnings[], and adjusted = {...params}
  // Step 2: Validate publishingInterval
  //   - If < 100: push error, set adjusted.publishingInterval = 100
  //   - Else if < 1000: push warning about fast rate in production
  // Step 3: Validate maxKeepAliveCount
  //   - If missing or < 1: push error, set adjusted.maxKeepAliveCount = 10
  //     (keep a local variable ka = adjusted value for step 4)
  // Step 4: Validate lifetimeCount >= 3 * maxKeepAliveCount
  //   - If too low: push error describing the minimum, set adjusted.lifetimeCount = 3 * ka
  // Step 5: Return { valid: errors.length === 0, errors, warnings, adjusted }

  const errors = [];
  const warnings = [];
  const adjusted = { ...params };

  // TODO: Step 2 — validate publishingInterval

  // TODO: Step 3 — validate maxKeepAliveCount (store effective value as ka)
  let ka = params.maxKeepAliveCount;

  // TODO: Step 4 — validate lifetimeCount >= 3 * ka

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
    starterPy: `def validate_subscription(params):
    """Validate OPC UA subscription parameters per the spec."""
    # Step 1: Initialize errors[], warnings[], adjusted = dict(params)
    # Step 2: Validate 'publishingInterval'
    #   - If < 100: push error, set adjusted['publishingInterval'] = 100
    #   - Elif < 1000: push warning about fast rate in production
    # Step 3: Validate 'maxKeepAliveCount'
    #   - If missing or < 1: push error, set adjusted['maxKeepAliveCount'] = 10
    #     Keep a local variable ka = effective keep-alive count for step 4
    # Step 4: Validate lifetimeCount >= 3 * ka
    #   - Compute min_lt = 3 * ka
    #   - If 'lifetimeCount' < min_lt: push error, set adjusted['lifetimeCount'] = min_lt
    # Step 5: Return {'valid': len(errors)==0, 'errors': errors,
    #                  'warnings': warnings, 'adjusted': adjusted}

    errors = []
    warnings = []
    adjusted = dict(params)

    # TODO: Step 2 — validate publishingInterval

    ka = params.get('maxKeepAliveCount', 0)
    # TODO: Step 3 — validate maxKeepAliveCount, update ka if corrected

    # TODO: Step 4 — validate lifetimeCount >= 3 * ka

    return {
        'valid': len(errors) == 0,
        'errors': errors,
        'warnings': warnings,
        'adjusted': adjusted,
    }

solution = validate_subscription

print(validate_subscription({'publishingInterval': 500, 'maxKeepAliveCount': 10, 'lifetimeCount': 20, 'maxNotificationsPerPublish': 0}))`,
    starterJython: `def validate_subscription(params):
    """Validate OPC UA subscription parameters. Jython 2.7."""
    # Step 1: Initialize errors[], warnings[], adjusted = dict(params)
    # Step 2: Validate 'publishingInterval'
    #   - If < 100: push error, set adjusted['publishingInterval'] = 100
    #   - Elif < 1000: push warning about fast rate in production
    # Step 3: Validate 'maxKeepAliveCount'
    #   - If missing or < 1: push error, set adjusted['maxKeepAliveCount'] = 10
    #     Keep a local variable ka = effective keep-alive count for step 4
    # Step 4: Validate lifetimeCount >= 3 * ka
    #   - Compute min_lt = 3 * ka
    #   - If 'lifetimeCount' < min_lt: push error, set adjusted['lifetimeCount'] = min_lt
    # Step 5: Return dict with valid, errors, warnings, adjusted

    errors = []
    warnings = []
    adjusted = dict(params)

    # TODO: Step 2 — validate publishingInterval

    ka = params.get('maxKeepAliveCount', 0)
    # TODO: Step 3 — validate maxKeepAliveCount, update ka if corrected

    # TODO: Step 4 — validate lifetimeCount >= 3 * ka

    return {
        'valid': len(errors) == 0,
        'errors': errors,
        'warnings': warnings,
        'adjusted': adjusted,
    }

solution = validate_subscription

print(validate_subscription({'publishingInterval': 500, 'maxKeepAliveCount': 10, 'lifetimeCount': 20, 'maxNotificationsPerPublish': 0}))`,
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
    // Step 1: If lastReported is null (first call), store newValue and return true
    // Step 2: Compute delta = Math.abs(newValue - this.lastReported)
    // Step 3: Based on this.type:
    //   'none'     → always notify: update lastReported, return true
    //   'absolute' → notify if delta >= this.deadbandValue; update lastReported and return true, else return false
    //   'percent'  → compute pct = delta / (euHigh - euLow) * 100
    //                notify if pct >= this.deadbandValue; update lastReported and return true, else return false
    // Step 4: Default — return false

    // TODO: Step 1 — first-value guard

    // TODO: Step 2 — compute delta

    // TODO: Step 3 — type-based logic

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
console.log(f.shouldNotify(11.5)); // false (delta=1.5 < 2.0)
console.log(f.shouldNotify(12.5)); // true  (delta=2.5 from 10.0 >= 2.0)
console.log(f.getLastReported());  // 12.5`,
    starterPy: `class DeadbandFilter(object):
    """OPC UA deadband filter for MonitoredItems."""

    def __init__(self, filter_type, value, eu_low=0.0, eu_high=100.0):
        self.type = filter_type   # 'none', 'absolute', 'percent'
        self.deadband_value = value
        self.eu_low = eu_low
        self.eu_high = eu_high
        self.last_reported = None
        # TODO: initialize any other state you need

    def should_notify(self, new_value):
        # Step 1: If last_reported is None (first call), store new_value and return True
        # Step 2: Compute delta = abs(new_value - self.last_reported)
        # Step 3: Based on self.type:
        #   'none'     → always notify: update last_reported, return True
        #   'absolute' → notify if delta >= self.deadband_value; update and return True, else False
        #   'percent'  → pct = delta / (eu_high - eu_low) * 100
        #                notify if pct >= self.deadband_value; update and return True, else False
        # Step 4: Default — return False

        # TODO: Step 1 — first-value guard

        # TODO: Step 2 — compute delta

        # TODO: Step 3 — type-based logic

        return False

    def get_last_reported(self):
        return self.last_reported

    # camelCase aliases for test runner compatibility
    def shouldNotify(self, v): return self.should_notify(v)
    def getLastReported(self): return self.get_last_reported()

solution = DeadbandFilter

f = DeadbandFilter('absolute', 2.0)
print(f.should_notify(10.0))  # True  (first value)
print(f.should_notify(11.5))  # False (delta=1.5 < 2.0)
print(f.should_notify(12.5))  # True  (delta=2.5 from 10.0)
print(f.get_last_reported())  # 12.5`,
    starterJython: `class DeadbandFilter(object):
    """OPC UA deadband filter. Jython 2.7."""

    def __init__(self, filter_type, value, eu_low=0.0, eu_high=100.0):
        self.type = filter_type
        self.deadband_value = value
        self.eu_low = eu_low
        self.eu_high = eu_high
        self.last_reported = None
        # TODO: initialize any other state you need

    def shouldNotify(self, new_value):
        # Step 1: If last_reported is None (first call), store new_value and return True
        # Step 2: Compute delta = abs(new_value - self.last_reported)
        # Step 3: Based on self.type:
        #   'none'     → always notify: update last_reported, return True
        #   'absolute' → notify if delta >= self.deadband_value; update and return True, else False
        #   'percent'  → pct = delta / (eu_high - eu_low) * 100
        #                notify if pct >= self.deadband_value; update and return True, else False
        # Step 4: Default — return False

        # TODO: Step 1 — first-value guard

        # TODO: Step 2 — compute delta

        # TODO: Step 3 — type-based logic

        return False

    def getLastReported(self):
        return self.last_reported

solution = DeadbandFilter

f = DeadbandFilter('absolute', 2.0)
print(f.shouldNotify(10.0))
print(f.shouldNotify(11.5))
print(f.shouldNotify(12.5))`,
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
    // TODO: initialize any other fields you need
  }

  getState() {
    return this.state;
  }

  openChannel(securityMode = 'None') {
    // TODO: throw if state is not 'DISCONNECTED'
    // Generate a channelId, set state to 'CHANNEL_OPEN'
    // Return { channelId, tokenId, securityMode }
    return { channelId: null, tokenId: null, securityMode };
  }

  createSession(appUri) {
    // TODO: throw if state is not 'CHANNEL_OPEN'
    // Generate sessionId and authToken, set state to 'SESSION_CREATED'
    // Return { sessionId, authToken }
    return { sessionId: null, authToken: null };
  }

  activateSession(username, password) {
    // TODO: throw if state is not 'SESSION_CREATED'
    // Set state to 'SESSION_ACTIVATED'
    // Return { activated: true, username }
    return { activated: false };
  }

  read(nodeId) {
    // TODO: throw if state is not 'SESSION_ACTIVATED'
    // Return a simulated value object:
    // { nodeId, value: Math.random()*100, statusCode: 0x00000000, timestamp: Date.now() }
    return { nodeId, value: 0, statusCode: 0x80000000, timestamp: Date.now() };
  }

  closeSession() {
    // TODO: throw if state is 'DISCONNECTED' (nothing to close)
    // Reset state to 'DISCONNECTED', clear channelId/sessionId/authToken
    // Return { closed: true }
    return { closed: false };
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
    starterPy: `import random

class SessionManager(object):
    """OPC UA Session state machine."""

    def __init__(self, endpoint):
        self.endpoint = endpoint
        self.state = 'DISCONNECTED'
        self.channel_id = None
        self.session_id = None
        self.auth_token = None
        # TODO: initialize any other fields you need

    def get_state(self):
        return self.state

    def getState(self):
        return self.state

    def open_channel(self, security_mode='None'):
        # TODO: raise RuntimeError if state != 'DISCONNECTED'
        # Generate channel_id, set state to 'CHANNEL_OPEN'
        # Return {'channelId': ..., 'tokenId': ..., 'securityMode': security_mode}
        return {'channelId': None, 'tokenId': None, 'securityMode': security_mode}

    def openChannel(self, security_mode='None'):
        return self.open_channel(security_mode)

    def create_session(self, app_uri):
        # TODO: raise RuntimeError if state != 'CHANNEL_OPEN'
        # Generate session_id and auth_token, set state to 'SESSION_CREATED'
        # Return {'sessionId': ..., 'authToken': ...}
        return {'sessionId': None, 'authToken': None}

    def createSession(self, app_uri):
        return self.create_session(app_uri)

    def activate_session(self, username, password):
        # TODO: raise RuntimeError if state != 'SESSION_CREATED'
        # Set state to 'SESSION_ACTIVATED'
        # Return {'activated': True, 'username': username}
        return {'activated': False}

    def activateSession(self, username, password):
        return self.activate_session(username, password)

    def read(self, node_id):
        # TODO: raise RuntimeError if state != 'SESSION_ACTIVATED'
        # Return {'nodeId': node_id, 'value': random.random()*100, 'statusCode': 0x00000000}
        return {'nodeId': node_id, 'value': 0, 'statusCode': 0x80000000}

    def close_session(self):
        # TODO: raise RuntimeError if state == 'DISCONNECTED'
        # Reset state to 'DISCONNECTED', clear channel_id, session_id, auth_token
        # Return {'closed': True}
        return {'closed': False}

    def closeSession(self):
        return self.close_session()

solution = SessionManager

mgr = SessionManager('opc.tcp://localhost:4840')
mgr.open_channel('SignAndEncrypt')
mgr.create_session('urn:myapp')
mgr.activate_session('engineer', 'pass')
print('State:', mgr.get_state())
val = mgr.read('ns=2;s=Tank1.Level')
print('Value:', val['value'])
mgr.close_session()`,
    starterJython: `import random

class SessionManager(object):
    """OPC UA Session state machine. Jython 2.7."""

    def __init__(self, endpoint):
        self.endpoint = endpoint
        self.state = 'DISCONNECTED'
        self.channel_id = None
        self.session_id = None
        # TODO: initialize any other fields you need

    def getState(self):
        return self.state

    def openChannel(self, security_mode='None'):
        # TODO: raise Exception if state != 'DISCONNECTED'
        # Generate channel_id, set state to 'CHANNEL_OPEN'
        # Return {'channelId': self.channel_id}
        return {'channelId': None}

    def createSession(self, app_uri):
        # TODO: raise Exception if state != 'CHANNEL_OPEN'
        # Generate session_id, set state to 'SESSION_CREATED'
        # Return {'sessionId': self.session_id}
        return {'sessionId': None}

    def activateSession(self, username, password):
        # TODO: raise Exception if state != 'SESSION_CREATED'
        # Set state to 'SESSION_ACTIVATED'
        # Return {'activated': True}
        return {'activated': False}

    def read(self, node_id):
        # TODO: raise Exception if state != 'SESSION_ACTIVATED'
        # Return {'nodeId': node_id, 'value': random.random()*100, 'statusCode': 0}
        return {'nodeId': node_id, 'value': 0, 'statusCode': 0x80000000}

    def closeSession(self):
        # TODO: raise Exception if state == 'DISCONNECTED'
        # Reset state to 'DISCONNECTED'
        # Return {'closed': True}
        return {'closed': False}

solution = SessionManager`,
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
  // Step 1: Guard — if cert or trustedStore is falsy, return
  //         { trusted: false, reason: 'BadCertificateInvalid' }
  // Step 2: Direct trust — search trustedStore for a cert with matching thumbprint
  //         If found: check validity period (now < validFrom or now > validTo)
  //           → invalid: { trusted: false, reason: 'BadCertificateTimeInvalid' }
  //           → valid:   { trusted: true,  reason: 'DirectlyTrusted' }
  // Step 3: Chain trust — find issuer cert in trustedStore where t.subject === cert.issuer
  //         If not found: { trusted: false, reason: 'BadCertificateUntrusted' }
  // Step 4: Verify issuer is a CA (isCa === true)
  //         If not: { trusted: false, reason: 'BadCertificateIssuerNotTrusted' }
  // Step 5: Check validity period for cert AND issuerCert
  //         If either is expired: { trusted: false, reason: 'BadCertificateTimeInvalid' }
  // Step 6: All checks passed: { trusted: true, reason: 'ChainTrusted' }

  // TODO: Step 1 — guard clause

  // TODO: Step 2 — direct trust check

  // TODO: Step 3 — find issuer cert

  // TODO: Step 4 — verify issuer is CA

  // TODO: Step 5 — validity period checks

  return { trusted: false, reason: 'BadCertificateUntrusted' }; // placeholder
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
    starterPy: `import time

def validate_certificate_chain(cert, trusted_store, now=None):
    """Validate an OPC UA X.509 certificate chain."""
    # Step 1: Guard — if cert or trusted_store is falsy, return
    #         {'trusted': False, 'reason': 'BadCertificateInvalid'}
    # Step 2: Direct trust — scan trusted_store for matching thumbprint
    #         If found: check validity (now < validFrom or now > validTo)
    #           → invalid: {'trusted': False, 'reason': 'BadCertificateTimeInvalid'}
    #           → valid:   {'trusted': True,  'reason': 'DirectlyTrusted'}
    # Step 3: Chain trust — find issuer: t['subject'] == cert['issuer']
    #         If not found: {'trusted': False, 'reason': 'BadCertificateUntrusted'}
    # Step 4: Verify issuer isCa == True
    #         If not: {'trusted': False, 'reason': 'BadCertificateIssuerNotTrusted'}
    # Step 5: Check validity period for cert AND issuer_cert
    #         If either expired: {'trusted': False, 'reason': 'BadCertificateTimeInvalid'}
    # Step 6: {'trusted': True, 'reason': 'ChainTrusted'}

    if now is None:
        now = int(time.time() * 1000)

    # TODO: Step 1 — guard clause

    # TODO: Step 2 — direct trust check

    # TODO: Step 3 — find issuer cert

    # TODO: Step 4 — verify issuer is CA

    # TODO: Step 5 — validity period checks

    return {'trusted': False, 'reason': 'BadCertificateUntrusted'}  # placeholder

solution = validate_certificate_chain

now_ms = int(time.time() * 1000)
root_ca = {
    'thumbprint': 'ca-001', 'subject': 'CN=CA', 'issuer': 'CN=CA',
    'validFrom': now_ms - 1000000, 'validTo': now_ms + 1000000000, 'isCa': True
}
client_cert = {
    'thumbprint': 'cl-001', 'subject': 'CN=Client', 'issuer': 'CN=CA',
    'validFrom': now_ms - 1000000, 'validTo': now_ms + 1000000000, 'isCa': False
}
print(validate_certificate_chain(client_cert, [root_ca], now_ms))`,
    starterJython: `import time

def validate_certificate_chain(cert, trusted_store, now=None):
    """Validate OPC UA certificate chain. Jython 2.7."""
    # Step 1: Guard — if cert or trusted_store is falsy, return
    #         {'trusted': False, 'reason': 'BadCertificateInvalid'}
    # Step 2: Direct trust — loop through trusted_store looking for matching thumbprint
    #         If found: check validity period
    #           → invalid: {'trusted': False, 'reason': 'BadCertificateTimeInvalid'}
    #           → valid:   {'trusted': True,  'reason': 'DirectlyTrusted'}
    # Step 3: Chain trust — find issuer cert where t['subject'] == cert['issuer']
    #         If not found: {'trusted': False, 'reason': 'BadCertificateUntrusted'}
    # Step 4: Verify issuer isCa == True
    #         If not: {'trusted': False, 'reason': 'BadCertificateIssuerNotTrusted'}
    # Step 5: Check validity for cert (and optionally issuer_cert)
    #         If expired: {'trusted': False, 'reason': 'BadCertificateTimeInvalid'}
    # Step 6: {'trusted': True, 'reason': 'ChainTrusted'}

    if now is None:
        now = int(time.time() * 1000)

    # TODO: Step 1 — guard clause

    # TODO: Step 2 — direct trust check (loop, no generator expressions in Jython 2.7)

    # TODO: Step 3 — find issuer cert

    # TODO: Step 4 — verify issuer is CA

    # TODO: Step 5 — validity period checks

    return {'trusted': False, 'reason': 'BadCertificateUntrusted'}  # placeholder

solution = validate_certificate_chain`,
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
