"use client";

import ModalPortal from "./ModalPortal";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import styles from "./AddedToCartModal.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
  productTitle?: string;
  productImage?: string;
  price?: string;
};

export default function AddedToCartModal({
  open,
  onClose,
  onCheckout,
  productTitle,
  productImage,
  price
}: Props) {
  useLockBodyScroll(open);

  if (!open) return null;

  return (
    <ModalPortal>
      <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Added to cart">
        <div className={styles.modal}>
          <div className={styles.header}>
            <div className={styles.title}>Added to cart</div>
            <button className={styles.close} onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>

          <div className={styles.body}>
            {productImage ? <img className={styles.thumb} src={productImage} alt={productTitle ?? "Product"} /> : null}

            <div className={styles.meta}>
              <div className={styles.product}>{productTitle ?? "Item added successfully"}</div>
              {price ? <div className={styles.price}>{price}</div> : null}
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.secondary} onClick={onClose} type="button">
              Continue shopping
            </button>
            <button className={styles.primary} onClick={onCheckout} type="button">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
