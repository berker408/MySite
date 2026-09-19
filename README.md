# Fan Qiao · 学术主页

独立静态网站，内容依据当前 `Fan_Qiao_CV.tex`。英文默认显示，右上角可切换中文；无需安装依赖。

预览：在此目录执行 `python3 -m http.server 8000`，打开 http://localhost:8000 。

内容在 `index.html`，样式在 `assets/site.css`，语言切换在 `assets/site.js`；更新简历时替换 `assets/Fan_Qiao_CV.pdf`。

发布到原网站：https://berker408.github.io/MySite/ 。本目录已连接原 `berker408/MySite` 仓库，沿用 `gh-pages` 分支发布。先提交本地改动并推送 `main`，再执行 `python3 scripts/publish.py`。脚本只发布 `index.html`、`assets/`、`.nojekyll`，保留发布历史，不强制推送。GitHub Pages 设置应为 Deploy from a branch → gh-pages → /(root)。

旧 MkDocs 源码保留在 Git 历史中（`0272fa5`），桌面的原网站目录未修改。站点使用相对路径，兼容仓库子路径。

AutoSurge 保留“稿件准备中”；未推定导师、作者顺序或正式学位专业名称。GitHub 地址来自旧站，论文 DOI 与作者信息来自已核对的简历。网页不展示电话号码；可下载的 PDF 保留原简历内容。
