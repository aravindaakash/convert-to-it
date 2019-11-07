import sublime
import sublime_plugin


class ConvertToItCommand(sublime_plugin.TextCommand):
	def run(self, edit):
		for region in self.view.sel():
			stringContents = self.view.substr(region)
			self.view.replace(edit, region, "it '{}', :testId =>'', :story => '' do |e|\nend\n".format(stringContents))
