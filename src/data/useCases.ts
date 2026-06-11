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
}

export const USE_CASES: UseCase[] = [
  {
    slug: 'financial-services-targeted-sector',
    title: 'Financial Services: Securing the Most Targeted Sector in Cybersecurity',
    category: 'Finance',
    date: 'MAR 12, 2026',
    image: '/usecases/technological-futuristic-holograms-logistics-means-transport.jpg',
    customer: 'Large Financial Institution',
    challenge: 'A large financial institution serving millions of customers had invested heavily in conventional security layers — spam filters, signature-based antivirus, and endpoint controls. Yet sophisticated attackers continued to find their way through. Targeted Business Email Compromise (BEC) campaigns bypassed existing gateways. Malicious Office and PDF attachments evaded signature detection. Zero-day malware variants went undetected. And behind every missed threat, security engineers faced an ever-growing manual analysis burden — compounded by high false positive rates that eroded both productivity and trust in the tooling.\n\nThe institution needed more than a filter. It needed a security architecture that could see what others missed, neutralize threats before they reached users, and generate the intelligence to continuously improve its own defenses.',
    solutionAndImpact: 'The institution deployed the DFX E-Mail Security Platform and DFX Sandbox as an integrated, multi-layered email security architecture.\n\nDFX E-Mail Security Platform became the first line of analysis — subjecting every inbound message to a rigorous inspection pipeline combining Content Disarm and Reconstruction (CDR) to strip malicious content from files before delivery, Optical Character Recognition (OCR) to surface threats concealed within images, YARA-based rule engines for custom threat signature enforcement, and multi-engine antivirus scanning with AI-powered scoring and reputation analysis. Every action — quarantine, sanitization, delivery — was governed by centrally managed policies and made fully visible to security operations through a unified management interface.\n\nFiles requiring deeper investigation were automatically forwarded to DFX Sandbox, where dynamic sandbox analysis and behavioral simulation exposed threats that static detection could not surface. Rather than relying on a single analysis environment, DFX Sandbox subjected suspicious files to multiple inspection layers — revealing behaviors that only emerge under specific execution conditions. This proved decisive in detecting multi-stage malware campaigns specifically engineered to target the financial sector.\n\nKey Outcomes:\n• 92% reduction in successful phishing attempts reaching end users\n• 87% faster threat analysis\n• 100% detection of unknown malware variants\n• Enhanced executive visibility\n• Zero false-positive-driven operational overhead',
    products: ['DFX E-Mail Security Platform', 'DFX Sandbox'],
    quote: {
      text: 'The result was not simply a new security tool. It was a transformation of the institution\'s security operations model — from reactive incident response to a continuous, intelligence-driven defense posture.',
      author: 'Chief Information Security Officer'
    }
  },
  {
    slug: 'energy-utilities-critical-infrastructure',
    title: 'Energy & Utilities: Protecting the Infrastructure That Powers Everything Else',
    category: 'Energy',
    date: 'APR 05, 2026',
    image: '/usecases/aerial-photography-chinese-city.jpg',
    customer: 'Critical Energy Facility',
    challenge: 'A critical energy facility operating industrial control systems across a complex IT/OT environment faced a challenge that is increasingly common in the sector: the operational need for data to flow from the OT environment to enterprise systems — for monitoring, reporting, and compliance — while maintaining absolute certainty that no threat could travel in the opposite direction.\n\nExisting network segmentation provided a degree of separation, but not an unconditional guarantee. Software-defined boundaries can be misconfigured, exploited, or bypassed. Regulatory frameworks governing critical energy infrastructure demanded demonstrable, verifiable isolation — not documented intent. And beyond security, the facility\'s manual data transfer processes were slow, operationally burdensome, and increasingly incompatible with the pace of modern infrastructure management.',
    solutionAndImpact: 'The facility deployed the DFX Unidirectional Gateway — a hardware-enforced unidirectional security gateway that makes reverse data flow physically impossible, not merely policy-restricted.\n\nAt the core of the deployment, the DFX Unidirectional Gateway established a one-way data path from the OT environment to the enterprise network — enabling logs, telemetry data, and operational metrics to flow continuously to monitoring and reporting systems, while physically eliminating any possibility of inbound communication reaching critical industrial systems. No signal, no packet, and no threat can travel against the direction of the diode. This is not a configuration. It is physics.\n\nManual data transfer processes were replaced by automated, policy-governed workflows — eliminating operational delays, reducing human error, and freeing engineering teams to focus on infrastructure management rather than data logistics.\n\nKey Outcomes:\n• Zero security findings across heavy external security audits\n• Zero maintenance interventions required over the six-month operational period\n• Full regulatory compliance achieved with NIS2, IEC 62443, NERC CIP\n• Elimination of manual data transfer processes\n• Absolute, verifiable OT isolation',
    products: ['DFX Unidirectional Gateway'],
    quote: {
      text: 'The deployment was certified to Common Criteria EAL4+ — one of the highest internationally recognized security assurance levels, giving the organization the independently verified evidence required to satisfy regulatory obligations and pass external audits without remediation.',
      author: 'Director of OT Security'
    }
  },
  {
    slug: 'defense-government-controlled-access',
    title: 'Defense & Government: When Access Must Be Controlled Down to the Keystroke',
    category: 'Defense',
    date: 'MAY 21, 2026',
    image: '/usecases/portrait-engineers-work-hours-job-site.jpg',
    customer: 'Defense Industry Contractor',
    challenge: 'A defense industry contractor managing sensitive systems across multiple security domains faced a remote access problem that is endemic to the sector: field teams and external vendors required legitimate, operational access to protected systems — but every access pathway created exposure.\n\nConventional remote access architectures created direct connections between users and target systems — traversing internal networks, DMZ environments, and OT infrastructure in ways that expanded the attack surface with every session. A single compromised credential, a misconfigured tunnel, or an unmonitored vendor session could provide an adversary with direct, persistent access to the organization\'s most sensitive assets. Audit trails were incomplete. Session activity was difficult to monitor in real time. And the organization had no granular mechanism to govern what remote users could actually do once inside.',
    solutionAndImpact: 'The organization deployed DFX Secure Remote Access — a hardware-based cross-domain security gateway that fundamentally reframes the architecture of secure access between networks of different security classifications.\n\nRather than creating direct connections between remote users and target systems, DFX Secure Remote Access introduced a centralized, policy-governed intermediary layer operating at the hardware level. No user, regardless of role or credential level, ever establishes a direct path to a protected system. Every data exchange is brokered through a request-response architecture — where each transaction is explicitly authorized, inspected, and logged before it crosses a security domain boundary.\n\nActive Directory integration ensured that access rights were governed by existing identity infrastructure. Protocol-specific granular filtering defined precisely what data types and operations were permitted across each domain boundary. Sandbox integration via ICAP subjected suspicious content to deep inspection before it reached protected systems.\n\nKey Outcomes:\n• Complete elimination of direct network paths to sensitive systems\n• Hardware-enforced cross-domain access governance\n• Granular per-session and per-protocol controls\n• Full session and transfer logging\n• Zero operational disruption to field teams and external vendors\n• Compliance-ready audit trail',
    products: ['DFX Secure Remote Access']
  },
  {
    slug: 'manufacturing-industrial-production-floor',
    title: 'Manufacturing & Industrial: Securing the Production Floor Without Stopping Production',
    category: 'Manufacturing',
    date: 'JUN 08, 2026',
    image: '/usecases/advanced-server-hub-managing-large-datasets-artificial-intelligence-training.jpg',
    customer: 'Manufacturing Facility',
    challenge: 'A manufacturing facility operating CNC machines and HMI systems faced a threat vector that is both ubiquitous and underestimated: removable media. Engineers, vendors, and contractors routinely brought USB drives and optical media onto the production floor to transfer project files, firmware updates, and configuration data directly to industrial machines. Each transfer represented an uncontrolled entry point — a potential vehicle for ransomware, destructive malware, or espionage tools.\n\nConventional antivirus solutions offered limited protection: scan times were long enough to halt production workflows, detection capabilities were insufficient against sophisticated or zero-day variants, and there was no mechanism to enforce consistent security policy across contractors and visitors. The facility needed to eliminate the attack vector entirely — without eliminating the operational workflow it supported.',
    solutionAndImpact: 'The facility deployed an integrated solution combining DFX Media Transfer Station secure media transfer kiosks with DFX PortX — a hardware-based Zero Trust data bridge — creating a complete, end-to-end secure file transfer ecosystem for the production environment.\n\nDFX Media Transfer Station kiosks were positioned at all entry points where removable media was previously introduced. Physical access controls, user authentication, and on-device cameras established a verifiable chain of custody for every transfer event. Within the kiosk, every file was subjected to multi-engine antivirus scanning, sandbox analysis, and Content Disarm and Reconstruction (CDR) — stripping potentially malicious components from files while preserving their operational content. Files that passed inspection were cryptographically signed with a PKI certificate.\n\nAt the endpoint, DFX PortX enforced the final layer of control. Operating directly on the industrial machines, DFX PortX verified the PKI signature of every file before permitting execution or installation. Files without a valid certificate from the inspection pipeline were rejected at the hardware level.\n\nKey Outcomes:\n• Zero malware infections on production floor machines following deployment\n• Zero production downtime attributable to security operations\n• Full Zero USB policy enforcement achieved without operational disruption\n• End-to-end chain of custody for every file entering the production environment\n• Multi-layer threat prevention',
    products: ['DFX Media Transfer Station', 'DFX PortX', 'DFX Sandbox']
  },
  {
    slug: 'oil-gas-physical-catastrophe',
    title: 'Oil & Gas: Where a Single Breach Can Become a Physical Catastrophe',
    category: 'Oil & Gas',
    date: 'JUL 14, 2026',
    image: '/usecases/aerial-photography-chinese-city.jpg',
    customer: 'Oil and Gas Operator',
    challenge: 'Oil and gas operators face a security challenge that is structurally different from most enterprise environments. Their operational technology infrastructure is geographically dispersed — spanning remote onshore facilities, offshore platforms, and pipeline control stations that may be physically inaccessible for extended periods. These systems must remain isolated from external threats, yet they generate continuous streams of operational data that enterprise teams, regulators, and safety systems depend on in real time.\n\nAt the same time, maintaining and updating these systems requires regular intervention by engineers and contractors who arrive on-site with firmware updates stored on removable media. Each visit represents an uncontrolled introduction of external data into an environment that cannot tolerate compromise. Conventional security tools are often incompatible with legacy industrial systems, too slow for operational workflows, or simply absent at remote locations.',
    solutionAndImpact: 'The operator deployed an integrated architecture combining DFX Unidirectional Gateway for network boundary enforcement and DFX Media Transfer Station for removable media control — addressing both the connectivity risk and the physical media risk within a unified security framework.\n\nAt the network layer, DFX Unidirectional Gateway was deployed at the boundary between OT control networks and enterprise IT infrastructure. Operational telemetry flows continuously and automatically from the OT environment to enterprise monitoring systems without creating any inbound pathway. The hardware diode makes reverse communication physically impossible. At remote locations, Compact and Fusion form factor options provided the same hardware-enforced protection within a footprint engineered for field deployment.\n\nAt the physical access layer, DFX Media Transfer Station kiosks were deployed at facility entry points. Multi-engine antivirus scanning, CDR-based file sanitization, and sandbox analysis inspect every file — stripping potentially malicious content. Files that pass inspection are cryptographically signed with a PKI certificate, creating a verifiable chain of custody.\n\nKey Outcomes:\n• Hardware-enforced OT network isolation across geographically dispersed facilities\n• Continuous, automated operational data flow from OT to enterprise systems\n• Zero uncontrolled file introductions to production systems\n• Full chain of custody for every maintenance file transfer\n• Compliance alignment with IEC 62443, NIS2',
    products: ['DFX Unidirectional Gateway', 'DFX Media Transfer Station', 'DFX Sandbox']
  }
];
