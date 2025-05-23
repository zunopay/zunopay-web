"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select, SelectItem } from "@/components/ui/Select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { LoaderIcon } from "@/components/icons/theme/LoaderIcon";
import { FormErrorMessage } from "@/components/forms/FormErrorMessage";
import { FileUpload } from "@/components/ui/FileUpload";
import { ShopCategory, ShopStatus, UpdateShopBody } from "@/models/shop";
import { toast } from "@/components/ui/toast/index";
import { AlertCircle, Check, CheckCircle2, Save } from "lucide-react";
import { Text } from "../ui";
import { useFetchUserShop, useUpdateShop } from "@/api/shops/queries";

export const ShopProfileForm: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shopData, setShopData] = useState<UpdateShopBody>({});

  const { mutateAsync: updateShop } = useUpdateShop();
  const { data: userShop, isLoading } = useFetchUserShop();
  const shop = userShop?.data;

  useEffect(() => {
    if (shop) {
      try {
        setShopData({
          displayName: shop?.displayName,
          address: shop?.address,
          taxNumber: shop?.taxNumber,
          category: shop?.category,
        });
      } catch (err) {
        setError("Failed to load shop profile. Please try again later.");
      }
    }
  }, [shop]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShopData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setShopData((prev) => ({
      ...prev,
      category: value as ShopCategory,
    }));
  };

  const handleFileChange = (name: string) => (file: File | null) => {
    setShopData((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSaving(true);
    setError(null);

    const formData = new FormData();
    if (shopData.displayName) {
      formData.append("displayName", shopData.displayName);
    }
    if (shopData.address) {
      formData.append("address", shopData.address);
    }
    if (shopData.category) {
      formData.append("category", shopData.category);
    }
    if (shopData.taxNumber) {
      formData.append("taxNumber", shopData.taxNumber);
    }
    if (shopData.shopFront) {
      formData.append("shopFront", shopData.shopFront as Blob);
    }
    if (shopData.logo) {
      formData.append("logo", shopData.logo as Blob);
    }

    try {
      const { errorMessage } = await updateShop(formData);

      if (errorMessage) {
        toast({ description: errorMessage, variant: "error" });
        return;
      }

      toast({
        title: "Changes Saved",
        description: "Your shop profile has been updated successfully.",
        variant: "success",
      });
    } catch (err) {
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <LoaderIcon className="h-5 w-5 m-auto" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full max-w-7xl h-full">
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <Text
                as="p"
                styleVariant="body-normal"
                className="text-primary-700"
              >
                Update your shop information
              </Text>
              {shop?.isVerified ? (
                <div className="flex gap-1 bg-green-900/30 text-green-400 text-xs px-2 rounded-xl items-center">
                  <Check className="w-3 h-3"/>
                  Verified
                </div>
              ) : (
                <div className="bg-green-900/30 text-important-color text-xs px-2 rounded-xl flex items-center w-fit">
                  Pending
                </div>
              )}
            </div>
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-blue-100 text-text-color hover:bg-blue-600 shadow-md flex items-center gap-2"
            >
              {isSaving ? (
                <LoaderIcon className="h-4 w-4" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <div className="p-0">
          <div className="p-6 space-y-6">
            <div className="bg-blue-300/10 border border-blue-300/30 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertCircle className="text-blue-100 h-5 w-5 mt-0.5 mr-3" />
                <p className="text-sm text-grey-100">
                  Update your shop information below. This information will be
                  visible to customers browsing your shop.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-text-color mb-4 border-b border-grey-300 pb-2">
                  Shop Identity
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="displayName"
                        className="text-sm font-medium text-grey-100"
                      >
                        Display Name <span className="text-red-500">*</span>
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <AlertCircle className="h-4 w-4 text-grey-200 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            align="end"
                            className="bg-grey-600 text-text-color text-xs p-2 rounded max-w-xs"
                          >
                            This is the name that will be displayed to
                            customers.
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
                        className="w-full pr-10 bg-grey-600 border-grey-300 text-text-color"
                      />
                      {shopData.displayName &&
                        shopData.displayName.length >= 3 && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-green-400">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                        )}
                    </div>
                    <p className="text-xs text-grey-200">
                      Choose a memorable name for your business
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Label
                      htmlFor="category"
                      className="text-sm font-medium text-grey-100"
                    >
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      name="category"
                      defaultValue={shopData.category}
                      onValueChange={handleCategoryChange}
                    >
                      {[ShopCategory.Groceries, ShopCategory.Restraunt].map(
                        (category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        )
                      )}
                    </Select>
                    <p className="text-xs text-grey-200">
                      Select the category that best fits your business
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <FileUpload
                    name="logo"
                    label="Shop Logo"
                    tooltip="Your business logo which will appear on your shop profile and listings"
                    description="Upload a high-quality logo for better visibility"
                    previewType="square"
                    onChange={handleFileChange("logo")}
                    previewUrl={shop?.logo}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-text-color mb-4 border-b border-grey-300 pb-2">
                  Shop Details
                </h3>

                <div className="flex flex-col space-y-2 mb-6">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="taxNumber"
                      className="text-sm font-medium text-grey-100"
                    >
                      Tax ID Number <span className="text-red-500">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AlertCircle className="h-4 w-4 text-grey-200 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          align="end"
                          className="bg-grey-600 text-text-color text-xs p-2 rounded max-w-xs"
                        >
                          Your business tax identification number for legal
                          purposes.
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
                      className="w-full pr-10 bg-grey-600 border-grey-300 text-text-color"
                    />
                    {shopData.taxNumber && shopData.taxNumber.length >= 3 && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-green-400">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-grey-200">
                    Enter your registered business tax ID
                  </p>
                </div>

                <div className="flex flex-col space-y-2 mb-6">
                  <Label
                    htmlFor="address"
                    className="text-sm font-medium text-grey-100"
                  >
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="address"
                      name="address"
                      placeholder="12, Street 46, New York City"
                      value={shopData.address}
                      onChange={handleInputChange}
                      className="w-full pr-10 bg-grey-600 border-grey-300 text-text-color"
                    />
                    {shopData.address && shopData.address.length >= 5 && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-green-400">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-grey-200">
                    Full physical address of your shop
                  </p>
                </div>

                <FileUpload
                  name="shopFront"
                  label="Storefront Image"
                  tooltip="A photo of your physical store location"
                  description="Update your storefront image to show recent changes or improvements"
                  previewType="landscape"
                  onChange={handleFileChange("shopFront")}
                  previewUrl={shop?.logo}
                />
              </div>
            </div>

            {error && <FormErrorMessage message={error} />}
          </div>
        </div>
      </div>
    </form>
  );
};
