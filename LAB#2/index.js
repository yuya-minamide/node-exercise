import http from "http";
import fs from "fs";
import url from "url";

// const server = http.createServer();
// server.on("request", (req, res) => {
// 	const url = req.url;
// 	if (url === "/") {
// 		res.setHeader("Content-type", "text/html");
// 		res.write(`
//             <h1>Hello Node!</h1>
//             <ul>
//                 <li><a href="/read-message">Read Message</a></li>
//                 <li><a href="/write-message">Write Message</a></li>
//             </ul>
//         `);
// 	} else if (url === "/read-message") {
// 		const text = fs.readFileSync("text.txt", "utf8", (err) => {
// 			if (err) {
// 				console.error(err);
// 			}
// 		});
// 		res.writeHead(200, { "Content-Type": "text/html" });
// 		res.write(`
//         <ul>
//             <li><a href="/">Home</a></li>
//             <li><a href="/write-message">Write Message</a></li>
//         </ul>
//             <h1>${text}</h1>
//         `);
// 	} else if (url === "/write-message") {
// 		if (req.method === "GET") {
// 			res.writeHead(200, { "Content-Type": "text/html" });
// 			res.write(`
//             <ul>
//                 <li><a href="/">Home</a></li>
//                 <li><a href="/read-message">Read Message</a></li>
//             </ul>
//                 <form action='/write-message' method='post'>
//                     <input type='text' name='text'/>
//                     <button type='submit'>Submit</button>
//                 </form>
//             `);
// 		} else if (req.method === "POST") {
// 			const chunks = [];
// 			req.on("data", (chunk) => chunks.push(chunk));
// 			req.on("end", () => {
// 				const data = Buffer.concat(chunks).toString();
// 				const text = data.substring(data.indexOf("=") + 1);
// 				fs.writeFile("text.txt", text, (err) => {
// 					if (err) {
// 						console.error(err);
// 					}
// 				});
// 			});
// 			res.writeHead(301, {
// 				Location: "/",
// 			});
// 		}
// 	}
// 	res.end();
// });

// server.listen(8000, function () {
// 	console.log("Server start at port 8000");
// });

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
