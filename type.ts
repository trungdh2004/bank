export interface IPagination {
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

export interface IResponsePagi<T> {
  data: T[];
  pagination: IPagination;
}

export interface ICategory {
  id: string;
  name: string;
  createdAt: Date;
}

export interface ISpend {
  id: string;
  month: number;
  year: number;
  date: Date;
  total: number;
  description?: string;
  tietkiem: number;
  tieu: number;
  color?: string; // Default color if not provided
  isRating?: boolean; // Optional field for rating status
  isRun: boolean; // Optional field for run status
  createdAt: Date;
  updatedAt: Date;
}

export interface IExpense {
  id: string;
  spendId: string;
  categoryId: string;
  amount: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IExpenseWithCategory extends IExpense {
  category: ICategory;
} 