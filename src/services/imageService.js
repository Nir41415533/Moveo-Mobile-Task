import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

const MAX_WIDTH = 600;
const COMPRESS_QUALITY = 0.5;

/**
 * Picks an image from gallery, compresses it, returns base64 string (or null on cancel/error).
 */
export const pickImageFromGallery = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') return null;
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (result.canceled || !result.assets?.[0]?.uri) return null;
  return compressAndToBase64(result.assets[0].uri);
};

/**
 * Takes a photo with camera, compresses it, returns base64 string (or null on cancel/error).
 */
export const pickImageFromCamera = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') return null;
  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (result.canceled || !result.assets?.[0]?.uri) return null;
  return compressAndToBase64(result.assets[0].uri);
};

/**
 * Resizes and compresses image at uri, returns base64 string (no data URI prefix).
 */
const compressAndToBase64 = async (uri) => {
  try {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: MAX_WIDTH } }],
      {
        compress: COMPRESS_QUALITY,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: true,
      }
    );
    return result.base64 ?? null;
  } catch (e) {
    return null;
  }
};
