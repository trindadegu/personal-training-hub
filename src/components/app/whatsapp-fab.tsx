import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getAdminWhatsapp } from "@/lib/api/admin-contact";

interface WhatsappFabProps {
  message?: string;
}

/**
 * Balão flutuante de WhatsApp que abre conversa direta com o professor.
 * Esconde se o número ainda não estiver configurado em admin_credentials.
 */
export function WhatsappFab({
  message = "Olá! Gostaria de mais informações sobre os planos da Atlântida.",
}: WhatsappFabProps) {
  const { data: numero } = useQuery({
    queryKey: ["admin-whatsapp-fab"],
    queryFn: getAdminWhatsapp,
    staleTime: 5 * 60 * 1000,
  });

  const clean = (numero ?? "").replace(/\D/g, "");
  if (!clean) return null;

  const href = `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 220, damping: 18 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] ring-1 ring-black/5 hover:bg-[#1ebe5b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      <span className="pointer-events-none absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" />
      <svg viewBox="0 0 32 32" className="relative h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M19.11 17.55c-.27-.14-1.6-.79-1.84-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.33-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.83-2.02-.22-.53-.45-.46-.61-.47l-.52-.01a1 1 0 0 0-.72.34c-.25.27-.95.93-.95 2.27 0 1.34.98 2.64 1.11 2.82.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.55.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM16.02 4C9.39 4 4 9.39 4 16.02c0 2.12.55 4.19 1.6 6.02L4 28l6.1-1.6a12.01 12.01 0 0 0 5.92 1.55h.01c6.63 0 12.02-5.39 12.02-12.02C28.05 9.39 22.66 4 16.02 4zm0 21.81h-.01a9.81 9.81 0 0 1-5-1.37l-.36-.21-3.62.95.97-3.53-.23-.36a9.79 9.79 0 0 1-1.51-5.27c0-5.41 4.4-9.81 9.81-9.81 2.62 0 5.08 1.02 6.93 2.88a9.74 9.74 0 0 1 2.88 6.94c0 5.41-4.4 9.78-9.86 9.78z" />
      </svg>
    </motion.a>
  );
}