import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UserFormModal from '../components/UserFormModal';

describe('UserFormModal Component', () => {
  it('renders correctly when open in create mode', () => {
    render(
      <UserFormModal
        isOpen={true}
        mode="create"
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        isSubmitting={false}
      />
    );

    expect(screen.getByText('Create New User')).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(
      <UserFormModal
        isOpen={true}
        mode="create"
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        isSubmitting={false}
      />
    );

    const submitButton = screen.getByRole('button', { name: /Create User/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText('Full name is required')).toBeInTheDocument();
    expect(await screen.findByText('Email address is required')).toBeInTheDocument();
    expect(await screen.findByText('Company name is required')).toBeInTheDocument();
  });
});
