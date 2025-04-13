import { renderHook } from './utils/testUtils'
import { useSignInAccount } from '@/lib/react-query/queriesAndMutations';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act } from 'react-dom/test-utils';

const queryClient = new QueryClient();
const wrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
 );


describe('useSignInAccount', () => {
  it('should call signInAccount with mock user',async () => {
    const user = {
      email: "admin@admin.com",
      password: "admin123456"
    }

    const { result } = renderHook(() => useSignInAccount(), { wrapper });
    const spy = vi.fn(result.current.mutateAsync)

    console.log(spy)
    await act(async () => {
      await spy(user);
      expect(spy).toHaveBeenCalledWith(user);
    })
  });
});
