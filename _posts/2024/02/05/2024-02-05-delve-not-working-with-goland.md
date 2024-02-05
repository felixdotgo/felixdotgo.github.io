---
layout: post
title: "Delve not working with GoLand"
date: 2024-02-05 12:52:00 +7
categories: software
---

I have a bunch of projects on my computer and not all of them use the same Go version. Then I found [gvm](https://github.com/moovweb/gvm), this tool help me switch to the right version of Go that I want for each project. Unfortunately, another problem happened, I can't use delve to run debugger - which still run smoothly on VSCode. So I did googling a bit and turns out GoLand has builtin delve which could be incompatible with my current Go version.
Then I found this solution and it's work perfectly.

[https://youtrack.jetbrains.com/issue/GO-8186](https://youtrack.jetbrains.com/issue/GO-8186/Delve-version-too-high-for-Go-1.10#focus=Comments-27-3730182.0-0)

Following the solution I'm just go to GoLand menu, `Help > Edit Custom Properties` and add this
```
# custom GoLand properties (expand/override 'bin/idea.properties')
dlv.path=/Users/xilef/.gvm/pkgsets/go1.17/global/bin/dlv
```
The path in the example is on my computer, you need to change it to fit yours.

Hope this help and have a good day!