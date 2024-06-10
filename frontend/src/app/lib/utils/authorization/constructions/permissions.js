export const directorHasAccess = (directorId, obraId) => {
  //TODO: Implement this function, the backend will provide it
  const fecthConstructions = () => {}
  //Fetch all the constructions that the director is in charge of
  const constructions = fecthConstructions(directorId)
  //Check if the construction is in the list of constructions
  return constructions.includes(obraId)
}
