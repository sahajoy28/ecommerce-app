import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Button, Spinner } from '@fluentui/react-components';
import { PersonAdd24Filled, Shield24Filled } from '@fluentui/react-icons';
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
`;

const Th = styled.th`
  padding: ${spacing[4]};
  text-align: left;
  background: ${colors.primary.lighter};
  font-weight: ${typography.fontWeight.semibold};
  border-bottom: 2px solid ${colors.neutral[200]};
  color: ${colors.primary.main};
`;

const Td = styled.td`
  padding: ${spacing[4]};
  border-bottom: 1px solid ${colors.neutral[200]};
  color: var(--color-text-primary, ${colors.neutral[900]});
`;

const Tr = styled.tr`
  &:hover {
    background: ${colors.neutral[50]};
  }
`;

const RoleBadge = styled.span<{ isAdmin: boolean }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: ${typography.fontSize.sm};
  display: inline-flex;
  align-items: center;
  gap: ${spacing[1]};
  background: ${p => p.isAdmin ? colors.primary.lighter : colors.neutral[100]};
  color: ${p => p.isAdmin ? colors.primary.main : colors.neutral[600]};
  font-weight: ${typography.fontWeight.semibold};
`;

const ActionButton = styled(Button)`
  white-space: nowrap;
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
  const [promoting, setPromoting] = useState<string | null>(null);
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
    setPromoting(email);
    try {
      await userAPI.promotUserToAdmin(email);
      setMessage({ type: 'success', text: `✅ ${email} has been promoted to admin!` });
      fetchUsers(); // Refresh list
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to promote user' });
    } finally {
      setPromoting(null);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

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
      <Table>
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Joined</Th>
          </Tr>
        </thead>
        <tbody>
          {adminUsers.map(user => (
            <Tr key={user._id}>
              <Td>
                <strong>{user.name}</strong>
                {user._id === currentUser?.id && <span style={{ marginLeft: spacing[2], fontSize: typography.fontSize.sm, color: colors.neutral[600] }}>(You)</span>}
              </Td>
              <Td>{user.email}</Td>
              <Td>
                <RoleBadge isAdmin={true}>
                  <Shield24Filled /> Admin
                </RoleBadge>
              </Td>
              <Td>{formatDate(user.createdAt)}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <h3 style={{ marginTop: spacing[12], marginBottom: spacing[4], color: colors.neutral[700] }}>
        Users to Promote ({nonAdminUsers.length})
      </h3>
      {nonAdminUsers.length === 0 ? (
        <p style={{ color: colors.neutral[600], textAlign: 'center', padding: spacing[4] }}>
          All users are already admins!
        </p>
      ) : (
        <Table>
          <thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Joined</Th>
              <Th>Action</Th>
            </Tr>
          </thead>
          <tbody>
            {nonAdminUsers.map(user => (
              <Tr key={user._id}>
                <Td><strong>{user.name}</strong></Td>
                <Td>{user.email}</Td>
                <Td>
                  <RoleBadge isAdmin={false}>
                    User
                  </RoleBadge>
                </Td>
                <Td>{formatDate(user.createdAt)}</Td>
                <Td>
                  <ActionButton
                    appearance="primary"
                    icon={<PersonAdd24Filled />}
                    onClick={() => {
                      if (window.confirm(`Make ${user.name} (${user.email}) an admin?`)) {
                        handlePromoteAdmin(user.email);
                      }
                    }}
                    disabled={promoting === user.email}
                  >
                    {promoting === user.email ? 'Promoting...' : 'Make Admin'}
                  </ActionButton>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};
