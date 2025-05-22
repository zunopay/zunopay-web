import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";
import { Info, Image, Store } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";

interface FileUploadProps {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  tooltip?: string;
  accept?: string;
  previewType?: "square" | "landscape";
  previewUrl?: string
  className?: string;
  onChange?: (file: File | null) => void;
}

export function FileUpload({
  name,
  label,
  description,
  required = false,
  tooltip,
  accept = "image/*",
  previewType = "square",
  className,
  previewUrl,
  onChange
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(previewUrl || null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      if (onChange) onChange(selectedFile);
    } else {
      setFile(null);
      setPreview(null);
      if (onChange) onChange(null);
    }
  };

  const isSquare = previewType === "square";
  const PreviewIcon = isSquare ? Image : Store;
  
  return (
    <div className={cn("flex flex-col w-full space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor={name} className="text-sm font-medium">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-neutral-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="top" align="end" className="bg-neutral-800 text-white text-xs p-2 rounded max-w-xs">
                {tooltip}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      <div className="border-2 border-dashed border-neutral-200 rounded-lg p-4 transition-all hover:border-primary-300 bg-neutral-50">
        <div className={cn("flex flex-col", isSquare ? "md:flex-row items-center gap-4" : "space-y-4")}>
          <div className={cn(
            "bg-white rounded-md flex items-center justify-center border border-neutral-200 overflow-hidden",
            isSquare ? "w-24 h-24" : "w-full h-40"
          )}>
            {preview ? (
              <img src={preview} alt="Preview" className="object-cover w-full h-full" />
            ) : (
              <div className="text-center">
                <PreviewIcon className="h-8 w-8 mx-auto mb-1 text-neutral-400" />
                <p className="text-xs">{isSquare ? "No logo yet" : "Upload a photo of your storefront"}</p>
              </div>
            )}
          </div>
          
          <div className={cn("flex-1", isSquare ? "w-full" : "")}>
            <div className={cn("flex", isSquare ? "flex-col space-y-2" : "items-center justify-between")}>
              <div className="flex items-center">
                <Label 
                  htmlFor={name} 
                  className="cursor-pointer px-3 py-2 text-sm font-medium text-black border-black border rounded-md"
                >
                  Choose {isSquare ? "file" : "image"}
                </Label>
                <span className="ml-2 text-sm text-neutral-500">
                  {file ? file.name : `No file chosen`}
                </span>
              </div>
              {!isSquare && (
                <p className="text-xs text-neutral-500">Recommended: 1200x800px (Max 5MB)</p>
              )}
            </div>
            {isSquare && (
              <p className="text-xs text-neutral-500 mt-2">Recommended: Square image, at least 512x512px (Max 2MB)</p>
            )}
          </div>
        </div>
      </div>
      
      <Input 
        id={name}
        name={name} 
        type="file" 
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
      
      {description && (
        <p className="text-xs">{description}</p>
      )}
    </div>
  );
}