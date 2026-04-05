---
layout: post
title: "How I built QueryBox and what AI actually helped with"
date: 2026-03-16 02:20:00 +7
categories: software ai querybox
---

## The problem

I have used many database GUI tools, from open source ones to paid ones. Each tool has its own strengths, and I don't deny their value. But for my daily work, which is mostly running queries and looking at data, most of them have too many features. The interface is heavy, the workflow is complicated, and I often use only about 10% of the features in a 100% tool. It feels like every time I open the app, I have to pay a cognitive cost for things I never touch.

So my friend and I started thinking about an idea: build a light, plugin-based tool that does exactly what we really need, no more and no less. The idea is not new. The market already has many options. But this time, we decided to try a different approach: let AI join from the very beginning, not as a supporting tool, but as a partner in the thinking and building process.

We call it [QueryBox](https://github.com/felixdotgo/querybox)

## AI is not magic, but it changes the speed

We started by using ChatGPT and Claude to draft and verify the idea: designing the architecture, writing the spec, asking questions about trade-offs. AI gave us many useful suggestions, including some ideas I had never thought of myself, but we did not follow them blindly. Every important decision was checked against real testing, working code, and the feeling of the actual user.

The next step was to write a short, one-page spec and then ask AI to implement it. The first results were not perfect. Some code was wrong, some architecture decisions had to be reversed, and sometimes AI misunderstood our intention in surprising ways. We had to review, edit, and review again. Many loops.

But after each loop, the product got clearly better. Not only because AI understood the context more, but because we learned how to ask more precisely. This is something not many people talk about: **the quality of AI output depends a lot on the quality of your input**. If you describe things vaguely, you get something vague back. If you think clearly, you get clear code back. We also used the bmad framework to structure our development loop, which made each iteration clearer, measurable, and much faster.

## When the tool meets reality

When we used QueryBox in real projects, the result was as expected: it fit easily into our current workflow, and covered our needs without carrying a pile of extra features. That was the moment that confirmed we were on the right track. Not because AI did everything, but because it helped us focus on what matters and move much faster than the traditional way.

I still remember the feeling the first time I used the tool I built myself to query data in a real project, and everything ran well enough, not perfect, but just as I imagined. It was a hard-to-describe feeling, a mix of pride and gratitude, because in the end we could turn a personal idea into something actually useful.

At this point the product still has many limits, and we clearly know the things that need to improve. But the important thing is that we now have a solid base to keep building on, and AI will continue to be a necessary part of that journey. We are not just building a tool, we are also building a new way of working, a way where AI is a natural part of it, not an exception or just a side tool.

## From idea to release, AI is everywhere

From design, writing code, to creating CI/CD scripts and writing release notes, AI shows up in almost every step. We shipped versions to GitHub much faster than the traditional way. Not because AI replaces human judgment, but because it handles most of the repetitive work so we can focus on the part that really needs thinking: deciding what to do, what not to do, and why.

## Don't be afraid of being replaced, learn to survive with AI

Here, I want to stop and say something I think many people are worried about: **the fear of being replaced by AI**.

I understand that fear. Every time a new model is released, social media is full of posts like "developers will lose their jobs", "designers will be replaced", "industry X will disappear". Those headlines get traffic, but they do not reflect the true nature of this technology.

Through the experience of building QueryBox, I realized one thing: AI does not replace the person who understands the problem. It only replaces the person who works without knowing what they are doing. If you only type code following a pattern without understanding why, then yes, AI will do it better and cheaper than you. But if you understand the problem, understand the user, and understand the "why" behind each line of code, then AI is a very strong lever for you.

The question is not "will AI replace me?" but "am I learning how to work with AI effectively?". That is a shift in mindset. Instead of competing with AI in the things it is good at (speed, volume, repetition), we should focus on the things humans are still better at:
- asking the right questions
- understanding the context
- making decisions when things are not certain
- and most importantly, knowing what is worth doing.

Surviving in the age of AI is not about running faster than AI. That is a race you cannot win. Surviving is learning how to use AI to become a better version of yourself, to do things you cannot do alone, and to turn ideas that used to stay on paper into real things.

## What I really learned

If I have to reduce it to one lesson: **AI does not replace the need for you to understand the problem you are solving.** It makes your speed bigger when you know the direction, but it also makes your mistakes bigger if you have not thought things through. This sounds simple, but it changes how you work every day. You start spending more time thinking and less time typing. And that is a healthy shift.

What really changed is this: ideas we used to drop because they "take too much effort" are now totally possible. The bar for "worth trying" has dropped a lot. Side projects, small tools for personal use, crazy experiments, all of them are more doable than ever.

We are thinking about many more tools now, small, focused ones that solve the real problems of our team. Not because AI does the work for us, but because AI helps us try faster, iterate faster, and focus on real value. That is the future I find most exciting.

And to you, the person reading this and maybe also thinking about your role in the age of AI: don't be afraid. Be curious. Start trying. The cost of not trying is now higher than the cost of trying and failing. We are not competing with AI, we are learning to grow with it.

## What's next for QueryBox
We are still in the early stages of QueryBox, and there is a long road ahead. We have many features planned, but we will always keep the core philosophy: **build what we need, not what we think we should have**. We will continue to use AI as a partner in this journey, not just for coding, but for design, testing, and even user feedback. We want to create a tool that is not only useful for us but also for others who share the same needs. If you are interested, check out the GitHub repo, try it out, and let us know what you think. We are open to contributions, ideas, and feedback. This is just the beginning, and we are excited to see where it goes.
