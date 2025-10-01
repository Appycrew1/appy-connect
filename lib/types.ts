export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: { id: string; label: string; created_at: string | null };
        Insert: { id?: string; label: string; created_at?: string | null };
        Update: { id?: string; label?: string; created_at?: string | null };
      };
      providers: {
        Row: {
          id: string;
          name: string;
          category_id: string | null;
          tags: string[] | null;
          website: string | null;
          summary: string | null;
          details: string | null;
          discount_label: string | null;
          discount_details: string | null;
          logo: string | null;
          is_active: boolean;
          is_featured: boolean;
          feature_until: string | null;
          tier: string | null;
          created_at: string | null;
        };
        Insert: Partial<Database['public']['Tables']['providers']['Row']> & { name: string };
        Update: Partial<Database['public']['Tables']['providers']['Row']>;
      };
      listing_submissions: {
        Row: { id: string; company_name: string; category_id: string | null; website: string | null; description: string | null; discount: string | null; created_at: string | null };
        Insert: Partial<Database['public']['Tables']['listing_submissions']['Row']> & { company_name: string };
        Update: Partial<Database['public']['Tables']['listing_submissions']['Row']>;
      };
      contact_messages: {
        Row: { id: string; name: string; email: string; message: string; created_at: string | null };
        Insert: Partial<Database['public']['Tables']['contact_messages']['Row']> & { name: string; email: string; message: string };
        Update: Partial<Database['public']['Tables']['contact_messages']['Row']>;
      };
      profiles: {
        Row: { id: string; role: 'admin' | 'user'; created_at: string | null };
        Insert: Partial<Database['public']['Tables']['profiles']['Row']> & { id: string };
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
      };
    };
  };
}
