const checkRepeatedItemsInAnArray = (items: string[]) => {
  const countMap: Record<string, number> = {};
  const duplicateItems = [];

  items.forEach((item) => {
    countMap[item] = (countMap[item] || 0) + 1;
  });

  for (const [key, value] of Object.entries(countMap)) {
    if (value > 1) {
      duplicateItems.push(key);
    }
  }

  return duplicateItems;
};

export default checkRepeatedItemsInAnArray;
