import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface CaseRecord {
    status: CaseStatus;
    title: string;
    createdAt: Time;
    createdBy: Principal;
    description: string;
    caseId: CaseId;
    assignedOfficer?: Principal;
    evidenceIds: Array<EvidenceId>;
}
export type Time = bigint;
export type EvidenceId = bigint;
export type CaseId = bigint;
export interface EvidenceRecord {
    status: EvidenceStatus;
    sha256Hash: string;
    description: string;
    fileName: string;
    fileSize: bigint;
    fileType: string;
    timestamp: Time;
    caseId?: CaseId;
    evidenceId: EvidenceId;
    uploadedBy: Principal;
    fileReference: ExternalBlob;
}
export interface UserProfile {
    displayName: string;
    userId: Principal;
    role: UserRole;
    department: string;
    badgeNumber: string;
}
export enum CaseStatus {
    closed = "closed",
    open = "open"
}
export enum EvidenceStatus {
    active = "active",
    archived = "archived"
}
export enum UserRole {
    admin = "admin",
    investigator = "investigator",
    officer = "officer"
}
export enum UserRole__1 {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole__1): Promise<void>;
    assignEvidenceToCase(evidenceId: EvidenceId, caseId: CaseId): Promise<void>;
    createCase(title: string, description: string, assignedOfficer: Principal | null): Promise<CaseId>;
    getAllCases(): Promise<Array<CaseRecord>>;
    getAllEvidence(): Promise<Array<EvidenceRecord>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole__1>;
    getCase(caseId: CaseId): Promise<CaseRecord>;
    getCasesByOfficer(officer: Principal): Promise<Array<CaseRecord>>;
    getEvidence(evidenceId: EvidenceId): Promise<EvidenceRecord>;
    getEvidenceByCase(caseId: CaseId): Promise<Array<EvidenceRecord>>;
    getEvidenceByUploader(uploader: Principal): Promise<Array<EvidenceRecord>>;
    getMyCases(): Promise<Array<CaseRecord>>;
    getMyEvidence(): Promise<Array<EvidenceRecord>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    sealCase(caseId: CaseId): Promise<void>;
    searchEvidence(searchTerm: string): Promise<Array<EvidenceRecord>>;
    uploadEvidence(fileName: string, fileType: string, fileSize: bigint, sha256Hash: string, description: string, fileReference: ExternalBlob): Promise<EvidenceId>;
}
