## 强制删除文件

::: tip 基本思路
先查到进程id,kill就可以正常删除了
:::
``` python
import os
import shutil
import psutil


def kill_process(path):
    """
    杀死指定路径下所有占用该路径的进程
    """
    for process in psutil.process_iter():
        try:
            process_path = process.cwd()
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            continue
        if process_path.startswith(path):
            os.kill(process.pid, 9)


def force_delete_folder(path):
    """
    强制删除指定文件夹及其下所有文件和子文件夹
    """
    """
      强制删除指定文件夹及其下所有文件和子文件夹
      """
    max_tries = 5  # 最大尝试次数
    for i in range(max_tries):
        try:
            kill_process(path)
            shutil.rmtree(path, ignore_errors=False, onerror=None)
        except Exception as e:
            print(f"删除 {path} 失败，尝试次数 {i + 1} / {max_tries}，错误信息：{e}")
            continue
        else:
            print(f"成功删除 {path} 及其下所有文件和子文件夹！")
            break


# 示例：删除名为 "example" 的文件夹及其下所有文件和子文件夹
folder_path = r"F:\Program Files\finalshell"
force_delete_folder(folder_path)

```