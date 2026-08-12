// netlify/functions/newsletter-subscribe.js
export default async (req, context) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const text = await req.text();
    const params = new URLSearchParams(text);
    const email = params.get("email");
    const name = params.get("name");
    const turnstileToken = params.get("turnstileToken");

    // Basic email validation — cheap first gate before any external calls.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      return new Response(JSON.stringify({ error: "A valid email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Cloudflare Turnstile: verify the token server-side. Bots that POST directly to
    // this endpoint (bypassing the browser widget) have no valid token and are rejected
    // here, before we ever touch MailerLite.
    const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
    if (!turnstileToken) {
      return new Response(
        JSON.stringify({ error: "Verification required" }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    const remoteIp =
      req.headers.get("x-nf-client-connection-ip") ||
      req.headers.get("x-forwarded-for") ||
      "";
    const verifyBody = new URLSearchParams({
      secret: TURNSTILE_SECRET_KEY || "",
      response: turnstileToken,
    });
    if (remoteIp) verifyBody.set("remoteip", remoteIp);

    // 10s timeout so a Cloudflare network hiccup can't hang the function.
    const verifyController = new AbortController();
    const verifyTimeout = setTimeout(() => verifyController.abort(), 10000);
    let verifyData;
    try {
      const verifyRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: verifyBody.toString(),
          signal: verifyController.signal,
        },
      );
      verifyData = await verifyRes.json();
    } catch (err) {
      console.error("Turnstile verify request failed:", err);
      return new Response(
        JSON.stringify({ error: "Verification unavailable" }),
        { status: 503, headers: { "Content-Type": "application/json" } },
      );
    } finally {
      clearTimeout(verifyTimeout);
    }

    if (!verifyData.success) {
      console.warn("Turnstile verification failed:", verifyData["error-codes"]);
      return new Response(
        JSON.stringify({ error: "Verification failed" }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    // Bind the token to this form: the widget was rendered with action "newsletter",
    // so reject a valid token minted for a different action.
    if (verifyData.action !== "newsletter") {
      console.warn("Turnstile action mismatch:", verifyData.action);
      return new Response(
        JSON.stringify({ error: "Verification failed" }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    // Optional hostname allowlist. Set TURNSTILE_HOSTNAMES (comma-separated) to pin the
    // token to your own domains; left unset it's skipped so deploy previews keep working.
    const allowedHostnames = (process.env.TURNSTILE_HOSTNAMES || "")
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean);
    if (allowedHostnames.length && !allowedHostnames.includes(verifyData.hostname)) {
      console.warn("Turnstile hostname not allowed:", verifyData.hostname);
      return new Response(
        JSON.stringify({ error: "Verification failed" }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
    const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;
    const payload = {
      email,
      fields: { name },
      groups: MAILERLITE_GROUP_ID ? [MAILERLITE_GROUP_ID] : [],
      status: "unconfirmed",
    };

    const mlResponse = await fetch(
      "https://connect.mailerlite.com/api/subscribers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MAILERLITE_API_KEY}`,
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    if (!mlResponse.ok) {
      const errorData = await mlResponse.json();
      console.error("MailerLite error:", errorData);
      return new Response(
        JSON.stringify({ error: "MailerLite subscription failed" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Function error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/newsletter-subscribe",
};
