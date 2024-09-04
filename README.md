# plugin-webdav

Halo 2.0 接入 webDav 的插件，alist已测试通过，需要取消存储的签名。

## 开发环境

```bash
git clone https://github.com/knifezred/plugin-webdav
```

```bash
cd path/to/plugin-webdav
```

```bash
./gradlew build
```

修改 Halo 配置文件：

```yaml
halo:
  plugin:
    runtime-mode: development
    classes-directories:
      - "build/classes"
      - "build/resources"
    lib-directories:
      - "libs"
    fixedPluginPath:
      - "/path/to/plugin-webdav"
```

## 安装与使用

1. 进入 [Releases](https://github.com/knifezred/plugin-webdav/releases) 下载最新版本的 JAR 文件。
2. 在 Halo 后台的插件管理上传 JAR 文件进行安装。
3. 启动该插件之后，需要在设置中配置 webdav 的 url,username,password等参数，详情可查阅：<https://alist.nn.ci/zh/guide/webdav.html>
4. 完成配置后，在后台任意位置选择附件的弹框中选择 WebDAV 选项卡，即可使用 WebDAV 的图片。

## 声明

此插件不提供内容，WebDAV需自行搭建。

## 截图

| ![](./screenshots/unsplash00004.png) | ![](./screenshots/unsplash00005.png) | ![](./screenshots/unsplash00002.png) |
| ------------------------------------ | ------------------------------------ | ------------------------------------ |
| ![](./screenshots/unsplash00003.png) | ![](./screenshots/unsplash00001.png) | ![](./screenshots/unsplash00006.png) |
