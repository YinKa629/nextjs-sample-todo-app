### 0. 環境構築
* Node.jsインストール  
[参考サイト](https://fumidzuki.com/knowledge/4533/)を元に、Node.jsインストールを行う  
Node v18.16.0、npm v9.5.1  
注意：`nvm use <version>`コマンドはGit bashでは効かずCMDで行った 

* VS Codeインストール  
インストール済み拡張（随時アップデート）：  
    * Japanese Language Pack for Visual Studio Code  
    * ES7 React/Redux/GraphQL/React-N  
    * ESLint  
    * Prettier - Code formatter  

* StoryBookインストール
```
$ npx sb init
$ npm run storybook
```

### 1. アプリセットアップ
1. ブランクプロジェクト作成  
`$ npx create-next-app@latest --ts`

2. 起動確認
```
$ cd nextjs-sample-todo-app
$ npm run dev
```
3. TypeScriptの設定  
src以下に配置するアプリケーションのビルドが行われる様に、tsconfig.jsonファイルを編集
```
    "baseUrl": "src"
  },
  "include": ["next-env.d.ts", "src/**/*.ts", "src/**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
```