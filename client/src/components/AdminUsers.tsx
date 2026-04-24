import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Button, Spinner } from '@fluentui/react-components';
import { PersonAdd24Filled, Shield24Filled, ShieldDismiss24Filled, Delete24Filled } from '@fluentui/react-icons';
import { userAPI } from '../services/userAPI';
import { useAppSelector } from '../app/hooks';
import { colors, spacing, typography } from '../styles/designTokens';

const Container = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: ${spacing[8]};
  color: var(--color-text-primary, ${colors.neutral[900]});
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  display: none;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  min-width: 500px;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 8px;
`;

const Th = styled.th`
  padding: ${spacing[4]};
  text-align: left;
  background: ${colors.primary.lighter};
  font-weight: ${typography.fontWeight.semibold};
  border-bottom: 2px solid ${colors.neutral[200]};
  color: ${colors.primary.main};
  white-space: nowrap;
  font-size: ${typography.fontSize.sm};
`;

const Td = styled.td`
  padding: ${spacing[4]};
  border-bottom: 1px solid ${colors.neutral[200]};
  color: var(--color-text-primary, ${colors.neutral[900]});
  font-size: ${typography.fontSize.sm};
`;

const Tr = styled.tr`
  &:hover {
    background: ${colors.neutral[50]};
  }
`;

const RoleBadge = styled.span<{ $isAdmin: boolean }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: ${typography.fontSize.sm};
  display: inline-flex;
  align-items: center;
  gap: ${spacing[1]};
  background: ${p => p.$isAdmin ? colors.primary.lighter : colors.neutral[100]};
  color: ${p => p.$isAdmin ? colors.primary.main : colors.neutral[600]};
  font-weight: ${typography.fontWeight.semibold};
`;

const ActionButton = styled(Button)`
  white-space: nowrap;
`;

const ActionButtonGroup = styled.div`
  display: flex;
  gap: ${spacing[2]};
  flex-wrap: wrap;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${spacing[12]};
`;

const SuccessMessage = styled.div`
  color: ${colors.success};
  background: rgba(16, 185, 129, 0.1);
  padding: ${spacing[3]};
  border-radius: 4px;
  margin-bottom: ${spacing[4]};
  font-size: ${typography.fontSize.sm};
`;

const ErrorMessage = styled.div`
  color: ${colors.error};
  background: rgba(239, 68, 68, 0.1);
  padding: ${spacing[3]};
  border-radius: 4px;
  margin-bottom: ${spacing[4]};
  font-size: ${typography.fontSize.sm};
`;

