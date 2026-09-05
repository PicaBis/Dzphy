// ============================================================================
// DzPhy — Transactional email (Resend), guarded
// ----------------------------------------------------------------------------
// SERVER-SIDE ONLY. Returns { sent: false, reason: "not_configured" } instead
// of throwing when RESEND_API_KEY is absent, so the contact form still works
// (message is still saved) even without an email provider wired up.
// ============================================================================
import { Resend } from "resend";

export const isEmailConfigured = Boolean(process.env.RESEND_API_KEY);

export async function sendContactNotification(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!apiKey || !adminEmail) {
    return { sent: false, reason: "not_configured" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "DzPhy <onboarding@resend.dev>",
      to: adminEmail,
      replyTo: params.email,
      subject: `[DzPhy Contact] ${params.subject}`,
      html: `
        <div dir="rtl" style="font-family: sans-serif;">
          <h2>رسالة جديدة من نموذج التواصل</h2>
          <p><strong>الاسم:</strong> ${escapeHtml(params.name)}</p>
          <p><strong>البريد:</strong> ${escapeHtml(params.email)}</p>
          <p><strong>الموضوع:</strong> ${escapeHtml(params.subject)}</p>
          <hr />
          <p>${escapeHtml(params.message).replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error.message);
      return { sent: false, reason: "provider_error" };
    }
    return { sent: true };
  } catch (err) {
    console.error("Email send failed:", err);
    return { sent: false, reason: "exception" };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
