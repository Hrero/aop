const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 定义工具信息
const tools = [
  {
    name: 'myTool',
    description: '这是我的自定义工具',
    parameters: {
      type: 'object',
      properties: {
        input: {
          type: 'string',
          description: '输入参数'
        }
      },
      required: ['input']
    }
  }
];

// 定义服务器信息
const serverInfo = {
  name: 'My Custom API Server',
  version: '1.0.0',
  description: '这是我的自定义API服务器'
};

// 获取服务器信息
app.get('/api/info', (req, res) => {
  res.json(serverInfo);
});

// 获取工具列表
app.get('/api/tools', (req, res) => {
  res.json({ tools });
});

// 调用工具
app.post('/api/tools/myTool', (req, res) => {
  const { input } = req.body;
  
  // 验证参数
  if (!input) {
    return res.status(400).json({
      error: {
        message: '缺少必要参数: input'
      }
    });
  }
  
  // 处理请求
  const result = `处理结果: ${input}`;
  
  // 返回响应
  res.json({
    result,
    status: 'success'
  });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API服务器运行在端口 ${PORT}`);
});
