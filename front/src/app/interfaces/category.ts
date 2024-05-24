export interface Category{
    IdCategoria:number;
    Categoria:string;
    IdCatParent: number | null;
    subcategorias?: Category[];
    selected?: boolean;
}
