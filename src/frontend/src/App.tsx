import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import {
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  PhoneCall,
  Share2,
  Trophy,
  Twitter,
  UserPlus,
} from "lucide-react";
import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { toast } from "sonner";

const PROFILE = {
  name: "NAGARAJAN",
  title: "Sales Officer",
  tagline: "Connecting people with the right solutions",
  phone: "+91 8838510443",
  phoneRaw: "+918838510443",
  email: "cynorlux@gmail.com",
  location: "Thiruvananthapuram, Kerala",
  summary:
    "Dedicated Sales Officer with a passion for building client relationships and driving business growth across Kerala. Experienced in B2B and B2C sales with a strong track record of exceeding targets.",
  skills: [
    "Sales Strategy",
    "Client Relations",
    "CRM",
    "Negotiation",
    "Lead Generation",
  ],
  achievements: [
    "Top performer Q3 2025",
    "200+ clients onboarded",
    "30% YoY growth",
  ],
};

function saveContact() {
  const vCard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${PROFILE.name}`,
    `TITLE:${PROFILE.title}`,
    `TEL;TYPE=CELL:${PROFILE.phoneRaw}`,
    `EMAIL:${PROFILE.email}`,
    `ADR;TYPE=WORK:;;${PROFILE.location};;;;`,
    "END:VCARD",
  ].join("\n");
  const blob = new Blob([vCard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "nagarajan.vcf";
  a.click();
  URL.revokeObjectURL(url);
  toast.success("Contact saved to your device!");
}

async function shareProfile() {
  const url = window.location.href;
  if (navigator.share) {
    try {
      await navigator.share({
        title: PROFILE.name,
        text: PROFILE.tagline,
        url,
      });
    } catch {
      // user cancelled, ignore
    }
  } else {
    await navigator.clipboard.writeText(url);
    toast.success("Profile link copied to clipboard!");
  }
}

const CTA_BUTTONS = [
  {
    id: "save",
    label: "SAVE CONTACT",
    icon: UserPlus,
    action: saveContact,
    href: undefined,
  },
  {
    id: "call",
    label: "CALL NOW",
    icon: PhoneCall,
    href: `tel:${PROFILE.phoneRaw}`,
    action: undefined,
  },
  {
    id: "whatsapp",
    label: "WHATSAPP",
    icon: MessageCircle,
    href: `https://wa.me/${PROFILE.phoneRaw.replace("+", "")}`,
    action: undefined,
  },
  {
    id: "location",
    label: "LOCATION",
    icon: MapPin,
    href: "https://maps.google.com/?q=Thiruvananthapuram,Kerala",
    action: undefined,
  },
  {
    id: "website",
    label: "VISIT WEBSITE",
    icon: Globe,
    href: "https://cynorlux.com",
    action: undefined,
  },
  {
    id: "share",
    label: "SHARE PROFILE",
    icon: Share2,
    action: shareProfile,
    href: undefined,
  },
];

const SOCIAL = [
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://x.com", label: "X / Twitter" },
];

