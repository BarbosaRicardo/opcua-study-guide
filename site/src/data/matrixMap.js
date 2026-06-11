// Maps chapters to the company skills-matrix (survey) competencies they cover.
// Source: SCADA Operations matrix (OPC servers in Ignition) + RTAC Automation
// matrix (OPC-UA client/server channels). A chapter listed here is "on the survey".

export const TRACKS = {
  scada: { label: 'SCADA OPS', color: '#fb923c' },
  rtac: { label: 'RTAC AUTO', color: '#818cf8' },
}

export const MATRIX_MAP = {
  intro: [
    { track: 'scada', week: 2, category: 'Connecting to OPC Servers',
      skills: ['Connect Ignition to external OPC servers (foundation)'] },
    { track: 'rtac', week: 2, category: 'OPC-UA Client Channel Config',
      skills: ['Interpret OPC-UA comm parameters (foundation)'] },
  ],
  architecture: [
    { track: 'rtac', week: 2, category: 'OPC-UA Client Channel Config',
      skills: ['Interpret OPC-UA comm parameters and populate RTAC channel'] },
    { track: 'rtac', week: 2, category: 'OPC-UA Server Channel Config',
      skills: ['Interpret OPC-UA server comm parameters'] },
  ],
  infomodel: [
    { track: 'scada', week: 2, category: 'Connecting to OPC Servers',
      skills: ['Browse and import OPC tags successfully'] },
    { track: 'rtac', week: 2, category: 'OPC-UA Client Channel Config',
      skills: ['Assign OPC-UA tags from vendor specs'] },
  ],
  services: [
    { track: 'rtac', week: 2, category: 'OPC-UA Client Channel Config',
      skills: ['Assign OPC-UA tags from vendor specs',
               'Troubleshoot OPC-UA communications'] },
  ],
  security: [
    { track: 'scada', week: 2, category: 'Connecting to OPC Servers',
      skills: ['Understand OPC UA security settings and certificates'] },
  ],
  subscriptions: [
    { track: 'scada', week: 2, category: 'Connecting to OPC Servers',
      skills: ['Browse and import OPC tags successfully (subscription behavior)'] },
  ],
  transport: [
    { track: 'rtac', week: 2, category: 'OPC-UA Client Channel Config',
      skills: ['Interpret OPC-UA comm parameters and populate RTAC channel'] },
  ],
  ignition: [
    { track: 'scada', week: 2, category: 'Connecting to OPC Servers',
      skills: ['Connect Ignition to external OPC servers (e.g., Kepware)',
               'Understand OPC UA security settings and certificates',
               'Browse and import OPC tags successfully'] },
    { track: 'rtac', week: 2, category: 'OPC-UA Server Channel Config',
      skills: ['Assign OPC-UA server tags',
               'Conduct P2P for OPC-UA server channel'] },
  ],
  troubleshoot: [
    { track: 'rtac', week: 2, category: 'OPC-UA Client Channel Config',
      skills: ['Troubleshoot OPC-UA communications',
               'Conduct P2P for OPC-UA channels'] },
    { track: 'rtac', week: 2, category: 'OPC-UA Server Channel Config',
      skills: ['Troubleshoot OPC-UA server communications'] },
  ],
  lab: [
    { track: 'rtac', week: 2, category: 'OPC-UA Client Channel Config',
      skills: ['Conduct P2P for OPC-UA channels (hands-on)'] },
  ],
}

export const isOnMatrix = (chapterId) => Boolean(MATRIX_MAP[chapterId]?.length)
