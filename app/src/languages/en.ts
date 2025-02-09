const message = {
  TITLE: {
    APP: 'Team Generator',
    TEAM: 'Team',
    PLAYER: 'Player',
    PARTICIPANT: 'Participants',
    LOADING: 'Loading',
    SHARE_LINK: 'Share Link',
    EVENT: 'Event'
  },

  BUTTON: {
    ADD_PARTICIPANT: 'Add participant',
    ADD_TEAM: 'Add team',
    GENERATE: 'Generate',
    DELETE: 'Delete',
    CANCEL: 'Cancel',
    UPDATE: 'Update'
  },

  FORMS: {
    NAME: {
      LABEL: 'Name',
      PLACEHOLDER: 'Enter a name',
      RULES: {
        REQUIRED: 'Name is required'
      }
    },

    SKILL: {
      LABEL: 'Skill',
      PLACEHOLDER: 'Choose a skill',
      RULES: {
        REQUIRED: 'Skill is required',
        MIN: 'Skill must be at least :number',
        MAX: 'Skill cannot exceed :number'
      }
    },

    TEAM: {
      LABEL: 'Name',
      PLACEHOLDER: 'Enter a team name',
      RULES: {
        REQUIRED: 'Team name is required'
      }
    },

    TEAM_GENERATION: {
      LABEL: 'Name',
      PLACEHOLDER: 'Enter a event name',
      RULES: {
        REQUIRED: 'Event name is required'
      }
    }
  },

  MODAL: {
    CONFIRM_DELETE: 'Are you sure you want to delete?'
  },

  TOAST: {
    CREATE_DATA: ':type has been added',
    UPDATE_DATA: ':type has been updated',
    DELETE_DATA: ':type has been deleted',
    SOMETHING_WENT_WRONG: 'Internal server error'
  },

  PAGE: {
    404: '404',
    PAGE_NOT_FOUND: 'Oops! Page not found.',
    PAGE_DOESNOT_EXIST: 'The page you are looking for does not exist.',
    GO_BACK_HOME: 'Go back to Home'
  },

  OTHERS: {
    EMPTY_MESSAGE: 'The added :title will show up here.',
    SHOWING: 'Showing :count :title',
    NO_PLAYERS_TEAM: 'No players or teams available to form teams.',
    LEAST_TEAMS: 'At least :number teams are required.'
  }
} as const;

export default message;
