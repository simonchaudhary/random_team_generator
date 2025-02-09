import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult
} from '@tanstack/react-query';

import { getTeams, addTeam, updateTeam, deleteTeam } from '../services/team';

import { Team } from '../interfaces/team';
import { Any } from '../interfaces/common';

import { success } from '../utils/toast';
import { interpolate } from '../utils/interpolate';
import { handleError } from '../utils/errorHandler';

import { ToastMessageType } from '../enums/toast';

import message from '../languages/en';

// Fetch teams
export const useFetchTeams = (): UseQueryResult<Team[]> => {
  return useQuery({
    queryKey: ['teams'],

    queryFn: async (): Promise<Team[]> => {
      const response = await getTeams();

      return response;
    }
  });
};

// Add a team
export const useAddTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: string) => {
      return addTeam(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });

      success({
        title: ToastMessageType.SUCCESS,
        message: interpolate(message.TOAST.CREATE_DATA, {
          type: message.TITLE.TEAM
        })
      });
    },

    onError(error) {
      handleError(error);
    }
  });
};

// Update a team
export const useUpdateTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Any) => updateTeam(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });

      success({
        title: ToastMessageType.SUCCESS,
        message: interpolate(message.TOAST.UPDATE_DATA, {
          type: message.TITLE.TEAM
        })
      });
    },

    onError(error) {
      handleError(error);
    }
  });
};

// Delete a team
export const useDeleteTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: number) => deleteTeam(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });

      success({
        title: ToastMessageType.SUCCESS,
        message: interpolate(message.TOAST.DELETE_DATA, {
          type: message.TITLE.TEAM
        })
      });
    },

    onError(error) {
      handleError(error);
    }
  });
};
