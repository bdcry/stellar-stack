import { createAction } from '@reduxjs/toolkit';

export const feedWsConnect = createAction<string>('feed/connect');
export const feedWsDisconnect = createAction('feed/disconnect');

export const profileWsConnect = createAction<string>('profile/connect');
export const profileWsDisconnect = createAction('profile/disconnect');
