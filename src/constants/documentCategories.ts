import type { DocumentCategory, DocumentType } from '../types/document';
import { IdCard, Briefcase, GraduationCap, Files } from 'lucide-react';

interface DocumentTypeConfig {
    value: DocumentType;
    label: string;
    requiredFields: string[];
}

interface CategoryConfig {
    value: DocumentCategory;
    label: string;
    description: string;
    icon: any;
    color: string;
    documentTypes: DocumentTypeConfig[];
}

export const DOCUMENT_CATEGORIES: CategoryConfig[] = [
    {
        value: 'identification',
        label: 'Identification Documents',
        description: 'National IDs, Passports, Residence Permits, Driver\'s Licenses',
        icon: IdCard,
        color: 'bg-blue-500',
        documentTypes: [
            { value: 'passport', label: 'Passport', requiredFields: ['title', 'expirationDate', 'documentNumber', 'issuingAuthority'] },
            { value: 'drivers_license', label: 'Driver\'s License', requiredFields: ['title', 'expirationDate', 'documentNumber'] },
            { value: 'national_id', label: 'National ID', requiredFields: ['title', 'documentNumber'] },
            { value: 'residence_permit', label: 'Residence Permit', requiredFields: ['title', 'expirationDate'] },
        ]
    },
    {
        value: 'employment',
        label: 'Employment Documents',
        description: 'Contracts, Amendments, NDAs, Work Permits',
        icon: Briefcase,
        color: 'bg-emerald-500',
        documentTypes: [
            { value: 'contract', label: 'Employment Contract', requiredFields: ['title', 'contractStartDate'] },
            { value: 'amendment', label: 'Contract Amendment', requiredFields: ['title'] },
            { value: 'nda', label: 'NDA', requiredFields: ['title'] },
            { value: 'work_permit', label: 'Work Permit', requiredFields: ['title', 'expirationDate'] },
        ]
    },
    {
        value: 'education',
        label: 'Educational & Certification Documents',
        description: 'Diplomas, Degrees, Professional Certifications, Training Certificates',
        icon: GraduationCap,
        color: 'bg-purple-500',
        documentTypes: [
            { value: 'degree', label: 'Degree', requiredFields: ['title', 'institution', 'dateObtained'] },
            { value: 'diploma', label: 'Diploma', requiredFields: ['title', 'institution'] },
            { value: 'certificate', label: 'Professional Certification', requiredFields: ['title', 'dateObtained'] },
            { value: 'training_record', label: 'Training Certificate', requiredFields: ['title', 'dateObtained'] },
        ]
    },
    {
        value: 'supporting',
        label: 'Supporting Documents',
        description: 'Utility Bills, Bank Statements, Reference Letters',
        icon: Files,
        color: 'bg-orange-500',
        documentTypes: [
            { value: 'utility_bill', label: 'Utility Bill', requiredFields: ['title', 'issueDate'] },
            { value: 'bank_statement', label: 'Bank Statement', requiredFields: ['title', 'issueDate'] },
            { value: 'reference_letter', label: 'Reference Letter', requiredFields: ['title'] },
        ]
    }
];

export const getCategoryConfig = (category: DocumentCategory) =>
    DOCUMENT_CATEGORIES.find(c => c.value === category);

export const getDocumentTypeConfig = (category: DocumentCategory, type: DocumentType) => {
    const catConfig = getCategoryConfig(category);
    return catConfig?.documentTypes.find(t => t.value === type);
};
