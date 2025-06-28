import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {useTranslation} from '@/Hooks/useTranslation';

import Typography from '../Typography';

interface LanguageSelectorProps {
  style?: any;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({style}) => {
  const {changeLanguage, currentLanguage} = useTranslation();

  const languages = [
    {code: 'en', name: 'English'},
    {code: 'vi', name: 'Tiếng Việt'},
  ];

  return (
    <View style={[styles.container, style]}>
      <Typography variant="BOLD_16" color="text" style={styles.title}>
        Language / Ngôn ngữ
      </Typography>
      <View style={styles.languageContainer}>
        {languages.map(lang => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageButton,
              currentLanguage === lang.code && styles.activeButton,
            ]}
            onPress={() => changeLanguage(lang.code as 'en' | 'vi')}>
            <Typography
              variant="REGULAR_14"
              color={currentLanguage === lang.code ? 'white' : 'text'}>
              {lang.name}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 12,
  },
  languageContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f8f8',
  },
  activeButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
});

export default LanguageSelector;
