import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  const httpUrl = "http://pg-redirector.pinnacle.in/?url=";
  const httpsUrl = "https://pg-redirector.pinnacle.in/?url=";
  const url = c.req.url.replace(httpUrl, "").replace(httpsUrl, "");
  // console.log({ url, httpUrl, httpsUrl, originalUrl: c.req.url });
  if (!url) {
    return c.text("No url query parameter provided", 400);
  }

  // TODO: check correct headers
  c.header("Referer", "https://pg-redirector.pinnacle.in");
  // const html = `
  //      <html>
  //      <script>
  //          // For testing we have hardo coded the gerated URl
  //          window.onload = () => {
  //              window.open('${url}', 'blank');
  //          };
  //      </script>
  //  </html>
  //    `;
  // return c.html(html);

  // Redirect to URL
  // return c.json({ url, httpUrl, httpsUrl, originalUrl: c.req.url });
  console.log("Redirecting to", { url });
  return c.redirect(url, 302);
});

// 'https://pg-redirector.pinnacle.in?url=https://eazypay.icicibank.com/EazyPG?merchantid=380434&mandatory%20fields=FxNBSG2ExM+Kd2ZBgwbv676qugWSt7QnLlMIYCWOKMOCpB4hocAXom8IRe+B3QnC41G8E0/AmqLan3GkKFWD3Gdk2C+T+XYij7vhiZRHZmOH1n4ajajWlcANJd+N+YKb&optional%20fields=&returnurl=+v8Sy0DlYG4C5aR3exIBj/PlBW9Rg0vqpTnX5pdmYjTknbzt7wQVmjj4vdV/GgZiBKZLhc3EidALCTr13o7x8g==&Reference%20No=FxNBSG2ExM+Kd2ZBgwbv64C6RpLSCPpwrmN8+dwfKn4=&submerchantid=n90IDg3NgmCgEZY7g2Vx3w==&transaction%20amount=6V8rD7ZYC7M0utjI8mRdrQ==&paymode=QgWpFZs6A1KsQ9KcLmXWSQ=='

const port: number = Number(process.env.PORT) || 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
