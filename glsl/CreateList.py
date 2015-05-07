import os

class CreateList:	

	def file_list(self):
		filenames = next(os.walk('./'))[2]
		return filenames

	def ignore_elements(self, files):
		ignores = ['copy.frag', 'ShiftCells.frag', 'ShiftCells_2.frag', 'PlaceCells.frag', 'PlaceCircle.frag', 'RendMerge3.frag', 'DestInterf.frag', 'quad.vert', 'photo.frag']
		restart = False
		for f in files:
			if restart:
				break
			else:
				for i in ignores:
					if f == i:
						files.remove(f)
						restart = True
						break
		if restart:
			self.ignore_elements(files)
	
	def frags_only(self, files):
		for f in files:		
			if f[-5:] != '.frag':
				files.remove(f)

	def create_js(self, files):
		print 'for (var i = 0; i < '+ str(len(files)) +'; i++){'
		for f in files:		
			print '    this.rule_paths.push(\'glsl/' + f + '\'),'
		print '}'
		print ''

		print 'gui.add(cont, \'rule\', {'
		for i,f in enumerate(files):		
			print '    \'' + f[:-5] + '\': ' + str(i) + ','
		print '    \'Random\': -1'
		print '}).name(\'Hostile Algorithm\').onChange(set_rule);'

	def __init__(self):
		files = self.file_list()
		self.ignore_elements(files)
		self.frags_only(files)
		print files
		self.create_js(files)


if __name__ == "__main__":
	list = CreateList()