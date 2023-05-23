import http from "http";
import fs from "fs";
import url from "url";

const server = http.createServer((req, res) => {
	console.log(`Request received from ${req.url}`);

	const parsedUrl = url.parse(req.url, true);
	const path = parsedUrl.pathname;

	if (path === "/") {
		res.writeHead(200, { "Content-Type": "text/html" });
		res.write("<h1>Hello Node!</h1>");
		res.write('<a href="http://localhost:8000/read-message">Read Message</a><br>');
		res.write('<a href="http://localhost:8000/write-message">Write Message</a>');
		res.end();
	} else if (path === "/read-message") {
		fs.readFile("message.txt", "utf8", (err, data) => {
			if (err) {
				res.writeHead(500, { "Content-Type": "text/html" });
				res.write("Error reading the message file");
				res.end();
			} else {
				res.writeHead(200, { "Content-Type": "text/html" });
				res.write(`<h1>Message:</h1><p>${data}</p>`);
				res.end();
			}
		});
	} else if (path === "/write-message") {
		if (req.method === "POST") {
			let body = "";
			req.on("data", (chunk) => {
				body += chunk;
			});

			req.on("end", () => {
				fs.writeFile("message.txt", body, (err) => {
					if (err) {
						res.writeHead(500, { "Content-Type": "text/html" });
						res.write("Error writing to the message file");
						res.end();
					} else {
						res.writeHead(200, { "Content-Type": "text/html" });
						res.write("<h1>Message written successfully!</h1>");
						res.end();
					}
				});
			});
		} else {
			res.writeHead(200, { "Content-Type": "text/html" });
			res.write(`
        <h1>Write Message</h1>
        <form method="POST" action="/write-message">
          <input type="text" name="message" placeholder="Enter your message" />
          <button type="submit">Submit</button>
        </form>
      `);
			res.end();
		}
	} else {
		res.writeHead(404, { "Content-Type": "text/html" });
		res.write("Page not found");
		res.end();
	}
});

server.listen(8000, () => {
	console.log("Server is running on port 8000");
});
