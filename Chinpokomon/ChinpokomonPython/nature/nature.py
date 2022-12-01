class Nature():
    def __init__(self, name, advantage_list=[], disadvantage_list=[]):
        self._name = name
        self._advantage_list = advantage_list
        self._disadvantage_list = disadvantage_list

    def __eq__(self, other):
        if not isinstance(other, Nature):
            return NotImplemented

        return self.name == other.name

    @property
    def name(self):
        return self._name

    @property
    def advantage_list(self):
        return self._advantage_list

    @property
    def disadvantage_list(self):
        return self._disadvantage_list

    def has_advantage_against(self, nature):
        return any(nature.name == other_nature for other_nature in self.advantage_list)

    def has_disadvantage_against(self, nature):
        return any(nature.name == other_nature for other_nature in self.disadvantage_list)
