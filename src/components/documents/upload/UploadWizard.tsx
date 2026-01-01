import { useState, useCallback } from 'react';
import type { DocumentCategory, DocumentType, UploadedFile } from '../../../types/document';
import type { DocumentFile, DocumentMetadata } from '../../../types/app';
import type { DocumentStatus } from '../../../constants/statuses';
import { DOCUMENT_CATEGORIES, getCategoryConfig, getDocumentTypeConfig } from '../../../constants/documentCategories';
import { FileUpload } from './FileUpload';
import { MetadataForm } from './MetadataForm';
import { Card } from '../../ui/Card';
import { Label } from '../../ui/Label';
import { ArrowLeft, ArrowRight, Check, FileText, Save } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface DocumentData {
    metadata: DocumentMetadata;
    category: string;
    documentType: string;
    files: DocumentFile[];
}

interface UploadWizardProps {
    onSubmit: (document: DocumentData, status?: DocumentStatus) => void;
    onCancel: () => void;
    currentUser?: { name: string; role: string };
}

type Step = 'category' | 'upload' | 'details' | 'review';

const STEPS: { key: Step; label: string; number: number }[] = [
    { key: 'category', label: 'Category', number: 1 },
    { key: 'upload', label: 'Upload', number: 2 },
    { key: 'details', label: 'Details', number: 3 },
    { key: 'review', label: 'Review', number: 4 },
];

