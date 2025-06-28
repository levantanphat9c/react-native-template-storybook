import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {Typography} from '@/Components';
import LanguageSelector from '@/Components/LanguageSelector';
import {useTranslation} from '@/Hooks/useTranslation';

const SettingsScreen: React.FC = () => {
  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Typography variant="BOLD_24" color="primary" style={styles.title}>
          {t('screens.settings.title')}
        </Typography>

        <LanguageSelector style={styles.section} />

        <View style={styles.section}>
          <Typography
            variant="BOLD_16"
            color="text"
            style={styles.sectionTitle}>
            {t('screens.settings.theme')}
          </Typography>
          <Typography variant="REGULAR_14" color="textSecondary">
            Coming soon...
          </Typography>
        </View>

        <View style={styles.section}>
          <Typography
            variant="BOLD_16"
            color="text"
            style={styles.sectionTitle}>
            {t('screens.settings.notifications')}
          </Typography>
          <Typography variant="REGULAR_14" color="textSecondary">
            Coming soon...
          </Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
});

export default SettingsScreen;
