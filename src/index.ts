import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  // const httpUrl = "http://pg-redirector.pinnacle.in/?url=";
  // const httpsUrl = "https://pg-redirector.pinnacle.in/?url=";
  // const url = c.req.url.replace(httpUrl, "").replace(httpsUrl, "");
  // if (!url) {
  //   return c.text("No url query parameter provided", 400);
  // }

  const html = `
      <html>
        <head>
          <meta name="referrer" content="origin-when-cross-origin">
        </head>
        <script>
            window.onload = () => {
                console.log(window.location);

                const newUrl = window.location.search.replace('?url=','');

                if (newUrl.includes('https://')) {
                  window.location.href = newUrl;
                } else {
                  document.body.innerHtml = "OK"
                }
            };
        </script>
    </html>
          `;
  return c.html(html);

  // return c.redirect(url, 302);
});

const port: number = Number(process.env.PORT) || 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
