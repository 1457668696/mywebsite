[[toc]]
## 快速启动LoL

::: tip 基本思路
直接坐标移动，因为是自用，所以随便点了，延迟可以久一点。
:::

### code
``` python
import subprocess
import time

import pyautogui

# 指定应用程序的路径（如果是一个可执行文件）
pathApp = "C:\Program Files (x86)\WeGame\wegame.exe"

# 打开应用程序
subprocess.Popen(pathApp)

time.sleep(4)
pyautogui.moveTo(2000, 1050)

pyautogui.click()

time.sleep(4)
pyautogui.moveTo(900, 250)
pyautogui.click()

pyautogui.moveTo(2400, 1550)
pyautogui.click()
```



::: tip 图标点击
也写了个图标点击的，但发现一个bug,终端运行似乎有延迟科，不能实时识别图标,因为没有安装open-python的原因，可以开启灰度识别,并且加入模糊识别
:::
``` python
import ctypes
import logging
import subprocess
import time
import logzero
from logzero import logger
import pyautogui
import sys

logzero.logfile(r"log.txt")


# 执行操作
def opengame():
    try:
        time.sleep(2)

        # 定位登录按钮
        path = r"1.png"
        x, y = pyautogui.locateCenterOnScreen(path, grayscale=True)
        pyautogui.click(x, y + 150)

    # 抛出异常
    except TypeError:
        logger.info("未找到用户")

    try:
        time.sleep(3)

        # 定位登录按钮
        path = r"2.png"
        x, y = pyautogui.locateCenterOnScreen(path, grayscale=True)
        pyautogui.click(x, y)

    # 抛出异常
    except TypeError:
        logger.info("未找到主页")

    try:
        time.sleep(0.5)

        # 定位登录按钮
        path = r"3.png"
        x, y = pyautogui.locateCenterOnScreen(path, grayscale=True)
        pyautogui.click(x, y)

    # 抛出异常
    except TypeError:
        logger.info("未找到登录按钮")


# 系统提权
def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()

    except OSError:
        return False


# 提权后操作
if is_admin():
    logging.info("成功获得管理员权限")
    # 指定应用程序的路径（如果是一个可执行文件）
    pathApp = r"C:\Program Files (x86)\WeGame\wegame.exe"

    # 打开应用程序
    subprocess.Popen(pathApp)

    logging.info("打开应用成功")
    time.sleep(2)
    opengame()

else:
    ctypes.windll.shell32.ShellExecuteW(None, "runas", sys.executable, __file__, None, 1)
```



```shell
pip install opencv-python
```


### 优化以及bug
- 暂无
