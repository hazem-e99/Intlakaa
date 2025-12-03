import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  searchAndPaginateRequests,
  getRequests,
  type Request,
  type PaginatedResponse,
} from "@/services/requestsService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Download,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { exportToExcel } from "@/utils/excelExport";
import { useToast } from "@/hooks/use-toast";

export default function Requests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();
  const itemsPerPage = 10;

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Reset to first page on new search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch requests with React Query
  const {
    data: requestsData,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery<PaginatedResponse>({
    queryKey: ["requests", debouncedSearch, currentPage],
    queryFn: () =>
      searchAndPaginateRequests(debouncedSearch, currentPage, itemsPerPage),
    staleTime: 30000, // 30 seconds
  });

  const handleRefresh = () => {
    refetch();
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (requestsData && currentPage < requestsData.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy، HH:mm", { locale: undefined });
    } catch {
      return dateString;
    }
  };

  const handleExportToExcel = async () => {
    setIsExporting(true);
    try {
      // Fetch all requests (not paginated) for export
      const allRequests = await getRequests();

      if (!allRequests || allRequests.length === 0) {
        toast({
          title: "لا توجد بيانات",
          description: "لا توجد طلبات لتصديرها.",
          variant: "destructive",
        });
        return;
      }

      // Export to Excel
      exportToExcel(allRequests, "requests_export.xlsx");

      toast({
        title: "تم التصدير بنجاح",
        description: `تم تصدير ${allRequests.length} طلب إلى ملف Excel.`,
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "فشل التصدير",
        description: "حدث خطأ أثناء تصدير البيانات. حاول مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              إجمالي الطلبات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {requestsData?.count || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الصفحة الحالية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentPage} / {requestsData?.totalPages || 1}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              النتائج في الصفحة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {requestsData?.data.length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>طلبات العملاء</CardTitle>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="ابحث بالاسم أو رقم الهاتف..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-9"
                />
              </div>
              {/* Export Button */}
              <Button
                variant="default"
                onClick={handleExportToExcel}
                disabled={isExporting || isLoading}
                className="gap-2"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    جاري التصدير...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    تصدير كملف Excel
                  </>
                )}
              </Button>
              {/* Refresh Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={handleRefresh}
                disabled={isFetching}
              >
                <RefreshCw
                  className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="rounded-md border border-red-200 bg-red-50 p-4 text-center text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
              <p className="font-medium">خطأ في تحميل الطلبات</p>
              <p className="text-sm">{(error as Error).message}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="mt-2"
              >
                حاول مرة أخرى
              </Button>
            </div>
          )}

          {/* Table */}
          {!isLoading && !isError && (
            <>
              {requestsData && requestsData.data.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>

                        <TableHead className="text-right">الاسم</TableHead>
                        <TableHead className="text-right">الهاتف</TableHead>
                        <TableHead className="text-right">رابط المتجر</TableHead>
                        <TableHead className="text-right">المبيعات الشهرية</TableHead>
                        <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {requestsData.data.map((request: Request) => (
                        <TableRow key={request.id}>

                          <TableCell>{request.name}</TableCell>
                          <TableCell>{request.phone}</TableCell>
                          <TableCell>
                            {request.store_url ? (
                              <a
                                href={request.store_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                {request.store_url.substring(0, 30)}
                                {request.store_url.length > 30 ? "..." : ""}
                              </a>
                            ) : (
                              <span className="text-muted-foreground">N/A</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {request.monthly_sales}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(request.created_at)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="rounded-md border border-dashed p-12 text-center">
                  <p className="text-muted-foreground">
                    {debouncedSearch
                      ? "لم يتم العثور على طلبات مطابقة لبحثك."
                      : "لا توجد طلبات متاحة."}
                  </p>
                </div>
              )}

              {/* Pagination */}
              {requestsData && requestsData.totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    عرض{" "}
                    {(currentPage - 1) * itemsPerPage + 1} إلى{" "}
                    {Math.min(
                      currentPage * itemsPerPage,
                      requestsData.count
                    )}{" "}
                    من أصل {requestsData.count} نتيجة
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={
                        currentPage === requestsData.totalPages || isFetching
                      }
                    >
                      التالي
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1 || isFetching}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      السابق
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
