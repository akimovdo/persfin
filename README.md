# DaisyUI PocketPages Starter Kit

This setup provides a minimal **PocketPages** app integrated with **Tailwind CSS** and **DaisyUI**.

## Installation

```bash
npx tiged benallfree/pocketpages/packages/starters/daisyui .
cd daisyui
npm i
npm run dev
pocketbase serve --dir=pb_data --dev
```

## Автоматическая пересборка контейнера после git pull

После любого `git pull` Docker образ автоматически пересобирается и контейнер перезапускается благодаря git hook `post-merge`.

Это происходит автоматически — дополнительных команд не требуется:

```bash
git pull
# 🐳 Building Docker image after git pull...
# 🚀 Starting containers...
# ✅ Rebuild complete!
```

Если вам нужно отключить автоматическую пересборку на время, используйте `--no-verify`:

```bash
git pull --no-verify
```

Конфигурация хранится в `.git/hooks/post-merge`.
