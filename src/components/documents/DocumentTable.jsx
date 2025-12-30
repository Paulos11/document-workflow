import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils";
import { useApp } from "../../context";
import StatusBadge from "./StatusBadge";
import ActionButtons from "./ActionButtons";
import { FileText, ChevronLeft, ChevronRight } from "lucide-react";

export default function DocumentTable({ documents }) {
  const { deleteDocument } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const statusFilters = ["All Status", "Submitted", "In Review", "Changes Requested", "Approved"];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" ||
      doc.status.toLowerCase().includes(statusFilter.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  // Pagination calculations
  const totalItems = filteredDocuments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (filter) => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handleView = (doc) => {
    navigate(`/document/${doc.id}`);
  };

  const handleEdit = (doc) => {
    navigate(`/document/${doc.id}`);
  };

  const handleDelete = (doc) => {
    if (window.confirm(`Are you sure you want to delete "${doc.name}"?`)) {
      deleteDocument(doc.id);
    }
  };

  return (
    <div>
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 p-6 sm:px-6 sm:pt-6">
        <div className="w-full sm:flex-1 sm:max-w-md relative">
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-body-small bg-white border border-neutral-border rounded-md focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary placeholder:text-text-muted transition-all shadow-sm"
          />
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-muted transition-colors group-focus-within:text-brand-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
          {statusFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleStatusFilterChange(filter)}
              className={`
                px-3 py-1.5 text-caption font-medium rounded-md transition-all whitespace-nowrap flex-shrink-0 border
                ${statusFilter === filter
                  ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                  : "bg-white text-text-medium border-neutral-border hover:bg-neutral-surface-hover hover:border-neutral-border-strong text-text-muted"
                }
              `}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-neutral-subtle border-b border-neutral-border">
              <tr>
                <th className="text-left px-4 py-3 text-caption font-semibold text-text-medium tracking-wide uppercase">
                  Document
                </th>
                <th className="text-left px-4 py-3 text-caption font-semibold text-text-medium tracking-wide uppercase hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-caption font-semibold text-text-medium tracking-wide uppercase hidden sm:table-cell">
                  Submitted
                </th>
                <th className="text-left px-4 py-3 text-caption font-semibold text-text-medium tracking-wide uppercase">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-caption font-semibold text-text-medium tracking-wide uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-border">
              {paginatedDocuments.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-16 text-center"
                  >
                    <div className="bg-neutral-subtle/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileText className="w-8 h-8 text-text-muted opacity-50" />
                    </div>
                    <p className="text-body-medium text-text-high font-medium">No documents found</p>
                    <p className="text-caption text-text-muted mt-1">Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : (
                paginatedDocuments.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-neutral-surface-hover transition-colors group cursor-pointer"
                    onClick={() => handleView(doc)}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 flex items-center justify-center bg-brand-primary/5 rounded-md border border-brand-primary/10 flex-shrink-0 group-hover:bg-brand-primary/10 transition-colors">
                          <FileText className="w-4.5 h-4.5 text-brand-primary" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-body-medium text-text-high font-medium truncate">
                            {doc.name}
                          </div>
                          <div className="text-caption text-text-muted md:hidden mt-0.5">
                            {doc.subcategory || doc.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-body-small text-text-muted">
                        {doc.subcategory || doc.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className="text-body-small text-text-muted font-medium">
                        {formatDate(doc.uploadedDate)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={doc.status} />
                    </td>
                    <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                      <ActionButtons
                        document={doc}
                        onView={() => handleView(doc)}
                        onEdit={() => handleEdit(doc)}
                        onDelete={() => handleDelete(doc)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {
        totalItems > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 sm:px-6 sm:pb-6 border-t border-neutral-border">
            {/* Left: Items per page & Info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="text-caption text-text-muted">Show</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(e.target.value)}
                  className="px-2 py-1 text-caption border border-neutral-border rounded-md focus:outline-none focus:ring-1 focus:ring-brand-primary bg-white"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span className="text-caption text-text-muted">per page</span>
              </div>
              <div className="text-caption text-text-muted">
                Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} documents
              </div>
            </div>

            {/* Right: Page Navigation */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2 sm:ml-auto">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-2 sm:px-3 py-1.5 text-caption border border-neutral-border rounded-md hover:bg-neutral-subtle transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 bg-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    // Show first page, last page, current page, and pages around current
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-2 sm:px-3 py-1.5 text-caption rounded-md transition-colors ${currentPage === pageNum
                            ? "bg-brand-primary text-white font-medium"
                            : "border border-neutral-border hover:bg-neutral-subtle bg-white"
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (
                      pageNum === currentPage - 2 ||
                      pageNum === currentPage + 2
                    ) {
                      return (
                        <span key={pageNum} className="px-1 sm:px-2 text-caption text-text-muted">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-2 sm:px-3 py-1.5 text-caption border border-neutral-border rounded-md hover:bg-neutral-subtle transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 bg-white"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )
      }
    </div >
  );
}
