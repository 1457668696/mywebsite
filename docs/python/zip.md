## 批量加密压缩

::: tip 基本思路
有好几个版本，好像就这个可以用
:::
``` python
import os
import pyzipper


def zip_file(file_path, password):
    base_name = os.path.basename(file_path)
    zip_filename = f"{base_name}.zip"

    with pyzipper.AESZipFile(zip_filename, 'w', compression=pyzipper.ZIP_DEFLATED, encryption=pyzipper.WZ_AES) as zipf:
        zipf.setpassword(password.encode())
        zipf.write(file_path, arcname=base_name)

    return zip_filename


# 压缩目录下的所有文件
directory_path = "/path/to/directory"  # 将此处路径替换为要压缩的目录路径
password = "javbus"  # 设置密码，设为None或空字符串("")表示不设置密码

for root, _, files in os.walk(directory_path):
    for file in files:
        file_path = os.path.join(root, file)
        compressed_file = zip_file(file_path, password)
        print(f"压缩完成，压缩文件为: {compressed_file}")
```