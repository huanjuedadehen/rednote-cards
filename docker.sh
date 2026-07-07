#!/usr/bin/env bash
# docker.sh — 小红书卡片生成器 Docker 管理脚本
# 用法: ./docker.sh [build|run|stop|restart|logs|status|clean]

set -euo pipefail

IMAGE="xiaohongshu-cards"
CONTAINER="xiaohongshu-cards"
PORT="${PORT:-8080}"

# ── 颜色输出 ───────────────────────────────────────────────────
info()    { echo -e "\033[1;34m[INFO]\033[0m  $*"; }
success() { echo -e "\033[1;32m[OK]\033[0m    $*"; }
warn()    { echo -e "\033[1;33m[WARN]\033[0m  $*"; }
error()   { echo -e "\033[1;31m[ERROR]\033[0m $*"; exit 1; }

# ── 子命令 ─────────────────────────────────────────────────────

cmd_build() {
  info "构建镜像: $IMAGE ..."
  docker build -t "$IMAGE" .
  success "镜像构建完成: $IMAGE"
}

cmd_run() {
  if docker ps -q --filter "name=^${CONTAINER}$" | grep -q .; then
    warn "容器 $CONTAINER 已在运行，请先执行 stop"
    exit 1
  fi

  # 如果镜像不存在，先构建
  if ! docker image inspect "$IMAGE" &>/dev/null; then
    warn "镜像不存在，自动构建..."
    cmd_build
  fi

  info "启动容器: $CONTAINER (端口 $PORT → 80) ..."
  docker run -d \
    --name "$CONTAINER" \
    --restart unless-stopped \
    -p "${PORT}:80" \
    "$IMAGE"
  success "容器已启动: http://localhost:$PORT"
}

cmd_stop() {
  if docker ps -q --filter "name=^${CONTAINER}$" | grep -q .; then
    info "停止容器: $CONTAINER ..."
    docker stop "$CONTAINER"
    docker rm "$CONTAINER"
    success "容器已停止并移除"
  else
    warn "容器 $CONTAINER 未在运行"
  fi
}

cmd_restart() {
  info "重启容器..."
  cmd_stop || true
  cmd_run
}

cmd_logs() {
  info "输出容器日志 (Ctrl+C 退出)..."
  docker logs -f "$CONTAINER"
}

cmd_status() {
  echo ""
  echo "  镜像:"
  docker image ls "$IMAGE" 2>/dev/null || echo "  (无)"
  echo ""
  echo "  容器:"
  docker ps -a --filter "name=^${CONTAINER}$" --format "  {{.Names}}\t{{.Status}}\t{{.Ports}}" 2>/dev/null || echo "  (无)"
  echo ""
}

cmd_clean() {
  warn "将删除容器和镜像，是否继续? [y/N]"
  read -r confirm
  if [[ "$confirm" =~ ^[Yy]$ ]]; then
    cmd_stop || true
    if docker image inspect "$IMAGE" &>/dev/null; then
      info "删除镜像: $IMAGE ..."
      docker rmi "$IMAGE"
      success "镜像已删除"
    else
      warn "镜像不存在，跳过"
    fi
  else
    info "已取消"
  fi
}

cmd_help() {
  echo ""
  echo "用法: ./docker.sh <命令>"
  echo ""
  echo "命令:"
  echo "  build    构建 Docker 镜像"
  echo "  run      启动容器（镜像不存在时自动构建）"
  echo "  stop     停止并移除容器"
  echo "  restart  重启容器"
  echo "  logs     查看实时日志"
  echo "  status   查看镜像和容器状态"
  echo "  clean    删除容器和镜像"
  echo ""
  echo "环境变量:"
  echo "  PORT     宿主机端口，默认 8080"
  echo "           示例: PORT=3000 ./docker.sh run"
  echo ""
}

# ── 入口 ───────────────────────────────────────────────────────
case "${1:-help}" in
  build)   cmd_build   ;;
  run)     cmd_run     ;;
  stop)    cmd_stop    ;;
  restart) cmd_restart ;;
  logs)    cmd_logs    ;;
  status)  cmd_status  ;;
  clean)   cmd_clean   ;;
  *)       cmd_help    ;;
esac
