import {
  getConstructionByDirector,
  getConstructionByForeman,
} from '../../utilFunctions'

export const directorHasAccess = async (directorId, obraId) => {
  //Fetch all the constructions that the director is in charge of
  const fetchedConstructions = await getConstructionByDirector(directorId)
  //Get the id of the constructions
  const directorConstructions = fetchedConstructions.map(
    (construction) => construction.id,
  )
  //Check if the construction is in the list of constructions
  return directorConstructions.includes(parseInt(obraId))
}

export const foremanHasAccess = async (foremanId, obraId) => {
  //Fetch all the constructions that the foreman is in charge of
  const fetchedConstructions = await getConstructionByForeman(foremanId)
  //Get the id of the constructions
  const foremanConstructions = fetchedConstructions.map(
    (construction) => construction.id,
  )
  //Check if the construction is in the list of constructions
  return foremanConstructions.includes(parseInt(obraId))
}
