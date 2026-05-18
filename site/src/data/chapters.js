export const CHAPTERS = [
  { id: 'home',  label: 'Home',                    icon: 'Home',     path: '/' },
  { id: 'intro', label: 'Ch 1: What Is OPC UA?', title: 'What Is OPC UA?', path: '/intro', icon: 'BookOpen', next: 'architecture' },
  { id: 'architecture', label: 'Ch 2: Architecture', title: 'OPC UA Architecture', path: '/architecture', icon: 'Layers', prev: 'intro', next: 'infomodel' },
  { id: 'infomodel', label: 'Ch 3: Information Model', title: 'Information Model & Address Space', path: '/infomodel', icon: 'FolderTree', prev: 'architecture', next: 'services' },
  { id: 'services', label: 'Ch 4: Services', title: 'OPC UA Services', path: '/services', icon: 'Bell', prev: 'infomodel', next: 'security' },
  { id: 'security', label: 'Ch 5: Security & Certificates', title: 'Security & Certificates', path: '/security', icon: 'Shield', prev: 'services', next: 'subscriptions' },
  { id: 'subscriptions', label: 'Ch 6: Subscriptions', title: 'Subscriptions & MonitoredItems', path: '/subscriptions', icon: 'Radio', prev: 'security', next: 'transport' },
  { id: 'transport', label: 'Ch 7: Transport & Encoding', title: 'Transport & Encoding', path: '/transport', icon: 'Network', prev: 'subscriptions', next: 'ignition' },
  { id: 'ignition', label: 'Ch 8: OPC UA in Ignition & RTAC', title: 'OPC UA in Ignition & RTAC', path: '/ignition', icon: 'Settings', prev: 'transport', next: 'troubleshoot' },
  { id: 'troubleshoot', label: 'Ch 9: Troubleshooting', title: 'Troubleshooting OPC UA', path: '/troubleshoot', icon: 'Wrench', prev: 'ignition', next: 'lab' },
  { id: 'lab', label: 'Ch 10: Lab & Tools', title: 'Lab & Tools', path: '/lab', icon: 'FlaskConical', prev: 'troubleshoot' },
  { id: 'flashcards', label: 'Flashcards', icon: 'CreditCard', path: '/flashcards' },
]

