export const QUIZZES = {

  intro: [
    {
      id: 'intro_1',
      type: 'mcq',
      question: 'What does "OPC" stand for in its original 1996 form?',
      options: ['Open Process Control', 'OLE for Process Control', 'Open Protocol Communication', 'Operational Control'],
      answer: 1,
      explanation: 'OLE for Process Control. Yes, OLE — that 1990s Windows embedding technology most people forgot existed. OPC Classic was born Windows-only and stayed that way until UA came along and freed everyone from the DCOM dungeon.'
    },
    {
      id: 'intro_2',
      type: 'mcq',
      question: 'Which of the following is a correct list of the three main OPC Classic specifications?',
      options: [
        'OPC-DA, OPC-AE, OPC-UA',
        'OPC-DA, OPC-HDA, OPC-AE',
        'OPC-DA, OPC-HDA, OPC-DX',
        'OPC-RT, OPC-HDA, OPC-AE'
      ],
      answer: 1,
      explanation: 'Data Access (DA), Historical Data Access (HDA), and Alarms & Events (AE). Three separate specs, three separate installs, three separate COM servers, three separate ways for everything to break. OPC UA replaced all three with one standard.'
    },
    {
      id: 'intro_3',
      type: 'mcq',
      question: 'OPC Classic\'s biggest architectural weakness was its reliance on which Windows technology?',
      options: ['WinSock', 'DCOM', 'ActiveX', 'Named Pipes'],
      answer: 1,
      explanation: 'DCOM — Distributed Component Object Model. A technology so fragile that configuring it correctly was considered a dark art. It was firewall-hostile, Windows-only, and responsible for more 3 AM support calls than any technology deserved to be.'
    },
    {
      id: 'intro_4',
      type: 'mcq',
      question: 'In what year was OPC UA introduced?',
      options: ['2002', '2005', '2008', '2012'],
      answer: 2,
      explanation: '2008. Over a decade of DCOM pain was finally codified into a lesson learned. OPC UA arrived as a TCP-based, platform-independent replacement that could run on Linux, embedded devices, and cloud — not just Windows Server 2003 Service Pack 2.'
    },
    {
      id: 'intro_5',
      type: 'mcq',
      question: 'What IEC standard defines OPC UA?',
      options: ['IEC 61850', 'IEC 62541', 'IEC 61131', 'IEC 60870'],
      answer: 1,
      explanation: 'IEC 62541, published in 14 parts. If you ever need to put someone to sleep, read Part 6 aloud. That said, having an IEC standard means OPC UA is an internationally recognized protocol — not just a vendor\'s weekend project.'
    },
    {
      id: 'intro_6',
      type: 'mcq',
      question: 'What does "UA" stand for in OPC UA?',
      options: ['Universal Access', 'Unified Architecture', 'Unified Automation', 'Universal Application'],
      answer: 1,
      explanation: 'Unified Architecture. One standard to rule them all — replacing OPC-DA, OPC-HDA, and OPC-AE with a single coherent framework. "Unified" because the OPC Foundation got tired of maintaining three separate specs that all did slightly different things wrong.'
    },
    {
      id: 'intro_7',
      type: 'fill',
      question: 'OPC UA is published and maintained by the ___.',
      answer: 'OPC Foundation',
      hint: 'The industry organization, not a standards body like IEC or ISO',
      explanation: 'The OPC Foundation. A vendor-neutral consortium that manages the OPC UA spec, certification, and conformance testing. They also published OPC Classic, which is why they get credit for both the problem and the solution.'
    },
    {
      id: 'intro_8',
      type: 'mcq',
      question: 'Which of the following is NOT a platform where OPC UA can natively run?',
      options: ['Linux servers', 'Embedded microcontrollers', 'Cloud services', 'Windows XP SP2 via DCOM only'],
      answer: 3,
      explanation: 'OPC UA is platform-independent by design. It runs on Linux, embedded systems, cloud, and yes, also Windows — but not *only* Windows via DCOM. That\'s the whole point of UA. DCOM is retired. Let it go.'
    },
  ],

  architecture: [
    {
      id: 'arch_1',
      type: 'mcq',
      question: 'In OPC UA, which entity initiates the connection and sends service requests?',
      options: ['The Server', 'The Client', 'The Broker', 'The Gateway'],
      answer: 1,
      explanation: 'The Client always initiates. The Server sits there, exposes its Address Space, and waits politely. If you\'re expecting the server to call you, you\'ve mixed up your OPC UA roles — and possibly your phone number.'
    },
    {
      id: 'arch_2',
      type: 'mcq',
      question: 'What is the correct order of connection establishment in OPC UA?',
      options: [
        'Create Session → Open Secure Channel → Activate Session',
        'Open Secure Channel → Create Session → Activate Session',
        'Activate Session → Open Secure Channel → Create Session',
        'Open Secure Channel → Activate Session → Create Session'
      ],
      answer: 1,
      explanation: 'Open Secure Channel first (transport-level security), then Create Session (negotiate session parameters), then Activate Session (authenticate the user). Skip any step and the server will politely — or not so politely — reject you.'
    },
    {
      id: 'arch_3',
      type: 'mcq',
      question: 'What does an OPC UA Aggregation Server do?',
      options: [
        'Converts OPC UA to Modbus',
        'Connects to multiple OPC UA servers and re-exposes their data as a single unified server',
        'Stores historical data from OPC UA servers',
        'Provides authentication services for OPC UA networks'
      ],
      answer: 1,
      explanation: 'An Aggregation Server is a middleman that connects to several OPC UA servers and presents all their data as one unified Address Space. Your client only has to talk to one server. Think of it as a very hardworking receptionist.'
    },
    {
      id: 'arch_4',
      type: 'mcq',
      question: 'Ignition\'s relationship to OPC UA is best described as:',
      options: [
        'A pure OPC UA server only',
        'A pure OPC UA client only',
        'Simultaneously a client (to PLCs) and a server (to HMI/SCADA clients)',
        'An OPC UA broker'
      ],
      answer: 2,
      explanation: 'Ignition wears both hats. It\'s a client when connecting down to PLCs and devices, and a server when exposing tag data up to Perspective, Vision, or third-party SCADA clients. It\'s the industrial equivalent of a player-coach — doing two jobs for the price of one.'
    },
    {
      id: 'arch_5',
      type: 'mcq',
      question: 'The Session layer in OPC UA sits on top of which layer?',
      options: ['TCP Transport', 'Secure Channel', 'Discovery Service', 'Address Space'],
      answer: 1,
      explanation: 'Session sits on top of Secure Channel. The Secure Channel handles message security and sits on top of the transport (TCP). It\'s a proper layered cake: TCP → Secure Channel → Session → your actual data. Don\'t eat it out of order.'
    },
    {
      id: 'arch_6',
      type: 'mcq',
      question: 'In the OPC UA Pub/Sub model, how does a subscriber receive data?',
      options: [
        'It polls the server periodically',
        'It receives data pushed from the server via an MQTT broker',
        'It sends a Read request for each value',
        'It opens a direct TCP connection to the publisher'
      ],
      answer: 1,
      explanation: 'In Pub/Sub, a broker (typically MQTT) sits in the middle. Publishers push data to the broker; subscribers receive it from the broker. No polling, no direct connections between publisher and subscriber. Very cloud-friendly. Very different from the classic client-server model.'
    },
    {
      id: 'arch_7',
      type: 'fill',
      question: 'The service used to close an OPC UA session gracefully is called ___.',
      answer: 'Close Session',
      hint: 'It\'s named exactly what it does',
      explanation: 'CloseSession. After you\'re done, you close the session, then close the secure channel. Dropping the TCP connection without closing the session politely leaves the server holding resources. Be a good citizen — close your connections.'
    },
    {
      id: 'arch_8',
      type: 'mcq',
      question: 'Which OPC UA component is responsible for exposing the hierarchy of data points, objects, and methods available on a server?',
      options: ['Secure Channel', 'Session Manager', 'Address Space', 'Discovery Endpoint'],
      answer: 2,
      explanation: 'The Address Space. It\'s the server\'s complete map of everything it knows about — tags, objects, methods, types. When you browse an OPC UA server, you\'re walking the Address Space tree. Lose your map and you\'re just guessing at NodeIds.'
    },
    {
      id: 'arch_9',
      type: 'mcq',
      question: 'What service does an OPC UA client use to discover available servers on the network?',
      options: ['Browse Service', 'Discovery Service', 'Find Servers Service', 'Endpoint Service'],
      answer: 2,
      explanation: 'The Find Servers service (part of the Discovery service set) lets clients locate available OPC UA servers. A Local Discovery Server (LDS) can also run on port 4840 to act as a local registry. It\'s like a phonebook, except this one actually gets maintained.'
    },
    {
      id: 'arch_10',
      type: 'mcq',
      question: 'Which statement about OPC UA security is architecturally correct?',
      options: [
        'Security is optional and applied at the application layer only',
        'Security is built into the Secure Channel layer, below the Session layer',
        'Security is handled entirely by the transport (TLS)',
        'Security must be configured separately on each service call'
      ],
      answer: 1,
      explanation: 'OPC UA security is built into the Secure Channel layer — it\'s part of the core architecture, not bolted on. The Secure Channel handles signing and encryption before the Session is even established. Security as an afterthought is why DCOM hurt so many people.'
    },
  ],

  infomodel: [
    {
      id: 'info_1',
      type: 'mcq',
      question: 'What uniquely identifies every Node in an OPC UA Address Space?',
      options: ['Display Name', 'Browse Name', 'NodeId', 'SymbolicName'],
      answer: 2,
      explanation: 'NodeId. Every node has one, every NodeId is unique within its namespace. A NodeId includes a namespace index and an identifier — numeric, string, GUID, or opaque. Knowing the NodeId is how you actually address data programmatically.'
    },
    {
      id: 'info_2',
      type: 'mcq',
      question: 'Which namespace index is reserved for the OPC UA standard specification itself?',
      options: ['Namespace 1', 'Namespace 0', 'Namespace 255', 'Namespace 100'],
      answer: 1,
      explanation: 'Namespace 0 is the OPC UA standard namespace — it contains all the built-in types, standard node classes, and reference types defined in the spec. Namespaces 1 and above are for vendors, applications, and server-specific data. Don\'t squatting on namespace 0.'
    },
    {
      id: 'info_3',
      type: 'mcq',
      question: 'Which OPC UA Node Class represents a container that groups related nodes?',
      options: ['Variable', 'Object', 'Method', 'View'],
      answer: 1,
      explanation: 'Object nodes are containers — the folders and devices in your address space hierarchy. They don\'t hold values themselves; they organize and group Variables and Methods. Think of them as the directories in the filesystem of your data.'
    },
    {
      id: 'info_4',
      type: 'mcq',
      question: 'A Variable node in OPC UA has which of the following key attributes? (select the most complete answer)',
      options: [
        'Value, DataType, AccessLevel',
        'Value, DataType, ValueRank, ArrayDimensions, AccessLevel, UserAccessLevel, MinimumSamplingInterval',
        'Value, Tag Name, Engineering Units',
        'Value, Timestamp, Quality'
      ],
      answer: 1,
      explanation: 'Variable nodes are fully described: Value (the actual data), DataType, ValueRank (scalar vs array), ArrayDimensions, AccessLevel (what the server allows), UserAccessLevel (what this user can do), and MinimumSamplingInterval. OPC UA is not shy about attributes.'
    },
    {
      id: 'info_5',
      type: 'mcq',
      question: 'What is the correct format for a string-based OPC UA NodeId in namespace 2?',
      options: ['ns2::Temperature', 'ns=2;s=Temperature', '2:Temperature', 'ns[2]Temperature'],
      answer: 1,
      explanation: 'ns=2;s=Temperature — namespace index 2, string identifier "Temperature". Numeric NodeIds use "i" instead of "s": ns=2;i=1001. GUIDs use "g". Getting the format wrong means your read request goes nowhere, and the server judges you silently.'
    },
    {
      id: 'info_6',
      type: 'mcq',
      question: 'Which reference type indicates that a Variable is a property of an Object (rather than a component)?',
      options: ['HasComponent', 'HasProperty', 'Organizes', 'HasTypeDefinition'],
      answer: 1,
      explanation: 'HasProperty links an Object to its property Variables — metadata like engineering units, ranges, or descriptions. HasComponent is for structural components (like a Variable that IS part of the object\'s data). The distinction matters when you\'re building conformant information models.'
    },
    {
      id: 'info_7',
      type: 'mcq',
      question: 'The reference type "HasTypeDefinition" connects a node instance to what?',
      options: [
        'Its parent object',
        'Its type definition node (ObjectType or VariableType)',
        'Its data source in the PLC',
        'Its engineering unit'
      ],
      answer: 1,
      explanation: 'HasTypeDefinition connects an instance (an Object or Variable) to its type template. It\'s OPC UA\'s object-oriented mechanism — types define the structure, instances are the data. Very fancy. Very useful when you have 50 identical pump objects.'
    },
    {
      id: 'info_8',
      type: 'fill',
      question: 'A node that represents a server-side callable function in OPC UA is of class ___.',
      answer: 'Method',
      hint: 'It\'s named after what you\'d call it in object-oriented programming',
      explanation: 'Method nodes are callable server-side functions. You call them using the Call service. They can accept input arguments and return output arguments. Unlike Variables, you don\'t read or write them — you invoke them. Treat them like buttons, not data points.'
    },
    {
      id: 'info_9',
      type: 'mcq',
      question: 'Which category of OPC UA References includes HasComponent, HasProperty, and Organizes?',
      options: ['NonHierarchicalReferences', 'HierarchicalReferences', 'TypeReferences', 'DataReferences'],
      answer: 1,
      explanation: 'HierarchicalReferences establish parent-child, containment, and organizational relationships — the tree structure you see when you browse. NonHierarchicalReferences like HasTypeDefinition and HasEventSource are cross-references that don\'t form the tree.'
    },
    {
      id: 'info_10',
      type: 'mcq',
      question: 'AccessLevel on a Variable node controls which of the following?',
      options: [
        'Which users can log into the server',
        'Whether the server itself allows reading, writing, or history access to this variable',
        'The network port used to access the variable',
        'The encryption level required to read the variable'
      ],
      answer: 1,
      explanation: 'AccessLevel is a bitmask on the Variable node specifying what operations the server permits: CurrentRead, CurrentWrite, HistoryRead, etc. UserAccessLevel further restricts based on the logged-in user. If AccessLevel says no writes, no amount of Write service calls will succeed.'
    },
    {
      id: 'info_11',
      type: 'mcq',
      question: 'A View node in OPC UA is used for what purpose?',
      options: [
        'To display data in a human-readable format',
        'To define a subset of the address space, acting as an alternate entry point for browsing',
        'To store configuration data for the OPC UA server',
        'To define historical data retention policies'
      ],
      answer: 1,
      explanation: 'View nodes let you define a filtered subset of the Address Space. Instead of browsing everything, a client can start browsing from a View node and only see what\'s relevant. Useful for hiding the server\'s internal plumbing from clients who just want the temperature reading.'
    },
    {
      id: 'info_12',
      type: 'fill',
      question: 'The four OPC UA NodeId identifier types are: numeric, string, GUID, and ___.',
      answer: 'opaque',
      hint: 'The fourth type is a byte array with no defined internal structure',
      explanation: 'Opaque NodeIds are raw byte arrays — useful when a vendor\'s device uses a proprietary binary identifier scheme. It\'s the "none of the above" option for NodeId types. Numeric is most common and most compact; string is most human-readable.'
    },
  ],

  services: [
    {
      id: 'svc_1',
      type: 'mcq',
      question: 'Which OPC UA service set is used to walk the Address Space tree and discover nodes?',
      options: ['Attribute Service Set', 'View Service Set (Browse)', 'Session Service Set', 'Discovery Service Set'],
      answer: 1,
      explanation: 'The View Service Set, specifically the Browse and BrowseNext services. You hand it a NodeId and it returns the node\'s references and children. It\'s how every OPC UA client explores what a server has to offer — and how you find the NodeId you actually want.'
    },
    {
      id: 'svc_2',
      type: 'mcq',
      question: 'The Read service in OPC UA reads what from a node?',
      options: [
        'Only the Value attribute',
        'One or more attributes (e.g., Value, DisplayName, DataType) identified by NodeId + AttributeId',
        'The full node definition including all references',
        'Historical values from the server database'
      ],
      answer: 1,
      explanation: 'Read is attribute-level: you specify a NodeId and an AttributeId (Value=13, DisplayName=3, DataType=14, etc.). You can batch multiple reads in a single request. Reading only Value is common, but OPC UA lets you read *any* attribute — because sometimes you really do need that MinimumSamplingInterval.'
    },
    {
      id: 'svc_3',
      type: 'mcq',
      question: 'What is the key architectural difference between Subscribe (MonitoredItems/Subscription) and Read in OPC UA?',
      options: [
        'Subscribe is encrypted; Read is not',
        'Subscribe is a push model (server sends changes); Read is a pull model (client polls)',
        'Subscribe only works for historical data',
        'Read is faster but Subscribe is more secure'
      ],
      answer: 1,
      explanation: 'Subscriptions are push: server monitors values and sends changes to you. Read is pull: you ask, server answers. For high-frequency or many tags, subscriptions are dramatically more efficient. Polling hundreds of tags with Read every second is a great way to bog down your network.'
    },
    {
      id: 'svc_4',
      type: 'mcq',
      question: 'The TranslateBrowsePathsToNodeIds service does what?',
      options: [
        'Converts NodeIds to human-readable browse names',
        'Converts a human-readable browse path (like /Objects/Device/Temperature) to a NodeId',
        'Lists all browse paths on the server',
        'Validates that a NodeId exists'
      ],
      answer: 1,
      explanation: 'TranslateBrowsePathsToNodeIds takes a starting NodeId and a sequence of browse names (the path), and returns the target NodeId. It\'s how you go from "I know the name of what I want" to "I have the NodeId I need to actually read it." Saves a lot of manual browsing.'
    },
    {
      id: 'svc_5',
      type: 'mcq',
      question: 'Which service do you use to invoke a Method node on an OPC UA server?',
      options: ['Write', 'Execute', 'Call', 'Invoke'],
      answer: 2,
      explanation: 'The Call service. You provide the ObjectId (parent object), the MethodId (the Method node\'s NodeId), and any input arguments. The server executes the method and returns output arguments. It\'s not "Execute" or "Invoke" — it\'s just "Call." Keep it simple.'
    },
    {
      id: 'svc_6',
      type: 'mcq',
      question: 'The Write service in OPC UA writes to which attribute by default?',
      options: ['DisplayName', 'BrowseName', 'Value', 'Description'],
      answer: 2,
      explanation: 'Write targets the Value attribute by default — that\'s the operational data. You can technically specify other AttributeIds in a Write request, but writing anything other than Value is unusual and often restricted. Most servers only allow writing Value anyway.'
    },
    {
      id: 'svc_7',
      type: 'fill',
      question: 'The OPC UA service used to create a new session after the Secure Channel is open is called ___.',
      answer: 'CreateSession',
      hint: 'Two words, no space — it creates a session',
      explanation: 'CreateSession establishes the session context between client and server: negotiates session parameters, exchanges Application Instance Certificates, and returns a session ID. Without this step, you can\'t activate a session or use any other services.'
    },
    {
      id: 'svc_8',
      type: 'mcq',
      question: 'In OPC UA, what is an "AttributeId" used for?',
      options: [
        'A unique identifier for each OPC UA server endpoint',
        'A numeric code identifying which attribute of a node to read or write (e.g., Value=13)',
        'The namespace index for a node',
        'The security policy identifier'
      ],
      answer: 1,
      explanation: 'AttributeId is a numeric code specifying *which* attribute of a node you\'re addressing. Value is AttributeId 13, NodeId is 1, NodeClass is 2, DisplayName is 3. The OPC UA spec defines 22 standard attribute IDs. If you want to read the value, you want AttributeId 13.'
    },
    {
      id: 'svc_9',
      type: 'mcq',
      question: 'What does the Publish service do in OPC UA?',
      options: [
        'Publishes data from the server to all connected clients',
        'Client sends Publish request to server; server responds with any pending data changes from subscriptions',
        'Client pushes new values to the server',
        'Server announces new nodes to all clients'
      ],
      answer: 1,
      explanation: 'Publish is initiated by the *client* — it sends a Publish request and the server responds with any queued subscription notifications. It\'s the client saying "hey, anything new?" and the server delivering the mail. The client must keep sending Publish requests or the subscription will time out. Cruel but effective.'
    },
    {
      id: 'svc_10',
      type: 'mcq',
      question: 'What service set handles the initial discovery of OPC UA servers and their endpoints?',
      options: ['Session Service Set', 'View Service Set', 'Discovery Service Set', 'Attribute Service Set'],
      answer: 2,
      explanation: 'The Discovery Service Set — specifically FindServers and GetEndpoints. FindServers returns known server URLs; GetEndpoints returns all available endpoint configurations (security modes, transport URLs) for a given server. You need this before you can even connect.'
    },
    {
      id: 'svc_11',
      type: 'fill',
      question: 'To read historical data values from an OPC UA server, you would use the ___ service.',
      answer: 'HistoryRead',
      hint: 'Combines the word "History" with the standard read service name',
      explanation: 'HistoryRead retrieves time-series historical data stored on the server. It\'s part of the Historical Access service set. Not all servers implement it — a PLC might not store history at all. Ignition\'s internal historian does, which is one reason Ignition is such a popular SCADA platform.'
    },
    {
      id: 'svc_12',
      type: 'mcq',
      question: 'When using the Browse service, what is returned for each referenced node?',
      options: [
        'Only the NodeId',
        'NodeId, BrowseName, DisplayName, NodeClass, and TypeDefinition of the referenced node',
        'Only the DisplayName and Value',
        'The full node definition including all attributes and references'
      ],
      answer: 1,
      explanation: 'Browse returns a ReferenceDescription for each reference: NodeId, BrowseName, DisplayName, NodeClass, TypeDefinition, and the Reference Type. Enough to understand what the node is and decide whether to dig deeper. Not the full node — for that you\'d use Read.'
    },
  ],

  security: [
    {
      id: 'sec_1',
      type: 'mcq',
      question: 'Which OPC UA Security Mode provides both message signing AND encryption?',
      options: ['None', 'Sign', 'SignAndEncrypt', 'Encrypt'],
      answer: 2,
      explanation: 'SignAndEncrypt: messages are cryptographically signed (tamper detection) AND encrypted (confidentiality). Sign-only gives you integrity without confidentiality. None gives you nothing — suitable for test environments, development, and people who enjoy living dangerously on production networks.'
    },
    {
      id: 'sec_2',
      type: 'mcq',
      question: 'What is the recommended OPC UA Security Policy for production deployments?',
      options: ['None', 'Basic128Rsa15', 'Basic256Sha256', 'Aes256-Sha256-RsaPss'],
      answer: 2,
      explanation: 'Basic256Sha256 is the widely recommended minimum for production. Basic128Rsa15 is considered weak (RSA-15 padding has known vulnerabilities). Aes256-Sha256-RsaPss is stronger but has less broad device support. Basic256Sha256 hits the security/compatibility sweet spot.'
    },
    {
      id: 'sec_3',
      type: 'mcq',
      question: 'What is an Application Instance Certificate in OPC UA?',
      options: [
        'A certificate that proves the OPC Foundation certified the application',
        'An X.509 certificate that uniquely identifies a specific running instance of an OPC UA application',
        'A certificate used only for user authentication',
        'A certificate issued by the server to the client during session creation'
      ],
      answer: 1,
      explanation: 'An Application Instance Certificate is an X.509 cert tied to a specific application instance running on a specific machine. It\'s how OPC UA applications identify themselves to each other. One Ignition gateway has one AIC. One PLC has one AIC. Lose it, and mutual trust needs to be re-established from scratch.'
    },
    {
      id: 'sec_4',
      type: 'mcq',
      question: 'OPC UA uses which type of certificate trust model?',
      options: [
        'One-way: client trusts server certificate only',
        'CA-only: both must have certs from a common Certificate Authority',
        'Mutual trust: client must trust server cert AND server must trust client cert',
        'No trust model — certificates are only for encryption, not authentication'
      ],
      answer: 2,
      explanation: 'Mutual trust. Both sides must explicitly trust the other\'s certificate. This is why self-signed certs require action on both ends — you must add the server cert to the client\'s trust store AND add the client cert to the server\'s trust store. Miss one side and the connection fails. This surprises everyone exactly once.'
    },
    {
      id: 'sec_5',
      type: 'mcq',
      question: 'What is the default TCP port for OPC UA?',
      options: ['102', '502', '4840', '62541'],
      answer: 2,
      explanation: 'Port 4840 is the registered IANA port for OPC UA binary TCP. Ignition\'s built-in OPC UA server defaults to 62541 instead (to avoid conflicts if another OPC UA server is on the same machine). SEL RTACs and most PLCs use 4840. Know both, confuse neither.'
    },
    {
      id: 'sec_6',
      type: 'mcq',
      question: 'Which user authentication method in OPC UA provides the weakest security?',
      options: ['X.509 User Certificate', 'Username/Password', 'Anonymous', 'Kerberos Token'],
      answer: 2,
      explanation: 'Anonymous authentication — no credentials at all. It\'s appropriate for read-only public data displays. Using Anonymous on a production system with write access is how industrial incidents get a Wikipedia article. Pair it with SecurityMode None and you\'ve got a complete security disaster.'
    },
    {
      id: 'sec_7',
      type: 'fill',
      question: 'Self-signed OPC UA certificates must be manually placed in each application\'s ___ to establish trust.',
      answer: 'trust store',
      hint: 'It\'s the folder/storage where trusted certificates are kept',
      explanation: 'The trust store is where an OPC UA application keeps certificates it explicitly trusts. With CAs, you trust the CA and it handles everything. With self-signed certs, there\'s no CA — you must manually copy each peer\'s cert into your trust store. Both sides. Every time.'
    },
    {
      id: 'sec_8',
      type: 'mcq',
      question: 'OPC UA security operates at which layer of the connection stack?',
      options: [
        'Application layer only',
        'Transport layer (TLS)',
        'Secure Channel layer — below Session, above transport',
        'Session layer only'
      ],
      answer: 2,
      explanation: 'The Secure Channel layer is OPC UA\'s own security mechanism — it\'s not TLS (though HTTPS transport does use TLS). The Secure Channel provides message-level signing and encryption using the application certificates, and it\'s established before the Session is created.'
    },
    {
      id: 'sec_9',
      type: 'mcq',
      question: 'Which OPC UA Security Policy uses RSA-OAEP padding (considered more secure than PKCS#1 v1.5)?',
      options: ['Basic256Sha256', 'Aes128-Sha256-RsaOaep', 'Basic128Rsa15', 'None'],
      answer: 1,
      explanation: 'Aes128-Sha256-RsaOaep uses RSA-OAEP for key exchange, which is more resistant to padding oracle attacks than PKCS#1 v1.5 (used in Basic128Rsa15). Aes256-Sha256-RsaPss goes even further with RSA-PSS. The naming tells you what\'s inside if you know what to look for.'
    },
    {
      id: 'sec_10',
      type: 'mcq',
      question: 'User authentication in OPC UA happens at which layer?',
      options: [
        'At the Secure Channel layer, before the session',
        'At the Session layer, via ActivateSession, on top of the Secure Channel',
        'At the transport layer via TLS client certificates',
        'At the discovery layer'
      ],
      answer: 1,
      explanation: 'User authentication is part of ActivateSession — it happens after the Secure Channel is established. The Secure Channel secures the connection; ActivateSession authenticates the user on top of that. Two separate security concerns, two separate layers. The spec authors thought about this.'
    },
    {
      id: 'sec_11',
      type: 'mcq',
      question: 'When using OPC UA SecurityMode: Sign (without encryption), what is protected and what is NOT?',
      options: [
        'Neither integrity nor confidentiality is protected',
        'Message integrity is protected (signatures); message content is NOT encrypted (not confidential)',
        'Message content is encrypted but not signed',
        'Both integrity and confidentiality are protected'
      ],
      answer: 1,
      explanation: 'Sign mode adds cryptographic signatures so tampering is detectable — but the message payload is still sent in the clear. Anyone who can capture the traffic can read it. Good for environments where confidentiality isn\'t a concern but you want to know if someone\'s playing MITM. On an air-gapped network. Maybe.'
    },
    {
      id: 'sec_12',
      type: 'fill',
      question: 'The three OPC UA user authentication token types are: Anonymous, Username/Password, and ___.',
      answer: 'X.509 user certificate',
      hint: 'The strongest option, using a client-side PKI certificate for the user identity',
      explanation: 'X.509 user certificates provide the strongest user authentication — the user proves identity via a certificate rather than a password that can be guessed, phished, or written on a sticky note taped to the monitor. Most industrial environments still use Username/Password because certificate management is hard.'
    },
  ],

  subscriptions: [
    {
      id: 'sub_1',
      type: 'mcq',
      question: 'In OPC UA, what does the PublishingInterval control?',
      options: [
        'How often the server samples the underlying data source',
        'How often the server sends batched subscription notifications to the client',
        'How long before the subscription expires',
        'The maximum number of monitored items in the subscription'
      ],
      answer: 1,
      explanation: 'PublishingInterval is how often the server collects queued changes and sends a publish response. SamplingInterval (per MonitoredItem) is how often the underlying data is checked. You can sample every 100ms but only publish every 1000ms — server batches it up. Efficient.'
    },
    {
      id: 'sub_2',
      type: 'mcq',
      question: 'What is the SamplingInterval in OPC UA subscriptions?',
      options: [
        'How often the server sends updates to the client',
        'How often the server samples the monitored variable\'s underlying data source',
        'How often the client sends Publish requests',
        'The expiration timer for the subscription'
      ],
      answer: 1,
      explanation: 'SamplingInterval is set per MonitoredItem and controls how frequently the server checks the underlying source for changes. It\'s the "how often do you look at the PLC register" setting. SamplingInterval ≤ PublishingInterval makes sense; publishing faster than you sample is just expensive nothing.'
    },
    {
      id: 'sub_3',
      type: 'mcq',
      question: 'What happens when a MonitoredItem\'s QueueSize is exceeded before a Publish cycle?',
      options: [
        'The subscription is automatically deleted',
        'The oldest notification in the queue is discarded (by default)',
        'The server blocks until the client acknowledges',
        'The server increases the QueueSize automatically'
      ],
      answer: 1,
      explanation: 'By default, when the queue is full, the oldest notification is dropped to make room for the new one (DiscardOldest=true). You can set DiscardOldest=false to drop the newest instead. Either way, data is lost when the queue overflows — size your queues appropriately or increase your publishing rate.'
    },
    {
      id: 'sub_4',
      type: 'mcq',
      question: 'What does the KeepAlive mechanism in OPC UA subscriptions do?',
      options: [
        'Keeps the TCP connection alive with heartbeat packets',
        'If no data changes occur, the server sends a keepalive publish response after KeepAliveCount * PublishingInterval',
        'The client sends periodic pings to prevent session timeout',
        'Resets the subscription timer when the client is idle'
      ],
      answer: 1,
      explanation: 'KeepAlive prevents the client from thinking the server died when data just isn\'t changing. After KeepAliveCount publishing intervals with no notifications, the server sends an empty keepalive publish response. The client knows the connection is alive and the server\'s just bored. Silence, not death.'
    },
    {
      id: 'sub_5',
      type: 'mcq',
      question: 'A subscription\'s Lifetime is defined as LifetimeCount * PublishingInterval. What triggers subscription expiration?',
      options: [
        'The server not sending data for LifetimeCount cycles',
        'The client not sending Publish requests for LifetimeCount * PublishingInterval milliseconds',
        'The client failing to acknowledge notifications',
        'The connection being idle for LifetimeCount seconds'
      ],
      answer: 1,
      explanation: 'The server expects the client to keep sending Publish requests. If the client goes quiet for Lifetime milliseconds (LifetimeCount × PublishingInterval), the server declares the subscription dead and cleans it up. This is the server\'s way of saying "if you\'re not going to pick up your mail, I\'m canceling delivery."'
    },
    {
      id: 'sub_6',
      type: 'mcq',
      question: 'What is the DataChange filter trigger "StatusValueTimestamp" in OPC UA?',
      options: [
        'Trigger on status code change only',
        'Trigger when Status, Value, OR Timestamp changes',
        'Trigger only when Value changes with a good status',
        'Trigger only when the server timestamp changes'
      ],
      answer: 1,
      explanation: 'StatusValueTimestamp triggers a notification if any of the three change: the status code, the value itself, or the source/server timestamp. It\'s the most sensitive trigger — great for audit-grade monitoring. Status alone or Value alone are also options if you want to reduce notification chatter.'
    },
    {
      id: 'sub_7',
      type: 'mcq',
      question: 'What does an Absolute deadband filter of 5.0 do for a MonitoredItem?',
      options: [
        'Notifications are sent every 5 seconds',
        'Only send a notification if the value has changed by more than 5.0 units since the last notification',
        'Suppress all notifications if the value is within 5.0% of the setpoint',
        'Queue up to 5.0 seconds worth of changes before publishing'
      ],
      answer: 1,
      explanation: 'Absolute deadband: suppress notifications unless the new value differs from the last reported value by more than 5.0 (in the variable\'s engineering units). Extremely useful for noisy analog signals — without it, a signal hovering at 50.001, 49.999, 50.002 would generate thousands of notifications per hour.'
    },
    {
      id: 'sub_8',
      type: 'fill',
      question: 'The two types of deadband available for OPC UA DataChange filters are Absolute and ___.',
      answer: 'Percent',
      hint: 'The other type is relative to the variable\'s full range, expressed as a percentage',
      explanation: 'Percent deadband triggers only if the change exceeds X% of the variable\'s EU Range. So a 5% deadband on a 0-100 PSI sensor means changes less than 5 PSI are ignored. More flexible than Absolute for sensors with varying ranges — but requires EURange to be properly configured.'
    },
    {
      id: 'sub_9',
      type: 'mcq',
      question: 'When creating a MonitoredItem, which parameters are specified? (select the most complete answer)',
      options: [
        'NodeId only',
        'NodeId + AttributeId + SamplingInterval + QueueSize + filter',
        'NodeId + SecurityMode + PublishingInterval',
        'NodeId + DataType + AccessLevel'
      ],
      answer: 1,
      explanation: 'Each MonitoredItem is specified with: NodeId (what to watch), AttributeId (which attribute — usually Value), SamplingInterval (how often to check), QueueSize (how many changes to buffer), and optionally a filter (deadband, event filter). The combination gives you precise control over what gets reported and how.'
    },
    {
      id: 'sub_10',
      type: 'mcq',
      question: 'How many subscriptions can a single OPC UA session have?',
      options: [
        'Exactly one',
        'Up to 10',
        'Multiple — each with its own PublishingInterval, MonitoredItems, and KeepAlive settings',
        'Unlimited, but only one can be active at a time'
      ],
      answer: 2,
      explanation: 'A session can have multiple subscriptions simultaneously, each with its own settings. You might have one subscription publishing every 100ms for critical values and another publishing every 10 seconds for trending data. Each subscription manages its own set of MonitoredItems and its own Publish lifecycle.'
    },
  ],

  transport: [
    {
      id: 'trans_1',
      type: 'mcq',
      question: 'Which OPC UA transport mapping is most commonly used in industrial deployments and is the most efficient?',
      options: ['OPC UA HTTPS', 'OPC UA WebSocket', 'OPC UA Binary over TCP (UA-TCP)', 'OPC UA via MQTT'],
      answer: 2,
      explanation: 'UA-TCP — OPC UA Binary encoding over raw TCP on port 4840. It\'s compact, efficient, and stateful. HTTPS is used for web-friendly stateless access. WebSocket is for browser clients. UA-TCP is what your PLC, Ignition, and RTAC are almost certainly using.'
    },
    {
      id: 'trans_2',
      type: 'mcq',
      question: 'What is the purpose of the HEL/ACK exchange in OPC UA binary transport?',
      options: [
        'User authentication handshake',
        'Certificate exchange for the Secure Channel',
        'Transport-level handshake that negotiates buffer sizes and max message size',
        'Session parameter negotiation'
      ],
      answer: 2,
      explanation: 'HEL (Hello) and ACK (Acknowledge) are the first messages exchanged on a new TCP connection. The client sends HEL with its buffer/message size limits; the server responds with ACK confirming what it will support. This happens before any security or session work begins. Get the buffer sizes wrong and chunking goes sideways.'
    },
    {
      id: 'trans_3',
      type: 'mcq',
      question: 'What is message "chunking" in OPC UA?',
      options: [
        'Batching multiple service requests into one message',
        'Splitting a large message into multiple smaller chunks that fit within the negotiated max chunk size',
        'Compressing message data to reduce bandwidth',
        'Encrypting messages in segments for added security'
      ],
      answer: 1,
      explanation: 'If a message exceeds the negotiated MaxChunkSize, OPC UA splits it into multiple chunks sent sequentially. Each chunk has a header indicating whether it\'s an intermediate chunk or the final one. The receiver reassembles them. Large Browse responses and big write operations commonly get chunked.'
    },
    {
      id: 'trans_4',
      type: 'mcq',
      question: 'Which OPC UA transport uses port 443 and supports stateless, web-friendly access?',
      options: ['UA-TCP (Binary)', 'UA-WebSocket', 'UA-HTTPS', 'UA-MQTT'],
      answer: 2,
      explanation: 'UA-HTTPS uses HTTP/HTTPS on port 443. It\'s stateless (each request is independent), supports XML and JSON encoding, and is firewall-friendly since port 443 is almost always open. Less efficient than UA-TCP for high-frequency data, but great for cloud integrations and REST-like access patterns.'
    },
    {
      id: 'trans_5',
      type: 'mcq',
      question: 'In OPC UA binary encoding, what is a Variant?',
      options: [
        'A node that can change its DataType over time',
        'A container type that can hold any OPC UA built-in data type, with a type indicator',
        'An alternative encoding for floating-point values',
        'A type used only for method input/output arguments'
      ],
      answer: 1,
      explanation: 'A Variant is OPC UA\'s union type — it carries a type identifier and the encoded value, allowing a single field to hold any built-in type (Boolean, Int32, Float, String, DateTime, etc.). Read responses return Values as Variants because the server doesn\'t know at design time what type each client will ask for.'
    },
    {
      id: 'trans_6',
      type: 'mcq',
      question: 'What is an ExtensionObject in OPC UA binary encoding?',
      options: [
        'An optional field added to standard messages',
        'A wrapper for encoding complex or vendor-specific structures not defined in the standard type system',
        'An extension to the standard OPC UA service set',
        'A security extension for encrypted payloads'
      ],
      answer: 1,
      explanation: 'ExtensionObject wraps any complex or proprietary structure — it includes a TypeId and the encoded data (binary or XML). If you see an ExtensionObject in a response, the server is telling you "there\'s structured data here, look up the TypeId to know how to decode it." Vendor-specific structures are commonly ExtensionObjects.'
    },
    {
      id: 'trans_7',
      type: 'fill',
      question: 'The OPC UA binary message type used for standard service requests and responses (after the channel is open) is ___.',
      answer: 'MSG',
      hint: 'It\'s a three-letter code — the standard message type after OPN',
      explanation: 'MSG is the message type for all standard OPC UA service calls — Read, Write, Browse, Publish, etc. OPN opens the secure channel, CLO closes it, HEL/ACK are the transport handshake. MSG is the workhorse. In a Wireshark capture, most packets will be MSG type.'
    },
    {
      id: 'trans_8',
      type: 'mcq',
      question: 'Which OPC UA transport is specifically designed for browser-based clients?',
      options: ['UA-TCP', 'UA-HTTPS', 'UA-WebSocket', 'UA-MQTT'],
      answer: 2,
      explanation: 'UA-WebSocket allows OPC UA communication over WebSocket connections, which browsers support natively. This enables pure browser-based OPC UA clients without plugins or native code. It\'s the transport that lets your web app talk directly to an OPC UA server — though browser security policies will still try to ruin your day.'
    },
  ],

  ignition: [
    {
      id: 'ign_1',
      type: 'mcq',
      question: 'What is the default port for Ignition\'s built-in OPC UA server?',
      options: ['4840', '502', '62541', '44818'],
      answer: 2,
      explanation: '62541 — Ignition uses this to avoid conflicts with other OPC UA servers that might be running on the same machine using the standard port 4840. If you\'re connecting an external client to Ignition\'s OPC UA server, this is the port. Don\'t send it to 4840 and then wonder why it won\'t connect.'
    },
    {
      id: 'ign_2',
      type: 'mcq',
      question: 'After adding an OPC UA device connection in Ignition, the connection shows "Connecting" but never goes "Connected." The most likely cause is:',
      options: [
        'Wrong PublishingInterval configured',
        'Certificate trust not established on one or both sides',
        'Incorrect subscription QueueSize',
        'Wrong DataType mapping'
      ],
      answer: 1,
      explanation: 'Stuck on "Connecting" almost always means certificates. Either Ignition hasn\'t trusted the device\'s cert, the device hasn\'t trusted Ignition\'s cert, or both. Check Ignition Gateway → Config → OPC UA → Certificates and look for the pending certificate from the device. Then do the same on the device side.'
    },
    {
      id: 'ign_3',
      type: 'mcq',
      question: 'In Ignition, where do you go to approve/trust a pending OPC UA device certificate?',
      options: [
        'Designer → Tag Browser → OPC Browser',
        'Gateway → Config → OPC UA → Certificates',
        'Gateway → Config → Tags → Tag Providers',
        'Gateway → Status → Connections'
      ],
      answer: 1,
      explanation: 'Gateway Web UI → Config → OPC UA → Certificates. Certificates waiting for trust appear in the "Quarantined" section. Move them to "Trusted" to allow the connection. This is step one when an OPC UA connection won\'t establish. It\'s almost always this.'
    },
    {
      id: 'ign_4',
      type: 'mcq',
      question: 'Ignition exposes its tags as OPC UA nodes. How are tag names typically mapped to OPC UA NodeIds?',
      options: [
        'Tags are assigned random numeric NodeIds at startup',
        'Tag paths in Ignition become string-based NodeIds in Ignition\'s OPC UA namespace',
        'Tags are only accessible via Modbus, not OPC UA',
        'Tag NodeIds must be manually configured in the OPC UA module'
      ],
      answer: 1,
      explanation: 'Ignition maps tag folder/name paths to string-based NodeIds in its OPC UA server namespace. A tag at [default]Folder/Temperature becomes a browsable node with a NodeId reflecting that path. External OPC UA clients can browse and subscribe to Ignition tags just like any other OPC UA server.'
    },
    {
      id: 'ign_5',
      type: 'mcq',
      question: 'What must happen on BOTH Ignition AND the external device for a mutual-trust OPC UA connection to succeed?',
      options: [
        'Both must use the same Security Policy',
        'Both must trust the other\'s Application Instance Certificate',
        'Both must be on the same subnet',
        'Both must use the same username and password'
      ],
      answer: 1,
      explanation: 'OPC UA uses mutual certificate trust. Ignition must trust the device\'s cert AND the device must trust Ignition\'s cert. Trusting one side but not the other is the #1 "I\'ve been staring at this for three hours" mistake in OPC UA integration. Check both sides. Always.'
    },
    {
      id: 'ign_6',
      type: 'mcq',
      question: 'How do you connect Ignition to an SEL RTAC\'s OPC UA server?',
      options: [
        'Use the Modbus TCP driver in Ignition',
        'Use the Ignition OPC UA Client module to create a new OPC UA connection pointing to the RTAC\'s IP on port 4840',
        'Use DNP3 driver with OPC UA gateway translation',
        'The RTAC does not support OPC UA'
      ],
      answer: 1,
      explanation: 'Ignition\'s OPC UA Client module lets you add an OPC UA connection to any OPC UA server — including the SEL RTAC\'s server (enabled via ACSELERATOR, runs on port 4840). Once connected and certs are trusted, you browse the RTAC\'s address space and create Ignition tags from its nodes.'
    },
    {
      id: 'ign_7',
      type: 'fill',
      question: 'After connecting Ignition to an external OPC UA server, you browse the server\'s address space in Ignition Designer using the ___ browser.',
      answer: 'OPC Browser',
      hint: 'It\'s in the Designer and it specifically shows OPC connections',
      explanation: 'The OPC Browser in Ignition Designer shows all connected OPC UA servers and their address spaces. You navigate the hierarchy, select nodes, and drag them into the Tag Browser to create tags. If you can\'t browse, check your connection status in the Gateway first — Designer reflects what the Gateway sees.'
    },
    {
      id: 'ign_8',
      type: 'mcq',
      question: 'Before the SEL RTAC\'s OPC UA server can be used, what must be done on the RTAC side?',
      options: [
        'Install the Ignition OPC UA module on the RTAC',
        'Enable the OPC UA server via ACSELERATOR and configure it',
        'Flash a firmware update to add OPC UA support',
        'OPC UA is enabled by default on all RTACs — no configuration required'
      ],
      answer: 1,
      explanation: 'The OPC UA server on an SEL RTAC must be explicitly enabled and configured in ACSELERATOR RTAC (SEL\'s configuration software). It\'s not on by default. Once enabled, it runs on port 4840 and exposes the RTAC\'s configured data points as OPC UA nodes. Then Ignition can connect to it.'
    },
    {
      id: 'ign_9',
      type: 'mcq',
      question: 'A common certificate trust mistake when connecting Ignition to a PLC or RTAC is:',
      options: [
        'Trusting the certificate in Ignition but forgetting to add Ignition\'s certificate to the device\'s trust store',
        'Using the wrong port number',
        'Selecting the wrong tag type in the OPC Browser',
        'Forgetting to restart Ignition after adding the connection'
      ],
      answer: 0,
      explanation: 'The classic mistake: you trust the device cert in Ignition\'s certificate manager, connection still fails, you scratch your head. The device also has a trust store and Ignition\'s certificate needs to be added there too. Both sides. Mutual. Always. This gets everyone at least once.'
    },
    {
      id: 'ign_10',
      type: 'mcq',
      question: 'What Ignition module is required to connect Ignition as an OPC UA client to external OPC UA servers?',
      options: [
        'OPC UA Server Module',
        'OPC UA Client Module (also called the "OPC-UA" driver)',
        'Tag Historian Module',
        'Allen-Bradley Drivers Module'
      ],
      answer: 1,
      explanation: 'The OPC UA Client module (listed in Ignition\'s module manager as "OPC-UA") enables Ignition to initiate connections to external OPC UA servers. Without it, Ignition can only serve its own tags as OPC UA — it can\'t pull from external OPC UA sources. The module ships with Ignition but must be licensed.'
    },
  ],

  troubleshoot: [
    {
      id: 'ts_1',
      type: 'mcq',
      question: 'An OPC UA connection returns error "BadCertificateUntrusted." What is the fix?',
      options: [
        'Regenerate both certificates and restart',
        'Add the peer\'s certificate to your application\'s trust store',
        'Switch to SecurityMode: None',
        'Increase the session timeout'
      ],
      answer: 1,
      explanation: 'BadCertificateUntrusted means the certificate presented by the peer is not in your trust store. Fix: find the certificate (usually in a "rejected" or "quarantined" folder), review it, and move/copy it to the trusted folder. On Ignition, this is in Gateway → Config → OPC UA → Certificates.'
    },
    {
      id: 'ts_2',
      type: 'mcq',
      question: 'What does the error "BadSecureChannelClosed" typically indicate?',
      options: [
        'User authentication failed',
        'The NodeId does not exist on the server',
        'Network interruption, firewall drop, or session timeout closed the secure channel',
        'The security policy is not supported'
      ],
      answer: 2,
      explanation: 'BadSecureChannelClosed means the secure channel was terminated unexpectedly. Common causes: firewall dropping idle connections, network hiccup, server-side timeout, or the server restarting. The client needs to re-establish: open new secure channel, create session, activate session. Intermittent? Check your firewall idle-timeout settings.'
    },
    {
      id: 'ts_3',
      type: 'mcq',
      question: 'A Read request returns "BadNodeIdUnknown." What does this mean?',
      options: [
        'The NodeId format is invalid',
        'The NodeId does not exist in the server\'s Address Space',
        'The user doesn\'t have permission to read this node',
        'The node\'s value is currently unavailable'
      ],
      answer: 1,
      explanation: 'BadNodeIdUnknown: the server searched its Address Space and found nothing with that NodeId. Either the NodeId is wrong (typo, wrong namespace index), the server address space changed, or that node never existed. Browse the server to confirm the NodeId. Don\'t trust documentation you didn\'t write yourself.'
    },
    {
      id: 'ts_4',
      type: 'mcq',
      question: 'What does "BadUserAccessDenied" indicate in an OPC UA Write response?',
      options: [
        'The certificate is expired',
        'The user\'s credentials are incorrect or the user lacks write permission for this node',
        'The node\'s AccessLevel attribute does not permit writes',
        'B or C — either credentials are wrong or AccessLevel prohibits it'
      ],
      answer: 3,
      explanation: 'BadUserAccessDenied covers both cases: wrong/insufficient credentials OR the node\'s AccessLevel (or UserAccessLevel) attribute doesn\'t allow writes for this user. Check that you\'re authenticated correctly, then check the node\'s AccessLevel attribute. The error doesn\'t tell you which problem it is — because that would be too easy.'
    },
    {
      id: 'ts_5',
      type: 'mcq',
      question: 'After an unexpected session disconnect and reconnect, a Publish request returns "BadSubscriptionIdInvalid." Why?',
      options: [
        'The subscription\'s LifetimeCount was exceeded while the session was disconnected',
        'The QueueSize was exceeded',
        'The wrong PublishingInterval was used',
        'The server restarted and forgot the subscription'
      ],
      answer: 0,
      explanation: 'When a session is lost, subscriptions are tied to that session. When the client reconnects with a new session, the old subscription IDs are gone. BadSubscriptionIdInvalid means the client is trying to use a subscription that no longer exists. Reconnect the session AND recreate the subscriptions. Both.'
    },
    {
      id: 'ts_6',
      type: 'mcq',
      question: 'What free tool is widely used for OPC UA diagnostics, browsing, and manual testing?',
      options: ['Wireshark', 'UA Expert', 'Modbus Poll', 'OPC Router'],
      answer: 1,
      explanation: 'UA Expert by Unified Automation — the Swiss Army knife of OPC UA troubleshooting. Connect to any server, browse the address space, read/write values, create subscriptions, view data changes in real time. It\'s free (registration required). Every OPC UA troubleshooter should have it installed.'
    },
    {
      id: 'ts_7',
      type: 'fill',
      question: 'To capture and analyze OPC UA binary TCP traffic in Wireshark, use the display filter ___.',
      answer: 'opcua',
      hint: 'Wireshark has a built-in OPC UA dissector — just type the protocol name',
      explanation: 'The Wireshark display filter "opcua" activates the OPC UA dissector, which decodes and displays OPC UA binary messages (HEL, ACK, OPN, MSG, CLO). You can also filter by "tcp.port==4840" to see the raw traffic. The dissector can decode unencrypted messages; SecurityMode: None makes troubleshooting much easier in a lab environment.'
    },
    {
      id: 'ts_8',
      type: 'mcq',
      question: 'What does "BadTooManyPublishRequests" mean?',
      options: [
        'The subscription\'s PublishingInterval is too short',
        'The client has queued more Publish requests than the server is willing to accept simultaneously',
        'The server is overloaded and cannot process any more subscriptions',
        'The client is sending data to the server too quickly'
      ],
      answer: 1,
      explanation: 'Servers limit how many outstanding Publish requests they\'ll accept from a client simultaneously. If your client pipeline-sends too many, the server rejects the extras with BadTooManyPublishRequests. The fix is to reduce the number of simultaneous outstanding Publish requests — typically one or two is plenty per subscription.'
    },
    {
      id: 'ts_9',
      type: 'mcq',
      question: 'An OPC UA Variable shows a value with status code "Bad_NoCommunication." What does this indicate?',
      options: [
        'The OPC UA session is not established',
        'The server cannot communicate with the underlying data source (e.g., PLC) for this value',
        'The client\'s subscription is expired',
        'The node does not support the Read service'
      ],
      answer: 1,
      explanation: 'Bad_NoCommunication means the OPC UA server itself is running fine, but it can\'t reach the underlying device (PLC, field device) to get the current value. The server-to-client connection is working; the server-to-source connection is broken. Check the device communication status on the server side, not the OPC UA session.'
    },
    {
      id: 'ts_10',
      type: 'mcq',
      question: 'When troubleshooting an OPC UA connection from Ignition to a PLC, what is the recommended first diagnostic step?',
      options: [
        'Restart the Ignition Gateway',
        'Check the connection status in Gateway → OPC Connections and review the error message or pending certificates',
        'Re-install the OPC UA module',
        'Run a Wireshark capture immediately'
      ],
      answer: 1,
      explanation: 'Gateway → OPC Connections shows connection status with descriptive error messages. It\'s your first window into what\'s actually wrong. Is it "Connecting" (certificate issue)? "Faulted" (network or wrong port)? "Connected" but bad tag quality (wrong NodeId)? Start here before reaching for Wireshark or the restart button.'
    },
  ],

  lab: [
    {
      id: 'lab_1',
      type: 'mcq',
      question: 'What is UA Expert and who makes it?',
      options: [
        'A free OPC UA server simulator made by the OPC Foundation',
        'A free OPC UA client application made by Unified Automation for diagnostics and testing',
        'An Ignition module for OPC UA management',
        'A paid OPC UA development SDK'
      ],
      answer: 1,
      explanation: 'UA Expert is a free OPC UA client from Unified Automation — the go-to tool for connecting to any OPC UA server, browsing its address space, reading/writing values, and creating subscriptions. Free to download with registration. If you do OPC UA work and don\'t have UA Expert installed, you\'re making your life unnecessarily hard.'
    },
    {
      id: 'lab_2',
      type: 'mcq',
      question: 'What does the Prosys OPC UA Simulation Server provide?',
      options: [
        'A paid industrial OPC UA server for production use',
        'A free OPC UA server that generates simulated data for testing and learning without real hardware',
        'An OPC UA to Modbus protocol converter',
        'A cloud-hosted OPC UA server for remote testing'
      ],
      answer: 1,
      explanation: 'Prosys OPC UA Simulation Server is a free tool that runs on your PC and exposes simulated OPC UA data — sine waves, counters, random values, ramps. Perfect for learning, testing clients, and demonstrating OPC UA without needing a PLC in the room. Essential for a lab environment.'
    },
    {
      id: 'lab_3',
      type: 'mcq',
      question: 'What Python library is commonly used for OPC UA client and server development?',
      options: ['pymodbus', 'opcua-asyncio', 'python-snap7', 'pyserial'],
      answer: 1,
      explanation: 'opcua-asyncio is the go-to Python OPC UA library — async-native, actively maintained, supports both client and server roles. Install with pip, write 10 lines of Python, and you have a working OPC UA client. Great for integration scripts, data collection, and proving that OPC UA is approachable programmatically.'
    },
    {
      id: 'lab_4',
      type: 'mcq',
      question: 'In the suggested lab exercise, after connecting UA Expert to Ignition\'s built-in OPC UA server, what is the recommended next step?',
      options: [
        'Immediately write values to test tags',
        'Browse the tag hierarchy and create a subscription to watch 5 tags update live',
        'Configure security policies and regenerate certificates',
        'Export the address space to a CSV file'
      ],
      answer: 1,
      explanation: 'The point of the exercise: connect UA Expert to Ignition on port 62541, browse the tag tree, select 5 tags, subscribe to them, and watch the live values update. This demonstrates the full OPC UA flow — session establishment, address space browsing, MonitoredItem creation, and push notifications — in a concrete, visual way.'
    },
    {
      id: 'lab_5',
      type: 'mcq',
      question: 'Node-RED can integrate with OPC UA using which node package?',
      options: [
        'node-red-contrib-modbus',
        'node-red-contrib-opcua',
        'node-red-dashboard-opc',
        'node-red-industrial-io'
      ],
      answer: 1,
      explanation: 'node-red-contrib-opcua adds OPC UA client and server nodes to Node-RED. You can read, write, browse, and subscribe to OPC UA data in a visual flow — no code required. Excellent for rapid prototyping, simple integrations, and impressing people who think IIoT is complicated.'
    },
    {
      id: 'lab_6',
      type: 'fill',
      question: 'To connect UA Expert to Ignition\'s built-in OPC UA server running on the same machine, use the endpoint URL: opc.tcp://localhost:___',
      answer: '62541',
      hint: 'This is Ignition\'s non-standard OPC UA port',
      explanation: 'opc.tcp://localhost:62541 — Ignition\'s built-in OPC UA server endpoint. The "opc.tcp://" prefix specifies UA-TCP transport. Change "localhost" to the Gateway IP when connecting remotely. When you first connect, UA Expert and Ignition will both reject each other\'s certificates until you trust them in both places. That\'s the tradition.'
    },
  ],

}
