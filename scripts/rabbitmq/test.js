var amqp = require("amqplib");
var queue = "hellotes53";
var send_at;

async function main() {
	const conn = await amqp.connect("amqp://localhost");
	const recv_ch = await conn.createChannel();
	await recv_ch.assertQueue(queue);

	recv_ch.consume(
		queue,
		function (msg) {
			if (msg !== null) {
				console.log(`received ${msg.content.toString()} with latency of ${Date.now() - send_at}ms`);
			}
		},
		{ noAck: true }
	);

	const send_ch = await conn.createChannel();
	// await send_ch.assertQueue(queue);

	setInterval(() => {
		send_at = Date.now();
		send_ch.sendToQueue(queue, Buffer.from("hello"));
	}, 100);
}

main();
