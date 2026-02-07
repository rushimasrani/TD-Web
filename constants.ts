import { 
  Shield, 
  Lock, 
  Network, 
  Server, 
  Cloud, 
  Smartphone, 
  Globe, 
  Megaphone,
  Briefcase,
  Activity,
  Code,
  Layers
} from 'lucide-react';
import { ServiceCategory } from './types';

export const COMPANY_NAME = "TechDefends";
export const COMPANY_PHONE = "+91 83207 45161";
export const COMPANY_EMAIL = "info@techdefends.com";
export const COMPANY_ADDRESS = "819-Krupal Pathshala, Shivranjani Cross Road, Ahmedabad-Gujarat 380015";

export const SERVICES: ServiceCategory[] = [
  {
    id: 'offensive-security',
    title: 'Offensive Security',
    shortDescription: 'Proactive vulnerability assessments and penetration testing to identify weaknesses before attackers do.',
    fullDescription: 'Our Offensive Security services emulate real-world attacks to identify vulnerabilities in your infrastructure, applications, and people. We help you stay ahead of threats by finding and fixing security gaps.',
    icon: Shield,
    subServices: [
      { title: 'Vulnerability Assessment & Penetration Testing (VAPT)', description: 'Comprehensive scanning and exploitation to find security flaws.' },
      { title: 'Web Application Penetration Testing', description: 'Deep dive manual and automated testing of web apps (OWASP Top 10).' },
      { title: 'Mobile Application Penetration Testing', description: 'Security testing for iOS and Android applications.' },
      { title: 'Cloud Penetration Testing', description: 'Assessing security of AWS, Azure, and GCP environments.' },
      { title: 'Network Penetration Testing', description: 'Internal and external network security assessments.' },
      { title: 'Active Directory Penetration Testing', description: 'Identifying weaknesses in AD implementation and policies.' },
      { title: 'Phishing & Vishing Simulations', description: 'Testing employee awareness against social engineering attacks.' },
      { title: 'Source Code Review', description: 'Static application security testing (SAST) to find code-level vulnerabilities.' },
      { title: 'Marketplace Application Reviews', description: 'Security validation for apps listed on public marketplaces.' }
    ],
    benefits: [
      'Identify critical vulnerabilities before hackers do.',
      'Meet compliance requirements (PCI-DSS, HIPAA, SOC2).',
      'Protect brand reputation and customer trust.',
      'Prioritized remediation roadmap.'
    ]
  },
  {
    id: 'defensive-security',
    title: 'Defensive Security',
    shortDescription: 'Robust defense mechanisms including SOC optimization, DFIR, and compliance management.',
    fullDescription: 'Build a resilient fortress around your digital assets. Our Defensive Security services focus on detection, response, and governance to ensure continuous protection.',
    icon: Lock,
    subServices: [
      { title: 'SOC Optimization', description: 'Enhancing Security Operations Center processes and technology.' },
      { title: 'Digital Forensics & Incident Response (DFIR)', description: 'Rapid response to security incidents and forensic analysis.' },
      { title: 'PCI-DSS Compliance', description: 'Ensuring secure handling of credit card information.' },
      { title: 'HIPAA Compliance', description: 'Protecting sensitive patient health information.' },
      { title: 'GRC Compliance', description: 'Governance, Risk, and Compliance strategy and implementation.' }
    ],
    benefits: [
      '24/7 monitoring and threat detection capability.',
      'Rapid recovery from cyber incidents.',
      'Adherence to global regulatory standards.',
      'Structured risk management framework.'
    ]
  },
  {
    id: 'network-security',
    title: 'Network Security',
    shortDescription: 'Next-gen firewall deployment and management for fortified network perimeters.',
    fullDescription: 'Your network is the backbone of your operations. We deploy and manage top-tier network security solutions to filter traffic, prevent intrusions, and secure data flow.',
    icon: Network,
    subServices: [
      { title: 'Firewall Deployment & Management', description: 'End-to-end configuration and maintenance of firewalls.' },
      { title: 'Sophos Solutions', description: 'Implementation of Sophos XG and Intercept X ecosystems.' },
      { title: 'Fortinet Solutions', description: 'FortiGate firewall setup and Unified Threat Management.' },
      { title: 'Palo Alto Networks', description: 'Next-Generation Firewall (NGFW) deployment for enterprise.' }
    ],
    benefits: [
      'Granular control over network traffic.',
      'Prevention of unauthorized access and malware.',
      'Secure VPN access for remote workforces.',
      'High availability and network redundancy.'
    ]
  },
  {
    id: 'managed-it',
    title: 'Deployment & Managed IT',
    shortDescription: 'End-to-end IT infrastructure management, from on-prem to SaaS and Microsoft 365.',
    fullDescription: 'Focus on your core business while we handle your IT infrastructure. Our Managed Services ensure your systems are up-to-date, secure, and running efficiently.',
    icon: Server,
    subServices: [
      { title: 'On-Premises Deployments', description: 'Server, storage, and networking hardware setup.' },
      { title: 'SaaS Deployments', description: 'Configuration and integration of software-as-a-service tools.' },
      { title: 'Microsoft 365 Management', description: 'Licensing, user management, and security configuration for O365.' },
      { title: 'Email Security', description: 'Anti-phishing, anti-spam, and encryption solutions.' },
      { title: 'Data Security', description: 'DLP (Data Loss Prevention) and backup strategies.' },
      { title: 'Managed Service Provider (MSP)', description: 'Comprehensive ongoing IT support and monitoring.' }
    ],
    benefits: [
      'Reduced IT operational costs.',
      'Access to enterprise-grade tools for SMBs.',
      'Proactive system maintenance.',
      'Scalable infrastructure support.'
    ]
  },
  {
    id: 'devops-cloud',
    title: 'DevOps & Cloud Services',
    shortDescription: 'Secure cloud architecture and CI/CD pipelines for AWS, Azure, and GCP.',
    fullDescription: 'Accelerate your development lifecycle without compromising security. We integrate security into the DevOps pipeline (DevSecOps) and harden your cloud environments.',
    icon: Cloud,
    subServices: [
      { title: 'AWS Cloud Services', description: 'Architecture, migration, and management of Amazon Web Services.' },
      { title: 'Microsoft Azure', description: 'Enterprise cloud solutions on the Azure platform.' },
      { title: 'Google Cloud Platform (GCP)', description: 'Scalable infrastructure using Google Cloud technologies.' },
      { title: 'Secure CI/CD', description: 'Automated pipelines with integrated security gates.' },
      { title: 'Cloud Hardening', description: 'CIS benchmark implementation for cloud resources.' }
    ],
    benefits: [
      'Faster time-to-market.',
      'Automated security compliance.',
      'Highly available and scalable cloud architecture.',
      'Cost-optimized cloud spending.'
    ]
  },
  {
    id: 'app-development',
    title: 'Application Development',
    shortDescription: 'Custom web and mobile application development with a security-first approach.',
    fullDescription: 'We build robust, scalable, and secure applications tailored to your business needs. Security is baked in from the design phase, not added as an afterthought.',
    icon: Smartphone,
    subServices: [
      { title: 'Web Application Development', description: 'React, Angular, and Vue.js based enterprise web apps.' },
      { title: 'Mobile Application Development', description: 'Native (iOS/Android) and cross-platform (React Native/Flutter) apps.' },
      { title: 'Secure Architecture Design', description: 'Threat modeling and secure system design patterns.' }
    ],
    benefits: [
      'Custom solutions for unique business problems.',
      'Secure by design methodology.',
      'Cross-platform compatibility.',
      'User-centric UI/UX design.'
    ]
  },
  {
    id: 'web-development',
    title: 'Website Development',
    shortDescription: 'Corporate websites and portals designed for performance, SEO, and security.',
    fullDescription: 'Your website is your digital storefront. We create stunning, fast, and secure websites that drive conversions and withstand cyber threats.',
    icon: Globe,
    subServices: [
      { title: 'Corporate Websites', description: 'Professional brochure sites for enterprises.' },
      { title: 'Business Portals', description: 'Intranets and customer portals with role-based access.' },
      { title: 'Secure & SEO-Friendly Apps', description: 'SSR/SSG solutions (Next.js/Gatsby) for maximum visibility.' }
    ],
    benefits: [
      'Professional brand representation.',
      'High performance and core web vitals.',
      'SEO optimization built-in.',
      'Hardened against common web attacks.'
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    shortDescription: 'Strategic digital marketing to grow your brand visibility and lead generation.',
    fullDescription: 'Grow your business with data-driven marketing strategies. We help technical companies reach their target audience effectively.',
    icon: Megaphone,
    subServices: [
      { title: 'SEO & SEM', description: 'Search Engine Optimization and Pay-Per-Click campaigns.' },
      { title: 'Social Media Marketing', description: 'LinkedIn, Twitter, and Facebook B2B marketing strategies.' },
      { title: 'Branding & Performance Marketing', description: 'Identity design and ROI-focused ad campaigns.' }
    ],
    benefits: [
      'Increased qualified leads.',
      'Stronger brand authority.',
      'Measurable ROI.',
      'Targeted audience engagement.'
    ]
  }
];

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  imageUrl: string;
  author: string;
  readTime: string;
  sourceUrl?: string;
}

