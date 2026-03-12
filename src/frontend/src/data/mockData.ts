import type { Principal } from "@icp-sdk/core/principal";
import type {
  CaseRecord,
  CaseStatus,
  EvidenceRecord,
  EvidenceStatus,
} from "../backend";

const fakePrincipal = (name: string) => name as unknown as Principal;
const fakeStatus = (s: string) => s as unknown as CaseStatus;
const fakeEvidenceStatus = (s: string) => s as unknown as EvidenceStatus;

const d = (dateStr: string) => BigInt(new Date(dateStr).getTime());

export const MOCK_CASES: CaseRecord[] = [
  {
    caseId: BigInt(1),
    title: "Operation CyberShield — Phishing Attack",
    description:
      "Coordinated phishing campaign targeting SBI and HDFC banking customers across 5 states. Victims received fake OTP requests via SMS and email.",
    status: fakeStatus("open"),
    createdAt: d("2024-01-15"),
    createdBy: fakePrincipal("Rajesh Kumar"),
    evidenceIds: [BigInt(1), BigInt(2), BigInt(3)],
  },
  {
    caseId: BigInt(2),
    title: "Financial Fraud — Fake Investment App",
    description:
      "Fraudulent mobile application mimicking a SEBI-registered broker, luring victims into depositing funds. Over ₹42 lakh collected from 87 victims.",
    status: fakeStatus("open"),
    createdAt: d("2024-02-03"),
    createdBy: fakePrincipal("Priya Sharma"),
    evidenceIds: [BigInt(4), BigInt(5)],
  },
  {
    caseId: BigInt(3),
    title: "Identity Theft — Aadhaar Misuse",
    description:
      "Stolen Aadhaar and PAN card data used to open 12 fraudulent bank accounts and apply for instant personal loans totalling ₹18.5 lakh.",
    status: fakeStatus("closed"),
    createdAt: d("2024-02-20"),
    createdBy: fakePrincipal("Amit Singh"),
    evidenceIds: [BigInt(6)],
  },
  {
    caseId: BigInt(4),
    title: "Online Shopping Scam — Fake E-commerce Site",
    description:
      "Cloned Flipkart-style storefront collecting payments for electronics that were never delivered. 214 complaints received from 9 districts.",
    status: fakeStatus("open"),
    createdAt: d("2024-03-08"),
    createdBy: fakePrincipal("Sunita Verma"),
    evidenceIds: [BigInt(7), BigInt(8), BigInt(9)],
  },
  {
    caseId: BigInt(5),
    title: "Job Fraud — Fake Placement Agency",
    description:
      "Fraudulent consultancy charging ₹8,000–₹25,000 per candidate for fake IT job placements in Bangalore and Hyderabad. 63 victims identified.",
    status: fakeStatus("closed"),
    createdAt: d("2024-03-22"),
    createdBy: fakePrincipal("Vikram Patel"),
    evidenceIds: [BigInt(10)],
  },
  {
    caseId: BigInt(6),
    title: "Ransomware Attack — Hospital Network",
    description:
      "LockBit 3.0 variant encrypted patient records at Shivaji Medical College. Attackers demanded $35,000 in Bitcoin. Decryption keys partially recovered.",
    status: fakeStatus("open"),
    createdAt: d("2024-04-10"),
    createdBy: fakePrincipal("Ananya Reddy"),
    evidenceIds: [BigInt(11), BigInt(12)],
  },
  {
    caseId: BigInt(7),
    title: "Romance Scam — International Network",
    description:
      "Multi-country romance fraud network posing as US Army officers. Victims manipulated into sending ₹3–15 lakh each. 9 victims in Maharashtra alone.",
    status: fakeStatus("closed"),
    createdAt: d("2024-05-01"),
    createdBy: fakePrincipal("Deepak Nair"),
    evidenceIds: [BigInt(13)],
  },
  {
    caseId: BigInt(8),
    title: "Investment Scam — Crypto Ponzi Scheme",
    description:
      "Unregistered crypto exchange promising 40% monthly returns. ₹2.3 crore collected from 182 investors before site went offline. Blockchain trace ongoing.",
    status: fakeStatus("open"),
    createdAt: d("2024-05-18"),
    createdBy: fakePrincipal("Meena Joshi"),
    evidenceIds: [BigInt(14), BigInt(15)],
  },
  {
    caseId: BigInt(9),
    title: "Cyber Bullying — Social Media Harassment",
    description:
      "Systematic harassment campaign across Instagram and WhatsApp targeting a minor. 47 fake accounts identified; defamatory deepfake images circulated.",
    status: fakeStatus("closed"),
    createdAt: d("2024-06-05"),
    createdBy: fakePrincipal("Ravi Yadav"),
    evidenceIds: [BigInt(16), BigInt(17)],
  },
  {
    caseId: BigInt(10),
    title: "Lottery Scam — KBC Fraud",
    description:
      "Fraudsters impersonating Kaun Banega Crorepati officials contacting victims by phone and WhatsApp, demanding ₹5,500–₹50,000 in processing fees.",
    status: fakeStatus("open"),
    createdAt: d("2024-06-20"),
    createdBy: fakePrincipal("Pooja Gupta"),
    evidenceIds: [BigInt(18)],
  },
  {
    caseId: BigInt(11),
    title: "Phishing — Tax Refund Scam",
    description:
      "Fake Income Tax Department portal harvesting PAN, Aadhaar, and net-banking credentials under guise of processing ₹12,000–₹85,000 refunds.",
    status: fakeStatus("closed"),
    createdAt: d("2024-07-04"),
    createdBy: fakePrincipal("Suresh Iyer"),
    evidenceIds: [BigInt(19), BigInt(20)],
  },
  {
    caseId: BigInt(12),
    title: "Financial Fraud — SIM Swap Attack",
    description:
      "Fraudulent SIM swap executed on 14 victims by bribing telecom employees. ₹68 lakh siphoned from linked bank accounts within hours of porting.",
    status: fakeStatus("open"),
    createdAt: d("2024-07-22"),
    createdBy: fakePrincipal("Kavitha Menon"),
    evidenceIds: [BigInt(21), BigInt(22), BigInt(23)],
  },
];

