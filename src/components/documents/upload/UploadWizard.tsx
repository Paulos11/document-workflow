import { useState, useCallback } from 'react';
import type { DocumentCategory, DocumentType, DocumentMetadata, UploadedFile, Document } from '../../../types/document';
import { DOCUMENT_CATEGORIES, getCategoryConfig, getDocumentTypeConfig } from '../../../constants/documentCategories';
import { FileUpload } from './FileUpload';
import { MetadataForm } from './MetadataForm';
import Card from '../../ui/Card';
import { Label } from '../../ui/Label';
import { ArrowLeft, ArrowRight, Check, FileText, Save } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface UploadWizardProps {
    onSubmit: (document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>, status?: string) => void;
    onCancel: () => void;
    // currentUser is handled via context or prop, user passed it as prop.
    currentUser: { name: string; role: string };
}

type Step = 'category' | 'upload' | 'details' | 'review';

const STEPS: { key: Step; label: string; number: number }[] = [
    { key: 'category', label: 'Category', number: 1 },
    { key: 'upload', label: 'Upload', number: 2 },
    { key: 'details', label: 'Details', number: 3 },
    { key: 'review', label: 'Review', number: 4 },
];

export function UploadWizard({ onSubmit, onCancel, currentUser }: UploadWizardProps) {
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

        const document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'> = {
            category,
            documentType,
            status: isDraft ? 'DRAFT' : 'SUBMITTED',
            files,
            metadata: metadata as DocumentMetadata,
            submittedBy: currentUser.name,
            submittedAt: new Date(),
            comments: [],
            timeline: [
                {
                    id: crypto.randomUUID(),
                    action: isDraft ? 'Document saved as draft' : 'Document submitted',
                    user: currentUser.name,
                    timestamp: new Date(),
                    status: isDraft ? 'DRAFT' : 'SUBMITTED',
                },
            ],
        };

        onSubmit(document, isDraft ? 'Draft' : 'Submitted');
    };

    return (
        <div className="space-y-4">
            {/* Progress Steps - More Compact */}
            <div className="relative bg-white py-4 px-4 rounded-lg border border-neutral-border shadow-small">
                {/* Progress Line - Hidden on mobile, horizontal on desktop */}
                <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-neutral-border -z-10" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                    {STEPS.map((s, index) => {
                        const isCompleted = index < currentStepIndex;
                        const isCurrent = index === currentStepIndex;
                        const isPending = index > currentStepIndex;

                        return (
                            <div
                                key={s.key}
                                className="flex sm:flex-col items-center gap-3 sm:gap-0 bg-white sm:px-4 w-full sm:w-auto"
                            >
                                <div
                                    className={cn(
                                        'w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2',
                                        isCompleted && 'bg-brand-primary text-white border-brand-primary scale-100',
                                        isCurrent && 'bg-white text-brand-primary border-brand-primary ring-4 ring-brand-primary/10 animate-pulse-subtle',
                                        isPending && 'bg-white text-text-muted border-neutral-border-strong scale-95'
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check size={20} className="animate-scale-in" />
                                    ) : (
                                        <span>{s.number}</span>
                                    )}
                                </div>

                                <div className="flex-1 sm:flex-none sm:mt-2 sm:text-center">
                                    <span
                                        className={cn(
                                            'text-xs sm:text-body-small font-semibold transition-colors',
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

            {/* Step Content */}
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
                    {/* Step 1: Category Selection */}
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

                    {/* Step 2: File Upload */}
                    {step === 'upload' && (
                        <FileUpload
                            files={files}
                            onChange={setFiles}
                            maxFiles={5}
                            maxSizeMB={10}
                        />
                    )}

                    {/* Step 3: Metadata Form */}
                    {step === 'details' && category && documentType && (
                        <MetadataForm
                            category={category}
                            documentType={documentType}
                            values={metadata}
                            onChange={setMetadata}
                            errors={errors}
                        />
                    )}

                    {/* Step 4: Review */}
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
                                        const displayValue = value instanceof Date
                                            ? new Date(value).toLocaleDateString()
                                            : String(value);
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

            {/* Navigation Buttons */}
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
