"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type StructureBlueprintDialogProps = {
  label: string;
  imageAlt: string;
  closeLabel: string;
};

export function StructureBlueprintDialog({
  label,
  imageAlt,
  closeLabel,
}: StructureBlueprintDialogProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 inline-flex items-center justify-center rounded-md bg-brand-blue px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 sm:mt-8 sm:px-8 sm:text-sm"
      >
        {label}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6"
          onClick={close}
          role="presentation"
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={imageAlt}
          >
            <button
              type="button"
              onClick={close}
              className="mb-3 text-sm font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-80"
            >
              {closeLabel}
            </button>
            <Image
              src="/images/structure-blueprint.webp"
              alt={imageAlt}
              width={1024}
              height={339}
              className="h-auto w-full rounded-sm"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
