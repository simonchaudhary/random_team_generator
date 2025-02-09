import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult
} from '@tanstack/react-query';

import {
  getPlayers,
  addPlayer,
  updatePlayer,
  deletePlayer
} from '../services/player';

import { AddPlayerFormData, Player } from '../interfaces/player';

import { success } from '../utils/toast';
import { interpolate } from '../utils/interpolate';
import { handleError } from '../utils/errorHandler';

import { ToastMessageType } from '../enums/toast';

import message from '../languages/en';

// Fetch players
export const useFetchPlayers = (): UseQueryResult<Player[]> => {
  return useQuery({
    queryKey: ['player'],

    queryFn: async (): Promise<Player[]> => {
      const response = await getPlayers();

      return response;
    }
  });
};

// Add a player
export const useAddPlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddPlayerFormData) => {
      return addPlayer(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['player'] });

      success({
        title: ToastMessageType.SUCCESS,
        message: interpolate(message.TOAST.CREATE_DATA, {
          type: message.TITLE.PLAYER
        })
      });
    },

    onError(error) {
      handleError(error);
    }
  });
};

// Update a player
export const useUpdatePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { id: number; updatedData: AddPlayerFormData }) =>
      updatePlayer(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['player'] });

      success({
        title: ToastMessageType.SUCCESS,
        message: interpolate(message.TOAST.UPDATE_DATA, {
          type: message.TITLE.PLAYER
        })
      });
    },

    onError(error) {
      handleError(error);
    }
  });
};

// Delete a player
export const useDeletePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: number) => deletePlayer(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['player'] });

      success({
        title: ToastMessageType.SUCCESS,
        message: interpolate(message.TOAST.DELETE_DATA, {
          type: message.TITLE.PLAYER
        })
      });
    },

    onError(error) {
      handleError(error);
    }
  });
};
