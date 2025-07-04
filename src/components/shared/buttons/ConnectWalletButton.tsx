"use client";

import { WalletName } from "@solana/wallet-adapter-base";
import { useWalletMultiButton } from "@solana/wallet-adapter-base-ui";
import { Wallet } from "@solana/wallet-adapter-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, ButtonProps } from "../../ui/Button";
import { WalletListItem } from "../../wallet/WalletListItem";
import { cn } from "@/utils";
import { Text } from "../../ui/Text";
import "@solana/wallet-adapter-react-ui/styles.css";
import useToggle from "@/hooks/useToggle";

type Props = {
  text?: string;
  onClick?: () => Promise<void>;
} & ButtonProps;

export const ConnectWalletButton: React.FC<Props> = ({
  onClick,
  text,
  children,
  className,
  ...props
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [walletModalConfig, setWalletModalConfig] = useState<{
    onSelectWallet(walletName: WalletName): void;
    wallets: Wallet[];
  } | null>(null);

  const { buttonState, onConnect, onSelectWallet, onDisconnect } =
    useWalletMultiButton({
      onSelectWallet: setWalletModalConfig,
    });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const label = useMemo(() => {
    if (text) return text;
    switch (buttonState) {
      case "connected":
        return "Disconnect";
      case "connecting":
        return "Connecting";
      case "disconnecting":
        return "Disconnecting";
      case "has-wallet":
        return "Connect";
      case "no-wallet":
        return "Select Wallet";
      default:
        return "Connect";
    }
  }, [buttonState, text]);

  const handleClick = useCallback(async () => {
    switch (buttonState) {
      case "connected":
        await onClick?.();
        await onDisconnect?.();
        break;
      case "has-wallet":
        await onConnect?.();
        break;
      case "no-wallet":
        onSelectWallet?.();
        break;
    }
  }, [buttonState, onClick, onConnect, onDisconnect, onSelectWallet]);

  if (!isMounted) return null;

  return (
    <>
      <Button
        className={cn("py-5 border border-white", className)}
        variant="ghost"
        size="md"
        onClick={handleClick}
        {...props}
      >
        {children || <span className="leading-[22.4px]">{label}</span>}
      </Button>

      {walletModalConfig && (
        <div className="wallet-adapter-modal wallet-adapter-modal-fade-in wallet-dialog">
          <div
            className="wallet-adapter-modal-container"
            onClick={(e) =>
              e.currentTarget === e.target && setWalletModalConfig(null)
            }
          >
            <div className="wallet-adapter-modal-wrapper">
              <button
                onClick={() => setWalletModalConfig(null)}
                className="wallet-adapter-modal-button-close"
              >
                <svg width="14" height="14">
                  <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z" />
                </svg>
              </button>
              <h1 className="wallet-adapter-modal-title">Connect a wallet</h1>
              <ul className="wallet-adapter-modal-list">
                {walletModalConfig.wallets.map((wallet) => (
                  <WalletListItem
                    key={wallet.adapter.name}
                    handleClick={() => {
                      walletModalConfig.onSelectWallet(wallet.adapter.name);
                      setWalletModalConfig(null);
                    }}
                    wallet={wallet}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
