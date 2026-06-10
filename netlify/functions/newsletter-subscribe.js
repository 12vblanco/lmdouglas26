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

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
    const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;

    const payload = {
      email,
      fields: { name },
      groups: MAILERLITE_GROUP_ID ? [MAILERLITE_GROUP_ID] : [],
      status: "active",
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
