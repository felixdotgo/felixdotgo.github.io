---
layout: post
title: "Fix VSCode login issue for Pop!_OS Cosmic"
date: 2026-03-16 02:20:00 +7
categories: software
tags: [linux, tools]
---
Recently I moved to Pop!_OS for some reasons. Then when I install and open VSCode I see a popup that tell me it cannot detect `gnome-keyring` so I have to Googling a bit.
Here is what works for me til now.
```bash
# install gnome keyring
sudo apt install gnome-keyring

# create symlink for autostart services
systemctl --user enable --now gcr-ssh-agent.service
systemctl --user enable --now gnome-keyring-daemon.service

# create config file and add this line `password optional pam_gnome_keyring.so`
sudo nano /etc/pam.d/gdm-autologin
```

Open file `~/.vscode/argv.json` and add this
```
// Fix keyring error
"password-store": "gnome-libsecret"
```
