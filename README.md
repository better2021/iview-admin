## 配置代码检查与格式化

vscode 安装插件 `Prettier、Vetur、ESlint`。

配置全局 `setting.json`:

```json
"prettier.disableLanguages": [],
"prettier.eslintIntegration": true,
"eslint.autoFixOnSave": true,
"eslint.alwaysShowStatus": true,
"eslint.validate": [
  "javascript",
  "javascriptreact",
  {
    "language": "vue",
    "autoFix": true
  }
]
```

配置工作区 `setting.json`:

```json
"settings": {
  "eslint.validate": [
    "javascript", { "autoFix": true, "language": "vue" }
  ]
}
```
