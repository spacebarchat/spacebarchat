// process.env.MONGOMS_DEBUG = "1";
import fs from "fs/promises";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import path from "path";
import cluster from "cluster";
import os from "os";

const cores = Number(process.env.threads) || 1 || os.cpus().length;

if (cluster.isMaster && !process.env.masterStarted) {
	const dbPath = path.join(__dirname, "..", "data", "db");

	const replicaSetName = "rs1";

	const mongod = new MongoMemoryReplSet({
		autoStart: false,

		replSet: {
			name: replicaSetName,
			dbName: "fosscord",
			storageEngine: "wiredTiger",
			count: 1,
		},
	});
	process.env.masterStarted = "true";

	(async () => {
		await fs.mkdir(dbPath, { recursive: true });

		await mongod.start();
		console.log(`[DB] started`);
		process.env.MONGO_URL = (await mongod.getUri()) + `replicaSet=${replicaSetName}&w=majority`;

		console.log(`Primary ${process.pid} is running`);

		// Fork workers.
		for (let i = 0; i < cores; i++) {
			cluster.fork();
		}

		cluster.on("exit", (worker: any, code: any, signal: any) => {
			console.log(`worker ${worker.process.pid} died, restart worker`);
			cluster.fork();
		});
	})();
} else {
	require("./server");
}
