# LiMA 项目主页

GitHub 仓库：[ccdcs/LiMA_repo](https://github.com/ccdcs/LiMA_repo)

GitHub Pages 地址：[LiMA 项目主页](https://ccdcs.github.io/LiMA_repo/)

## 页面内容

当前页面包含完整标题、作者与单位、主视频、Abstract 与 teaser 图、Method 方法图、Experiments 分析图与六个主实验视频、主实验表，以及四个 Generalization 视频。

标题中的 LiMA 使用 Fredoka 圆体粗字，其他标题文字使用 Times New Roman。桌面端标题分为两行，标题区域为浅绿色背景。Method 图下方的文字按要求留空，后续可在 `index.html` 中补充。

## 修改文件

- `index.html`：文字、作者、图片与视频引用、实验表。
- `static/css/index.css`：字体、颜色和布局。
- `static/js/index.js`：视频轮播和页面交互。
- `static/images/`：网页图片。
- `static/videos/`：网页视频。
- `static/pdfs/`：图片对应的 PDF 原文件。

本目录就是后续修改和推送所使用的 Git 工作目录。替换素材时保持文件名一致，或同步更新 HTML 中的引用。文件名大小写必须匹配。

## 本地预览

在本目录运行：

```sh
python3 -m http.server 8000
```

浏览器打开 <http://localhost:8000>。

## 发布更新

检查修改后，在本目录运行：

```sh
git status
git add index.html static README.md GUIDE_CN.md .gitignore .nojekyll
git commit -m "Update LiMA project page"
git push origin main
```

GitHub Pages 使用 `main` 分支的根目录发布。推送后可在仓库的 Actions 页面查看构建状态；网页更新通常不是即时生效。

如果尚未启用 Pages，在仓库的 Settings → Pages 中选择 Deploy from a branch，分支选 `main`，目录选 `/ (root)`。`.nojekyll` 应保留，以便直接发布静态资源。

论文中使用上方的 GitHub Pages 网页地址。只要账号名和仓库名不变，修改内容后该地址仍可继续使用。

## 模板来源

本页面基于 [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template)，该模板采用 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 许可证。请保留网页页脚中的模板来源和许可证说明。
