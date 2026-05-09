export const CHAPTERS = [
  { id: 'intro', title: 'What Is OPC UA?', emoji: '🔌', next: 'architecture' },
  { id: 'architecture', title: 'OPC UA Architecture', emoji: '🏗️', prev: 'intro', next: 'infomodel' },
  { id: 'infomodel', title: 'Information Model & Address Space', emoji: '🗂️', prev: 'architecture', next: 'services' },
  { id: 'services', title: 'OPC UA Services', emoji: '🛎️', prev: 'infomodel', next: 'security' },
  { id: 'security', title: 'Security & Certificates', emoji: '🔐', prev: 'services', next: 'subscriptions' },
  { id: 'subscriptions', title: 'Subscriptions & MonitoredItems', emoji: '📡', prev: 'security', next: 'transport' },
  { id: 'transport', title: 'Transport & Encoding', emoji: '🚚', prev: 'subscriptions', next: 'ignition' },
  { id: 'ignition', title: 'OPC UA in Ignition & RTAC', emoji: '⚙️', prev: 'transport', next: 'troubleshoot' },
  { id: 'troubleshoot', title: 'Troubleshooting OPC UA', emoji: '🔍', prev: 'ignition', next: 'lab' },
  { id: 'lab', title: 'Lab & Tools', emoji: '🧪', prev: 'troubleshoot' },
]

export const ANALOGIES = {
  intro: { text: "OPC Classic required Windows DCOM. It worked great as long as you enjoyed debugging DCOM security settings, COM registration errors, and Windows firewall exceptions at 2am. OPC UA was designed by people who had done that enough times.", author: "Migration from OPC-DA, 2010" },
  architecture: { text: "OPC UA is the rare industrial protocol designed by people who had read a networking textbook. This makes it simultaneously more correct and more complex than everything it replaced.", author: "Protocol comparison, 2024" },
  infomodel: { text: "The OPC UA information model is what happens when database engineers design a protocol. Every piece of data is a node. Every relationship is a reference. It's like SQL, but the query language is browsing.", author: "Address space documentation, page 1" },
  services: { text: "OPC UA services are RESTful before REST was cool, except instead of HTTP verbs you have 37 service definitions across 11 service sets. Simplicity was not a design goal.", author: "OPC UA Part 4" },
  security: { text: "OPC UA security is actually well-designed — mutual certificate authentication, encrypted sessions, signed messages. The problem is 90% of deployments run SecurityMode=None because configuring certificates is hard and the deadline was yesterday.", author: "Every OPC UA audit ever" },
  subscriptions: { text: "OPC UA subscriptions are the answer to 'why is my SCADA polling 500 tags every second when only 3 change?' The server tells you when things change. Radical concept that took industrial automation 30 years to adopt.", author: "Subscription model, designed 2006" },
  transport: { text: "OPC UA Binary on TCP is the good one. The HTTPS/JSON version exists for IT people who want OPC UA to look like a REST API. The WebSocket version exists because someone had a grant.", author: "Transport selection guide" },
  ignition: { text: "Ignition treats OPC UA certificates the way TSA treats shoes — mandatory, slightly inconvenient, and everyone's done it enough times to know the ritual even if they resent it.", author: "Ignition commissioning checklist" },
  troubleshoot: { text: "Debugging OPC UA: 1. Check server running. 2. Check firewall port 4840. 3. Check certificate trust. 4. Check security mode. 5. Check user auth. 6. Open UA Expert. 7. Google the error code. 8. Call the vendor.", author: "OPC UA troubleshooting flowchart" },
  lab: { text: "UA Expert is free. Prosys simulator is free. There is no excuse to have never connected to an OPC UA server before touching a real Ignition installation. None.", author: "Pre-commissioning checklist, item 1" },
}

export const FUN_FACTS = [
  { text: "OPC UA was released in 2008 after 4 years of development involving 25+ companies. By comparison, Modbus was designed by one engineer at Modicon in a few weeks in 1979. Both are still running production systems today. Teamwork did not produce a simpler protocol.", emoji: "🏗️" },
  { text: "OPC Classic (OPC-DA) was COM/DCOM-based, meaning it was Windows-only, required registry entries, and the firewall exceptions were a rite of passage. OPC UA was specifically designed to kill this dependency. It took 4 years and 1,200 pages of specification.", emoji: "💀" },
  { text: "An OPC UA NodeId can be a number, a string, a GUID, or an opaque byte string. The spec supports all four. Most implementations use numeric NodeIds for built-in nodes and string NodeIds for custom ones. The GUID format exists and is used by exactly nobody who doesn't have to.", emoji: "🆔" },
  { text: "The OPC UA specification is spread across 14 parts. Part 1 is the overview. Part 4 is services (the important one). Part 6 is mappings (encodings and transports). You will never read all of them. Neither has most of the people implementing OPC UA servers.", emoji: "📚" },
  { text: "SecurityMode=None means the session is unencrypted and unsigned. Any device on the network can read your process data. This is the default in many test environments and — based on OT network assessments — more production environments than anyone will admit.", emoji: "🔓" },
  { text: "Port 4840 is the IANA-assigned port for OPC UA TCP. If your OPC UA connection refuses with no error and the device is definitely running, check whether port 4840 is blocked. It's the firewall. It's always the firewall.", emoji: "🔥" },
  { text: "OPC UA pub/sub (Part 14) lets servers publish data over MQTT without a client polling. This was added in 2018 and solves the scalability problem nobody knew they'd have when they designed the client-server model in 2008.", emoji: "📡" },
  { text: "The OPC UA Binary encoding is so efficient that a 32-bit float value costs exactly 4 bytes on the wire — same as the raw value itself. The overhead is in the message framing, not the data. This is why OPC UA Binary is still faster than most REST APIs for bulk data.", emoji: "⚡" },
  { text: "Ignition's built-in OPC UA server runs on port 62541, not 4840. This is intentional — Ignition is both a client (connecting to PLCs) and a server (exposing tags to external clients). Having it on a non-standard port reduces the chance of it accidentally being exposed to the internet.", emoji: "⚙️" },
  { text: "OPC UA's certificate trust model is mutual — both client and server must trust each other's certificates. This is more secure than TLS in typical web browsing (where only the server has a certificate). It also means you have to configure trust on BOTH sides, which is why most engineers just set SecurityMode=None.", emoji: "🔐" },
  { text: "UA Expert is the OPC UA equivalent of Wireshark — free, powerful, and the first tool every OPC UA engineer reaches for when something is broken. Unified Automation gives it away because making the ecosystem work is more valuable than charging for a client tool.", emoji: "🛠️" },
  { text: "The BadCertificateUntrusted status code is the most common OPC UA error in production. Translation: 'I received a valid certificate but I don't trust it yet.' Solution: add it to the trusted certificates store. This is well-documented. Engineers still spend hours on it.", emoji: "🚨" },
]
