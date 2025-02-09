import { isArray } from 'lodash';

import { errorToast } from './toast';
import languageMessage from '../languages/en';
import { ToastMessageType } from '../enums/toast';

/**
 * Handles errors by extracting the message and displaying a toast notification.
 *
 * @param {Error | unknown | any} error - The error object, which can be of any type.
 *
 * @description
 * - Extracts the `message` property from the error.
 * - If `message` is an array, it uses the first element.
 * - Displays the extracted message using `errorToast`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleError(error: Error | unknown | any) {
  const { message = languageMessage.TOAST.SOMETHING_WENT_WRONG } = error;

  const errorMessage = isArray(message) ? message[0] : message;

  errorToast({ title: ToastMessageType.ERROR, message: errorMessage });
}
