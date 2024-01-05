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
          color: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          color?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          color?: string | null;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      expense_sources: {
        Row: {
          color: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          color?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          color?: string | null;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      expense_transactions: {
        Row: {
          amount: number | null;
          categoryId: number | null;
          dueDate: string | null;
          id: number;
          sourceId: number | null;
          tagsId: number | null;
          paymentDate: string | null;
          userId: number | null;
        };
        Insert: {
          amount?: number | null;
          categoryId?: number | null;
          dueDate?: string | null;
          id?: number;
          sourceId?: number | null;
          tagsId?: number | null;
          paymentDate?: string | null;
          userId?: number | null;
        };
        Update: {
          amount?: number | null;
          categoryId?: number | null;
          dueDate?: string | null;
          id?: number;
          sourceId?: number | null;
          tagsId?: number | null;
          paymentDate?: string | null;
          userId?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "expense_transactions_categoryId_fkey";
            columns: ["categoryId"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "expense_transactions_sourceId_fkey";
            columns: ["sourceId"];
            isOneToOne: false;
            referencedRelation: "expense_sources";
            referencedColumns: ["id"];
          }
        ];
      };
      income_sources: {
        Row: {
          color: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          color?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          color?: string | null;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      income_transactions: {
        Row: {
          amount: number | null;
          categoryId: number | null;
          id: number;
          sourceId: number | null;
          transactionDate: string | null;
        };
        Insert: {
          amount?: number | null;
          categoryId?: number | null;
          id?: number;
          sourceId?: number | null;
          transactionDate?: string | null;
        };
        Update: {
          amount?: number | null;
          categoryId?: number | null;
          id?: number;
          sourceId?: number | null;
          transactionDate?: string | null;
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
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      enviar_email: {
        Args: {
          destinatario: string;
          assunto: string;
          corpo: string;
        };
        Returns: undefined;
      };
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
