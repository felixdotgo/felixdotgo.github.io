+++
title = "How I Built My Own AI Workflow"
date = 2026-11-03T09:50:00+07:00
categories = ["software"]
tags = ["ai", "workflow", "software", "aidlc"]
slug = "how-i-built-my-own-ai-workflow"
+++

A few months ago, I started working on a small project about AI and software development. My idea was simple: I wanted AI to help me write code, but I didn't want to let AI do everything by itself. I still wanted to be the person who made the important decisions.

That's how **aidlc-kit** started.

It is a workflow that helps AI and humans work together. AI follows a set of steps, while humans can review, approve, or reject its work at important points.

## Where It All Started

The idea came from an [AI-DLC specification](https://github.com/awslabs/aidlc-workflows/blob/de9519825a8c08dd79cda148d889d64eabbeab47/assets/AI-DLC-Workflows-2.0-Specification.pdf) published by AWS.

It is a long document about using AI in software development. But one idea really caught my attention:

> AI should not work alone. It should follow a clear process, and humans should make decisions at important steps.

I really liked this approach, so I decided to build my own version.

Before starting aidlc-kit, I had already tried some other AI workflows, such as BMAD and Spec Kit. Those tools gave me some good ideas, but I wanted something that better matched the way I wanted to work with AI.

## Starting with a Simple Workflow

The first version was quite simple. It had the basic steps needed for software development:

1. Understand the requirements.
2. Create a development plan.
3. Implement the changes.
4. Run tests and check the results.
5. Let a human review the final work.

I also wanted to keep the system simple. Instead of using a database or setting up a server, I stored the workflow state in a local JSON file.

This made the first version easy to build, use, and maintain.

After that, I started adding more rules to the workflow.

One important feature was the **approval gate**.

A gate is a point where AI must stop and wait for human approval before moving to the next step. This is important because AI can sometimes misunderstand requirements or make decisions that were never agreed on.

With these gates, AI cannot simply continue doing whatever it thinks is right. It must get approval before moving forward.

## From One Agent to Multiple Agents

As the workflow became more useful, I started thinking about how to let multiple AI agents work together.

I added a coordination service to manage the workflow state and tasks across agents. They could run on the same machine or on different machines.

The coordination service became the central place to manage their work.

Each agent received a small task with clear instructions. It also had clear limits on which files it could change.

This helped prevent agents from modifying the same files and causing conflicts.

I also added an **unattended mode**, which allows the workflow to run without a human approving every step.

Of course, giving AI more freedom also means more risks. So I added extra safety rules to this mode. My goal was not to make everything faster at any cost. I wanted to make sure the workflow could still run safely.

## What Does a Normal Workflow Look Like?

Let me explain how I use it in a real development task.

When I ask AI to make a change, it does not start writing code immediately.

First, it creates a plan. The plan explains:
- What needs to be changed.
- Which files or areas will be affected.
- What will not be changed.
- How the task will be implemented.

I review the plan and decide whether to approve or reject it.

If I approve, AI starts working on the task. It writes code, runs tests, and reports the results.

After that, I review the changes myself. Only when I am happy with the result do I close the task.

This process gives me more control over what AI is doing, instead of just giving it a prompt and hoping for the best.

## Letting Multiple Agents Work at the Same Time

Another interesting feature is parallel development.

Some tasks can be divided into smaller jobs, so multiple agents can work at the same time.

For example, one agent can work on the backend while another works on tests or a different part of the system.

Each job has its own files to work with. One agent should not modify files owned by another agent.

This simple rule helps reduce conflicts when multiple agents are working in parallel.

It also makes it easier to track what each agent is doing and review its changes.

## Building the Workflow with Its Own Workflow

One thing I find quite interesting is that I used aidlc-kit to develop aidlc-kit itself.

I also used it in many real projects at my company.

This means every new feature in the workflow went through the same process that I had built. The plans, task lists, implementation steps, and reviews were all created and managed by aidlc-kit.

It was a good way to test whether the workflow actually worked in real development situations.

Whenever I found something uncomfortable or difficult to use, I tried to improve the workflow first.

However, using the tool to build itself also helped me discover many problems.

## Problems I Found Along the Way

Not everything worked perfectly. There were quite a few issues during development.

### 1. The Lock File Problem

The first problem was a broken lock file.

The lock file was used to control access to the workflow state. But sometimes it could become damaged, causing the whole system to stop working.

At first, this was quite annoying.

I decided to improve the lock mechanism so it could detect and repair some broken states instead of simply getting stuck.

### 2. Two Copies of the Same Logic

Another problem came from having two copies of the same logic.

One was written in TypeScript, while the other was a plain script. At the beginning, they worked in the same way. But over time, they started to become different.

This kind of problem is easy to miss when reviewing code manually.

To fix it, I added an automatic check that runs whenever there is a code change. It compares both versions and reports differences immediately.

This helps keep them in sync.

### 3. Unattended Mode Issues

The unattended mode also had some problems.

Sometimes it stopped too early. In other cases, it could skip an important review step.

I added more checks to handle these situations and make sure the workflow followed the correct process.

I also found another annoying issue: AI could retry the same failed task again and again without making real progress.

After dealing with this for a while, I decided to add a retry limit.

Now, if AI fails three times on the same problem, it must stop and report the issue to a human.

This rule came from a real experience during a very frustrating week of endless retries.

Sometimes, the best way to improve an AI workflow is simply to learn from its mistakes.

## Making the Code Easier to Maintain

After adding more and more features, some files became too large and difficult to understand.

So I spent some time cleaning up the code.

I split large files into smaller ones and added short comments to explain some important parts.

It was not a big feature, but it made the project much easier to read and maintain.

I believe this is also important for AI-generated code. If the code becomes too complicated, it will be harder for both humans and AI to understand and improve it.

## Releasing the Package

After several rounds of development, I started releasing the package.

The first version was `0.0.1`, followed by `0.1.0` and then `0.1.1`.

There is one important rule about upgrading: **only humans can upgrade the workflow version**.

The tool never upgrades itself automatically. When installing a new version, the user must provide the version number manually.

This may sound like a small detail, but I think it is an important safety rule.

The workflow controls how AI works inside a project. If it could change or upgrade itself without permission, it might also change the rules that are supposed to keep it under control.

So I decided to keep this part completely in human hands.

## What I Learned from Building This

Looking back, my design ideas were quite simple:

- Start small and improve step by step.
- Keep important decisions under human control.
- Use clear gates to control AI actions.
- Keep the workflow state simple and easy to understand.
- Make each change small enough to find problems quickly.

I did not want to build a big system from the beginning. I wanted to start with something small that could grow over time.

I also tried to keep each commit focused on one thing. This made it easier to understand what changed and where to look when something went wrong.

But the biggest lesson for me was about the approval gates.

At first, I thought these gates would slow down development because humans had to review AI's work.

But after using them in real projects, I realized they actually saved time.

When AI misunderstands something, it is much cheaper to catch the problem during planning than after it has already changed a lot of code.

A small review at the beginning can prevent a much bigger problem later.

## Final Thoughts

Building aidlc-kit has been a journey of a few months, and the project is still evolving.

I don't think I have found the perfect way to work with AI yet. There are still many things I want to improve, and I will probably discover more problems as I use it in real projects.

But one thing has become clear to me: using AI for software development is not just about writing better prompts or choosing a more powerful model.

It is also about building a good process around AI.

For me, that process needs three important things: **small steps, clear rules, and human control**.

That's the idea behind aidlc-kit, and I will keep improving it as I learn more from real-world development.