// Helper to get dynamic recent dates
const getDateDaysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Zero-Day Vulnerability Found in Major Cloud Hypervisors',
    description: 'Security researchers have identified a critical remote code execution vulnerability affecting millions of cloud instances. Immediate patching is recommended for all enterprise users to prevent data exfiltration and unauthorized access.',
    date: getDateDaysAgo(2),
    category: 'Vulnerability',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    author: 'Sarah Jenkins',
    readTime: '5 min read',
    sourceUrl: 'https://www.cisa.gov/news-events/cybersecurity-advisories'
  },
  {
    id: '2',
    title: 'The Rise of AI-Powered Phishing Attacks',
    description: 'Cybercriminals are leveraging generative AI to create highly convincing phishing emails that bypass traditional spam filters. These sophisticated attacks use natural language processing to mimic executive writing styles.',
    date: getDateDaysAgo(5),
    category: 'Threat Intel',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    author: 'Mike Ross',
    readTime: '4 min read',
    sourceUrl: 'https://thehackernews.com/search/label/Phishing'
  },
  {
    id: '3',
    title: 'New Global Compliance Standards for IoT Devices',
    description: 'Regulators have agreed on a new framework for Internet of Things (IoT) security, mandating stronger encryption and regular firmware updates. Manufacturers will now be held accountable for the lifecycle security.',
    date: getDateDaysAgo(12),
    category: 'Compliance',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    author: 'Elena Fisher',
    readTime: '6 min read',
    sourceUrl: 'https://www.nist.gov/internet-things-iot'
  }
];