export const ANALOGIES = {
  intro: {
    title: "The 2AM DCOM Horror Story",
    concept: "Why OPC UA Replaced OPC Classic",
    analogy: "OPC Classic required Windows DCOM. It worked great as long as you enjoyed debugging DCOM security settings, COM registration errors, and Windows firewall exceptions at 2am.\n\nOPC UA was designed by people who had done that **enough times**. It runs on any OS, over any network, with no COM dependencies. The specification is 1,200 pages — but at least it doesn't require a registry entry to function.",
    gif: 'tryAgain',
  },
  architecture: {
    title: "The Protocol That Read the Textbook",
    concept: "OPC UA Design Philosophy",
    analogy: "OPC UA is the rare industrial protocol designed by people who had **actually read a networking textbook**. It has a proper client-server model, a defined security layer, a binary encoding spec, and an information model.\n\nThis makes it simultaneously more correct and more complex than everything it replaced. Most engineers encounter it and say 'this is well-designed' and 'this is overwhelming' in the same breath. Both are accurate.",
    gif: 'mindBlown',
  },
  infomodel: {
    title: "The Database Engineer's Protocol",
    concept: "OPC UA Address Space & Node References",
    analogy: "The OPC UA information model is what happens when **database engineers design a protocol**. Every piece of data is a node. Every relationship is a reference. It's like SQL, but the query language is browsing.\n\nYou don't SELECT * FROM sensors. You browse from the RootFolder down through Objects, find your Device, navigate its Variables, and read the Value attribute. It's powerful, it's hierarchical, and the first time you see a full address space in UA Expert you will question your career choices.",
    gif: 'nerd',
  },
  services: {
    title: "REST Before REST Was Cool",
    concept: "OPC UA Service Sets & Complexity",
    analogy: "OPC UA services are RESTful before REST was cool — except instead of four HTTP verbs you have **37 service definitions** across 11 service sets.\n\nThere is a service for reading. A service for writing. A service for reading multiple attributes in one call. A service for subscribing. A service for modifying a subscription. A service for republishing if you missed a notification. Simplicity was not a design goal. Completeness was. You can do anything. You will need to look up which service does it.",
    gif: 'warning',
  },
  security: {
    title: "The Certificate Nobody Trusts",
    concept: "OPC UA Security Modes in Production",
    analogy: "OPC UA security is actually **well-designed** — mutual certificate authentication, encrypted sessions, signed messages. Both client and server must trust each other's certificates. It's more secure than standard TLS in web browsing.\n\nThe problem is 90% of deployments run **SecurityMode=None** because configuring certificates is hard and the deadline was yesterday. The most common OPC UA error in production is BadCertificateUntrusted — which means the security worked exactly as designed and nobody set it up correctly.",
    gif: 'tryAgain',
  },
  subscriptions: {
    title: "The News You Didn't Ask For",
    concept: "OPC UA Subscriptions vs. Polling",
    analogy: "OPC UA subscriptions are the answer to **'why is my SCADA polling 500 tags every second when only 3 change?'**\n\nOld-school polling: your client asks the server 'anything new?' 500 times per second. The server says 'nope' 499 times and 'yes, this one changed' once.\n\nOPC UA subscriptions: you tell the server which items to watch and how fast to sample. The server tells you when something changes. Radical concept. It took industrial automation 30 years to adopt it.",
    gif: 'network',
  },
  transport: {
    title: "The Good One, The IT One, and The Grant",
    concept: "Choosing OPC UA Transport Mappings",
    analogy: "OPC UA has three transport options:\n\n**OPC UA Binary on TCP** — fast, efficient, binary encoding, every byte counts. This is the good one. Use it.\n\n**HTTPS/JSON** — exists for IT people who want OPC UA to look like a REST API. Works fine. Slower. IT people are happier.\n\n**WebSocket** — exists because someone had a grant. Technically valid. Not something you'll choose intentionally.\n\nPort 4840 is the IANA-assigned port for OPC UA Binary. If your connection fails silently, check the firewall. It's always the firewall.",
    gif: 'done',
  },
  ignition: {
    title: "The TSA Shoes Ritual",
    concept: "OPC UA Certificate Trust in Ignition",
    analogy: "Ignition treats OPC UA certificates the way TSA treats shoes — **mandatory, slightly inconvenient**, and everyone's done it enough times to know the ritual even if they resent it.\n\nStep 1: Start Ignition OPC UA server. Step 2: Connect a client. Step 3: Ignition rejects the certificate and puts it in the 'quarantine' folder. Step 4: Move it to trusted. Step 5: Repeat on the client side. Step 6: It works.\n\nEvery engineer has done these six steps. Every engineer has briefly considered SecurityMode=None. The disciplined ones don't.",
    gif: 'robot',
  },
  troubleshoot: {
    title: "The 8-Step Debugging Protocol",
    concept: "OPC UA Troubleshooting Sequence",
    analogy: "Debugging OPC UA follows a deterministic path:\n\n1. Check the server is running\n2. Check the firewall allows port 4840\n3. Check certificate trust (both directions)\n4. Check security mode matches on client and server\n5. Check user authentication credentials\n6. Open UA Expert and connect manually\n7. Google the exact status code\n8. Call the vendor\n\nMost engineers skip to step 8 after step 2. **Steps 3–7 would have found it.** The BadCertificateUntrusted status code alone accounts for roughly half of all 'OPC UA is broken' tickets.",
    gif: 'nerd',
  },
  lab: {
    title: "The Zero Excuse Lab Setup",
    concept: "Pre-Lab Requirements",
    analogy: "**UA Expert is free. Prosys OPC UA Simulation Server is free.** There is no excuse to have never connected to an OPC UA server before touching a real Ignition installation. None.\n\nDownload both. Start the simulator. Connect UA Expert. Browse the address space. Subscribe to a changing variable. Watch the data flow. Do this once and you will never be confused about what an OPC UA subscription does again.\n\nThe field is not the place to learn what a NodeId looks like.",
    gif: 'celebrate',
  },
}

