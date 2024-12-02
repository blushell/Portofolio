export default {
	name: 'Tmux Configuration',
	filename: '.tmux.conf',
	download: '',
	content: `# Tmux Configuration
set -g default-terminal "screen-256color"
set -g mouse on
set -g base-index 1
setw -g pane-base-index 1
set -g status-style bg=default
set -g status-left "#[fg=green]Session: #S"
set -g status-right "#[fg=yellow]%d %b %Y #[fg=green]%H:%M"`,
};
