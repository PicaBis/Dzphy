import type { SocialPlatform } from "@/data/site";

type IconProps = { className?: string };

export const YouTubeIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" /></svg>
);

export const FacebookIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
);

export const TelegramIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M22 3 2.5 10.5c-1.3.5-1.3 1.3-.2 1.6l5 1.6 1.9 5.9c.24.66.12.92.8.92.53 0 .76-.24 1.05-.53l2.5-2.43 5 3.7c.92.5 1.58.24 1.8-.85L23.9 4.4c.32-1.34-.5-1.94-1.9-1.4zM7.3 13.4l10.9-6.9c.5-.3.96-.14.58.2L9.8 15l-.35 3.7-2.15-5.3z" /></svg>
);

export const WhatsAppIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M17.5 14.4c-.3-.15-1.77-.87-2-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.07a8.2 8.2 0 01-2.4-1.48 9 9 0 01-1.66-2.07c-.17-.3 0-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37 0-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.5l-.57-.02c-.2 0-.52.08-.8.38s-1.05 1.03-1.05 2.5 1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.3 1.28.5 1.71.64.72.23 1.37.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.18-1.15l-.3-.18-3.1.8.83-3-.2-.31A8.2 8.2 0 1112 20.2z" /></svg>
);

export const TikTokIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z" /></svg>
);

export const InstagramIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
);

export const MessengerIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.3 2 2 6.2 2 11.8c0 2.9 1.2 5.4 3.1 7.2.2.15.25.35.26.56l.05 1.7c.02.55.58.9 1.08.68l1.9-.84c.16-.07.34-.08.5-.04 1 .27 2.05.42 3.1.42 5.7 0 10-4.2 10-9.8S17.7 2 12 2zm6 7.5-2.94 4.66c-.47.74-1.47.93-2.17.4l-2.34-1.75a.6.6 0 00-.72 0l-3.16 2.4c-.42.32-.97-.18-.68-.63l2.94-4.66c.47-.74 1.47-.93 2.17-.4l2.34 1.75a.6.6 0 00.72 0l3.16-2.4c.42-.32.97.18.68.63z" /></svg>
);

export const LinktreeIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3v18M12 8l5-5M12 8L7 3M5 13h14M8 21h8" /></svg>
);

export const socialIconMap: Record<SocialPlatform, (p: IconProps) => React.JSX.Element> = {
  youtube: YouTubeIcon,
  facebook: FacebookIcon,
  telegram: TelegramIcon,
  whatsapp: WhatsAppIcon,
  tiktok: TikTokIcon,
  instagram: InstagramIcon,
  messenger: MessengerIcon,
  linktree: LinktreeIcon,
};