export const FUN_FACTS = [
  { text: "OPC UA was released in 2008 after 4 years of development involving 25+ companies. By comparison, Modbus was designed by one engineer at Modicon in a few weeks in 1979. Both are still running production systems today. Teamwork did not produce a simpler protocol.", icon: "Layers" },
  { text: "OPC Classic (OPC-DA) was COM/DCOM-based, meaning it was Windows-only, required registry entries, and the firewall exceptions were a rite of passage. OPC UA was specifically designed to kill this dependency. It took 4 years and 1,200 pages of specification.", icon: "AlertTriangle" },
  { text: "An OPC UA NodeId can be a number, a string, a GUID, or an opaque byte string. The spec supports all four. Most implementations use numeric NodeIds for built-in nodes and string NodeIds for custom ones. The GUID format exists and is used by exactly nobody who doesn't have to.", icon: "Hash" },
  { text: "The OPC UA specification is spread across 14 parts. Part 1 is the overview. Part 4 is services (the important one). Part 6 is mappings (encodings and transports). You will never read all of them. Neither has most of the people implementing OPC UA servers.", icon: "BookOpen" },
  { text: "SecurityMode=None means the session is unencrypted and unsigned. Any device on the network can read your process data. This is the default in many test environments and — based on OT network assessments — more production environments than anyone will admit.", icon: "LockOpen" },
  { text: "Port 4840 is the IANA-assigned port for OPC UA TCP. If your OPC UA connection refuses with no error and the device is definitely running, check whether port 4840 is blocked. It's the firewall. It's always the firewall.", icon: "Flame" },
  { text: "OPC UA pub/sub (Part 14) lets servers publish data over MQTT without a client polling. This was added in 2018 and solves the scalability problem nobody knew they'd have when they designed the client-server model in 2008.", icon: "Radio" },
  { text: "The OPC UA Binary encoding is so efficient that a 32-bit float value costs exactly 4 bytes on the wire — same as the raw value itself. The overhead is in the message framing, not the data. This is why OPC UA Binary is still faster than most REST APIs for bulk data.", icon: "Zap" },
  { text: "Ignition's built-in OPC UA server runs on port 62541, not 4840. This is intentional — Ignition is both a client (connecting to PLCs) and a server (exposing tags to external clients). Having it on a non-standard port reduces the chance of it accidentally being exposed to the internet.", icon: "Settings" },
  { text: "OPC UA's certificate trust model is mutual — both client and server must trust each other's certificates. This is more secure than TLS in typical web browsing (where only the server has a certificate). It also means you have to configure trust on BOTH sides, which is why most engineers just set SecurityMode=None.", icon: "Shield" },
  { text: "UA Expert is the OPC UA equivalent of Wireshark — free, powerful, and the first tool every OPC UA engineer reaches for when something is broken. Unified Automation gives it away because making the ecosystem work is more valuable than charging for a client tool.", icon: "Wrench" },
  { text: "The BadCertificateUntrusted status code is the most common OPC UA error in production. Translation: 'I received a valid certificate but I don't trust it yet.' Solution: add it to the trusted certificates store. This is well-documented. Engineers still spend hours on it.", icon: "AlertOctagon" },
]

export const FIELD_STORIES = [
  {
    title: "The SecurityMode=None Production Server",
    icon: "Shield",
    story: "A process plant upgraded their SCADA historian to an OPC UA server. The integrator set SecurityMode=None to 'get it working first' during commissioning. Six months later, a penetration test found the OPC UA server exposed on the corporate LAN with no authentication and no encryption. Any engineer with UA Expert could browse the entire address space, read all process values in real time, and write to any writable node. The integrator had never returned to enable security. 'Get it working first' had become the permanent configuration."
  },
  {
    title: "The Subscription That Wouldn't Die",
    icon: "Radio",
    story: "An OPC UA client application crashed repeatedly due to a memory leak. Each crash created a new session without closing the old one. The server had a session timeout of 30 minutes. Over a weekend, 1,400 orphaned sessions accumulated — each with active subscriptions and monitored items. The server ran out of memory on Monday morning. The OPC UA server process crashed, taking the historian offline. The fix required configuring an aggressive session timeout and adding client-side session cleanup on startup."
  },
  {
    title: "The Certificate That Expired at Midnight",
    icon: "AlertTriangle",
    story: "An OPC UA server used a self-signed certificate with a 1-year validity set during initial setup. No one tracked the expiry. At midnight on a Tuesday, the certificate expired. All OPC UA clients rejected the connection with BadCertificateTimeInvalid. The plant historian went offline. Alarms went to email — but the OPC UA server was the source of alarm data, so nothing was emailed. Operations ran blind until the day shift engineer noticed the SCADA screens were frozen. Renewing the certificate took 20 minutes. The outage lasted 6 hours because no one knew where to find the certificate or how to renew it."
  },
  {
    title: "The Address Space That Changed",
    icon: "Ghost",
    story: "A PLC vendor released a firmware update that reorganized their OPC UA address space. Node IDs changed. The existing SCADA subscriptions — all configured by NodeID — silently stopped returning data. The historian recorded no values. For 3 weeks, the SCADA system displayed the last cached value for 200 process variables. Nobody noticed because the values looked plausible. An audit revealed the stale data during a root cause analysis of an unrelated process deviation."
  },
  {
    title: "The Publish Interval Miscalculation",
    icon: "AlertOctagon",
    story: "A water treatment plant configured 500 OPC UA monitored items with a 100ms sampling interval on a low-power embedded server rated for 50 items at 500ms. Under load, the server's CPU hit 100%. Response times grew to seconds. The client's watchdog disconnected. The client reconnected. The server crashed under the reconnection load. This cycle repeated every 90 seconds. The integrator had copied the subscription config from a more powerful server without checking the device spec sheet. Changing to 1000ms publish interval fixed it immediately."
  },
]

