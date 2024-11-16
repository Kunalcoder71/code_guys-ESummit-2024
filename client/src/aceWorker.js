// aceWorker.js
const workerPath = `${process.env.PUBLIC_URL}/workers/worker-javascript.js`;

const worker = new Worker(workerPath);
export default worker;
