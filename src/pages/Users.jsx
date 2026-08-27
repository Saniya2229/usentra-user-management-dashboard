import React, { useState } from 'react';
import Header from '../components/Header';
import UserFilterBar from '../components/UserFilterBar';
import UserList from '../components/UserList';
import Pagination from '../components/Pagination';
import UserDetailsModal from '../components/UserDetailsModal';
import UserFormModal from '../components/UserFormModal';
import ConfirmationModal from '../components/ConfirmationModal';

import { useUsers } from '../hooks/useUsers';
import { useDebounce } from '../hooks/useDebounce';
import { useToast } from '../hooks/useToast';

export default function Users() {
  // State for search input
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchTerm = useDebounce(searchInput, 350);

  // State for filters & view mode
  const [selectedCompany, setSelectedCompany] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [viewMode, setViewMode] = useState('grid');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Modal active states
  const [viewUser, setViewUser] = useState(null);
  const [formModalState, setFormModalState] = useState({ isOpen: false, mode: 'create', user: null });
  const [deleteTargetUser, setDeleteTargetUser] = useState(null);

  const { showSuccess, showError } = useToast();

  // Custom hook for users state & API operations
  const {
    users,
    allFilteredUsers,
    totalCount,
    totalPages,
    currentPage,
    companyList,
    loading,
    error,
    isSubmitting,
    refetch,
    createUser,
    updateUser,
    deleteUser,
  } = useUsers(debouncedSearchTerm, selectedCompany, sortBy, page, pageSize);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchInput('');
    setSelectedCompany('');
    setSortBy('name-asc');
    setPage(1);
  };

  // Open Create Form Modal
  const handleOpenCreate = () => {
    setFormModalState({ isOpen: true, mode: 'create', user: null });
  };

  // Open Edit Form Modal
  const handleOpenEdit = (user) => {
    setFormModalState({ isOpen: true, mode: 'edit', user });
  };

  // Submit Handler for Form (Create & Edit)
  const handleFormSubmit = async (formData) => {
    try {
      if (formModalState.mode === 'create') {
        await createUser(formData);
        showSuccess(`User "${formData.name}" created successfully!`);
      } else {
        await updateUser(formModalState.user.id, formData);
        showSuccess(`User "${formData.name}" updated successfully!`);
      }
    } catch (err) {
      showError(err.message || 'Operation failed');
      throw err;
    }
  };

  // Open Delete Confirmation Modal
  const handleOpenDelete = (user) => {
    setDeleteTargetUser(user);
  };

  // Confirm Delete Action
  const handleConfirmDelete = async () => {
    if (!deleteTargetUser) return;
    try {
      await deleteUser(deleteTargetUser.id);
      showSuccess(`User "${deleteTargetUser.name}" deleted successfully!`);
      setDeleteTargetUser(null);
    } catch (err) {
      showError(err.message || 'Failed to delete user');
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Dashboard Header */}
        <Header
          totalUsers={totalCount}
          totalCompanies={companyList.length}
          onOpenCreateModal={handleOpenCreate}
        />

        {/* Filter and Control Bar */}
        <UserFilterBar
          searchInput={searchInput}
          setSearchInput={(val) => {
            setSearchInput(val);
            setPage(1);
          }}
          selectedCompany={selectedCompany}
          setSelectedCompany={(comp) => {
            setSelectedCompany(comp);
            setPage(1);
          }}
          sortBy={sortBy}
          setSortBy={setSortBy}
          companyList={companyList}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onResetFilters={handleResetFilters}
        />

        {/* Main User List Display */}
        <UserList
          users={users}
          loading={loading}
          error={error}
          viewMode={viewMode}
          onViewUser={setViewUser}
          onEditUser={handleOpenEdit}
          onDeleteUser={handleOpenDelete}
          onRetry={refetch}
          onResetFilters={handleResetFilters}
        />

        {/* Pagination Controls */}
        {!loading && !error && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setPage(1);
            }}
          />
        )}
      </div>

      {/* User Details & Posts Modal */}
      {viewUser && (
        <UserDetailsModal
          user={viewUser}
          onClose={() => setViewUser(null)}
        />
      )}

      {/* Create / Edit User Modal Form */}
      <UserFormModal
        isOpen={formModalState.isOpen}
        mode={formModalState.mode}
        initialData={formModalState.user}
        onClose={() => setFormModalState({ isOpen: false, mode: 'create', user: null })}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Dialog Modal */}
      <ConfirmationModal
        isOpen={!!deleteTargetUser}
        title="Delete User Confirmation"
        message="Are you sure you want to delete this user? This action cannot be undone."
        userName={deleteTargetUser?.name || ''}
        confirmLabel="Delete User"
        isDeleting={isSubmitting}
        onClose={() => setDeleteTargetUser(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
