'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { 
  Select, 
  SelectItem, 
} from "@/components/ui/Select";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/Tooltip";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { LoaderIcon } from "@/components/icons/theme/LoaderIcon";
import { FormErrorMessage } from "@/components/forms/FormErrorMessage";
import { FileUpload } from "@/components/ui/FileUpload";
import { ShopCategory, RegisterShopBody } from "@/models/shop";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/toast/index";
import { 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Store, 
  MapPin, 
  FileCheck, 
} from "lucide-react";
import { Text } from "../ui";
import { useOnboardShop } from "@/api/shops/queries";
import { shopRegisterSchema } from "@/constants/schema";
import { ButtonLink } from "../ui/ButtonLink";
import { RoutePath } from "@/enums/RoutePath";

type StepType = "info" | "location" | "review";

export function ShopOnboardingForm() {
  const [currentStep, setCurrentStep] = useState<StepType>("info");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [shopData, setShopData] = useState<RegisterShopBody>({
    displayName: "",
    address: "",
    taxNumber: "",
    category: ShopCategory.Restraunt,
    shopFront: null as File | null
  });
  const [username, setUsername] = useState<string>('');

  const { mutateAsync: onboardShop } = useOnboardShop();
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmitting(true)

    if(!shopData.shopFront){
      toast({description:'Missing shopFront image', variant: 'error'});
      return;
    }

    if(!username){
        toast({description:'Missing shop username', variant: 'error'});
        return;
    }

    const parsed = shopRegisterSchema.safeParse({
      displayName: shopData.displayName,
      address: shopData.address,
      taxNumber: shopData.taxNumber,
      category: shopData.category,
      shopFront: shopData.shopFront,
      logo: shopData.logo,
    });
  
    if (!parsed.success) {
      toast({ description: parsed.error.errors[0]?.message, variant: 'error' })
      setIsSubmitting(false)
      return;
    }

    const formData = new FormData();
    formData.append('displayName', shopData.displayName);
    formData.append('address', shopData.address);
    formData.append('category', shopData.category);
    formData.append('taxNumber', shopData.taxNumber);
    formData.append('shopFront', shopData.shopFront as Blob);

    if(shopData.logo){
      formData.append('logo', shopData.logo as Blob);
    }

    const {errorMessage} = await onboardShop({username, formData})
    if (errorMessage) {
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'error',
      })
    }else{
        setIsComplete(true);
        toast({
          title: "Onboarding Complete",
          description: "Shop onboarding compelete, we will verify the details in 1-2 days",
          variant: "success"
        });
    }
    setIsSubmitting(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShopData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (value: string) => {
    setShopData(prev => ({
      ...prev,
      category: value as ShopCategory
    }));
  };

  const handleFileChange = (name: string) => (file: File | null) => {
    setShopData(prev => ({
      ...prev,
      [name]: file
    }));
  };

  const validateCurrentStep = (): boolean => {
    setError(null);
    
    if (currentStep === "info") {
      if (!shopData.displayName || shopData.displayName.length < 3) {
        setError("Display name must be at least 3 characters");
        return false;
      }
    }
    
    if (currentStep === "location") {
      if (!shopData.address || shopData.address.length < 5) {
        setError("Please enter a valid address (at least 5 characters)");
        return false;
      }
      if (!shopData.taxNumber || shopData.taxNumber.length < 3) {
        setError("Please enter a valid tax number (at least 3 characters)");
        return false;
      }
      if (!shopData.shopFront) {
        setError("Please upload a storefront image");
        return false;
      }
    }
    
    return true;
  };

  const nextStep = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    const stepMap: Record<StepType, StepType> = {
      "info": "location",
      "location": "review",
      "review": "review"
    };
    
    if (validateCurrentStep()) {
      setCurrentStep(stepMap[currentStep]);
    }
  };

  const prevStep = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    const stepMap: Record<StepType, StepType> = {
      "info": "info",
      "location": "info",
      "review": "location"
    };
    
    setCurrentStep(stepMap[currentStep]);
  };

  const isStepCompleted = (step: StepType): boolean => {
    if (step === "info") {
      return shopData.displayName.length >= 3 && !!shopData.logo;
    }
    if (step === "location") {
      return shopData.address.length >= 5 && shopData.taxNumber.length >= 3 && !!shopData.shopFront;
    }
    return false;
  };
  
  const getStepStatus = (step: StepType): "incomplete" | "current" | "completed" => {
    if (currentStep === step) return "current";
    return isStepCompleted(step) ? "completed" : "incomplete";
  };

  const renderStepIndicator = (step: StepType, icon: React.ReactNode, label: string) => {
    const status = getStepStatus(step);
    
    return (
      <div 
        className={cn(
          "flex items-center space-x-2 cursor-pointer transition-colors",
          status === "completed" && "text-primary-600",
          status === "current" && "text-primary-600 font-medium",
          status === "incomplete" && "text-neutral-400"
        )}
        onClick={() => {
          if (status !== "incomplete" || currentStep === step) {
            setCurrentStep(step);
          }
        }}
      >
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors",
          status === "completed" && "border-primary-500 bg-primary-50",
          status === "current" && "border-primary-500 bg-primary-100",
          status === "incomplete" && "border-neutral-200 bg-neutral-50"
        )}>
          {status === "completed" ? <CheckCircle2 className="h-4 w-4" /> : icon}
        </div>
        <span>{label}</span>
      </div>
    );
  };

  if (isComplete) {
    return (
      <div className="w-full max-w-7xl overflow-hidden">
        <div className="p-0">
          <div className="bg-gradient-to-r from-primary-100 to-primary-50 p-8 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <CheckCircle2 className="h-8 w-8 text-primary-500" />
            </div>
            <h1 className="text-2xl font-semibold text-primary-900 mb-2">Registration Complete!</h1>
            <p className="text-primary-700 max-w-md mx-auto mb-6">
              Your shop has been successfully registered and will get verified in 1-2 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink
                size="lg"
                className="shadow-md"
                href={RoutePath.Dashboard}
              >
                Go to Dashboard
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full max-w-7xl h-full">
        <div className="p-6 pb-4">
          <Text as='p' styleVariant='body-normal' className="text-primary-700">
            Complete the form below to onboard the shop
          </Text>
        </div>
        
        <div className="p-6 pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4">
            {renderStepIndicator("info", <Store className="h-4 w-4" />, "Shop Identity")}
            <div className="hidden sm:block h-0.5 flex-1 bg-neutral-200 mx-2 relative">
              <div 
                className="absolute inset-y-0 left-0 bg-primary-500 transition-all duration-300"
                style={{ width: currentStep === "info" ? "0%" : currentStep === "location" ? "50%" : "100%" }}
              />
            </div>
            {renderStepIndicator("location", <MapPin className="h-4 w-4" />, "Shop Details")}
            <div className="hidden sm:block h-0.5 flex-1 bg-neutral-200 mx-2 relative">
              <div 
                className="absolute inset-y-0 left-0 bg-primary-500 transition-all duration-300"
                style={{ width: currentStep === "review" ? "100%" : "0%" }}
              />
            </div>
            {renderStepIndicator("review", <FileCheck className="h-4 w-4" />, "Review")}
          </div>
        </div>
        
        <div className="h-[500px]">
          <ScrollArea className="h-full">
            <div className="p-6">
              {currentStep === "info" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="username" className="text-sm font-medium">
                          Username <span className="text-destructive">*</span>
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AlertCircle className="h-4 w-4 text-neutral-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent side="top" align="end" className="bg-neutral-800 text-white text-xs p-2 rounded max-w-xs">
                              Username of the shop that you&apos;re onboarding
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="relative">
                        <Input
                          id="username"
                          name="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full pr-10"
                        />
                        {shopData.displayName.length >= 3 && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-success-500">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="displayName" className="text-sm font-medium">
                          Display Name <span className="text-destructive">*</span>
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AlertCircle className="h-4 w-4 text-neutral-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent side="top" align="end" className="bg-neutral-800 text-white text-xs p-2 rounded max-w-xs">
                              This is the name that will be displayed to customers.
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="relative">
                        <Input
                          id="displayName"
                          name="displayName"
                          placeholder="e.g. John's Bakery"
                          value={shopData.displayName}
                          onChange={handleInputChange}
                          className="w-full pr-10"
                        />
                        {shopData.displayName.length >= 3 && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-success-500">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs">Choose a display name for the business</p>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="category" className="text-sm font-medium">
                        Category <span className="text-destructive">*</span>
                      </Label>
                      <Select 
                        name="category"
                        defaultValue={shopData.category}
                        onValueChange={handleCategoryChange}
                      >
                          {[ShopCategory.Groceries, ShopCategory.Restraunt].map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                      </Select>
                      <p className="text-xs">Select the category that best fits the business</p>
                    </div>
                  </div>

                  <FileUpload
                    name="logo"
                    label="Shop Logo"
                    required
                    tooltip="Business logo which will appear on your shop profile and listings"
                    description="Upload a high-quality logo for better visibility"
                    previewType="square"
                    onChange={handleFileChange("logo")}
                  />
                </div>
              )}
              
              {currentStep === "location" && (
                <div className="space-y-6">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="taxNumber" className="text-sm font-medium">
                        Tax ID Number <span className="text-destructive">*</span>
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <AlertCircle className="h-4 w-4 text-neutral-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent side="top" align="end" className="bg-neutral-800 text-white text-xs p-2 rounded max-w-xs">
                            Your business tax identification number for legal purposes.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="relative">
                      <Input
                        id="taxNumber"
                        name="taxNumber"
                        placeholder="EWSPY09834"
                        value={shopData.taxNumber}
                        onChange={handleInputChange}
                        className="w-full pr-10"
                      />
                      {shopData.taxNumber.length >= 3 && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-success-500">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs">Enter your registered business tax ID</p>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium">
                      Address <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="address"
                        name="address"
                        placeholder="12, Street 46, New York City"
                        value={shopData.address}
                        onChange={handleInputChange}
                        className="w-full pr-10"
                      />
                      {shopData.address.length >= 5 && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-success-500">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs">Full physical address of your shop</p>
                  </div>

                  <FileUpload
                    name="shopFront"
                    label="ShopFront Image"
                    required
                    tooltip="A photo of your physical store location"
                    description="Add a clear image of your shop front to build customer trust"
                    previewType="landscape"
                    onChange={handleFileChange("shopFront")}
                  />
                </div>
              )}
              
              {currentStep === "review" && (
                <div className="space-y-6">
                  <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <AlertCircle className="text-primary-600 h-5 w-5 mt-0.5 mr-3" />
                      <p className="text-sm text-primary-700">
                        Please review the information carefully before submitting.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm">
                      <h3 className="text-sm font-semibold text-neutral-800 pb-2 border-b border-neutral-100 mb-4 flex items-center">
                        <Store className="h-4 w-4 mr-2 text-primary-500" />
                        Shop Identity
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <Text as='h6' styleVariant='body-normal' className="font-semibold text-neutral-800">Display Name</Text>
                          <p className="text-sm font-medium text-neutral-800">{shopData.displayName}</p>
                        </div>
                        <div>
                          <Text as='h6' styleVariant='body-normal' className="font-semibold text-neutral-800">Category</Text>
                          <p className="text-sm font-medium text-neutral-800">{shopData.category}</p>
                        </div>
                        {shopData.logo && (
                          <div>
                            <Text as='h6' styleVariant='body-normal' className="font-semibold text-neutral-800">Shop Logo</Text>
                            <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center border border-neutral-200 overflow-hidden">
                              <img 
                                src={URL.createObjectURL(shopData.logo)} 
                                alt="Shop Logo" 
                                className="object-cover w-full h-full" 
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm">
                      <h3 className="text-sm font-semibold text-neutral-800 pb-2 border-b border-neutral-100 mb-4 flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-primary-500" />
                        Shop Details
                      </h3>
                      <div className="space-y-4">
                        <div>
                        <Text as='h6' styleVariant='body-normal' className="font-semibold text-neutral-800">Address</Text>
                          <p className="text-sm font-medium text-neutral-800">{shopData.address}</p>
                        </div>
                        <div>
                        <Text as='h6' styleVariant='body-normal' className="font-semibold text-neutral-800">Tax ID Number</Text>
                          <p className="text-sm font-medium text-neutral-800">{shopData.taxNumber}</p>
                        </div>
                        {shopData.shopFront && (
                          <div>
                            <Text as='h6' styleVariant='body-normal' className="font-semibold text-neutral-800">Storefront</Text>
                            <div className="w-full max-w-xs h-24 bg-white rounded-md flex items-center justify-center border border-neutral-200 overflow-hidden">
                              <img 
                                src={URL.createObjectURL(shopData.shopFront)} 
                                alt="Storefront" 
                                className="object-cover w-full h-full" 
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {error && <FormErrorMessage message={error} />}
            </div>
          </ScrollArea>
        </div>
        
        <div className="flex flex-wrap justify-between gap-4 mt-2">
          <div className="flex items-center gap-3">
            {currentStep !== "info" && (
              <Button 
                type="button"
                variant='ghost' 
                onClick={prevStep}
                disabled={isSubmitting}
                className="flex items-center gap-2 border border-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
          </div>
          
          <div>
            {currentStep === "review" ? (
              <Button 
                type="submit"
                variant='active'
                disabled={isSubmitting}
              >
                {isSubmitting ? <LoaderIcon className="h-4 w-4" /> : "Submit"}
              </Button>
            ) : (
              <Button 
                variant='active'
                onClick={(nextStep)}
                className="flex items-center gap-2"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  )
};