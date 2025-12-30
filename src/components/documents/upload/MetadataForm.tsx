import type { DocumentCategory, DocumentType, DocumentMetadata } from '../../../types/document';
import { getDocumentTypeConfig } from '../../../constants/documentCategories';
import Input from '../../ui/Input';
import { Label } from '../../ui/Label';
import { Textarea } from '../../ui/Textarea';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface MetadataFormProps {
    category: DocumentCategory;
    documentType: DocumentType;
    values: Partial<DocumentMetadata>;
    onChange: (values: Partial<DocumentMetadata>) => void;
    errors?: Partial<Record<keyof DocumentMetadata, string>>;
    disabled?: boolean;
}

interface FieldConfig {
    key: keyof DocumentMetadata;
    label: string;
    type: 'text' | 'date' | 'textarea';
    placeholder: string;
}

const FIELD_CONFIGS: Record<string, FieldConfig> = {
    title: {
        key: 'title',
        label: 'Document Title',
        type: 'text',
        placeholder: 'Enter document title',
    },
    description: {
        key: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Optional description',
    },
    documentNumber: {
        key: 'documentNumber',
        label: 'Document Number',
        type: 'text',
        placeholder: 'e.g., AB1234567',
    },
    expirationDate: {
        key: 'expirationDate',
        label: 'Expiration Date',
        type: 'date',
        placeholder: '',
    },
    issuingAuthority: {
        key: 'issuingAuthority',
        label: 'Issuing Authority',
        type: 'text',
        placeholder: 'e.g., Government of...',
    },
    contractStartDate: {
        key: 'contractStartDate',
        label: 'Start Date',
        type: 'date',
        placeholder: '',
    },
    contractEndDate: {
        key: 'contractEndDate',
        label: 'End Date',
        type: 'date',
        placeholder: '',
    },
    institution: {
        key: 'institution',
        label: 'Institution',
        type: 'text',
        placeholder: 'e.g., University of...',
    },
    dateObtained: {
        key: 'dateObtained',
        label: 'Date Obtained',
        type: 'date',
        placeholder: '',
    },
    issueDate: {
        key: 'issueDate',
        label: 'Issue Date',
        type: 'date',
        placeholder: '',
    },
};

export function MetadataForm({
    category,
    documentType,
    values,
    onChange,
    errors = {},
    disabled = false,
}: MetadataFormProps) {
    const docTypeConfig = getDocumentTypeConfig(category, documentType);
    const requiredFields = docTypeConfig?.requiredFields || ['title'];

    // Always show title and description, plus required fields for this doc type
    // Make sure description is always included if desired, usually it is separate.
    // The user logic was: fieldsToShow = ['title', 'description', ...requiredFields]
    const fieldsToShow = ['title', 'description', ...requiredFields.filter(f => f !== 'title')];
    const uniqueFields = [...new Set(fieldsToShow)];

    const handleChange = (key: keyof DocumentMetadata, value: string) => {
        onChange({
            ...values,
            [key]: key.includes('Date') ? (value ? new Date(value) : undefined) : value,
        });
    };

    const formatDateValue = (date: Date | undefined): string => {
        if (!date) return '';
        // Handle specific date object or string input if coming from partial state
        try {
            const d = new Date(date);
            return d.toISOString().split('T')[0];
        } catch (e) {
            return '';
        }
    };

    return (
        <div className="space-y-4">
            {uniqueFields.map((fieldKey) => {
                const config = FIELD_CONFIGS[fieldKey];
                if (!config) return null;

                const isRequired = requiredFields.includes(fieldKey);
                const error = errors[config.key];
                const value = config.type === 'date'
                    ? formatDateValue(values[config.key] as Date | undefined)
                    : (values[config.key] as string) || '';

                return (
                    <div key={fieldKey} className="space-y-1.5">
                        <Label
                            htmlFor={fieldKey}
                            className="text-sm font-medium"
                        >
                            {config.label}
                            {isRequired && <span className="text-status-error ml-1">*</span>}
                        </Label>

                        {config.type === 'textarea' ? (
                            <Textarea
                                id={fieldKey}
                                value={value}
                                onChange={(e) => handleChange(config.key, e.target.value)}
                                placeholder={config.placeholder}
                                disabled={disabled}
                                className={cn(
                                    'min-h-[80px] resize-none',
                                    error && 'border-status-error focus:ring-status-error'
                                )}
                                aria-invalid={!!error}
                                aria-describedby={error ? `${fieldKey}-error` : undefined}
                                error={!!error}
                            />
                        ) : (
                            <Input
                                label=""
                                type={config.type}
                                value={value}
                                onChange={(e) => handleChange(config.key, e.target.value)}
                                placeholder={config.placeholder}
                                disabled={disabled}
                                required={isRequired}
                                error={!!error}
                                className={cn(
                                    error && 'border-status-error focus:ring-status-error'
                                )}
                            />
                        )}

                        {error && (
                            <p
                                id={`${fieldKey}-error`}
                                role="alert"
                                className="flex items-center gap-1 text-xs text-status-error"
                            >
                                <AlertCircle size={12} />
                                {error}
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
