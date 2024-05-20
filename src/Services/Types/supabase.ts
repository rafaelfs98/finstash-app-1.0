export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          color: string | null;
          id: number;
          name: string | null;
          sum_total: boolean | null;
        };
        Insert: {
          color?: string | null;
          id?: number;
          name?: string | null;
          sum_total?: boolean | null;
        };
        Update: {
          color?: string | null;
          id?: number;
          name?: string | null;
          sum_total?: boolean | null;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          color: string | null;
          id: number;
          name: string | null;
          type: number | null;
        };
        Insert: {
          color?: string | null;
          id?: number;
          name?: string | null;
          type?: number | null;
        };
        Update: {
          color?: string | null;
          id?: number;
          name?: string | null;
          type?: number | null;
        };
        Relationships: [];
      };
      expense: {
        Row: {
          accountsId: number | null;
          amount: number | null;
          categoryId: number | null;
          description: string | null;
          dueDate: string | null;
          id: number;
          installments: number | null;
          paid: boolean | null;
          repeat: boolean | null;
          subCategoryId: number | null;
        };
        Insert: {
          accountsId?: number | null;
          amount?: number | null;
          categoryId?: number | null;
          description?: string | null;
          dueDate?: string | null;
          id?: number;
          installments?: number | null;
          paid?: boolean | null;
          repeat?: boolean | null;
          subCategoryId?: number | null;
        };
        Update: {
          accountsId?: number | null;
          amount?: number | null;
          categoryId?: number | null;
          description?: string | null;
          dueDate?: string | null;
          id?: number;
          installments?: number | null;
          paid?: boolean | null;
          repeat?: boolean | null;
          subCategoryId?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "expense_accountsId_fkey";
            columns: ["accountsId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "expense_categoryId_fkey";
            columns: ["categoryId"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "expense_subCategoryId_fkey";
            columns: ["subCategoryId"];
            isOneToOne: false;
            referencedRelation: "sub_categories";
            referencedColumns: ["id"];
          }
        ];
      };
      revenues: {
        Row: {
          accontId: number | null;
          amount: number | null;
          categoryId: number | null;
          id: number;
          description: string | null;
          subCategoryId: number | null;
          transactionDate: string | null;
        };
        Insert: {
          accontId?: number | null;
          amount?: number | null;
          categoryId?: number | null;
          id?: number;
          name?: string | null;
          subCategoryId?: number | null;
          transactionDate?: string | null;
        };
        Update: {
          accontId?: number | null;
          amount?: number | null;
          categoryId?: number | null;
          id?: number;
          name?: string | null;
          subCategoryId?: number | null;
          transactionDate?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "revenues_accontId_fkey";
            columns: ["accontId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "revenues_categoryId_fkey";
            columns: ["categoryId"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "revenues_subCategoryId_fkey";
            columns: ["subCategoryId"];
            isOneToOne: false;
            referencedRelation: "sub_categories";
            referencedColumns: ["id"];
          }
        ];
      };
      sub_categories: {
        Row: {
          category_id: number | null;
          color: string | null;
          id: number;
          name: string | null;
          type: number | null;
        };
        Insert: {
          category_id?: number | null;
          color?: string | null;
          id?: number;
          name?: string | null;
          type?: number | null;
        };
        Update: {
          category_id?: number | null;
          color?: string | null;
          id?: number;
          name?: string | null;
          type?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "sub_categorias_categoria_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
