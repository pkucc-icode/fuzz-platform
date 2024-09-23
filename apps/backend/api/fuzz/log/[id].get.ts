import fs from 'fs';
import path from 'path';
import prisma from '~/lib/prisma';

export default eventHandler((event) => {

    const id = getRouterParam(event, 'id');
    const logFilePath = path.resolve(`sh/run-${id}.log`);

    event.node.res.setHeader('Content-Type', 'text/event-stream');
    event.node.res.setHeader('Cache-Control', 'no-cache');
    event.node.res.setHeader('Connection', 'keep-alive');

    const sendLogData = (data: string) => {
        event.node.res.write(`data: ${data}\n\n`);
    };

    // 这是必须的，需要和客户端建立连接
    sendLogData(`[  1%] Building Fuzz Task Start .........`);

    fs.readFile(logFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('读取日志文件出错:', err);
            return;
        }

        const lines = data.split('\n');

        if (lines) {
            lines.forEach((line, index) => {
                // console.log(`行 ${index + 1}: ${line}`);
                sendLogData(line);
            });
        }

    });


    let fileSize = fs.statSync(logFilePath).size;

    // 监视日志文件的变化
    const watcher = fs.watch(logFilePath, (eventType) => {
        if (eventType === 'change') {
            const newSize = fs.statSync(logFilePath).size;
            if (newSize > fileSize) {
                const stream = fs.createReadStream(logFilePath, {
                    start: fileSize,
                    end: newSize,
                    encoding: 'utf-8',
                });

                let buffer = '';

                stream.on('data', (chunk) => {
                    buffer += chunk;
                });

                stream.on('end', () => {
                    sendLogData(buffer);
                    fileSize = newSize; // 更新文件大小
                });
            }

        }
    });

    event.node.req.on('close', () => {
        console.warn('closed');
        watcher.close();
    });
});
