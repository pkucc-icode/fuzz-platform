import fs from 'fs';
import path from 'path';

export default eventHandler((event) => {
  const logFilePath = path.resolve('run.log');

  event.node.res.setHeader('Content-Type', 'text/event-stream');
  event.node.res.setHeader('Cache-Control', 'no-cache');
  event.node.res.setHeader('Connection', 'keep-alive');

  const sendLogData = (data: string) => {
    event.node.res.write(`data: ${data}\n\n`);
  };


  sendLogData('FUZZ LOG START');

  let fileSize = fs.statSync(logFilePath).size;

  // 监视日志文件的变化
  const watcher = fs.watch(logFilePath, (eventType) => {
    if (eventType === 'change') {
        const newSize = fs.statSync(logFilePath).size;
        console.log("size", newSize, fileSize);
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
