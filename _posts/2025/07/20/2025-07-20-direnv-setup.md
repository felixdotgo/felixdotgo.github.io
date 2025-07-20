---
layout: post
title: "Setup direnv for your development environment"
date: 2025-07-20 22:32:00 +7
categories: setup direnv
---
## Setup direnv for your development environment
Install from binary build
```bash
curl -sfL https://direnv.net/install.sh | bash
```
Add hook to your shell
```bash
eval "$(direnv hook zsh)"
```
`direnv` supports a few different shell types you can take a look at [here](https://github.com/direnv/direnv/blob/master/docs/hook.md).

By default `direnv` don't load the `.env` file so you need to do a bit more configuration
Create the configuration file
```bash
mkdir ~/.config/direnv
touch ~/.config/direnv/direnv.toml
```
Add the following to the file
```
[global]
load_dotenv = true
```
Reload your shell and you're ready to go

## References
- https://github.com/direnv/direnv/blob/master/docs/hook.md
- https://dev.to/charlesloder/tidbit-get-direnv-to-use-env-5fkn