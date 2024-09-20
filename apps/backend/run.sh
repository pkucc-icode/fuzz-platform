#!/bin/bash
cd sh
rm -rf *output*
rm -rf crash_*

# 检查是否提供了参数
if [ -z "$1" ]; then
    echo "Error: No configuration file name provided."
    exit 1
fi

# 构造JSON文件名
json_file="config-$1.json"


# 执行Python脚本并捕获错误
if ! python3 agent.py "$json_file"; then
    # 如果命令执行失败，则打印错误信息
    echo "Error: Failed to execute python3 agent.py $json_file"
    cd ..
    python3 callback.py $1 "FAIL"
    exit 1
fi

cd ..
python3 callback.py $1 "SUCCESS"
echo "Script executed successfully."