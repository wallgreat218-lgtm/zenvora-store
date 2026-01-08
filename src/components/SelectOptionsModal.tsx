"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "../lib/products";
import ModalPortal from "./ModalPortal";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import styles from "./SelectOptionsModal.module.css";

export type SelectedOptions = {
  color?: string;
  storage?: string;
};

type Props = {
  open: boolean;
  product: Product;
  onClose: () => void;
  onConfirm: (opts: SelectedOptions) => void;
};

export default function SelectOptionsModal({ open, product, onClose, onConfirm }: Props) {
  useLockBodyScroll(open);

  const colors = product.variants?.colors ?? [];
  const storageOptions = product.variants?.storage ?? [];

  const needsColor = colors.length > 0;
  const needsStorage = storageOptions.length > 0;

  const [color, setColor] = useState<string>("");
  const [storage, setStorage] = useState<string>("");

  useEffect(() => {
    if (!open) return;
    setColor("");
    setStorage("");
  }, [open, product.slug]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const ready = useMemo(() => {
    if (needsColor && !color) return false;
    if (needsStorage && !storage) return false;
    return true;
  }, [needsColor, needsStorage, color, storage]);

  if (!open) return null;

  return (
    <ModalPortal>
      <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Select options">
        <button type="button" className={styles.backdropHit} onClick={onClose} aria-label="Close" />

        <div className={styles.modal}>
          <div className={styles.head}>
            <div>
              <div className={styles.kicker}>Select options</div>
              <div className={styles.title}>{product.title}</div>
            </div>
            <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>

          {needsColor ? (
            <div className={styles.section}>
              <div className={styles.label}>Color</div>
              <div className={styles.options}>
                {colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`${styles.opt} ${color === c ? styles.optActive : ""}`}
                    onClick={() => setColor(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {needsStorage ? (
            <div className={styles.section}>
              <div className={styles.label}>Storage</div>
              <div className={styles.options}>
                {storageOptions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`${styles.opt} ${storage === s ? styles.optActive : ""}`}
                    onClick={() => setStorage(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className={styles.footer}>
            <button type="button" className={styles.secondary} onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className={styles.primary}
              disabled={!ready}
              onClick={() => onConfirm({ color: needsColor ? color : undefined, storage: needsStorage ? storage : undefined })}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
