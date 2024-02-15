import { PhoneIcon } from "lucide-react";
import Link from "next/link";

export function WhatsappFloat() {
  return (
    <Link
      target="_blank"
      href="https://api.whatsapp.com/send?phone=5548999444443"
      className="fixed bottom-6 right-6 p-3 bg-green-500 rounded-full"
    >
      <PhoneIcon className="w-7 h-7" />
    </Link>
  );
}
