export type searchCategory = {
    name: string;
    subCategory: subCategory[] | null;
};

export type subCategory = {
    fieldName: string;
    value: any;
};

export const searchParams = {
    EMPLOYEES: {
        name: 'employees',
        subCategory: null
    } as searchCategory,
    SECTORS: {
        name: 'sectors',
        subCategory: null
    } as searchCategory,
    DIVISIONS: {
        name: 'divisions',
        subCategory: null
    } as searchCategory,
    PROJECTS: {
        name: 'projects',
        subCategory: null
    } as searchCategory,

}