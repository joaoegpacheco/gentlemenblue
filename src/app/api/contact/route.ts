import { Resend } from "resend";

const CONTACT_TO = "falecom@gentlemenblue.com.br";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parsePayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") return null;

  const data = body as Record<string, unknown>;
  const name = data.name;
  const email = data.email;
  const phone = data.phone;
  const message = data.message;

  if (
    !isNonEmptyString(name) ||
    !isNonEmptyString(email) ||
    !isNonEmptyString(phone) ||
    !isNonEmptyString(message)
  ) {
    return null;
  }

  return {
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    message: message.trim(),
  };
}

function buildEmailText(data: ContactPayload) {
  return [
    "Novo contato pelo site Gentlemen Blue",
    "",
    `Nome: ${data.name}`,
    `E-mail: ${data.email}`,
    `Telefone: ${data.phone}`,
    "",
    "Mensagem:",
    data.message,
  ].join("\n");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "Email service is not configured." },
      { status: 503 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const data = parsePayload(body);

  if (!data) {
    return Response.json(
      { error: "Missing or invalid form fields." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return Response.json({ error: "Invalid email address." }, { status: 400 });
  }

  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Gentlemen Blue <onboarding@resend.dev>";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: CONTACT_TO,
      replyTo: data.email,
      subject: `Contato — ${data.name}`,
      text: buildEmailText(data),
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Failed to send email." },
      { status: 502 },
    );
  }
}
