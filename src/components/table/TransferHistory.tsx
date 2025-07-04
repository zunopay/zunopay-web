"use client";
import { Text } from "@/components/ui/Text";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/Table";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { CopyButton } from "../shared/CopyButton";
import { useTableSearch } from "@/hooks/useTableSearch";
import { TransferHistory } from "@/models/payment";
import { shortenString } from "@/utils";
import { useRerender } from "@/hooks/useRerender";

type Props = { transfers: TransferHistory[] };

export const TransferHistoryTable: React.FC<Props> = ({ transfers }) => {
  const isTableEmpty = transfers.length === 0;
  const { TableSearch, searchTerm } = useTableSearch();

  useRerender(30000);

  return (
    <div className="w-full">
      <Text styleVariant="secondary-heading" as="h4" className="pb-4">
        Transfers
      </Text>
      <div className="space-y-4 bg-grey-600 text-grey-100 border-2 border-grey-400 py-4 rounded-xl">
        <div className="flex items-center justify-between gap-2 px-4">
          <TableSearch />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Vpa</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Signature</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transfers.map((transfer) => (
              <TableRow key={transfer.id} className="h-12">
                <TableCell>
                  <div className="flex items-center font-medium gap-2">
                    <Text as="p" styleVariant="body-normal">
                      {transfer.type}
                    </Text>
                  </div>
                </TableCell>
                <TableCell>
                  {transfer.walletAddress ? (
                    <div className="flex items-center font-medium gap-2">
                      <span className="w-20">
                        {shortenString(transfer.walletAddress)}
                      </span>
                      <CopyButton
                        variant="active"
                        clipboard={transfer.walletAddress}
                      />
                    </div>
                  ) : null}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {transfer.amount}
                  </div>
                </TableCell>
                <TableCell>
                  {transfer.signature ? (
                    <div className="flex items-center font-medium gap-2">
                      <Text as="p" styleVariant="body-normal">
                        {shortenString(transfer.signature)}
                      </Text>
                      <CopyButton
                        variant="active"
                        clipboard={transfer.signature}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell>
                  <Text as="p" styleVariant="body-normal">
                    {transfer.status}
                  </Text>
                </TableCell>
                <TableCell>
                  <span
                    title={new Date(transfer.createdAt).toLocaleString()}
                    className="text-nowrap"
                  >
                    {formatDistanceToNow(new Date(transfer.createdAt), {
                      addSuffix: true,
                      includeSeconds: true,
                    })}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {isTableEmpty ? (
          <Text
            as="p"
            styleVariant="secondary-heading"
            className="text-center text-white py-12"
          >
            Nothing to see here... yet ;)
          </Text>
        ) : null}
      </div>
    </div>
  );
};

export default TransferHistoryTable;
