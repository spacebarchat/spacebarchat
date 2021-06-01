import http from "http";
import cluster from "cluster";

import { FosscordServer as APIServer } from "@fosscord/api";
import { Server as GatewayServer } from "@fosscord/gateway";
import { CDNServer } from "@fosscord/cdn";
import express from "express";
import { Config } from "@fosscord/server-util";

const app = express();
const server = http.createServer(app);
const port = 8080;
const production = true;

const api = new APIServer({ server, port, production, app });
// const cdn = new CDNServer({ server, port, production, app });
const gateway = new GatewayServer({ server, port });

async function main() {
	await Promise.all([api.start(), gateway.listen()]);

	if (!Config.get().gateway.endpoint) await Config.set({ gateway: { endpoint: `ws://localhost:${port}` } });
	if (!Config.get().cdn.endpoint) await Config.set({ cdn: { endpoint: `http://localhost:${port}` } });
}

main().caught();
