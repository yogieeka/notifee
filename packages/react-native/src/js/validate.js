/*
 * Copyright (c) 2016-present Invertase Limited
 */

import { AndroidColor } from '../../types/NotificationAndroid';
import { isNumber, isString } from './utils';

/**
 * Validates any hexadecimal (optional transparency)
 * @param color
 * @returns {boolean}
 */
export function isValidColor(color) {
  if (AndroidColor[color.toUpperCase()]) {
    return true;
  }

  if (!color.startsWith('#')) {
    return false;
  }

  // exclude #
  const length = color.length - 1;
  return length === 6 || length === 8;
}

/**
 * Checks the timestamp is at some point in the future.
 * @param timestamp
 * @returns {boolean}
 */
export function isValidTimestamp(timestamp) {
  return timestamp > 0;
}

/**
 * Ensures all values in the pattern are valid
 * @param pattern {array}
 */
export function isValidVibratePattern(pattern) {
  if (pattern.length % 2 !== 0) {
    return false;
  }
  for (let i = 0; i < pattern.length; i++) {
    const ms = pattern[i];
    if (!isNumber(ms)) {
      return false;
    }
    if (ms <= 0) {
      return false;
    }
  }
  return true;
}

/**
 * Ensures a given light pattern is valid
 * @param pattern {array}
 */
export function isValidLightPattern(pattern) {
  const [color, onMs, offMs] = pattern;

  if (!isValidColor(color)) {
    return [false, 'color'];
  }
  if (!isNumber(onMs)) {
    return [false, 'onMs'];
  }
  if (!isNumber(offMs)) {
    return [false, 'offMs'];
  }
  if (onMs < 1) {
    return [false, 'onMs'];
  }
  if (offMs < 1) {
    return [false, 'offMs'];
  }

  return [true];
}

export function isValidRemoteInputHistory(history) {
  for (let i = 0; i < history.length; i++) {
    const element = history[i];
    if (!isString(element)) {
      return false;
    }
    if (!element) {
      return false;
    }
  }

  return true;
}