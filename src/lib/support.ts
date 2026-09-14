export const SUPPORT_NAME = "Safayet Rahman";
export const SUPPORT_PHONE_DISPLAY = "01XXXXXXXXX";
export const SUPPORT_WHATSAPP_NUMBER = "8801984163340";

export const LAPTOP_FUND = {
  current: 4570,
  goal: 24930,
  name: "Lenovo ThinkPad T490s",
} as const;

export function formatBDT(value: number) {
  return `৳${value.toLocaleString("en-BD")}`;
}

export const SUPPORT_WHATSAPP_MESSAGE =
  "Hey Safayet! I'd like to help you get your ThinkPad T490s.";

export function buildWhatsAppUrl() {
  return `https://wa.me/${SUPPORT_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    SUPPORT_WHATSAPP_MESSAGE,
  )}`;
}
