import { Heart, MessageCircle } from "lucide-react";
import { Button } from "./button";

function FloatingActions() {
  const whatsappNumber = "919876543210"; // Replace with your actual number

  const handleDonate = () => {
    document.getElementById("get-involved")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="
          fixed bottom-6 left-6 z-50
          w-14 h-14
          rounded-full
          bg-[#25D366]
          text-white
          flex items-center justify-center
          shadow-xl
          hover:scale-110
          hover:shadow-2xl
          transition-all duration-300
        "
      >
        <MessageCircle className="w-7 h-7" />

        <span
          className="
            absolute -top-1 -right-1
            w-4 h-4
            bg-accent
            rounded-full
            border-2 border-white
          "
        />
      </a>

      {/* Donate Now Floating Button */}
      <Button
        type="button"
        onClick={handleDonate}
        aria-label="Donate Now"
        className="
          fixed bottom-6 right-6 z-50
          h-auto
          px-6 py-3.5
          rounded-full
          bg-accent
          text-white
          font-semibold
          shadow-xl
          hover:scale-105
          hover:shadow-2xl
          hover:bg-accent/90
          transition-all duration-300
        "
      >
        <Heart className="w-5 h-5 fill-white" />
        <span>Donate Now</span>
      </Button>
    </>
  );
}

export default FloatingActions;