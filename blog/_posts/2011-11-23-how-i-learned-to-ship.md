--- 
layout: post
title: How to Ship
tags: 
- code
- zen
status: publish
type: post
published: true
meta: 
  _edit_last: "1"
---
Recently, we launched <a href="http://classwhole.com">classwhole</a>. After six weeks of intensive development, I want to share some of the lessons I've learned from it.


<h3>Invest in a good team</h3>
Don't get caught up in the myth that programmers are superhuman and can do everything alone. Shipping a product both successfully and timely is difficult. Doing it alone dramatically reduces your percentage for success. Classwhole would not have been possible if not for the great team we have.

Instead of just choosing the smartest people you know, choose smart people you know that will work well together. Good team players trump raw intelligence.

<h3>Your first solution is rarely ever the right one</h3><p>The best solutions are discovered only through <strong>iteration</strong>. This applies to design, code, and everything else. I've noticed that it takes at least two to three iterations of code to solve a problem in a clean and maintainable manner. A first solution is typically a naive implementation but is essential to have a deeper understanding of the issue at hand. The next iteration is a fresh look at a problem and is almost always cleaner and more maintainable. </p>
<p>For Classwhole, much of our production code has been rewritten several times - from the scheduler to the drag-n-drop interface. With each rewrite, we gained a deeper understanding of how to solve the problem in a maintainable, efficient, and clean way. Creating good software is iterative in nature, therefore approaching problems in the same way will create better solutions.</p>

<h3>Maintenance trumps all</h3>
<p>
Clever and tricky-to-understand code may improve code efficiency but will cost additional development time. For most cases, favor simplicity and maintainability over complexity and efficiency. Code always gets revisited to fix voodoo bugs or to add additional features. 
</p>

<h3>Use efficient and minimal project management</h3>
<p>
For classwhole, we used issues on Github to keep track of what needed to be done. Any bug, feature, or idea we had was thrown up on the issue tracker. That way, everyone knew what had to be done, what was the most important, and who was working on what.
</p>
<p>
Issues are also great because project management becomes built into our coding workflow. We do our best to close issues from git commits. Closing issues from git commits allows us to quickly refer to the code that solved the problem.
</p>

<h3>Breaks boost productivity</h3>
<p>
During development, we often ran into difficult and frustrating problems. Whenever this happened, we'd hop onto the foosball table to let off some steam. Turns out that we were able to work both better and faster with breaks sprinkled
</p>

tl;dr - Weekend hacks are so 2010.
