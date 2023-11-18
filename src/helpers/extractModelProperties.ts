const extractModelProperties = (
  objectToExtract: Record<string, any> | Array<Record<string, any>>,
  propertiesToExtract: string[]
) => {
  const extractObjectProperties = (obj: Record<string, any>) => {
    const extractedObject: Record<string, any> = {};

    for (const key in obj) {
      if (propertiesToExtract.includes(key)) {
        extractedObject[key] = obj[key];
      }
    }

    return extractedObject;
  };

  if (Array.isArray(objectToExtract)) {
    return objectToExtract.map(extractObjectProperties);
  } else {
    return extractObjectProperties(objectToExtract);
  }
};

export default extractModelProperties;