export const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const { user: currentUser, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userAPI.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setMessage({ type: 'error', text: 'Failed to fetch users' });
    } finally {
      setLoading(false);
    }
  };

  const handlePromoteAdmin = async (email: string) => {
    const actionId = `promote-${email}`;
    setLoadingAction(actionId);
    try {
      await userAPI.promotUserToAdmin(email);
      setMessage({ type: 'success', text: `✅ ${email} has been promoted to admin!` });
      fetchUsers();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to promote user' });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDemoteAdmin = async (email: string) => {
    const actionId = `demote-${email}`;
    setLoadingAction(actionId);
    try {
      await userAPI.demoteUserFromAdmin(email);
      setMessage({ type: 'success', text: `✅ ${email} has been demoted to regular user!` });
      fetchUsers();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to demote user' });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDeleteUser = async (userId: string, name: string, email: string) => {
    const actionId = `delete-${userId}`;
    setLoadingAction(actionId);
    try {
      await userAPI.deleteUser(userId);
      setMessage({ type: 'success', text: `✅ ${email} has been deleted!` });
      fetchUsers();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete user' });
    } finally {
      setLoadingAction(null);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isCurrentUserAction = (userId: string) => userId === currentUser?.id;

  const nonAdminUsers = users.filter(u => u.role !== 'admin');
  const adminUsers = users.filter(u => u.role === 'admin');

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <Spinner label="Loading users..." />
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Title>
        <Shield24Filled /> Admin Management
      </Title>

      {message.text && (
        message.type === 'success' ? (
          <SuccessMessage>{message.text}</SuccessMessage>
        ) : (
          <ErrorMessage>{message.text}</ErrorMessage>
        )
      )}

      <h3 style={{ marginTop: spacing[8], marginBottom: spacing[4], color: colors.primary.main }}>
        Current Admins ({adminUsers.length})
      </h3>
      <TableWrapper>
      <Table>
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Joined</Th>
            <Th>Actions</Th>
          </Tr>
        </thead>
        <tbody>
          {adminUsers.map(user => {
            const isCurrentUser = isCurrentUserAction(user._id);
            const isPromoting = loadingAction === `promote-${user.email}`;
            const isDemoting = loadingAction === `demote-${user.email}`;
            const isDeleting = loadingAction === `delete-${user._id}`;
            const isProcessing = isPromoting || isDemoting || isDeleting;

            return (
              <Tr key={user._id}>
                <Td>
                  <strong>{user.name}</strong>
                  {isCurrentUser && <span style={{ marginLeft: spacing[2], fontSize: typography.fontSize.sm, color: colors.neutral[600] }}>(You)</span>}
                </Td>
                <Td>{user.email}</Td>
                <Td>
                  <RoleBadge $isAdmin={true}>
                    <Shield24Filled /> Admin
                  </RoleBadge>
                </Td>
                <Td>{formatDate(user.createdAt)}</Td>
                <Td>
                  {isCurrentUser ? (
                    <span style={{ color: colors.neutral[600], fontSize: typography.fontSize.sm }}>Cannot modify your own account</span>
                  ) : (
                    <ActionButtonGroup>
                      <ActionButton
                        appearance="outline"
                        icon={<ShieldDismiss24Filled />}
                        onClick={() => {
                          if (window.confirm(`Demote ${user.name} (${user.email}) from admin?`)) {
                            handleDemoteAdmin(user.email);
                          }
                        }}
                        disabled={isProcessing}
                      >
                        {isDemoting ? 'Demoting...' : 'Demote'}
                      </ActionButton>
                      <ActionButton
                        appearance="outline"
                        icon={<Delete24Filled />}
                        onClick={() => {
                          if (window.confirm(`Delete ${user.name} (${user.email})? This action cannot be undone.`)) {
                            handleDeleteUser(user._id, user.name, user.email);
                          }
                        }}
                        disabled={isProcessing}
                      >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </ActionButton>
                    </ActionButtonGroup>
                  )}
                </Td>
              </Tr>
            );
          })}
        </tbody>
      </Table>
      </TableWrapper>

      <h3 style={{ marginTop: spacing[12], marginBottom: spacing[4], color: colors.neutral[700] }}>
        Regular Users ({nonAdminUsers.length})
      </h3>
      {nonAdminUsers.length === 0 ? (
        <p style={{ color: colors.neutral[600], textAlign: 'center', padding: spacing[4] }}>
          No regular users to manage!
        </p>
      ) : (
        <TableWrapper>
        <Table>
          <thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Joined</Th>
              <Th>Actions</Th>
            </Tr>
          </thead>
          <tbody>
            {nonAdminUsers.map(user => {
              const isCurrentUser = isCurrentUserAction(user._id);
              const isPromoting = loadingAction === `promote-${user.email}`;
              const isDeleting = loadingAction === `delete-${user._id}`;
              const isProcessing = isPromoting || isDeleting;

              return (
                <Tr key={user._id}>
                  <Td><strong>{user.name}</strong></Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <RoleBadge $isAdmin={false}>
                      User
                    </RoleBadge>
                  </Td>
                  <Td>{formatDate(user.createdAt)}</Td>
                  <Td>
                    <ActionButtonGroup>
                      <ActionButton
                        appearance="primary"
                        icon={<PersonAdd24Filled />}
                        onClick={() => {
                          if (window.confirm(`Make ${user.name} (${user.email}) an admin?`)) {
                            handlePromoteAdmin(user.email);
                          }
                        }}
                        disabled={isProcessing}
                      >
                        {isPromoting ? 'Promoting...' : 'Make Admin'}
                      </ActionButton>
                      <ActionButton
                        appearance="outline"
                        icon={<Delete24Filled />}
                        onClick={() => {
                          if (window.confirm(`Delete ${user.name} (${user.email})? This action cannot be undone.`)) {
                            handleDeleteUser(user._id, user.name, user.email);
                          }
                        }}
                        disabled={isProcessing}
                      >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </ActionButton>
                    </ActionButtonGroup>
                  </Td>
                </Tr>
              );
            })}
          </tbody>
        </Table>
        </TableWrapper>
      )}
    </Container>
  );
};
