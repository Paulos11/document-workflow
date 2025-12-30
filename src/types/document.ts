export type DocumentCategory = 'identification' | 'employment' | 'education' | 'supporting';

export type DocumentType =
    | 'passport' | 'drivers_license' | 'national_id' | 'residence_permit'
    | 'contract' | 'amendment' | 'nda' | 'work_permit'
    | 'diploma' | 'degree' | 'certificate' | 'training_record'
    | 'utility_bill' | 'bank_statement' | 'reference_letter' | 'other';

export interface UploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
    uploadedAt: Date;
}

export interface DocumentMetadata {
    title: string;
    description?: string;
    documentNumber?: string;
    expirationDate?: Date;
    issuingAuthority?: string;
    contractStartDate?: Date;
    contractEndDate?: Date;
    institution?: string;
    dateObtained?: Date;
    issueDate?: Date;
}

export interface DocumentActivity {
    id: string;
    action: string;
    user: string;
    timestamp: Date;
    status: string;
    description?: string;
}

export interface Document {
    id: string;
    category: DocumentCategory;
    documentType: DocumentType;
    status: 'SUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED';
    files: UploadedFile[];
    metadata: DocumentMetadata;
    submittedBy: string;
    submittedAt: Date;
    comments: any[];
    timeline: DocumentActivity[];
}
