const LOCATION_TIMEOUT_MS = 8000;

export const getCurrentLocation = async () => {
  try {
    const { requestForegroundPermissionsAsync, getCurrentPositionAsync } = await import('expo-location');
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== 'granted') return { latitude: null, longitude: null };
    const position = await Promise.race([
      getCurrentPositionAsync({}),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), LOCATION_TIMEOUT_MS)),
    ]);
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  } catch (e) {
    return { latitude: null, longitude: null };
  }
};
