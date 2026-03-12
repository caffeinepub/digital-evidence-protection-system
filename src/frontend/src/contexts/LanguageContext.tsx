import { type ReactNode, createContext, useContext, useState } from "react";

export type Lang = "en" | "hi";

const translations = {
  en: {
    appName: "Digital Evidence Protection System",
    appShort: "DEPS",
    home: "Home",
    about: "About System",
    upload: "Evidence Upload",
    verify: "Verify Evidence",
    dashboard: "Case Dashboard",
    admin: "Admin Panel",
    contact: "Contact",
    login: "Login",
    logout: "Logout",
    signup: "Sign Up",
    uploadEvidence: "Upload Evidence",
    verifyEvidence: "Verify Evidence",
    evidenceId: "Evidence ID",
    sha256Hash: "SHA-256 Hash",
    tamperDetected: "Tamper Detected",
    evidenceVerified: "Evidence Verified",
    uploadFile: "Upload File",
    createCase: "Create Case",
    activityLog: "Activity Log",
    caseId: "Case ID",
    status: "Status",
    description: "Description",
    fileName: "File Name",
    fileSize: "File Size",
    fileType: "File Type",
    timestamp: "Timestamp",
    uploadedBy: "Uploaded By",
    searchEvidence: "Search Evidence",
    sealCase: "Seal Case",
    assignEvidence: "Assign Evidence",
    noTampering: "Evidence Verified — No Tampering Detected",
    tamperAlert: "Tamper Detected — Hash Mismatch",
    heroSubtitle:
      "Securing digital evidence with cryptographic integrity for law enforcement, forensic teams, and judicial authorities.",
    getStarted: "Get Started",
    learnMore: "Learn More",
    secureStorage: "Tamper-Proof Storage",
    hashIntegrity: "SHA-256 Integrity",
    roleAccess: "Role-Based Access",
    chainCustody: "Chain of Custody",
    realTimeVerify: "Real-Time Verification",
    multiAgency: "Multi-Agency Support",
    evidenceSecured: "Evidence Secured",
    casesSolved: "Cases Solved",
    agencies: "Agencies",
    uptime: "Uptime",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send Message",
    department: "Department",
    badgeNumber: "Badge Number",
    role: "Role",
    displayName: "Display Name",
    password: "Password",
    allCases: "All Cases",
    openCases: "Open Cases",
    totalEvidence: "Total Evidence",
    recentActivity: "Recent Activity",
    users: "Users",
    cases: "Cases",
    evidence: "Evidence",
    logs: "Logs",
    officers: "Officers",
    investigators: "Investigators",
    admins: "Admins",
    howItWorks: "How It Works",
    step1: "Upload Evidence",
    step1Desc: "Securely upload digital files with metadata and case details.",
    step2: "Hash & Record",
    step2Desc:
      "SHA-256 hash is computed and immutably stored on the blockchain.",
    step3: "Verify Integrity",
    step3Desc: "Compare hashes anytime to detect tampering or corruption.",
    // About page
    aboutTagline: "About System",
    aboutHeroTitle: "Protecting",
    aboutHeroTitleHighlight: "Digital Truth",
    aboutHeroDesc:
      "DEPS is a next-generation forensic evidence management platform built on cryptographic principles and decentralized infrastructure. Our mission: ensure every piece of digital evidence remains authentic, verifiable, and legally admissible.",
    ourMission: "Our",
    ourMissionHighlight: "Mission",
    missionDesc1:
      "In an era where digital evidence is central to justice, tampering and manipulation pose existential threats to legal proceedings. DEPS was created to solve this problem definitively.",
    missionDesc2:
      "By combining SHA-256 cryptographic hashing with blockchain immutability, we create a system where evidence integrity can be mathematically proven — not just claimed.",
    systemStats: "SYSTEM STATISTICS",
    statEvidenceRecords: "Total Evidence Records",
    statHashVerifications: "Hash Verifications Performed",
    statTamperAttempts: "Tamper Attempts Detected",
    statActiveAgencies: "Active Agencies",
    statSystemUptime: "System Uptime",
    techStack: "Technology",
    techStackHighlight: "Stack",
    whoUses: "Who Uses",
    techIcpTitle: "ICP Blockchain",
    techIcpDesc:
      "Evidence metadata and hashes stored permanently on the Internet Computer Protocol — a decentralized, tamper-proof blockchain platform.",
    techShaTitle: "SHA-256 Cryptographic Hashing",
    techShaDesc:
      "Industry-standard one-way hash function generates a unique 256-bit fingerprint for every file. Any byte-level change produces a completely different hash.",
    techRbacTitle: "Role-Based Access Control",
    techRbacDesc:
      "Three-tier permission system (Admin, Investigator, Officer) ensures that only authorized personnel can upload, view, or manage evidence.",
    techStorageTitle: "Decentralized Storage",
    techStorageDesc:
      "Files are stored in a distributed manner using ExternalBlob references — no single point of failure or censorship.",
    useLawTitle: "Law Enforcement",
    useLawDesc:
      "Police agencies can upload crime scene digital evidence with automatic chain-of-custody logging, ensuring admissibility in court.",
    useForensicsTitle: "Cyber Forensics",
    useForensicsDesc:
      "Forensic analysts can preserve disk images, memory dumps, and network captures with cryptographic integrity guarantees.",
    useJudiciaryTitle: "Judiciary",
    useJudiciaryDesc:
      "Courts can independently verify evidence integrity before proceedings using the public verification module.",
    // Scam types
    scamType: "Scam Type",
    selectScamType: "Select Scam Type",
    phishing: "Phishing Attack",
    financialFraud: "Financial Fraud",
    identityTheft: "Identity Theft",
    shoppingScam: "Online Shopping Scam",
    investmentScam: "Investment Scam",
    jobFraud: "Job Fraud",
    lotteryScam: "Lottery / Prize Scam",
    romanceScam: "Romance Scam",
    cyberBullying: "Cyber Bullying",
    ransomware: "Ransomware / Malware",
  },
  hi: {
    appName: "डिजिटल साक्ष्य संरक्षण प्रणाली",
    appShort: "DEPS",
    home: "होम",
    about: "सिस्टम के बारे में",
    upload: "साक्ष्य अपलोड",
    verify: "साक्ष्य सत्यापित करें",
    dashboard: "केस डैशबोर्ड",
    admin: "एडमिन पैनल",
    contact: "संपर्क",
    login: "लॉगिन",
    logout: "लॉगआउट",
    signup: "साइन अप",
    uploadEvidence: "साक्ष्य अपलोड करें",
    verifyEvidence: "साक्ष्य सत्यापित करें",
    evidenceId: "साक्ष्य आईडी",
    sha256Hash: "SHA-256 हैश",
    tamperDetected: "छेड़छाड़ पाई गई",
    evidenceVerified: "साक्ष्य सत्यापित",
    uploadFile: "फ़ाइल अपलोड करें",
    createCase: "केस बनाएं",
    activityLog: "गतिविधि लॉग",
    caseId: "केस आईडी",
    status: "स्थिति",
    description: "विवरण",
    fileName: "फ़ाइल नाम",
    fileSize: "फ़ाइल आकार",
    fileType: "फ़ाइल प्रकार",
    timestamp: "समय चिह्न",
    uploadedBy: "द्वारा अपलोड",
    searchEvidence: "साक्ष्य खोजें",
    sealCase: "केस सील करें",
    assignEvidence: "साक्ष्य असाइन करें",
    noTampering: "साक्ष्य सत्यापित — कोई छेड़छाड़ नहीं",
    tamperAlert: "छेड़छाड़ पाई गई — हैश मेल नहीं खाता",
    heroSubtitle:
      "कानून प्रवर्तन, फोरेंसिक टीमों और न्यायिक अधिकारियों के लिए क्रिप्टोग्राफिक अखंडता के साथ डिजिटल साक्ष्य सुरक्षित करना।",
    getStarted: "शुरू करें",
    learnMore: "अधिक जानें",
    secureStorage: "छेड़छाड़-रोधी भंडारण",
    hashIntegrity: "SHA-256 अखंडता",
    roleAccess: "भूमिका-आधारित पहुँच",
    chainCustody: "हिरासत की श्रृंखला",
    realTimeVerify: "वास्तविक-समय सत्यापन",
    multiAgency: "बहु-एजेंसी समर्थन",
    evidenceSecured: "सुरक्षित साक्ष्य",
    casesSolved: "हल किए गए मामले",
    agencies: "एजेंसियाँ",
    uptime: "अपटाइम",
    name: "नाम",
    email: "ईमेल",
    message: "संदेश",
    send: "संदेश भेजें",
    department: "विभाग",
    badgeNumber: "बैज नंबर",
    role: "भूमिका",
    displayName: "प्रदर्शन नाम",
    password: "पासवर्ड",
    allCases: "सभी मामले",
    openCases: "खुले मामले",
    totalEvidence: "कुल साक्ष्य",
    recentActivity: "हालिया गतिविधि",
    users: "उपयोगकर्ता",
    cases: "मामले",
    evidence: "साक्ष्य",
    logs: "लॉग",
    officers: "अधिकारी",
    investigators: "जाँचकर्ता",
    admins: "व्यवस्थापक",
    howItWorks: "यह कैसे काम करता है",
    step1: "साक्ष्य अपलोड करें",
    step1Desc: "मेटाडेटा और केस विवरण के साथ डिजिटल फ़ाइलें सुरक्षित रूप से अपलोड करें।",
    step2: "हैश और रिकॉर्ड",
    step2Desc:
      "SHA-256 हैश की गणना की जाती है और ब्लॉकचेन पर अपरिवर्तनीय रूप से संग्रहीत किया जाता है।",
    step3: "अखंडता सत्यापित करें",
    step3Desc: "छेड़छाड़ या भ्रष्टाचार का पता लगाने के लिए कभी भी हैश की तुलना करें।",
    // About page
    aboutTagline: "सिस्टम के बारे में",
    aboutHeroTitle: "डिजिटल सच्चाई की",
    aboutHeroTitleHighlight: "सुरक्षा",
    aboutHeroDesc:
      "DEPS एक अगली पीढ़ी का फोरेंसिक साक्ष्य प्रबंधन प्लेटफ़ॉर्म है जो क्रिप्टोग्राफिक सिद्धांतों और विकेंद्रीकृत बुनियादी ढांचे पर बनाया गया है। हमारा मिशन: यह सुनिश्चित करना कि डिजिटल साक्ष्य का हर टुकड़ा प्रामाणिक, सत्यापन योग्य और कानूनी रूप से स्वीकार्य रहे।",
    ourMission: "हमारा",
    ourMissionHighlight: "मिशन",
    missionDesc1:
      "ऐसे युग में जहाँ डिजिटल साक्ष्य न्याय के लिए केंद्रीय है, छेड़छाड़ और हेरफेर कानूनी कार्यवाही के लिए गंभीर खतरे पैदा करते हैं। DEPS इस समस्या को निश्चित रूप से हल करने के लिए बनाया गया था।",
    missionDesc2:
      "SHA-256 क्रिप्टोग्राफिक हैशिंग को ब्लॉकचेन अपरिवर्तनीयता के साथ मिलाकर, हम एक ऐसी प्रणाली बनाते हैं जहाँ साक्ष्य की अखंडता को गणितीय रूप से सिद्ध किया जा सकता है — केवल दावा नहीं।",
    systemStats: "सिस्टम आँकड़े",
    statEvidenceRecords: "कुल साक्ष्य रिकॉर्ड",
    statHashVerifications: "किए गए हैश सत्यापन",
    statTamperAttempts: "पाई गई छेड़छाड़ की कोशिशें",
    statActiveAgencies: "सक्रिय एजेंसियाँ",
    statSystemUptime: "सिस्टम अपटाइम",
    techStack: "तकनीकी",
    techStackHighlight: "स्टैक",
    whoUses: "कौन उपयोग करता है",
    techIcpTitle: "ICP ब्लॉकचेन",
    techIcpDesc:
      "साक्ष्य मेटाडेटा और हैश इंटरनेट कंप्यूटर प्रोटोकॉल पर स्थायी रूप से संग्रहीत — एक विकेंद्रीकृत, छेड़छाड़-रोधी ब्लॉकचेन प्लेटफ़ॉर्म।",
    techShaTitle: "SHA-256 क्रिप्टोग्राफिक हैशिंग",
    techShaDesc:
      "उद्योग-मानक एकतरफा हैश फ़ंक्शन प्रत्येक फ़ाइल के लिए एक अद्वितीय 256-बिट फिंगरप्रिंट उत्पन्न करता है। किसी भी बाइट-स्तरीय परिवर्तन से पूरी तरह अलग हैश बनता है।",
    techRbacTitle: "भूमिका-आधारित पहुँच नियंत्रण",
    techRbacDesc:
      "तीन-स्तरीय अनुमति प्रणाली (एडमिन, जाँचकर्ता, अधिकारी) यह सुनिश्चित करती है कि केवल अधिकृत कर्मी ही साक्ष्य अपलोड, देख या प्रबंधित कर सकते हैं।",
    techStorageTitle: "विकेंद्रीकृत भंडारण",
    techStorageDesc:
      "फ़ाइलें ExternalBlob संदर्भों का उपयोग करके वितरित तरीके से संग्रहीत की जाती हैं — विफलता या सेंसरशिप का कोई एकल बिंदु नहीं।",
    useLawTitle: "कानून प्रवर्तन",
    useLawDesc:
      "पुलिस एजेंसियाँ स्वचालित हिरासत-की-श्रृंखला लॉगिंग के साथ अपराध स्थल के डिजिटल साक्ष्य अपलोड कर सकती हैं, जिससे अदालत में स्वीकार्यता सुनिश्चित होती है।",
    useForensicsTitle: "साइबर फोरेंसिक्स",
    useForensicsDesc:
      "फोरेंसिक विश्लेषक क्रिप्टोग्राफिक अखंडता गारंटी के साथ डिस्क इमेज, मेमोरी डंप और नेटवर्क कैप्चर सुरक्षित कर सकते हैं।",
    useJudiciaryTitle: "न्यायपालिका",
    useJudiciaryDesc:
      "अदालतें सार्वजनिक सत्यापन मॉड्यूल का उपयोग करके कार्यवाही से पहले स्वतंत्र रूप से साक्ष्य की अखंडता सत्यापित कर सकती हैं।",
    // Scam types
    scamType: "स्कैम प्रकार",
    selectScamType: "स्कैम प्रकार चुनें",
    phishing: "फिशिंग अटैक",
    financialFraud: "वित्तीय धोखाधड़ी",
    identityTheft: "पहचान चोरी",
    shoppingScam: "ऑनलाइन शॉपिंग स्कैम",
    investmentScam: "निवेश धोखाधड़ी",
    jobFraud: "नौकरी धोखाधड़ी",
    lotteryScam: "लॉटरी/इनाम स्कैम",
    romanceScam: "रोमांस स्कैम",
    cyberBullying: "साइबर बुलिंग",
    ransomware: "रैनसमवेयर/मैलवेयर",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = (key: TranslationKey): string => translations[lang][key] as string;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
