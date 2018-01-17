---
title: Forms
---

## Welcome to Forms!

This website lets you quickly test an HTML form

### How to use it

Set up a form like this:

```html
<form action="https://sidneynemzer.github.io/forms/testing" method="GET">
  <!-- Inputs here -->
</form>
```
Replace `testing` in the `action` with the name of the form. You can call a form anything you want, except `view` (you'll see why in the next section).

When you submit the form, you'll be taken to a page where you can review the submission

### Looking at a form later!

If you visit [https://sidneynemzer.github.io/forms/view][], you can see all of the tables you have created

If you visit `https://sidneynemzer.github.io/forms/<form>` (and replace `<form>` with a form's name), you can see all of your previous submissions for that form.

### Why isn't my form there?

This website uses your browsers *local storage* to save forms. So forms are saved *per browser* (and therefore per computer). You can only view a form on the browser you submitted it to.

### FAQ

#### Q: How does this website work?  
**A:** You can view the code for this website [here](https://github.com/SidneyNemzer/forms)

To be specific, it uses **Github Pages** for static site hosing, **RequireJS** to manage files, and **BackboneJS** to manage the data and what you see. To make all pages redirect to a single place, I took advantage of the `404.html` page (that is, all urls except this page's are invalid, so they go to `404.html` automatically).

### Author

This site was created by Sidney Nemzer. Inspired by [https://ufor.ms](https://ufor.ms) and Github.
