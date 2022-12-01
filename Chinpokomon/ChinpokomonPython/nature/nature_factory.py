from nature.nature import Nature


class NatureFactory:
    def create_nature(self, name):
        creator = self.get_creator(name)
        return creator()

    def get_creator(self, name):
        if name == 'ANIMAL':
            return self._create_animal_nature
        elif name == 'ROBOT':
            return self._create_robot_nature
        elif name == 'COSA':
            return self._create_cosa_nature
        else:
            raise ValueError(name)

    def _create_animal_nature(self):
        animal_nature = Nature("Animal", ["Cosa"], ["Robot"])
        return animal_nature

    def _create_robot_nature(self):
        robot_nature = Nature("Robot", ["Animal"], ["Cosa"])
        return robot_nature

    def _create_cosa_nature(self):
        cosa_nature = Nature("Cosa", ["Robot"], ["Animal"])
        return cosa_nature
