export default {
	name: 'Git Configuration',
	filename: '.gitconfig',
	fileUrl:
		'https://raw.githubusercontent.com/blushell/Portofolio/refs/heads/main/assets/css/tailwind.css',
	content: `[user]
  name = Your Name
  email = your.email@example.com
[core]
  editor = vim
  excludesfile = ~/.gitignore_global
[color]
  ui = auto
[pull]
  rebase = false
[init]
  defaultBranch = main`,
};
