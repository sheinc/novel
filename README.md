# SHE Novel

## Description

このレポジトリは、[steven-tey/novel](https://github.com/steven-tey/novel) から Fork されたものです。

## Getting Started

詳細は本体の README.md を参照してください。

### Prerequisites

Node.js と pnpm をインストールしてください。

- [Node.js](https://nodejs.org/en/) (v18)
- [pnpm](https://pnpm.io/) (v8)

### Installation

```bash
pnpm install
```

### Run the App

以下のコマンドで Novel が起動します。

```bash
pnpm run dev
```

## Contributing

### Branches

このレポジトリには、以下のブランチがあります。

- main: original の steven-tey/novel から Fork したもの。Commit はせず read only です。
- she-main: 機能開発はこちらのブランチからチェックアウトして行います。
- release: 本番のブランチ。Package として配布されています。

### How to Contribute

1. she-main ブランチから、機能開発用のブランチを作成します。
2. 機能開発用のブランチで、機能を実装します。
3. 機能開発用のブランチから、she-main ブランチに Pull Request を作成します。
4. Pull Request が承認されたら、she-main ブランチにマージします。
5. release ブランチ向けに、she-main ブランチから Pull request が自動で作成されます。
6. 5 をマージするし、https://github.com/sheinc/novel/actions/workflows/publish.yml からリリース作業をします。

https://github.com/sheinc/novel/actions/workflows/publish.yml では、patch, minor, major からバージョンを指定してリリースをします。<br>
※ version は git tag によって管理されており、packages/core/package.json の version は無関係です。

<img width="413" alt="Screenshot 2025-06-30 at 12 41 27" src="https://github.com/user-attachments/assets/183ad507-0fee-47b0-87f0-e70e1d0769b5" />

### Caution

3 で Pull Request を作成する際に、以下の点に注意してください。

- デフォルトでは本体の main ブランチに向けて Pull Request を作成するようにガイドされます。本体の main ブランチには、PR を作成しないようにしてください。
  https://github.com/sheinc/novel/compare/she-main...sheinc:novel をブックマークしておくと便利です。 