export const MOCK_NEWS_POOL: NewsItem[] = [
  {
    id: '4',
    title: 'Ransomware Gangs Shift Tactics to Data Theft',
    description: 'Instead of just encrypting files, ransomware groups are now prioritizing data exfiltration to extort victims, bypassing backup defenses. Double extortion schemes are becoming the norm.',
    date: getDateDaysAgo(15),
    category: 'Ransomware',
    imageUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    author: 'David Chen',
    readTime: '4 min read',
    sourceUrl: 'https://www.bleepingcomputer.com/tag/ransomware/'
  },
  {
    id: '5',
    title: 'Quantum Computing: The End of RSA Encryption?',
    description: 'Experts discuss the timeline for post-quantum cryptography and what businesses need to do today to prepare for the quantum decryption threat. Current encryption standards face potential obsolescence.',
    date: getDateDaysAgo(25),
    category: 'Future Tech',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    author: 'Dr. Alan Grant',
    readTime: '7 min read',
    sourceUrl: 'https://www.ibm.com/quantum/security'
  },
  {
    id: '6',
    title: 'Supply Chain Attacks Surge Globally',
    description: 'Attackers are increasingly targeting software dependencies to infiltrate high-value targets, highlighting the need for SBOMs and rigorous vendor vetting. Several high-profile incidents have demonstrated cascading effects.',
    date: getDateDaysAgo(45),
    category: 'Supply Chain',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    author: 'Jessica Jones',
    readTime: '5 min read',
    sourceUrl: 'https://www.csoonline.com/article/571348/supply-chain-attacks-soar.html'
  },
  {
    id: '7',
    title: 'Kubernetes Security Best Practices for Enterprise',
    description: 'A deep dive into securing container orchestration platforms. We analyze the most common misconfigurations in K8s clusters and provide actionable remediation strategies.',
    date: getDateDaysAgo(60),
    category: 'DevSecOps',
    imageUrl: 'https://images.unsplash.com/photo-1667372393119-c85c020799a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    author: 'Tom Haverford',
    readTime: '8 min read',
    sourceUrl: 'https://kubernetes.io/docs/concepts/security/'
  }
];