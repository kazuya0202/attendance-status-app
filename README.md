# Attendance Status App

# プロジェクトについて

- パッケージマネージャー：`yarn`
- 仮想環境             :`docker`

## 技術スタック

- Next.js (App Router)
- MUI
- Tailwindcss
- Firebase
   - Firestore
   - Firebase Authentication
- Zustand
- Docker

# ローカル環境のセットアップ

## リポジトリのクローン

```shell
git clone https://github.com/kazuya0202/attendance-status-app
```

## Firebase

1. Firebaseにログイン
2. attendance-status-app-… のコンソールに移動
3. サイドバーの「プロジェクトの概要」右横にある設定アイコンから「プロジェクトの設定」をクリック
4. 「全般」 > 「マイアプリ」 > 「SDKの設定と構成」にあるコード（API Tokenなど）を取得
   - 必要なのは`firebaseConfig`内のToken
1. 4 で取得したTokenをもとに`.env`ファイルを作成する
   - `.env`はプロジェクトのルートに配置する
   - 下記以外の命名の詳細は、`lib/firebase.ts`の`firebaseConfig`部分を参照

```plaintext
NEXT_PUBLIC_FIREBASE_API_KEY=**********
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=**********
...
```

##



## モジュールのインストール

- ターミナルでコマンドを実行

```other
yarn
```

## 開発モードの実行

- ターミナルでコマンドを実行

```shell
yarn dev
```

- 起動後、http://localhost:3000 にアクセスする

---

## Dockerによる起動

- ターミナルでコマンドを実行

```other
docker-compose build
```

```other
docker-compose up -d
```
---


※ ここから下はFirebaseにデプロイするタイミングで必要になります。localhostで開発をするだけの場合は、行う必要はないです。

## Firebaseローカル

- ログイン
   - ブラウザが開くので、Firebaseで使用しているGoogleアカウントを選択してログインする

```other
yarn firebase login
```

- ターミナル

```other
yarn firebase init
```

- 以下の項目にチェック
   - Firestore: Configure security rules and indexes …
   - Hoting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys

# デプロイ

```shell
yarn deploy
# == next build && firebase deploy --only hosting
```

- ホスティング先：Firebase Hosting


# イメージ画面

![イメージ1](https://github.com/kazuya0202/attendance-status-app/assets/36531857/256bc015-4390-4a0e-afb9-4832c20a08b3)

![イメージ2](https://github.com/kazuya0202/attendance-status-app/assets/36531857/0c98cf16-bac5-43a7-b721-a4a1aed8db2d)
