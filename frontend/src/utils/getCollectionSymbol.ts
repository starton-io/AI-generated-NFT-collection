export const getCollectionSymbol = (collectionName: string): string => {
	const words: string[] = collectionName.split(" ");
	const initials: string[] = words.map(word => word.charAt(0).toUpperCase());
	return initials.join("");
}
