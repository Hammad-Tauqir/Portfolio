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
};

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return Response.json({ error: "Send the enquiry as JSON." }, { status: 415 });
  }

  let body: Enquiry;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Invalid enquiry." }, { status: 400 });
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

  return Response.json(
    { error: "Email delivery is not configured yet. Your enquiry was not sent." },
    { status: 503 },
  );
}
