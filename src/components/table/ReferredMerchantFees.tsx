"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Avatar } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { Input, Skeleton } from "../ui";
import Image from "next/image";
import { useFetchRoyaltyEarned } from "@/api/user/queries";

export default function ReferredMerchantFees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: merchantWithRoyalties } = useFetchRoyaltyEarned();
  if (!merchantWithRoyalties?.data) {
    return (
      <div>
        You don&apos;t have any referred merchants, refer and start earning
      </div>
    );
  }

  const filteredMerchants = merchantWithRoyalties?.data?.filter(
    (royalty) =>
      royalty.merchant.displayName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      royalty.merchant.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let totalRoyalties = 0;
  filteredMerchants.forEach((merchant) => (totalRoyalties += merchant.fee));

  const formatDollar = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const royalties = filteredMerchants?.sort((a, b) => b.fee - a.fee);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Shop Royalty Dashboard
      </h1>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Royalties
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton />
            ) : (
              <div className="text-2xl font-bold">{totalRoyalties}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Number of Stores
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton />
            ) : (
              <div className="text-2xl font-bold">
                {filteredMerchants.length}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Shop Fee Details</CardTitle>
              <CardDescription>
                Detailed breakdown of fees earned from each shop
              </CardDescription>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search stores..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shop</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Total Fees</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMerchants.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="h-24 text-center">
                        No results found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    royalties.map(({ merchant, fee }) => (
                      <TableRow key={merchant.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              {merchant.cover ? (
                                <Image
                                  src={merchant.cover}
                                  alt={merchant.displayName}
                                  className="object-contain"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center bg-muted text-lg font-medium uppercase">
                                  {merchant.displayName.charAt(0)}
                                </div>
                              )}
                            </Avatar>
                            <div className="font-medium">
                              {merchant.displayName}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{merchant.address}</TableCell>
                        <TableCell className="text-right font-medium">
                          {formatDollar(fee)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
