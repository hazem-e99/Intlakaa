import { supabase } from "@/lib/supabase";

export interface Request {
  id: number;
  name: string;
  phone: string;
  store_url: string;
  monthly_sales: string;
  created_at: string;
}

export interface PaginatedResponse {
  data: Request[];
  count: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Fetch all requests from Supabase
 */
export const getRequests = async (): Promise<Request[]> => {
  const { data, error } = await supabase
    .from("requests")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching requests:", error);
    throw new Error(error.message);
  }

  return data || [];
};

/**
 * Search requests by name or phone
 */
export const searchRequests = async (query: string): Promise<Request[]> => {
  if (!query.trim()) {
    return getRequests();
  }

  const { data, error } = await supabase
    .from("requests")
    .select("*")
    .or(`name.ilike.%${query}%,phone.ilike.%${query}%`)
    .order("id", { ascending: false });

  if (error) {
    console.error("Error searching requests:", error);
    throw new Error(error.message);
  }

  return data || [];
};

/**
 * Fetch paginated requests
 */
export const paginateRequests = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse> => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Get total count
  const { count, error: countError } = await supabase
    .from("requests")
    .select("*", { count: "exact", head: true });

  if (countError) {
    console.error("Error counting requests:", countError);
    throw new Error(countError.message);
  }

  // Get paginated data
  const { data, error } = await supabase
    .from("requests")
    .select("*")
    .order("id", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching paginated requests:", error);
    throw new Error(error.message);
  }

  return {
    data: data || [],
    count: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  };
};

/**
 * Search and paginate requests
 */
export const searchAndPaginateRequests = async (
  query: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse> => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let countQuery = supabase.from("requests").select("*", { count: "exact", head: true });
  let dataQuery = supabase.from("requests").select("*").order("id", { ascending: false });

  // Apply search filter if query exists
  if (query.trim()) {
    const searchFilter = `name.ilike.%${query}%,phone.ilike.%${query}%`;
    countQuery = countQuery.or(searchFilter);
    dataQuery = dataQuery.or(searchFilter);
  }

  // Get total count
  const { count, error: countError } = await countQuery;

  if (countError) {
    console.error("Error counting requests:", countError);
    throw new Error(countError.message);
  }

  // Get paginated data
  const { data, error } = await dataQuery.range(from, to);

  if (error) {
    console.error("Error fetching paginated requests:", error);
    throw new Error(error.message);
  }

  return {
    data: data || [],
    count: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  };
};
