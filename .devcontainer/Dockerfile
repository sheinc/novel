FROM node:20.17.0

ARG GITHUB_TOKEN

ENV GITHUB_TOKEN=$GITHUB_TOKEN
ENV LANG=C.UTF-8
ENV LANGUAGE=en_US:

RUN apt-get update -qq \
  && apt-get install -y \
  jq \
  curl \
  apt-transport-https \
  build-essential \
  vim \
  sudo \
  zsh \
  gh \
  fzf \
  && rm -rf /var/lib/apt/lists/*

ARG USERNAME=node

# Configure passwordless sudo for the node user
RUN echo 'node ALL=(ALL) NOPASSWD: ALL' > /etc/sudoers.d/nopasswd_node \
    && chmod 0440 /etc/sudoers.d/nopasswd_node

# Persist bash history.
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
  && mkdir /commandhistory \
  && touch /commandhistory/.bash_history \
  && chown -R $USERNAME /commandhistory

# Create workspace and config directories and set permissions
RUN mkdir -p /workspace /home/node/.claude && \
  chown -R node:node /workspace /home/node/.claude

RUN ARCH=$(dpkg --print-architecture) && \
  wget "https://github.com/dandavison/delta/releases/download/0.18.2/git-delta_0.18.2_${ARCH}.deb" && \
  sudo dpkg -i "git-delta_0.18.2_${ARCH}.deb" && \
  rm "git-delta_0.18.2_${ARCH}.deb"

WORKDIR /workspace

RUN npm install -g @anthropic-ai/claude-code

RUN chown -R node:node /workspace/

USER node

# Set the default shell to zsh rather than sh
ENV SHELL=/bin/zsh

# Default powerline10k theme
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.2.0/zsh-in-docker.sh)" -- \
  -p git \
  -p fzf \
  -a "source /usr/share/doc/fzf/examples/key-bindings.zsh" \
  -a "source /usr/share/doc/fzf/examples/completion.zsh" \
  -a "export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
  -x

RUN echo "pnpm config set store-dir $HOME/.pnpm-store" >> ~/.zshrc

# allow less to display unicode characters
ENV LESSCHARSET=utf-8
