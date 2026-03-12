import Time "mo:core/Time";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Storage "blob-storage/Storage";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";

actor {
  type EvidenceId = Nat;
  type CaseId = Nat;

  var nextEvidenceId = 1;
  var nextCaseId = 1;

  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type EvidenceStatus = {
    #active;
    #archived;
  };

  public type CaseStatus = {
    #open;
    #closed;
  };

  public type UserRole = {
    #admin;
    #investigator;
    #officer;
  };

  public type EvidenceRecord = {
    evidenceId : EvidenceId;
    fileName : Text;
    fileType : Text;
    fileSize : Nat;
    sha256Hash : Text;
    timestamp : Time.Time;
    uploadedBy : Principal;
    caseId : ?CaseId;
    status : EvidenceStatus;
    description : Text;
    fileReference : Storage.ExternalBlob;
  };

  public type CaseRecord = {
    caseId : CaseId;
    title : Text;
    description : Text;
    createdBy : Principal;
    assignedOfficer : ?Principal;
    createdAt : Time.Time;
    status : CaseStatus;
    evidenceIds : [EvidenceId];
  };

  public type ActivityLog = {
    logId : Nat;
    actorName : Text; // Not reserved keyword anymore.
    action : Text;
    evidenceId : ?EvidenceId;
    caseId : ?CaseId;
    timestamp : Time.Time;
  };

  public type UserProfile = {
    userId : Principal;
    displayName : Text;
    role : UserRole;
    department : Text;
    badgeNumber : Text;
  };

  module EvidenceRecord {
    public func compare(a : EvidenceRecord, b : EvidenceRecord) : Order.Order {
      Nat.compare(a.evidenceId, b.evidenceId);
    };
  };

  module CaseRecord {
    public func compare(a : CaseRecord, b : CaseRecord) : Order.Order {
      Nat.compare(a.caseId, b.caseId);
    };
  };

  type InternalState = {
    var evidence : Map.Map<EvidenceId, EvidenceRecord>;
    var cases : Map.Map<CaseId, CaseRecord>;
  };

  let state : InternalState = {
    var evidence = Map.empty<EvidenceId, EvidenceRecord>();
    var cases = Map.empty<CaseId, CaseRecord>();
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // UserProfile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };

    // Users can view their own profile, admins can view any profile
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };

    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };

    // Ensure the profile userId matches the caller
    if (profile.userId != caller) {
      Runtime.trap("Unauthorized: Cannot save profile for another user");
    };

    userProfiles.add(caller, profile);
  };

  // Helper function to check if user has access to a case
  func hasAccessToCase(caller : Principal, caseRecord : CaseRecord) : Bool {
    // Admins can access all cases
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return true;
    };

    // Case creator can access
    if (caseRecord.createdBy == caller) {
      return true;
    };

    // Assigned officer can access
    switch (caseRecord.assignedOfficer) {
      case (?officer) {
        if (officer == caller) {
          return true;
        };
      };
      case (null) {};
    };

    false;
  };

  // Helper function to check if user has access to evidence
  func hasAccessToEvidence(caller : Principal, evidence : EvidenceRecord) : Bool {
    // Admins can access all evidence
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return true;
    };

    // Evidence uploader can access
    if (evidence.uploadedBy == caller) {
      return true;
    };

    // If evidence is assigned to a case, check case access
    switch (evidence.caseId) {
      case (?caseId) {
        switch (state.cases.get(caseId)) {
          case (?caseRecord) {
            return hasAccessToCase(caller, caseRecord);
          };
          case (null) {};
        };
      };
      case (null) {};
    };

    false;
  };

  public shared ({ caller }) func uploadEvidence(fileName : Text, fileType : Text, fileSize : Nat, sha256Hash : Text, description : Text, fileReference : Storage.ExternalBlob) : async EvidenceId {
    // Only authenticated users can upload evidence
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can upload evidence");
    };

    let evidenceId = nextEvidenceId;
    nextEvidenceId += 1;

    let record : EvidenceRecord = {
      evidenceId;
      fileName;
      fileType;
      fileSize;
      sha256Hash;
      timestamp = Time.now();
      uploadedBy = caller;
      caseId = null;
      status = #active;
      description;
      fileReference;
    };

    state.evidence.add(evidenceId, record);
    evidenceId;
  };

  public shared ({ caller }) func createCase(title : Text, description : Text, assignedOfficer : ?Principal) : async CaseId {
    // Only authenticated users can create cases
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create cases");
    };

    let caseId = nextCaseId;
    nextCaseId += 1;

    let record : CaseRecord = {
      caseId;
      title;
      description;
      createdBy = caller;
      assignedOfficer;
      createdAt = Time.now();
      status = #open;
      evidenceIds = [];
    };

    state.cases.add(caseId, record);
    caseId;
  };

  public shared ({ caller }) func assignEvidenceToCase(evidenceId : EvidenceId, caseId : CaseId) : async () {
    // Only authenticated users can assign evidence
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can assign evidence");
    };

    let evidence = state.evidence.get(evidenceId);
    let caseRecord = state.cases.get(caseId);

    switch (evidence, caseRecord) {
      case (?evidence, ?caseRecord) {
        // Check if user has access to both evidence and case
        if (not hasAccessToEvidence(caller, evidence)) {
          Runtime.trap("Unauthorized: No access to this evidence");
        };

        if (not hasAccessToCase(caller, caseRecord)) {
          Runtime.trap("Unauthorized: No access to this case");
        };

        let updatedEvidence = {
          evidence with
          caseId = ?caseId;
        };

        let updatedCase = {
          caseRecord with
          evidenceIds = caseRecord.evidenceIds.concat([evidenceId]);
        };

        state.evidence.add(evidenceId, updatedEvidence);
        state.cases.add(caseId, updatedCase);
      };
      case (null, _) { Runtime.trap("Evidence not found") };
      case (_, null) { Runtime.trap("Case not found") };
    };
  };

  public query ({ caller }) func getEvidence(evidenceId : EvidenceId) : async EvidenceRecord {
    // Only authenticated users can view evidence
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view evidence");
    };

    switch (state.evidence.get(evidenceId)) {
      case (?evidence) {
        // Check if user has access to this evidence
        if (not hasAccessToEvidence(caller, evidence)) {
          Runtime.trap("Unauthorized: No access to this evidence");
        };
        evidence;
      };
      case (null) { Runtime.trap("Evidence not found") };
    };
  };

  public query ({ caller }) func getCase(caseId : CaseId) : async CaseRecord {
    // Only authenticated users can view cases
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view cases");
    };

    switch (state.cases.get(caseId)) {
      case (?caseRecord) {
        // Check if user has access to this case
        if (not hasAccessToCase(caller, caseRecord)) {
          Runtime.trap("Unauthorized: No access to this case");
        };
        caseRecord;
      };
      case (null) { Runtime.trap("Case not found") };
    };
  };

  public query ({ caller }) func getEvidenceByCase(caseId : CaseId) : async [EvidenceRecord] {
    // Only authenticated users can query evidence
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can query evidence");
    };

    // Check if user has access to the case
    switch (state.cases.get(caseId)) {
      case (?caseRecord) {
        if (not hasAccessToCase(caller, caseRecord)) {
          Runtime.trap("Unauthorized: No access to this case");
        };
      };
      case (null) { Runtime.trap("Case not found") };
    };

    state.evidence.values().toArray().filter<EvidenceRecord>(
      func(e) {
        switch (e.caseId) {
          case (?id) { id == caseId };
          case (null) { false };
        };
      }
    ).sort();
  };

  public query ({ caller }) func getEvidenceByUploader(uploader : Principal) : async [EvidenceRecord] {
    // Only authenticated users can query evidence
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can query evidence");
    };

    // Users can only view their own uploaded evidence unless they're admin
    if (caller != uploader and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own uploaded evidence");
    };

    state.evidence.values().toArray().filter<EvidenceRecord>(
      func(e) { e.uploadedBy == uploader }
    ).sort();
  };

  public query ({ caller }) func getCasesByOfficer(officer : Principal) : async [CaseRecord] {
    // Only authenticated users can query cases
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can query cases");
    };

    // Users can only view their own assigned cases unless they're admin
    if (caller != officer and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own assigned cases");
    };

    state.cases.values().toArray().filter<CaseRecord>(
      func(c) {
        switch (c.assignedOfficer) {
          case (?o) { o == officer };
          case (null) { false };
        };
      }
    ).sort();
  };

  public query ({ caller }) func searchEvidence(searchTerm : Text) : async [EvidenceRecord] {
    // Only authenticated users can search evidence
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can search evidence");
    };

    // Filter results based on access rights
    state.evidence.values().toArray().filter<EvidenceRecord>(
      func(e) {
        let matchesSearch = e.fileName.contains(#text searchTerm) or e.description.contains(#text searchTerm);
        matchesSearch and hasAccessToEvidence(caller, e);
      }
    ).sort();
  };

  public shared ({ caller }) func sealCase(caseId : CaseId) : async () {
    // Only authenticated users can seal cases
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can seal cases");
    };

    switch (state.cases.get(caseId)) {
      case (?caseRecord) {
        // Check if user has access to this case
        if (not hasAccessToCase(caller, caseRecord)) {
          Runtime.trap("Unauthorized: No access to this case");
        };

        let updatedCase = {
          caseRecord with
          status = #closed;
        };
        state.cases.add(caseId, updatedCase);
      };
      case (null) { Runtime.trap("Case not found") };
    };
  };

  // Additional helper function to get all cases (admin only)
  public query ({ caller }) func getAllCases() : async [CaseRecord] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all cases");
    };
    state.cases.values().toArray().sort();
  };

  // Additional helper function to get all evidence (admin only)
  public query ({ caller }) func getAllEvidence() : async [EvidenceRecord] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all evidence");
    };
    state.evidence.values().toArray().sort();
  };

  // Get cases accessible to the caller
  public query ({ caller }) func getMyCases() : async [CaseRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view cases");
    };

    state.cases.values().toArray().filter<CaseRecord>(
      func(c) { hasAccessToCase(caller, c) }
    ).sort();
  };

  // Get evidence accessible to the caller
  public query ({ caller }) func getMyEvidence() : async [EvidenceRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view evidence");
    };

    state.evidence.values().toArray().filter<EvidenceRecord>(
      func(e) { hasAccessToEvidence(caller, e) }
    ).sort();
  };
};
