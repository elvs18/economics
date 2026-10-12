export const RU_ALPHABET = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('');
export const LAT_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function getAlphabetForLanguage(lang) {
  return lang === 'ru' ? RU_ALPHABET : LAT_ALPHABET;
}