function CtaButton({
  button,
  index,
}: {
  button: (typeof CTA_BUTTONS)[number];
  index: number;
}) {
  const Icon = button.icon;
  const content = (
    <span className="flex items-center gap-2 justify-start w-full">
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 border border-primary/30">
        <Icon size={14} className="text-primary" />
      </span>
      <span className="text-xs font-semibold tracking-wider">
        {button.label}
      </span>
    </span>
  );

  const className =
    "flex items-center px-3 py-2.5 rounded-full border border-primary/30 bg-card hover:bg-primary/10 hover:border-primary/70 transition-all duration-200 text-foreground w-full cursor-pointer";

  if (button.action) {
    return (
      <button
        data-ocid={`cta.button.${index + 1}`}
        className={className}
        onClick={button.action}
        type="button"
      >
        {content}
      </button>
    );
  }

  return (
    <a
      data-ocid={`cta.button.${index + 1}`}
      href={button.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("Home");
  const pageUrl = window.location.href;

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{ fontFamily: "'PlusJakartaSans', sans-serif" }}
    >
      <Toaster position="top-center" />

      {/* Header */}
      <header className="w-full max-w-[420px] flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center">
            <span className="text-primary text-xs font-bold">N</span>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          {["Home", "Profile", "Contact"].map((item) => (
            <button
              key={item}
              data-ocid={`nav.${item.toLowerCase()}.link`}
              type="button"
              onClick={() => setActiveNav(item)}
              className={`text-xs font-medium tracking-wide transition-colors ${
                activeNav === item
                  ? "text-primary border-b border-primary pb-0.5"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      {/* Card */}
      <main className="w-full max-w-[420px] px-4 pb-8 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, oklch(0.17 0.03 252), oklch(0.13 0.02 250))",
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px oklch(0.73 0.10 72 / 20%)",
          }}
        >
          {/* Gold top accent line */}
          <div
            className="h-[2px] w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.73 0.10 72), transparent)",
            }}
          />

          {/* Profile header section */}
          <div className="flex flex-col items-center pt-8 pb-6 px-6 relative">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative mb-4"
            >
              <div
                className="w-28 h-28 rounded-full overflow-hidden"
                style={{
                  boxShadow:
                    "0 0 0 3px oklch(0.73 0.10 72), 0 0 20px oklch(0.73 0.10 72 / 30%)",
                }}
              >
                <img
                  src="/assets/uploads/screenshot_20260329-110411_chrome-019d3822-ff7c-735b-ab58-5cc0ea4e14c0-1.jpg"
                  alt="Nagarajan profile"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  background: "oklch(0.73 0.10 72)",
                  boxShadow: "0 0 8px oklch(0.73 0.10 72 / 50%)",
                }}
              >
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
            </motion.div>

            {/* Name & title */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <h1
                className="text-2xl font-bold tracking-[0.15em] uppercase mb-1"
                style={{
                  color: "oklch(0.73 0.10 72)",
                  textShadow: "0 0 20px oklch(0.73 0.10 72 / 30%)",
                }}
              >
                {PROFILE.name}
              </h1>
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase mb-2"
                style={{ color: "oklch(0.60 0.08 72)" }}
              >
                {PROFILE.title}
              </p>
              <p className="text-xs text-muted-foreground italic">
                {PROFILE.tagline}
              </p>
            </motion.div>
          </div>

          {/* Divider */}
          <div
            className="mx-6 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.73 0.10 72 / 30%), transparent)",
            }}
          />

          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="px-6 py-4 space-y-2.5"
          >
            <ContactRow
              icon={Phone}
              label={PROFILE.phone}
              href={`tel:${PROFILE.phoneRaw}`}
            />
            <ContactRow
              icon={MessageCircle}
              label={PROFILE.phone}
              href={`https://wa.me/${PROFILE.phoneRaw.replace("+", "")}`}
            />
            <ContactRow
              icon={Mail}
              label={PROFILE.email}
              href={`mailto:${PROFILE.email}`}
            />
            <ContactRow icon={MapPin} label={PROFILE.location} />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="px-5 pb-5 grid grid-cols-2 gap-2"
          >
            {CTA_BUTTONS.map((btn, i) => (
              <CtaButton key={btn.id} button={btn} index={i} />
            ))}
          </motion.div>

          {/* QR Code */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mx-5 mb-5 flex flex-col items-center py-4 px-4 rounded-2xl"
            style={{
              background: "oklch(0.12 0.02 252)",
              border: "1px solid oklch(0.73 0.10 72 / 20%)",
            }}
          >
            <p
              className="text-[10px] font-bold tracking-[0.25em] uppercase mb-3"
              style={{ color: "oklch(0.73 0.10 72)" }}
            >
              Scan My QR Code
            </p>
            <div className="p-2 rounded-xl" style={{ background: "white" }}>
              <QRCodeSVG value={pageUrl} size={120} level="M" />
            </div>
          </motion.div>

          {/* Divider */}
          <div
            className="mx-6 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.73 0.10 72 / 30%), transparent)",
            }}
          />

          {/* Professional Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="px-6 py-5"
          >
            <h2
              className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2"
              style={{ color: "oklch(0.73 0.10 72)" }}
            >
              Professional Summary
            </h2>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {PROFILE.summary}
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="px-6 pb-5"
          >
            <h2
              className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3"
              style={{ color: "oklch(0.73 0.10 72)" }}
            >
              Key Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {PROFILE.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="text-[10px] font-medium py-0.5 px-2.5 rounded-full"
                  style={{
                    borderColor: "oklch(0.73 0.10 72 / 40%)",
                    color: "oklch(0.73 0.10 72)",
                    background: "oklch(0.73 0.10 72 / 8%)",
                  }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <div
            className="mx-6 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.73 0.10 72 / 30%), transparent)",
            }}
          />

          {/* Achievements + Social */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="px-6 py-5 grid grid-cols-2 gap-4"
          >
            {/* Achievements */}
            <div>
              <h2
                className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3"
                style={{ color: "oklch(0.73 0.10 72)" }}
              >
                Achievements
              </h2>
              <ul className="space-y-1.5">
                {PROFILE.achievements.map((achievement) => (
                  <li key={achievement} className="flex items-start gap-1.5">
                    <Trophy
                      size={10}
                      className="mt-0.5 shrink-0"
                      style={{ color: "oklch(0.73 0.10 72)" }}
                    />
                    <span className="text-[10px] text-muted-foreground leading-tight">
                      {achievement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h2
                className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3"
                style={{ color: "oklch(0.73 0.10 72)" }}
              >
                Connect With Me
              </h2>
              <div className="flex flex-wrap gap-2">
                {SOCIAL.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-110"
                    style={{
                      borderColor: "oklch(0.73 0.10 72 / 40%)",
                      background: "oklch(0.73 0.10 72 / 8%)",
                      color: "oklch(0.73 0.10 72)",
                    }}
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Gold bottom accent */}
          <div
            className="h-[2px] w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.73 0.10 72), transparent)",
            }}
          />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-[420px] px-5 py-4 text-center">
        <div className="flex items-center justify-center gap-4 mb-2">
          {["Privacy", "Terms", "About"].map((item) => (
            <button
              key={item}
              type="button"
              className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
        <Separator className="mb-2 opacity-20" />
        <p className="text-[10px] text-muted-foreground">
          &copy; {new Date().getFullYear()}. Built with &hearts; using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ElementType;
  label: string;
  href?: string;
}) {
  const content = (
    <span className="flex items-center gap-2.5">
      <span
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: "oklch(0.73 0.10 72 / 12%)",
          border: "1px solid oklch(0.73 0.10 72 / 30%)",
        }}
      >
        <Icon size={13} style={{ color: "oklch(0.73 0.10 72)" }} />
      </span>
      <span className="text-xs text-foreground/80">{label}</span>
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:opacity-80 transition-opacity"
      >
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
}
