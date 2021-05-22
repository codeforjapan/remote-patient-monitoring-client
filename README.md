# remote-patient-monitoring-client

## Requirements
- node version 12.x
- yarn

## Project setup
```
yarn install
```

### Edit env files
`.env.development`または`.env.production`ファイルを編集して`VUE_APP_API_URI`を設定します。
[`remote-patient-monitoring-api`](https://github.com/codeforjapan/remote-patient-monitoring-api/)のアドレスを`/api/patient/`まで含めてセットしてください

### Compiles and hot-reloads for development
`.env.development`を設定した後、以下のコマンドで開発用の`vue-cli-service`のサーバーが`localhost:8080`に立ち上がります。
```
yarn serve
```

### Compiles and minifies for production
プロダクション用のファイルのビルドは以下のコマンドを実行してください
```
yarn build
```

AWSで動かしたい場合は[AWS Amplipy](https://aws.amazon.com/jp/amplify/)を使うと楽にデプロイできます

### Testing
テストする場合は[`remote-patient-monitoring-api`](https://github.com/codeforjapan/remote-patient-monitoring-api/)を利用して予めテストアカウントをつくり「ユーザID/パスワードでログインする」からログインするか、
[`remote-patient-monitoring-dashboard`](https://github.com/codeforjapan/remote-patient-monitoring-dashboard)でログインURLをつくってそこからログインするといいでしょう。

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
