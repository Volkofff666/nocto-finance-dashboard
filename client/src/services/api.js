const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'API Error');
  }

  return response.json();
}

// Finance API
export const fetchFinanceStats = () => fetchAPI('/finance/stats');

export const fetchTransactions = (params) => {
  const query = new URLSearchParams(params).toString();
  return fetchAPI(`/finance/transactions?${query}`);
};

export const createTransaction = (data) =>
  fetchAPI('/finance/transactions', {
    method: 'POST',
    body: JSON.stringify(data)
  });

export const updateTransaction = (id, data) =>
  fetchAPI(`/finance/transactions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });

export const deleteTransaction = (id) =>
  fetchAPI(`/finance/transactions/${id}`, {
    method: 'DELETE'
  });

// Proposals API
export const fetchProposals = (params) => {
  const query = new URLSearchParams(params).toString();
  return fetchAPI(`/proposals?${query}`);
};

export const fetchProposal = (id) => fetchAPI(`/proposals/${id}`);

export const createProposal = (data) =>
  fetchAPI('/proposals', {
    method: 'POST',
    body: JSON.stringify(data)
  });

export const updateProposal = (id, data) =>
  fetchAPI(`/proposals/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });

export const deleteProposal = (id) =>
  fetchAPI(`/proposals/${id}`, {
    method: 'DELETE'
  });
