export const setProperty = (
  objectiveOptions: seed.KeyValuePairs,
  sourceOptions: seed.KeyValuePairs,
  name: string
) => {
  if (sourceOptions[name] !== undefined)
    objectiveOptions[name] = sourceOptions[name]
}
