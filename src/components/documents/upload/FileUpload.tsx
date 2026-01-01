import React, { useCallback, useState } from 'react';
import { Upload, File, X, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { UploadedFile } from '../../../types/document';

interface FileUploadProps {
    files: UploadedFile[];
    onChange: (files: UploadedFile[]) => void;
    maxFiles?: number;
    maxSizeMB?: number;
    acceptedTypes?: string[];
    disabled?: boolean;
    error?: string;
}

const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
const ALLOWED_EXTENSIONS = ['PDF', 'DOCX', 'JPG', 'PNG'];

export function FileUpload({
    files,
    onChange,
    maxFiles = 5,
    maxSizeMB = 10,
    acceptedTypes = ALLOWED_TYPES,
    disabled = false,
    error,
}: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const validateFile = useCallback((file: File): string | null => {
        if (!acceptedTypes.includes(file.type)) {
            return `Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`;
        }
        if (file.size > maxSizeMB * 1024 * 1024) {
            return `File too large. Maximum size: ${maxSizeMB}MB`;
        }
        return null;
    }, [acceptedTypes, maxSizeMB]);

    const handleFiles = useCallback((newFiles: FileList | null) => {
        if (!newFiles || disabled) return;

        setUploadError(null);
        const fileArray = Array.from(newFiles);

        if (files.length + fileArray.length > maxFiles) {
            setUploadError(`Maximum ${maxFiles} files allowed`);
            return;
        }

        const validFiles: UploadedFile[] = [];
        for (const file of fileArray) {
            const error = validateFile(file);
            if (error) {
                setUploadError(error);
                return;
            }
            validFiles.push({
                id: crypto.randomUUID(),
                name: file.name,
                size: file.size,
                type: file.type,
                uploadedAt: new Date(),
            });
        }

        onChange([...files, ...validFiles]);
    }, [files, onChange, maxFiles, disabled, validateFile]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    }, [handleFiles]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
    }, [disabled]);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const removeFile = useCallback((id: string) => {
        onChange(files.filter(f => f.id !== id));
    }, [files, onChange]);

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const displayError = error || uploadError;

    return (
        <div className="space-y-3">
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={cn(
                    'relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ease-in-out',
                    isDragging && !disabled && 'border-brand-primary bg-brand-primary/5 scale-[1.01]',
                    !isDragging && !disabled && 'border-neutral-border-strong hover:border-brand-primary/50',
                    disabled && 'opacity-50 cursor-not-allowed bg-neutral-subtle',
                    displayError && 'border-status-error bg-status-error/5'
                )}
            >
                <input
                    type="file"
                    multiple
                    accept={acceptedTypes.join(',')}
                    onChange={(e) => handleFiles(e.target.files)}
                    disabled={disabled}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />

                <div className="flex flex-col items-center gap-3">
                    <div className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
                        isDragging ? 'bg-brand-primary/10 text-brand-primary' : 'bg-neutral-subtle text-text-muted',
                        displayError && 'bg-status-error/10 text-status-error'
                    )}>
                        <Upload className="h-6 w-6" />
                    </div>

                    <div>
                        <p className="text-body-small font-semibold text-text-high mb-1">
                            {isDragging ? 'Drop files here' : 'Drag & drop files here'}
                        </p>
                        <p className="text-body-small text-text-muted">
                            or <span className="text-brand-primary font-medium hover:underline cursor-pointer">browse</span> to upload
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-caption text-text-muted pt-2">
                        <span>{ALLOWED_EXTENSIONS.join(', ')}</span>
                        <span>•</span>
                        <span>Max {maxSizeMB}MB</span>
                        <span>•</span>
                        <span>Up to {maxFiles} files</span>
                    </div>
                </div>
            </div>

            {displayError && (
                <div className="flex items-center gap-2 text-status-error text-sm">
                    <AlertCircle size={14} />
                    {displayError}
                </div>
            )}

            {files.length > 0 && (
                <div className="space-y-2">
                    <p className="text-caption-caps text-text-muted">
                        Uploaded Files ({files.length}/{maxFiles})
                    </p>
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="flex items-center gap-3 p-3 bg-neutral-subtle/50 rounded-md border border-neutral-border hover:border-brand-primary/30 transition-all group"
                        >
                            <div className="w-10 h-10 rounded-md bg-brand-primary/5 flex items-center justify-center flex-shrink-0 border border-brand-primary/10">
                                <File className="h-5 w-5 text-brand-primary" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-body-small font-medium text-text-high truncate">{file.name}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-caption text-text-muted">{formatFileSize(file.size)}</span>
                                    <span className="text-text-low">•</span>
                                    <span className="text-caption text-status-success flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" />
                                        Ready
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => removeFile(file.id)}
                                disabled={disabled}
                                className="p-1.5 rounded-md hover:bg-status-error/10 text-text-muted hover:text-status-error transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
                                aria-label={`Remove ${file.name}`}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
