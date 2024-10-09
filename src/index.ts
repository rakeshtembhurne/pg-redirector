import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  const url = c.req.query("url");
  if (!url) {
    return c.text("No url query parameter provided", 400);
  }

  // TODO: check correct headers
  // const referer = new URL(url).origin;
  // c.header("Referer", referer);

  // Redirect to URL
  return c.redirect(url, 302);
});

const port: number = Number(process.env.PORT) || 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