export const MOCK_EVIDENCE: EvidenceRecord[] = [
  {
    evidenceId: BigInt(1),
    fileName: "phishing_email_screenshot.png",
    fileType: "image/png",
    fileSize: BigInt(284671),
    sha256Hash:
      "a3f9d8e1b2c4f7a9d3e5b8c2f1a4d7e9b6c3f0a8d5e2b9c6f3a0d7e4b1c8f5a2",
    description:
      "Screenshot of phishing email impersonating SBI with fake login link.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-01-16"),
    caseId: BigInt(1),
    uploadedBy: fakePrincipal("Rajesh Kumar"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(2),
    fileName: "network_traffic_log.pcap",
    fileType: "application/octet-stream",
    fileSize: BigInt(1458290),
    sha256Hash:
      "b7e2a1c5f8d4b9e3a6c2f5d8b1e4a7c3f0b8d5e2c9f6a3d0e7b4c1f8a5d2e9b6",
    description:
      "Wireshark capture showing DNS spoofing and data exfiltration to C2 server.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-01-17"),
    caseId: BigInt(1),
    uploadedBy: fakePrincipal("Rajesh Kumar"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(3),
    fileName: "victim_statement_001.pdf",
    fileType: "application/pdf",
    fileSize: BigInt(193450),
    sha256Hash:
      "c1d4e7b9f2a5c8e1d4b7f3a6c9e2b5d8f1c4e7b0f3a6c9d2e5b8c1f4a7d0e3b6",
    description:
      "Signed affidavit from victim detailing financial loss and transaction history.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-01-18"),
    caseId: BigInt(1),
    uploadedBy: fakePrincipal("Priya Sharma"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(4),
    fileName: "fraud_app_apk_sample.apk",
    fileType: "application/vnd.android.package-archive",
    fileSize: BigInt(8745236),
    sha256Hash:
      "d5e8b2c6f9a3d7e1b5c9f2a6d0e4b8c3f7a1d5e9b3c7f1a5d9e2b6c0f4a8d2e6",
    description:
      "Malicious APK file of fake investment app extracted from victim device.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-02-04"),
    caseId: BigInt(2),
    uploadedBy: fakePrincipal("Amit Singh"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(5),
    fileName: "bank_transaction_record.xlsx",
    fileType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    fileSize: BigInt(67890),
    sha256Hash:
      "e9c3f7b1d5a8e2c6f0b4d8a2c6f0b4d8e2c6f0b4d8a2c6f0b4d8e2c6f0b4d8a2",
    description:
      "Bank statement showing 87 fraudulent transactions totalling ₹42.3 lakh.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-02-06"),
    caseId: BigInt(2),
    uploadedBy: fakePrincipal("Priya Sharma"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(6),
    fileName: "aadhaar_misuse_docs.pdf",
    fileType: "application/pdf",
    fileSize: BigInt(345120),
    sha256Hash:
      "f2a6d0e4b8c3f7a1d5e9b3c7f1a5d9e2b6c0f4a8d2e6b0c4f8a2d6e0b4c8f2a6",
    description:
      "Scanned copies of fraudulently opened bank account documents using stolen identity.",
    status: fakeEvidenceStatus("archived"),
    timestamp: d("2024-02-22"),
    caseId: BigInt(3),
    uploadedBy: fakePrincipal("Amit Singh"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(7),
    fileName: "fake_ecommerce_website_backup.zip",
    fileType: "application/zip",
    fileSize: BigInt(23456789),
    sha256Hash:
      "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
    description:
      "Full website backup of cloned Flipkart portal including payment gateway scripts.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-03-09"),
    caseId: BigInt(4),
    uploadedBy: fakePrincipal("Sunita Verma"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(8),
    fileName: "payment_gateway_logs.txt",
    fileType: "text/plain",
    fileSize: BigInt(89034),
    sha256Hash:
      "b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4",
    description:
      "Server access logs showing fraudulent transactions and attacker IP addresses.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-03-10"),
    caseId: BigInt(4),
    uploadedBy: fakePrincipal("Vikram Patel"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(9),
    fileName: "victim_chat_screenshots.mp4",
    fileType: "video/mp4",
    fileSize: BigInt(156700000),
    sha256Hash:
      "c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    description:
      "Screen recording of fraudulent purchase flow and fake order confirmation.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-03-11"),
    caseId: BigInt(4),
    uploadedBy: fakePrincipal("Sunita Verma"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(10),
    fileName: "placement_agency_contract.pdf",
    fileType: "application/pdf",
    fileSize: BigInt(178230),
    sha256Hash:
      "d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8",
    description:
      "Forged service agreement contract used to collect fees from job seekers.",
    status: fakeEvidenceStatus("archived"),
    timestamp: d("2024-03-24"),
    caseId: BigInt(5),
    uploadedBy: fakePrincipal("Vikram Patel"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(11),
    fileName: "ransomware_binary_sample.exe",
    fileType: "application/octet-stream",
    fileSize: BigInt(2345678),
    sha256Hash:
      "e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0",
    description:
      "Isolated ransomware binary for forensic analysis. LockBit 3.0 variant.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-04-11"),
    caseId: BigInt(6),
    uploadedBy: fakePrincipal("Ananya Reddy"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(12),
    fileName: "encrypted_hospital_records.db",
    fileType: "application/octet-stream",
    fileSize: BigInt(45678900),
    sha256Hash:
      "f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2",
    description:
      "Sample of encrypted patient database files for decryption analysis.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-04-12"),
    caseId: BigInt(6),
    uploadedBy: fakePrincipal("Deepak Nair"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(13),
    fileName: "romance_scam_chat_export.json",
    fileType: "application/json",
    fileSize: BigInt(456780),
    sha256Hash:
      "a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9",
    description:
      "WhatsApp and Telegram chat export showing manipulation tactics and money requests.",
    status: fakeEvidenceStatus("archived"),
    timestamp: d("2024-05-03"),
    caseId: BigInt(7),
    uploadedBy: fakePrincipal("Meena Joshi"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(14),
    fileName: "crypto_wallet_transactions.csv",
    fileType: "text/csv",
    fileSize: BigInt(123450),
    sha256Hash:
      "b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1",
    description:
      "On-chain transaction records tracing fraudulent crypto flows through 14 wallets.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-05-20"),
    caseId: BigInt(8),
    uploadedBy: fakePrincipal("Ravi Yadav"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(15),
    fileName: "ponzi_website_archive.html",
    fileType: "text/html",
    fileSize: BigInt(345670),
    sha256Hash:
      "c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3",
    description:
      "Archived HTML of fraudulent crypto exchange site before it went offline.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-05-22"),
    caseId: BigInt(8),
    uploadedBy: fakePrincipal("Pooja Gupta"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(16),
    fileName: "harassment_posts_archive.zip",
    fileType: "application/zip",
    fileSize: BigInt(5678900),
    sha256Hash:
      "d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5",
    description:
      "Archived screenshots of all 47 fake social media profiles and their posts.",
    status: fakeEvidenceStatus("archived"),
    timestamp: d("2024-06-07"),
    caseId: BigInt(9),
    uploadedBy: fakePrincipal("Suresh Iyer"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(17),
    fileName: "deepfake_image_samples.zip",
    fileType: "application/zip",
    fileSize: BigInt(12345670),
    sha256Hash:
      "e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7",
    description:
      "Deepfake images circulated on social media — hash-verified for chain of custody.",
    status: fakeEvidenceStatus("archived"),
    timestamp: d("2024-06-08"),
    caseId: BigInt(9),
    uploadedBy: fakePrincipal("Kavitha Menon"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(18),
    fileName: "lottery_fraud_call_recording.mp3",
    fileType: "audio/mpeg",
    fileSize: BigInt(8901230),
    sha256Hash:
      "f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9",
    description:
      "Audio recording of fraudster impersonating KBC team demanding processing fee.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-06-22"),
    caseId: BigInt(10),
    uploadedBy: fakePrincipal("Rajesh Kumar"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(19),
    fileName: "fake_incometax_portal.html",
    fileType: "text/html",
    fileSize: BigInt(234560),
    sha256Hash:
      "a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1",
    description:
      "Source code of fake Income Tax refund portal used to harvest credentials.",
    status: fakeEvidenceStatus("archived"),
    timestamp: d("2024-07-06"),
    caseId: BigInt(11),
    uploadedBy: fakePrincipal("Ananya Reddy"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(20),
    fileName: "phishing_sms_bulk_list.csv",
    fileType: "text/csv",
    fileSize: BigInt(56780),
    sha256Hash:
      "b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3",
    description:
      "CSV of 12,400 victim phone numbers used in bulk SMS phishing campaign.",
    status: fakeEvidenceStatus("archived"),
    timestamp: d("2024-07-07"),
    caseId: BigInt(11),
    uploadedBy: fakePrincipal("Deepak Nair"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(21),
    fileName: "sim_swap_telecom_records.pdf",
    fileType: "application/pdf",
    fileSize: BigInt(289450),
    sha256Hash:
      "c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5",
    description:
      "Official telecom operator records showing fraudulent SIM port requests.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-07-23"),
    caseId: BigInt(12),
    uploadedBy: fakePrincipal("Meena Joshi"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(22),
    fileName: "bank_account_drain_logs.xlsx",
    fileType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    fileSize: BigInt(134560),
    sha256Hash:
      "d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7",
    description:
      "Consolidated transaction log from 14 victim accounts showing rapid fund transfers.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-07-24"),
    caseId: BigInt(12),
    uploadedBy: fakePrincipal("Ravi Yadav"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
  {
    evidenceId: BigInt(23),
    fileName: "suspect_phone_forensics.tar",
    fileType: "application/x-tar",
    fileSize: BigInt(345678900),
    sha256Hash:
      "e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9",
    description:
      "Full forensic dump from suspect mobile device including deleted messages.",
    status: fakeEvidenceStatus("active"),
    timestamp: d("2024-07-25"),
    caseId: BigInt(12),
    uploadedBy: fakePrincipal("Kavitha Menon"),
    fileReference: null as unknown as EvidenceRecord["fileReference"],
  },
];
