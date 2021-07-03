export function getCategoryIdFromPath(pathName: string): number | null {
    const activeCategory = pathName.match(/(?<=categories\/)(.*$)/g);
    return (activeCategory && activeCategory.length > 0) ?
        +activeCategory[0] :
        null;
}