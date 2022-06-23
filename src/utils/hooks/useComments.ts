import { trpc } from '../trpc';

export const useCreateComment = () => {
  const utils = trpc.useContext();
  const addComment = trpc.useMutation('comments.add', {
    async onSuccess() {
      await utils.invalidateQueries(['comments.all']);
    },
  });

  return addComment;
};

export const useComments = ({ id }: { id: string }) => {
  const comments = trpc.useQuery(['comments.all', { movieId: id }]);

  return comments;
};
