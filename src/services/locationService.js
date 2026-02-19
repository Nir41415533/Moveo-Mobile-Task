import * as Location from 'expo-location';

const LOCATION_TIMEOUT_MS = 8000;

const timeoutAfter = (ms) =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Location timeout')), ms)
  );

export const getCurrentLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return { latitude: null, longitude: null };
    }

    // Use whichever finishes first: real location or timeout
    const position = await Promise.race([
      Location.getCurrentPositionAsync({}),
      timeoutAfter(LOCATION_TIMEOUT_MS),
    ]);

    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  } catch {
    return { latitude: null, longitude: null };
  }
};
