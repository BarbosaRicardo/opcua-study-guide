const yt = (q, title) => ({ type: 'youtube', title, searchUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}` })
const doc = (title, url) => ({ type: 'doc', title, url })
const book = (title, author, chapter, page) => ({ type: 'book', title, author, chapter, page })
const kurose = (ch, pg) => book('Computer Networking: A Top-Down Approach', 'Kurose & Ross, 7th ed.', ch, pg)
const tanenbaum = (ch, pg) => book('Modern Operating Systems', 'Tanenbaum, 4th ed.', ch, pg)
const dowd = (ch, pg) => book('The Art of Software Security Assessment', 'Dowd, McDonald & Schuh', ch, pg)
const stevens = (ch, pg) => book('Advanced Programming in the UNIX Environment', 'Stevens & Rago, 3rd ed.', ch, pg)

export const DEEP_DIVE = {
  intro: {
    level1: [
      yt('OPC UA explained overview tutorial industrial', 'OPC UA Explained — Industrial Communication Standard'),
      yt('OPC UA vs OPC Classic DA difference migration', 'OPC Classic vs OPC UA — What Changed and Why'),
      doc('OPC Foundation — OPC UA Overview', 'https://opcfoundation.org/about/opc-technologies/opc-ua/'),
    ],
    level2: [
      yt('OPC UA companion specification PLCopen DI PackML', 'OPC UA Companion Specifications — PLCopen, DI, PackML'),
      kurose('Chapter 2: Application Layer', '65'),
    ],
  },
  architecture: {
    level1: [
      yt('OPC UA architecture client server session secure channel', 'OPC UA Architecture — Client, Server, Sessions, Secure Channels'),
      yt('OPC UA aggregation server gateway pattern', 'OPC UA Aggregation Server Pattern'),
    ],
    level2: [
      yt('OPC UA pub sub MQTT broker pattern industrial IoT', 'OPC UA Pub/Sub — MQTT Broker Integration'),
      tanenbaum('Chapter 2: Client-Server Architecture', '85'),
      kurose('Chapter 2: Application Layer Protocols', '75'),
    ],
  },
  infomodel: {
    level1: [
      yt('OPC UA information model address space nodes tutorial', 'OPC UA Address Space — Nodes, References, NodeId'),
      yt('OPC UA node types Object Variable Method ObjectType', 'OPC UA Node Types Explained'),
      doc('OPC UA Online Reference', 'https://reference.opcfoundation.org'),
    ],
    level2: [
      yt('OPC UA companion specification information model extension', 'Extending the OPC UA Information Model'),
      tanenbaum('Chapter 12: File Systems — Namespace and Hierarchy', '750'),
    ],
  },
  services: {
    level1: [
      yt('OPC UA services read write browse subscribe call tutorial', 'OPC UA Services — Read, Write, Browse, Subscribe'),
      yt('OPC UA browse service address space navigation', 'OPC UA Browse — Navigating the Address Space'),
    ],
    level2: [
      yt('OPC UA method call service invoke server function', 'OPC UA Method Service — Calling Server-Side Functions'),
      kurose('Chapter 2: HTTP Request/Response — Analogy to OPC UA Services', '80'),
    ],
  },
  security: {
    level1: [
      yt('OPC UA security certificates TLS PKI explained', 'OPC UA Security — Certificates, TLS, and PKI'),
      yt('OPC UA security mode None Sign SignAndEncrypt configure', 'OPC UA Security Modes — None, Sign, SignAndEncrypt'),
      doc('OPC Foundation — Security Overview', 'https://opcfoundation.org/about/opc-technologies/opc-ua/ua-security/'),
    ],
    level2: [
      yt('OPC UA certificate trust management self signed PKI', 'OPC UA Certificate Trust — Self-Signed vs CA-Signed'),
      kurose('Chapter 8: Security — TLS and PKI', '577'),
      dowd('Chapter 8: Cryptographic Weaknesses', '345'),
    ],
  },
  subscriptions: {
    level1: [
      yt('OPC UA subscription monitored item publishing interval tutorial', 'OPC UA Subscriptions — Publishing Interval and MonitoredItems'),
      yt('OPC UA data change notification event subscription', 'OPC UA Data Change Notifications vs Events'),
    ],
    level2: [
      yt('OPC UA subscription keepalive lifetime count queue overflow', 'OPC UA Subscription Parameters — KeepAlive, Lifetime, Queue'),
      kurose('Chapter 2: Push vs Pull — WebSocket Analogy', '90'),
    ],
  },
  transport: {
    level1: [
      yt('OPC UA binary encoding TCP transport UA-TCP port 4840', 'OPC UA Binary over TCP — UA-TCP Transport'),
      yt('OPC UA binary encoding built-in types structures serialization', 'OPC UA Binary Encoding — How Data is Serialized'),
    ],
    level2: [
      yt('OPC UA HTTPS JSON REST transport comparison', 'OPC UA HTTPS/JSON vs Binary TCP — When to Use Which'),
      kurose('Chapter 3: TCP — Reliable Transport', '166'),
      stevens('Chapter 16: Network IPC — Sockets', '571'),
    ],
  },
  ignition: {
    level1: [
      yt('Ignition OPC UA server client configuration tutorial', 'Ignition OPC UA — Built-in Server and Client Configuration'),
      yt('Ignition OPC UA certificate trust gateway configuration', 'Ignition OPC UA Certificate Trust Management'),
      doc('Inductive Automation — OPC UA in Ignition', 'https://docs.inductiveautomation.com/docs/8.1/ignition-modules/opc-ua'),
    ],
    level2: [
      yt('SEL RTAC OPC UA server certificate trust Ignition connection', 'SEL RTAC as OPC UA Server — Connecting to Ignition'),
      tanenbaum('Chapter 2: Client-Server in Practice', '100'),
    ],
  },
  troubleshoot: {
    level1: [
      yt('OPC UA troubleshooting BadCertificateUntrusted BadNodeIdUnknown UA Expert', 'OPC UA Troubleshooting — Common Error Codes'),
      yt('UA Expert OPC UA client browse connect diagnose tutorial', 'UA Expert Tutorial — Connect, Browse, Subscribe'),
      doc('Unified Automation — UA Expert Download', 'https://www.unified-automation.com/products/development-tools/uaexpert.html'),
    ],
    level2: [
      yt('Wireshark OPC UA dissector capture filter analysis', 'Wireshark OPC UA Dissector — Capture and Analyze Traffic'),
      dowd('Chapter 2: Protocol Analysis and Vulnerability Research', '45'),
    ],
  },
  lab: {
    level1: [
      yt('UA Expert OPC UA client tutorial connect server browse', 'UA Expert — Getting Started Guide'),
      yt('Prosys OPC UA simulation server free tutorial', 'Prosys OPC UA Simulation Server — Setup and Use'),
      doc('UA Expert Free Download', 'https://www.unified-automation.com/products/development-tools/uaexpert.html'),
    ],
    level2: [
      yt('Python opcua asyncio library client server tutorial', 'Python OPC UA — opcua-asyncio Library Tutorial'),
      yt('Node-RED OPC UA nodes industrial IoT integration', 'Node-RED OPC UA Integration — No-Code Client'),
    ],
  },
}
