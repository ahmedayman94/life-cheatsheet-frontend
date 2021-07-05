export function getCategoryIdFromPath(pathName: string): number | null {
    const activeCategory = pathName.match(/(?<=categories\/)((.*?(?=\/))|.*$)/g); //Get category up to and excluding '/' or until end of line
    return (activeCategory && activeCategory.length > 0) ?
        +activeCategory[0] :
        null;
}