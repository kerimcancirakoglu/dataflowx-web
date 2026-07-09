export interface UseCase {
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  customer: string;
  challenge: string;
  solutionAndImpact: string;
  products: string[];
  quote?: {
    text: string;
    author: string;
  };
  pdfUrls?: { en?: string; tr?: string };
}

export const USE_CASES: UseCase[] = [
  {
    slug: 'energy-hydroelectric-ot-it-isolation',
    title: 'Hydroelectric Power: Hardware-Enforced OT/IT Isolation and Automated Data Transfer',
    category: 'Energy',
    date: 'JUL 09, 2026',
    image: '/usecases/energy-hydroelectric.jpg',
    customer: 'Hydroelectric Power Plant (500+ MW, 200+ operational staff, Turkey)',
    challenge: 'The plant had relied on conventional firewalls for OT/IT network segmentation for years. Penetration tests revealed a fundamental problem: software-defined boundaries — regardless of configuration — can be misconfigured, exploited by zero-day vulnerabilities, or manipulated by insiders. As EPDK (Energy Market Regulatory Authority) audits intensified, the requirement for a demonstrable physical security guarantee became impossible to satisfy with firewall documentation alone. Regulators demanded verifiable, irreversible isolation — not documented policy intent.\n\nAlongside the security challenge, operational data from field devices — turbine RPM readings, pressure logs, generator telemetry — was being manually transferred to the control center every day. This process consumed approximately 45 minutes of engineering time daily, introduced transcription errors, and created a systematic lag between field conditions and management visibility.',
    solutionAndImpact: 'After evaluating competing solutions, the plant deployed the DFX Unidirectional Gateway — Common Criteria EAL4+ certified and NATO-approved — as the physical enforcement layer between OT and IT networks.\n\nA one-way hardware barrier was established at the OT/IT boundary. Turbine RPM data, pressure logs, and SIEM event feeds began flowing continuously and automatically to enterprise systems without any manual intervention. The hardware architecture made the delivery of a single bit of data from the IT network to the OT environment physically impossible — not policy-restricted, but structurally impossible. Even in the event of a complete IT network compromise, the OT environment remains unreachable by design.\n\nSoftware updates and firmware patches required by OT systems were handled through a separate channel: a DFX Media Transfer Station kiosk deployed at the facility perimeter. Engineers authenticate with PIN verification, files are subjected to multi-engine antivirus scanning and CDR sanitization, and only validated, cryptographically signed content crosses into the OT environment.\n\nKey Outcomes:\n• Security audit findings reduced from 7 to 0\n• 45-minute daily manual data transfer process fully automated\n• Full compliance with EPDK regulations achieved\n• Zero-day attack surface for the OT network physically eliminated\n• Continuous, real-time operational data flow from field devices to enterprise systems',
    products: ['DFX Unidirectional Gateway', 'DFX Media Transfer Station'],
    quote: {
      text: 'When auditors ask how we prevent unauthorized intervention in the OT network, we no longer need a technical explanation. We show them the device: physics prevents it, not software.',
      author: 'OT Security Manager'
    },
    pdfUrls: { en: '', tr: '' },
  },
  {
    slug: 'defense-supplier-zero-trust-remote-access',
    title: 'Defense Industry: Zero Trust Remote Access for Contractors and Suppliers',
    category: 'Defense',
    date: 'JUL 09, 2026',
    image: '/usecases/defense-remote-access.jpg',
    customer: 'Defense Industry Contractor (1,500+ employees, multi-site facility, Turkey)',
    challenge: 'Field teams and external suppliers required legitimate remote access to production systems. But standard RDP-based connectivity created a critical blind spot: there was no mechanism to monitor what a connected party was doing, which files they were copying, or which commands they were executing. The internal audit team\'s question — "Which supplier is on which system doing what, right now?" — had no answer.\n\nEvery active vendor session represented unquantifiable exposure. A compromised external machine could introduce malware directly into the production environment. File exfiltration was technically unrestricted. There was no granular control over what remote users could access or do once connected, and no audit-grade record of their activity.',
    solutionAndImpact: 'The organization deployed DFX Secure Remote Access as a centralized access governance layer between all remote users and protected production systems.\n\nNo vendor or field engineer now connects directly to any system. All sessions are initiated through a policy-governed intermediary that enforces Multi-Factor Authentication, restricts access scope to specific systems and defined time windows, and blocks lateral movement entirely. Clipboard operations, file transfer capabilities, and disk mappings are disabled at the protocol level. Every session — from authentication to disconnection — is recorded as a full video log with timestamped activity data.\n\nThe result is a fundamentally different access architecture: suppliers can reach exactly what they need, during exactly the window they are authorized for, with every action permanently recorded and auditable. Active Directory integration means access governance is tied to existing identity infrastructure, not a parallel system.\n\nKey Outcomes:\n• Vendor session visibility increased from 0% to 100% (full video recording and activity logging)\n• Unauthorized file transfer capability eliminated entirely\n• Internal audit findings related to access control cleared\n• New supplier onboarding time reduced from 2–3 days to 4 hours\n• Real-time session monitoring capability established for security operations',
    products: ['DFX Secure Remote Access'],
    quote: {
      text: 'Now we can tell a supplier "look but don\'t touch" and technically guarantee it. In the old system that relied on human trust. Now the architecture enforces it.',
      author: 'Chief Information Security Officer (CISO)'
    },
    pdfUrls: { en: '', tr: '' },
  },
  {
    slug: 'finance-bec-email-security',
    title: 'Banking Sector: Eliminating Targeted BEC Attacks and Alert Fatigue',
    category: 'Finance',
    date: 'JUL 09, 2026',
    image: '/usecases/finance-bec-email.jpg',
    customer: 'Regulated Bank (BDDK supervised, 3,000+ employees, Turkey)',
    challenge: 'The bank was receiving highly sophisticated Business Email Compromise (BEC) campaigns that its existing security infrastructure was structurally unable to detect. Attackers impersonated trusted suppliers or mimicked the writing style of senior executives with enough precision to defeat signature-based analysis. These were not mass phishing campaigns — they were targeted, manually crafted attacks designed to exploit human judgment rather than technical vulnerabilities.\n\nCompounding the threat detection problem was an operational crisis driven by false positives. The bank\'s existing email security system generated a high volume of incorrect alerts, forcing security engineers to manually review hundreds of clean emails daily. Alert fatigue had set in: the team was exhausted by the noise, and genuine threats were at increasing risk of being overlooked. The organization needed a system that could see what others missed — without generating the false alarms that eroded trust in the tooling.',
    solutionAndImpact: 'The bank deployed a three-layer integrated email security architecture: DFX Email Security Platform as the primary gateway, DFX Malware Mitigation Sandbox for behavioral analysis of suspicious content, and DFX CDR for deep threat intelligence and reporting.\n\nDFX Email Security Platform\'s machine learning engine replaced signature-based detection with behavioral analysis — evaluating sender patterns, communication history, writing style consistency, and relationship context to identify BEC impersonation attempts that no signature database could catch. Every inbound attachment was processed through Content Disarm and Reconstruction (CDR), stripping embedded threats from documents before delivery, regardless of whether the threat was known.\n\nFiles requiring deeper inspection were automatically routed to DFX Malware Mitigation Sandbox, where live behavioral detonation exposed multi-stage attack payloads specifically engineered to evade static analysis. DFX CDR provided the security team with detailed intelligence reports — not just detections, but explanations of attack techniques, enabling continuous improvement of defensive posture.\n\nKey Outcomes:\n• Sophisticated BEC attacks now detected at maximum coverage — including campaigns that bypassed all previous controls\n• False positive rate significantly reduced, eliminating alert fatigue across the security operations team\n• Manual email review burden reduced from hundreds of cases per day to critical escalations only\n• BDDK email security audit findings fully remediated\n• Security team capacity redirected from noise management to genuine threat response',
    products: ['DFX Email Security Platform', 'DFX Malware Mitigation Sandbox', 'DFX CDR'],
    quote: {
      text: 'We\'re now catching the targeted BEC attacks our previous system consistently missed. And the false positive rate dropped so much that our engineers can focus on real threats — alert fatigue is gone.',
      author: 'Chief Information Security Officer (CISO)'
    },
    pdfUrls: { en: '', tr: '' },
  },
  {
    slug: 'manufacturing-cnc-zero-usb-policy',
    title: 'CNC Manufacturing: Enforcing Zero USB Policy Without Stopping Production',
    category: 'Manufacturing',
    date: 'JUL 09, 2026',
    image: '/usecases/manufacturing-cnc.jpg',
    customer: 'CNC & HMI Manufacturing Facility (400+ production staff, 80+ air-gapped machines, Turkey)',
    challenge: 'Air-gapped CNC machines and HMI systems across the production floor required daily file transfers — project files, firmware updates, configuration data — delivered via USB drives brought in by engineers, vendors, and contractors. The source and integrity of these devices was unverified, and each transfer represented an uncontrolled entry point into production systems.\n\nFollowing a major ransomware crisis in the broader manufacturing sector, facility management declared a Zero USB policy. The security intent was clear. The operational challenge was not: conventional antivirus scanning of each USB device took 8 to 12 minutes per device, halting the CNC machines that depended on those files and directly disrupting production output. The organization needed to eliminate the threat without eliminating the operational workflow.',
    solutionAndImpact: 'The facility deployed an integrated architecture combining DFX Media Transfer Station kiosks, DFX Unidirectional Gateway for network transfer enforcement, and DFX PASS at the CNC endpoint level — creating a complete, hardware-enforced Zero USB ecosystem.\n\nDFX Media Transfer Station kiosks were installed at facility entry points and production zone boundaries. Engineers authenticate at the kiosk via PIN verification, with the built-in camera establishing a logged chain of custody for every transfer event. File scanning — multi-engine antivirus, sandbox analysis, and CDR sanitization — completes in seconds, not minutes, with no production machine waiting idle. Files that pass inspection are cryptographically signed with a PKI certificate.\n\nAt the CNC endpoint, DFX PASS enforces the final hardware-level control: it verifies the PKI signature of every file before permitting execution or installation on the machine. Files arriving without a valid certificate from the inspection pipeline — including files from unauthorized USB drives — are rejected at the hardware level. There is no override. There is no exception.\n\nKey Outcomes:\n• USB-borne malware risk eliminated across all production machines\n• Scanning-related production downtime reduced from 8–12 minutes per device to zero (scanning handled at the kiosk, not the machine)\n• Unauthorized file introduction to production systems made physically impossible\n• 100% audit trail and chain of custody for every file entering the production environment\n• In the first week of deployment, 3 USB devices were found to contain suspicious files that would previously have reached CNC machines undetected',
    products: ['DFX Media Transfer Station', 'DFX Unidirectional Gateway', 'DFX PASS'],
    quote: {
      text: '"Zero USB policy" sounds straightforward. Implementing it in a live factory is something else entirely. DataFlowX showed us how to enforce it without stopping production. In the first week after deployment, suspicious files were detected on 3 USBs. With our previous system, those files would have gone directly into the machines.',
      author: 'Factory OT Security Officer'
    },
    pdfUrls: { en: '', tr: '' },
  },
  {
    slug: 'energy-ot-usb-threat-defense',
    title: 'Energy Sector CPS: Closing the USB Attack Chain Before It Reaches the Grid',
    category: 'Energy',
    date: 'JUL 09, 2026',
    image: '/usecases/energy-usb-threat.jpg',
    customer: 'Electricity Transmission & Distribution Operator (Regional grid operator, 15+ substations, Turkey)',
    challenge: 'The organization operated a distributed SCADA/ICS environment spanning substations, remote relay stations, and a central control facility. These systems were deliberately air-gapped — no internet connectivity, no remote management protocols. In theory, isolation meant safety. In practice, isolation created a dependency that threat intelligence classified as one of the most dangerous vectors in critical infrastructure: removable media.\n\nFirmware updates for PLCs, historian exports from SCADA systems, and engineering configuration files all traveled into the OT environment on USB drives carried by internal engineers, OEM technicians, and third-party contractors. No systematic inspection process existed. Drives were plugged directly into HMIs and engineering workstations without scanning. The security team had no visibility into what was being transferred, by whom, or when.\n\nThe threat was not theoretical: Honeywell\'s 2024 USB Threat Report found that 51% of OT-targeted malware is specifically engineered to enter via removable media, and 82% of detected USB malware in OT environments is capable of causing loss of view, loss of control, or complete system outage. The Ukraine power grid attack (BlackEnergy, 2015) and the TRITON safety system compromise (Saudi petrochemical, 2017) both began as vectors that a USB inspection process could have blocked before they reached operational infrastructure.',
    solutionAndImpact: 'The operator deployed a three-layer DataFlowX Zero Trust architecture that closes the USB attack chain at every stage — without disrupting operational workflows or requiring changes to how engineers work on-site.\n\nDFX Media Transfer Station kiosks were installed at all facility entry points and substation control rooms. Every USB device entering the environment must pass through the kiosk before any file can be accessed on production equipment. Multi-engine antivirus scanning, CDR-based file sanitization, and sandbox behavioral analysis run simultaneously — the process completes in seconds. Files that pass inspection are cryptographically signed with a PKI certificate and logged with the operator\'s identity, timestamp, and device metadata, establishing a verifiable chain of custody for every transfer event.\n\nDFX PASS was deployed at OT endpoints — HMIs and engineering workstations across all 15 substations. PASS verifies the cryptographic signature of every file before permitting execution or installation. A USB drive bypassing the kiosk — dropped in a parking lot, handed over by a compromised vendor, or brought in by an insider — is rejected at the hardware level with no override path available to any user.\n\nDFX Unidirectional Gateway was deployed at the IT/OT network boundary. Operational telemetry, historian feeds, and SCADA event data flow continuously from OT to enterprise systems. The hardware architecture makes the reverse path — commands, malware, or attacker tooling traveling from IT into OT — physically impossible. Even a fully compromised IT network cannot reach the operational control environment.\n\nKey Outcomes:\n• USB-borne malware entry into OT environment eliminated across all 15 substations\n• 100% chain of custody and audit trail for every file entering the operational environment\n• Lateral movement from IT to OT made physically impossible at the hardware layer\n• NERC CIP and IEC 62443-3-3 SR 3.2 / SR 5.2 compliance requirements met\n• In the first 90 days: 7 USB devices flagged at kiosks — files contained known OT malware signatures that would have reached live substations undetected under the previous process',
    products: ['DFX Media Transfer Station', 'DFX PASS', 'DFX Unidirectional Gateway'],
    quote: {
      text: 'The air gap we thought protected us was exactly the reason USB drives were our biggest vulnerability. DataFlowX closed the gap without closing the workflow.',
      author: 'OT Infrastructure Security Lead'
    },
    pdfUrls: { en: '', tr: '' },
  },
  {
    slug: 'oil-gas-physical-catastrophe',
    title: 'Oil & Gas: Where a Single Breach Can Become a Physical Catastrophe',
    category: 'Oil & Gas',
    date: 'JUL 14, 2026',
    image: '/usecases/oil-gas.jpg',
    customer: 'Oil and Gas Operator',
    challenge: 'Oil and gas operators face a security challenge that is structurally different from most enterprise environments. Their operational technology infrastructure is geographically dispersed — spanning remote onshore facilities, offshore platforms, and pipeline control stations that may be physically inaccessible for extended periods. These systems must remain isolated from external threats, yet they generate continuous streams of operational data that enterprise teams, regulators, and safety systems depend on in real time.\n\nAt the same time, maintaining and updating these systems requires regular intervention by engineers and contractors who arrive on-site with firmware updates stored on removable media. Each visit represents an uncontrolled introduction of external data into an environment that cannot tolerate compromise. Conventional security tools are often incompatible with legacy industrial systems, too slow for operational workflows, or simply absent at remote locations.',
    solutionAndImpact: 'The operator deployed an integrated architecture combining DFX Unidirectional Gateway for network boundary enforcement and DFX Media Transfer Station for removable media control — addressing both the connectivity risk and the physical media risk within a unified security framework.\n\nAt the network layer, DFX Unidirectional Gateway was deployed at the boundary between OT control networks and enterprise IT infrastructure. Operational telemetry flows continuously and automatically from the OT environment to enterprise monitoring systems without creating any inbound pathway. The hardware diode makes reverse communication physically impossible. At remote locations, Compact and Fusion form factor options provided the same hardware-enforced protection within a footprint engineered for field deployment.\n\nAt the physical access layer, DFX Media Transfer Station kiosks were deployed at facility entry points. Multi-engine antivirus scanning, CDR-based file sanitization, and sandbox analysis inspect every file — stripping potentially malicious content. Files that pass inspection are cryptographically signed with a PKI certificate, creating a verifiable chain of custody.\n\nKey Outcomes:\n• Hardware-enforced OT network isolation across geographically dispersed facilities\n• Continuous, automated operational data flow from OT to enterprise systems\n• Zero uncontrolled file introductions to production systems\n• Full chain of custody for every maintenance file transfer\n• Compliance alignment with IEC 62443, NIS2',
    products: ['DFX Unidirectional Gateway', 'DFX Media Transfer Station', 'DFX Malware Mitigation Sandbox'],
    pdfUrls: { en: '', tr: '' },
  }
];