export const CHAPTER_HOOKS = {
  intro:        "You inherit a SCADA system with OPC Classic connections to 12 PLCs. Your manager wants to know if migrating to OPC UA is worth the cost. What's the one-sentence case for and against?",
  architecture: "OPC UA has both a client-server model and a pub-sub model. When would you choose pub-sub over client-server — and what does that decision change in your network architecture?",
  infomodel:    "Two OPC UA servers expose a 'Temperature' node. One uses NodeId=ns=2;s=Temperature, the other NodeId=ns=1;i=1001. Before connecting, how do you know which tag you're actually reading?",
  services:     "A client calls Browse on an OPC UA server and gets BadNodeIdUnknown for a node it could read yesterday. The node still shows in UA Expert. What's happening?",
  security:     "Your OPC UA server has SecurityMode=None in production. A colleague says 'it's on an isolated network.' What's the actual risk — and what would you tell them?",
  subscriptions:"You have 1,000 monitored items with a 100ms publish interval. The OPC UA server CPU hits 80%. What are the three levers you adjust first — and in what order?",
  transport:    "OPC UA Binary encoding uses less bandwidth than XML. If bandwidth isn't a concern, is there any reason to prefer XML? What does it cost you?",
  ignition:     "Ignition acts as both an OPC UA client (to PLCs) and an OPC UA server (to external clients). A tag stops updating in the historian. How do you determine which side of that chain has the problem?",
  troubleshoot: "A BadTimeout error on an OPC UA subscription. Is this a client problem, a server problem, or a network problem? What's your diagnostic sequence?",
  lab:          "Before you connect UA Expert to an unfamiliar OPC UA server: what three things do you configure first, and why does the order matter?",
}

export const CHAPTER_RETRIEVAL = {
  intro:        { q: "What was the main problem OPC UA was designed to solve over OPC Classic?", a: "OPC Classic required Windows DCOM — OS-specific and firewall-hostile. OPC UA is platform-independent over standard TCP/IP." },
  architecture: { q: "What two communication models does OPC UA support?", a: "Client-server (request/response) and Publisher-Subscriber (pub-sub)" },
  infomodel:    { q: "What uniquely identifies a node in an OPC UA address space?", a: "Its NodeId — a namespace index plus identifier (string, integer, or GUID)" },
  services:     { q: "What OPC UA service does a client use to discover available nodes?", a: "Browse — and BrowseNext for large result sets" },
  security:     { q: "What are the three OPC UA Security Modes?", a: "None, Sign, SignAndEncrypt" },
  subscriptions: { q: "What is the difference between SamplingInterval and PublishingInterval in OPC UA?", a: "SamplingInterval: how often the server checks for value changes. PublishingInterval: how often it sends them to the client." },
  transport:    { q: "What is the default OPC UA TCP port?", a: "Port 4840" },
  ignition:     { q: "What OPC UA status code means the server received a valid certificate but does not trust it?", a: "BadCertificateUntrusted" },
  troubleshoot: { q: "What OPC UA service do you call to verify a server is alive before creating a session?", a: "GetEndpoints — or a TCP connect to port 4840 followed by Hello/Acknowledge" },
  lab:          { q: "What free tool is the industry standard for browsing and testing OPC UA servers?", a: "UA Expert by Unified Automation" },
}
