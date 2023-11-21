export interface ProductI {
    id: number;
    name: string;
    price: number;
    createAt: Date;
    updateAt: Date;
    categories: CategoryI[];
}

export interface CategoryI {
    id: number;
    name: string;
    createAt: Date;
    updateAt: Date;
}
