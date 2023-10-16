## 强制删除文件

::: tip 基本思路
GTP生成可用，且常用放在这里
:::
``` python
import os

def remove_pdf_string(directory_path):
    for root, _, files in os.walk(directory_path):
        for file in files:
            if ".pdf" in file:
                file_path = os.path.join(root, file)
                new_file_name = file.replace(".pdf", "")
                new_file_path = os.path.join(root, new_file_name)
                os.rename(file_path, new_file_path)
                print(f"文件重命名：{file} -> {new_file_name}")

# 目录路径
directory_path = r"C:\Users\wxm\Desktop\新建文件夹"  # 将此处路径替换为目标目录的实际路径

remove_pdf_string(directory_path)
```