export function UploadWizard({ onSubmit, onCancel }: UploadWizardProps) {
    const [step, setStep] = useState<Step>('category');
    const [category, setCategory] = useState<DocumentCategory | null>(null);
    const [documentType, setDocumentType] = useState<DocumentType | null>(null);
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [metadata, setMetadata] = useState<Partial<DocumentMetadata>>({});
    const [errors, setErrors] = useState<Partial<Record<keyof DocumentMetadata, string>>>({});

    const currentStepIndex = STEPS.findIndex(s => s.key === step);
    const categoryConfig = category ? getCategoryConfig(category) : null;
    const docTypeConfig = category && documentType ? getDocumentTypeConfig(category, documentType) : null;

    const validateMetadata = useCallback((): boolean => {
        if (!docTypeConfig) return false;

        const newErrors: Partial<Record<keyof DocumentMetadata, string>> = {};

        for (const field of docTypeConfig.requiredFields) {
            const value = metadata[field as keyof DocumentMetadata];
            if (!value || (typeof value === 'string' && !value.trim())) {
                newErrors[field as keyof DocumentMetadata] = 'This field is required';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [docTypeConfig, metadata]);

    const canProceed = useCallback((): boolean => {
        switch (step) {
            case 'category':
                return !!category && !!documentType;
            case 'upload':
                return files.length > 0;
            case 'details':
                return true;
            case 'review':
                return true;
            default:
                return false;
        }
    }, [step, category, documentType, files.length]);

    const handleNext = () => {
        if (step === 'details' && !validateMetadata()) {
            return;
        }

        const nextIndex = currentStepIndex + 1;
        if (nextIndex < STEPS.length) {
            setStep(STEPS[nextIndex].key);
        }
    };

    const handleBack = () => {
        const prevIndex = currentStepIndex - 1;
        if (prevIndex >= 0) {
            setStep(STEPS[prevIndex].key);
        } else {
            onCancel();
        }
    };

    const handleSubmit = (isDraft = false) => {
        if (!category || !documentType || files.length === 0) return;

        const documentData: DocumentData = {
            category,
            documentType,
            files,
            metadata: metadata as DocumentMetadata
        };

        onSubmit(documentData, isDraft ? 'Draft' : 'Submitted');
    };

    return (
        <div className="space-y-4">
            <div className="relative bg-white py-4 px-2 sm:px-4 rounded-lg border border-neutral-border shadow-small">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-neutral-border -z-10" />

                <div className="flex flex-row items-center justify-between gap-1 sm:gap-0">
                    {STEPS.map((s, index) => {
                        const isCompleted = index < currentStepIndex;
                        const isCurrent = index === currentStepIndex;
                        const isPending = index > currentStepIndex;

                        return (
                            <div
                                key={s.key}
                                className="flex flex-col items-center gap-1 sm:gap-0 bg-white px-1 sm:px-4"
                            >
                                <div
                                    className={cn(
                                        'w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 border-2',
                                        isCompleted && 'bg-brand-primary text-white border-brand-primary scale-100',
                                        isCurrent && 'bg-white text-brand-primary border-brand-primary ring-2 sm:ring-4 ring-brand-primary/10 animate-pulse-subtle',
                                        isPending && 'bg-white text-text-muted border-neutral-border-strong scale-95'
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check size={16} className="sm:w-5 sm:h-5 animate-scale-in" />
                                    ) : (
                                        <span>{s.number}</span>
                                    )}
                                </div>

                                <div className="mt-1 sm:mt-2 text-center">
                                    <span
                                        className={cn(
                                            'text-[10px] sm:text-body-small font-semibold transition-colors whitespace-nowrap',
                                            (isCurrent || isCompleted) ? 'text-text-high' : 'text-text-muted'
                                        )}
                                    >
                                        {s.label}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Card className="shadow-small border border-neutral-border">
                <div className="p-4 border-b border-neutral-border">
                    <h2 className="text-h2 text-text-high">
                        {step === 'category' && 'Select Document Category'}
                        {step === 'upload' && 'Upload Files'}
                        {step === 'details' && 'Enter Document Details'}
                        {step === 'review' && 'Review & Submit'}
                    </h2>
                    <p className="text-body-small text-text-muted mt-1">
                        {step === 'category' && 'Choose the type of document you want to submit'}
                        {step === 'upload' && 'Upload the required files for your document'}
                        {step === 'details' && 'Fill in the metadata for your document'}
                        {step === 'review' && 'Review your submission before sending'}
                    </p>
                </div>

                <div className="p-4 space-y-4 min-h-[400px]">
                    {step === 'category' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {DOCUMENT_CATEGORIES.map((cat) => {
                                    const Icon = cat.icon;
                                    return (
                                        <button
                                            key={cat.value}
                                            onClick={() => {
                                                setCategory(cat.value);
                                                setDocumentType(null);
                                            }}
                                            className={cn(
                                                'p-4 rounded-lg border text-left transition-all hover:shadow-sm flex flex-col h-full',
                                                category === cat.value
                                                    ? 'border-brand-primary bg-brand-primary/5'
                                                    : 'border-neutral-border hover:border-brand-primary/50'
                                            )}
                                        >
                                            <div className={cn('w-10 h-10 rounded-md flex items-center justify-center mb-2', cat.color)}>
                                                <Icon className="h-5 w-5 text-white" />
                                            </div>
                                            <h3 className="font-semibold text-body text-text-high">{cat.label}</h3>
                                            <p className="text-caption text-text-muted mt-1">{cat.description}</p>
                                        </button>
                                    );
                                })}
                            </div>

                            {category && categoryConfig && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <Label>Document Type</Label>
                                    <select
                                        value={documentType || ''}
                                        onChange={(e) => setDocumentType(e.target.value as DocumentType)}
                                        className="w-full px-3 py-2 border border-neutral-border rounded-md text-body-small focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                    >
                                        <option value="" disabled>Select document type</option>
                                        {categoryConfig.documentTypes.map((dt) => (
                                            <option key={dt.value} value={dt.value}>
                                                {dt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    )}

                    {step === 'upload' && (
                        <FileUpload
                            files={files}
                            onChange={setFiles}
                            maxFiles={5}
                            maxSizeMB={10}
                        />
                    )}

                    {step === 'details' && category && documentType && (
                        <MetadataForm
                            category={category}
                            documentType={documentType}
                            values={metadata}
                            onChange={setMetadata}
                            errors={errors}
                        />
                    )}

                    {step === 'review' && category && documentType && categoryConfig && docTypeConfig && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 bg-neutral-subtle/50 p-3 rounded-lg border border-neutral-border">
                                <div>
                                    <p className="text-caption text-text-muted mb-1">Category</p>
                                    <p className="font-medium text-body-small text-text-high">{categoryConfig.label}</p>
                                </div>
                                <div>
                                    <p className="text-caption text-text-muted mb-1">Document Type</p>
                                    <p className="font-medium text-body-small text-text-high">{docTypeConfig.label}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-caption-caps text-text-muted mb-2">Files ({files.length})</p>
                                <div className="space-y-2">
                                    {files.map((file) => (
                                        <div key={file.id} className="flex items-center gap-3 p-2.5 bg-neutral-subtle/50 rounded-md border border-neutral-border">
                                            <FileText size={16} className="text-text-muted flex-shrink-0" />
                                            <span className="text-body-small font-medium text-text-high truncate">{file.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-caption-caps text-text-muted mb-2">Document Details</p>
                                <div className="bg-neutral-subtle/50 rounded-lg p-3 space-y-2.5 border border-neutral-border">
                                    {Object.entries(metadata).map(([key, value]) => {
                                        if (!value) return null;
                                        const displayValue = String(value);
                                        return (
                                            <div key={key} className="flex justify-between text-body-small gap-4">
                                                <span className="text-text-muted capitalize">
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </span>
                                                <span className="font-medium text-text-high text-right">{displayValue}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            <div className="flex justify-between items-center pt-4">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-md border border-neutral-border hover:bg-neutral-subtle text-text-medium text-body-small font-medium transition-colors"
                >
                    <ArrowLeft size={16} />
                    {currentStepIndex === 0 ? 'Cancel' : 'Back'}
                </button>

                {step === 'review' ? (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleSubmit(true)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-md border border-neutral-border hover:bg-neutral-subtle text-text-medium text-body-small font-medium transition-colors"
                        >
                            <Save size={16} />
                            Save as Draft
                        </button>
                        <button
                            onClick={() => handleSubmit(false)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-brand-primary text-white hover:bg-brand-primary-hover shadow-small text-body-small font-medium transition-colors"
                        >
                            Submit Document
                            <Check size={16} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-body-small font-medium transition-colors ${!canProceed() ? 'opacity-50 cursor-not-allowed bg-neutral-border-strong text-text-low' : 'bg-brand-primary text-white hover:bg-brand-primary-hover shadow-small'}`}
                    >
                        Continue
                        <ArrowRight size={16} />
                    </button>
                )}
            </div>
        </div>
    );
}
