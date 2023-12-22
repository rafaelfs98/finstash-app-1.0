export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number;
          name: string | null;
          color: string | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
          color?: string | null;
        };
        Update: {
          id?: number;
          name?: string | null;
          color?: string | null;
        };
        Relationships: [];
      };
      expense_sources: {
        Row: {
          id: number;
          name: string | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
        };
        Update: {
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      expenseTransactions: {
        Row: {
          amount: number | null;
          categoryId: number | null;
          id: number;
          sourceId: number | null;
          tagsId: number | null;
          transactionDate: string | null;
          userId: number | null;
        };
        Insert: {
          amount?: number | null;
          categoryId?: number | null;
          id?: number;
          sourceId?: number | null;
          tagsId?: number | null;
          transactionDate?: string | null;
          userId?: number | null;
        };
        Update: {
          amount?: number | null;
          categoryId?: number | null;
          id?: number;
          sourceId?: number | null;
          tagsId?: number | null;
          transactionDate?: string | null;
          userId?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "expenseTransactions_categoryId_fkey";
            columns: ["categoryId"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "expenseTransactions_sourceId_fkey";
            columns: ["sourceId"];
            isOneToOne: false;
            referencedRelation: "expense_sources";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "expenseTransactions_tagsId_fkey";
            columns: ["tagsId"];
            isOneToOne: false;
            referencedRelation: "tags";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "expenseTransactions_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      income_sources: {
        Row: {
          id: number;
          name: string | null;
          color: string | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
          color?: string | null;
        };
        Update: {
          id?: number;
          name?: string | null;
          color?: string | null;
        };
        Relationships: [];
      };
      income_transactions: {
        Row: {
          amount: number | null;
          categoryId: number | null;
          id: number;
          sourceId: number | null;
          tagsId: number | null;
          transactionDate: string | null;
          userId: number | null;
        };
        Insert: {
          amount?: number | null;
          categoryId?: number | null;
          id?: number;
          sourceId?: number | null;
          tagsId?: number | null;
          transactionDate?: string | null;
          userId?: number | null;
        };
        Update: {
          amount?: number | null;
          categoryId?: number | null;
          id?: number;
          sourceId?: number | null;
          tagsId?: number | null;
          transactionDate?: string | null;
          userId?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "income_transactions_categoryId_fkey";
            columns: ["categoryId"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "income_transactions_sourceId_fkey";
            columns: ["sourceId"];
            isOneToOne: false;
            referencedRelation: "income_sources";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "income_transactions_tagsId_fkey";
            columns: ["tagsId"];
            isOneToOne: false;
            referencedRelation: "tags";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "income_transactions_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      tags: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          email: string | null;
          id: number;
          name: string | null;
          password: string | null;
        };
        Insert: {
          email?: string | null;
          id?: number;
          name?: string | null;
          password?: string | null;
        };
        Update: {
          email?: string | null;
          id?: number;
          name?: string | null;
          password?: string | null;
        };
        Relationships: [];
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
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
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
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
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
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
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
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
