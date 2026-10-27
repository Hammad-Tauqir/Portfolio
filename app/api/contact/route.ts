import nodemailer from "nodemailer";

const projectTypes = new Set([
  "Website",
  "Web app",
  "Automation",
  "AI assistant",
  "Something else",
]);

type Enquiry = {
  name?: unknown;
  email?: unknown;
  projectType?: unknown;
  message?: unknown;
  website?: unknown;
};

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return Response.json({ error: "Send the enquiry as JSON." }, { status: 415 });
  }
  if (Number(request.headers.get("content-length")) > 16000) {
    return Response.json({ error: "Enquiry is too large." }, { status: 413 });
  }

  let body: Enquiry;
  try {
    const raw = await request.text();
    if (raw.length > 16000) {
      return Response.json({ error: "Enquiry is too large." }, { status: 413 });
    }
    body = JSON.parse(raw) as Enquiry;
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Invalid enquiry." }, { status: 400 });
  }
  if (body.website) {
    return Response.json({ message: "Your enquiry was sent successfully." });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const projectType = body.projectType ?? "";
  const errors: Record<string, string> = {};

  if (name.length < 2 || name.length > 100) {
    errors.name = "Enter a name between 2 and 100 characters.";
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (typeof projectType !== "string" || (projectType !== "" && !projectTypes.has(projectType))) {
    errors.projectType = "Select a valid service or leave it blank.";
  }
  if (message.length < 20 || message.length > 5000) {
    errors.message = "Enter project details between 20 and 5000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "Check the highlighted fields.", fields: errors }, { status: 400 });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const recipient = process.env.CONTACT_TO_EMAIL;

  if (!smtpUser || !smtpPassword || !recipient) {
    return Response.json(
      { error: "Email delivery is not configured yet. Your enquiry was not sent." },
      { status: 503 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: smtpUser, pass: smtpPassword },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
    const result = await transporter.sendMail({
      from: { name: "Portfolio Enquiry", address: smtpUser },
      to: recipient,
      replyTo: { name, address: email },
      subject: `New portfolio enquiry${projectType ? `: ${projectType}` : ""}`,
      text: `Name: ${name}\nEmail: ${email}\nService: ${projectType || "Not specified"}\n\nProject details:\n${message}`,
    });

    if (result.rejected.length > 0) {
      throw new Error("SMTP rejected the recipient");
    }

    return Response.json({ message: "Your enquiry was sent successfully." });
  } catch (error) {
    console.error("Contact email delivery failed:", error);
    return Response.json(
      { error: "Email could not be sent right now. Please try again later." },
      { status: 502 },
    );
  }
}
