import formidable from 'formidable';
import fs from 'fs';
import { join } from 'path';

// 禁用 Nuxt 自带的 body 解析器，使用 formidable 自行解析
export const config = {
  api: {
    bodyParser: false,
  },
};


export default eventHandler(async (event) => {
   // 定义文件上传的目录
   const uploadDir = join(process.cwd(), 'uploads');

   // 确保上传目录存在，如果不存在则创建
   if (!fs.existsSync(uploadDir)) {
     fs.mkdirSync(uploadDir, { recursive: true });
   }
 
   // 初始化 formidable
   const form = formidable({
     multiples: true,
     uploadDir: uploadDir, // 文件上传的目标目录
     keepExtensions: true, // 保留文件扩展名
   });

   // 解析请求中的文件
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

  // 输出解析的表单字段和文件信息（可选）
  console.log(fields);
  console.log(files);
  
  return useResponseSuccess("OK");
});
